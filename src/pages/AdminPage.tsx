import { useApp } from '@/lib/AppContext';
import PageLayout from '@/components/shared/PageLayout';

export default function AdminPage() {
  const { state } = useApp();

  return (
    <PageLayout>
      <div style={{ padding: '60px 0' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '32px', color: 'var(--color-text-primary)' }}>
            Admin Dashboard
          </h1>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-primary)' }}>
              Leads ({state.leads.length})
            </h2>
            {state.leads.length === 0 ? (
              <p style={{ color: 'var(--color-text-secondary)' }}>No leads yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                      <th style={{ padding: '8px 12px' }}>Email</th>
                      <th style={{ padding: '8px 12px' }}>Name</th>
                      <th style={{ padding: '8px 12px' }}>Source</th>
                      <th style={{ padding: '8px 12px' }}>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.leads.map(lead => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '8px 12px' }}>{lead.email}</td>
                        <td style={{ padding: '8px 12px' }}>{lead.name || '—'}</td>
                        <td style={{ padding: '8px 12px' }}>{lead.source}</td>
                        <td style={{ padding: '8px 12px' }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-primary)' }}>
              Bookings ({state.bookings.length})
            </h2>
            {state.bookings.length === 0 ? (
              <p style={{ color: 'var(--color-text-secondary)' }}>No bookings yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                      <th style={{ padding: '8px 12px' }}>Owner</th>
                      <th style={{ padding: '8px 12px' }}>Dog</th>
                      <th style={{ padding: '8px 12px' }}>Package</th>
                      <th style={{ padding: '8px 12px' }}>Event Date</th>
                      <th style={{ padding: '8px 12px' }}>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.bookings.map(b => (
                      <tr key={b.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '8px 12px' }}>{b.ownerName}</td>
                        <td style={{ padding: '8px 12px' }}>{b.dogName} ({b.dogBreed})</td>
                        <td style={{ padding: '8px 12px' }}>{b.packageId}</td>
                        <td style={{ padding: '8px 12px' }}>{b.eventDate}</td>
                        <td style={{ padding: '8px 12px' }}>{new Date(b.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-primary)' }}>
              Analytics Events ({state.events.length})
            </h2>
            {state.events.length === 0 ? (
              <p style={{ color: 'var(--color-text-secondary)' }}>No events tracked yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                      <th style={{ padding: '8px 12px' }}>Event</th>
                      <th style={{ padding: '8px 12px' }}>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.events.map((ev, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '8px 12px' }}>{ev.event}</td>
                        <td style={{ padding: '8px 12px' }}>{new Date(ev.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
