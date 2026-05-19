import styles from './SocialProof.module.css';

const testimonials = [
  {
    name: 'Sarah & James Thornton',
    location: 'New York, NY',
    dog: 'Biscuit, Golden Retriever',
    quote: 'Our wedding photographer said Biscuit was the most composed dog he\'d ever seen at a ceremony. The handler was incredible — we completely forgot to worry.',
    stars: 5,
    pkg: 'The Grand Marshal',
  },
  {
    name: 'Priya & David Chen',
    location: 'San Francisco, CA',
    dog: 'Mochi, French Bulldog',
    quote: 'The custom tuxedo fit perfectly. But honestly, the handler made the whole day. Mochi walked the aisle like a pro and was back home happy by 9pm.',
    stars: 5,
    pkg: 'The Grand Marshal',
  },
  {
    name: 'Lauren Williams',
    location: 'Chicago, IL',
    dog: 'Duchess & Earl, Poodles',
    quote: 'We had two dogs and were terrified of the chaos. The Royal Pack package solved everything. Worth every penny for the peace of mind alone.',
    stars: 5,
    pkg: 'The Royal Pack',
  },
];

export default function SocialProof() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>Real Stories</span>
          <h2 className={styles.title}>Dogs. Tuxedos. Tears of Joy.</h2>
        </div>
        <div className={styles.grid}>
          {testimonials.map(t => (
            <div key={t.name} className={styles.card}>
              <div className={styles.stars}>{Array(t.stars).fill('★').join('')}</div>
              <p className={styles.quote}>"{t.quote}"</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.dog.split(',')[0][0]}🐾</div>
                <div>
                  <p className={styles.authorName}>{t.name}</p>
                  <p className={styles.authorSub}>{t.dog} · {t.location}</p>
                  <p className={styles.authorPkg}>{t.pkg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.logos}>
          <span className={styles.logosLabel}>As featured in</span>
          {['The Knot', 'Vogue Weddings', 'Martha Stewart', 'Brides Magazine', 'Rover Blog'].map(logo => (
            <span key={logo} className={styles.logoItem}>{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
