import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { AppState, OnboardingData, BookingPlan, Lead, AnalyticsEvent } from '@/types';
import { saveleads, loadLeads } from '@/lib/storage';

const initialState: AppState = {
  leads: loadLeads(),
  onboardingData: null,
  user: null,
  bookingPlan: null,
  analytics: [],
};

type Action =
  | { type: 'SET_USER'; payload: Lead }
  | { type: 'SET_BOOKING_PLAN'; payload: BookingPlan }
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'TRACK'; payload: AnalyticsEvent };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_BOOKING_PLAN':
      return { ...state, bookingPlan: action.payload };
    case 'ADD_LEAD': {
      const leads = [...state.leads, action.payload];
      saveleads(leads);
      return { ...state, leads };
    }
    case 'TRACK':
      return { ...state, analytics: [...state.analytics, action.payload] };
    default:
      return state;
  }
}

type AppContextValue = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  track: (event: string, properties?: Record<string, unknown>) => void;
  submitOnboarding: (data: OnboardingData) => Lead;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const track = (event: string, properties?: Record<string, unknown>) => {
    dispatch({
      type: 'TRACK',
      payload: { event, properties, timestamp: new Date().toISOString() },
    });
  };

  const submitOnboarding = (data: OnboardingData): Lead => {
    const lead: Lead = {
      id: `lead_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      dogName: data.dogName,
      dogBreed: data.dogBreed,
      dogAge: data.dogAge,
      eventDate: data.eventDate,
      goalStatement: data.goalStatement,
      packageId: 'signature',
      status: 'inquiry',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_LEAD', payload: lead });
    dispatch({ type: 'SET_USER', payload: lead });
    track('onboarding_complete', { email: data.email });
    return lead;
  };

  return (
    <AppContext.Provider value={{ state, dispatch, track, submitOnboarding }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
