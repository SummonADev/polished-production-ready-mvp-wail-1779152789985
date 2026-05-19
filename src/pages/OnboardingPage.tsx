import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import { saveLead } from '@/lib/storage';
import type { OnboardingData, UserRole, Lead } from '@/types';
import styles from './OnboardingPage.module.css';

type Step = 'role' | 'dog' | 'event' | 'pain' | 'survey' | 'account';

const PAIN_POINTS = [
  { id: 'handling', label: '🤝 Managing the dog during ceremony' },
  { id: 'outfit', label: '👔 Finding a proper outfit that fits' },
  { id: 'grooming', label: '🛁 Pre-event grooming & styling' },
  { id: 'transportation', label: '🚗 Getting the dog to/from the venue' },
  { id: 'photo', label: '📸 Coordinating dog photos' },
  { id: 'liability', label: '📜 Liability & behavior concerns' },
];

const SURVEY_QUESTIONS = [
  { id: 'dogTemperament', label: "How would you describe your dog's temperament?", options: ['Very calm', 'Generally calm', 'Energetic', 'Easily anxious'] },
  { id: 'venueType', label: 'What type of venue is the event?', options: ['Indoor (ballroom/venue)', 'Outdoor (garden/estate)', 'Mixed indoor/outdoor', 'Destination/beach'] },
  { id: 'guestCount', label: 'Approximate guest count?', options: ['Under 75', '75–150', '150+', 'Elopement (under 20)'] },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setUser, addLead, track } = useApp();

  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<UserRole>('couple');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogAge, setDogAge] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [goalStatement, setGoalStatement] = useState('');
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const stepIndex: Record<Step, number> = { role: 1, dog: 2, event: 3, pain: 4, survey: 5, account: 6 };
  const totalSteps = 6;
  const progress = (stepIndex[step] / totalSteps) * 100;

  const togglePain = (id: string) => {
    setPainPoints((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const handleSurveyAnswer = (qId: string, answer: string) => {
    setSurveyAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const handleComplete = () => {
    setLoading(true);
    track('signup_complete');

    const userData: OnboardingData = {
      name, email, role, dogName, dogBreed, dogAge, eventDate,
      painPoints, goalStatement, surveyAnswers,
      completedAt: new Date().toISOString(),
    };
    setUser(userData);

    const lead: Lead = {
      id: `lead-${Date.now()}`,
      name, email, role, dogName, dogBreed, dogAge, eventDate,
      painPoints, goalStatement, surveyAnswers,
      bookingPlan: null,
      createdAt: new Date().toISOString(),
    };
    addLead(lead);
    saveLead(lead);

    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <button className={styles.logoLink} onClick={() => navigate('/')}>
          🐾 Bark & Bow
        </button>
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarSteps}>
            {(['role', 'dog', 'event', 'pain', 'survey', 'account'] as Step[]).map((s, i) => (
              <div key={s} className={`${styles.sidebarStep} ${stepIndex[step] > i + 1 ? styles.sidebarStepDone : ''} ${step === s ? styles.sidebarStepActive : ''}`}>
                <div className={styles.sidebarStepDot}>
                  {stepIndex[step] > i + 1 ? '✓' : i + 1}
                </div>
                <div className={styles.sidebarStepLabel}>
                  {['Your Role', 'Your Dog', 'The Event', 'Pain Points', 'Quick Survey', 'Account'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        <div className={styles.content}>
          {step === 'role' && (
            <div className={styles.stepWrap}>
              <div className={styles.stepLabel}>Step 1 of 6</div>
              <h1 className={styles.stepTitle}>Who's planning this wedding?</h1>
              <p className={styles.stepSub}>This helps us tailor your experience.</p>
              <div className={styles.roleGrid}>
                {([['couple', '💑', "We're the couple", 'Planning our own wedding'], ['planner', '📋', "I'm a wedding planner", 'Planning for a client'], ['other', '👥', 'Other', 'Friend, family, or vendor']] as [UserRole, string, string, string][]).map(([id, emoji, label, desc]) => (
                  <button
                    key={id}
                    className={`${styles.roleCard} ${role === id ? styles.roleCardActive : ''}`}
                    onClick={() => setRole(id)}
                  >
                    <span className={styles.roleEmoji}>{emoji}</span>
                    <span className={styles.roleLabel}>{label}</span>
                    <span className={styles.roleDesc}>{desc}</span>
                  </button>
                ))}
              </div>
              <button className={styles.nextBtn} onClick={() => { track('signup_start'); setStep('dog'); }}>
                Continue →
              </button>
            </div>
          )}

          {step === 'dog' && (
            <div className={styles.stepWrap}>
              <div className={styles.stepLabel}>Step 2 of 6</div>
              <h1 className={styles.stepTitle}>Tell us about your dog 🐕</h1>
              <p className={styles.stepSub}>We'll use this to plan the perfect fit and handler match.</p>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Dog's name *</label>
                <input className={styles.input} type="text" placeholder="e.g. Winston" value={dogName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDogName(e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Breed *</label>
                <input className={styles.input} type="text" placeholder="e.g. Golden Retriever" value={dogBreed} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDogBreed(e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Age</label>
                <div className={styles.ageSelectWrap}>
                  <select
                    className={styles.select}
                    value={dogAge}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDogAge(e.target.value)}
                  >
                    <option value="">Select age range</option>
                    <option value="under1">Under 1 year (puppy)</option>
                    <option value="1-3">1–3 years</option>
                    <option value="4-7">4–7 years</option>
                    <option value="8-11">8–11 years</option>
                    <option value="12+">12+ years (senior)</option>
                  </select>
                  <span className={styles.selectArrow}>▾</span>
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Describe your goal in one sentence</label>
                <textarea className={styles.textarea} placeholder="e.g. I want Buster to walk down the aisle as ring bearer." value={goalStatement} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setGoalStatement(e.target.value)} rows={3} />
              </div>
              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep('role')}>← Back</button>
                <button className={styles.nextBtn} disabled={!dogName || !dogBreed} onClick={() => setStep('event')}>Continue →</button>
              </div>
            </div>
          )}

          {step === 'event' && (
            <div className={styles.stepWrap}>
              <div className={styles.stepLabel}>Step 3 of 6</div>
              <h1 className={styles.stepTitle}>About the event 📅</h1>
              <p className={styles.stepSub}>We'll match you with handlers available for your date.</p>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Event date *</label>
                <input className={styles.input} type="date" value={eventDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventDate(e.target.value)} />
              </div>
              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep('dog')}>← Back</button>
                <button className={styles.nextBtn} disabled={!eventDate} onClick={() => setStep('pain')}>Continue →</button>
              </div>
            </div>
          )}

          {step === 'pain' && (
            <div className={styles.stepWrap}>
              <div className={styles.stepLabel}>Step 4 of 6</div>
              <h1 className={styles.stepTitle}>What worries you most? 😰</h1>
              <p className={styles.stepSub}>Select all that apply — we'll make sure every concern is addressed.</p>
              <div className={styles.painGrid}>
                {PAIN_POINTS.map((p) => (
                  <button
                    key={p.id}
                    className={`${styles.painCard} ${painPoints.includes(p.id) ? styles.painCardActive : ''}`}
                    onClick={() => togglePain(p.id)}
                  >
                    {p.label}
                    {painPoints.includes(p.id) && <span className={styles.painCheck}>✓</span>}
                  </button>
                ))}
              </div>
              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep('event')}>← Back</button>
                <button className={styles.nextBtn} onClick={() => setStep('survey')}>Continue →</button>
              </div>
            </div>
          )}

          {step === 'survey' && (
            <div className={styles.stepWrap}>
              <div className={styles.stepLabel}>Step 5 of 6</div>
              <h1 className={styles.stepTitle}>Quick discovery survey 📊</h1>
              <p className={styles.stepSub}>3 questions — helps us match you with the right handler and package.</p>
              {SURVEY_QUESTIONS.map((q) => (
                <div key={q.id} className={styles.fieldGroup}>
                  <label className={styles.label}>{q.label}</label>
                  <div className={styles.optionGrid}>
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        className={`${styles.optionBtn} ${surveyAnswers[q.id] === opt ? styles.optionBtnActive : ''}`}
                        onClick={() => handleSurveyAnswer(q.id, opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep('pain')}>← Back</button>
                <button className={styles.nextBtn} onClick={() => setStep('account')}>Continue →</button>
              </div>
            </div>
          )}

          {step === 'account' && (
            <div className={styles.stepWrap}>
              <div className={styles.stepLabel}>Step 6 of 6</div>
              <h1 className={styles.stepTitle}>Create your account ✨</h1>
              <p className={styles.stepSub}>Save your plan and get updates about your booking.</p>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Your name *</label>
                <input className={styles.input} type="text" placeholder="e.g. Emily Carter" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Email address *</label>
                <input className={styles.input} type="email" placeholder="your@email.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
              </div>
              <div className={styles.termsNote}>
                By creating an account you agree to our Terms of Service and acknowledge our Liability Waiver.
              </div>
              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep('survey')}>← Back</button>
                <button
                  className={`${styles.nextBtn} ${styles.finishBtn}`}
                  disabled={!name || !email || loading}
                  onClick={handleComplete}
                >
                  {loading ? 'Creating your plan...' : 'View My Plan →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
