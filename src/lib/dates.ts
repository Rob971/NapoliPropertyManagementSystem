import type { Locale } from "@/i18n/config";
import { toDateLocale } from "@/i18n/config";

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return startOfDay(next);
}

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function daysBetween(start: Date, end: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((startOfDay(end).getTime() - startOfDay(start).getTime()) / msPerDay);
}

export function formatShortDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(toDateLocale(locale), {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatLongDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(toDateLocale(locale), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(date: Date, locale: Locale): string {
  return date.toLocaleTimeString(toDateLocale(locale), {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generateDateRange(start: Date, length: number): Date[] {
  return Array.from({ length }, (_, index) => addDays(start, index));
}
