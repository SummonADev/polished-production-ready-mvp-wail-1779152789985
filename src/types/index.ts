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
  email: string;
  dogName: string;
  breed: string;
  packageId: string;
  eventDate: string;
  createdAt: string;
};

export type AnalyticsEvent = {
  id: string;
  event: string;
  timestamp: string;
};

export type AppState = {
  leads: Lead[];
  bookings: BookingSubmission[];
  events: AnalyticsEvent[];
};
