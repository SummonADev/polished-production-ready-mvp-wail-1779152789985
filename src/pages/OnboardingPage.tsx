import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import { PACKAGES } from '@/lib/packages';
import PageLayout from '@/components/shared/PageLayout';
import styles from './OnboardingPage.module.css';

type FormState = {
  ownerName: string;
  email: string;
  phone: string;
  dogName: string;
  dogBreed: string;
  dogSize: string;
  eventDate: string;
  eventLocation: string;
  packageId: string;
  notes: string;
};

const initialForm: FormState = {
  ownerName: '',
  email: '',
  phone: '',
  dogName: '',
  dogBreed: '',
  dogSize: 'medium',
  eventDate: '',
  eventLocation: '',
  packageId: 'grand_marshal',
  notes: '',
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { addBooking, track } = useApp();
  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (field: keyof FormState, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ownerName || !form.email || !form.dogName || !form.eventDate || !form.eventLocation) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    const selectedPackage = PACKAGES.find(p => p.id === form.packageId) ?? PACKAGES[1];
    setTimeout(() => {
      addBooking({
        ownerName: form.ownerName,
        email: form.email,
        phone: form.phone,
        dogName: form.dogName,
        dogBreed: form.dogBreed,
        dogSize: form.dogSize,
        eventDate: form.eventDate,
        eventLocation: form.eventLocation,
        packageId: form.packageId,
        packageName: selectedPackage.name,
        notes: form.notes,
      });
      track('onboarding_complete');
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <PageLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Book Your Dog's Experience</h1>
          <p className={styles.sub}>Fill in the details below and we'll handle the rest.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {step === 1 && (
            <div className={styles.stepBlock}>
              <h2 className={styles.stepTitle}>Step 1: About You</h2>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Your Name *
                  <input className={styles.input} value={form.ownerName} onChange={e => update('ownerName', e.target.value)} placeholder="Full name" required />
                </label>
                <label className={styles.label}>Email *
                  <input className={styles.input} type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" required />
                </label>
                <label className={styles.label}>Phone
                  <input className={styles.input} type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="555-555-5555" />
                </label>
              </div>
              <button type="button" className={styles.nextBtn} onClick={() => { if (!form.ownerName || !form.email) { setError('Name and email are required.'); return; } setError(''); setStep(2); }}>Next →</button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepBlock}>
              <h2 className={styles.stepTitle}>Step 2: About Your Dog</h2>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Dog's Name *
                  <input className={styles.input} value={form.dogName} onChange={e => update('dogName', e.target.value)} placeholder="e.g. Biscuit" required />
                </label>
                <label className={styles.label}>Breed
                  <input className={styles.input} value={form.dogBreed} onChange={e => update('dogBreed', e.target.value)} placeholder="e.g. Golden Retriever" />
                </label>
                <label className={styles.label}>Size
                  <select className={styles.input} value={form.dogSize} onChange={e => update('dogSize', e.target.value)}>
                    <option value="small">Small (under 20 lbs)</option>
                    <option value="medium">Medium (20–50 lbs)</option>
                    <option value="large">Large (50+ lbs)</option>
                  </select>
                </label>
              </div>
              <div className={styles.stepNav}>
                <button type="button" className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                <button type="button" className={styles.nextBtn} onClick={() => { if (!form.dogName) { setError('Dog name is required.'); return; } setError(''); setStep(3); }}>Next →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepBlock}>
              <h2 className={styles.stepTitle}>Step 3: Event Details</h2>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Event Date *
                  <input className={styles.input} type="date" value={form.eventDate} onChange={e => update('eventDate', e.target.value)} required />
                </label>
                <label className={styles.label}>Event Location *
                  <input className={styles.input} value={form.eventLocation} onChange={e => update('eventLocation', e.target.value)} placeholder="City, State" required />
                </label>
                <label className={styles.label}>Package *
                  <select className={styles.input} value={form.packageId} onChange={e => update('packageId', e.target.value)}>
                    {PACKAGES.map(p => (
                      <option key={p.id} value={p.id}>{p.name} — ${p.price.toLocaleString()}</option>
                    ))}
                  </select>
                </label>
                <label className={styles.label}>Notes
                  <textarea className={styles.input} value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Anything we should know?" rows={3} />
                </label>
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.stepNav}>
                <button type="button" className={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'Booking...' : '🐾 Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </PageLayout>
  );
}
