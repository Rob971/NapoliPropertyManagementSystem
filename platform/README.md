# Italian Property Management System — Platform

[![Template](https://img.shields.io/badge/use%20this-template-2ea44f)](https://github.com/Rob971/PropertyManagementSystem/generate)

Reusable **multi-tenant PMS platform** for Italian municipalities and property managers. Fork this repository to spin up a customer-specific deployment with minimal DevOps changes.

## What you get

- **CIN compliance** — Codice Identificativo Nazionale tracking per property
- **Unified timeline calendar** — 14-day reservation grid across all properties
- **WhatsApp cleaner dispatch** — simulated automated supplier outreach
- **Internationalisation** — Italian (default) and English (UK)
- **Interactive MVP demo** — on-demand scenarios for stakeholder presentations
- **Parameterized DevOps** — GitHub Pages + GitLab Pages with tenant env files

## Reference implementation

| Customer | Repository | Live demo |
|----------|------------|-----------|
| Napoli (PoC) | [NapoliPropertyManagementSystem](https://github.com/Rob971/NapoliPropertyManagementSystem) | [GitHub Pages](https://rob971.github.io/NapoliPropertyManagementSystem/) |

## Quick start (new customer)

### 1. Use this template

Click **Use this template** above, or:

```bash
gh repo create my-city-pms --template Rob971/PropertyManagementSystem --public --clone
cd my-city-pms
npm install
```

### 2. Configure tenant branding

```bash
cp deploy/tenants/_template.env deploy/tenants/mycity.env
# Edit mycity.env — app name, municipality, cleaner supplier, etc.
```

Set `TENANT_ID=mycity` in GitHub/GitLab CI variables.

### 3. Customise demo data

Update `src/data/mock-data.ts` with local property names and CIN prefixes.

### 4. Deploy

Push to `main` — GitHub Pages deploys automatically. Base path is derived from your **repository name**.

See [docs/MULTI-TENANT.md](docs/MULTI-TENANT.md) and [deploy/README.md](deploy/README.md) for full details.

## Local development

```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Pages-accurate build:

```bash
TENANT_ID=default NEXT_PUBLIC_BASE_PATH=/YourRepoName npm run build:pages
npx serve out
```

## Tech stack

- Next.js 16 (App Router, static export)
- TypeScript · Tailwind CSS v4 · Shadcn UI · Lucide React

## Architecture

```
deploy/tenants/<customer>.env   →  build-time branding (NEXT_PUBLIC_*)
deploy/load-tenant-env.sh       →  shared by GitHub Actions, GitLab CI, local builds
src/config/tenant.ts            →  injected into UI via i18n placeholders
```

Repository name → `NEXT_PUBLIC_BASE_PATH` (automatic in CI).

## Documentation

- [Multi-tenant guide](docs/MULTI-TENANT.md)
- [Deployment reference](deploy/README.md)

## License

Use and adapt for municipal / property-management projects. Customer-specific data and branding remain in tenant env files and mock data.
