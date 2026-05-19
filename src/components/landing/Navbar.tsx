import styles from './Navbar.module.css';

type NavbarProps = {
  onCTA: () => void;
};

export default function Navbar({ onCTA }: NavbarProps) {
  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.logo}>
          <span className={styles.logoPaw}>🐾</span>
          <span>Bark <span className={styles.logoSub}>&</span> Bow</span>
        </div>
        <div className={styles.links}>
          <button className={styles.link} onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>How It Works</button>
          <button className={styles.link} onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>Pricing</button>
          <button className={styles.link} onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}>Reviews</button>
          <button className={styles.ctaBtn} onClick={onCTA}>Book Your Dog</button>
        </div>
      </div>
    </nav>
  );
}
