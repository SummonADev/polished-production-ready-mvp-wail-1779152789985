export interface Lead {
  id?: string;
  name: string;
  email: string;
  source: string;
  createdAt?: string;
}

export interface BookingSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  dogName: string;
  dogBreed: string;
  dogSize: string;
  packageId: string;
  eventDate: string;
  eventLocation: string;
  notes?: string;
  createdAt?: string;
}

export interface AnalyticsEvent {
  id?: string;
  event: string;
  timestamp: string;
  data?: Record<string, unknown>;
}
