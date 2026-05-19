import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <button className={styles.logo} onClick={() => navigate('/')}>
            <span>🐾</span>
            <span>Bark <span className={styles.amp}>&</span> Bow</span>
          </button>
          <p className={styles.tagline}>The complete best-dog experience.<br/>Custom formalwear + professional handlers.</p>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram" className={styles.social}>📸</a>
            <a href="#" aria-label="Pinterest" className={styles.social}>📌</a>
            <a href="#" aria-label="TikTok" className={styles.social}>🎵</a>
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Product</h4>
            <button className={styles.colLink} onClick={() => navigate('/how-it-works')}>How It Works</button>
            <button className={styles.colLink} onClick={() => navigate('/product')}>Packages</button>
            <button className={styles.colLink} onClick={() => navigate('/testimonials')}>Reviews</button>
            <button className={styles.colLink} onClick={() => navigate('/onboarding')}>Book Now</button>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Company</h4>
            <button className={styles.colLink} onClick={() => navigate('/about')}>About Us</button>
            <button className={styles.colLink} onClick={() => navigate('/careers')}>Careers</button>
            <button className={styles.colLink} onClick={() => navigate('/press')}>Press</button>
            <button className={styles.colLink} onClick={() => navigate('/contact')}>Contact</button>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Support</h4>
            <button className={styles.colLink} onClick={() => navigate('/contact')}>Help Center</button>
            <button className={styles.colLink} onClick={() => navigate('/contact')}>FAQ</button>
            <button className={styles.colLink} onClick={() => navigate('/contact')}>Liability Policy</button>
            <button className={styles.colLink} onClick={() => navigate('/admin')}>Admin</button>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <span>© {new Date().getFullYear()} Bark & Bow, Inc. All rights reserved.</span>
          <span>Made with 🐾 for dogs who deserve the best</span>
        </div>
      </div>
    </footer>
  );
}
