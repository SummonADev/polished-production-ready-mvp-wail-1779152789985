import type { Lead } from '@/types';

const LEADS_KEY = 'bark_bow_leads';

export function getLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    return raw ? (JSON.parse(raw) as Lead[]) : [];
  } catch {
    return [];
  }
}

export function saveLead(lead: Lead): void {
  try {
    const existing = getLeads();
    const updated = [lead, ...existing.filter((l) => l.email !== lead.email)];
    localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}
