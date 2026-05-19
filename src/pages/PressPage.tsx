import PageLayout from '@/components/shared/PageLayout';

export default function PressPage() {
  return (
    <PageLayout>
      <main style={{ minHeight: '60vh', padding: '4rem 0' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Press &amp; Media
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: '600px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Bark &amp; Bow has been featured in leading publications celebrating the intersection of pets and weddings.
          </p>

          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', marginBottom: '3rem' }}>
            {[
              { outlet: 'The Knot', headline: 'The New Must-Have Wedding Vendor: A Dog Handler', date: 'March 2024' },
              { outlet: 'Brides Magazine', headline: '10 Ways to Include Your Dog in Your Wedding', date: 'January 2024' },
              { outlet: 'Martha Stewart Weddings', headline: 'Dressed to the Nines — Even the Dogs', date: 'November 2023' },
              { outlet: 'Vogue', headline: 'Canine Couture: The Rise of Wedding Dog Styling', date: 'September 2023' },
              { outlet: 'People Pets', headline: 'These Dogs Are Stealing the Show at Weddings', date: 'July 2023' },
              { outlet: 'Today Show', headline: 'Meet the Company Making Dogs Wedding-Ready', date: 'May 2023' },
            ].map((item) => (
              <div key={item.outlet} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', transition: 'box-shadow 0.2s' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{item.outlet}</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem', lineHeight: 1.4 }}>{item.headline}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.date}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '2rem', maxWidth: '560px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>Press Inquiries</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              For media inquiries, interview requests, or high-resolution assets, please reach out to our press team.
            </p>
            <a href="mailto:press@barkandbow.com" style={{ display: 'inline-block', background: 'var(--color-primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
              press@barkandbow.com
            </a>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
