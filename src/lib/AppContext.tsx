import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Booking, Lead } from '@/types/index';
import { sampleBookings, sampleLeads } from '@/lib/sampleData';
import { loadFromStorage, saveToStorage } from '@/lib/storage';

interface AppState {
  bookings: Booking[];
  leads: Lead[];
  events: string[];
}

interface AppContextValue extends AppState {
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  track: (event: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = 'bark-and-bow-state';

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const stored = loadFromStorage<AppState>(STORAGE_KEY);
    return stored ?? {
      bookings: sampleBookings,
      leads: sampleLeads,
      events: [],
    };
  });

  const addBooking = useCallback((booking: Omit<Booking, 'id' | 'createdAt'>) => {
    setState(prev => {
      const next = {
        ...prev,
        bookings: [
          ...prev.bookings,
          { ...booking, id: `b${Date.now()}`, createdAt: new Date().toISOString() },
        ],
      };
      saveToStorage(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const addLead = useCallback((lead: Omit<Lead, 'id' | 'createdAt'>) => {
    setState(prev => {
      const next = {
        ...prev,
        leads: [
          ...prev.leads,
          { ...lead, id: `l${Date.now()}`, createdAt: new Date().toISOString() },
        ],
      };
      saveToStorage(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const track = useCallback((event: string) => {
    setState(prev => {
      const next = { ...prev, events: [...prev.events, event] };
      saveToStorage(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <AppContext.Provider value={{ ...state, addBooking, addLead, track }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
