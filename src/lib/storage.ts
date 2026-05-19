import type { Lead } from '@/types';

const LEADS_KEY = 'bark_and_bow_leads';

export function saveleads(leads: Lead[]): void {
  try {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  } catch {
    // ignore
  }
}

export function loadLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}
