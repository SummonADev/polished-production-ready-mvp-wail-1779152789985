import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/shared/PageLayout';
import DogImage from '@/components/shared/DogImage';
import styles from './HowItWorksPage.module.css';

const STEPS = [
  {
    number: '01',
    title: 'Tell Us About Your Dog & Event',
    description:
      'Start with a quick 5-minute consultation form. Tell us your dog\'s breed, size, temperament, your wedding date, venue, and color palette. We match every detail — from lapel width to collar hardware.',
    detail:
      'Our concierge team reviews every submission within 24 hours. We\'ll follow up with a personalized proposal and schedule a video meet-and-greet with your dog.',
    icon: '📋',
    imageVariant: 'golden' as const,
    imageSide: 'right' as const,
  },
  {
    number: '02',
    title: 'Custom Outfit Design & Fitting',
    description:
      'We craft a one-of-a-kind garment — tuxedo, morning suit, floral collar gown, or bridal cape — based on your wedding aesthetic. All pieces are hand-tailored using pet-safe, hypoallergenic fabrics.',
    detail:
      'A complimentary fitting session (in-person or virtual with a measurement kit we ship to you) ensures a perfect fit. Alterations are included.',
    icon: '✂️',
    imageVariant: 'frenchie' as const,
    imageSide: 'left' as const,
  },
  {
    number: '03',
    title: 'Pre-Event Grooming & Prep',
    description:
      'The day before your event, our certified groomers prepare your dog: bath, blow-dry, nail trim, and a dry-run wearing the outfit. We also run a short desensitization session so the garment feels comfortable.',
    detail:
      'Our groomers use only organic, fragrance-free products. Dogs with sensitive skin or anxiety receive a special calm-prep protocol.',
    icon: '✨',
    imageVariant: 'poodle' as const,
    imageSide: 'right' as const,
  },
  {
    number: '04',
    title: 'Event-Day Handler Arrives',
    description:
      'Your dedicated Pet Handler arrives at the venue 60 minutes before the ceremony. They handle transportation, dressing, positioning, and removal — so you don\'t lift a finger.',
    detail:
      'All handlers are certified in pet first aid, have a minimum 3 years of event experience, and are background-checked. A liability certificate is included with Signature and Elite packages.',
    icon: '🤝',
    imageVariant: 'labrador' as const,
    imageSide: 'left' as const,
  },
  {
    number: '05',
    title: 'The Moment (and the Photos)',
    description:
      'Your dog walks the aisle, sits for the ceremony, charms the cocktail hour. Our handler stays by their side the entire time, managing behavior and comfort invisibly.',
    detail:
      'Signature and Elite packages include a dedicated photo session with 50+ professionally edited images delivered within 5 business days.',
    icon: '📸',
    imageVariant: 'collie' as const,
    imageSide: 'right' as const,
  },
  {
    number: '06',
    title: 'Safe Return & Aftercare',
    description:
      'After the event, your handler returns your dog home or to a trusted sitter. The outfit is professionally cleaned and packaged as a keepsake — yours to keep forever.',
    detail:
      'Elite clients receive complimentary overnight spa boarding, returning their dog home the next morning calm, clean, and happy.',
    icon: '🏠',
    imageVariant: 'corgi' as const,
    imageSide: 'left' as const,
  },
];

const FAQS = [
  {
    q: 'What if my dog has never worn clothes before?',
    a: 'That\'s very common! Our pre-event grooming session includes a 30-minute outfit acclimation. Over 95% of dogs adapt fully within the session. For anxious dogs, we offer an additional prep visit at no extra charge.',
  },
  {
    q: 'Are you insured for dog behavior incidents?',
    a: 'Yes. All Signature and Elite packages include a $1M liability certificate covering your event. Our handlers are trained in canine behavior management. We also conduct a temperament assessment before every booking.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend at least 8 weeks before your event date. Peak wedding season (May–October) can book up 16+ weeks in advance. Reach out early — we can hold your date with a deposit.',
  },
  {
    q: 'Do you travel to different cities?',
    a: 'We currently serve the greater New York, Los Angeles, Chicago, San Francisco, and Miami metro areas. We\'re actively expanding. If your location isn\'t listed, join the waitlist and we\'ll prioritize your city.',
  },
  {
    q: 'Can you handle multiple dogs at one event?',
    a: 'Absolutely. Multi-dog events require one handler per dog. We\'ve managed events with up to four dogs simultaneously. A coordination surcharge applies for 3+ dogs.',
  },
  {
    q: 'What breeds do you work with?',
    a: 'All breeds and sizes — from Chihuahuas to Great Danes. Each garment is custom-made, so there\'s no "standard" size. We\'ve even dressed mixed breeds, doodles, and senior dogs.',
  },
];

export default function HowItWorksPage() {
  const navigate = useNavigate();
  return (
    <PageLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroPill}>The Full Experience</div>
          <h1 className={styles.heroTitle}>How Bark & Bow Works</h1>
          <p className={styles.heroSub}>
            From first inquiry to final bow — here\'s exactly how we make your dog\'s wedding debut seamless, stress-free, and utterly unforgettable.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className={styles.stepsSection}>
        <div className="container">
          {STEPS.map((step) => (
            <div key={step.number} className={`${styles.step} ${step.imageSide === 'left' ? styles.stepReverse : ''}`}>
              <div className={styles.stepContent}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h2 className={styles.stepTitle}>{step.title}</h2>
                <p className={styles.stepDesc}>{step.description}</p>
                <p className={styles.stepDetail}>{step.detail}</p>
              </div>
              <div className={styles.stepImage}>
                <DogImage variant={step.imageVariant} size="lg" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline bar */}
      <section className={styles.timelineSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Your Timeline at a Glance</h2>
          <div className={styles.timeline}>
            {[
              { label: '8+ Weeks Before', text: 'Book & Consultation' },
              { label: '6 Weeks Before', text: 'Design & Fitting' },
              { label: '2 Weeks Before', text: 'Final Alterations' },
              { label: 'Day Before', text: 'Grooming & Prep' },
              { label: 'Event Day', text: 'Handler & Ceremony' },
              { label: 'After Event', text: 'Safe Return & Keepsake' },
            ].map((item, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineLabel}>{item.label}</div>
                <div className={styles.timelineText}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className="container-narrow">
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            {FAQS.map((faq, i) => (
              <div key={i} className={styles.faqCard}>
                <h3 className={styles.faqQ}>{faq.q}</h3>
                <p className={styles.faqA}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to get started?</h2>
            <p className={styles.ctaSub}>Spots fill fast — especially for peak wedding season. Secure your date today.</p>
            <button className={styles.ctaBtn} onClick={() => navigate('/onboarding')}>Book Your Dog's Experience →</button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
