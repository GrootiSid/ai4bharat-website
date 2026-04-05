'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const offices = [
  {
    city: 'Bangalore',
    country: 'India',
    address: 'IIT Bombay Research Park, Building 7',
    street: 'Powai, Mumbai 400076',
    phone: '+91 22 2576 4000'
  },
  {
    city: 'San Francisco',
    country: 'USA',
    address: '548 Market St, Suite 300',
    street: 'San Francisco, CA 94104',
    phone: '+1 (415) 555-0123'
  },
  {
    city: 'London',
    country: 'UK',
    address: '32 Second Floor',
    street: 'Oxford Street, W1D 1AS',
    phone: '+44 20 7946 0123'
  }
];

const contactTypes = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    title: 'Sales',
    description: 'Talk to our sales team about enterprise plans and custom pricing.',
    email: 'sales@ai4bharat.io'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <path d="M22 6l-10 7L2 6"/>
      </svg>
    ),
    title: 'Support',
    description: 'Get help from our technical support team. Available 24/7 for Pro+ customers.',
    email: 'support@ai4bharat.io'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Partnerships',
    description: 'Interested in becoming an integration or technology partner?',
    email: 'partners@ai4bharat.io'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    title: 'Press & Media',
    description: 'For press inquiries, interviews, and media requests.',
    email: 'press@ai4bharat.io'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response received:', text);
        throw new Error('Server returned an unexpected response format');
      }

      if (response.ok && data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setFormStatus('error');
      setErrorMessage('Network error. Please check your connection.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="container">
            <span className="section-label">Contact</span>
            <h1 className="display-xl gradient-text">Get in touch</h1>
            <p className="body-lg" style={{ maxWidth: '540px', margin: '16px auto 0' }}>
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-form-section">
                <h2>Send us a message</h2>
                {formStatus === 'success' ? (
                  <div className="contact-success">
                    <div className="success-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button 
                      className="btn btn-outline"
                      onClick={() => setFormStatus('idle')}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="you@company.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <input 
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="Your company"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        required
                      >
                        <option value="">Select a topic...</option>
                        <option value="sales">Sales Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="press">Press & Media</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="How can we help?"
                        rows={5}
                        required
                      />
                    </div>
                    {formStatus === 'error' && (
                      <div className="form-error" style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.85rem' }}>{errorMessage}</div>
                    )}
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg"
                      disabled={formStatus === 'loading'}
                    >
                      {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>

              <div className="contact-info">
                <div className="contact-types">
                  <h3>Contact by type</h3>
                  <div className="contact-type-list">
                    {contactTypes.map((type, i) => (
                      <div key={i} className="contact-type">
                        <div className="contact-type-icon">{type.icon}</div>
                        <div>
                          <h4>{type.title}</h4>
                          <p>{type.description}</p>
                          <a href={`mailto:${type.email}`}>{type.email}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="contact-social">
                  <h3>Follow us</h3>
                  <div className="social-links">
                    <a href="#" className="social-link-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span>Twitter / X</span>
                    </a>
                    <a href="#" className="social-link-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                    <a href="#" className="social-link-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-offices">
          <div className="container">
            <h2 className="display-md text-center">Our Offices</h2>
            <div className="offices-grid">
              {offices.map((office, i) => (
                <div key={i} className="office-card">
                  <div className="office-flag">{office.country === 'India' ? '🇮🇳' : office.country === 'USA' ? '🇺🇸' : '🇬🇧'}</div>
                  <h3>{office.city}</h3>
                  <p className="office-country">{office.country}</p>
                  <address>
                    <p>{office.address}</p>
                    <p>{office.street}</p>
                  </address>
                  <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="office-phone">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    {office.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
