'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const dataTypes = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'Personal Information',
    items: ['Name and email', 'Company & job title', 'Phone number', 'Profile photo']
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Usage Data',
    items: ['API requests & logs', 'Feature interactions', 'Device & browser', 'IP address & location']
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    ),
    title: 'Content Data',
    items: ['Text inputs', 'Uploaded documents', 'Audio files', 'Processing requests']
  }
];

const rights = [
  { title: 'Access', desc: 'Request a copy of your data', icon: '📄' },
  { title: 'Correction', desc: 'Fix inaccurate information', icon: '✏️' },
  { title: 'Deletion', desc: 'Remove your data completely', icon: '🗑️' },
  { title: 'Portability', desc: 'Export data in portable format', icon: '📦' },
  { title: 'Object', desc: 'Opt-out of processing', icon: '🚫' },
  { title: 'Restrict', desc: 'Limit how we use your data', icon: '🔒' }
];

const securityFeatures = [
  { label: 'TLS 1.3 Encryption', desc: 'Data in transit' },
  { label: 'AES-256 Encryption', desc: 'Data at rest' },
  { label: 'SOC 2 Type II', desc: 'Certified compliance' },
  { label: '24/7 Monitoring', desc: 'Security operations' }
];

export default function PrivacyPage() {
  const [email, setEmail] = useState('');

  return (
    <>
      <Navbar />
      <main className="privacy-page">
        <section className="privacy-hero">
          <div className="hero-visual">
            <div className="shield-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
          </div>
          <div className="container">
            <span className="section-label">Privacy</span>
            <h1 className="display-xl gradient-text">Your Privacy, Our Priority</h1>
            <p className="body-lg" style={{ maxWidth: '600px', margin: '20px auto 0' }}>
              We believe privacy is a fundamental right. Learn how we protect your data and give you control.
            </p>
            <div className="trust-badges">
              <span className="trust-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                SOC 2 Certified
              </span>
              <span className="trust-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                GDPR Compliant
              </span>
              <span className="trust-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                Last updated: April 2026
              </span>
            </div>
          </div>
        </section>

        <section className="quick-summary">
          <div className="container">
            <div className="summary-card">
              <div className="summary-content">
                <h2>In a nutshell</h2>
                <div className="summary-points">
                  <div className="summary-point">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span>We never sell your personal data</span>
                  </div>
                  <div className="summary-point">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span>Your AI inputs stay private by default</span>
                  </div>
                  <div className="summary-point">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span>You own all outputs you generate</span>
                  </div>
                  <div className="summary-point">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span>Enterprise customers can opt out of model training</span>
                  </div>
                </div>
              </div>
              <div className="summary-action">
                <p>Have questions about your data?</p>
                <Link href="/contact" className="btn btn-primary">Contact Privacy Team</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="data-collection">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Data We Collect</span>
              <h2 className="display-md gradient-text">Transparency at every step</h2>
              <p className="body-lg" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
                We only collect what we need to provide you with excellent service.
              </p>
            </div>
            <div className="data-types-grid">
              {dataTypes.map((type, i) => (
                <div key={i} className="data-type-card">
                  <div className="data-type-icon">{type.icon}</div>
                  <h3>{type.title}</h3>
                  <ul>
                    {type.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="security-section">
          <div className="container">
            <div className="security-card">
              <div className="security-header">
                <div className="security-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <h2>Enterprise-Grade Security</h2>
                  <p>Your data is protected by industry-leading security measures.</p>
                </div>
              </div>
              <div className="security-features">
                {securityFeatures.map((feature, i) => (
                  <div key={i} className="security-feature">
                    <span className="feature-label">{feature.label}</span>
                    <span className="feature-desc">{feature.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rights-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Your Rights</span>
              <h2 className="display-md gradient-text">You're in control</h2>
              <p className="body-lg" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
                Exercise your privacy rights anytime through your account or by contacting us.
              </p>
            </div>
            <div className="rights-grid">
              {rights.map((right, i) => (
                <div key={i} className="right-card">
                  <span className="right-icon">{right.icon}</span>
                  <h3>{right.title}</h3>
                  <p>{right.desc}</p>
                </div>
              ))}
            </div>
            <div className="rights-action">
              <p>To exercise any of these rights:</p>
              <div className="action-buttons">
                <Link href="/contact" className="btn btn-primary">Send Request</Link>
                <a href="mailto:privacy@ai4bharat.io" className="btn btn-outline">Email Us</a>
              </div>
            </div>
          </div>
        </section>

        <section className="retention-section">
          <div className="container">
            <div className="retention-grid">
              <div className="retention-content">
                <span className="section-label">Data Retention</span>
                <h2 className="display-md gradient-text">We don't keep data forever</h2>
                <p>We retain your data only as long as necessary to provide services and comply with legal obligations.</p>
                <div className="retention-list">
                  <div className="retention-item">
                    <span className="retention-label">Account Data</span>
                    <span className="retention-value">Duration + 2 years</span>
                  </div>
                  <div className="retention-item">
                    <span className="retention-label">API Logs</span>
                    <span className="retention-value">90 days</span>
                  </div>
                  <div className="retention-item">
                    <span className="retention-label">Processing Inputs</span>
                    <span className="retention-value">30 days (configurable)</span>
                  </div>
                  <div className="retention-item">
                    <span className="retention-label">Billing Records</span>
                    <span className="retention-value">7 years</span>
                  </div>
                </div>
              </div>
              <div className="retention-visual">
                <div className="circle-chart">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--bg-3)" strokeWidth="8"/>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent)" strokeWidth="8" strokeDasharray="70 283" strokeLinecap="round" transform="rotate(-90 50 50)"/>
                  </svg>
                  <div className="circle-label">
                    <span className="circle-value">30</span>
                    <span className="circle-unit">days</span>
                  </div>
                </div>
                <p className="retention-note">Default processing data retention</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cookies-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Cookies</span>
              <h2 className="display-md gradient-text">Cookie preferences</h2>
              <p className="body-lg" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
                Manage your cookie preferences or learn more about how we use them.
              </p>
            </div>
            <div className="cookie-options">
              <div className="cookie-option essential">
                <div className="cookie-info">
                  <h3>Essential Cookies</h3>
                  <p>Required for the website to function properly. Cannot be disabled.</p>
                </div>
                <span className="cookie-status required">Always Active</span>
              </div>
              <div className="cookie-option">
                <div className="cookie-info">
                  <h3>Analytics Cookies</h3>
                  <p>Help us understand how visitors interact with our website.</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="cookie-option">
                <div className="cookie-info">
                  <h3>Marketing Cookies</h3>
                  <p>Used to deliver relevant advertisements and track campaign performance.</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div className="cookies-actions">
              <button className="btn btn-primary">Save Preferences</button>
              <Link href="/cookies" className="btn btn-outline">Cookie Settings Page</Link>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <div className="container">
            <div className="contact-card">
              <div className="contact-content">
                <h2>Questions about privacy?</h2>
                <p>Our privacy team is here to help. Reach out anytime for questions, concerns, or to exercise your rights.</p>
                <div className="contact-methods">
                  <a href="mailto:privacy@ai4bharat.io" className="contact-method">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <path d="M22 6l-10 7L2 6"/>
                    </svg>
                    privacy@ai4bharat.io
                  </a>
                  <div className="contact-method">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    IIT Bombay Research Park, Mumbai
                  </div>
                </div>
              </div>
              <div className="contact-form-mini">
                <h3>Subscribe to updates</h3>
                <p>Get notified about privacy policy changes.</p>
                <form className="subscribe-form">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="legal-links">
          <div className="container">
            <div className="links-card">
              <p>Also check out our:</p>
              <div className="links-row">
                <Link href="/terms" className="legal-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <path d="M14 2v6h6"/>
                  </svg>
                  Terms of Service
                </Link>
                <Link href="/cookies" className="legal-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  Cookie Settings
                </Link>
                <Link href="/status" className="legal-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  System Status
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
