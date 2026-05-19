import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/shared/PageLayout';
import DogImage from '@/components/shared/DogImage';
import styles from './AboutPage.module.css';

const TEAM = [
  {
    name: 'Alexandra Wren',
    title: 'Co-Founder & CEO',
    bio: 'Former VP at The Knot. Alexandra spotted the gap: couples wanted dogs at weddings but had no turnkey solution. She founded Bark & Bow to change that.',
    emoji: '👩‍💼',
    funFact: 'Her own Labrador, Butter, attended her wedding and inspired the whole idea.',
  },
  {
    name: 'Marcus Reid',
    title: 'Co-Founder & Head of Operations',
    bio: 'Certified Animal Behavior Consultant and former trainer for film & TV productions. Marcus built our handler certification program from the ground up.',
    emoji: '👨‍🔬',
    funFact: 'Has personally handled dogs at over 200 events without a single incident.',
  },
  {
    name: 'Priya Desai',
    title: 'Head of Design & Tailoring',
    bio: 'Formerly at Brioni and Vera Wang. Priya brings haute couture craftsmanship to pet formalwear — every stitch is intentional.',
    emoji: '✂️',
    funFact: 'She owns six cats, which she insists makes her the best dog tuxedo designer alive.',
  },
  {
    name: 'Jordan Tate',
    title: 'Head of Growth',
    bio: 'Growth lead from Rover.com and Wag!. Jordan understands the pet concierge market deeply and is building our planner partnership network.',
    emoji: '📈',
    funFact: 'Adopted three dogs in one year and shows zero signs of stopping.',
  },
];

const VALUES = [
  {
    icon: '🐾',
    title: 'Dog-First, Always',
    desc: 'Every decision starts with one question: is this good for the dog? Their comfort, safety, and wellbeing come before aesthetics or logistics.',
  },
  {
    icon: '✨',
    title: 'White-Glove Standard',
    desc: 'We operate in the luxury wedding market. Every touchpoint — from the first email to the final photograph — should feel effortless and exceptional.',
  },
  {
    icon: '🤝',
    title: 'Partner, Not Vendor',
    desc: 'We join your wedding team. We coordinate with your planner, photographer, and venue — so everyone is aligned and nothing falls through the cracks.',
  },
  {
    icon: '🛡️',
    title: 'Radical Accountability',
    desc: 'We provide liability coverage because we stand behind our work 100%. If something goes wrong, we own it — and fix it.',
  },
];

const MILESTONES = [
  { year: '2021', event: 'Alexandra\'s Labrador walks at her own wedding. The idea is born.' },
  { year: '2022', event: 'First 10 bookings taken as a side project. All 5-star reviews.' },
  { year: '2023', event: 'Bark & Bow incorporated. Marcus joins. Handler certification program launched.' },
  { year: 'Early 2024', event: 'Priya joins. First custom garment line designed. 100 bookings milestone.' },
  { year: 'Mid 2024', event: 'Featured in Vogue Weddings and The Knot. Waitlist opens.' },
  { year: 'Late 2024', event: '500 bookings. Expansion to 5 cities. Series A fundraising begins.' },
];

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <PageLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroPill}>Our Story</div>
          <h1 className={styles.heroTitle}>We started with a dog at a wedding.</h1>
          <p className={styles.heroSub}>
            Bark & Bow was born from a single moment: Alexandra\'s Labrador, Butter, was supposed to walk the aisle at her 2021 wedding. The logistics were a nightmare. There was no service that handled everything. So she built one.
          </p>
        </div>
      </section>

      {/* Mission + image */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionContent}>
              <div className={styles.missionLabel}>Our Mission</div>
              <h2 className={styles.missionTitle}>Make dog participation in life\'s biggest moments completely effortless.</h2>
              <p className={styles.missionDesc}>
                We believe dogs are family. And family belongs at the wedding. But for too long, including your dog meant inheriting a massive logistical burden — managing their behavior, their appearance, their transportation, and their wellbeing, all while trying to enjoy the most important day of your life.
              </p>
              <p className={styles.missionDesc}>
                Bark & Bow eliminates that burden entirely. We are the only service that combines custom formalwear, professional event-day handling, pre-event grooming, photography, and transportation into a single, seamless experience.
              </p>
            </div>
            <div className={styles.missionImage}>
              <DogImage variant="labrador" size="lg" caption="Butter — the dog who started it all." />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>What We Stand For</h2>
          <div className={styles.valuesGrid}>
            {VALUES.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.teamSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>The Team</h2>
          <p className={styles.sectionSub}>Dog lovers, wedding veterans, and luxury service obsessives — united by one mission.</p>
          <div className={styles.teamGrid}>
            {TEAM.map((member) => (
              <div key={member.name} className={styles.teamCard}>
                <div className={styles.teamEmoji}>{member.emoji}</div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <div className={styles.teamTitle}>{member.title}</div>
                <p className={styles.teamBio}>{member.bio}</p>
                <div className={styles.teamFunFact}>
                  <span className={styles.funFactLabel}>🐾 Fun fact:</span> {member.funFact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timelineSection}>
        <div className="container-narrow">
          <h2 className={styles.sectionTitle} style={{ color: 'white' }}>Our Journey</h2>
          <div className={styles.timeline}>
            {MILESTONES.map((m, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <div className={styles.timelineYear}>{m.year}</div>
                </div>
                <div className={styles.timelineLine}>
                  <div className={styles.timelineDot} />
                  {i < MILESTONES.length - 1 && <div className={styles.timelineConnector} />}
                </div>
                <div className={styles.timelineRight}>
                  <p className={styles.timelineEvent}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dog gallery strip */}
      <section className={styles.stripSection}>
        <div className={styles.stripRow}>
          <DogImage variant="golden" size="md" />
          <DogImage variant="frenchie" size="md" />
          <DogImage variant="corgi" size="md" />
          <DogImage variant="poodle" size="md" />
          <DogImage variant="husky" size="md" />
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Join the Bark & Bow family.</h2>
            <p className={styles.ctaSub}>Whether you\'re planning a wedding or building a career, we\'d love to connect.</p>
            <div className={styles.ctaBtns}>
              <button className={styles.ctaBtnPrimary} onClick={() => navigate('/onboarding')}>Book Your Dog</button>
              <button className={styles.ctaBtnSecondary} onClick={() => navigate('/careers')}>View Careers</button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
