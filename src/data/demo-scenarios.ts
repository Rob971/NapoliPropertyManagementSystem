import type { TourStep } from "@/types";

export const demoScenarioIds = [
  "new-airbnb-booking",
  "guest-checkout",
  "alloggiati-sync",
  "cin-validation",
  "auto-dispatch",
  "reset-demo",
] as const;

export type DemoScenarioId = (typeof demoScenarioIds)[number];

export const tourStepConfigs: TourStep[] = [
  { id: "welcome", target: "demo-panel" },
  { id: "kpis", target: "kpi-cards" },
  { id: "timeline", target: "timeline" },
  { id: "activity", target: "activity-feed" },
  { id: "turnovers", target: "pending-turnovers" },
  { id: "scenarios", target: "demo-panel" },
];
