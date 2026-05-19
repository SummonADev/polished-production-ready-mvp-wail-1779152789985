import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <button className={styles.logo} onClick={() => navigate('/')}>🐾 Bark <span className={styles.logoAccent}>&</span> Bow</button>
            <div className={styles.tagline}>The complete best dog experience. Custom formalwear + professional event-day handling.</div>
            <div className={styles.socialRow}>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">📸</a>
              <a href="#" className={styles.socialIcon} aria-label="TikTok">🎵</a>
              <a href="#" className={styles.socialIcon} aria-label="Pinterest">📌</a>
            </div>
          </div>
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <div className={styles.linkGroupTitle}>Product</div>
              <button className={styles.link} onClick={() => navigate('/how-it-works')}>How It Works</button>
              <button className={styles.link} onClick={() => navigate('/product')}>Packages</button>
              <button className={styles.link} onClick={() => navigate('/testimonials')}>Testimonials</button>
            </div>
            <div className={styles.linkGroup}>
              <div className={styles.linkGroupTitle}>Company</div>
              <button className={styles.link} onClick={() => navigate('/about')}>About Us</button>
              <button className={styles.link} onClick={() => navigate('/careers')}>Careers</button>
              <button className={styles.link} onClick={() => navigate('/press')}>Press</button>
              <button className={styles.link} onClick={() => navigate('/contact')}>Contact</button>
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
