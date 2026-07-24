export type BookingStatus = "confirmed" | "pending" | "checked-in" | "checked-out";

export type TaskStatus = "Pending" | "Dispatched" | "Confirmed";

export type TaskType = "Turnover Cleaning";

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

export interface MockData {
  properties: Property[];
  bookings: Booking[];
  tasks: CleaningTask[];
}
