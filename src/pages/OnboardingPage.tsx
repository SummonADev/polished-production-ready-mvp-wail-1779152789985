import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import { PACKAGES } from '@/lib/packages';
import PageLayout from '@/components/shared/PageLayout';
import styles from './OnboardingPage.module.css';

type Step = 'package' | 'dog' | 'event' | 'confirm';

interface FormData {
  packageId: string;
  ownerName: string;
  ownerEmail: string;
  dogName: string;
  dogBreed: string;
  eventDate: string;
}

const INITIAL: FormData = {
  packageId: '',
  ownerName: '',
  ownerEmail: '',
  dogName: '',
  dogBreed: '',
  eventDate: '',
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { addBooking, track } = useApp();
  const [step, setStep] = useState<Step>('package');
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handlePackageSelect = (id: string) => {
    update('packageId', id);
    track('onboarding_package_selected');
    setStep('dog');
  };

  const handleDogNext = () => {
    if (!form.dogName || !form.dogBreed) return;
    setStep('event');
  };

  const handleEventNext = () => {
    if (!form.eventDate || !form.ownerName || !form.ownerEmail) return;
    setStep('confirm');
  };

  const handleSubmit = () => {
    addBooking({
      ownerName: form.ownerName,
      ownerEmail: form.ownerEmail,
      dogName: form.dogName,
      dogBreed: form.dogBreed,
      packageId: form.packageId,
      eventDate: form.eventDate,
      status: 'pending',
    });
    track('booking_completed');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageLayout>
        <div className={styles.successWrap}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>🎉</div>
            <h2 className={styles.successTitle}>Booking Requested!</h2>
            <p className={styles.successSub}>We'll reach out to {form.ownerEmail} within 24 hours to confirm your date.</p>
            <button className={styles.successBtn} onClick={() => navigate('/dashboard')}>View Dashboard</button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className={styles.page}>
        <div className={styles.progressBar}>
          {(['package', 'dog', 'event', 'confirm'] as Step[]).map((s, i) => (
            <div key={s} className={`${styles.progressStep} ${step === s ? styles.progressActive : ''} ${['package','dog','event','confirm'].indexOf(step) > i ? styles.progressDone : ''}`}>
              <span className={styles.progressNum}>{i + 1}</span>
              <span className={styles.progressLabel}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
            </div>
          ))}
        </div>

        <div className={styles.stepWrap}>
          {step === 'package' && (
            <div className={styles.stepCard}>
              <h2 className={styles.stepTitle}>Choose Your Package</h2>
              <p className={styles.stepSub}>Select the experience that fits your big day.</p>
              <div className={styles.packageGrid}>
                {PACKAGES.map(pkg => (
                  <button
                    key={pkg.id}
                    className={`${styles.packageCard} ${form.packageId === pkg.id ? styles.packageSelected : ''} ${pkg.tag ? styles.packageFeatured : ''}`}
                    onClick={() => handlePackageSelect(pkg.id)}
                  >
                    {pkg.tag && <div className={styles.packageBadge}>{pkg.tag}</div>}
                    <span className={styles.packageEmoji}>{pkg.emoji}</span>
                    <h3 className={styles.packageName}>{pkg.name}</h3>
                    <div className={styles.packagePrice}>{pkg.price}</div>
                    <div className={styles.packageDesc}>{pkg.description}</div>
                    <ul className={styles.packageFeatures}>
                      {pkg.features.slice(0, 3).map(f => (
                        <li key={f} className={styles.packageFeature}>✓ {f}</li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'dog' && (
            <div className={styles.stepCard}>
              <h2 className={styles.stepTitle}>Tell Us About Your Dog</h2>
              <p className={styles.stepSub}>We'll use this to match the perfect handler and tailor the tuxedo.</p>
              <div className={styles.formGroup}>
                <label className={styles.label}>Dog's Name</label>
                <input
                  className={styles.input}
                  value={form.dogName}
                  onChange={e => update('dogName', e.target.value)}
                  placeholder="e.g. Biscuit"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Breed</label>
                <input
                  className={styles.input}
                  value={form.dogBreed}
                  onChange={e => update('dogBreed', e.target.value)}
                  placeholder="e.g. Golden Retriever"
                />
              </div>
              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep('package')}>← Back</button>
                <button className={styles.nextBtn} onClick={handleDogNext} disabled={!form.dogName || !form.dogBreed}>Next →</button>
              </div>
            </div>
          )}

          {step === 'event' && (
            <div className={styles.stepCard}>
              <h2 className={styles.stepTitle}>Your Event Details</h2>
              <p className={styles.stepSub}>Almost there — just a few more details.</p>
              <div className={styles.formGroup}>
                <label className={styles.label}>Your Name</label>
                <input
                  className={styles.input}
                  value={form.ownerName}
                  onChange={e => update('ownerName', e.target.value)}
                  placeholder="e.g. Sarah Thornton"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                  className={styles.input}
                  type="email"
                  value={form.ownerEmail}
                  onChange={e => update('ownerEmail', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Wedding Date</label>
                <input
                  className={styles.input}
                  type="date"
                  value={form.eventDate}
                  onChange={e => update('eventDate', e.target.value)}
                />
              </div>
              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep('dog')}>← Back</button>
                <button className={styles.nextBtn} onClick={handleEventNext} disabled={!form.ownerName || !form.ownerEmail || !form.eventDate}>Next →</button>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className={styles.stepCard}>
              <h2 className={styles.stepTitle}>Confirm Your Booking</h2>
              <p className={styles.stepSub}>Review your details before we lock in your date.</p>
              <div className={styles.confirmList}>
                <ConfirmRow label="Package" value={PACKAGES.find(p => p.id === form.packageId)?.name ?? form.packageId} />
                <ConfirmRow label="Dog" value={`${form.dogName} (${form.dogBreed})`} />
                <ConfirmRow label="Owner" value={form.ownerName} />
                <ConfirmRow label="Email" value={form.ownerEmail} />
                <ConfirmRow label="Wedding Date" value={form.eventDate} />
              </div>
              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep('event')}>← Back</button>
                <button className={styles.nextBtn} onClick={handleSubmit}>Confirm Booking 🎉</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.confirmRow}>
      <span className={styles.confirmLabel}>{label}</span>
      <span className={styles.confirmValue}>{value}</span>
    </div>
  );
}
