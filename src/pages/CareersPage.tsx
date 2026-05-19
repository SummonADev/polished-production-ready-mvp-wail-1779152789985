import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/shared/PageLayout';
import styles from './CareersPage.module.css';

const OPEN_ROLES = [
  {
    id: 'handler-nyc',
    title: 'Certified Pet Handler',
    department: 'Operations',
    location: 'New York, NY',
    type: 'Part-time / Contract',
    description: 'Join our handler network to manage dogs at high-end wedding events. Ideal for certified trainers or vet techs with event experience.',
    requirements: [
      'Canine first aid certification',
      '2+ years working with dogs professionally',
      'Weekend availability during wedding season',
      'Professional presentation and communication skills',
    ],
  },
  {
    id: 'handler-la',
    title: 'Certified Pet Handler',
    department: 'Operations',
    location: 'Los Angeles, CA',
    type: 'Part-time / Contract',
    description: 'Same role as above, based in LA. We\'re growing our Southern California team rapidly for the 2025 season.',
    requirements: [
      'Canine first aid certification',
      '2+ years working with dogs professionally',
      'Weekend availability during wedding season',
      'Reliable transportation',
    ],
  },
  {
    id: 'designer',
    title: 'Pet Garment Designer',
    department: 'Design',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Design custom tuxedos, gowns, and formalwear for dogs across all breeds and sizes. Collaborate with our tailoring team to bring each vision to life.',
    requirements: [
      'Portfolio of fashion or costume design work',
      'Experience with pattern making and custom tailoring',
      'Strong client communication skills',
      'Passion for both fashion and animals',
    ],
  },
  {
    id: 'growth',
    title: 'Wedding Planner Partnerships Manager',
    department: 'Growth',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Build and manage our network of wedding planner partners. This is a high-impact sales and relationship role in a fast-growing market.',
    requirements: [
      '3+ years in B2B sales or partnerships',
      'Network in the wedding industry preferred',
      'Track record of hitting revenue targets',
      'Self-starter with excellent follow-through',
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Build the platform that powers Bark & Bow\'s booking, matching, and operations. Work on a small, fast-moving team with high ownership.',
    requirements: [
      'React / TypeScript / Node.js experience',
      '3+ years professional software development',
      'Experience with marketplace or booking platforms preferred',
      'Comfortable in an early-stage startup environment',
    ],
  },
];

const PERKS = [
  { icon: '🐾', title: 'Dog-Friendly Everything', desc: 'Bring your dog to off-sites, Zooms, and yes — events.' },
  { icon: '💰', title: 'Competitive Pay', desc: 'Market-rate salaries + equity for full-time roles.' },
  { icon: '🌴', title: 'Flexible Work', desc: 'Remote-first. Most roles are fully location-flexible.' },
  { icon: '📸', title: 'Free Event Attendance', desc: 'Team members can attend events and bring their dogs.' },
  { icon: '🏥', title: 'Full Benefits', desc: 'Medical, dental, vision, and pet insurance for US employees.' },
  { icon: '🚀', title: 'High-Impact Work', desc: 'Early team. Your work directly shapes a fast-growing company.' },
];

type ApplicationData = {
  name: string;
  email: string;
  role: string;
  message: string;
};

export default function CareersPage() {
  const navigate = useNavigate();
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [applying, setApplying] = useState<string | null>(null);
  const [form, setForm] = useState<ApplicationData>({ name: '', email: '', role: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (roleId: string, roleTitle: string) => {
    setApplying(roleId);
    setForm((f) => ({ ...f, role: roleTitle }));
    setTimeout(() => {
      document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroPill}>We're Hiring</div>
          <h1 className={styles.heroTitle}>Build the future of pet-inclusive events.</h1>
          <p className={styles.heroSub}>
            Bark & Bow is a small, fast-moving team with huge ambitions. We\'re hiring dog lovers who care about exceptional service, premium craftsmanship, and building something genuinely new.
          </p>
          <div className={styles.heroMeta}>
            <span className={styles.heroMetaItem}>🏙️ NYC · LA · Chicago · SF · Miami</span>
            <span className={styles.heroMetaItem}>🌐 Remote-friendly</span>
            <span className={styles.heroMetaItem}>📈 Series A — Fast growing</span>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className={styles.perksSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Why Bark & Bow?</h2>
          <div className={styles.perksGrid}>
            {PERKS.map((p) => (
              <div key={p.title} className={styles.perkCard}>
                <div className={styles.perkIcon}>{p.icon}</div>
                <h3 className={styles.perkTitle}>{p.title}</h3>
                <p className={styles.perkDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className={styles.rolesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Open Roles</h2>
          <div className={styles.rolesList}>
            {OPEN_ROLES.map((role) => (
              <div key={role.id} className={`${styles.roleCard} ${expandedRole === role.id ? styles.expanded : ''}`}>
                <button className={styles.roleHeader} onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}>
                  <div className={styles.roleLeft}>
                    <div className={styles.roleDept}>{role.department}</div>
                    <div className={styles.roleTitle}>{role.title}</div>
                    <div className={styles.roleMeta}>
                      <span>📍 {role.location}</span>
                      <span>⏱ {role.type}</span>
                    </div>
                  </div>
                  <div className={styles.roleChevron}>{expandedRole === role.id ? '▲' : '▼'}</div>
                </button>
                {expandedRole === role.id && (
                  <div className={styles.roleBody}>
                    <p className={styles.roleDesc}>{role.description}</p>
                    <div className={styles.reqLabel}>Requirements</div>
                    <ul className={styles.reqList}>
                      {role.requirements.map((r) => (
                        <li key={r} className={styles.reqItem}>✓ {r}</li>
                      ))}
                    </ul>
                    <button className={styles.applyBtn} onClick={() => handleApply(role.id, role.title)}>
                      Apply for This Role
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className={styles.applySection} id="apply-form">
        <div className="container-narrow">
          <h2 className={styles.sectionTitle}>Apply Now</h2>
          <p className={styles.sectionSub}>Not seeing the perfect role? Drop us a note anyway — we hire for attitude and passion.</p>
          {submitted ? (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>🎉</div>
              <h3 className={styles.successTitle}>Application received!</h3>
              <p className={styles.successDesc}>Thank you for your interest in Bark & Bow. Our team reviews applications weekly. We\'ll be in touch within 5 business days.</p>
              <button className={styles.successBtn} onClick={() => { setSubmitted(false); setApplying(null); }}>Submit Another</button>
            </div>
          ) : (
            <form className={styles.applyForm} onSubmit={handleSubmit}>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="apply-name">Full Name *</label>
                  <input id="apply-name" className={styles.input} type="text" required placeholder="Your name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="apply-email">Email *</label>
                  <input id="apply-email" className={styles.input} type="email" required placeholder="you@email.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="apply-role">Role of Interest *</label>
                <select id="apply-role" className={styles.input} required value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
                  <option value="">Select a role</option>
                  {OPEN_ROLES.map((r) => <option key={r.id} value={r.title}>{r.title} — {r.location}</option>)}
                  <option value="General Application">General Application</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="apply-msg">Why Bark & Bow? *</label>
                <textarea id="apply-msg" className={styles.textarea} required rows={5} placeholder="Tell us about yourself and why you want to join our team..." value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
              </div>
              <button className={styles.submitBtn} type="submit">Submit Application →</button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Questions about working here?</h2>
            <p className={styles.ctaSub}>Email our team at <strong>careers@barkandbow.com</strong> or check out our company story.</p>
            <button className={styles.ctaBtn} onClick={() => navigate('/about')}>Read Our Story →</button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
