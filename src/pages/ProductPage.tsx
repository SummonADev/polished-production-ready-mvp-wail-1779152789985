import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { useApp } from '@/lib/AppContext';
import styles from './SubPage.module.css';

const packages = [
  {
    name: 'The Gentleman',
    price: '$1,200',
    emoji: '🎩',
    tag: null,
    color: '#F4F4F7',
    desc: 'The essential Bark & Bow experience. Everything your dog needs to show up polished and supported for a key role in your ceremony.',
    features: [
      { icon: '🧵', text: 'Custom-fitted tuxedo or formal dress' },
      { icon: '✂️', text: 'Pre-event grooming session at your home' },
      { icon: '👤', text: 'Certified handler for 4 hours' },
      { icon: '📸', text: '30-minute professional photo session' },
      { icon: '🏠', text: 'Safe return transport home' },
      { icon: '📋', text: 'Post-event behavior report' },
    ],
    ideal: 'Single dog, supporting role (guest appearance, ring bearer)',
  },
  {
    name: 'The Grand Marshal',
    price: '$2,400',
    emoji: '🌟',
    tag: 'Most Popular',
    color: '#EEF0FF',
    desc: 'Our flagship package. Full-day coverage with a dedicated coordinator, premium accessories, and priority gallery delivery.',
    features: [
      { icon: '🧵', text: 'Everything in The Gentleman' },
      { icon: '⏰', text: 'Full-day handler coverage (8 hours)' },
      { icon: '💎', text: 'Bespoke accessories: bow tie, pocket square, collar' },
      { icon: '📸', text: '1-hour professional photo session' },
      { icon: '🖼️', text: 'Priority gallery edit within 24 hours' },
      { icon: '🎯', text: 'Dedicated event coordinator on-site' },
      { icon: '🤝', text: 'Pre-event handler meet-and-greet' },
    ],
    ideal: 'Single dog, primary role (processional, ceremony, reception)',
  },
  {
    name: 'The Royal Pack',
    price: '$3,800',
    emoji: '👑',
    tag: 'Best Value',
    color: '#FFF7ED',
    desc: 'For multiple dogs, extra-special occasions, or clients who simply want the very best. No detail left to chance.',
    features: [
      { icon: '🌟', text: 'Everything in The Grand Marshal' },
      { icon: '🐕', text: 'Up to 3 dogs covered' },
      { icon: '👥', text: 'Multiple handlers assigned (1:1 ratio)' },
      { icon: '🎭', text: 'Rehearsal walk-through the day before' },
      { icon: '🏆', text: 'Custom engraved keepsake collar' },
      { icon: '⏰', text: 'Full-day coverage (12 hours)' },
      { icon: '📞', text: 'Priority post-event concierge follow-up' },
    ],
    ideal: 'Multiple dogs, destination weddings, celebrity/VIP events',
  },
];

const addOns = [
  { name: 'Extra Handler Hour', price: '$85', desc: 'Extend your handler coverage in hourly increments.' },
  { name: 'Second Dog', price: '+$600', desc: 'Add a second dog to any package.' },
  { name: 'Rehearsal Visit', price: '$200', desc: 'Handler attends your rehearsal dinner for a dry run.' },
  { name: 'Luxury Grooming Upgrade', price: '+$150', desc: 'Spa treatment: aromatherapy, teeth brushing, blueberry facial.' },
  { name: 'Extended Photo Session', price: '+$250', desc: 'Add an extra 30 minutes and 25 additional edited photos.' },
  { name: 'Keepsake Collar', price: '$180', desc: 'Hand-engraved sterling silver tag with your wedding date.' },
];

export default function ProductPage() {
  const navigate = useNavigate();
  const { track } = useApp();
  const handleCTA = () => { track('landing_page_cta_click'); navigate('/onboarding'); };

  return (
    <div>
      <Navbar onCTA={handleCTA} />
      <main>
        <section className={styles.pageHero}>
          <div className="container-narrow">
            <span className={styles.eyebrow}>Our Packages</span>
            <h1 className={styles.pageTitle}>Every Dog. Every Detail.</h1>
            <p className={styles.pageSub}>Three thoughtfully designed packages that cover everything from custom formalwear to full-day professional handling. No guesswork, no logistics nightmares.</p>
          </div>
        </section>

        {/* Packages */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.productGrid}>
              {packages.map(pkg => (
                <div key={pkg.name} className={`${styles.productCard} ${pkg.tag === 'Most Popular' ? styles.productCardFeatured : ''}`} style={{ '--card-bg': pkg.color } as React.CSSProperties}>
                  {pkg.tag && <div className={styles.productTag}>{pkg.tag}</div>}
                  <div className={styles.productCardHeader}>
                    <span className={styles.productEmoji}>{pkg.emoji}</span>
                    <div>
                      <h3 className={styles.productName}>{pkg.name}</h3>
                      <span className={styles.productPrice}>{pkg.price}</span>
                    </div>
                  </div>
                  <p className={styles.productDesc}>{pkg.desc}</p>
                  <ul className={styles.productFeatures}>
                    {pkg.features.map(f => (
                      <li key={f.text} className={styles.productFeature}>
                        <span>{f.icon}</span><span>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.productIdeal}>
                    <strong>Ideal for:</strong> {pkg.ideal}
                  </div>
                  <button className={`${styles.productBtn} ${pkg.tag === 'Most Popular' ? styles.productBtnFeatured : ''}`} onClick={handleCTA}>
                    Book {pkg.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Add-On Services</h2>
            <p className={styles.sectionSub}>Customize any package with premium extras.</p>
            <div className={styles.addOnGrid}>
              {addOns.map(a => (
                <div key={a.name} className={styles.addOnCard}>
                  <div className={styles.addOnTop}>
                    <span className={styles.addOnName}>{a.name}</span>
                    <span className={styles.addOnPrice}>{a.price}</span>
                  </div>
                  <p className={styles.addOnDesc}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee */}
        <section className={styles.section}>
          <div className="container-narrow">
            <div className={styles.guaranteeBox}>
              <span style={{ fontSize: '2.5rem' }}>🛡️</span>
              <h3 className={styles.guaranteeTitle}>The Bark & Bow Guarantee</h3>
              <p className={styles.guaranteeText}>
                If your dog isn't comfortable or can't participate on the event day, we'll refund 100% of your handler fee. 
                No questions asked. Your dog's wellbeing always comes first.
              </p>
              <div className={styles.guaranteeBadges}>
                <span className={styles.guaranteeBadge}>✓ $2M Liability Coverage</span>
                <span className={styles.guaranteeBadge}>✓ Pet First-Aid Certified</span>
                <span className={styles.guaranteeBadge}>✓ 100% Satisfaction Promise</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <h2 className={styles.ctaTitle}>Not sure which package is right?</h2>
            <p className={styles.ctaSub}>Answer a few quick questions and we'll recommend the perfect experience for your dog.</p>
            <button className={styles.ctaBtn} onClick={handleCTA}>Get a Personalized Recommendation</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
