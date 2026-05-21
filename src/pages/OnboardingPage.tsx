import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import PageLayout from '@/components/shared/PageLayout';
import styles from './OnboardingPage.module.css';

const PACKAGES = [
  { id: 'gentleman', name: 'The Gentleman', price: '$1,200' },
  { id: 'grand-marshal', name: 'The Grand Marshal', price: '$2,400' },
  { id: 'royal-pack', name: 'The Royal Pack', price: '$3,800' },
];

const DOG_SIZES = ['XS (under 10 lbs)', 'S (10–25 lbs)', 'M (25–50 lbs)', 'L (50–80 lbs)', 'XL (80+ lbs)'];

type FormData = {
  name: string;
  email: string;
  phone: string;
  dogName: string;
  dogBreed: string;
  dogSize: string;
  packageId: string;
  eventDate: string;
  eventLocation: string;
  notes: string;
};

const EMPTY: FormData = {
  name: '',
  email: '',
  phone: '',
  dogName: '',
  dogBreed: '',
  dogSize: '',
  packageId: '',
  eventDate: '',
  eventLocation: '',
  notes: '',
};

export default function OnboardingPage() {
  const { addLead, addBooking, track } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addLead({ name: form.name, email: form.email, source: 'onboarding' });
      addBooking({
        name: form.name,
        email: form.email,
        phone: form.phone,
        dogName: form.dogName,
        dogBreed: form.dogBreed,
        dogSize: form.dogSize,
        packageId: form.packageId,
        eventDate: form.eventDate,
        eventLocation: form.eventLocation,
        notes: form.notes,
      });
      track('booking_submitted', { packageId: form.packageId });
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  if (submitted) {
    return (
      <PageLayout>
        <div className={styles.successWrap}>
          <div className={styles.successCard}>
            <div className={styles.successEmoji}>🎉</div>
            <h1 className={styles.successTitle}>You're Booked!</h1>
            <p className={styles.successSub}>
              We've received your booking for <strong>{form.dogName}</strong>. Our team will reach out within 24 hours.
            </p>
            <button className={styles.dashBtn} onClick={() => navigate('/dashboard')}>
              View Your Dashboard
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Book Your Dog's Big Day</h1>
          <p className={styles.sub}>Fill out the form below and we'll handle everything else.</p>
        </div>

        <div className={styles.stepBar}>
          {[1, 2, 3].map(s => (
            <div key={s} className={`${styles.stepDot} ${step >= s ? styles.stepDotActive : ''}`}>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {step === 1 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Your Details</h2>
              <div className={styles.fields}>
                <label className={styles.label}>
                  Full Name *
                  <input
                    className={styles.input}
                    type="text"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    required
                    placeholder="Jane Smith"
                  />
                </label>
                <label className={styles.label}>
                  Email *
                  <input
                    className={styles.input}
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    required
                    placeholder="jane@example.com"
                  />
                </label>
                <label className={styles.label}>
                  Phone
                  <input
                    className={styles.input}
                    type="tel"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    placeholder="(555) 000-0000"
                  />
                </label>
              </div>
              <button
                type="button"
                className={styles.nextBtn}
                onClick={() => setStep(2)}
                disabled={!form.name || !form.email}
              >
                Next: Your Dog →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>About Your Dog</h2>
              <div className={styles.fields}>
                <label className={styles.label}>
                  Dog's Name *
                  <input
                    className={styles.input}
                    type="text"
                    value={form.dogName}
                    onChange={e => set('dogName', e.target.value)}
                    required
                    placeholder="Max"
                  />
                </label>
                <label className={styles.label}>
                  Breed *
                  <input
                    className={styles.input}
                    type="text"
                    value={form.dogBreed}
                    onChange={e => set('dogBreed', e.target.value)}
                    required
                    placeholder="Golden Retriever"
                  />
                </label>
                <label className={styles.label}>
                  Size *
                  <select
                    className={styles.input}
                    value={form.dogSize}
                    onChange={e => set('dogSize', e.target.value)}
                    required
                  >
                    <option value="">Select size…</option>
                    {DOG_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
              </div>
              <div className={styles.btnRow}>
                <button type="button" className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                <button
                  type="button"
                  className={styles.nextBtn}
                  onClick={() => setStep(3)}
                  disabled={!form.dogName || !form.dogBreed || !form.dogSize}
                >
                  Next: Event Details →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Event & Package</h2>
              <div className={styles.fields}>
                <label className={styles.label}>
                  Event Date *
                  <input
                    className={styles.input}
                    type="date"
                    value={form.eventDate}
                    onChange={e => set('eventDate', e.target.value)}
                    required
                  />
                </label>
                <label className={styles.label}>
                  Event Location *
                  <input
                    className={styles.input}
                    type="text"
                    value={form.eventLocation}
                    onChange={e => set('eventLocation', e.target.value)}
                    required
                    placeholder="New York, NY"
                  />
                </label>
                <fieldset className={styles.pkgFieldset}>
                  <legend className={styles.label}>Choose Package *</legend>
                  {PACKAGES.map(pkg => (
                    <label key={pkg.id} className={`${styles.pkgOption} ${form.packageId === pkg.id ? styles.pkgSelected : ''}`}>
                      <input
                        type="radio"
                        name="package"
                        value={pkg.id}
                        checked={form.packageId === pkg.id}
                        onChange={() => set('packageId', pkg.id)}
                      />
                      <span className={styles.pkgName}>{pkg.name}</span>
                      <span className={styles.pkgPrice}>{pkg.price}</span>
                    </label>
                  ))}
                </fieldset>
                <label className={styles.label}>
                  Additional Notes
                  <textarea
                    className={styles.textarea}
                    value={form.notes}
                    onChange={e => set('notes', e.target.value)}
                    placeholder="Any special requirements, temperament notes, etc."
                    rows={3}
                  />
                </label>
              </div>
              <div className={styles.btnRow}>
                <button type="button" className={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading || !form.eventDate || !form.eventLocation || !form.packageId}
                >
                  {loading ? 'Submitting…' : 'Confirm Booking 🎉'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </PageLayout>
  );
}
