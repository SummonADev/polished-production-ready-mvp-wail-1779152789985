import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Booking, Lead, AppEvent, AddBookingInput } from '@/types/index';
import { loadState, saveState } from '@/lib/storage';
import { sampleBookings, sampleLeads } from '@/lib/sampleData';

type AppState = {
  bookings: Booking[];
  leads: Lead[];
  events: AppEvent[];
};

type AppContextType = {
  bookings: Booking[];
  leads: Lead[];
  events: AppEvent[];
  addBooking: (input: AddBookingInput) => Booking;
  addLead: (input: { email: string; name: string; source: string }) => Lead;
  track: (event: AppEvent) => void;
};

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = 'bark_and_bow_state';

function getInitialState(): AppState {
  const stored = loadState<AppState>(STORAGE_KEY);
  if (stored) return stored;
  return {
    bookings: sampleBookings,
    leads: sampleLeads,
    events: [],
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(getInitialState);

  const persist = useCallback((next: AppState) => {
    setState(next);
    saveState(STORAGE_KEY, next);
  }, []);

  const addBooking = useCallback((input: AddBookingInput): Booking => {
    const booking: Booking = {
      ...input,
      id: `booking_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const next = { ...state, bookings: [...state.bookings, booking] };
    persist(next);
    return booking;
  }, [state, persist]);

  const addLead = useCallback((input: { email: string; name: string; source: string }): Lead => {
    const lead: Lead = {
      ...input,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const next = { ...state, leads: [...state.leads, lead] };
    persist(next);
    return lead;
  }, [state, persist]);

  const track = useCallback((event: AppEvent) => {
    const next = { ...state, events: [...state.events, event] };
    persist(next);
  }, [state, persist]);

  return (
    <AppContext.Provider value={{
      bookings: state.bookings,
      leads: state.leads,
      events: state.events,
      addBooking,
      addLead,
      track,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
