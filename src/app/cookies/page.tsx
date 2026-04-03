'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cookieCategories = [
  {
    id: 'essential',
    title: 'Essential Cookies',
    description: 'These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions you take, like logging in or filling in forms.',
    required: true,
    examples: [
      'Authentication cookies',
      'Security cookies',
      'Load balancing cookies',
      'Session cookies'
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    )
  },
  {
    id: 'analytics',
    title: 'Analytics Cookies',
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and your experience.',
    required: false,
    examples: [
      'Page view counts',
      'Time on page',
      'Click patterns',
      'Referral sources'
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
      </svg>
    )
  },
  {
    id: 'marketing',
    title: 'Marketing Cookies',
    description: 'These cookies are used to track visitors across websites to display relevant advertisements. They help us measure the effectiveness of our marketing campaigns.',
    required: false,
    examples: [
      'Ad impressions',
      'Conversion tracking',
      'Personalized ads',
      'Campaign analytics'
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    )
  },
  {
    id: 'functional',
    title: 'Functional Cookies',
    description: 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we use.',
    required: false,
    examples: [
      'Language preferences',
      'Theme settings',
      'Recent activity',
      'Saved preferences'
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    )
  }
];

const cookiesList = [
  { name: '_ga', provider: 'Google Analytics', purpose: 'Used to distinguish users', expiration: '2 years' },
  { name: '_gid', provider: 'Google Analytics', purpose: 'Used to distinguish users', expiration: '24 hours' },
  { name: '_gat', provider: 'Google Analytics', purpose: 'Throttle request rate', expiration: '1 minute' },
  { name: 'auth_token', provider: 'AI4Bharat', purpose: 'Authentication session', expiration: '30 days' },
  { name: 'session_id', provider: 'AI4Bharat', purpose: 'Session management', expiration: 'Session' },
  { name: 'cookies_consent', provider: 'AI4Bharat', purpose: 'Your preferences', expiration: '1 year' }
];

export default function CookiesPage() {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false
  });
  const [showAll, setShowAll] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleToggle = (id: string) => {
    if (id === 'essential') return;
    setPreferences(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
    setSaved(false);
  };

  const handleAcceptAll = () => {
    setPreferences({ essential: true, analytics: true, marketing: true, functional: true });
    setSaved(true);
  };

  const handleRejectAll = () => {
    setPreferences({ essential: true, analytics: false, marketing: false, functional: false });
    setSaved(true);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <Navbar />
      <main className="cookies-page">
        <section className="cookies-hero">
          <div className="hero-visual">
            <div className="cookie-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="8" cy="9" r="1" fill="currentColor"/>
                <circle cx="15" cy="8" r="1" fill="currentColor"/>
                <circle cx="10" cy="14" r="1" fill="currentColor"/>
                <circle cx="16" cy="14" r="1" fill="currentColor"/>
                <circle cx="12" cy="18" r="1" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <div className="container">
            <span className="section-label">Privacy</span>
            <h1 className="display-xl gradient-text">Cookie Settings</h1>
            <p className="body-lg" style={{ maxWidth: '600px', margin: '20px auto 0' }}>
              Take control of your privacy. Manage your cookie preferences anytime.
            </p>
          </div>
        </section>

        <section className="quick-actions">
          <div className="container">
            <div className="actions-card">
              <p>We respect your privacy. Choose how you want us to use cookies when you visit our website.</p>
              <div className="actions-buttons">
                <button onClick={handleAcceptAll} className="btn btn-primary btn-lg">
                  Accept All Cookies
                </button>
                <button onClick={handleRejectAll} className="btn btn-outline btn-lg">
                  Reject Non-Essential
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="cookie-categories">
          <div className="container">
            <div className="section-header">
              <h2 className="display-md gradient-text">Manage Your Preferences</h2>
              <p>Customize your cookie settings below. Essential cookies cannot be disabled.</p>
            </div>
            <div className="categories-list">
              {cookieCategories.map((category) => (
                <div key={category.id} className={`category-card ${category.required ? 'required' : ''}`}>
                  <div className="category-header">
                    <div className="category-icon">{category.icon}</div>
                    <div className="category-info">
                      <h3>{category.title}</h3>
                      <p>{category.description}</p>
                    </div>
                    <div className="category-toggle">
                      {category.required ? (
                        <span className="required-badge">Always Active</span>
                      ) : (
                        <label className="toggle">
                          <input 
                            type="checkbox" 
                            checked={preferences[category.id as keyof typeof preferences]}
                            onChange={() => handleToggle(category.id)}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="category-examples">
                    <span className="examples-label">Examples:</span>
                    <div className="examples-list">
                      {category.examples.map((example, i) => (
                        <span key={i} className="example-tag">{example}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="save-section">
          <div className="container">
            <div className="save-card">
              {saved ? (
                <div className="save-success">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                  <span>Preferences saved successfully!</span>
                </div>
              ) : (
                <button onClick={handleSave} className="btn btn-primary btn-lg">
                  Save Cookie Preferences
                </button>
              )}
              <p className="save-note">Your preferences will be stored for 1 year. You can change them anytime.</p>
            </div>
          </div>
        </section>

        <section className="cookies-list-section">
          <div className="container">
            <div className="section-header">
              <h2 className="display-md gradient-text">Our Cookies</h2>
              <p>Here's a detailed list of all cookies we use.</p>
            </div>
            <div className="cookies-table-wrapper">
              <table className="cookies-table">
                <thead>
                  <tr>
                    <th>Cookie Name</th>
                    <th>Provider</th>
                    <th>Purpose</th>
                    <th>Expiration</th>
                  </tr>
                </thead>
                <tbody>
                  {cookiesList.slice(0, showAll ? undefined : 4).map((cookie, i) => (
                    <tr key={i}>
                      <td><code>{cookie.name}</code></td>
                      <td>{cookie.provider}</td>
                      <td>{cookie.purpose}</td>
                      <td>{cookie.expiration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => setShowAll(!showAll)} className="btn btn-outline">
              {showAll ? 'Show Less' : 'Show All Cookies'}
            </button>
          </div>
        </section>

        <section className="third-party-section">
          <div className="container">
            <div className="section-header center">
              <h2 className="display-md gradient-text">Third-Party Services</h2>
              <p className="body-lg" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
                Some cookies are set by trusted third-party services we use.
              </p>
            </div>
            <div className="third-party-grid">
              <div className="third-party-card">
                <div className="third-party-logo google">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google Analytics
                </div>
                <p>Used to understand how you use our website and improve your experience.</p>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy →</a>
              </div>
              <div className="third-party-card">
                <div className="third-party-logo stripe">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#635BFF">
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                  </svg>
                  Stripe
                </div>
                <p>Used for secure payment processing and fraud prevention.</p>
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy →</a>
              </div>
              <div className="third-party-card">
                <div className="third-party-logo intercom">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1F8DED">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2V9h2v8z"/>
                  </svg>
                  Intercom
                </div>
                <p>Used for customer support and communication.</p>
                <a href="https://www.intercom.com/legal/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy →</a>
              </div>
            </div>
          </div>
        </section>

        <section className="update-section">
          <div className="container">
            <div className="update-card">
              <div className="update-content">
                <h2>Want to learn more?</h2>
                <p>Read our full privacy policy to understand how we handle your data.</p>
              </div>
              <div className="update-links">
                <Link href="/privacy" className="btn btn-primary">
                  Read Privacy Policy
                </Link>
                <Link href="/terms" className="btn btn-outline">
                  Read Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <div className="container">
            <div className="contact-card">
              <div className="contact-content">
                <h2>Questions about cookies?</h2>
                <p>Our privacy team is here to help with any questions you have.</p>
              </div>
              <div className="contact-actions">
                <a href="mailto:privacy@ai4bharat.io" className="btn btn-primary">
                  Email Privacy Team
                </a>
                <Link href="/contact" className="btn btn-outline">
                  Contact Us
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
