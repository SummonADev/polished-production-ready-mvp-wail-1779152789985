import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { useApp } from '@/lib/AppContext';
import styles from './SubPage.module.css';

const steps = [
  {
    num: '01', emoji: '📋', title: 'Book a Consultation',
    detail: 'Start with a free 20-minute call. We learn about your dog, your event, your vision — and match you with the right package and handler before you spend a dollar.',
    benefit: 'Zero commitment. 100% clarity.'
  },
  {
    num: '02', emoji: '📏', title: 'Custom Measurements',
    detail: 'Our mobile fitting team visits your home. We take 12 precise measurements and discuss fabric swatches, color palettes, and accessory options to match your wedding theme.',
    benefit: 'Fits like it was born for your dog.'
  },
  {
    num: '03', emoji: '🧵', title: 'Design & Production',
    detail: 'Your dog\'s garment is hand-crafted by our partner atelier. Every piece uses pet-safe, breathable fabrics. Production takes 3–4 weeks. A fitting preview is sent via video.',
    benefit: 'Bespoke quality. Pet-safe materials.'
  },
  {
    num: '04', emoji: '🛁', title: 'Pre-Event Grooming',
    detail: 'The morning of your event, a certified groomer arrives at your home or venue. Bath, blow-dry, nail trim, ear clean — and the outfit goes on with care.',
    benefit: 'Your dog arrives camera-ready.'
  },
  {
    num: '05', emoji: '👤', title: 'Handler On-Site',
    detail: 'A certified pet handler is present for the entire event window. They manage your dog during the ceremony, keep them calm during loud moments, handle all logistics.',
    benefit: 'You focus on your vows. We handle the dog.'
  },
  {
    num: '06', emoji: '📸', title: 'Photo Session',
    detail: 'Before the ceremony begins, a 30–60 minute session with your dressed dog and our photographer. You receive a curated gallery within 48 hours.',
    benefit: 'Memories that last a lifetime.'
  },
  {
    num: '07', emoji: '🏠', title: 'Safe Return Home',
    detail: 'After the event, your handler transports your dog safely home. We provide a post-event report: behavior notes, eating/drinking log, and any follow-up care tips.',
    benefit: 'Peace of mind from start to finish.'
  },
];

const faqs = [
  { q: 'How far in advance should I book?', a: 'We recommend booking at least 8 weeks before your event to allow time for the custom garment production. For peak season (May–October), 12 weeks is ideal.' },
  { q: 'What if my dog is anxious at events?', a: 'All our handlers are certified in canine behavior and stress management. We also offer a pre-event "dry run" visit so your dog can meet the handler in advance.' },
  { q: 'What breeds and sizes do you accommodate?', a: 'All breeds and sizes — from Chihuahuas to Great Danes. Our garments are custom-made, so there are no size limitations.' },
  { q: 'Is my dog covered if something goes wrong?', a: 'All Bark & Bow events are covered by our $2M liability policy. Handlers carry pet first-aid certification and emergency protocols.' },
  { q: 'Can I meet my handler before the event?', a: 'Absolutely. We encourage a meet-and-greet session at least one week before the event. This helps your dog build familiarity and reduces anxiety on the day.' },
];

export default function HowItWorksPage() {
  const navigate = useNavigate();
  const { track } = useApp();
  const handleCTA = () => { track('landing_page_cta_click'); navigate('/onboarding'); };

  return (
    <div>
      <Navbar onCTA={handleCTA} />
      <main>
        {/* Hero */}
        <section className={styles.pageHero}>
          <div className="container-narrow">
            <span className={styles.eyebrow}>The Process</span>
            <h1 className={styles.pageTitle}>How Bark & Bow Works</h1>
            <p className={styles.pageSub}>From the first consultation to your dog's safe return home — every step is designed to be seamless, stress-free, and absolutely unforgettable.</p>
          </div>
        </section>

        {/* Steps */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.stepsList}>
              {steps.map((step, i) => (
                <div key={step.num} className={`${styles.stepRow} ${i % 2 === 1 ? styles.stepRowReverse : ''}`}>
                  <div className={styles.stepVisual}>
                    <div className={styles.stepBubble}>
                      <span className={styles.stepEmoji}>{step.emoji}</span>
                      <span className={styles.stepNumBig}>{step.num}</span>
                    </div>
                  </div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDetail}>{step.detail}</p>
                    <div className={styles.stepBenefit}>✓ {step.benefit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container-narrow">
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqList}>
              {faqs.map(faq => (
                <div key={faq.q} className={styles.faqItem}>
                  <h4 className={styles.faqQ}>{faq.q}</h4>
                  <p className={styles.faqA}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <h2 className={styles.ctaTitle}>Ready to get started?</h2>
            <p className={styles.ctaSub}>Book a free consultation and secure your dog's spot for the wedding season.</p>
            <button className={styles.ctaBtn} onClick={handleCTA}>Book a Free Consultation</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
