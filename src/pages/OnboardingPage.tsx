import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import { PACKAGES } from '@/lib/packages';
import PageLayout from '@/components/shared/PageLayout';
import styles from './OnboardingPage.module.css';

type Step = 'owner' | 'dog' | 'package' | 'confirm';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { addLead, addBooking, track } = useApp();
  const [step, setStep] = useState<Step>('owner');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[1].id);
  const [eventDate, setEventDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleOwnerNext = (e: React.FormEvent) => {
    e.preventDefault();
    track('onboarding_owner_step');
    setStep('dog');
  };

  const handleDogNext = (e: React.FormEvent) => {
    e.preventDefault();
    track('onboarding_dog_step');
    setStep('package');
  };

  const handlePackageNext = (e: React.FormEvent) => {
    e.preventDefault();
    track('onboarding_package_step');
    setStep('confirm');
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({ email, name: ownerName, source: 'onboarding' });
    addBooking({
      ownerName,
      email,
      dogName,
      breed,
      packageId: selectedPackage,
      eventDate,
    });
    track('booking_completed');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageLayout>
        <div className={styles.successPage}>
          <div className={styles.successCard}>
            <div className={styles.successEmoji}>🎉</div>
            <h1 className={styles.successTitle}>You're Officially Booked!</h1>
            <p className={styles.successSub}>
              Thank you, {ownerName}! We've received your booking for {dogName}. 
              Our team will reach out within 24 hours to confirm details.
            </p>
            <button className={styles.successBtn} onClick={() => navigate('/dashboard')}>
              View Your Dashboard
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const steps: Step[] = ['owner', 'dog', 'package', 'confirm'];
  const stepIndex = steps.indexOf(step);

  return (
    <PageLayout>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Book Your Dog's Experience</h1>
            <p className={styles.sub}>Tell us about you and your pup.</p>
          </div>

          <div className={styles.progressBar}>
            {steps.map((s, i) => (
              <div
                key={s}
                className={`${styles.progressStep} ${
                  i < stepIndex ? styles.progressDone : i === stepIndex ? styles.progressActive : ''
                }`}
              >
                <div className={styles.progressDot}>{i < stepIndex ? '✓' : i + 1}</div>
                <span className={styles.progressLabel}>
                  {s === 'owner' ? 'You' : s === 'dog' ? 'Your Dog' : s === 'package' ? 'Package' : 'Confirm'}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.card}>
            {step === 'owner' && (
              <form onSubmit={handleOwnerNext} className={styles.form}>
                <h2 className={styles.stepTitle}>About You</h2>
                <div className={styles.field}>
                  <label className={styles.label}>Your Name</label>
                  <input
                    className={styles.input}
                    type="text"
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    placeholder="Jane Smith"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    required
                  />
                </div>
                <button className={styles.nextBtn} type="submit">Next: Your Dog →</button>
              </form>
            )}

            {step === 'dog' && (
              <form onSubmit={handleDogNext} className={styles.form}>
                <h2 className={styles.stepTitle}>About Your Dog</h2>
                <div className={styles.field}>
                  <label className={styles.label}>Dog's Name</label>
                  <input
                    className={styles.input}
                    type="text"
                    value={dogName}
                    onChange={e => setDogName(e.target.value)}
                    placeholder="Max"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Breed</label>
                  <input
                    className={styles.input}
                    type="text"
                    value={breed}
                    onChange={e => setBreed(e.target.value)}
                    placeholder="Golden Retriever"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Event Date</label>
                  <input
                    className={styles.input}
                    type="date"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.btnRow}>
                  <button type="button" className={styles.backBtn} onClick={() => setStep('owner')}>← Back</button>
                  <button className={styles.nextBtn} type="submit">Next: Package →</button>
                </div>
              </form>
            )}

            {step === 'package' && (
              <form onSubmit={handlePackageNext} className={styles.form}>
                <h2 className={styles.stepTitle}>Choose a Package</h2>
                <div className={styles.packageGrid}>
                  {PACKAGES.map(pkg => (
                    <div
                      key={pkg.id}
                      className={`${styles.packageCard} ${selectedPackage === pkg.id ? styles.packageSelected : ''}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      <span className={styles.packageEmoji}>{pkg.emoji}</span>
                      <h3 className={styles.packageName}>{pkg.name}</h3>
                      <p className={styles.packagePrice}>{pkg.price}</p>
                      {pkg.tag && <span className={styles.packageTag}>{pkg.tag}</span>}
                    </div>
                  ))}
                </div>
                <div className={styles.btnRow}>
                  <button type="button" className={styles.backBtn} onClick={() => setStep('dog')}>← Back</button>
                  <button className={styles.nextBtn} type="submit">Next: Confirm →</button>
                </div>
              </form>
            )}

            {step === 'confirm' && (
              <form onSubmit={handleConfirm} className={styles.form}>
                <h2 className={styles.stepTitle}>Confirm Your Booking</h2>
                <div className={styles.summary}>
                  <div className={styles.summaryRow}><span>Owner</span><strong>{ownerName}</strong></div>
                  <div className={styles.summaryRow}><span>Email</span><strong>{email}</strong></div>
                  <div className={styles.summaryRow}><span>Dog</span><strong>{dogName} ({breed})</strong></div>
                  <div className={styles.summaryRow}><span>Event Date</span><strong>{eventDate}</strong></div>
                  <div className={styles.summaryRow}>
                    <span>Package</span>
                    <strong>{PACKAGES.find(p => p.id === selectedPackage)?.name}</strong>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Price</span>
                    <strong>{PACKAGES.find(p => p.id === selectedPackage)?.price}</strong>
                  </div>
                </div>
                <div className={styles.btnRow}>
                  <button type="button" className={styles.backBtn} onClick={() => setStep('package')}>← Back</button>
                  <button className={styles.nextBtn} type="submit">Confirm Booking 🎉</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
