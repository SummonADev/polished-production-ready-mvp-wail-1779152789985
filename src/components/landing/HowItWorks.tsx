import styles from './HowItWorks.module.css';

const steps = [
  {
    num: '01',
    emoji: '📋',
    title: 'Tell Us About Your Dog',
    desc: 'Fill out a quick profile — breed, size, temperament, and event details. We match you with the right handler and designer.',
  },
  {
    num: '02',
    emoji: '🧵',
    title: 'Get a Custom Tuxedo',
    desc: 'Our designers create a bespoke formalwear piece fitted to your dog\'s exact measurements. Ready 4 weeks before the event.',
  },
  {
    num: '03',
    emoji: '✂️',
    title: 'Pre-Event Grooming',
    desc: 'A certified groomer visits your home the morning of the event to prep your dog — bath, blow-dry, and outfit fitting.',
  },
  {
    num: '04',
    emoji: '👤',
    title: 'Pro Handler On-Site',
    desc: 'A dedicated handler manages your dog throughout the ceremony and reception — walks, calms nerves, and handles logistics.',
  },
  {
    num: '05',
    emoji: '📸',
    title: 'Professional Photo Session',
    desc: 'A 30-minute photo session with your dressed dog before the ceremony. Galleries delivered within 48 hours.',
  },
  {
    num: '06',
    emoji: '🏠',
    title: 'Safe Return Home',
    desc: 'After the event, your handler ensures your dog is safely returned home, settled, and comfortable.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>The Process</span>
          <h2 className={styles.title}>From Booking to Best Dog</h2>
          <p className={styles.sub}>Six seamless steps. Zero stress. One unforgettable moment.</p>
        </div>
        <div className={styles.grid}>
          {steps.map(step => (
            <div key={step.num} className={styles.step}>
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepEmoji}>{step.emoji}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
