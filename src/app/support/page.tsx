'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqs = [
  {
    question: 'How do I get started with AI4Bharat?',
    answer: 'Getting started is easy! Sign up for a free trial, connect your first integration (like PagerDuty or Datadog), and let AI4Bharat start monitoring your systems. Our onboarding wizard will guide you through the initial setup in about 10 minutes.'
  },
  {
    question: 'What integrations does AI4Bharat support?',
    answer: 'AI4Bharat integrates with 50+ tools including PagerDuty, Datadog, Slack, GitHub, Jenkins, Grafana, Splunk, and more. We\'re continuously adding new integrations based on customer requests.'
  },
  {
    question: 'How does the pricing work?',
    answer: 'We offer three plans: Starter ($299/mo), Pro ($899/mo), and Enterprise (custom pricing). All plans include a 14-day free trial. Usage is measured in "incident minutes" - the time AI4Bharat is actively working on an incident.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! AI4Bharat is SOC 2 Type II certified. We offer both cloud and self-hosted deployment options. In cloud mode, your data is encrypted at rest and in transit. In self-hosted mode, all processing happens within your infrastructure.'
  },
  {
    question: 'Can I customize how AI4Bharat responds to incidents?',
    answer: 'Absolutely! You can configure custom response rules, escalation policies, and remediation workflows. Our visual workflow builder makes it easy to create rules based on severity, service type, or any custom criteria.'
  },
  {
    question: 'What happens if AI4Bharat can\'t resolve an incident?',
    answer: 'If AI4Bharat can\'t fully resolve an incident, it will escalate to your team with a detailed investigation brief including: confirmed root cause hypotheses, evidence gathered, remediation options evaluated, and recommended next steps.'
  }
];

const contactMethods = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <path d="M22 6l-10 7L2 6"/>
      </svg>
    ),
    title: 'Email Support',
    value: 'support@ai4bharat.io',
    description: 'Response within 24 hours'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    title: 'Live Chat',
    value: 'Available 24/7',
    description: 'Instant response for Pro+'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    title: 'Phone',
    value: '+1 (888) 555-0123',
    description: 'Enterprise support'
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('form');

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
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
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
      <main className="support-page">
        <section className="support-hero">
          <div className="container">
            <span className="section-label">Support</span>
            <h1 className="display-xl gradient-text">How can we help?</h1>
            <p className="body-lg" style={{ maxWidth: '540px', margin: '12px auto 0' }}>
              Get help from our team of experts. We&apos;re here to support your success.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="support-grid">
              <div className="support-contact-methods">
                {contactMethods.map((method, i) => (
                  <div key={i} className="contact-method">
                    <div className="contact-method-icon">{method.icon}</div>
                    <div>
                      <h3>{method.title}</h3>
                      <p className="contact-value">{method.value}</p>
                      <p className="contact-desc">{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="support-form-container">
                <div className="support-tabs">
                  <button 
                    className={`support-tab ${activeTab === 'form' ? 'active' : ''}`}
                    onClick={() => setActiveTab('form')}
                  >
                    Submit a Request
                  </button>
                  <button 
                    className={`support-tab ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => setActiveTab('chat')}
                  >
                    Live Chat
                  </button>
                </div>

                {activeTab === 'form' ? (
                  formStatus === 'success' ? (
                    <div className="support-success">
                      <div className="success-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      </div>
                      <h3>Message Sent!</h3>
                      <p>Thank you for reaching out. Our team will respond within 24 hours.</p>
                      <button 
                        className="btn btn-outline"
                        onClick={() => setFormStatus('idle')}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form className="support-form" onSubmit={handleSubmit}>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Name</label>
                          <input 
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input 
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="you@company.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Company</label>
                        <input 
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          placeholder="Your company"
                        />
                      </div>
                      <div className="form-group">
                        <label>Subject</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          required
                        >
                          <option value="">Select a topic...</option>
                          <option value="technical">Technical Support</option>
                          <option value="billing">Billing & Plans</option>
                          <option value="integration">Integration Help</option>
                          <option value="enterprise">Enterprise Sales</option>
                          <option value="feedback">Product Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Message</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Describe your issue or question..."
                          rows={5}
                          required
                        />
                      </div>
                      {formStatus === 'error' && (
                        <div className="form-error">Something went wrong. Please try again.</div>
                      )}
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg"
                        disabled={formStatus === 'loading'}
                      >
                        {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  )
                ) : (
                  <div className="support-chat">
                    <div className="chat-placeholder">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                      </svg>
                      <h3>Chat with Support</h3>
                      <p>Live chat is available for Pro and Enterprise customers.</p>
                      <div className="chat-status">
                        <span className="status-dot online"></span>
                        <span>All agents are currently busy</span>
                      </div>
                      <button className="btn btn-outline">Leave a Message</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="support-resources">
          <div className="container">
            <h2 className="display-md text-center">Quick Resources</h2>
            <div className="resources-grid">
              <Link href="/documentation" className="resource-card">
                <div className="resource-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                  </svg>
                </div>
                <h3>Documentation</h3>
                <p>Guides, tutorials, and API references</p>
              </Link>
              <Link href="/tutorials" className="resource-card">
                <div className="resource-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
                <h3>Tutorials</h3>
                <p>Step-by-step learning resources</p>
              </Link>
              <Link href="/blog" className="resource-card">
                <div className="resource-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2"/>
                  </svg>
                </div>
                <h3>Blog</h3>
                <p>Articles and best practices</p>
              </Link>
              <Link href="/changelog" className="resource-card">
                <div className="resource-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3>Changelog</h3>
                <p>Latest updates and releases</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="support-faq">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">FAQ</span>
              <h2 className="display-md gradient-text">Frequently Asked Questions</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`faq-item ${openFaq === i ? 'open' : ''}`}
                >
                  <button 
                    className="faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.question}</span>
                    <svg className="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  <div className="faq-content">
                    <p>{faq.answer}</p>
                  </div>
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
