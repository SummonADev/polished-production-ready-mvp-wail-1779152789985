import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/shared/PageLayout';
import DogImage from '@/components/shared/DogImage';
import { PACKAGES } from '@/lib/packages';
import styles from './ProductPage.module.css';

const ADDON_FEATURES = [
  { icon: '✂️', title: 'Custom Tailoring', desc: 'Every garment hand-crafted to your dog\'s exact measurements. No generic sizing.' },
  { icon: '🧴', title: 'Spa Grooming', desc: 'Organic bath, nail trim, blow-dry, and a pre-event outfit dry-run.' },
  { icon: '🤝', title: 'Pro Pet Handler', desc: 'Certified, background-checked handlers with event & canine behavior training.' },
  { icon: '📸', title: 'Photo Session', desc: '50+ professionally edited images in 5 business days.' },
  { icon: '🚗', title: 'Transportation', desc: 'Door-to-venue-to-home. Climate-controlled, pet-safe vehicles.' },
  { icon: '🏨', title: 'Overnight Spa Stay', desc: 'Calm your dog the night before — luxury boarding, wellness check included.' },
  { icon: '🎖️', title: 'Engraved Keepsake', desc: 'Custom collar with your wedding date. A memory that lasts beyond the day.' },
  { icon: '📜', title: 'Liability Certificate', desc: '$1M event-day coverage. Peace of mind for you and your venue.' },
];

const GALLERY_ITEMS = [
  { variant: 'golden' as const, label: 'Winston — Golden Retriever', event: 'Napa Valley, Sept 2024' },
  { variant: 'frenchie' as const, label: 'Biscuit — French Bulldog', event: 'NYC Rooftop, Oct 2024' },
  { variant: 'collie' as const, label: 'Luna — Border Collie', event: 'Chicago Ballroom, Nov 2024' },
  { variant: 'corgi' as const, label: 'Archie — Corgi', event: 'Malibu Beach, Aug 2024' },
  { variant: 'poodle' as const, label: 'Coco — Toy Poodle', event: 'The Plaza, NYC, July 2024' },
  { variant: 'husky' as const, label: 'Thor — Husky', event: 'Aspen Estate, Dec 2024' },
];

export default function ProductPage() {
  const navigate = useNavigate();
  return (
    <PageLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroPill}>Product Overview</div>
          <h1 className={styles.heroTitle}>The Full Bark & Bow Experience</h1>
          <p className={styles.heroSub}>
            A tuxedo is 10% of the problem. We solve the other 90% — grooming, handling, transport, photography, and everything in between.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}><span className={styles.statNum}>500+</span><span className={styles.statLabel}>Events Served</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><span className={styles.statNum}>98%</span><span className={styles.statLabel}>Client Satisfaction</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><span className={styles.statNum}>All Breeds</span><span className={styles.statLabel}>Welcome</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><span className={styles.statNum}>5 Cities</span><span className={styles.statLabel}>& Growing</span></div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className={styles.featuresSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Everything Included</h2>
          <p className={styles.sectionSub}>Every package is built around a core set of premium services. Higher tiers add more time, coverage, and luxury extras.</p>
          <div className={styles.featuresGrid}>
            {ADDON_FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className={styles.gallerySection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Dogs in Tuxedos</h2>
          <p className={styles.sectionSub}>Real Bark & Bow clients. Real events. Undeniably adorable.</p>
          <div className={styles.galleryGrid}>
            {GALLERY_ITEMS.map((item) => (
              <div key={item.variant} className={styles.galleryCard}>
                <DogImage variant={item.variant} size="xl" />
                <div className={styles.galleryMeta}>
                  <div className={styles.galleryLabel}>{item.label}</div>
                  <div className={styles.galleryEvent}>{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className={styles.packagesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Choose Your Package</h2>
          <p className={styles.sectionSub}>All packages include a custom-fitted garment. Higher tiers unlock more services, time, and luxury touches.</p>
          <div className={styles.packagesGrid}>
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className={`${styles.packageCard} ${pkg.highlighted ? styles.highlighted : ''}`}>
                {pkg.highlighted && <div className={styles.popularBadge}>Most Popular</div>}
                <h3 className={styles.pkgName}>{pkg.name}</h3>
                <div className={styles.pkgPrice}>${pkg.price.toLocaleString()}</div>
                <p className={styles.pkgTagline}>{pkg.tagline}</p>
                <ul className={styles.pkgFeatures}>
                  {pkg.features.map((f) => (
                    <li key={f} className={styles.pkgFeature}>
                      <span className={styles.checkIcon}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`${styles.pkgBtn} ${pkg.highlighted ? styles.pkgBtnPrimary : ''}`}
                  onClick={() => navigate('/onboarding')}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaDogs}>
              <DogImage variant="dachshund" size="md" />
            </div>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Your dog deserves a grand entrance.</h2>
              <p className={styles.ctaSub}>Join 500+ couples who trusted Bark & Bow with their most important four-legged guest.</p>
              <button className={styles.ctaBtn} onClick={() => navigate('/onboarding')}>Start Your Booking →</button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
