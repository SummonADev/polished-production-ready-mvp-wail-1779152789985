import { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import styles from './WaitlistBanner.module.css';

export default function WaitlistBanner() {
  const { addLead, track } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) { setError('Please enter a valid email.'); return; }
    setLoading(true);
    setTimeout(() => {
      addLead({ email, name: '', source: 'waitlist_banner' });
      track('waitlist_signup');
      setSubmitted(true);
      setLoading(false);
    }, 600);
  };

  return (
    <section className={styles.section}>
      <div className={`container-narrow ${styles.inner}`}>
        <div className={styles.text}>
          <h2 className={styles.title}>Dates Are Filling Up Fast</h2>
          <p className={styles.sub}>Join 1,200+ couples on the waitlist. Get early access and a complimentary style consultation.</p>
        </div>
        {submitted ? (
          <div className={styles.success}>
            <span>🎉</span> You're on the list! We'll be in touch soon.
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              required
              aria-label="Email address"
            />
            <button className={styles.btn} type="submit" disabled={loading}>
              {loading ? 'Joining...' : 'Join the Waitlist'}
            </button>
          </form>
        )}
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.note}>No spam. Cancel anytime. 2025 season filling now.</p>
      </div>
    </section>
  );
}
