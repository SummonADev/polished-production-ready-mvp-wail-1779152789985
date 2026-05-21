import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { loadState, saveState } from './storage';
import type { Lead, Booking, AnalyticsEvent } from '@/types';

const STORAGE_KEY = 'bark-and-bow-state';

type State = {
  leads: Lead[];
  bookings: Booking[];
  analytics: AnalyticsEvent[];
};

type AppContextType = {
  state: State;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  track: (event: string, data?: Record<string, unknown>) => void;
};

const defaultState: State = { leads: [], bookings: [], analytics: [] };

type Action =
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'TRACK'; payload: AnalyticsEvent };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_LEAD':
      return { ...state, leads: [...state.leads, action.payload] };
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] };
    case 'TRACK':
      return { ...state, analytics: [...state.analytics, action.payload] };
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    reducer,
    defaultState,
    () => loadState<State>(STORAGE_KEY, defaultState)
  );

  useEffect(() => {
    saveState(STORAGE_KEY, state);
  }, [state]);

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    dispatch({
      type: 'ADD_LEAD',
      payload: { ...lead, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    });
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    dispatch({
      type: 'ADD_BOOKING',
      payload: { ...booking, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    });
  };

  const track = (event: string, data?: Record<string, unknown>) => {
    dispatch({
      type: 'TRACK',
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

export default AppContext;
