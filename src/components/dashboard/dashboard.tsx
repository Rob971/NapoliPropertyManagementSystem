"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { PendingTurnovers } from "@/components/dashboard/pending-turnovers";
import { UnifiedTimeline } from "@/components/dashboard/unified-timeline";
import { WhatsAppDispatchDialog } from "@/components/dashboard/whatsapp-dispatch-dialog";
import { createMockData } from "@/data/mock-data";
import { startOfDay } from "@/lib/dates";
import type { Booking, CleaningTask } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, CalendarRange, ShieldCheck } from "lucide-react";

export function Dashboard() {
  const [today] = useState(() => startOfDay(new Date()));
  const [bookings] = useState(() => createMockData(today).bookings);
  const [tasks, setTasks] = useState<CleaningTask[]>(
    () => createMockData(today).tasks
  );
  const properties = useMemo(() => createMockData(today).properties, [today]);

  const [dispatchingTaskId, setDispatchingTaskId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const activeTask = tasks.find((task) => task.id === activeTaskId) ?? null;
  const activeProperty =
    properties.find((property) => property.id === activeTask?.propertyId) ?? null;

  const handleDispatch = useCallback((taskId: string) => {
    setDispatchingTaskId(taskId);

    window.setTimeout(() => {
      setTasks((current) =>
        current.map((task) =>
          task.id === taskId ? { ...task, status: "Dispatched" } : task
        )
      );
      setDispatchingTaskId(null);
      setActiveTaskId(taskId);
      setDialogOpen(true);
    }, 1000);
  }, []);

  const handleDialogOpenChange = useCallback(
    (open: boolean) => {
      setDialogOpen(open);

      if (!open && activeTaskId) {
        setTasks((current) =>
          current.map((task) =>
            task.id === activeTaskId && task.status === "Dispatched"
              ? { ...task, status: "Pending" }
              : task
          )
        );
        setActiveTaskId(null);
      }
    },
    [activeTaskId]
  );

  const handleAccept = useCallback(() => {
    if (!activeTaskId) return;

    setTasks((current) =>
      current.map((task) =>
        task.id === activeTaskId ? { ...task, status: "Confirmed" } : task
      )
    );
    setDialogOpen(false);

    toast.success("Cleaner confirmed via WhatsApp", {
      description: `${activeProperty?.name} turnover is now scheduled.`,
      className: "border-emerald-200 bg-emerald-50 text-emerald-900",
    });
  }, [activeTaskId, activeProperty?.name]);

  const handleDecline = useCallback(() => {
    if (!activeTaskId) return;

    setTasks((current) =>
      current.map((task) =>
        task.id === activeTaskId ? { ...task, status: "Pending" } : task
      )
    );
    setDialogOpen(false);

    toast.error("Supplier declined the job", {
      description: "Task returned to pending for manual reassignment.",
    });
  }, [activeTaskId]);

  const handleBookingClick = useCallback(
    (booking: Booking) => {
      const linkedTask = tasks.find((task) => task.bookingId === booking.id);
      if (linkedTask && linkedTask.status !== "Confirmed") {
        document
          .getElementById("pending-turnovers")
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        handleDispatch(linkedTask.id);
      }
    },
    [handleDispatch, tasks]
  );

  const confirmedCount = tasks.filter((task) => task.status === "Confirmed").length;
  const pendingCount = tasks.filter((task) => task.status === "Pending").length;

  return (
    <div className="flex min-h-screen bg-[#f4f6fb]">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header today={today} />

        <main className="flex-1 space-y-6 p-6">
          <section className="grid gap-4 md:grid-cols-3">
            <Card className="border-none bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Building2 className="size-4" />
                  Active Properties
                </CardTitle>
                <CardDescription className="text-blue-100">
                  CIN-compliant inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{properties.length}</p>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarRange className="size-4 text-sky-600" />
                  Live Bookings
                </CardTitle>
                <CardDescription>Across the 14-day window</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{bookings.length}</p>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-600" />
                  Turnovers Confirmed
                </CardTitle>
                <CardDescription>
                  {pendingCount} pending dispatch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-emerald-600">
                  {confirmedCount}/{tasks.length}
                </p>
              </CardContent>
            </Card>
          </section>

          <UnifiedTimeline
            properties={properties}
            bookings={bookings}
            rangeStart={today}
            onBookingClick={handleBookingClick}
          />

          <PendingTurnovers
            tasks={tasks}
            bookings={bookings}
            properties={properties}
            dispatchingTaskId={dispatchingTaskId}
            onDispatch={handleDispatch}
          />
        </main>
      </div>

      <WhatsAppDispatchDialog
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        property={activeProperty}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </div>
  );
}
