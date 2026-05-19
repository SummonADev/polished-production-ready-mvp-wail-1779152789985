import { createContext, useContext, useReducer, ReactNode } from 'react';
import { loadFromStorage, saveToStorage } from '@/lib/storage';
import type { AppState, Lead, BookingSubmission, AnalyticsEvent } from '@/types';

export type AppContextType = {
  state: AppState;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  submitOnboarding: (submission: Omit<BookingSubmission, 'id' | 'createdAt'>) => void;
  track: (event: string, data?: Record<string, unknown>) => void;
};

type Action =
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'ADD_BOOKING'; payload: BookingSubmission }
  | { type: 'ADD_EVENT'; payload: AnalyticsEvent };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_LEAD': {
      const next = { ...state, leads: [...state.leads, action.payload] };
      saveToStorage('app_state', next);
      return next;
    }
    case 'ADD_BOOKING': {
      const next = { ...state, bookings: [...state.bookings, action.payload] };
      saveToStorage('app_state', next);
      return next;
    }
    case 'ADD_EVENT': {
      const next = { ...state, events: [...state.events, action.payload] };
      saveToStorage('app_state', next);
      return next;
    }
    default:
      return state;
  }
}

const defaultState: AppState = {
  leads: [],
  bookings: [],
  events: [],
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    reducer,
    defaultState,
    (init) => ({ ...init, ...loadFromStorage<Partial<AppState>>('app_state') })
  );

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    dispatch({
      type: 'ADD_LEAD',
      payload: { ...lead, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    });
  };

  const submitOnboarding = (submission: Omit<BookingSubmission, 'id' | 'createdAt'>) => {
    dispatch({
      type: 'ADD_BOOKING',
      payload: { ...submission, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    });
  };

  const track = (event: string, data?: Record<string, unknown>) => {
    dispatch({
      type: 'ADD_EVENT',
      payload: { event, data, timestamp: new Date().toISOString() },
    });
  };

  return (
    <AppContext.Provider value={{ state, addLead, submitOnboarding, track }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
