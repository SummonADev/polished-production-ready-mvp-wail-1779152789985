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
  breed: string;
  packageId: string;
  eventDate: string;
  notes: string;
};

const INITIAL: FormState = {
  ownerName: '',
  email: '',
  phone: '',
  dogName: '',
  breed: '',
  packageId: PACKAGES[1]?.id ?? '',
  eventDate: '',
  notes: '',
};

export default function OnboardingPage() {
  const { addBooking, track } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const set = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep1 = () => {
    const e: Partial<FormState> = {};
    if (!form.ownerName.trim()) e.ownerName = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (!form.dogName.trim()) e.dogName = 'Dog name is required';
    if (!form.breed.trim()) e.breed = 'Breed is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Partial<FormState> = {};
    if (!form.packageId) e.packageId = 'Please select a package';
    if (!form.eventDate) e.eventDate = 'Event date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addBooking({
        ownerName: form.ownerName,
        email: form.email,
        dogName: form.dogName,
        breed: form.breed,
        packageId: form.packageId,
        eventDate: form.eventDate,
        notes: form.notes,
      });
      track('booking_submitted');
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  if (submitted) {
    return (
      <PageLayout>
        <div className={styles.successWrapper}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>🎉</div>
            <h2 className={styles.successTitle}>Booking Confirmed!</h2>
            <p className={styles.successSub}>
              We've received your booking for <strong>{form.dogName}</strong>. Our team will reach out within 24 hours to confirm details and next steps.
            </p>
            <div className={styles.successDetails}>
              <div className={styles.detailRow}><span>Owner:</span><strong>{form.ownerName}</strong></div>
              <div className={styles.detailRow}><span>Email:</span><strong>{form.email}</strong></div>
              <div className={styles.detailRow}><span>Dog:</span><strong>{form.dogName} ({form.breed})</strong></div>
              <div className={styles.detailRow}><span>Date:</span><strong>{form.eventDate}</strong></div>
              <div className={styles.detailRow}><span>Package:</span><strong>{PACKAGES.find(p => p.id === form.packageId)?.name}</strong></div>
            </div>
            <div className={styles.successActions}>
              <button className={styles.primaryBtn} onClick={() => navigate('/dashboard')}>View Dashboard</button>
              <button className={styles.secondaryBtn} onClick={() => navigate('/')}>Back to Home</button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Book Your Dog's Experience</h1>
          <p className={styles.sub}>Complete the form below and we'll handle everything else.</p>
        </div>

        <div className={styles.stepIndicator}>
          {[1, 2, 3].map(s => (
            <div key={s} className={`${styles.stepDot} ${step >= s ? styles.stepDotActive : ''}`}>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>About You & Your Dog</h2>
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <label className={styles.label}>Your Name *</label>
                    <input className={`${styles.input} ${errors.ownerName ? styles.inputError : ''}`} value={form.ownerName} onChange={e => set('ownerName', e.target.value)} placeholder="Jane Smith" />
                    {errors.ownerName && <span className={styles.error}>{errors.ownerName}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email Address *</label>
                    <input className={`${styles.input} ${errors.email ? styles.inputError : ''}`} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Phone Number</label>
                    <input className={styles.input} type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(555) 000-0000" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Dog's Name *</label>
                    <input className={`${styles.input} ${errors.dogName ? styles.inputError : ''}`} value={form.dogName} onChange={e => set('dogName', e.target.value)} placeholder="Biscuit" />
                    {errors.dogName && <span className={styles.error}>{errors.dogName}</span>}
                  </div>
                  <div className={`${styles.field} ${styles.colSpan2}`}>
                    <label className={styles.label}>Dog's Breed *</label>
                    <input className={`${styles.input} ${errors.breed ? styles.inputError : ''}`} value={form.breed} onChange={e => set('breed', e.target.value)} placeholder="Golden Retriever" />
                    {errors.breed && <span className={styles.error}>{errors.breed}</span>}
                  </div>
                </div>
                <div className={styles.formActions}>
                  <div />
                  <button type="button" className={styles.primaryBtn} onClick={handleNext}>Next Step →</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Choose Your Package & Date</h2>
                <div className={styles.packageGrid}>
                  {PACKAGES.map(pkg => (
                    <div
                      key={pkg.id}
                      className={`${styles.packageCard} ${form.packageId === pkg.id ? styles.packageCardSelected : ''}`}
                      onClick={() => set('packageId', pkg.id)}
                    >
                      <div className={styles.packageName}>{pkg.name}</div>
                      <div className={styles.packagePrice}>${pkg.price.toLocaleString()}</div>
                      <div className={styles.packageDesc}>{pkg.description}</div>
                    </div>
                  ))}
                </div>
                {errors.packageId && <span className={styles.error}>{errors.packageId}</span>}
                <div className={styles.field} style={{ marginTop: '1.5rem' }}>
                  <label className={styles.label}>Event Date *</label>
                  <input className={`${styles.input} ${errors.eventDate ? styles.inputError : ''}`} type="date" value={form.eventDate} onChange={e => set('eventDate', e.target.value)} />
                  {errors.eventDate && <span className={styles.error}>{errors.eventDate}</span>}
                </div>
                <div className={styles.formActions}>
                  <button type="button" className={styles.secondaryBtn} onClick={handleBack}>← Back</button>
                  <button type="button" className={styles.primaryBtn} onClick={handleNext}>Next Step →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Any Special Notes?</h2>
                <div className={styles.field}>
                  <label className={styles.label}>Notes or Special Requests</label>
                  <textarea
                    className={styles.textarea}
                    value={form.notes}
                    onChange={e => set('notes', e.target.value)}
                    placeholder="Tell us anything about your dog's temperament, allergies, or special requests..."
                    rows={5}
                  />
                </div>
                <div className={styles.summary}>
                  <h3 className={styles.summaryTitle}>Booking Summary</h3>
                  <div className={styles.summaryGrid}>
                    <div className={styles.detailRow}><span>Owner:</span><strong>{form.ownerName}</strong></div>
                    <div className={styles.detailRow}><span>Email:</span><strong>{form.email}</strong></div>
                    <div className={styles.detailRow}><span>Dog:</span><strong>{form.dogName} ({form.breed})</strong></div>
                    <div className={styles.detailRow}><span>Date:</span><strong>{form.eventDate}</strong></div>
                    <div className={styles.detailRow}><span>Package:</span><strong>{PACKAGES.find(p => p.id === form.packageId)?.name}</strong></div>
                  </div>
                </div>
                <div className={styles.formActions}>
                  <button type="button" className={styles.secondaryBtn} onClick={handleBack}>← Back</button>
                  <button type="submit" className={styles.primaryBtn} disabled={loading}>
                    {loading ? 'Submitting...' : 'Confirm Booking 🎉'}
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
