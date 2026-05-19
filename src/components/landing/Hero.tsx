import styles from './Hero.module.css';

type HeroProps = { onCTA: () => void };

export default function Hero({ onCTA }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.bgGradient} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Now booking for 2025 wedding season
          </div>
          <h1 className={styles.headline}>
            Your Dog Deserves a<br />
            <span className={styles.highlight}>Standing Ovation</span>
          </h1>
          <p className={styles.sub}>
            Custom formalwear, professional grooming, expert handlers, and a photo shoot — 
            everything your dog needs to be the best Best Dog at your wedding.
          </p>
          <div className={styles.ctas}>
            <button className={styles.primaryBtn} onClick={onCTA}>
              Book Your Dog's Experience
            </button>
            <button className={styles.secondaryBtn} onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              See How It Works ↓
            </button>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statLabel}>Happy Couples</span>
            </div>
            <div className={styles.statDiv} />
            <div className={styles.stat}>
              <span className={styles.statNum}>98%</span>
              <span className={styles.statLabel}>Stress-Free Events</span>
            </div>
            <div className={styles.statDiv} />
            <div className={styles.stat}>
              <span className={styles.statNum}>50+</span>
              <span className={styles.statLabel}>Cities Served</span>
            </div>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.card}>
            <DogHeroDisplay />
          </div>
        </div>
      </div>
    </section>
  );
}

function DogHeroDisplay() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #2D1B69 0%, #4A2FA0 50%, #F4A261 100%)',
        borderRadius: '16px',
        padding: '32px 24px',
        textAlign: 'center',
        color: 'white',
        minHeight: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}>
        <div style={{ fontSize: '64px', lineHeight: 1 }}>🐕</div>
        <div style={{ fontSize: '28px' }}>🎩</div>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>Max — Ring Bearer</p>
        <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>Golden Retriever · Custom Tuxedo ✓</p>
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '0.8rem',
          fontWeight: 600
        }}>Handler Assigned · Grooming Booked ✓</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {[
          { emoji: '🧵', label: 'Custom Fit', sub: 'Tailored tuxedo' },
          { emoji: '✂️', label: 'Pre-Event Groom', sub: 'Day-of prep' },
          { emoji: '👤', label: 'Pro Handler', sub: 'Certified expert' },
          { emoji: '📸', label: 'Photo Session', sub: 'Pro shoot included' },
        ].map(item => (
          <div key={item.label} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '14px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{ fontSize: '1.3rem' }}>{item.emoji}</span>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1A1A2E', lineHeight: 1.2 }}>{item.label}</p>
              <p style={{ fontSize: '0.72rem', color: '#5A5A7A', lineHeight: 1.2 }}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
