import { useApp } from '@/lib/AppContext';
import PageLayout from '@/components/shared/PageLayout';

export default function AdminPage() {
  const { state } = useApp();

  return (
    <PageLayout>
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '32px' }}>
            🔐 Admin Dashboard
          </h1>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
              Bookings ({state.bookings.length})
            </h2>
            {state.bookings.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }}>No bookings yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-surface)', borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Dog</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Package</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Event Date</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.bookings.map((b, i) => (
                      <tr key={b.id ?? i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '8px 12px' }}>{b.name}</td>
                        <td style={{ padding: '8px 12px' }}>{b.email}</td>
                        <td style={{ padding: '8px 12px' }}>{b.dogName} ({b.dogBreed})</td>
                        <td style={{ padding: '8px 12px' }}>{b.packageId}</td>
                        <td style={{ padding: '8px 12px' }}>{b.eventDate}</td>
                        <td style={{ padding: '8px 12px' }}>{b.eventLocation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
              Leads ({state.leads.length})
            </h2>
            {state.leads.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }}>No leads yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-surface)', borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Source</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.leads.map((l, i) => (
                      <tr key={l.id ?? i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '8px 12px' }}>{l.name || '—'}</td>
                        <td style={{ padding: '8px 12px' }}>{l.email}</td>
                        <td style={{ padding: '8px 12px' }}>{l.source}</td>
                        <td style={{ padding: '8px 12px' }}>{l.createdAt ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
              Analytics Events ({state.analytics.length})
            </h2>
            {state.analytics.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }}>No events tracked yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-surface)', borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Event</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.analytics.map((a, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '8px 12px' }}>{a.event}</td>
                        <td style={{ padding: '8px 12px' }}>{a.timestamp}</td>
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
