import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserProfile = {
  name: string;
  email: string;
  role: string;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  eventDate: string;
  painPoint: string;
  goal: string;
};

export type Lead = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  source: string;
};

export type WorkflowOutput = {
  id: string;
  type: string;
  content: string;
  createdAt: string;
};

type AppState = {
  user: UserProfile | null;
  leads: Lead[];
  outputs: WorkflowOutput[];
  analyticsEvents: { event: string; ts: string }[];
  onboardingComplete: boolean;
};

type AppContextType = AppState & {
  setUser: (u: UserProfile) => void;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  addOutput: (output: Omit<WorkflowOutput, 'id' | 'createdAt'>) => void;
  track: (event: string) => void;
  completeOnboarding: () => void;
  clearUser: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

function loadState(): AppState {
  try {
    const raw = localStorage.getItem('barkbow_state');
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    user: null,
    leads: [],
    outputs: [],
    analyticsEvents: [],
    onboardingComplete: false,
  };
}

function saveState(state: AppState) {
  try {
    localStorage.setItem('barkbow_state', JSON.stringify(state));
  } catch {}
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setUser = (u: UserProfile) =>
    setState(s => ({ ...s, user: u }));

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt'>) =>
    setState(s => ({
      ...s,
      leads: [
        ...s.leads,
        { ...lead, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
      ],
    }));

  const addOutput = (output: Omit<WorkflowOutput, 'id' | 'createdAt'>) =>
    setState(s => ({
      ...s,
      outputs: [
        ...s.outputs,
        { ...output, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
      ],
    }));

  const track = (event: string) =>
    setState(s => ({
      ...s,
      analyticsEvents: [
        ...s.analyticsEvents,
        { event, ts: new Date().toISOString() },
      ],
    }));

  const completeOnboarding = () =>
    setState(s => ({ ...s, onboardingComplete: true }));

  const clearUser = () =>
    setState(s => ({ ...s, user: null, onboardingComplete: false }));

  return (
    <AppContext.Provider
      value={{ ...state, setUser, addLead, addOutput, track, completeOnboarding, clearUser }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
