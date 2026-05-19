import styles from './HowItWorks.module.css';

const STEPS = [
  {
    number: '1',
    icon: '📋',
    title: 'Tell Us About Your Dog',
    desc: "Answer a quick questionnaire about your dog's size, temperament, and the event vision.",
  },
  {
    number: '2',
    icon: '👔',
    title: 'Custom Garment Made',
    desc: "Our tailors craft a bespoke tuxedo or gown fitted to your dog's exact measurements.",
  },
  {
    number: '3',
    icon: '🛁',
    title: 'Spa Day & Fitting',
    desc: 'Your dog gets groomed, styled, and dressed in a pre-event session 24 hours before.',
  },
  {
    number: '4',
    icon: '🎩',
    title: 'Handler Manages the Day',
    desc: 'A professional pet handler attends the event, manages the dog, and coordinates photos.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className="container">
        <div className={styles.sectionLabel}>The Process</div>
        <h2 className={styles.sectionTitle}>From stressed to seamless in 4 steps</h2>
        <p className={styles.sectionSub}>
          We&apos;ve managed over 500 dog wedding appearances without a single ceremony disruption.
        </p>
        <div className={styles.steps}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepTitle}>{step.title}</div>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
