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
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>
              {latestBooking ? `Welcome back, ${latestBooking.ownerName}!` : 'Your Dashboard'}
            </h1>
            <p className={styles.sub}>
              {latestBooking
                ? `Managing ${latestBooking.dogName}'s big day`
                : 'Start by booking your dog\'s experience.'}
            </p>
          </div>

          {!latestBooking ? (
            <div className={styles.empty}>
              <div className={styles.emptyEmoji}>🐾</div>
              <h2 className={styles.emptyTitle}>No bookings yet</h2>
              <p className={styles.emptySub}>Let's get your dog dressed for the occasion.</p>
              <button className={styles.emptyBtn} onClick={() => navigate('/onboarding')}>
                Book Now
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>🐕 Dog Details</h3>
                <dl className={styles.dl}>
                  <dt>Name</dt><dd>{latestBooking.dogName}</dd>
                  <dt>Breed</dt><dd>{latestBooking.dogBreed}</dd>
                  <dt>Size</dt><dd>{latestBooking.dogSize}</dd>
                </dl>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>📅 Event Details</h3>
                <dl className={styles.dl}>
                  <dt>Date</dt><dd>{latestBooking.eventDate}</dd>
                  <dt>Location</dt><dd>{latestBooking.eventLocation}</dd>
                  <dt>Package</dt><dd>{latestBooking.packageId}</dd>
                </dl>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>✅ Status</h3>
                <div className={styles.statusList}>
                  {['Booking Confirmed', 'Handler Assigned', 'Grooming Scheduled', 'Fitting Date Set'].map(s => (
                    <div key={s} className={styles.statusItem}>
                      <span className={styles.statusCheck}>✓</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
