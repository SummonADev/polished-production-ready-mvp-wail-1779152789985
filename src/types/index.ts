export type Lead = {
  id: string;
  email: string;
  name: string;
  source: string;
  createdAt: string;
};

export type Booking = {
  id: string;
  createdAt: string;
  dogName?: string;
  ownerName?: string;
  packageName?: string;
  eventDate?: string;
  [key: string]: unknown;
};

export type AnalyticsEvent = {
  event: string;
  data?: Record<string, unknown>;
  timestamp: string;
};
