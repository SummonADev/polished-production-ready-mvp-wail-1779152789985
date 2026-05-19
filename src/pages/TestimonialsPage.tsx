import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/shared/PageLayout';
import DogImage from '@/components/shared/DogImage';
import styles from './TestimonialsPage.module.css';

const FEATURED = [
  {
    quote: 'Winston walked down the aisle perfectly. The handler was invisible — you would never have known she was there. Our guests are still talking about it six months later.',
    author: 'Emily & James Carter',
    role: 'Married Sept 2024 · Rosewood Estate, Napa Valley',
    dogName: 'Winston',
    dogBreed: 'Golden Retriever',
    package: 'Signature',
    rating: 5,
    imageVariant: 'golden' as const,
  },
  {
    quote: 'As a wedding planner, I was skeptical. I\'ve seen dog disasters at weddings. But Bark & Bow was airtight. They pre-walked the venue, had a backup plan, and Luna was an absolute star.',
    author: 'Sophia Ramirez',
    role: 'Lead Planner, Planning Perfect · NYC',
    dogName: 'Luna',
    dogBreed: 'French Bulldog',
    package: 'Elite',
    rating: 5,
    imageVariant: 'frenchie' as const,
  },
  {
    quote: 'The photos are worth every penny. Coco in her little floral gown, sitting between us at the altar — I cried. The whole experience was five-star from start to finish.',
    author: 'Marcus & Olivia Thompson',
    role: 'Married Nov 2024 · The Grand Ballroom, Chicago',
    dogName: 'Coco',
    dogBreed: 'Border Collie Mix',
    package: 'Elite',
    rating: 5,
    imageVariant: 'collie' as const,
  },
];

const GRID_REVIEWS = [
  {
    quote: 'Archie wore his tuxedo like he was born in it. The pre-event grooming was immaculate.',
    author: 'Priya & Dev Sharma',
    role: 'Married Aug 2024',
    dogName: 'Archie',
    package: 'Signature',
    rating: 5,
  },
  {
    quote: 'The overnight spa stay was the best add-on. Thor came home calm and happy.',
    author: 'Jake & Meredith Collins',
    role: 'Married Dec 2024',
    dogName: 'Thor',
    package: 'Elite',
    rating: 5,
  },
  {
    quote: 'As a planner, I now include Bark & Bow in every dog-inclusive wedding proposal.',
    author: 'Francesca Lombardi',
    role: 'Senior Planner · SF',
    dogName: 'Multiple clients',
    package: 'Signature',
    rating: 5,
  },
  {
    quote: 'Biscuit has anxiety. They handled her so gently — I never worried for a second.',
    author: 'Taylor & Robin Lee',
    role: 'Married Oct 2024',
    dogName: 'Biscuit',
    package: 'Essential',
    rating: 5,
  },
  {
    quote: 'The engraved collar is on display at home now. Such a beautiful keepsake.',
    author: 'Amanda & Chris Pierce',
    role: 'Married July 2024',
    dogName: 'Maple',
    package: 'Elite',
    rating: 5,
  },
  {
    quote: 'My venue was nervous about dogs. Bark & Bow\'s liability certificate sold them immediately.',
    author: 'Nina & Sam Goldstein',
    role: 'Married June 2024',
    dogName: 'Bear',
    package: 'Signature',
    rating: 5,
  },
  {
    quote: 'The transportation was seamless. Rosie arrived fresh, calm, and dressed perfectly.',
    author: 'Courtney & Bryan Walsh',
    role: 'Married Sept 2024',
    dogName: 'Rosie',
    package: 'Signature',
    rating: 5,
  },
  {
    quote: 'Worth every dollar. My husband cried when he saw Max in his little tuxedo.',
    author: 'Lisa & Daniel Kim',
    role: 'Married May 2024',
    dogName: 'Max',
    package: 'Essential',
    rating: 5,
  },
  {
    quote: 'Bark & Bow handled everything — I didn\'t have a single dog-related worry on my wedding day.',
    author: 'Zoe & Patrick Murray',
    role: 'Married Oct 2024',
    dogName: 'Duke',
    package: 'Elite',
    rating: 5,
  },
];

const PRESS_MENTIONS = [
  { outlet: 'Vogue Weddings', quote: '"The startup making dog-inclusive weddings effortless."', year: '2024' },
  { outlet: 'The Knot', quote: '"Our top vendor pick for couples who want their dog in the wedding."', year: '2024' },
  { outlet: 'Martha Stewart Weddings', quote: '"Bark & Bow has cracked the code on pet-friendly luxury events."', year: '2024' },
  { outlet: 'Forbes', quote: '"A brilliant solution to a $2B market gap in the wedding industry."', year: '2024' },
];

function Stars({ count }: { count: number }) {
  return <div className={styles.stars}>{Array.from({ length: count }).map((_, i) => <span key={i}>⭐</span>)}</div>;
}

export default function TestimonialsPage() {
  const navigate = useNavigate();
  return (
    <PageLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroPill}>Client Stories</div>
          <h1 className={styles.heroTitle}>Real Dogs. Real Weddings. Real Joy.</h1>
          <p className={styles.heroSub}>
            Over 500 couples and planners have trusted Bark & Bow with their most important four-legged guest. Here\'s what they said.
          </p>
          <div className={styles.heroRating}>
            <div className={styles.heroStars}>⭐⭐⭐⭐⭐</div>
            <div className={styles.heroRatingText}>4.97 average across 500+ bookings</div>
          </div>
        </div>
      </section>

      {/* Featured testimonials */}
      <section className={styles.featuredSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Stories</h2>
          <div className={styles.featuredGrid}>
            {FEATURED.map((t) => (
              <div key={t.author} className={styles.featuredCard}>
                <div className={styles.featuredImage}>
                  <DogImage variant={t.imageVariant} size="xl" caption={`${t.dogName} — ${t.dogBreed}`} />
                </div>
                <div className={styles.featuredContent}>
                  <Stars count={t.rating} />
                  <blockquote className={styles.featuredQuote}>"{t.quote}"</blockquote>
                  <div className={styles.featuredAuthor}>{t.author}</div>
                  <div className={styles.featuredRole}>{t.role}</div>
                  <div className={styles.featuredPackage}>Package: {t.package}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press mentions */}
      <section className={styles.pressSection}>
        <div className="container">
          <h2 className={styles.pressTitle}>As Seen In</h2>
          <div className={styles.pressRow}>
            {PRESS_MENTIONS.map((p) => (
              <div key={p.outlet} className={styles.pressCard}>
                <div className={styles.pressOutlet}>{p.outlet}</div>
                <div className={styles.pressQuote}>{p.quote}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of short reviews */}
      <section className={styles.gridSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>More Happy Clients</h2>
          <div className={styles.reviewGrid}>
            {GRID_REVIEWS.map((r) => (
              <div key={r.author} className={styles.reviewCard}>
                <Stars count={r.rating} />
                <blockquote className={styles.reviewQuote}>"{r.quote}"</blockquote>
                <div className={styles.reviewAuthor}>{r.author}</div>
                <div className={styles.reviewMeta}>{r.role} · {r.dogName} · {r.package}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Be the next success story.</h2>
            <p className={styles.ctaSub}>Join hundreds of couples who made their dog\'s wedding debut absolutely perfect.</p>
            <button className={styles.ctaBtn} onClick={() => navigate('/onboarding')}>Book Your Dog →</button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
