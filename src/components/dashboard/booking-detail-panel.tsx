"use client";

import { Button } from "@/components/ui/button";
import type { Booking, CleaningTask, Property } from "@/types";
import {
  Calendar,
  MessageSquare,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingDetailPanelProps {
  open: boolean;
  booking: Booking | null;
  property: Property | null;
  task: CleaningTask | null;
  onClose: () => void;
  onDispatch: (taskId: string) => void;
  dispatchingTaskId: string | null;
}

const statusLabels: Record<Booking["status"], string> = {
  confirmed: "Confirmed",
  pending: "Pending",
  "checked-in": "Checked In",
  "checked-out": "Checked Out",
};

export function BookingDetailPanel({
  open,
  booking,
  property,
  task,
  onClose,
  onDispatch,
  dispatchingTaskId,
}: BookingDetailPanelProps) {
  if (!open || !booking || !property) return null;

  const isDispatching = task ? dispatchingTaskId === task.id : false;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden
      />

      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-background shadow-2xl animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Reservation Detail
            </p>
            <h2 className="text-lg font-semibold">{booking.guestName}</h2>
          </div>
          <Button size="icon-sm" variant="ghost" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <section className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Guest</h3>
            <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <User className="size-5" />
              </div>
              <div>
                <p className="font-medium">{booking.guestName}</p>
                <span
                  className={cn(
                    "mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium capitalize",
                    booking.status === "checked-out" && "bg-slate-200 text-slate-800",
                    booking.status === "checked-in" && "bg-indigo-100 text-indigo-800",
                    booking.status === "confirmed" && "bg-sky-100 text-sky-800",
                    booking.status === "pending" && "bg-amber-100 text-amber-800"
                  )}
                >
                  {statusLabels[booking.status]}
                </span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Stay</h3>
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="size-4 text-muted-foreground" />
                <span>
                  {booking.checkIn} → {booking.checkOut}
                </span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Property & Compliance
            </h3>
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <p className="font-medium">{property.name}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                CIN: {property.cin}
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm text-emerald-700">
                <ShieldCheck className="size-4" />
                CIN Registry — Verified
              </div>
            </div>
          </section>

          {task && (
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                Turnover Cleaning
              </h3>
              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm">{task.type}</p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-medium uppercase",
                      task.status === "Pending" && "bg-amber-100 text-amber-800",
                      task.status === "Dispatched" && "bg-blue-100 text-blue-800",
                      task.status === "Confirmed" && "bg-emerald-100 text-emerald-800"
                    )}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Scheduled: {task.date}
                </p>

                {task.status !== "Confirmed" && (
                  <Button
                    size="sm"
                    className="mt-4 w-full bg-[#25d366] text-white hover:bg-[#1ebe57]"
                    disabled={isDispatching || task.status === "Dispatched"}
                    onClick={() => onDispatch(task.id)}
                  >
                    <MessageSquare className="size-4" />
                    {isDispatching ? "Dispatching…" : "Simulate WhatsApp Dispatch"}
                  </Button>
                )}
              </div>
            </section>
          )}
        </div>

        <div className="border-t border-border bg-muted/30 p-4">
          <p className="text-center text-xs text-muted-foreground">
            In the paid MVP, this panel connects to live Airbnb, Alloggiati Web,
            and WhatsApp APIs.
          </p>
        </div>
      </aside>
    </>
  );
}
