'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const faqData = [
    {
      q: "How does AI4Bharat integrate with our existing incident response workflow?",
      a: "AI4Bharat integrates at the alert layer — connecting to PagerDuty, Opsgenie, or VictorOps as a new responder. When an alert fires, the agent receives it simultaneously with your on-call engineer and begins investigation immediately. Your existing workflows, runbooks, and escalation paths remain unchanged."
    },
    {
      q: "What is the data handling model? Does our source code leave our environment?",
      a: "We offer two deployment models. In our cloud deployment, code context is processed ephemerally and never retained beyond the active investigation session. In our self-hosted deployment, all processing occurs within your infrastructure perimeter."
    },
    {
      q: "What categories of incidents can the platform resolve autonomously?",
      a: "The platform achieves full autonomous resolution for database performance degradation, memory and resource leaks, API timeout and latency issues, configuration drift, dependency failures, and common security vulnerabilities."
    },
    {
      q: "What is the accuracy and acceptance rate of generated remediation?",
      a: "Across our production customer base, 83% of AI4Bharat-generated pull requests are approved and merged with no modifications. An additional 12% require minor adjustments."
    },
    {
      q: "Is the platform language and framework agnostic?",
      a: "Yes. The platform's reasoning layer operates across all major languages and frameworks. Current production deployments include Python, TypeScript, Go, Java, Ruby, and Rust."
    },
    {
      q: "What happens when the agent cannot fully resolve an incident?",
      a: "The agent escalates with a structured investigation brief: confirmed root cause hypotheses, evidence gathered, remediation options evaluated, and recommended next steps."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('loading');
    
    try {
      const response = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      
      if (response.ok) {
        setContactStatus('success');
        setContactForm({ name: '', email: '', company: '', subject: '', message: '' });
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    }
  };

  const closeContactModal = () => {
    setIsContactOpen(false);
    setContactStatus('idle');
  };

  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isContactOpen]);

  return (
    <>
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-header center">
            <h2 className="display-md gradient-text">Frequently asked questions</h2>
            <p className="body-lg">Technical and commercial questions from engineering and procurement teams.</p>
          </div>
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div 
                key={index} 
                className={`faq-item ${openIndex === index ? 'open' : ''}`}
              >
                <button className="faq-q" onClick={() => toggleFaq(index)}>
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-icon">
                    <svg className="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </span>
                </button>
                <div className="faq-content">
                  <div className="faq-a">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="faq-contact">
            <div className="faq-contact-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div className="faq-contact-text">
              <h3>Still have questions?</h3>
              <p>Can't find the answer you're looking for? Reach out to our enterprise team.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setIsContactOpen(true)}>
              Contact Enterprise Team
            </button>
          </div>
        </div>
      </section>

      {isContactOpen && (
        <div className="modal-overlay" onClick={closeContactModal}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="auth-close" onClick={closeContactModal} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            
            {contactStatus === 'success' ? (
              <div className="contact-success">
                <div className="contact-success-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h2>Message Sent</h2>
                <p>Thank you for reaching out. Our enterprise team will respond within 24 hours.</p>
                <button className="btn btn-primary" onClick={closeContactModal}>Close</button>
              </div>
            ) : (
              <>
                <div className="auth-header">
                  <div className="contact-icon" style={{ margin: '0 auto 20px' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <h1>Contact Enterprise Team</h1>
                  <p>Get in touch with our team for technical or commercial inquiries.</p>
                </div>
                
                <form className="auth-form" onSubmit={handleContactSubmit}>
                  <div className="auth-grid">
                    <div className="form-group">
                      <label htmlFor="contact-name">Full Name</label>
                      <input 
                        type="text" 
                        id="contact-name" 
                        required 
                        className="auth-input" 
                        placeholder="Sarah Chen"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-email">Work Email</label>
                      <input 
                        type="email" 
                        id="contact-email" 
                        required 
                        className="auth-input" 
                        placeholder="sarah@company.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="auth-grid">
                    <div className="form-group">
                      <label htmlFor="contact-company">Company</label>
                      <input 
                        type="text" 
                        id="contact-company" 
                        required 
                        className="auth-input" 
                        placeholder="Acme Corp"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-subject">Subject</label>
                      <select 
                        id="contact-subject" 
                        required 
                        className="auth-input"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      >
                        <option value="" disabled hidden>Select topic...</option>
                        <option value="technical">Technical Question</option>
                        <option value="commercial">Commercial Inquiry</option>
                        <option value="integration">Integration Support</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contact-message">Message</label>
                    <textarea 
                      id="contact-message" 
                      rows={3} 
                      required 
                      className="auth-input" 
                      placeholder="Describe your question or requirements..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    />
                  </div>
                  
                  {contactStatus === 'error' && (
                    <div className="form-error">Failed to send message. Please try again.</div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    disabled={contactStatus === 'loading'}
                    style={{ width: '100%' }}
                  >
                    {contactStatus === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
