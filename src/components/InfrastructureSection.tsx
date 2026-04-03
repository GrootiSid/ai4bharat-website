'use client';

import { useState } from 'react';

export default function InfrastructureSection() {
  const [activeTab, setActiveTab] = useState<'model' | 'transparency' | 'deployment'>('model');
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [ctaLabel, setCtaLabel] = useState('');

  const features = [
    {
      id: 'model',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      title: 'Model-agnostic reasoning layer',
      subtitle: 'Deploy with Claude Opus 4.6, Gemini 2.5, or your organization\'s private model endpoint.',
      details: [
        { label: 'Supported Models', value: 'Claude Opus 4.6, Gemini 2.5 Pro, GPT-4o, Custom Endpoints' },
        { label: 'Latency', value: '< 200ms average reasoning time' },
        { label: 'Context Window', value: 'Up to 2M tokens' }
      ],
      cta: 'Explore Model Options',
      subject: 'Model Options Inquiry'
    },
    {
      id: 'transparency',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'Real-time operational transparency',
      subtitle: 'Full observability into every agent decision, reasoning chain, and action taken. Compliance by design.',
      details: [
        { label: 'Audit Trail', value: 'Complete decision logging with timestamps' },
        { label: 'Reasoning Visibility', value: 'Step-by-step agent thought process' },
        { label: 'Compliance', value: 'SOC 2 Type II, GDPR, HIPAA ready' }
      ],
      cta: 'Request Compliance Details',
      subject: 'Compliance Documentation Request'
    },
    {
      id: 'deployment',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      title: 'Zero-migration deployment design',
      subtitle: 'Integrate with your existing stack in minutes. No infrastructure changes required.',
      details: [
        { label: 'Alerting', value: 'PagerDuty, OpsGenie, VictorOps' },
        { label: 'Observability', value: 'Datadog, Dynatrace, New Relic, Grafana' },
        { label: 'Source Control', value: 'GitHub, GitLab, Bitbucket' }
      ],
      cta: 'Get Integration Guide',
      subject: 'Integration Guide Request'
    }
  ];

  const activeFeature = features.find(f => f.id === activeTab) || features[0];

  const configCode = {
    model: `reasoning:
  model: claude-opus-4.6
  temperature: 0.1
  max_tokens: 32000
  
providers:
  primary: anthropic
  fallback:
    - google-gemini-2.5
    - openai-gpt-4o`,
    transparency: `observability:
  audit_logging: true
  reasoning_traces: true
  compliance:
    - SOC2_TypeII
    - GDPR
    - HIPAA
    
transparency:
  show_reasoning: always
  explain_actions: true
  document_everything: true`,
    deployment: `integrations:
  alerting:
    - pagerduty
    - opsgenie
    - victorops
  observability:
    - datadog
    - dynatrace
    - newrelic
    - grafana
  source_control:
    - github
    - gitlab
    - bitbucket`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(configCode[activeTab as keyof typeof configCode]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCTA = (label: string) => {
    setCtaLabel(label);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, subject: activeFeature.subject }),
      });
      
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setShowForm(false);
          setStatus('idle');
          setFormData({ name: '', email: '', company: '' });
        }, 2000);
      } else {
        setStatus('idle');
      }
    } catch {
      setStatus('idle');
    }
  };

  return (
    <section className="infra-section section" id="infrastructure">
      <div className="infra-glow"></div>
      <div className="container">
        <div className="section-header center" data-aos="fade-up">
          <span className="section-label">Technical Foundation</span>
          <h2 className="display-md gradient-text">Built on frontier infrastructure</h2>
          <p className="body-lg">
            AI4Bharat combines proprietary reasoning with best-in-class foundation models.
          </p>
        </div>

        <div className="infra-layout">
          <div className="infra-tabs" data-aos="fade-up" data-aos-delay="100">
            {features.map((feature) => (
              <button
                key={feature.id}
                className={`infra-tab ${activeTab === feature.id ? 'active' : ''}`}
                onClick={() => setActiveTab(feature.id as 'model' | 'transparency' | 'deployment')}
              >
                <span className="infra-tab-icon">{feature.icon}</span>
                <span className="infra-tab-content">
                  <span className="infra-tab-title">{feature.title}</span>
                </span>
                <svg className="infra-tab-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            ))}
          </div>

          <div className="infra-content" data-aos="fade-up" data-aos-delay="200">
            <div className="infra-content-card">
              <div className="infra-content-header">
                <span className="infra-content-icon">{activeFeature.icon}</span>
                <div>
                  <h3>{activeFeature.title}</h3>
                  <p>{activeFeature.subtitle}</p>
                </div>
              </div>

              <div className="infra-specs">
                {activeFeature.details.map((detail, i) => (
                  <div key={i} className="infra-spec-item">
                    <span className="infra-spec-label">{detail.label}</span>
                    <span className="infra-spec-value">{detail.value}</span>
                  </div>
                ))}
              </div>

              <div className="infra-code-block">
                <div className="infra-code-header">
                  <div className="infra-code-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <span className="infra-code-title">config.yaml</span>
                  <button className="infra-copy-btn" onClick={handleCopy}>
                    {copied ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                    )}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="infra-code">
                  <code>
{activeTab === 'model' && configCode.model}
{activeTab === 'transparency' && configCode.transparency}
{activeTab === 'deployment' && configCode.deployment}
                  </code>
                </pre>
              </div>

              <div className="infra-cta">
                <button 
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                  onClick={() => handleCTA(activeFeature.cta)}
                >
                  {activeFeature.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="infra-form-overlay" onClick={() => setShowForm(false)}>
          <div className="infra-form-modal" onClick={(e) => e.stopPropagation()}>
            <button className="auth-close" onClick={() => setShowForm(false)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            
            {status === 'success' ? (
              <div className="text-center" style={{ padding: '40px 0' }}>
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '50%', 
                  background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '24px', margin: '0 auto 20px', border: '2px solid #22c55e'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ marginBottom: '12px' }}>Request Sent</h3>
                <p style={{ color: 'var(--text-2)', marginBottom: '24px' }}>
                  We'll send the {activeFeature.subject.toLowerCase()} to <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button className="btn btn-outline" onClick={() => setShowForm(false)}>Close</button>
              </div>
            ) : (
              <>
                <div className="auth-header">
                  <div className="contact-icon" style={{ margin: '0 auto 16px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  </div>
                  <h1>{ctaLabel}</h1>
                  <p>Enter your details and we'll send you the information.</p>
                </div>
                
                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="auth-grid">
                    <div className="form-group">
                      <label htmlFor="infra-name">Name</label>
                      <input 
                        type="text" id="infra-name" required 
                        className="auth-input" placeholder="Sarah Chen"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="infra-email">Email</label>
                      <input 
                        type="email" id="infra-email" required 
                        className="auth-input" placeholder="sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="infra-company">Company</label>
                    <input 
                      type="text" id="infra-company" required 
                      className="auth-input" placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    disabled={status === 'loading'}
                    style={{ width: '100%' }}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Request'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
