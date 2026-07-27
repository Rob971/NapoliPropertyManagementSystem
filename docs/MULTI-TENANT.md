# Multi-tenant / multi-customer guide

This PoC is built so the **core PMS product** can be reused for other municipalities or property managers. Napoli is the reference tenant; branding and deployment are externalised.

## What is shared vs customer-specific

| Layer | Shared (product) | Customer-specific |
|-------|------------------|-------------------|
| UI components | Dashboard, timeline, WhatsApp flow, i18n structure | — |
| Branding | Translation keys with `{appName}`, `{municipality}` placeholders | `deploy/tenants/*.env` |
| Demo data | Data model & types | `src/data/mock-data.ts` (property names, CIN codes) |
| DevOps | Workflows, GitLab CI template, tenant loader | Repo name, optional GitLab namespace vars |
| Docs | This guide, deploy README | Customer discovery PDF, README intro |

## Tenant configuration

Branding is injected at **build time** via `NEXT_PUBLIC_*` environment variables.

| Variable | Example (Napoli) | Used for |
|----------|------------------|----------|
| `NEXT_PUBLIC_TENANT_ID` | `napoli` | localStorage key prefix |
| `NEXT_PUBLIC_APP_NAME` | `Napoli PMS` | Sidebar brand, page title |
| `NEXT_PUBLIC_MUNICIPALITY` | `Comune di Napoli` | Sidebar subtitle, metadata |
| `NEXT_PUBLIC_ADMIN_NAME_IT` | `Admin Napoli` | Header profile (Italian) |
| `NEXT_PUBLIC_ADMIN_NAME_EN` | `Napoli Admin` | Header profile (English) |
| `NEXT_PUBLIC_CLEANER_SUPPLIER` | `Pulizie Napoli` | WhatsApp dialog, dispatch toasts |
| `NEXT_PUBLIC_BASE_PATH` | `/RepoName` | Set by CI — GitHub/GitLab Pages subpath |

Files:

- **`deploy/tenants/napoli.env`** — committed defaults for this repo
- **`deploy/tenants/_template.env`** — starter for new customers
- **`.env.example`** — local development reference

Application code reads these in `src/config/tenant.ts`. Translations auto-interpolate `{appName}`, `{municipality}`, `{adminName}`, and `{cleanerSupplier}`.

## Onboarding a new customer

### 1. Create tenant config

```bash
cp deploy/tenants/_template.env deploy/tenants/acme.env
# Edit acme.env with customer branding
```

### 2. Point CI at the tenant

**GitHub:** Settings → Secrets and variables → Actions → Variables → `TENANT_ID` = `acme`

**GitLab:** Settings → CI/CD → Variables → `TENANT_ID` = `acme`

### 3. Fork or clone the repository

Rename the repository to the customer project name. DevOps derives:

- **GitHub Pages URL:** `https://<owner>.github.io/<repo-name>/`
- **Base path:** `NEXT_PUBLIC_BASE_PATH=/<repo-name>` (automatic in CI)
- **GitLab sync target:** same owner/name as GitHub (override with `GITLAB_NAMESPACE` / `GITLAB_PROJECT` if needed)

### 4. Customise demo data

Update `src/data/mock-data.ts` with local property names and CIN prefixes (ISTAT municipality codes).

### 5. Local development

```bash
cp .env.example .env.local
# Or: TENANT_ID=acme npm run dev
npm run dev
```

For a pages-accurate build:

```bash
TENANT_ID=acme NEXT_PUBLIC_BASE_PATH=/AcmePMS npm run build:pages
```

## DevOps abstraction summary

```
┌─────────────────────────────────────────────────────────┐
│  deploy/tenants/<TENANT_ID>.env  (customer branding)    │
└──────────────────────────┬──────────────────────────────┘
                           │
         deploy/load-tenant-env.sh
                           │
     ┌─────────────────────┼─────────────────────┐
     ▼                     ▼                     ▼
 GitHub Actions        GitLab CI           npm run build:pages
 (deploy-pages)        (.gitlab-ci.yml)
     │                     │
     └─ NEXT_PUBLIC_BASE_PATH = /$repo-name (auto)
```

No workflow edits are required per customer unless you use a non-default GitLab namespace.

## Future extensions

- Externalise mock data to `src/data/tenants/<id>.json`
- Runtime tenant selection (requires SSR or client config fetch — not compatible with pure static export today)
- Shared composite GitHub Action for other PMS forks in an org
