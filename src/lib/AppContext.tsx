import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { loadFromStorage, saveToStorage } from './storage';
import type { AppState, Lead, BookingData } from '@/types';
import { sampleBookings, sampleLeads } from './sampleData';

const STORAGE_KEY = 'bark-and-bow-state';

const defaultState: AppState = {
  bookings: sampleBookings,
  leads: sampleLeads,
  events: [],
};

type AppContextType = {
  state: AppState;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  addBooking: (booking: Omit<BookingData, 'id' | 'createdAt'>) => void;
  track: (event: string, props?: Record<string, unknown>) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const stored = loadFromStorage<AppState>(STORAGE_KEY, defaultState);
    return stored;
  });

  useEffect(() => {
    saveToStorage(STORAGE_KEY, state);
  }, [state]);

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...lead,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setState(prev => ({ ...prev, leads: [...prev.leads, newLead] }));
  };

  const addBooking = (booking: Omit<BookingData, 'id' | 'createdAt'>) => {
    const newBooking: BookingData = {
      ...booking,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setState(prev => ({ ...prev, bookings: [...prev.bookings, newBooking] }));
  };

  const track = (event: string, props?: Record<string, unknown>) => {
    console.log('[track]', event, props);
  };

  return (
    <AppContext.Provider value={{ state, addLead, addBooking, track }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
