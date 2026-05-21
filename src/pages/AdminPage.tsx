import { useApp } from '@/lib/AppContext';
import type { Booking } from '@/lib/AppContext';
import PageLayout from '@/components/shared/PageLayout';

export default function AdminPage() {
  const { bookings } = useApp();

  return (
    <PageLayout>
      <div style={{ padding: '40px 0', minHeight: '60vh' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '8px' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>{bookings.length} booking(s) total</p>

          {bookings.length === 0 ? (
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
              color: 'var(--color-text-muted)'
            }}>
              No bookings yet. Once customers complete onboarding, they'll appear here.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--color-surface)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <thead>
                  <tr style={{ background: 'var(--color-bg-secondary)', borderBottom: '2px solid var(--color-border)' }}>
                    {['Name', 'Email', 'Dog', 'Package', 'Date', 'Location'].map(h => (
                      <th key={h} style={{ padding: '12px', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b: Booking, i: number) => (
                    <tr key={b.id} style={{ borderBottom: i < bookings.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
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
        </div>
      </div>
    </PageLayout>
  );
}
