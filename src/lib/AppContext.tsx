import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AppState, Lead, BookingData, AppEvent } from '@/types';

type AddLeadInput = Omit<Lead, 'id' | 'createdAt'>;
type AddBookingInput = Omit<BookingData, 'id' | 'createdAt'>;

export type AppContextType = {
  leads: Lead[];
  bookings: BookingData[];
  events: AppEvent[];
  addLead: (input: AddLeadInput) => void;
  addBooking: (input: AddBookingInput) => void;
  track: (name: string, data?: Record<string, unknown>) => void;
};

const AppContext = createContext<AppContextType | null>(null);

function loadState(): AppState {
  try {
    const raw = localStorage.getItem('bark_and_bow_state');
    if (raw) return JSON.parse(raw) as AppState;
  } catch {
    // ignore
  }
  return { leads: [], bookings: [], events: [] };
}

function saveState(state: AppState) {
  try {
    localStorage.setItem('bark_and_bow_state', JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  const updateState = useCallback((updater: (prev: AppState) => AppState) => {
    setState(prev => {
      const next = updater(prev);
      saveState(next);
      return next;
    });
  }, []);

  const addLead = useCallback((input: AddLeadInput) => {
    const lead: Lead = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    updateState(prev => ({ ...prev, leads: [...prev.leads, lead] }));
  }, [updateState]);

  const addBooking = useCallback((input: AddBookingInput) => {
    const booking: BookingData = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    updateState(prev => ({ ...prev, bookings: [...prev.bookings, booking] }));
  }, [updateState]);

  const track = useCallback((name: string, data?: Record<string, unknown>) => {
    const event: AppEvent = {
      id: crypto.randomUUID(),
      name,
      timestamp: new Date().toISOString(),
      data,
    };
    updateState(prev => ({ ...prev, events: [...prev.events, event] }));
  }, [updateState]);

  return (
    <AppContext.Provider value={{
      leads: state.leads,
      bookings: state.bookings,
      events: state.events,
      addLead,
      addBooking,
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
