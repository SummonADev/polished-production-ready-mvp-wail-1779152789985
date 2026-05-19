export type Lead = {
  id: string;
  email: string;
  name: string;
  source: string;
  createdAt: string;
};

export type BookingSubmission = {
  id: string;
  ownerName: string;
  ownerEmail: string;
  dogName: string;
  dogBreed: string;
  dogSize: string;
  eventDate: string;
  eventLocation: string;
  packageId: string;
  notes?: string;
  createdAt: string;
};

export type AnalyticsEvent = {
  event: string;
  data?: Record<string, unknown>;
  timestamp: string;
};

export type AppState = {
  leads: Lead[];
  bookings: BookingSubmission[];
  events: AnalyticsEvent[];
};
