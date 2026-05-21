import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import type { Booking } from '@/types/index';
import PageLayout from '@/components/shared/PageLayout';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { bookings } = useApp();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>Your Dashboard</h1>
            <p className={styles.sub}>Manage your Bark & Bow bookings and experiences.</p>
            <button className={styles.ctaBtn} onClick={() => navigate('/onboarding')}>
              + New Booking
            </button>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Bookings ({bookings.length})</h2>
            {bookings.length === 0 ? (
              <div className={styles.empty}>
                <p>No bookings yet.</p>
                <button onClick={() => navigate('/onboarding')}>Book Now</button>
              </div>
            ) : (
              <div className={styles.bookingList}>
                {bookings.map((b: Booking) => (
                  <div key={b.id} className={styles.bookingCard}>
                    <div className={styles.bookingInfo}>
                      <span className={styles.dogName}>{b.dogName}</span>
                      <span className={styles.breed}>{b.dogBreed}</span>
                    </div>
                    <div className={styles.bookingMeta}>
                      <span className={styles.pkg}>{b.packageId}</span>
                      <span className={styles.date}>{b.eventDate}</span>
                      <span className={`${styles.status} ${styles[b.status]}`}>{b.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
