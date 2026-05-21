import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { loadFromStorage, saveToStorage } from '@/lib/storage';
import type { Booking, Lead } from '@/types/index';
import { sampleBookings, sampleLeads } from '@/lib/sampleData';

type AppContextType = {
  bookings: Booking[];
  leads: Lead[];
  addBooking: (b: Omit<Booking, 'id' | 'createdAt'>) => void;
  addLead: (l: Omit<Lead, 'id' | 'createdAt'>) => void;
  track: (event: string) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(() =>
    loadFromStorage<Booking[]>('bb_bookings', sampleBookings)
  );
  const [leads, setLeads] = useState<Lead[]>(() =>
    loadFromStorage<Lead[]>('bb_leads', sampleLeads)
  );

  useEffect(() => { saveToStorage('bb_bookings', bookings); }, [bookings]);
  useEffect(() => { saveToStorage('bb_leads', leads); }, [leads]);

  const addBooking = (b: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...b,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const addLead = (l: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...l,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const track = (event: string) => {
    console.log('[track]', event);
  };

  return (
    <AppContext.Provider value={{ bookings, leads, addBooking, addLead, track }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
