"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "@/i18n/i18n-provider";
import type { Booking, CleaningTask, Property } from "@/types";
import { CheckCircle2, Loader2, MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PendingTurnoversProps {
  tasks: CleaningTask[];
  bookings: Booking[];
  properties: Property[];
  dispatchingTaskId: string | null;
  onDispatch: (taskId: string) => void;
}

export function PendingTurnovers({
  tasks,
  bookings,
  properties,
  dispatchingTaskId,
  onDispatch,
}: PendingTurnoversProps) {
  const { t } = useTranslations();

  const pendingTasks = [...tasks].sort((a, b) => {
    if (a.status === "Confirmed" && b.status !== "Confirmed") return 1;
    if (a.status !== "Confirmed" && b.status === "Confirmed") return -1;
    return 0;
  });

  const activeCount = pendingTasks.filter((item) => item.status !== "Confirmed").length;

  return (
    <Card id="pending-turnovers" data-tour="pending-turnovers" className="shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-4 text-amber-500" />
              {t("turnovers.title")}
            </CardTitle>
            <CardDescription>{t("turnovers.description")}</CardDescription>
          </div>
          <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
            {t("turnovers.active", { count: activeCount })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeCount === 0 ? (
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-4 text-sm text-emerald-800">
            <CheckCircle2 className="size-5 shrink-0" />
            {t("turnovers.allConfirmed")}
          </div>
        ) : (
          pendingTasks.map((task) => {
            const property = properties.find((item) => item.id === task.propertyId);
            const booking = bookings.find((item) => item.id === task.bookingId);
            const isDispatching = dispatchingTaskId === task.id;
            const isConfirmed = task.status === "Confirmed";

            return (
              <div
                key={task.id}
                className={cn(
                  "flex flex-col gap-3 rounded-xl border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between",
                  isConfirmed
                    ? "border-emerald-200 bg-emerald-50/60"
                    : "border-border bg-muted/20 hover:bg-muted/40"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{property?.name}</p>
                    {isConfirmed && (
                      <CheckCircle2 className="size-4 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("common.cin")}: {property?.cin}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("turnovers.guestCheckout")}{" "}
                    <span className="font-medium text-foreground">
                      {booking?.guestName ?? "—"}
                    </span>{" "}
                    · {task.date} · {t(`taskType.${task.type}`)}
                  </p>
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
                      task.status === "Pending" && "bg-amber-100 text-amber-800",
                      task.status === "Dispatched" && "bg-blue-100 text-blue-800",
                      task.status === "Confirmed" && "bg-emerald-100 text-emerald-800"
                    )}
                  >
                    {t(`taskStatus.${task.status}`)}
                  </span>
                </div>

                {!isConfirmed && (
                  <Button
                    size="sm"
                    className="shrink-0 bg-[#25d366] text-white hover:bg-[#1ebe57]"
                    disabled={isDispatching}
                    onClick={() => onDispatch(task.id)}
                  >
                    {isDispatching ? (
                      <>
                        <Loader2 className="animate-spin" />
                        {t("turnovers.dispatching")}
                      </>
                    ) : (
                      <>
                        <MessageSquare className="size-4" />
                        {t("turnovers.simulateDispatch")}
                      </>
                    )}
                  </Button>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
