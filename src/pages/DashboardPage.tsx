import { useApp } from '@/lib/AppContext';
import type { Booking } from '@/lib/AppContext';
import PageLayout from '@/components/shared/PageLayout';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { bookings } = useApp();
  const latestBooking: Booking | null = bookings.length > 0 ? bookings[bookings.length - 1] : null;

  return (
    <PageLayout>
      <div className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>
              {latestBooking ? `Welcome back, ${latestBooking.name.split(' ')[0]}!` : 'Your Dashboard'}
            </h1>
            <p className={styles.sub}>Your Bark & Bow experience at a glance.</p>
          </div>

          {latestBooking ? (
            <div className={styles.grid}>
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>🐾 Your Dog</h2>
                <dl className={styles.dl}>
                  <dt>Name</dt><dd>{latestBooking.dogName}</dd>
                  <dt>Breed</dt><dd>{latestBooking.dogBreed}</dd>
                  <dt>Size</dt><dd>{latestBooking.dogSize}</dd>
                </dl>
              </div>
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>📅 Your Booking</h2>
                <dl className={styles.dl}>
                  <dt>Date</dt><dd>{latestBooking.eventDate}</dd>
                  <dt>Location</dt><dd>{latestBooking.eventLocation}</dd>
                  <dt>Package</dt><dd>{latestBooking.packageId}</dd>
                </dl>
              </div>
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No bookings yet. <a href="/onboarding">Book your dog's experience →</a></p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
