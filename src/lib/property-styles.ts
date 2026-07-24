import type { BookingStatus } from "@/types";

export const propertyAccent: Record<string, { bar: string; badge: string; ring: string }> = {
  "prop-1": {
    bar: "bg-sky-500",
    badge: "bg-sky-100 text-sky-900",
    ring: "ring-sky-200",
  },
  "prop-2": {
    bar: "bg-amber-500",
    badge: "bg-amber-100 text-amber-900",
    ring: "ring-amber-200",
  },
  "prop-3": {
    bar: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-900",
    ring: "ring-emerald-200",
  },
};

export const bookingStatusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-sky-500/90 text-white shadow-sky-500/25",
  pending: "bg-amber-500/90 text-white shadow-amber-500/25",
  "checked-in": "bg-indigo-500/90 text-white shadow-indigo-500/25",
  "checked-out": "bg-slate-400/90 text-white shadow-slate-400/25",
};
