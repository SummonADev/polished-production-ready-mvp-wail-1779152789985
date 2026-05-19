import { useApp } from '@/lib/AppContext';
import { SAMPLE_LEADS } from '@/lib/sampleData';

export default function AdminPage() {
  const { state } = useApp();
  const leads = state.leads.length > 0 ? state.leads : SAMPLE_LEADS;

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem' }}>Admin Dashboard</h1>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#555' }}>Leads ({leads.length})</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {leads.map((lead) => (
          <div key={lead.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{lead.name}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{lead.email} &middot; {lead.role}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
              🐾 {lead.dogName} ({lead.dogBreed}) &middot; Event: {lead.eventDate}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.5rem' }}>{lead.goalStatement}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
