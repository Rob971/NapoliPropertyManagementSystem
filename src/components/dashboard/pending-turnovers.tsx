"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const pendingTasks = [...tasks].sort((a, b) => {
    if (a.status === "Confirmed" && b.status !== "Confirmed") return 1;
    if (a.status !== "Confirmed" && b.status === "Confirmed") return -1;
    return 0;
  });

  return (
    <Card id="pending-turnovers" className="shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-4 text-amber-500" />
              Pending Turnovers
            </CardTitle>
            <CardDescription>
              Checkout events requiring cleaner dispatch via WhatsApp automation
            </CardDescription>
          </div>
          <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
            {pendingTasks.filter((t) => t.status !== "Confirmed").length} active
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {pendingTasks.filter((t) => t.status !== "Confirmed").length === 0 ? (
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-4 text-sm text-emerald-800">
            <CheckCircle2 className="size-5 shrink-0" />
            All turnovers confirmed. Cleaning crew is fully scheduled.
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
                    CIN: {property?.cin}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Guest checkout:{" "}
                    <span className="font-medium text-foreground">
                      {booking?.guestName ?? "—"}
                    </span>{" "}
                    · {task.date} · {task.type}
                  </p>
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
                      task.status === "Pending" && "bg-amber-100 text-amber-800",
                      task.status === "Dispatched" && "bg-blue-100 text-blue-800",
                      task.status === "Confirmed" && "bg-emerald-100 text-emerald-800"
                    )}
                  >
                    {task.status}
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
                        Dispatching…
                      </>
                    ) : (
                      <>
                        <MessageSquare className="size-4" />
                        Simulate Automated Dispatch
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
