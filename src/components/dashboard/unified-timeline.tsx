"use client";

import { cn } from "@/lib/utils";
import {
  daysBetween,
  formatShortDate,
  generateDateRange,
  parseDateKey,
  startOfDay,
  toDateKey,
} from "@/lib/dates";
import { bookingStatusStyles, propertyAccent } from "@/lib/property-styles";
import { useTranslations } from "@/i18n/i18n-provider";
import type { Booking, Property } from "@/types";

const TIMELINE_DAYS = 14;

interface UnifiedTimelineProps {
  properties: Property[];
  bookings: Booking[];
  rangeStart: Date;
  selectedBookingId?: string | null;
  highlightBookingId?: string | null;
  onBookingClick?: (booking: Booking) => void;
}

function getBookingSpan(
  booking: Booking,
  rangeStart: Date,
  rangeLength: number
): { start: number; span: number } | null {
  const checkIn = parseDateKey(booking.checkIn);
  const checkOut = parseDateKey(booking.checkOut);

  const startOffset = daysBetween(rangeStart, checkIn);
  const endOffset = daysBetween(rangeStart, checkOut);

  const visibleStart = Math.max(0, startOffset);
  const visibleEnd = Math.min(rangeLength, endOffset);

  if (visibleEnd <= visibleStart) return null;

  return {
    start: visibleStart + 2,
    span: visibleEnd - visibleStart,
  };
}

export function UnifiedTimeline({
  properties,
  bookings,
  rangeStart,
  selectedBookingId,
  highlightBookingId,
  onBookingClick,
}: UnifiedTimelineProps) {
  const { t, locale } = useTranslations();
  const dates = generateDateRange(rangeStart, TIMELINE_DAYS);
  const todayKey = toDateKey(startOfDay(new Date()));

  return (
    <div
      id="timeline"
      data-tour="timeline"
      className="overflow-hidden rounded-xl border border-border bg-card shadow-md"
    >
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <h2 className="text-sm font-semibold">{t("timeline.title")}</h2>
        <p className="text-xs text-muted-foreground">{t("timeline.subtitle")}</p>
      </div>

      <div className="overflow-x-auto">
        <div
          className="min-w-[960px] grid"
          style={{
            gridTemplateColumns: `220px repeat(${TIMELINE_DAYS}, minmax(72px, 1fr))`,
          }}
        >
          <div className="sticky left-0 z-20 border-b border-r border-border bg-muted/50 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t("timeline.propertyCin")}
          </div>

          {dates.map((date) => {
            const dateKey = toDateKey(date);
            const isToday = dateKey === todayKey;

            return (
              <div
                key={dateKey}
                className={cn(
                  "border-b border-r border-border px-2 py-3 text-center text-xs",
                  isToday ? "bg-blue-50 font-semibold text-blue-700" : "bg-muted/20"
                )}
              >
                <p>{formatShortDate(date, locale)}</p>
                {isToday && (
                  <span className="mt-1 inline-block rounded-full bg-blue-600 px-2 py-0.5 text-[10px] text-white">
                    {t("common.today")}
                  </span>
                )}
              </div>
            );
          })}

          {properties.map((property) => {
            const propertyBookings = bookings.filter(
              (booking) => booking.propertyId === property.id
            );
            const accent = propertyAccent[property.id];

            return (
              <div key={property.id} className="contents">
                <div className="sticky left-0 z-10 flex min-h-[88px] flex-col justify-center border-b border-r border-border bg-background px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn("size-2.5 rounded-full", accent?.bar)}
                    />
                    <p className="text-sm font-semibold">{property.name}</p>
                  </div>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                    {property.cin}
                  </p>
                </div>

                {dates.map((date) => {
                  const dateKey = toDateKey(date);
                  const isToday = dateKey === todayKey;

                  return (
                    <div
                      key={`${property.id}-${dateKey}`}
                      className={cn(
                        "pointer-events-none relative min-h-[88px] border-b border-r border-border",
                        isToday ? "bg-blue-50/40" : "bg-background"
                      )}
                    />
                  );
                })}

                {propertyBookings.map((booking) => {
                  const span = getBookingSpan(booking, rangeStart, TIMELINE_DAYS);
                  if (!span) return null;

                  const rowStart =
                    properties.findIndex((item) => item.id === property.id) + 2;
                  const isSelected = selectedBookingId === booking.id;
                  const isHighlighted = highlightBookingId === booking.id;

                  return (
                    <button
                      key={booking.id}
                      type="button"
                      title={t("timeline.bookingTitle")}
                      onClick={() => onBookingClick?.(booking)}
                      className={cn(
                        "relative z-10 m-1 flex min-h-[52px] cursor-pointer flex-col justify-center rounded-lg px-2 py-1.5 text-left text-[11px] font-medium shadow-md ring-1 transition-all hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        bookingStatusStyles[booking.status],
                        accent?.ring,
                        isSelected && "ring-2 ring-indigo-500 ring-offset-1",
                        isHighlighted && "animate-pulse ring-2 ring-amber-400"
                      )}
                      style={{
                        gridColumn: `${span.start} / span ${span.span}`,
                        gridRow: rowStart,
                      }}
                    >
                      <span className="truncate">{booking.guestName}</span>
                      <span className="mt-0.5 truncate text-[10px] opacity-90">
                        {booking.checkIn} → {booking.checkOut}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{t("timeline.legend")}:</span>
        {Object.entries(bookingStatusStyles).map(([status]) => (
          <span key={status} className="flex items-center gap-1.5">
            <span
              className={cn(
                "size-2.5 rounded-full",
                bookingStatusStyles[status as keyof typeof bookingStatusStyles]
                  .split(" ")[0]
              )}
            />
            {t(`bookingStatus.${status}`)}
          </span>
        ))}
      </div>
    </div>
  );
}
