import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { useApp } from '@/lib/AppContext';
import styles from './SubPage.module.css';

const team = [
  {
    name: 'Camille Hartley',
    role: 'Co-Founder & CEO',
    emoji: '👩‍💼',
    bio: 'Former event planner with 12 years at luxury wedding firms. Camille launched Bark & Bow after spending her 10th wedding weekend managing someone else\'s dog alone. She knew there had to be a better way.',
    fact: 'Has 2 rescue greyhounds named Armani and Versace.',
  },
  {
    name: 'Theo Nakamura',
    role: 'Co-Founder & Head of Design',
    emoji: '👨‍🎨',
    bio: 'Trained couture designer turned pet-fashion pioneer. Theo spent 8 years in Paris ateliers before realizing his true calling was designing tuxedos for golden retrievers. He leads our garment design and atelier partnerships.',
    fact: 'His French Bulldog Pépé once wore a custom garment on the cover of a pet lifestyle magazine.',
  },
  {
    name: 'Dr. Nia Osei',
    role: 'Head of Handler Operations',
    emoji: '👩‍⚕️',
    bio: 'Veterinary behaviorist with a PhD in canine stress response. Dr. Osei designed our handler certification program and oversees all handler training. She ensures every dog in our care is treated with expert, compassionate hands.',
    fact: 'Has assessed the temperament of over 2,000 dogs for event readiness.',
  },
  {
    name: 'Jordan Reyes',
    role: 'Head of Growth',
    emoji: '📈',
    bio: 'Previously led growth at Rover and Wag!. Jordan brought the playbook from the pet care industry\'s biggest players and is applying it to the luxury event market. He obsesses over customer delight metrics.',
    fact: 'Once organized a dog wedding for 45 dogs as a "market research experiment."',
  },
];

const values = [
  { icon: '🐾', title: 'Dog First, Always', desc: 'Every decision starts with one question: Is this good for the dog? Your dog\'s comfort and safety are non-negotiable.' },
  { icon: '💎', title: 'Uncompromising Quality', desc: 'From our ateliers to our handlers to our photographers — we partner only with the best. Mediocrity doesn\'t attend our events.' },
  { icon: '🤝', title: 'Radical Transparency', desc: 'You\'ll know exactly who\'s handling your dog, what they\'re doing, and how the day is going. No surprises. Ever.' },
  { icon: '🌱', title: 'Responsible Scaling', desc: 'We expand to new cities only when we can guarantee the same quality of service. We\'d rather do 100 perfect events than 1,000 mediocre ones.' },
];

const milestones = [
  { year: '2022', event: 'Founded in Brooklyn, NY. First event: a backyard wedding with 1 golden retriever named Broccoli.' },
  { year: '2023', event: 'Expanded to 5 cities. Hired our first 3 full-time handlers. Featured in The Knot.' },
  { year: '2024', event: '500+ events completed. Launched The Royal Pack package. Closed seed funding round.' },
  { year: '2025', event: 'Expanding to 20+ cities. Launching handler certification program. Building the industry standard.' },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const { track } = useApp();
  const handleCTA = () => { track('landing_page_cta_click'); navigate('/onboarding'); };

  return (
    <div>
      <Navbar onCTA={handleCTA} />
      <main>
        <section className={styles.pageHero}>
          <div className="container-narrow">
            <span className={styles.eyebrow}>Our Story</span>
            <h1 className={styles.pageTitle}>Built by People Who Love Dogs & Weddings</h1>
            <p className={styles.pageSub}>Bark & Bow was born from a simple, infuriating truth: the wedding industry had no solution for dog owners who actually wanted their pets involved. So we built one.</p>
          </div>
        </section>

        {/* Origin Story */}
        <section className={styles.section}>
          <div className="container-narrow">
            <div className={styles.storyBlock}>
              <div className={styles.storyEmoji}>🐕‍🦺</div>
              <div>
                <h2 className={styles.storyTitle}>The Problem We Couldn't Ignore</h2>
                <p className={styles.storyText}>In 2022, Camille was coordinating her 10th luxury wedding when the bride pulled her aside in tears. Her dog — who was supposed to walk her down the aisle — had just knocked over a floral arrangement, gotten into the catering tent, and was currently hiding under a table. The "handler" was a family friend who had no idea what they were doing.</p>
                <p className={styles.storyText} style={{ marginTop: '16px' }}>Camille spent the next 3 hours managing the dog herself. That night, she called Theo. "There is an entire industry here that doesn't exist yet," she said. "And we're building it."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What We Stand For</h2>
            <div className={styles.valuesGrid}>
              {values.map(v => (
                <div key={v.title} className={styles.valueCard}>
                  <span className={styles.valueIcon}>{v.icon}</span>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Meet the Team</h2>
            <div className={styles.teamGrid}>
              {team.map(member => (
                <div key={member.name} className={styles.teamCard}>
                  <div className={styles.teamAvatar}>{member.emoji}</div>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                  <div className={styles.teamFact}>
                    <span>🐾</span> {member.fact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container-narrow">
            <h2 className={styles.sectionTitle}>Our Journey</h2>
            <div className={styles.timeline}>
              {milestones.map(m => (
                <div key={m.year} className={styles.timelineItem}>
                  <div className={styles.timelineYear}>{m.year}</div>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineText}>{m.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <h2 className={styles.ctaTitle}>Be Part of the Story</h2>
            <p className={styles.ctaSub}>Join hundreds of couples who trusted us with their most important guest.</p>
            <button className={styles.ctaBtn} onClick={handleCTA}>Book Your Dog's Experience</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
