import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AppState, OnboardingData, BookingPlan, Lead, AnalyticsEvent } from '@/types';

type Action =
  | { type: 'SET_USER'; payload: OnboardingData }
  | { type: 'SET_BOOKING_PLAN'; payload: BookingPlan }
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'TRACK'; payload: AnalyticsEvent }
  | { type: 'HYDRATE'; payload: AppState };

const initialState: AppState = {
  user: null,
  bookingPlan: null,
  leads: [],
  analytics: [],
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload;
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_BOOKING_PLAN':
      return { ...state, bookingPlan: action.payload };
    case 'ADD_LEAD':
      return { ...state, leads: [action.payload, ...state.leads] };
    case 'TRACK':
      return { ...state, analytics: [...state.analytics, action.payload] };
    default:
      return state;
  }
}

type AppContextType = {
  state: AppState;
  setUser: (data: OnboardingData) => void;
  setBookingPlan: (plan: BookingPlan) => void;
  addLead: (lead: Lead) => void;
  track: (event: string, data?: Record<string, string>) => void;
};

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = 'bark_bow_state';

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AppState;
        dispatch({ type: 'HYDRATE', payload: parsed });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  const setUser = (data: OnboardingData) => dispatch({ type: 'SET_USER', payload: data });
  const setBookingPlan = (plan: BookingPlan) => dispatch({ type: 'SET_BOOKING_PLAN', payload: plan });
  const addLead = (lead: Lead) => dispatch({ type: 'ADD_LEAD', payload: lead });
  const track = (event: string, data?: Record<string, string>) =>
    dispatch({ type: 'TRACK', payload: { event, timestamp: new Date().toISOString(), data } });

  return (
    <AppContext.Provider value={{ state, setUser, setBookingPlan, addLead, track }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
