import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

type NavbarProps = {
  onCTA: () => void;
};

export default function Navbar({ onCTA }: NavbarProps) {
  const navigate = useNavigate();
  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <button className={styles.logo} onClick={() => navigate('/')}>
          <span className={styles.logoPaw}>🐾</span>
          <span>Bark <span className={styles.logoSub}>&</span> Bow</span>
        </button>
        <div className={styles.links}>
          <button className={styles.link} onClick={() => navigate('/how-it-works')}>How It Works</button>
          <button className={styles.link} onClick={() => navigate('/product')}>Product</button>
          <button className={styles.link} onClick={() => navigate('/testimonials')}>Reviews</button>
          <button className={styles.link} onClick={() => navigate('/about')}>About</button>
          <button className={styles.ctaBtn} onClick={onCTA}>Book Your Dog</button>
        </div>
      </div>
    </nav>
  );
}
