import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import PageLayout from '@/components/shared/PageLayout';
import styles from './OnboardingPage.module.css';
import { PACKAGES } from '@/lib/packages';

type FormData = {
  ownerName: string;
  ownerEmail: string;
  dogName: string;
  dogBreed: string;
  dogSize: string;
  eventDate: string;
  eventLocation: string;
  packageId: string;
  notes: string;
};

const INITIAL: FormData = {
  ownerName: '',
  ownerEmail: '',
  dogName: '',
  dogBreed: '',
  dogSize: '',
  eventDate: '',
  eventLocation: '',
  packageId: '',
  notes: '',
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { submitOnboarding, track } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      submitOnboarding(form);
      track('onboarding_complete', { packageId: form.packageId });
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <PageLayout>
      <div className={styles.page}>
        <div className="container-narrow">
          <div className={styles.progress}>
            {[1, 2, 3].map(n => (
              <div key={n} className={`${styles.progressStep} ${step >= n ? styles.progressActive : ''}`}>
                <div className={styles.progressDot}>{step > n ? '✓' : n}</div>
                <span className={styles.progressLabel}>
                  {n === 1 ? 'Your Info' : n === 2 ? 'Your Dog' : 'Package'}
                </span>
              </div>
            ))}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {step === 1 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Tell Us About Yourself</h2>
                <div className={styles.field}>
                  <label className={styles.label}>Your Name</label>
                  <input className={styles.input} value={form.ownerName} onChange={set('ownerName')} placeholder="Jane Smith" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email Address</label>
                  <input className={styles.input} type="email" value={form.ownerEmail} onChange={set('ownerEmail')} placeholder="jane@example.com" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Event Date</label>
                  <input className={styles.input} type="date" value={form.eventDate} onChange={set('eventDate')} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Event Location (City, State)</label>
                  <input className={styles.input} value={form.eventLocation} onChange={set('eventLocation')} placeholder="New York, NY" required />
                </div>
                <div className={styles.actions}>
                  <div />
                  <button type="button" className={styles.nextBtn} onClick={next}>Next →</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Tell Us About Your Dog</h2>
                <div className={styles.field}>
                  <label className={styles.label}>Dog's Name</label>
                  <input className={styles.input} value={form.dogName} onChange={set('dogName')} placeholder="Max" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Breed</label>
                  <input className={styles.input} value={form.dogBreed} onChange={set('dogBreed')} placeholder="Golden Retriever" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Size</label>
                  <select className={styles.input} value={form.dogSize} onChange={set('dogSize')} required>
                    <option value="">Select size…</option>
                    <option value="small">Small (under 20 lbs)</option>
                    <option value="medium">Medium (20–50 lbs)</option>
                    <option value="large">Large (50–90 lbs)</option>
                    <option value="xlarge">Extra Large (90+ lbs)</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Additional Notes</label>
                  <textarea className={styles.input} value={form.notes} onChange={set('notes')} placeholder="Any special needs, temperament info, etc." rows={3} />
                </div>
                <div className={styles.actions}>
                  <button type="button" className={styles.backBtn} onClick={back}>← Back</button>
                  <button type="button" className={styles.nextBtn} onClick={next}>Next →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Choose Your Package</h2>
                <div className={styles.packages}>
                  {PACKAGES.map(pkg => (
                    <label key={pkg.id} className={`${styles.pkgCard} ${form.packageId === pkg.id ? styles.pkgSelected : ''}`}>
                      <input
                        type="radio"
                        name="packageId"
                        value={pkg.id}
                        checked={form.packageId === pkg.id}
                        onChange={set('packageId')}
                        className={styles.radioHidden}
                        required
                      />
                      <div className={styles.pkgEmoji}>{pkg.emoji}</div>
                      <div>
                        <p className={styles.pkgName}>{pkg.name}</p>
                        <p className={styles.pkgPrice}>{pkg.price}</p>
                        <p className={styles.pkgDesc}>{pkg.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className={styles.actions}>
                  <button type="button" className={styles.backBtn} onClick={back}>← Back</button>
                  <button type="submit" className={styles.nextBtn} disabled={loading}>
                    {loading ? 'Booking…' : 'Confirm Booking 🎉'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
