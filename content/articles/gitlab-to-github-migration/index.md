---
title: "Migrating 20+ Projects from GitLab to GitHub: A Platform Engineer's Playbook"
description: "Lessons learned from leading a large-scale migration including CI/CD conversion, preserving history, and managing the human side of change."
date: "2025-08-20"
banner:
  src: "../../images/arrows.png"
  alt: "GitLab to GitHub Migration"
  caption: 'Platform Engineering'
categories:
  - "Platform Engineering"
  - "DevOps"
  - "CI/CD"
keywords:
  - "GitLab"
  - "GitHub"
  - "Migration"
  - "GitHub Actions"
  - "CI/CD"
---

When leadership decided we were moving from GitLab to GitHub, my first reaction was: "How hard can it be? Git is git."

Three months later, with 20+ repositories successfully migrated and production deployments humming along, I can tell you: the git part was easy. Everything else required a playbook.

## Why We Migrated

Before diving into the how, the why matters for context:

- **Client requirements**: Several enterprise clients mandated GitHub for compliance reasons
- **Ecosystem alignment**: Most of our open-source contributions were already on GitHub
- **Actions maturity**: GitHub Actions had caught up to GitLab CI/CD for our use cases
- **Cost consolidation**: One platform instead of two

Your reasons might differ, but the migration patterns are surprisingly universal.

## The Migration Framework

I broke the migration into four phases, each with clear success criteria before moving to the next.

### Phase 1: Inventory and Assessment

First, understand what you're actually migrating. I created a spreadsheet tracking:

| Repository | Size | CI Complexity | External Deps | Priority | Owner |
|------------|------|---------------|---------------|----------|-------|
| api-core | 2.1GB | High (12 jobs) | 3 services | P0 | Team A |
| docs-site | 180MB | Low (2 jobs) | None | P2 | Team B |

**Key questions for each repo:**
- Does CI/CD use GitLab-specific features (environments, review apps, DAST)?
- Are there GitLab container registry dependencies?
- Who owns this and needs to validate the migration?
- What's the blast radius if something breaks?

This inventory took a week but saved months of surprises.

### Phase 2: CI/CD Translation

This is where most of the work lives. GitLab CI and GitHub Actions are conceptually similar but syntactically different.

**Common translation patterns:**

```yaml
# GitLab CI
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: ruby:3.2
  script:
    - bundle install
    - bundle exec rspec
  only:
    - merge_requests

# GitHub Actions equivalent
name: CI
on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    container: ruby:3.2
    steps:
      - uses: actions/checkout@v4
      - run: bundle install
      - run: bundle exec rspec
```

**Gotchas I encountered:**

1. **Services syntax differs**: GitLab's `services:` block becomes Actions' `services:` under the job, but the networking model is different

2. **Artifacts vs. upload-artifact**: GitLab artifacts are declarative; GitHub requires explicit upload/download actions

3. **Environment variables**: GitLab's predefined variables (`CI_COMMIT_SHA`) map to GitHub's context (`github.sha`), but not always 1:1

4. **Protected branches**: GitLab's branch protection is more granular; GitHub requires branch rulesets for equivalent control

I ended up creating a translation cheat sheet that became essential for the team:

```yaml
# Variable translations
CI_COMMIT_SHA      → github.sha
CI_COMMIT_REF_NAME → github.ref_name
CI_PIPELINE_ID     → github.run_id
CI_PROJECT_PATH    → github.repository
GITLAB_USER_LOGIN  → github.actor
```

### Phase 3: The Actual Migration

For each repository, the process was:

```bash
# 1. Mirror the repository (preserves all history)
git clone --mirror git@gitlab.com:org/repo.git
cd repo.git
git remote set-url origin git@github.com:org/repo.git
git push --mirror

# 2. Update branch protections on GitHub

# 3. Convert .gitlab-ci.yml to .github/workflows/

# 4. Update any hardcoded GitLab URLs in code/docs

# 5. Migrate issues (we used gh cli + gitlab api)

# 6. Update CI/CD secrets in GitHub

# 7. Smoke test: trigger a full CI run
```

**Preserving history was non-negotiable.** We needed git blame, commit history, and tags intact. The `--mirror` flag handles this, but verify by checking that commit SHAs match before and after.

**Issue migration** was messier. GitLab and GitHub issues aren't 1:1. We wrote a script using both APIs:

```bash
# Pseudocode for issue migration
for issue in $(gitlab api /projects/:id/issues); do
  gh issue create \
    --title "$issue.title" \
    --body "$issue.description\n\n---\nMigrated from GitLab #$issue.iid"
done
```

We accepted that comments, labels, and assignees wouldn't migrate perfectly. A "good enough" migration beat a perfect one that never shipped.

### Phase 4: Cutover and Validation

The scariest part. For each repo:

1. **Freeze GitLab**: Mark as archived, update README pointing to GitHub
2. **DNS/Registry updates**: Point container registry references to GitHub Packages (or keep GitLab registry temporarily)
3. **Team notification**: Slack announcement with new clone URLs
4. **Monitor**: Watch for failed CI runs, confused developers, broken integrations
5. **Parallel run period**: Keep GitLab read-only for 2 weeks as a safety net

## The Human Side

Technical migrations fail for human reasons. What worked for us:

**Over-communicate the timeline.** I sent weekly updates starting a month before the first migration. People hate surprises.

**Provide copy-paste commands.** Don't make developers figure out new clone URLs. Send them:

```
Your new repo: git@github.com:org/repo.git

To update your local clone:
git remote set-url origin git@github.com:org/repo.git
```

**Office hours.** I blocked 2 hours daily during the migration window for "GitHub help." Most questions were simple, but having dedicated time reduced anxiety.

**Celebrate completions.** A Slack emoji reaction for each migrated repo kept momentum visible.

## What I'd Do Differently

**Automate more of the CI translation.** I did most conversions manually. In retrospect, a tool that parsed `.gitlab-ci.yml` and generated a starting `.github/workflows/` would have saved hours.

**Migrate in waves, not all at once.** We did P0 repos first, learned lessons, then tackled P1 and P2. This was the right call.

**Set up GitHub Actions caching earlier.** Our CI times initially increased because I hadn't configured dependency caching. Actions' `actions/cache` is powerful but not automatic like GitLab's.

## The Outcome

After three months:
- **22 repositories** migrated with full history
- **Zero production incidents** from the migration
- **CI time parity** achieved (actually 12% faster after caching optimization)
- **One platform** to maintain instead of two

The migration also forced us to clean up technical debt. Several repos had CI configs that "worked" but nobody understood. Translating them required understanding them, which led to simplification.

## Resources

If you're planning a similar migration:

- [GitHub's official importer](https://docs.github.com/en/migrations/importing-source-code/using-github-importer) works for simple cases
- [GitLab CI to GitHub Actions syntax comparison](https://docs.github.com/en/actions/migrating-to-github-actions/migrating-from-gitlab-cicd-to-github-actions)
- The `gh` CLI is your friend for bulk operations

---

*Planning a migration and want to compare notes? [Get in touch](/contact).*
