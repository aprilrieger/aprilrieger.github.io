---
title: "Building Tally: How We Achieved $75K in Annual Kubernetes Cost Savings"
description: "A deep dive into building a Kubernetes cost attribution platform that transformed how our organization understands and optimizes cloud spend."
date: "2025-11-15"
banner:
  src: "../../images/triangular_ruler.png"
  alt: "Tally Cost Attribution Platform"
  caption: 'Case Study: Platform Engineering'
categories:
  - "Platform Engineering"
  - "Kubernetes"
  - "FinOps"
  - "Case Study"
keywords:
  - "Kubernetes"
  - "Cost Optimization"
  - "FinOps"
  - "AWS"
  - "Platform Engineering"
---

## The Problem: Flying Blind on Cloud Costs

Picture this: You're managing multiple Kubernetes clusters serving dozens of client applications. Your AWS bill arrives, and it's a single, intimidating number. Leadership asks, "Which projects are driving costs?" and you have no good answer.

This was our reality. We had:
- **Multiple EKS clusters** serving different clients and internal projects
- **Shared infrastructure costs** (control plane, monitoring, logging) that needed fair allocation
- **No visibility** into per-namespace or per-application spend
- **Growing cloud bills** with no clear accountability

The finance team needed chargeback data. Project managers needed budget forecasts. Engineers needed to understand the cost implications of their architectural decisions. We were flying blind.

## Evaluating the Options

Before building anything, I researched existing solutions:

| Solution | Pros | Cons |
|----------|------|------|
| **Kubecost** | Comprehensive, real-time | Complex setup, costly at scale, overkill for our needs |
| **AWS Cost Explorer** | Native integration | No Kubernetes awareness, can't attribute to namespaces |
| **CloudHealth/Spot.io** | Enterprise features | Expensive licensing, long implementation |
| **Custom Solution** | Tailored to our needs | Development time, maintenance burden |

After evaluating these options, I proposed a hybrid approach: build a lightweight custom layer that combines AWS Cost Explorer data with Kubernetes metadata, leveraging Kubecost's API where it made sense but owning our own reporting and attribution logic.

## The Architecture

Tally consists of three main components working together:

```
┌─────────────────────────────────────────────────────────────────┐
│                         TALLY SYSTEM                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  Data Layer  │───▶│ Processing   │───▶│  Reporting   │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ AWS Cost     │    │ Attribution  │    │ Rails        │      │
│  │ Explorer API │    │ Engine       │    │ Dashboard    │      │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤      │
│  │ Kubecost API │    │ EBS Tagger   │    │ Slack        │      │
│  ├──────────────┤    │              │    │ Reports      │      │
│  │ K8s API      │    │              │    ├──────────────┤      │
│  │ (namespaces) │    │              │    │ CLI Tool     │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1. Data Collection Layer

**Bash CLI for Daily Syncs**

I built a Bash CLI tool that runs as a Kubernetes CronJob, collecting data from multiple sources:

```bash
# Simplified example of the data collection flow
tally sync --cluster prod-east \
  --aws-profile production \
  --kubecost-endpoint http://kubecost:9090
```

The CLI handles:
- Pulling cost data from AWS Cost Explorer API
- Querying Kubecost for per-namespace resource consumption
- Fetching namespace metadata from the Kubernetes API
- Tagging EBS volumes with ownership information (critical for accurate attribution)

**The EBS Tagging Challenge**

One of the trickiest problems was attributing EBS volume costs. Persistent volumes in Kubernetes don't automatically inherit namespace metadata in AWS. My solution:

1. Query all PersistentVolumeClaims across namespaces
2. Map PVCs to their underlying EBS volume IDs
3. Apply AWS tags with namespace and project identifiers
4. Cost Explorer can now filter EBS costs by these tags

This alone recovered ~15% of previously "unattributable" storage costs.

### 2. Attribution Engine

The core logic lives in a Ruby module that applies our attribution rules:

```ruby
# Pseudocode for the attribution model
class CostAttributor
  SHARED_COST_POOLS = [:control_plane, :monitoring, :logging, :ingress]
  
  def attribute(raw_costs, namespace_metrics)
    # Direct costs: CPU, memory, storage per namespace
    direct = calculate_direct_costs(raw_costs, namespace_metrics)
    
    # Shared costs: distributed by resource consumption ratio
    shared = distribute_shared_costs(raw_costs, namespace_metrics)
    
    # Apply business rules (minimum allocations, caps, etc.)
    apply_business_rules(direct.merge(shared))
  end
end
```

**Key Design Decisions:**

- **Shared cost distribution**: We allocate shared infrastructure costs (monitoring, logging, ingress controllers) proportionally based on each namespace's resource consumption
- **Idle cost handling**: Unused reserved capacity gets distributed across active projects rather than sitting in an "unallocated" bucket
- **Historical tracking**: We store daily snapshots to enable trend analysis and forecasting

### 3. Reporting Layer

**Rails Dashboard**

The web interface provides:
- Real-time cost breakdowns by cluster, namespace, and project
- Month-over-month trend charts
- Anomaly detection (alerts when costs spike unexpectedly)
- Export to CSV for finance team integration

**Slack Integration**

Weekly automated reports drop into project channels:

```
📊 Weekly Cost Report: Project Atlas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Compute:  $1,247.32  (↓ 8% from last week)
Storage:    $342.18  (↑ 2%)
Network:     $89.44  (→ stable)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total:    $1,678.94
```

## The Hard Parts

### Challenge 1: Data Consistency

AWS Cost Explorer data has a 24-48 hour delay. Kubecost provides real-time estimates. Reconciling these two sources required building a normalization layer that:
- Uses Kubecost for real-time dashboards (with "estimated" labels)
- Uses AWS Cost Explorer for official monthly reports
- Tracks and reports the delta between estimates and actuals

### Challenge 2: Multi-Tenancy Complexity

Some namespaces serve multiple clients. Some clients span multiple namespaces. The attribution model needed to support:
- Namespace → Project mapping (many-to-one)
- Project → Client mapping (many-to-many)
- Override rules for special cases

I ended up building a simple YAML-based configuration system that non-engineers could maintain:

```yaml
# cost-attribution-rules.yaml
projects:
  atlas:
    namespaces: [atlas-prod, atlas-staging]
    client: acme-corp
    cost_center: CC-1234
  
  shared-services:
    namespaces: [monitoring, logging]
    distribution: proportional
```

### Challenge 3: Getting Buy-In

The hardest part wasn't technical—it was organizational. Engineers initially saw cost tracking as "management overhead." I reframed it as **engineering empowerment**: understanding costs lets you make better architectural decisions and advocate for resources with data.

## The Results

After six months in production:

| Metric | Before | After |
|--------|--------|-------|
| **Unattributed costs** | 34% | 3% |
| **Time to generate cost report** | 2 days (manual) | Instant |
| **Annual cloud spend** | $312K | $237K |
| **Cost per customer** | Unknown | Tracked |

**The $75K savings** came from several optimizations that were only possible once we had visibility:

1. **Right-sizing discoveries** ($28K): Found several namespaces requesting 4x the resources they actually used
2. **Zombie resource cleanup** ($19K): Identified orphaned EBS volumes and unused load balancers
3. **Reserved instance optimization** ($18K): Data showed which workloads were stable enough for RIs
4. **Architecture improvements** ($10K): Teams made different decisions when they could see cost implications

## Lessons Learned

**Start simple, iterate.** The first version was literally a bash script that dumped data to a spreadsheet. That ugly prototype proved the value before I invested in the Rails dashboard.

**Make costs visible, not punitive.** The goal is awareness and optimization, not blame. Teams that see their costs tend to optimize voluntarily.

**Automate the boring parts.** The EBS tagging automation alone saved hours of manual work per month and eliminated a whole class of attribution errors.

**Design for non-engineers.** Finance, project managers, and leadership all need to understand the data. The dashboard needed to be self-explanatory, not require Kubernetes knowledge.

## What I'd Do Differently

If I were starting over:
- **OpenCost** (open-source Kubecost) has matured significantly—I'd evaluate it more seriously now
- I'd invest earlier in **forecasting capabilities**—reactive cost management is less valuable than predictive
- I'd build **Terraform cost estimation** into the CI pipeline so engineers see cost implications before deploying

## Conclusion

Building Tally taught me that platform engineering isn't just about infrastructure—it's about creating visibility and enabling better decisions across the organization. The $75K in savings was great, but the real win was transforming "cloud costs are a mystery" into "we understand exactly where every dollar goes."

The code isn't open source (it's tightly coupled to our specific infrastructure), but I'm happy to discuss the architecture and approach with anyone tackling similar challenges.

---

*Have questions about Kubernetes cost management or FinOps? [Get in touch](/contact).*
