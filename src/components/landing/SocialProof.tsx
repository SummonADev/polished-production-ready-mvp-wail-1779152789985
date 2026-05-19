import styles from './SocialProof.module.css';

const REVIEWS = [
  {
    stars: '★★★★★',
    quote:
      '"We were terrified Buster would bolt during the ceremony. The handler was incredible — he kept Buster calm, cued him at exactly the right moment, and even got him to sit for the vows. Worth every penny."',
    name: 'Amanda & Trevor H.',
    sub: 'Married · Napa Valley',
    emoji: '👰',
  },
  {
    stars: '★★★★★',
    quote:
      '"As a wedding planner, I recommend Bark & Bow to every client with a dog. They handle everything — the outfit, the logistics, the liability. My clients love the photos and I love the peace of mind."',
    name: 'Priya S.',
    sub: 'Luxury Wedding Planner · NYC',
    emoji: '📋',
  },
  {
    stars: '★★★★★',
    quote:
      '"Luna wore the most beautiful custom gown that matched my bridesmaids exactly. The pre-event grooming meant she smelled perfect and looked like a model. Best photos from the whole day."',
    name: 'Chloe & Marcus T.',
    sub: 'Married · Chicago',
    emoji: '🐾',
  },
];

export default function SocialProof() {
  return (
    <section id="reviews" className={styles.section}>
      <div className="container">
        <div className={styles.sectionLabel}>Reviews</div>
        <h2 className={styles.sectionTitle}>Real dogs. Real weddings. Real joy.</h2>
        <div className={styles.grid}>
          {REVIEWS.map((r) => (
            <div key={r.name} className={styles.card}>
              <div className={styles.stars}>{r.stars}</div>
              <p className={styles.quote}>{r.quote}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{r.emoji}</div>
                <div>
                  <div className={styles.authorName}>{r.name}</div>
                  <div className={styles.authorSub}>{r.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pressBar}>
          <div className={styles.pressLogo}>The Knot</div>
          <div className={styles.pressLogo}>Brides Magazine</div>
          <div className={styles.pressLogo}>Martha Stewart Weddings</div>
          <div className={styles.pressLogo}>Vogue</div>
          <div className={styles.pressLogo}>People Pets</div>
        </div>
      </div>
    </section>
  );
}
