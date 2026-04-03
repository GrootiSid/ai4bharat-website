'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const highlights = [
  { icon: '📱', title: 'API Access', desc: 'RESTful APIs with comprehensive documentation' },
  { icon: '⚡', title: '99.9% Uptime', desc: 'Enterprise-grade reliability guarantee' },
  { icon: '🔒', title: 'Data Privacy', desc: 'Your data never used for model training' },
  { icon: '💬', title: '24/7 Support', desc: 'Expert help whenever you need it' }
];

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
      </svg>
    ),
    title: 'Translation API',
    description: 'State-of-the-art machine translation for 20+ Indian languages'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
        <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>
      </svg>
    ),
    title: 'Speech Processing',
    description: 'Speech-to-text and text-to-speech in multiple Indian languages'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01"/>
      </svg>
    ),
    title: 'OCR & Document',
    description: 'Extract text from documents, images, and scanned content'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    title: 'NLU APIs',
    description: 'Natural language understanding for intent detection and sentiment'
  }
];

const accountResponsibilities = [
  'Maintain confidentiality of login credentials',
  'All activities under your account are your responsibility',
  'Report unauthorized access immediately',
  'Comply with applicable laws and regulations'
];

const prohibitedUses = [
  { icon: '⚠️', text: 'Violate any applicable law or regulation' },
  { icon: '🚫', text: 'Generate harmful, offensive, or illegal content' },
  { icon: '🎭', text: 'Impersonate any person or organization' },
  { icon: '🦠', text: 'Distribute malware or malicious code' },
  { icon: '🔓', text: 'Attempt unauthorized access to our systems' },
  { icon: '⚙️', text: 'Reverse engineer or disassemble our technology' }
];

const pricingPlans = [
  { name: 'Free', price: '$0', features: ['5,000 calls/month', 'Community support', 'Basic documentation'] },
  { name: 'Pro', price: '$99', features: ['500,000 calls/month', 'Priority support', 'Advanced analytics'] },
  { name: 'Enterprise', price: 'Custom', features: ['Unlimited calls', 'Dedicated support', 'SLA guarantee'] }
];

const testimonials = [
  { quote: 'Best translation API for Indian languages. Period.', author: 'Raj Mehta', role: 'CTO, LocalizeIt' },
  { quote: 'Incredible speech recognition accuracy for Hindi and Tamil.', author: 'Sarah Chen', role: 'Product Lead, VoiceFirst' },
  { quote: 'The support team is exceptional. They helped us integrate in 2 days.', author: 'Priya Sharma', role: 'Eng Director, TechCorp' }
];

export default function TermsPage() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <>
      <Navbar />
      <main className="terms-page">
        <section className="terms-hero">
          <div className="hero-visual">
            <div className="document-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
              </svg>
            </div>
          </div>
          <div className="container">
            <span className="section-label">Legal</span>
            <h1 className="display-xl gradient-text">Terms of Service</h1>
            <p className="body-lg" style={{ maxWidth: '600px', margin: '20px auto 0' }}>
              By using AI4Bharat, you agree to these terms. We keep them clear, fair, and transparent.
            </p>
            <div className="terms-meta">
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                Last updated: April 2026
              </span>
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
                Version 2.1
              </span>
            </div>
          </div>
        </section>

        <section className="quick-highlights">
          <div className="container">
            <div className="highlights-grid">
              {highlights.map((item, i) => (
                <div key={i} className="highlight-card">
                  <span className="highlight-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="services-overview">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">What We Offer</span>
              <h2 className="display-md gradient-text">Our Services</h2>
              <p className="body-lg" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
                AI4Bharat provides a suite of AI APIs designed for Indian languages and beyond.
              </p>
            </div>
            <div className="services-grid">
              {services.map((service, i) => (
                <div key={i} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href="/features" className="learn-more">Learn more →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="account-section">
          <div className="container">
            <div className="account-grid">
              <div className="account-content">
                <span className="section-label">Your Account</span>
                <h2 className="display-md gradient-text">Account Responsibilities</h2>
                <p>When you create an account with us, you agree to:</p>
                <ul className="account-list">
                  {accountResponsibilities.map((item, i) => (
                    <li key={i}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="btn btn-primary">Create Account</Link>
              </div>
              <div className="account-visual">
                <div className="account-card">
                  <div className="account-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Account Security</span>
                  </div>
                  <div className="security-tips">
                    <div className="tip">
                      <span className="tip-icon">✓</span>
                      <span>Use a strong, unique password</span>
                    </div>
                    <div className="tip">
                      <span className="tip-icon">✓</span>
                      <span>Enable two-factor authentication</span>
                    </div>
                    <div className="tip">
                      <span className="tip-icon">✓</span>
                      <span>Never share your API keys</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="usage-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Acceptable Use</span>
              <h2 className="display-md gradient-text">What You Can (& Cannot) Do</h2>
            </div>
            <div className="usage-grid">
              <div className="usage-card allowed">
                <div className="usage-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                  <h3>Allowed</h3>
                </div>
                <ul>
                  <li>Build applications using our APIs</li>
                  <li>Commercial and non-commercial use</li>
                  <li>Translate content for your users</li>
                  <li>Process documents at scale</li>
                  <li>Create derivative works</li>
                </ul>
              </div>
              <div className="usage-card prohibited">
                <div className="usage-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M15 9l-6 6M9 9l6 6"/>
                  </svg>
                  <h3>Not Allowed</h3>
                </div>
                <div className="prohibited-list">
                  {prohibitedUses.map((item, i) => (
                    <div key={i} className="prohibited-item">
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ip-section">
          <div className="container">
            <div className="ip-card">
              <div className="ip-header">
                <div className="ip-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h2>Intellectual Property</h2>
                  <p>Clear ownership, transparent terms</p>
                </div>
              </div>
              <div className="ip-grid">
                <div className="ip-item">
                  <h3>Our Technology</h3>
                  <p>We retain all rights to our services, models, and proprietary technology.</p>
                </div>
                <div className="ip-item">
                  <h3>Your Content</h3>
                  <p>You own all inputs you submit and outputs you generate.</p>
                </div>
                <div className="ip-item">
                  <h3>Model Training</h3>
                  <p>Your data is never used to train our models (opt-out available for Enterprise).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing-overview">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Pricing</span>
              <h2 className="display-md gradient-text">Simple, Transparent Pricing</h2>
              <p className="body-lg" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
                Pay only for what you use. No hidden fees, no surprises.
              </p>
            </div>
            <div className="pricing-cards">
              {pricingPlans.map((plan, i) => (
                <div key={i} className={`pricing-card ${i === 1 ? 'featured' : ''}`}>
                  {i === 1 && <span className="popular-badge">Most Popular</span>}
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="period">/month</span>}
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((feature, j) => (
                      <li key={j}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/pricing" className={`btn ${i === 1 ? 'btn-primary' : 'btn-outline'}`}>
                    View Plans
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Trust</span>
              <h2 className="display-md gradient-text">What developers say</h2>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="testimonial-card">
                  <p className="quote">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <span className="author-name">{testimonial.author}</span>
                      <span className="author-role">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="termination-section">
          <div className="container">
            <div className="termination-grid">
              <div className="termination-content">
                <span className="section-label">Termination</span>
                <h2 className="display-md gradient-text">Easy On, Easy Off</h2>
                <p>We believe you should be able to leave whenever you want. Here's how it works:</p>
                <div className="termination-options">
                  <div className="termination-option">
                    <h4>Your Termination</h4>
                    <p>Delete your account anytime from settings. Your data is removed within 30 days.</p>
                  </div>
                  <div className="termination-option">
                    <h4>Our Termination</h4>
                    <p>We may suspend accounts that violate terms. We'll always provide notice when possible.</p>
                  </div>
                </div>
                <Link href="/contact" className="btn btn-outline">Contact Support</Link>
              </div>
              <div className="termination-visual">
                <div className="lifecycle-diagram">
                  <div className="lifecycle-item">
                    <div className="lifecycle-icon start">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                    </div>
                    <span>Sign Up</span>
                  </div>
                  <div className="lifecycle-line"></div>
                  <div className="lifecycle-item">
                    <div className="lifecycle-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20M2 12h20"/>
                      </svg>
                    </div>
                    <span>Use Services</span>
                  </div>
                  <div className="lifecycle-line"></div>
                  <div className="lifecycle-item">
                    <div className="lifecycle-icon end">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                      </svg>
                    </div>
                    <span>Export & Delete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="legal-cta">
          <div className="container">
            <div className="cta-card">
              <div className="cta-content">
                <h2>Questions about these terms?</h2>
                <p>Our legal team is happy to clarify anything. We're committed to being transparent.</p>
                <div className="cta-actions">
                  <a href="mailto:legal@ai4bharat.io" className="btn btn-primary">Email Legal Team</a>
                  <Link href="/contact" className="btn btn-outline">Contact Us</Link>
                </div>
              </div>
              <div className="cta-links">
                <p>Also read:</p>
                <Link href="/privacy">Privacy Policy →</Link>
                <Link href="/cookies">Cookie Settings →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="agreement-section">
          <div className="container">
            <div className="agreement-card">
              <label className="agreement-label">
                <input 
                  type="checkbox" 
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <span>I have read and agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link></span>
              </label>
              <Link href="/signup" className={`btn btn-primary btn-lg ${!acceptedTerms ? 'disabled' : ''}`}>
                Get Started with AI4Bharat
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
