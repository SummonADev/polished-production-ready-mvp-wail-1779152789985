import { createContext, useContext, useState, ReactNode } from 'react';
import { loadFromStorage, saveToStorage } from '@/lib/storage';

export interface Booking {
  id: string;
  name: string;
  email: string;
  dogName: string;
  dogBreed: string;
  dogSize: string;
  packageId: string;
  eventDate: string;
  eventLocation: string;
  createdAt: string;
}

export interface Lead {
  email: string;
  name: string;
  source: string;
}

interface AppState {
  bookings: Booking[];
  leads: Lead[];
  events: string[];
}

interface AppContextType {
  bookings: Booking[];
  leads: Lead[];
  addBooking: (b: Omit<Booking, 'id' | 'createdAt'>) => void;
  addLead: (l: Lead) => void;
  track: (event: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => ({
    bookings: loadFromStorage<Booking[]>('bookings', []),
    leads: loadFromStorage<Lead[]>('leads', []),
    events: loadFromStorage<string[]>('events', []),
  }));

  const addBooking = (b: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...b,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setState(prev => {
      const updated = { ...prev, bookings: [...prev.bookings, newBooking] };
      saveToStorage('bookings', updated.bookings);
      return updated;
    });
  };

  const addLead = (l: Lead) => {
    setState(prev => {
      const updated = { ...prev, leads: [...prev.leads, l] };
      saveToStorage('leads', updated.leads);
      return updated;
    });
  };

  const track = (event: string) => {
    setState(prev => {
      const updated = { ...prev, events: [...prev.events, event] };
      saveToStorage('events', updated.events);
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{ bookings: state.bookings, leads: state.leads, addBooking, addLead, track }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
