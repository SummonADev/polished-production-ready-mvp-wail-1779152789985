import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>🐾 Bark <span className={styles.logoAccent}>&</span> Bow</div>
            <div className={styles.tagline}>The complete best dog experience. Custom formalwear + professional event-day handling.</div>
          </div>
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <div className={styles.linkGroupTitle}>Product</div>
              <button className={styles.link}>How It Works</button>
              <button className={styles.link}>Pricing</button>
              <button className={styles.link}>Testimonials</button>
              <button className={styles.link}>FAQ</button>
            </div>
            <div className={styles.linkGroup}>
              <div className={styles.linkGroupTitle}>Company</div>
              <button className={styles.link}>About Us</button>
              <button className={styles.link}>Careers</button>
              <button className={styles.link}>Press</button>
              <button className={styles.link}>Contact</button>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.copy}>© 2024 Bark & Bow, Inc. All rights reserved.</div>
          <div className={styles.legal}>
            <button className={styles.legalLink}>Privacy Policy</button>
            <button className={styles.legalLink}>Terms of Service</button>
            <button className={styles.legalLink}>Liability Waiver</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
