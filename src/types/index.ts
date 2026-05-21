export type Lead = {
  id: string;
  email: string;
  name: string;
  source: string;
  createdAt: string;
};

export type BookingData = {
  id: string;
  dogName: string;
  breed: string;
  ownerName: string;
  ownerEmail: string;
  eventDate: string;
  packageName: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
};

export type AppEvent = {
  id: string;
  name: string;
  timestamp: string;
  data?: Record<string, unknown>;
};

export type AppState = {
  leads: Lead[];
  bookings: BookingData[];
  events: AppEvent[];
};
