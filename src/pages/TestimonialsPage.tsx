import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { useApp } from '@/lib/AppContext';
import styles from './SubPage.module.css';

const reviews = [
  {
    name: 'Sarah & James Thornton',
    location: 'New York, NY',
    dog: 'Biscuit',
    breed: 'Golden Retriever',
    pkg: 'The Grand Marshal',
    stars: 5,
    date: 'September 2024',
    headline: 'Biscuit stole the show (on purpose)',
    review: 'I was terrified of having our dog at the wedding. Biscuit is wonderful but completely unpredictable in crowds. The handler, Marcus, was incredible — calm, confident, and clearly loved dogs. Biscuit walked the aisle perfectly, sat through the vows, and even posed for photos. The custom tuxedo was a masterpiece. Our photographer said it was the most photogenic moment of the entire day.',
    emoji: '🐕',
  },
  {
    name: 'Priya & David Chen',
    location: 'San Francisco, CA',
    dog: 'Mochi',
    breed: 'French Bulldog',
    pkg: 'The Grand Marshal',
    stars: 5,
    date: 'June 2024',
    headline: 'Worth every single penny',
    review: 'Mochi has never been great with strangers, so we were skeptical. But the pre-event meet-and-greet with our handler completely changed things. By the wedding day, Mochi treated her like family. The tuxedo was perfect — breathable fabric, perfect fit, looked incredible in photos. We got more compliments about Mochi\'s outfit than almost anything else at the wedding.',
    emoji: '🐾',
  },
  {
    name: 'Lauren Williams',
    location: 'Chicago, IL',
    dog: 'Duchess & Earl',
    breed: 'Standard Poodles',
    pkg: 'The Royal Pack',
    stars: 5,
    date: 'August 2024',
    headline: 'Two dogs, zero stress',
    review: 'Having two large poodles at a black-tie event sounded insane. The Royal Pack made it feel effortless. Two dedicated handlers, a full rehearsal the day before, and matching formal outfits that were literally custom-made for each dog. Our guests were in absolute awe. The keepsake collars are framed on our wall. I recommend Bark & Bow to every engaged person I meet.',
    emoji: '✨',
  },
  {
    name: 'Marcus & Keely Robinson',
    location: 'Atlanta, GA',
    dog: 'Zeus',
    breed: 'German Shepherd',
    pkg: 'The Gentleman',
    stars: 5,
    date: 'October 2024',
    headline: 'Professional from start to finish',
    review: 'Zeus is a big dog with a big personality. The measurement team was patient and professional. The tuxedo fit perfectly despite his unusual proportions. The handler was confident and experienced with large breeds — you could tell immediately. Zeus was perfectly behaved and absolutely loved by our guests.',
    emoji: '🐺',
  },
  {
    name: 'Jessica & Tom Park',
    location: 'Nashville, TN',
    dog: 'Coco',
    breed: 'Miniature Schnauzer',
    pkg: 'The Gentleman',
    stars: 5,
    date: 'May 2024',
    headline: 'The photos are everything',
    review: 'The photo session was genuinely one of my favorite parts of the wedding day. Coco in her custom gown with the flower crown — I cry every time I look at those photos. The groomer did an incredible job. Coco smelled like lavender and looked like a tiny queen. 11/10 would do this for every event forever.',
    emoji: '🌸',
  },
  {
    name: 'Rachel & Andrew Foster',
    location: 'Denver, CO',
    dog: 'Bear',
    breed: 'Bernese Mountain Dog',
    pkg: 'The Royal Pack',
    stars: 5,
    date: 'July 2024',
    headline: 'Bear was the best guest at our wedding',
    review: 'Bear is enormous and would normally be a logistical nightmare at a formal event. The Royal Pack was absolutely the right call. The handler was unflappable, the outfit was stunning, and the rehearsal day before meant Bear knew exactly what to do. Multiple guests asked us for the Bark & Bow contact info before the reception was over.',
    emoji: '🐻',
  },
];

const press = [
  { outlet: 'The Knot', quote: 'The most innovative wedding vendor we\'ve seen in years.', year: '2024' },
  { outlet: 'Vogue Weddings', quote: 'Bark & Bow is redefining what it means to include your pet on the big day.', year: '2024' },
  { outlet: 'Brides Magazine', quote: 'The turnkey pet concierge service every dog parent has been waiting for.', year: '2024' },
];

export default function TestimonialsPage() {
  const navigate = useNavigate();
  const { track } = useApp();
  const handleCTA = () => { track('landing_page_cta_click'); navigate('/onboarding'); };

  return (
    <div>
      <Navbar onCTA={handleCTA} />
      <main>
        <section className={styles.pageHero}>
          <div className="container-narrow">
            <span className={styles.eyebrow}>Real Stories</span>
            <h1 className={styles.pageTitle}>Dogs. Tuxedos. Tears of Joy.</h1>
            <p className={styles.pageSub}>Over 500 couples have trusted Bark & Bow to make their dog's wedding debut unforgettable. Here's what they had to say.</p>
            <div className={styles.ratingBar}>
              <div className={styles.ratingStars}>★★★★★</div>
              <span className={styles.ratingText}>4.98 / 5 average from 500+ reviews</span>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.reviewsGrid}>
              {reviews.map(r => (
                <div key={r.name} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewAvatar}>{r.emoji}</div>
                    <div>
                      <p className={styles.reviewName}>{r.name}</p>
                      <p className={styles.reviewMeta}>{r.dog} the {r.breed} · {r.location}</p>
                      <p className={styles.reviewPkg}>{r.pkg} · {r.date}</p>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>{'★'.repeat(r.stars)}</div>
                  <h4 className={styles.reviewHeadline}>"{r.headline}"</h4>
                  <p className={styles.reviewText}>{r.review}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Press */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>As Featured In</h2>
            <div className={styles.pressRow}>
              {press.map(p => (
                <div key={p.outlet} className={styles.pressCard}>
                  <p className={styles.pressQuote}>"{p.quote}"</p>
                  <p className={styles.pressOutlet}>— {p.outlet}, {p.year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <h2 className={styles.ctaTitle}>Ready to write your own story?</h2>
            <p className={styles.ctaSub}>Join 500+ happy couples who trusted Bark & Bow with their most important guest.</p>
            <button className={styles.ctaBtn} onClick={handleCTA}>Book Your Dog's Experience</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
