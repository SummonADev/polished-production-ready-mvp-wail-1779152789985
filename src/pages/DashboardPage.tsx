import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import type { Booking } from '@/types/index';
import PageLayout from '@/components/shared/PageLayout';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { bookings, track } = useApp();

  const latestBooking: Booking | undefined = bookings[bookings.length - 1];

  const handleTrack = () => {
    track('dashboard_view');
  };

  return (
    <PageLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Dog's Big Day Dashboard</h1>
          <p className={styles.sub}>Track your booking, upcoming milestones, and everything your pup needs.</p>
          <button className={styles.trackBtn} onClick={handleTrack} style={{ display: 'none' }} />
        </div>

        {latestBooking ? (
          <div className={styles.bookingCard}>
            <div className={styles.bookingHeader}>
              <div>
                <h2 className={styles.dogName}>{latestBooking.dogName}</h2>
                <p className={styles.bookingMeta}>{latestBooking.dogBreed} · {latestBooking.packageName}</p>
              </div>
              <span className={styles.status}>{latestBooking.status}</span>
            </div>
            <div className={styles.bookingDetails}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Event Date</span>
                <span className={styles.detailValue}>{latestBooking.eventDate}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>{latestBooking.eventLocation}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Owner</span>
                <span className={styles.detailValue}>{latestBooking.ownerName}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Contact</span>
                <span className={styles.detailValue}>{latestBooking.email}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No bookings yet.</p>
            <button className={styles.bookBtn} onClick={() => navigate('/onboarding')}>Book Your Dog Now</button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
