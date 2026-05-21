import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import PageLayout from '@/components/shared/PageLayout';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const latestBooking = state.bookings[state.bookings.length - 1] ?? null;

  return (
    <PageLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {latestBooking ? `Welcome back, ${latestBooking.name.split(' ')[0]}!` : 'Your Dashboard'}
          </h1>
          <p className={styles.sub}>
            {latestBooking
              ? `Here's the status of ${latestBooking.dogName}'s experience.`
              : 'No bookings yet. Ready to get started?'}
          </p>
        </div>

        {latestBooking ? (
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>🐾 Dog Profile</h2>
              <dl className={styles.dl}>
                <dt>Name</dt><dd>{latestBooking.dogName}</dd>
                <dt>Breed</dt><dd>{latestBooking.dogBreed}</dd>
                <dt>Size</dt><dd>{latestBooking.dogSize}</dd>
              </dl>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>📅 Event Details</h2>
              <dl className={styles.dl}>
                <dt>Date</dt><dd>{latestBooking.eventDate}</dd>
                <dt>Location</dt><dd>{latestBooking.eventLocation}</dd>
                <dt>Package</dt><dd>{latestBooking.packageId}</dd>
              </dl>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>✅ Status</h2>
              <div className={styles.statusList}>
                {[
                  { label: 'Booking Confirmed', done: true },
                  { label: 'Handler Assigned', done: false },
                  { label: 'Tuxedo in Production', done: false },
                  { label: 'Grooming Scheduled', done: false },
                  { label: 'Photo Session Booked', done: false },
                ].map(item => (
                  <div key={item.label} className={`${styles.statusItem} ${item.done ? styles.statusDone : ''}`}>
                    <span className={styles.statusIcon}>{item.done ? '✓' : '○'}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyEmoji}>🐾</div>
            <p className={styles.emptyText}>You haven't made a booking yet.</p>
            <button className={styles.ctaBtn} onClick={() => navigate('/onboarding')}>
              Book Your Dog's Experience
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
