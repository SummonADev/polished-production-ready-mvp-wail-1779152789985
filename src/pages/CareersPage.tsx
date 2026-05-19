import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { useApp } from '@/lib/AppContext';
import styles from './SubPage.module.css';

const openRoles = [
  {
    title: 'Senior Pet Handler',
    type: 'Full-Time',
    location: 'New York, NY',
    dept: 'Operations',
    desc: 'Lead handler for high-profile events. You\'ll manage dogs during ceremonies, coordinate with event planners, and set the standard for our handler team.',
    reqs: ['3+ years professional dog handling experience', 'Canine first-aid certified', 'Comfortable in formal event settings', 'Valid driver\'s license'],
  },
  {
    title: 'Garment Designer (Canine)',
    type: 'Full-Time',
    location: 'Brooklyn, NY',
    dept: 'Design',
    desc: 'Design and produce custom formalwear for dogs. You\'ll work with clients to create bespoke pieces that match wedding aesthetics while prioritizing pet comfort.',
    reqs: ['Formal design/tailoring training', 'Portfolio of garment work (pet or human)', 'Experience with measurements and fittings', 'Strong communication skills'],
  },
  {
    title: 'Event Coordinator',
    type: 'Full-Time',
    location: 'Remote (US)',
    dept: 'Client Services',
    desc: 'Own the client relationship from booking to event day. You\'ll be the primary point of contact for couples, coordinating between our design, grooming, and handling teams.',
    reqs: ['2+ years event coordination experience', 'Excellent written and verbal communication', 'Experience with CRM tools', 'Dog owner preferred (not required)'],
  },
  {
    title: 'City Launch Manager',
    type: 'Contract',
    location: 'Multiple Cities',
    dept: 'Growth',
    desc: 'Help us launch Bark & Bow in new markets. You\'ll recruit and onboard local handlers, build venue relationships, and own market performance for your city.',
    reqs: ['Experience in operations or business development', 'Strong local network in the wedding industry', 'Self-starter with high ownership mindset', 'Experience managing contractors'],
  },
  {
    title: 'Dog Groomer (Mobile)',
    type: 'Part-Time / Freelance',
    location: 'Various Cities',
    dept: 'Operations',
    desc: 'Provide pre-event grooming for our clients\' dogs. You\'ll travel to homes and venues on event mornings, ensuring every dog looks and feels their best.',
    reqs: ['Licensed grooming certification', 'Mobile grooming experience', 'Reliable transportation', 'Experience with anxious or reactive dogs'],
  },
];

const perks = [
  { icon: '🐾', text: 'Dogs welcome in all offices' },
  { icon: '💰', text: 'Competitive salary + equity' },
  { icon: '🏥', text: 'Full health, dental & vision' },
  { icon: '🌴', text: 'Unlimited PTO' },
  { icon: '📚', text: '$1,500 learning budget' },
  { icon: '🎉', text: 'Monthly team events (usually dog-related)' },
];

export default function CareersPage() {
  const navigate = useNavigate();
  const { track } = useApp();
  const handleCTA = () => { track('landing_page_cta_click'); navigate('/onboarding'); };
  const [appliedRole, setAppliedRole] = useState<string | null>(null);
  const [applyRole, setApplyRole] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', note: '' });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedRole(applyRole);
    setApplyRole(null);
    setForm({ name: '', email: '', note: '' });
  };

  return (
    <div>
      <Navbar onCTA={handleCTA} />
      <main>
        <section className={styles.pageHero}>
          <div className="container-narrow">
            <span className={styles.eyebrow}>Join the Pack</span>
            <h1 className={styles.pageTitle}>Work Where the Dogs Are</h1>
            <p className={styles.pageSub}>We're building the infrastructure for pets at life's most important moments. If that sounds like a mission you want to be part of, we'd love to hear from you.</p>
          </div>
        </section>

        {/* Perks */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why Bark & Bow</h2>
            <div className={styles.perksGrid}>
              {perks.map(p => (
                <div key={p.text} className={styles.perkCard}>
                  <span className={styles.perkIcon}>{p.icon}</span>
                  <span className={styles.perkText}>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Open Roles</h2>
            <div className={styles.rolesList}>
              {openRoles.map(role => (
                <div key={role.title} className={styles.roleCard}>
                  <div className={styles.roleHeader}>
                    <div>
                      <h3 className={styles.roleTitle}>{role.title}</h3>
                      <div className={styles.roleMeta}>
                        <span className={styles.roleTag}>{role.dept}</span>
                        <span className={styles.roleDot}>·</span>
                        <span>{role.type}</span>
                        <span className={styles.roleDot}>·</span>
                        <span>{role.location}</span>
                      </div>
                    </div>
                    <button
                      className={styles.applyBtn}
                      onClick={() => { if (appliedRole !== role.title) setApplyRole(role.title); }}
                      disabled={appliedRole === role.title}
                    >
                      {appliedRole === role.title ? '✓ Applied' : 'Apply Now'}
                    </button>
                  </div>
                  <p className={styles.roleDesc}>{role.desc}</p>
                  <ul className={styles.roleReqs}>
                    {role.reqs.map(r => <li key={r} className={styles.roleReq}>✓ {r}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Apply Modal */}
        {applyRole && (
          <div className={styles.modalOverlay} onClick={() => setApplyRole(null)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={() => setApplyRole(null)}>✕</button>
              <h3 className={styles.modalTitle}>Apply for: {applyRole}</h3>
              <form className={styles.applyForm} onSubmit={handleApply}>
                <input className={styles.applyInput} placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required />
                <input className={styles.applyInput} type="email" placeholder="Email Address" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required />
                <textarea className={styles.applyTextarea} placeholder="Why do you want to join Bark & Bow? (optional)" value={form.note} onChange={e => setForm(f => ({...f, note: e.target.value}))} rows={4} />
                <button type="submit" className={styles.applySubmit}>Submit Application</button>
              </form>
            </div>
          </div>
        )}

        <section className={styles.ctaSection}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <h2 className={styles.ctaTitle}>Don't see a fit?</h2>
            <p className={styles.ctaSub}>We're always looking for extraordinary people. Send us a note at <strong>hello@barkandbow.com</strong></p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
