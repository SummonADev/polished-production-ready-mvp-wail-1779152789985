import styles from './Hero.module.css';

type HeroProps = {
  onCTA: () => void;
};

export default function Hero({ onCTA }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div>
          <div className={styles.badge}>
            <span>✨</span>
            <span>The Complete Best Dog Experience</span>
          </div>
          <h1 className={styles.heading}>
            Your dog deserves<br />
            <span className={styles.headingAccent}>a perfect role</span><br />
            in your wedding.
          </h1>
          <p className={styles.subheading}>
            Custom formalwear, professional grooming, a dedicated handler,
            and a photo shoot — all in one turnkey package. You focus on the vows.
            We handle the paws.
          </p>
          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={onCTA}>
              Start Planning — It's Free
            </button>
            <button className={styles.secondaryBtn} onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>See how it works</span>
              <span>↓</span>
            </button>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Dogs Dressed</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>4.9★</div>
              <div className={styles.statLabel}>Avg. Rating</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>0</div>
              <div className={styles.statLabel}>Wedding Disasters</div>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Winston's Event Plan</span>
              <span className={styles.cardBadge}>Confirmed</span>
            </div>
            <div className={styles.dogProfile}>
              <span className={styles.dogEmoji}>🐕</span>
              <div className={styles.dogInfo}>
                <div className={styles.dogName}>Winston</div>
                <div className={styles.dogBreed}>Golden Retriever · Large</div>
                <div className={styles.packageTag}>Signature Package · $1,795</div>
              </div>
            </div>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <span>Custom tuxedo fitted & delivered ✓</span>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <span>Grooming session booked · Sept 13 ✓</span>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <span>Handler assigned · Sarah M. ✓</span>
              </div>
              <div className={`${styles.timelineItem}`}>
                <div className={`${styles.timelineDot} ${styles.timelineDotPending}`}></div>
                <span>Photo session · Sept 14, 3 PM →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
