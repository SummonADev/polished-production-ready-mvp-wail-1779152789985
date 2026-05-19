import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

type NavbarProps = {
  onCTA: () => void;
};

export default function Navbar({ onCTA }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Product', path: '/product' },
    { label: 'Reviews', path: '/testimonials' },
    { label: 'About', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press', path: '/press' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <button className={styles.logo} onClick={() => navigate('/')}>
          <span className={styles.logoPaw}>🐾</span>
          <span>Bark <span className={styles.logoAmp}>&</span> Bow</span>
        </button>

        <div className={styles.links}>
          {navLinks.map(link => (
            <button
              key={link.path}
              className={`${styles.link} ${location.pathname === link.path ? styles.linkActive : ''}`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
          <button className={styles.ctaBtn} onClick={onCTA}>Book Your Dog</button>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map(link => (
            <button
              key={link.path}
              className={`${styles.mobileLink} ${location.pathname === link.path ? styles.mobileLinkActive : ''}`}
              onClick={() => { navigate(link.path); setMenuOpen(false); }}
            >
              {link.label}
            </button>
          ))}
          <button className={styles.mobileCta} onClick={() => { onCTA(); setMenuOpen(false); }}>Book Your Dog</button>
        </div>
      )}
    </nav>
  );
}
