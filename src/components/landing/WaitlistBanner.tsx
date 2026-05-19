import { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import styles from './WaitlistBanner.module.css';

export default function WaitlistBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { track } = useApp();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    track('waitlist_signup', { email });
    setSubmitted(true);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <h2 className={styles.heading}>Join 1,200+ couples on the waitlist</h2>
          <p className={styles.sub}>
            We're booking select events for 2024. Reserve your spot before dates fill up.
          </p>
          {submitted ? (
            <div className={styles.success}>
              <span>✓</span>
              <span>You're on the list! We'll be in touch within 24 hours.</span>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <button className={styles.btn} type="submit">Join Waitlist</button>
            </form>
          )}
          <div className={styles.note}>No spam. Early access perks for waitlist members.</div>
        </div>
      </div>
    </section>
  );
}
