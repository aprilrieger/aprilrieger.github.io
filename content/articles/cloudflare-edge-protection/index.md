---
title: "From Whack-a-Mole to Edge Protection: Managing Cloudflare at Scale with Terraform"
description: "How we built a four-layer defense against AI-driven scrapers using Cloudflare's free tier and Infrastructure as Code."
date: "2026-04-20"
banner:
  src: "../../images/closed_lock_with_key.png"
  alt: "Cloudflare Edge Protection"
  caption: 'Presented at Fedora Showcase April 2026'
categories:
  - "Platform Engineering"
  - "Infrastructure as Code"
  - "Security"
  - "DevOps"
keywords:
  - "Cloudflare"
  - "Terraform"
  - "WAF"
  - "Rate Limiting"
  - "Infrastructure as Code"
---

*Based on my talk at [Fedora Showcase April 2026](https://github.com/notch8/cloudflare-iac-example/releases/tag/fedora-showcase-april-2026)*

---

## The Problem: When Scrapers Look Normal

In production, the painful traffic often **looks** normal. Scrapers target expensive paths—`/catalog`, works, IIIF, downloads—with **long TTFB** and **unique query strings** so caching doesn't help. That behaves like a slow DDoS: Solr, app servers, and shared tenants all suffer.

When you manage infrastructure for multiple clients, the Cloudflare dashboard becomes untenable:

- Dozens of zones, each with DNS records, cache rules, WAF settings
- No audit trail for who changed what
- Manual configuration per domain
- Inconsistent security settings across accounts

We needed to move **filtering, challenge, and cache decisions to the edge** so origin work stays bounded—and we needed it in code.

---

## The Architecture

![Cloudflare Edge Protection Architecture](/images/cloudflare-architecture.svg)

Requests are evaluated at the **edge** before they consume app CPU, database connections, and Solr queries. The goal: **$0 Cloudflare fees** using only free tier features.

---

## The Four-Layer Defense

| Layer | File | Role |
|-------|------|------|
| **WAF** | `waf_rules.tf` | Skip good bots, block probes, challenge `/catalog` |
| **Rate Limiting** | `rate_limiting.tf` | Throttle `/catalog` by colo + IP |
| **Bot Management** | `bot_management.tf` | Bot Fight Mode—behavior, not UA strings |
| **Cache** | `cache_rules.tf` | Static assets, homepages, dynamic tier with session bypass |

---

## WAF: Rule Ordering Matters

The hardest-won lesson: **order is non-negotiable**. Cloudflare evaluates rules top-to-bottom. Skips must run before challenges, or your OAI-PMH harvesters and RSS feeds break.

```hcl
# Rule 1 — Skip: monitoring & harvesting user-agents
# Site24x7 = uptime; OAI-PMH = library metadata protocol
dynamic "rules" {
  for_each = each.value.site24x7_bot_skip ? [1] : []
  content {
    action      = "skip"
    expression  = "(http.user_agent contains \"Site24x7\" or http.user_agent contains \"OAI-PMH\")"
    description = "Skip WAF for Site24x7 and OAI-PMH agents"
    enabled     = true
    action_parameters {
      ruleset  = "current"
      phases   = ["http_ratelimit", "http_request_firewall_managed", "http_request_sbfm"]
      products = ["bic", "hot", "rateLimit", "securityLevel", "uaBlock", "waf", "zoneLockdown"]
    }
  }
}

# Rule 2 — Skip: static assets, OAI, SAML metadata, feeds
# Must precede any challenge or block
rules {
  action      = "skip"
  expression  = local.skip_expressions[each.key]
  description = "Skip WAF for static paths, OAI, and SAML metadata"
  enabled     = true
  # ...
}

# Rule 3 — Block: WordPress probes
# Use `contains` — catches `/xmlrpc.php` and `//xmlrpc.php` probes
rules {
  action      = "block"
  expression  = "(http.request.uri.path contains \"xmlrpc.php\") or ..."
  description = "Block xmlrpc globally + WordPress probes on tenant hosts"
  enabled     = true
}

# Rule 4 — Managed challenge: /catalog
# Browsers pass; headless scrapers do not
rules {
  action = "managed_challenge"
  expression = join(" or ",
    [for host in local.waf_catalog_hosts[each.key] :
      "(http.host contains \"${host}\" and http.request.uri.path contains \"/catalog\" and not (starts_with(http.request.uri.path, \"/catalog/\") and ends_with(http.request.uri.path, \"/iiif_search\")))"
    ]
  )
  description = "Challenge catalog requests except IIIF OCR search endpoint"
  enabled     = true
}
```

**The IIIF carve-out**: Universal Viewer issues background fetches for OCR search that cannot complete an interactive challenge. We exclude `/iiif_search` from the managed challenge so that feature keeps working.

---

## Rate Limiting: The Colo + IP Pattern

Most rate limiting uses IP alone. But distributed scrapers rotate IPs. The key insight: they often hit the **same Cloudflare edge location** (colo).

```hcl
resource "cloudflare_ruleset" "rate_limiting" {
  for_each = { for k, v in var.zones : k => v if v.rate_limit_catalog_enabled }

  zone_id = each.value.zone_id
  name    = "default"
  kind    = "zone"
  phase   = "http_ratelimit"

  rules {
    action      = "block"
    expression  = "(http.request.uri.path contains \"/catalog\")"
    description = "Rate limit catalog searches"
    enabled     = true

    ratelimit {
      characteristics     = ["cf.colo.id", "ip.src"]
      period              = each.value.rate_limit_catalog.period
      requests_per_period = each.value.rate_limit_catalog.requests_per_period
      mitigation_timeout  = each.value.rate_limit_catalog.block_duration
    }
  }
}
```

Using `cf.colo.id` + `ip.src` catches distributed scrapers rotating many IPs at one edge faster than per-IP alone.

---

## Cache Rules: Session-Aware Caching

The challenge with multi-tenant repository apps: logged-in users see different content than anonymous visitors. Caching HTML for authenticated users breaks the app.

```hcl
# Cache work + collection pages — but bypass for authenticated sessions
dynamic "rules" {
  for_each = each.value.cache_dynamic_pages ? [1] : []
  content {
    action      = "set_cache_settings"
    expression  = "(starts_with(http.request.uri.path, \"/concern/\") or starts_with(http.request.uri.path, \"/collections/\")) and not (http.request.uri.path contains \"edit\") and not (http.cookie contains \"_hyku_session\")"
    description = "Cache work + collection pages (30min)"
    enabled     = true

    action_parameters {
      cache = true
      edge_ttl {
        mode    = "override_origin"
        default = each.value.dynamic_cache_edge_ttl
      }
    }
  }
}
```

The key: `not (http.cookie contains "_hyku_session")`. Anonymous visitors get cached responses; authenticated users always hit origin.

---

## Lessons from Production

1. **Allow-list the good bots** (monitoring, OAI-PMH) or harvesters and feeds break.

2. **Prefer behavior** (Bot Fight Mode, challenges) over blocking user agents—UAs are spoofed.

3. **Rate limit on colo + IP** to catch distributed scrapers at the edge.

4. **Use `contains`** (not only exact match) for bad paths (e.g. `//xmlrpc.php` with double slash).

5. **Carve out** endpoints that do background fetches (e.g. IIIF OCR search) from interactive challenges.

6. **Free tier: 10 cache rules per zone**—plan the rule budget carefully.

7. **Pin the provider** and read changelogs before upgrades.

---

## Why Free Tier?

Edge compute for policy is cheaper than scaling origin to absorb the same load. This entire stack targets **$0 Cloudflare fees**.

The math: absorbing scraper traffic at origin means bigger EC2 instances, more Solr replicas, higher RDS costs. Filtering at the edge—where Cloudflare has already absorbed the TCP handshake—is essentially free.

---

## The Terraform Patterns

A few patterns that made this manageable across 30+ zones:

**Per-zone configuration via tfvars:**

```text
envs/
├── client-a/
│   ├── main.tfvars
│   └── dns.tfvars
└── client-b/
    ├── main.tfvars
    └── dns.tfvars
```

**Dynamic rules from maps:**

```hcl
locals {
  waf_catalog_hosts = {
    for k, v in var.zones : k => distinct(concat(
      [v.host_filter],
      v.extra_hosts,
      v.extra_cache_hosts,
    ))
  }
}
```

**Conditional resources:**

```hcl
for_each = { for k, v in var.zones : k => v if v.waf_custom_rules_enabled }
```

---

## Results

- **30+ zones** managed via Terraform
- **Consistent security baseline** across all client domains
- **PR-based changes**—every WAF/cache change is reviewed
- **$0 Cloudflare cost**—free tier only
- **Origin load reduced**—scrapers filtered before consuming app resources

---

## Resources

- **GitHub**: [notch8/cloudflare-iac-example](https://github.com/notch8/cloudflare-iac-example)
- **Talk slides**: [From Whack-a-Mole to Edge Protection](https://github.com/notch8/cloudflare-iac-example/releases/tag/fedora-showcase-april-2026) (Fedora Showcase April 2026)
- **Cloudflare IaC docs**: [developers.cloudflare.com](https://developers.cloudflare.com/workers/platform/infrastructure-as-code/)

---

*Questions about Cloudflare, WAF configuration, or infrastructure as code? [Get in touch](/contact).*
