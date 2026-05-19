import { useApp } from '@/lib/AppContext';
import { useNavigate } from 'react-router-dom';
import { PACKAGES } from '@/lib/packages';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const user = state.user;
  const bookingPlan = state.bookingPlan;

  if (!user) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🐾</div>
        <h2 className={styles.emptyTitle}>No booking found</h2>
        <p className={styles.emptySub}>Complete the onboarding to set up your dog&apos;s wedding plan.</p>
        <button className={styles.emptyBtn} onClick={() => navigate('/onboarding')}>Start Onboarding</button>
      </div>
    );
  }

  const pkg = PACKAGES.find((p) => p.id === user.packageId) ?? PACKAGES[1];

  const steps = [
    { label: 'Onboarding complete', done: true },
    { label: 'Custom garment in production', done: true },
    { label: 'Grooming session scheduled', done: bookingPlan != null },
    { label: 'Handler assigned', done: false },
    { label: 'Event day ready', done: false },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, {user.name.split(' ')[0]}! 🐾</h1>
          <p className={styles.subtitle}>{user.dogName}&apos;s wedding plan is underway.</p>
        </div>
        <div className={styles.statusBadge}>{user.status}</div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Your Dog</h2>
          <div className={styles.dogCard}>
            <div className={styles.dogEmoji}>🐕</div>
            <div>
              <div className={styles.dogName}>{user.dogName}</div>
              <div className={styles.dogBreed}>{user.dogBreed} · Age {user.dogAge}</div>
              <div className={styles.dogPackage}>{pkg.name} Package</div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Event Details</h2>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Event Date</span>
            <span className={styles.detailVal}>{user.eventDate}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Package</span>
            <span className={styles.detailVal}>{pkg.name} — ${pkg.price.toLocaleString()}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Status</span>
            <span className={styles.detailVal}>{user.status}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Role</span>
            <span className={styles.detailVal}>{user.role}</span>
          </div>
        </div>

        <div className={`${styles.card} ${styles.cardWide}`}>
          <h2 className={styles.cardTitle}>Progress Tracker</h2>
          <div className={styles.steps}>
            {steps.map((step, i) => (
              <div key={i} className={`${styles.step} ${step.done ? styles.stepDone : ''}`}>
                <div className={styles.stepDot}>{step.done ? '✓' : i + 1}</div>
                <span className={styles.stepLabel}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {user.goalStatement && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Your Goal</h2>
            <p className={styles.goalText}>&ldquo;{user.goalStatement}&rdquo;</p>
          </div>
        )}

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>What&apos;s Included</h2>
          <div className={styles.features}>
            {pkg.features.map((f) => (
              <div key={f} className={styles.feature}>
                <span className={styles.featureCheck}>✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {user.surveyAnswers && Object.keys(user.surveyAnswers).length > 0 && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Survey Answers</h2>
            {Object.entries(user.surveyAnswers).map(([k, v]) => (
              <div key={k} className={styles.detailRow}>
                <span className={styles.detailLabel}>{k}</span>
                <span className={styles.surveyVal}>{String(v)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
