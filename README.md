# Napoli Property Management System (PoC)

A single-page Proof of Concept for the Napoli public service and local real estate agents, demonstrating:

- **CIN compliance** — Codice Identificativo Nazionale tracking per property
- **Unified timeline calendar** — 14-day reservation grid across all properties
- **WhatsApp cleaner dispatch** — simulated automated supplier outreach with accept/decline flow

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Shadcn UI
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Deploy on GitLab Pages

This project is configured for **GitLab CI/CD** with automatic deployment to GitLab Pages on the default branch (`main`).

### Setup

1. Push this repository to GitLab (mirror from GitHub or import the project).
2. In GitLab, go to **Settings → General → Visibility** and ensure **Pages** is enabled.
3. Merge to `main` — the pipeline runs lint, build, and deploy jobs from `.gitlab-ci.yml`.
4. After a successful pipeline, open **Deploy → Pages** to get the live URL:

   `https://<namespace>.gitlab.io/<project-name>/`

   Example: `https://rob971.gitlab.io/NapoliPropertyManagementSystem/`

### Pipeline jobs

| Job | Stage | Purpose |
|-----|-------|---------|
| `lint` | test | ESLint checks |
| `build` | test | Static export artifact (all branches / MRs) |
| `pages` | deploy | Publishes `out/` to GitLab Pages (`main` only) |

### Local static build (GitLab path)

To preview the GitLab Pages URL locally with the correct base path:

```bash
npm run build:gitlab
npx serve out
```

Then open `http://localhost:3000/NapoliPropertyManagementSystem/` (adjust the path to match your project name).

## Features

1. **Mock data** — Properties, bookings, and cleaning tasks in `src/data/mock-data.ts`
2. **Dashboard layout** — Sidebar navigation, header with Napoli Admin profile
3. **Custom timeline** — Tailwind CSS grid (no third-party calendar library)
4. **WhatsApp simulation** — 1s dispatch delay, dialog with Accept/Decline, live task state updates
