"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { demoScenarioIds } from "@/data/demo-scenarios";
import { useTranslations } from "@/i18n/i18n-provider";
import {
  ChevronDown,
  ChevronUp,
  PlayCircle,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveDemoPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRunScenario: (scenarioId: string) => void;
  onStartTour: () => void;
}

const scenarioIcons: Record<string, typeof Zap> = {
  "new-airbnb-booking": Zap,
  "guest-checkout": PlayCircle,
  "alloggiati-sync": Sparkles,
  "cin-validation": Sparkles,
  "auto-dispatch": Zap,
  "reset-demo": RotateCcw,
};

export function InteractiveDemoPanel({
  open,
  onOpenChange,
  onRunScenario,
  onStartTour,
}: InteractiveDemoPanelProps) {
  const { t } = useTranslations();

  return (
    <Card
      id="demo-panel"
      data-tour="demo-panel"
      className="border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-white shadow-md"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="size-4 text-indigo-600" />
              {t("demo.title")}
            </CardTitle>
            <CardDescription>{t("demo.description")}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={onStartTour}>
              <PlayCircle className="size-4" />
              {t("demo.guidedTour")}
            </Button>
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={() => onOpenChange(!open)}
              aria-label={open ? t("common.collapsePanel") : t("common.expandPanel")}
            >
              {open ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {open && (
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {demoScenarioIds.map((scenarioId) => {
              const Icon = scenarioIcons[scenarioId] ?? Zap;
              const isReset = scenarioId === "reset-demo";

              return (
                <button
                  key={scenarioId}
                  type="button"
                  onClick={() => onRunScenario(scenarioId)}
                  className={cn(
                    "group flex flex-col rounded-xl border p-4 text-left transition-all hover:shadow-md",
                    isReset
                      ? "border-slate-200 bg-slate-50 hover:border-slate-300"
                      : "border-indigo-100 bg-white hover:border-indigo-300 hover:bg-indigo-50/50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg",
                        isReset ? "bg-slate-200" : "bg-indigo-100 text-indigo-700"
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <p className="font-medium">{t(`scenarios.${scenarioId}.title`)}</p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {t(`scenarios.${scenarioId}.description`)}
                  </p>
                  <span className="mt-2 inline-flex w-fit rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-800">
                    {t("demo.mvpLabel", {
                      feature: t(`scenarios.${scenarioId}.feature`),
                    })}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
