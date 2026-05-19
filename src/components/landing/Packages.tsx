import { PACKAGES } from '@/lib/packages';
import styles from './Packages.module.css';

type PackagesProps = {
  onCTA: () => void;
};

export default function Packages({ onCTA }: PackagesProps) {
  return (
    <section id="pricing" className={styles.section}>
      <div className="container">
        <div className={styles.sectionLabel}>Packages</div>
        <h2 className={styles.sectionTitle}>Simple, transparent pricing</h2>
        <p className={styles.sectionSub}>Every package includes the garment and the human support.</p>
        <div className={styles.grid}>
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className={`${styles.card} ${pkg.highlighted ? styles.cardHighlighted : ''}`}>
              {pkg.highlighted && <div className={styles.popularBadge}>Most Popular</div>}
              <div className={styles.packageName}>{pkg.name}</div>
              <div className={styles.tagline}>{pkg.tagline}</div>
              <div className={styles.price}>
                <span className={styles.priceAmount}>${pkg.price.toLocaleString()}</span>
                <span className={styles.pricePeriod}>one-time</span>
              </div>
              <div className={styles.features}>
                {pkg.features.map((f) => (
                  <div key={f} className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button
                className={`${styles.btn} ${pkg.highlighted ? styles.btnPrimary : styles.btnOutline}`}
                onClick={onCTA}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
