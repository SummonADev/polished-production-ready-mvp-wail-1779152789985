import { useApp } from '@/lib/AppContext';
import type { Booking } from '@/types/index';
import PageLayout from '@/components/shared/PageLayout';

export default function AdminPage() {
  const { bookings, leads, events } = useApp();

  return (
    <PageLayout>
      <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '8px' }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>Internal overview — not customer-facing.</p>

        <Section title={`Bookings (${bookings.length})`}>
          {bookings.length === 0 ? <Empty /> : bookings.map((b: Booking) => (
            <Row key={b.id}>
              <Cell label="Owner">{b.ownerName}</Cell>
              <Cell label="Dog">{b.dogName} ({b.dogBreed})</Cell>
              <Cell label="Package">{b.packageId}</Cell>
              <Cell label="Date">{b.eventDate}</Cell>
              <Cell label="Status">
                <StatusBadge status={b.status} />
              </Cell>
            </Row>
          ))}
        </Section>

        <Section title={`Leads (${leads.length})`}>
          {leads.length === 0 ? <Empty /> : leads.map(l => (
            <Row key={l.id}>
              <Cell label="Email">{l.email}</Cell>
              <Cell label="Name">{l.name || '—'}</Cell>
              <Cell label="Source">{l.source}</Cell>
              <Cell label="Date">{new Date(l.createdAt).toLocaleDateString()}</Cell>
            </Row>
          ))}
        </Section>

        <Section title={`Analytics Events (${events.length})`}>
          {events.length === 0 ? <Empty /> : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {events.map((e, i) => (
                <span key={i} style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  fontSize: '0.8rem',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                }}>{e}</span>
              ))}
            </div>
          )}
        </Section>
      </div>
    </PageLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--color-primary)' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: '10px',
      padding: '12px 16px',
    }}>{children}</div>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ minWidth: '100px' }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>{children}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    confirmed: '#22C55E',
    pending: '#F59E0B',
    cancelled: '#EF4444',
  };
  return (
    <span style={{
      background: colors[status] ?? '#999',
      color: 'white',
      borderRadius: '999px',
      padding: '2px 10px',
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'capitalize',
    }}>{status}</span>
  );
}

function Empty() {
  return <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>No records yet.</p>;
}
