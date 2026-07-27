"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { createMockData } from "@/data/mock-data";
import { getInitialActivities } from "@/data/demo-scenarios";
import { addDays, startOfDay, toDateKey } from "@/lib/dates";
import type {
  ActivityEvent,
  Booking,
  CleaningTask,
  Property,
} from "@/types";

function createActivityId() {
  return `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function useDemoState() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const initialData = useMemo(() => createMockData(today), [today]);

  const [bookings, setBookings] = useState<Booking[]>(initialData.bookings);
  const [tasks, setTasks] = useState<CleaningTask[]>(initialData.tasks);
  const [activities, setActivities] = useState<ActivityEvent[]>(getInitialActivities);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [demoPanelOpen, setDemoPanelOpen] = useState(true);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [highlightBookingId, setHighlightBookingId] = useState<string | null>(null);
  const [dispatchingTaskId, setDispatchingTaskId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const properties: Property[] = initialData.properties;

  const selectedBooking = bookings.find((b) => b.id === selectedBookingId) ?? null;
  const selectedProperty = selectedBooking
    ? properties.find((p) => p.id === selectedBooking.propertyId) ?? null
    : null;
  const selectedTask = selectedBooking
    ? tasks.find((t) => t.bookingId === selectedBooking.id) ?? null
    : null;

  const activeTask = tasks.find((task) => task.id === activeTaskId) ?? null;
  const activeProperty =
    properties.find((property) => property.id === activeTask?.propertyId) ?? null;

  const addActivity = useCallback(
    (event: Omit<ActivityEvent, "id" | "timestamp">) => {
      setActivities((prev) =>
        [
          {
            ...event,
            id: createActivityId(),
            timestamp: new Date(),
          },
          ...prev,
        ].slice(0, 25)
      );
    },
    []
  );

  const resetDemo = useCallback(() => {
    const fresh = createMockData(today);
    setBookings(fresh.bookings);
    setTasks(fresh.tasks);
    setActivities(getInitialActivities());
    setSelectedBookingId(null);
    setDetailPanelOpen(false);
    setTourStep(null);
    setHighlightBookingId(null);
    setDialogOpen(false);
    setActiveTaskId(null);
    setDispatchingTaskId(null);

    toast.info("Demo reset", {
      description: "All data restored to the initial presentation state.",
    });
  }, [today]);

  const handleDispatch = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      const property = properties.find((p) => p.id === task?.propertyId);

      setDispatchingTaskId(taskId);

      window.setTimeout(() => {
        setTasks((current) =>
          current.map((t) =>
            t.id === taskId ? { ...t, status: "Dispatched" } : t
          )
        );
        setDispatchingTaskId(null);
        setActiveTaskId(taskId);
        setDialogOpen(true);

        addActivity({
          source: "WhatsApp",
          type: "dispatch",
          message: `Dispatch sent to Pulizie Napoli for ${property?.name ?? "property"}`,
        });
      }, 1000);
    },
    [addActivity, properties, tasks]
  );

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

    addActivity({
      source: "WhatsApp",
      type: "dispatch",
      message: `Cleaner confirmed for ${activeProperty?.name ?? "property"}`,
    });

    toast.success("Cleaner confirmed via WhatsApp", {
      description: `${activeProperty?.name} turnover is now scheduled.`,
      className: "border-emerald-200 bg-emerald-50 text-emerald-900",
    });
  }, [activeTaskId, activeProperty?.name, addActivity]);

  const handleDecline = useCallback(() => {
    if (!activeTaskId) return;

    setTasks((current) =>
      current.map((task) =>
        task.id === activeTaskId ? { ...task, status: "Pending" } : task
      )
    );
    setDialogOpen(false);

    addActivity({
      source: "WhatsApp",
      type: "dispatch",
      message: `Supplier declined job for ${activeProperty?.name ?? "property"}`,
    });

    toast.error("Supplier declined the job", {
      description: "Task returned to pending for manual reassignment.",
    });
  }, [activeTaskId, activeProperty?.name, addActivity]);

  const openBookingDetail = useCallback((booking: Booking) => {
    setSelectedBookingId(booking.id);
    setDetailPanelOpen(true);
    setHighlightBookingId(booking.id);
  }, []);

  const closeBookingDetail = useCallback(() => {
    setDetailPanelOpen(false);
    setSelectedBookingId(null);
    setHighlightBookingId(null);
  }, []);

  const runScenario = useCallback(
    (scenarioId: string) => {
      const day = (offset: number) => toDateKey(addDays(today, offset));

      switch (scenarioId) {
        case "reset-demo":
          resetDemo();
          return;

        case "new-airbnb-booking": {
          const newBooking: Booking = {
            id: `book-${Date.now()}`,
            propertyId: "prop-2",
            guestName: "Luca Ferrari",
            checkIn: day(3),
            checkOut: day(8),
            status: "confirmed",
          };
          setBookings((prev) => [...prev, newBooking]);
          setHighlightBookingId(newBooking.id);
          openBookingDetail(newBooking);
          addActivity({
            source: "Airbnb",
            type: "booking",
            message:
              "New reservation synced: Luca Ferrari → Centro Storico Flat (5 nights)",
          });
          toast.success("Airbnb sync complete", {
            description: "Luca Ferrari booked Centro Storico Flat",
          });
          document
            .getElementById("timeline")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }

        case "guest-checkout": {
          setBookings((prev) =>
            prev.map((b) =>
              b.id === "book-1" ? { ...b, status: "checked-out" as const } : b
            )
          );
          setTasks((prev) =>
            prev.map((t) =>
              t.id === "task-1" ? { ...t, status: "Pending" as const } : t
            )
          );
          const booking = bookings.find((b) => b.id === "book-1");
          if (booking) {
            setHighlightBookingId("book-1");
            openBookingDetail({ ...booking, status: "checked-out" });
          }
          addActivity({
            source: "System",
            type: "checkout",
            message:
              "Marco Bianchi checked out of Villa Posillipo — turnover required by 15:00",
          });
          toast.info("Guest checkout detected", {
            description: "Marco Bianchi departed Villa Posillipo at 10:00",
          });
          window.setTimeout(() => {
            document
              .getElementById("pending-turnovers")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 400);
          break;
        }

        case "alloggiati-sync": {
          addActivity({
            source: "Alloggiati Web",
            type: "sync",
            message:
              "Guest registry submitted to Questura — Elena Russo (Villa Posillipo)",
          });
          toast.success("Alloggiati Web synced", {
            description:
              "Guest data submitted to the Italian police registry portal",
          });
          break;
        }

        case "cin-validation": {
          const property = properties[0];
          addActivity({
            source: "CIN Registry",
            type: "compliance",
            message: `CIN validated: ${property.name} — ${property.cin} ✓`,
          });
          toast.success("CIN compliance verified", {
            description: `${property.name} — registry status: ACTIVE`,
          });
          break;
        }

        case "auto-dispatch": {
          const nextPending = tasks.find((t) => t.status === "Pending");
          if (!nextPending) {
            toast.warning("No pending turnovers", {
              description: "Reset the demo or run Guest Checkout first.",
            });
            return;
          }
          handleDispatch(nextPending.id);
          document
            .getElementById("pending-turnovers")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }

        default:
          break;
      }
    },
    [
      addActivity,
      bookings,
      handleDispatch,
      openBookingDetail,
      properties,
      resetDemo,
      tasks,
      today,
    ]
  );

  const startTour = useCallback(() => {
    setTourStep(0);
    setDemoPanelOpen(true);
  }, []);

  const nextTourStep = useCallback(() => {
    setTourStep((current) => {
      if (current === null) return null;
      return current + 1;
    });
  }, []);

  const endTour = useCallback(() => {
    setTourStep(null);
  }, []);

  const confirmedCount = tasks.filter((t) => t.status === "Confirmed").length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;

  return {
    today,
    properties,
    bookings,
    tasks,
    activities,
    selectedBooking,
    selectedProperty,
    selectedTask,
    selectedBookingId,
    detailPanelOpen,
    demoPanelOpen,
    setDemoPanelOpen,
    tourStep,
    highlightBookingId,
    dispatchingTaskId,
    dialogOpen,
    activeProperty,
    confirmedCount,
    pendingCount,
    resetDemo,
    runScenario,
    handleDispatch,
    handleDialogOpenChange,
    handleAccept,
    handleDecline,
    openBookingDetail,
    closeBookingDetail,
    startTour,
    nextTourStep,
    endTour,
  };
}
