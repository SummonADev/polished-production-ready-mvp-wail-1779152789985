export interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  role?: string;
  createdAt: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface AppEvent {
  name: string;
  timestamp: string;
  meta?: Record<string, unknown>;
}
