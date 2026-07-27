import type { DemoScenario, TourStep } from "@/types";

export const demoScenarios: DemoScenario[] = [
  {
    id: "new-airbnb-booking",
    title: "New Airbnb Booking",
    description: "Simulate a reservation syncing from Airbnb into the calendar.",
    mvpFeature: "Airbnb API integration",
  },
  {
    id: "guest-checkout",
    title: "Guest Checkout Today",
    description: "Mark a guest departure and create a pending turnover task.",
    mvpFeature: "Checkout automation",
  },
  {
    id: "alloggiati-sync",
    title: "Alloggiati Web Sync",
    description: "Submit guest data to the Italian police registry portal.",
    mvpFeature: "Alloggiati Web API",
  },
  {
    id: "cin-validation",
    title: "CIN Compliance Check",
    description: "Validate property CIN code against the national registry.",
    mvpFeature: "CIN Registry API",
  },
  {
    id: "auto-dispatch",
    title: "Auto-Dispatch Cleaner",
    description: "Trigger WhatsApp dispatch for the next pending turnover.",
    mvpFeature: "WhatsApp Business API",
  },
  {
    id: "reset-demo",
    title: "Reset Demo",
    description: "Restore all data to the initial presentation state.",
    mvpFeature: "Fresh demo session",
  },
];

export const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to the MVP Preview",
    description:
      "This interactive demo shows how the first MVP will look and behave. Explore scenarios on demand — no backend required.",
    target: "demo-panel",
  },
  {
    id: "kpis",
    title: "Operations at a Glance",
    description:
      "KPI cards track properties, live bookings, and confirmed turnovers — updated in real time as you interact.",
    target: "kpi-cards",
  },
  {
    id: "timeline",
    title: "Unified Reservation Timeline",
    description:
      "The 14-day grid spans all properties. Click any booking block to inspect details, CIN compliance, and linked cleaning tasks.",
    target: "timeline",
  },
  {
    id: "activity",
    title: "Live Activity Feed",
    description:
      "Every simulated API event appears here — Airbnb syncs, Alloggiati submissions, WhatsApp dispatches, and CIN checks.",
    target: "activity-feed",
  },
  {
    id: "turnovers",
    title: "Automated Cleaner Dispatch",
    description:
      "Pending turnovers trigger WhatsApp messages to cleaning suppliers. Accept or decline to see the workflow update instantly.",
    target: "pending-turnovers",
  },
  {
    id: "scenarios",
    title: "Try It Yourself",
    description:
      "Use the scenario buttons to simulate MVP integrations on demand. This is exactly how stakeholders will evaluate the product.",
    target: "demo-panel",
  },
];

export function getInitialActivities() {
  const now = new Date();
  return [
    {
      id: "act-init-1",
      source: "System" as const,
      type: "info" as const,
      message: "Interactive MVP preview loaded — try scenarios on demand",
      timestamp: now,
    },
    {
      id: "act-init-2",
      source: "CIN Registry" as const,
      type: "compliance" as const,
      message: "3 properties verified with valid Codice Identificativo Nazionale",
      timestamp: new Date(now.getTime() - 60000),
    },
  ];
}
