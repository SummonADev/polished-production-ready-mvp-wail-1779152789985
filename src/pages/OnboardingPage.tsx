import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import type { OnboardingData, UserRole, Lead } from '@/types';
import styles from './OnboardingPage.module.css';

const ROLES: { value: UserRole; label: string }[] = [
  { value: 'bride', label: '👰 Bride' },
  { value: 'groom', label: '🤵 Groom' },
  { value: 'planner', label: '📋 Wedding Planner' },
  { value: 'other', label: '🎉 Other' },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { submitOnboarding, track } = useApp();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('bride');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogAge, setDogAge] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [goalStatement, setGoalStatement] = useState('');

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    track('onboarding_step1');
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    track('onboarding_step2');
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: OnboardingData = {
      name,
      email,
      role,
      dogName,
      dogBreed,
      dogAge,
      eventDate,
      goalStatement,
    };
    submitOnboarding(data);
    navigate('/dashboard');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.progress}>
          {[1, 2, 3].map((s) => (
            <div key={s} className={`${styles.progressStep} ${step >= s ? styles.progressStepActive : ''}`}>
              <div className={styles.progressDot}>{step > s ? '✓' : s}</div>
              <span className={styles.progressLabel}>
                {s === 1 ? 'About You' : s === 2 ? 'Your Dog' : 'Event Details'}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <form className={styles.form} onSubmit={handleStep1}>
            <h1 className={styles.title}>Let&apos;s get started</h1>
            <p className={styles.sub}>Tell us a bit about yourself.</p>

            <label className={styles.label}>Your Name
              <input
                className={styles.input}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                required
              />
            </label>

            <label className={styles.label}>Email Address
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                required
              />
            </label>

            <div className={styles.label}>Your Role
              <div className={styles.roleGrid}>
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    className={`${styles.roleBtn} ${role === r.value ? styles.roleBtnActive : ''}`}
                    onClick={() => setRole(r.value)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <button className={styles.nextBtn} type="submit">Next →</button>
          </form>
        )}

        {step === 2 && (
          <form className={styles.form} onSubmit={handleStep2}>
            <h1 className={styles.title}>About your dog</h1>
            <p className={styles.sub}>We&apos;ll use this to tailor the perfect outfit and plan.</p>

            <label className={styles.label}>Dog&apos;s Name
              <input
                className={styles.input}
                type="text"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                placeholder="e.g. Winston"
                required
              />
            </label>

            <label className={styles.label}>Breed
              <input
                className={styles.input}
                type="text"
                value={dogBreed}
                onChange={(e) => setDogBreed(e.target.value)}
                placeholder="e.g. Golden Retriever"
                required
              />
            </label>

            <label className={styles.label}>Age (years)
              <input
                className={styles.input}
                type="text"
                value={dogAge}
                onChange={(e) => setDogAge(e.target.value)}
                placeholder="e.g. 3"
                required
              />
            </label>

            <div className={styles.btnRow}>
              <button type="button" className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
              <button className={styles.nextBtn} type="submit">Next →</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.title}>Event details</h1>
            <p className={styles.sub}>Almost done! Tell us about the big day.</p>

            <label className={styles.label}>Wedding Date
              <input
                className={styles.input}
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </label>

            <label className={styles.label}>What&apos;s your goal for your dog on the day? (optional)
              <textarea
                className={styles.textarea}
                value={goalStatement}
                onChange={(e) => setGoalStatement(e.target.value)}
                placeholder="e.g. I want Winston to walk down the aisle with me and sit calmly during the vows."
                rows={4}
              />
            </label>

            <div className={styles.btnRow}>
              <button type="button" className={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
              <button className={styles.nextBtn} type="submit">Submit 🎉</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export type { Lead };
