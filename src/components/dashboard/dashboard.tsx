"use client";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { BookingDetailPanel } from "@/components/dashboard/booking-detail-panel";
import { GuidedTour } from "@/components/dashboard/guided-tour";
import { InteractiveDemoPanel } from "@/components/dashboard/interactive-demo-panel";
import { PendingTurnovers } from "@/components/dashboard/pending-turnovers";
import { UnifiedTimeline } from "@/components/dashboard/unified-timeline";
import { WhatsAppDispatchDialog } from "@/components/dashboard/whatsapp-dispatch-dialog";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { useDemoState } from "@/hooks/use-demo-state";
import { useTranslations } from "@/i18n/i18n-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, CalendarRange, ShieldCheck } from "lucide-react";

export function Dashboard() {
  const demo = useDemoState();
  const { t } = useTranslations();

  return (
    <div className="flex min-h-screen bg-[#f4f6fb]">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header today={demo.today} onStartTour={demo.startTour} />

        <main className="flex-1 space-y-6 p-6">
          <section
            id="kpi-cards"
            data-tour="kpi-cards"
            className="grid gap-4 md:grid-cols-3"
          >
            <Card className="border-none bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Building2 className="size-4" />
                  {t("kpi.activeProperties")}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {t("kpi.activePropertiesDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{demo.properties.length}</p>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarRange className="size-4 text-sky-600" />
                  {t("kpi.liveBookings")}
                </CardTitle>
                <CardDescription>{t("kpi.liveBookingsDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{demo.bookings.length}</p>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-600" />
                  {t("kpi.turnoversConfirmed")}
                </CardTitle>
                <CardDescription>
                  {t("kpi.pendingDispatch", { count: demo.pendingCount })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-emerald-600">
                  {demo.confirmedCount}/{demo.tasks.length}
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <InteractiveDemoPanel
              open={demo.demoPanelOpen}
              onOpenChange={demo.setDemoPanelOpen}
              onRunScenario={demo.runScenario}
              onStartTour={demo.startTour}
            />
            <ActivityFeed activities={demo.activities} />
          </section>

          <UnifiedTimeline
            properties={demo.properties}
            bookings={demo.bookings}
            rangeStart={demo.today}
            selectedBookingId={demo.selectedBookingId}
            highlightBookingId={demo.highlightBookingId}
            onBookingClick={demo.openBookingDetail}
          />

          <PendingTurnovers
            tasks={demo.tasks}
            bookings={demo.bookings}
            properties={demo.properties}
            dispatchingTaskId={demo.dispatchingTaskId}
            onDispatch={demo.handleDispatch}
          />
        </main>
      </div>

      <BookingDetailPanel
        open={demo.detailPanelOpen}
        booking={demo.selectedBooking}
        property={demo.selectedProperty}
        task={demo.selectedTask}
        onClose={demo.closeBookingDetail}
        onDispatch={demo.handleDispatch}
        dispatchingTaskId={demo.dispatchingTaskId}
      />

      <WhatsAppDispatchDialog
        open={demo.dialogOpen}
        onOpenChange={demo.handleDialogOpenChange}
        property={demo.activeProperty}
        onAccept={demo.handleAccept}
        onDecline={demo.handleDecline}
      />

      <GuidedTour
        step={demo.tourStep}
        onNext={demo.nextTourStep}
        onEnd={demo.endTour}
      />
    </div>
  );
}
