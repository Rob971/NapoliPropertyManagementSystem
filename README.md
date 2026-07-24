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

## Features

1. **Mock data** — Properties, bookings, and cleaning tasks in `src/data/mock-data.ts`
2. **Dashboard layout** — Sidebar navigation, header with Napoli Admin profile
3. **Custom timeline** — Tailwind CSS grid (no third-party calendar library)
4. **WhatsApp simulation** — 1s dispatch delay, dialog with Accept/Decline, live task state updates
