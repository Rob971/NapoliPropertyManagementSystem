"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { createMockData } from "@/data/mock-data";
import { useTranslations } from "@/i18n/i18n-provider";
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

function createInitialActivities(): ActivityEvent[] {
  const now = new Date();
  return [
    {
      id: "act-init-1",
      source: "System",
      type: "info",
      messageKey: "activityMessages.initPreview",
      timestamp: now,
    },
    {
      id: "act-init-2",
      source: "CIN Registry",
      type: "compliance",
      messageKey: "activityMessages.initCin",
      timestamp: new Date(now.getTime() - 60000),
    },
  ];
}

export function useDemoState() {
  const { t } = useTranslations();
  const today = useMemo(() => startOfDay(new Date()), []);
  const initialData = useMemo(() => createMockData(today), [today]);

  const [bookings, setBookings] = useState<Booking[]>(initialData.bookings);
  const [tasks, setTasks] = useState<CleaningTask[]>(initialData.tasks);
  const [activities, setActivities] = useState<ActivityEvent[]>(createInitialActivities);
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
    ? tasks.find((task) => task.bookingId === selectedBooking.id) ?? null
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
    setActivities(createInitialActivities());
    setSelectedBookingId(null);
    setDetailPanelOpen(false);
    setTourStep(null);
    setHighlightBookingId(null);
    setDialogOpen(false);
    setActiveTaskId(null);
    setDispatchingTaskId(null);

    toast.info(t("toast.demoReset.title"), {
      description: t("toast.demoReset.description"),
    });
  }, [t, today]);

  const handleDispatch = useCallback(
    (taskId: string) => {
      const task = tasks.find((item) => item.id === taskId);
      const property = properties.find((item) => item.id === task?.propertyId);
      const propertyName = property?.name ?? t("common.propertyFallback");

      setDispatchingTaskId(taskId);

      window.setTimeout(() => {
        setTasks((current) =>
          current.map((item) =>
            item.id === taskId ? { ...item, status: "Dispatched" } : item
          )
        );
        setDispatchingTaskId(null);
        setActiveTaskId(taskId);
        setDialogOpen(true);

        addActivity({
          source: "WhatsApp",
          type: "dispatch",
          messageKey: "activityMessages.dispatchSent",
          messageParams: { property: propertyName },
        });
      }, 1000);
    },
    [addActivity, properties, t, tasks]
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

    const propertyName = activeProperty?.name ?? t("common.propertyFallback");

    setTasks((current) =>
      current.map((task) =>
        task.id === activeTaskId ? { ...task, status: "Confirmed" } : task
      )
    );
    setDialogOpen(false);

    addActivity({
      source: "WhatsApp",
      type: "dispatch",
      messageKey: "activityMessages.cleanerConfirmed",
      messageParams: { property: propertyName },
    });

    toast.success(t("toast.cleanerConfirmed.title"), {
      description: t("toast.cleanerConfirmed.description", { property: propertyName }),
      className: "border-emerald-200 bg-emerald-50 text-emerald-900",
    });
  }, [activeProperty?.name, activeTaskId, addActivity, t]);

  const handleDecline = useCallback(() => {
    if (!activeTaskId) return;

    const propertyName = activeProperty?.name ?? t("common.propertyFallback");

    setTasks((current) =>
      current.map((task) =>
        task.id === activeTaskId ? { ...task, status: "Pending" } : task
      )
    );
    setDialogOpen(false);

    addActivity({
      source: "WhatsApp",
      type: "dispatch",
      messageKey: "activityMessages.supplierDeclined",
      messageParams: { property: propertyName },
    });

    toast.error(t("toast.supplierDeclined.title"), {
      description: t("toast.supplierDeclined.description"),
    });
  }, [activeProperty?.name, activeTaskId, addActivity, t]);

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
            messageKey: "activityMessages.airbnbBooking",
          });
          toast.success(t("toast.airbnbSync.title"), {
            description: t("toast.airbnbSync.description"),
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
            prev.map((item) =>
              item.id === "task-1" ? { ...item, status: "Pending" as const } : item
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
            messageKey: "activityMessages.guestCheckout",
          });
          toast.info(t("toast.guestCheckout.title"), {
            description: t("toast.guestCheckout.description"),
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
            messageKey: "activityMessages.alloggiatiSync",
          });
          toast.success(t("toast.alloggiatiSync.title"), {
            description: t("toast.alloggiatiSync.description"),
          });
          break;
        }

        case "cin-validation": {
          const property = properties[0];
          addActivity({
            source: "CIN Registry",
            type: "compliance",
            messageKey: "activityMessages.cinValidated",
            messageParams: { property: property.name, cin: property.cin },
          });
          toast.success(t("toast.cinVerified.title"), {
            description: t("toast.cinVerified.description", { property: property.name }),
          });
          break;
        }

        case "auto-dispatch": {
          const nextPending = tasks.find((item) => item.status === "Pending");
          if (!nextPending) {
            toast.warning(t("toast.noPendingTurnovers.title"), {
              description: t("toast.noPendingTurnovers.description"),
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
      t,
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

  const confirmedCount = tasks.filter((item) => item.status === "Confirmed").length;
  const pendingCount = tasks.filter((item) => item.status === "Pending").length;

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
