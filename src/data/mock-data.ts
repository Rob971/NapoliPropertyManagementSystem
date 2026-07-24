import { addDays, toDateKey } from "@/lib/dates";
import type { MockData } from "@/types";

export function createMockData(today: Date = new Date()): MockData {
  const day = (offset: number) => toDateKey(addDays(today, offset));

  const properties = [
    {
      id: "prop-1",
      name: "Villa Posillipo",
      cin: "IT063049C2ABC12345",
    },
    {
      id: "prop-2",
      name: "Centro Storico Flat",
      cin: "IT063049C2DEF67890",
    },
    {
      id: "prop-3",
      name: "Vomero Studio",
      cin: "IT063049C2GHI11223",
    },
  ];

  const bookings = [
    {
      id: "book-1",
      propertyId: "prop-1",
      guestName: "Marco Bianchi",
      checkIn: day(-2),
      checkOut: day(0),
      status: "checked-in" as const,
    },
    {
      id: "book-2",
      propertyId: "prop-1",
      guestName: "Elena Russo",
      checkIn: day(0),
      checkOut: day(4),
      status: "confirmed" as const,
    },
    {
      id: "book-3",
      propertyId: "prop-2",
      guestName: "Sophie Laurent",
      checkIn: day(1),
      checkOut: day(6),
      status: "confirmed" as const,
    },
    {
      id: "book-4",
      propertyId: "prop-2",
      guestName: "James O'Neill",
      checkIn: day(-4),
      checkOut: day(-1),
      status: "checked-out" as const,
    },
    {
      id: "book-5",
      propertyId: "prop-3",
      guestName: "Giulia Esposito",
      checkIn: day(2),
      checkOut: day(8),
      status: "pending" as const,
    },
    {
      id: "book-6",
      propertyId: "prop-3",
      guestName: "Thomas Weber",
      checkIn: day(-1),
      checkOut: day(2),
      status: "checked-in" as const,
    },
    {
      id: "book-7",
      propertyId: "prop-1",
      guestName: "Anna Kowalski",
      checkIn: day(7),
      checkOut: day(12),
      status: "confirmed" as const,
    },
  ];

  const tasks = [
    {
      id: "task-1",
      propertyId: "prop-1",
      bookingId: "book-1",
      date: day(0),
      type: "Turnover Cleaning" as const,
      status: "Pending" as const,
    },
    {
      id: "task-2",
      propertyId: "prop-2",
      bookingId: "book-4",
      date: day(-1),
      type: "Turnover Cleaning" as const,
      status: "Confirmed" as const,
    },
    {
      id: "task-3",
      propertyId: "prop-3",
      bookingId: "book-6",
      date: day(2),
      type: "Turnover Cleaning" as const,
      status: "Pending" as const,
    },
  ];

  return { properties, bookings, tasks };
}
