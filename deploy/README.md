# Deployment configuration

This folder holds **customer-agnostic DevOps** settings. The Napoli PoC is one tenant; new customers get their own env file without changing application code.

## Structure

```
deploy/
├── load-tenant-env.sh      # Sources tenant env (used by CI and local builds)
├── tenants/
│   ├── _template.env       # Copy this for a new customer
│   └── napoli.env          # Current PoC tenant
└── README.md
```

## GitHub Pages

The **Deploy GitHub Pages** workflow:

1. Loads `deploy/tenants/<TENANT_ID>.env` (default: `napoli`)
2. Sets `NEXT_PUBLIC_BASE_PATH=/<repository-name>` automatically
3. Builds and publishes static export

### Repository variables (optional)

| Variable | Default | Purpose |
|----------|---------|---------|
| `TENANT_ID` | `napoli` | Which file under `deploy/tenants/` to load |

## GitLab Pages

`.gitlab-ci.yml` loads the same tenant file via `deploy/load-tenant-env.sh`. Override with a CI/CD variable:

| Variable | Default | Purpose |
|----------|---------|---------|
| `TENANT_ID` | `napoli` | Tenant env file to load |
| `NEXT_PUBLIC_BASE_PATH` | `/$CI_PROJECT_NAME` | Pages base path (auto) |

## GitLab sync (GitHub → GitLab mirror)

The **Sync to GitLab Pages** workflow defaults to the **current GitHub repository** name and owner. Override with repository variables:

| Variable | Default | Purpose |
|----------|---------|---------|
| `GITLAB_HOST` | `gitlab.com` | GitLab instance |
| `GITLAB_NAMESPACE` | GitHub repo owner | GitLab group/user |
| `GITLAB_PROJECT` | GitHub repo name | GitLab project path |

Secret: `GITLAB_TOKEN` (personal access token with `api` + `write_repository`).

## Local pages preview

```bash
cp .env.example .env.local   # optional — tenant defaults work without it
NEXT_PUBLIC_BASE_PATH=/YourRepoName npm run build:pages
npx serve out
```

## New customer checklist

1. Copy `deploy/tenants/_template.env` → `deploy/tenants/<customer-id>.env`
2. Set branding `NEXT_PUBLIC_*` values
3. Set `TENANT_ID=<customer-id>` in GitHub/GitLab CI variables (or rename default file)
4. Fork repo — base path and GitLab project name follow the repository automatically
5. Replace mock data in `src/data/mock-data.ts` (or externalise per customer later)

See [docs/MULTI-TENANT.md](../docs/MULTI-TENANT.md) for the full guide.
