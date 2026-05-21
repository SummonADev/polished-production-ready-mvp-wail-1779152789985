import { useApp } from '@/lib/AppContext';
import type { Booking } from '@/types/index';
import type { AppEvent } from '@/types/index';
import PageLayout from '@/components/shared/PageLayout';

export default function AdminPage() {
  const { bookings, leads, events } = useApp();

  const statusColor: Record<Booking['status'], string> = {
    pending: '#F59E0B',
    confirmed: '#22C55E',
    completed: '#3B82F6',
    cancelled: '#EF4444',
  };

  return (
    <PageLayout>
      <div style={{ padding: '40px 24px', maxWidth: 960, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>🛠 Admin Dashboard</h1>
        <p style={{ color: '#666', marginBottom: 40 }}>Internal view — all bookings, leads, and events.</p>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 16 }}>Bookings ({bookings.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {bookings.map(b => (
              <div key={b.id} style={{
                background: '#F8F8FF',
                border: '1px solid #E5E5E5',
                borderRadius: 12,
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 8,
              }}>
                <div>
                  <strong>{b.dogName}</strong> ({b.dogBreed}) — {b.ownerName}
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: 4 }}>
                    {b.packageName} · {b.eventDate} · {b.eventLocation}
                  </div>
                </div>
                <span style={{
                  background: statusColor[b.status],
                  color: 'white',
                  borderRadius: 999,
                  padding: '4px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}>{b.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 16 }}>Leads ({leads.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {leads.map(l => (
              <div key={l.id} style={{
                background: '#F8F8FF',
                border: '1px solid #E5E5E5',
                borderRadius: 8,
                padding: '12px 16px',
                fontSize: '0.9rem',
              }}>
                <strong>{l.email}</strong>{l.name ? ` — ${l.name}` : ''}
                <span style={{ color: '#999', marginLeft: 8 }}>via {l.source}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 16 }}>Event Log ({events.length})</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {events.map((e: AppEvent, i: number) => (
              <span key={i} style={{
                background: '#EDE9FE',
                color: '#4A2FA0',
                borderRadius: 999,
                padding: '4px 12px',
                fontSize: '0.78rem',
                fontWeight: 600,
              }}>{e}</span>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
