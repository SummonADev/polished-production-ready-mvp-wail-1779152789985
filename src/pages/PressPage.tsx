import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { useApp } from '@/lib/AppContext';
import styles from './SubPage.module.css';

const coverage = [
  {
    outlet: 'The Knot',
    category: 'Feature',
    date: 'October 2024',
    headline: 'The Most Innovative Wedding Vendor of 2024',
    excerpt: 'Bark & Bow has quietly become the most talked-about vendor at high-end weddings this year. Their turnkey approach — garment, grooming, handler, photographer — has set a new standard for pet participation at formal events.',
    emoji: '💍',
  },
  {
    outlet: 'Vogue Weddings',
    category: 'Trend Report',
    date: 'September 2024',
    headline: 'How Bark & Bow Is Redefining the Four-Legged Guest',
    excerpt: 'What started as a niche service in Brooklyn has exploded into a national movement. Bark & Bow\'s bespoke canine formalwear is showing up at the most photographed weddings of the season.',
    emoji: '👗',
  },
  {
    outlet: 'Martha Stewart Weddings',
    category: 'Profile',
    date: 'August 2024',
    headline: 'The Duo Turning Dogs Into Wedding Icons',
    excerpt: 'Co-founders Camille Hartley and Theo Nakamura share the origin story of Bark & Bow and their vision for a world where every dog can attend a wedding safely, beautifully, and memorably.',
    emoji: '🌿',
  },
  {
    outlet: 'TechCrunch',
    category: 'Startup',
    date: 'July 2024',
    headline: 'Pet Concierge Startup Bark & Bow Raises $2.4M Seed Round',
    excerpt: 'The luxury pet event service has closed a $2.4M seed round led by Precursor Ventures, with participation from angels including former Rover and Wag! executives. The company plans to expand to 20 US cities by end of 2025.',
    emoji: '🚀',
  },
  {
    outlet: 'Brides Magazine',
    category: 'Wedding Guide',
    date: 'June 2024',
    headline: 'Your Complete Guide to Having a Dog at Your Wedding',
    excerpt: 'Bark & Bow gets top billing in Brides\' definitive guide to dog-inclusive weddings. "They\'ve solved almost every logistical problem," writes senior editor Amanda Torres.',
    emoji: '📖',
  },
  {
    outlet: 'New York Times',
    category: 'Lifestyle',
    date: 'April 2024',
    headline: 'Something New, Something Blue, Something Furry',
    excerpt: 'The Times explores the growing trend of dogs at formal events, leading with Bark & Bow as the defining example of how the wedding industry is adapting to the pet-inclusive generation.',
    emoji: '📰',
  },
];

const awards = [
  { name: 'Best New Vendor', from: 'The Knot', year: '2024' },
  { name: 'Innovation Award', from: 'WeddingPro', year: '2024' },
  { name: 'Top Pet Business', from: 'Pet Age Magazine', year: '2024' },
  { name: 'Editors\' Choice', from: 'Brides Magazine', year: '2024' },
];

export default function PressPage() {
  const navigate = useNavigate();
  const { track } = useApp();
  const handleCTA = () => { track('landing_page_cta_click'); navigate('/onboarding'); };

  return (
    <div>
      <Navbar onCTA={handleCTA} />
      <main>
        <section className={styles.pageHero}>
          <div className="container-narrow">
            <span className={styles.eyebrow}>In the News</span>
            <h1 className={styles.pageTitle}>Bark & Bow in the Press</h1>
            <p className={styles.pageSub}>From TechCrunch to Vogue, Bark & Bow has been featured in the publications defining the future of weddings and pet care.</p>
            <div className={styles.pressContact}>
              <span>Media inquiries:</span>
              <a href="mailto:press@barkandbow.com" className={styles.pressEmail}>press@barkandbow.com</a>
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.pressGrid}>
              {coverage.map(item => (
                <div key={item.outlet} className={styles.pressArticleCard}>
                  <div className={styles.pressArticleTop}>
                    <div className={styles.pressOutletBadge}>
                      <span>{item.emoji}</span>
                      <span>{item.outlet}</span>
                    </div>
                    <span className={styles.pressCategoryTag}>{item.category}</span>
                  </div>
                  <p className={styles.pressDate}>{item.date}</p>
                  <h3 className={styles.pressHeadline}>{item.headline}</h3>
                  <p className={styles.pressExcerpt}>{item.excerpt}</p>
                  <button className={styles.pressReadMore}>Read Article →</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Awards & Recognition</h2>
            <div className={styles.awardsGrid}>
              {awards.map(a => (
                <div key={a.name} className={styles.awardCard}>
                  <span className={styles.awardTrophy}>🏆</span>
                  <h4 className={styles.awardName}>{a.name}</h4>
                  <p className={styles.awardFrom}>{a.from} · {a.year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Press Kit */}
        <section className={styles.section}>
          <div className="container-narrow">
            <div className={styles.pressKitBox}>
              <div>
                <h3 className={styles.pressKitTitle}>Press Kit</h3>
                <p className={styles.pressKitText}>Download our brand assets, founder photos, product images, and company fact sheet.</p>
              </div>
              <a href="mailto:press@barkandbow.com" className={styles.pressKitBtn}>Request Press Kit</a>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <h2 className={styles.ctaTitle}>Want to cover Bark & Bow?</h2>
            <p className={styles.ctaSub}>We're happy to connect for interviews, product demos, and event access. Reach us at press@barkandbow.com</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
