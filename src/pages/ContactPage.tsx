import { useState } from 'react';
import PageLayout from '@/components/shared/PageLayout';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--color-border)',
    fontSize: '0.95rem',
    color: 'var(--color-text-primary)',
    background: 'var(--color-surface)',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <PageLayout>
      <main style={{ minHeight: '60vh', padding: '4rem 0' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: '600px', lineHeight: 1.7, marginBottom: '3rem' }}>
            Have a question about your upcoming wedding? We'd love to help. Fill out the form below and we'll get back to you within one business day.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              {submitted ? (
                <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 'var(--radius-xl)', padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✅</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Message Sent!</div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>We'll be in touch within one business day.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>Your Name</label>
                    <input style={fieldStyle} type="text" name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>Email Address</label>
                    <input style={fieldStyle} type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>Subject</label>
                    <select style={fieldStyle} name="subject" value={form.subject} onChange={handleChange} required>
                      <option value="">Select a topic…</option>
                      <option value="booking">Booking &amp; Availability</option>
                      <option value="packages">Packages &amp; Pricing</option>
                      <option value="custom">Custom Requests</option>
                      <option value="press">Press &amp; Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>Message</label>
                    <textarea style={{ ...fieldStyle, minHeight: '140px', resize: 'vertical' }} name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your wedding date, your dog's breed and size, and anything else we should know…" required />
                  </div>
                  <button type="submit" style={{ background: 'var(--color-primary)', color: 'white', padding: '0.875rem', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', border: 'none', transition: 'background 0.2s' }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: '📍', label: 'Our Studio', value: '42 Paw Lane, Suite 10\nSan Francisco, CA 94103' },
                { icon: '📞', label: 'Phone', value: '(415) 555-0198' },
                { icon: '✉️', label: 'Email', value: 'hello@barkandbow.com' },
                { icon: '🕐', label: 'Hours', value: 'Mon – Fri: 9 AM – 6 PM PT\nSat: 10 AM – 4 PM PT' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
