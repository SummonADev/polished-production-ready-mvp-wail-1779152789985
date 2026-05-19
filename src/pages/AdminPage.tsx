import { useApp } from '@/lib/AppContext';

export default function AdminPage() {
  const { state } = useApp();
  const leads = state.leads;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Admin — Leads ({leads.length})</h1>
      {leads.length === 0 && (
        <div style={{ color: '#6b7280' }}>No leads yet. Submit the onboarding form to create one.</div>
      )}
      {leads.map((lead) => (
        <div key={lead.id} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1rem' }}>
          <div style={{ fontWeight: 700, fontSize: '1rem' }}>{lead.name} — {lead.dogName} ({lead.dogBreed})</div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{lead.email} &middot; {lead.role}</div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Package: {lead.packageId} &middot; Status: {lead.status}</div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Event: {lead.eventDate}</div>
          {lead.goalStatement && (
            <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.5rem' }}>{lead.goalStatement}</div>
          )}
        </div>
      ))}
    </div>
  );
}
