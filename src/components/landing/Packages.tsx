import styles from './Packages.module.css';

const packages = [
  {
    name: 'The Gentleman',
    price: '$1,200',
    period: 'per event',
    emoji: '🎩',
    tag: null,
    desc: 'Perfect for a single dog with a supporting role.',
    features: [
      'Custom-fitted tuxedo or dress',
      'Pre-event grooming session',
      'Professional handler (4 hours)',
      '30-min photo session',
      'Safe return home',
    ],
  },
  {
    name: 'The Grand Marshal',
    price: '$2,400',
    period: 'per event',
    emoji: '🌟',
    tag: 'Most Popular',
    desc: 'Our flagship full-service experience.',
    features: [
      'Everything in The Gentleman',
      'Handler for full event (8 hours)',
      'Bespoke accessories & bow tie',
      '1-hour professional photo session',
      'Wedding gallery priority edit',
      'Dedicated event coordinator',
    ],
  },
  {
    name: 'The Royal Pack',
    price: '$3,800',
    period: 'per event',
    emoji: '👑',
    tag: null,
    desc: 'For multiple dogs or extra-special occasions.',
    features: [
      'Everything in The Grand Marshal',
      'Up to 3 dogs',
      'Multiple handlers assigned',
      'Rehearsal walk-through included',
      'Custom engraved keepsake collar',
      'Full-day coverage (12 hours)',
    ],
  },
];

type PackagesProps = { onCTA: () => void };

export default function Packages({ onCTA }: PackagesProps) {
  return (
    <section id="pricing" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>Pricing</span>
          <h2 className={styles.title}>Choose Your Package</h2>
          <p className={styles.sub}>All-inclusive event-day experiences. No hidden fees.</p>
        </div>
        <div className={styles.grid}>
          {packages.map(pkg => (
            <div key={pkg.name} className={`${styles.card} ${pkg.tag ? styles.featured : ''}`}>
              {pkg.tag && <div className={styles.featuredBadge}>{pkg.tag}</div>}
              <div className={styles.cardTop}>
                <span className={styles.emoji}>{pkg.emoji}</span>
                <h3 className={styles.pkgName}>{pkg.name}</h3>
                <p className={styles.pkgDesc}>{pkg.desc}</p>
              </div>
              <div className={styles.price}>
                <span className={styles.priceNum}>{pkg.price}</span>
                <span className={styles.pricePer}>{pkg.period}</span>
              </div>
              <ul className={styles.features}>
                {pkg.features.map(f => (
                  <li key={f} className={styles.feature}>
                    <span className={styles.check}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button
                className={`${styles.btn} ${pkg.tag ? styles.btnFeatured : ''}`}
                onClick={onCTA}
              >
                Book This Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
