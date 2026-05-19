import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import { PACKAGES } from '@/lib/packages';
import styles from './DashboardPage.module.css';

function formatDate(dateStr: string): string {
  if (!dateStr) return 'TBD';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function daysUntil(dateStr: string): number {
  if (!dateStr) return 0;
  const now = new Date();
  const target = new Date(dateStr);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

const NEXT_STEPS = [
  { id: 'workflow', icon: '🎨', title: 'Build Your Dog\'s Event Plan', desc: 'Use our AI-assisted planner to design the perfect package in under 5 minutes.', cta: 'Start Planning', primary: true },
  { id: 'schedule', icon: '📅', title: 'Schedule a Consultation', desc: 'Book a 15-minute call with a Bark & Bow specialist to review your event needs.', cta: 'Schedule Call', primary: false },
  { id: 'sizes', icon: '📏', title: 'Submit Measurements', desc: 'Our tailors need 5 key measurements to begin crafting your dog\'s garment.', cta: 'Enter Measurements', primary: false },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { state, track } = useApp();
  const { user, bookingPlan } = state;

  if (!user) {
    navigate('/onboarding');
    return null;
  }

  const days = daysUntil(user.eventDate);
  const selectedPkg = bookingPlan ? PACKAGES.find((p) => p.id === bookingPlan.packageId) : null;

  const handleAction = (id: string) => {
    if (id === 'workflow') {
      track('first_workflow_started');
      navigate('/workflow');
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <button className={styles.logo} onClick={() => navigate('/')}>🐾 Bark & Bow</button>
          <div className={styles.headerRight}>
            <button className={styles.adminLink} onClick={() => navigate('/admin')}>Admin ↗</button>
            <div className={styles.userBadge}>
              <div className={styles.userAvatar}>{user.name ? user.name[0].toUpperCase() : 'U'}</div>
              <span className={styles.userName}>{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className={`container ${styles.content}`}>
        <div className={styles.welcome}>
          <div className={styles.welcomeText}>
            <h1 className={styles.welcomeTitle}>Welcome back, {user.name.split(' ')[0]}! 🐾</h1>
            <p className={styles.welcomeSub}>Here's {user.dogName}'s event dashboard. Your big day is {days > 0 ? `${days} days away` : 'coming up soon'}.</p>
          </div>
          <div className={styles.eventChip}>
            <span className={styles.eventChipIcon}>📅</span>
            <div>
              <div className={styles.eventChipDate}>{formatDate(user.eventDate)}</div>
              <div className={styles.eventChipSub}>Event Date</div>
            </div>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{days}</div>
            <div className={styles.statLabel}>Days Until Event</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{bookingPlan ? '1' : '0'}</div>
            <div className={styles.statLabel}>Plans Created</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{selectedPkg ? `$${selectedPkg.price.toLocaleString()}` : '--'}</div>
            <div className={styles.statLabel}>Selected Package</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{user.painPoints.length}</div>
            <div className={styles.statLabel}>Concerns Addressed</div>
          </div>
        </div>

        <div className={styles.mainGrid}>
          <div className={styles.mainCol}>
            <div className={styles.sectionTitle}>Recommended Next Steps</div>
            <div className={styles.nextSteps}>
              {NEXT_STEPS.map((s) => (
                <div key={s.id} className={`${styles.nextStep} ${s.primary ? styles.nextStepPrimary : ''}`}>
                  <span className={styles.nextStepIcon}>{s.icon}</span>
                  <div className={styles.nextStepBody}>
                    <div className={styles.nextStepTitle}>{s.title}</div>
                    <div className={styles.nextStepDesc}>{s.desc}</div>
                  </div>
                  <button
                    className={`${styles.nextStepBtn} ${s.primary ? styles.nextStepBtnPrimary : ''}`}
                    onClick={() => handleAction(s.id)}
                  >
                    {s.cta}
                  </button>
                </div>
              ))}
            </div>

            {bookingPlan && (
              <div className={styles.planCard}>
                <div className={styles.planCardHeader}>
                  <span className={styles.planCardTitle}>📋 {user.dogName}'s Event Plan</span>
                  <span className={styles.planCardBadge}>Ready to Review</span>
                </div>
                <div className={styles.planDetails}>
                  <div className={styles.planRow}>
                    <span className={styles.planKey}>Package</span>
                    <span className={styles.planVal}>{selectedPkg?.name} — ${selectedPkg?.price.toLocaleString()}</span>
                  </div>
                  <div className={styles.planRow}>
                    <span className={styles.planKey}>Style</span>
                    <span className={styles.planVal}>{bookingPlan.style}</span>
                  </div>
                  <div className={styles.planRow}>
                    <span className={styles.planKey}>Colors</span>
                    <span className={styles.planVal}>{bookingPlan.colorScheme}</span>
                  </div>
                  <div className={styles.planRow}>
                    <span className={styles.planKey}>Location</span>
                    <span className={styles.planVal}>{bookingPlan.eventLocation}</span>
                  </div>
                  {bookingPlan.specialRequirements && (
                    <div className={styles.planRow}>
                      <span className={styles.planKey}>Special Notes</span>
                      <span className={styles.planVal}>{bookingPlan.specialRequirements}</span>
                    </div>
                  )}
                </div>
                <button className={styles.editPlanBtn} onClick={() => navigate('/workflow')}>Edit Plan →</button>
              </div>
            )}
          </div>

          <div className={styles.sideCol}>
            <div className={styles.dogProfileCard}>
              <div className={styles.dogProfileHeader}>Dog Profile</div>
              <div className={styles.dogAvatar}>🐕</div>
              <div className={styles.dogName}>{user.dogName}</div>
              <div className={styles.dogBreed}>{user.dogBreed}</div>
              <div className={styles.dogTags}>
                {user.painPoints.map((p) => (
                  <span key={p} className={styles.dogTag}>{p}</span>
                ))}
              </div>
            </div>

            <div className={styles.surveyCard}>
              <div className={styles.surveyCardTitle}>Your Answers</div>
              {Object.entries(user.surveyAnswers).map(([k, v]) => (
                <div key={k} className={styles.surveyRow}>
                  <span className={styles.surveyKey}>{k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</span>
                  <span className={styles.surveyVal}>{v}</span>
                </div>
              ))}
            </div>

            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>💬</div>
              <div className={styles.helpTitle}>Need Help?</div>
              <div className={styles.helpDesc}>Our team is available Mon–Sat 9AM–6PM EST.</div>
              <button className={styles.helpBtn}>Chat with Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
