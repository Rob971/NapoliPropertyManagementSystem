export type BookingStatus = "confirmed" | "pending" | "checked-in" | "checked-out";

export type TaskStatus = "Pending" | "Dispatched" | "Confirmed";

export type TaskType = "Turnover Cleaning";

export type ActivitySource =
  | "Airbnb"
  | "WhatsApp"
  | "Alloggiati Web"
  | "System"
  | "CIN Registry";

export type ActivityType =
  | "booking"
  | "checkout"
  | "dispatch"
  | "compliance"
  | "sync"
  | "info";

export interface Property {
  id: string;
  name: string;
  cin: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
}

export interface CleaningTask {
  id: string;
  propertyId: string;
  bookingId: string;
  date: string;
  type: TaskType;
  status: TaskStatus;
}

export interface ActivityEvent {
  id: string;
  source: ActivitySource;
  type: ActivityType;
  message: string;
  timestamp: Date;
}

export interface MockData {
  properties: Property[];
  bookings: Booking[];
  tasks: CleaningTask[];
}

export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  mvpFeature: string;
}

export interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
}
