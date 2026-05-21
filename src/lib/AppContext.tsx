import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Lead, BookingSubmission, AnalyticsEvent } from '@/types';
import { loadState, saveState } from '@/lib/storage';

type State = {
  leads: Lead[];
  bookings: BookingSubmission[];
  analytics: AnalyticsEvent[];
};

type Action =
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'ADD_BOOKING'; payload: BookingSubmission }
  | { type: 'ADD_ANALYTICS'; payload: AnalyticsEvent };

type AppContextType = {
  state: State;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  addBooking: (booking: Omit<BookingSubmission, 'id' | 'createdAt'>) => void;
  track: (event: string, data?: Record<string, unknown>) => void;
};

const AppContext = createContext<AppContextType | null>(null);

const initialState: State = {
  leads: [],
  bookings: [],
  analytics: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_LEAD':
      return { ...state, leads: [...state.leads, action.payload] };
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] };
    case 'ADD_ANALYTICS':
      return { ...state, analytics: [...state.analytics, action.payload] };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const saved = loadState();
    return saved ?? initialState;
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    dispatch({
      type: 'ADD_LEAD',
      payload: { ...lead, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    });
  };

  const addBooking = (booking: Omit<BookingSubmission, 'id' | 'createdAt'>) => {
    dispatch({
      type: 'ADD_BOOKING',
      payload: { ...booking, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    });
  };

  const track = (event: string, data?: Record<string, unknown>) => {
    dispatch({
      type: 'ADD_ANALYTICS',
      payload: { event, data, timestamp: new Date().toISOString() },
    });
  };

  return (
    <AppContext.Provider value={{ state, addLead, addBooking, track }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
