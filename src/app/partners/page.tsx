'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const partnerTiers = [
  {
    id: 'technology',
    name: 'Technology Partner',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    price: 'Custom',
    description: 'Deep technical integration with our platform to deliver joint solutions.',
    benefits: [
      'Early access to new APIs',
      'Joint go-to-market campaigns',
      'Dedicated engineer support',
      'Co-branded listings',
      'Priority feature requests',
      'Executive sponsorship'
    ],
    popular: false
  },
  {
    id: 'integration',
    name: 'Integration Partner',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    price: 'Custom',
    description: 'Seamlessly connect your product with AI4Bharat through certified integrations.',
    benefits: [
      'Official certification badge',
      'Full API access',
      'Marketplace featured listing',
      'Lead sharing',
      'Joint webinars',
      'Technical support'
    ],
    popular: true
  },
  {
    id: 'research',
    name: 'Research Partner',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4M12 8h.01"/>
      </svg>
    ),
    price: 'Custom',
    description: 'Collaborate on cutting-edge AI research and contribute to open-source models.',
    benefits: [
      'Research dataset access',
      'GPU compute credits',
      'Co-authorship opportunities',
      'Conference sponsorship',
      'Research team access',
      'Publication support'
    ],
    popular: false
  }
];

const partnerTypes = [
  { icon: '☁️', title: 'Cloud Providers', desc: 'AWS, GCP, Azure' },
  { icon: '🛠️', title: 'SaaS Platforms', desc: 'Developer tools' },
  { icon: '🎓', title: 'Academia', desc: 'Universities & labs' },
  { icon: '🏛️', title: 'Government', desc: 'NGOs & public sector' },
  { icon: '🌐', title: 'System Integrators', desc: 'Consulting firms' },
  { icon: '📊', title: 'Data Partners', desc: 'Dataset providers' }
];

const currentPartners = [
  { name: 'Microsoft', tier: 'Technology' },
  { name: 'Google', tier: 'Research' },
  { name: 'AWS', tier: 'Technology' },
  { name: 'IIT Bombay', tier: 'Research' },
  { name: 'NITI Aayog', tier: 'Government' },
  { name: 'Meta AI', tier: 'Research' }
];

const testimonials = [
  { quote: 'Partnering with AI4Bharat has been transformative for our customer offerings.', name: 'Sarah Chen', role: 'VP Product, TechCorp' },
  { quote: 'The research collaboration accelerated our NLP work significantly.', name: 'Dr. Rajesh Kumar', role: 'Professor, IIT Bombay' },
  { quote: 'Integration was seamless and support is exceptional.', name: 'Michael Torres', role: 'CTO, DataSync' }
];

const faqs = [
  { q: 'How long does the application process take?', a: 'Most applications are reviewed within 5 business days.' },
  { q: 'What are the revenue sharing arrangements?', a: 'Varies by tier, negotiated individually.' },
  { q: 'What support during integration?', a: 'Dedicated technical support and sandbox environment.' }
];

export default function PartnersPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', type: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const response = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', company: '', type: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      <Navbar />
      <main className="partners-page">
        {/* Hero Section */}
        <section className="partners-hero">
          <div className="hero-bg-effects"></div>
          <div className="container">
            <div className="hero-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Partnership Program
            </div>
            <h1 className="display-xl gradient-text">Build with AI4Bharat</h1>
            <p className="body-lg hero-subtitle">
              Join our ecosystem of technology leaders, research institutions, and system integrators building the future of Indian language AI.
            </p>
            <div className="hero-stats-row">
              <div className="hero-stat">
                <span className="stat-value">50+</span>
                <span className="stat-label">Active Partners</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">100M+</span>
                <span className="stat-label">Users Reached</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">12</span>
                <span className="stat-label">Countries</span>
              </div>
            </div>
            <div className="hero-actions">
              <a href="#partnership-tiers" className="btn btn-primary btn-lg">
                Become a Partner
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <Link href="/contact" className="btn btn-outline btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="partner-types-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Who We Work With</span>
              <h2 className="display-md gradient-text">Partner types</h2>
            </div>
            <div className="partner-types-grid">
              {partnerTypes.map((type, i) => (
                <div key={i} className="partner-type-card">
                  <span className="type-icon">{type.icon}</span>
                  <h3>{type.title}</h3>
                  <p>{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Tiers */}
        <section id="partnership-tiers" className="tiers-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Choose Your Path</span>
              <h2 className="display-md gradient-text">Partnership tiers</h2>
              <p>Select the level that aligns with your goals.</p>
            </div>
            <div className="tiers-grid">
              {partnerTiers.map((tier) => (
                <div 
                  key={tier.id} 
                  className={`tier-card ${tier.popular ? 'popular' : ''} ${selectedTier === tier.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {tier.popular && <span className="popular-badge">Most Popular</span>}
                  <div className="tier-icon">{tier.icon}</div>
                  <h3>{tier.name}</h3>
                  <p className="tier-desc">{tier.description}</p>
                  <ul className="tier-benefits">
                    {tier.benefits.map((b, i) => (
                      <li key={i}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button className={`btn ${tier.popular ? 'btn-primary' : 'btn-outline'}`}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Partners */}
        <section className="partners-showcase">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Trusted By</span>
              <h2 className="display-md gradient-text">Our partners</h2>
            </div>
            <div className="partners-logo-grid">
              {currentPartners.map((partner, i) => (
                <div key={i} className="partner-logo-card">
                  <div className="partner-avatar">{partner.name.substring(0, 2)}</div>
                  <span className="partner-name">{partner.name}</span>
                  <span className="partner-tier">{partner.tier} Partner</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Success Stories</span>
              <h2 className="display-md gradient-text">What partners say</h2>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-card">
                  <p className="quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <span className="author-name">{t.name}</span>
                      <span className="author-role">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Common Questions</span>
              <h2 className="display-md gradient-text">FAQ</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="apply-section">
          <div className="container">
            <div className="apply-card">
              <div className="apply-content">
                <h2>Ready to become a partner?</h2>
                <p>Tell us about your organization. Our partnerships team will reach out within 48 hours.</p>
                <div className="apply-benefits">
                  <div className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span>Response within 48 hours</span>
                  </div>
                  <div className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span>Dedicated partnership manager</span>
                  </div>
                  <div className="benefit-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span>Flexible partnership terms</span>
                  </div>
                </div>
              </div>
              <div className="apply-form-wrapper">
                {formStatus === 'success' ? (
                  <div className="form-success">
                    <div className="success-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    <h3>Application Received!</h3>
                    <p>We&apos;ll be in touch within 48 hours.</p>
                    <button onClick={() => setFormStatus('idle')} className="btn btn-outline">
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="apply-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Your name" required />
                      </div>
                      <div className="form-group">
                        <label>Work Email</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="you@company.com" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Company</label>
                        <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="Your company" required />
                      </div>
                      <div className="form-group">
                        <label>Partnership Type</label>
                        <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} required>
                          <option value="">Select type...</option>
                          <option value="technology">Technology Partner</option>
                          <option value="integration">Integration Partner</option>
                          <option value="research">Research Partner</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Partnership Goals</label>
                      <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="How would you like to collaborate?" rows={4} required />
                    </div>
                    {formStatus === 'error' && <div className="form-error">Something went wrong. Please try again.</div>}
                    <button type="submit" className="btn btn-primary btn-lg" disabled={formStatus === 'loading'}>
                      {formStatus === 'loading' ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Page Links */}
        <section className="page-links">
          <div className="container">
            <div className="links-grid">
              <Link href="/careers" className="page-link-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                </svg>
                <span>Careers</span>
                <p>Join our team</p>
              </Link>
              <Link href="/about" className="page-link-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
                <span>About Us</span>
                <p>Learn our story</p>
              </Link>
              <Link href="/contact" className="page-link-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
                <span>Contact</span>
                <p>Get in touch</p>
              </Link>
              <Link href="/pricing" className="page-link-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
                  <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>
                </svg>
                <span>Pricing</span>
                <p>View our plans</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
