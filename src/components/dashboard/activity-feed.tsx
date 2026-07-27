"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "@/i18n/i18n-provider";
import { formatTime } from "@/lib/dates";
import type { ActivityEvent, ActivitySource } from "@/types";
import {
  Building2,
  MessageCircle,
  Radio,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sourceConfig: Record<
  ActivitySource,
  { icon: typeof Radio; color: string; bg: string }
> = {
  Airbnb: { icon: Globe, color: "text-rose-600", bg: "bg-rose-50" },
  WhatsApp: { icon: MessageCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  "Alloggiati Web": { icon: ShieldCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
  System: { icon: Radio, color: "text-sky-600", bg: "bg-sky-50" },
  "CIN Registry": { icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
};

interface ActivityFeedProps {
  activities: ActivityEvent[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const { t, locale } = useTranslations();

  return (
    <Card id="activity-feed" data-tour="activity-feed" className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Radio className="size-4 animate-pulse text-sky-600" />
          {t("activity.title")}
        </CardTitle>
        <CardDescription>{t("activity.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[280px] space-y-2 overflow-y-auto pr-1">
          {activities.map((event, index) => {
            const config = sourceConfig[event.source];
            const Icon = config.icon;

            return (
              <div
                key={event.id}
                className={cn(
                  "flex gap-3 rounded-lg border border-border/60 p-3 transition-all",
                  config.bg,
                  index === 0 && "ring-1 ring-sky-200"
                )}
              >
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm",
                    config.color
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {event.source}
                    </p>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {formatTime(event.timestamp, locale)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm leading-snug">
                    {t(event.messageKey, event.messageParams)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
