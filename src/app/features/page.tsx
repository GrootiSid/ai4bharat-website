'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function FeaturesPage() {
  const features = [
    {
      id: 'root-cause',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
          <path d="M11 8v6M8 11h6"/>
        </svg>
      ),
      title: 'Autonomous Root Cause Analysis',
      description: 'Multi-source diagnostic reasoning across logs, traces, metrics, and code history. Identifies root cause in seconds, not hours — without an engineer ever being paged.',
      benefits: [
        'Multi-source correlation (logs, traces, metrics)',
        'Code history analysis and context',
        'Dependency mapping and impact assessment',
        'Hypothesis generation and validation'
      ],
      metrics: { resolution: '83%', speed: '10x faster', accuracy: '98%' }
    },
    {
      id: 'memory',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'Enterprise Memory & Context',
      description: 'Persistent semantic memory across your entire incident history, codebase, and runbooks. Every resolution is informed by organizational knowledge accumulated over time.',
      benefits: [
        'Cross-incident pattern recognition',
        'Codebase context preservation',
        'Runbook integration and learning',
        'Organizational knowledge graphs'
      ],
      metrics: { memory: '5M+', patterns: '1,200+', retention: 'Unlimited' }
    },
    {
      id: 'remediation',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 11l3 3 6-6"/>
          <rect x="3" y="3" width="18" height="18" rx="2"/>
        </svg>
      ),
      title: 'Audit-Ready Remediation',
      description: 'Every fix is delivered as a documented, tested pull request with full reasoning, rollback procedure, and compliance evidence. Built for regulated industries.',
      benefits: [
        'Automated PR generation with tests',
        'Rollback procedures included',
        'Compliance documentation',
        'Code review workflow integration'
      ],
      metrics: { acceptance: '83%', docs: '100%', compliance: 'SOC 2' }
    },
    {
      id: 'security',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: 'Zero-Trust Security',
      description: 'SOC 2 Type II certified. Self-hosted deployment available. Air-gapped execution environments ensure your intellectual property never leaves your infrastructure perimeter.',
      benefits: [
        'SOC 2 Type II certified',
        'Self-hosted deployment option',
        'Air-gapped execution environments',
        'End-to-end encryption'
      ],
      metrics: { certification: 'SOC 2 II', deployment: 'Self-hosted', encryption: 'E2E' }
    },
    {
      id: 'transparency',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      title: 'Real-Time Transparency',
      description: 'Full observability into every agent decision, reasoning chain, and action taken. You always know what the AI is doing and why.',
      benefits: [
        'Complete decision logging',
        'Reasoning chain visibility',
        'Action audit trails',
        'Compliance reporting'
      ],
      metrics: { visibility: '100%', logging: 'Complete', audit: 'Real-time' }
    },
    {
      id: 'models',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      title: 'Multi-Model Reasoning',
      description: 'Deploy with Claude Opus 4.6, Gemini 2.5, or your organization\'s private model endpoint. Model-agnostic architecture for maximum flexibility.',
      benefits: [
        'Claude, Gemini, GPT-4o support',
        'Private model endpoints',
        'Automatic model failover',
        '< 200ms reasoning latency'
      ],
      metrics: { latency: '<200ms', models: '4+', context: '2M tokens' }
    }
  ];

  return (
    <>
      <Navbar />
      <main className="features-page">
        <section className="features-hero">
          <div className="container">
            <div className="section-header center" data-aos="fade-up">
              <span className="section-label">Platform Capabilities</span>
              <h1 className="display-xl gradient-text">Engineered for operational excellence</h1>
              <p className="body-lg">Six foundational capabilities that together constitute a complete autonomous engineering function.</p>
            </div>
          </div>
        </section>

        <section className="features-list">
          <div className="container">
            {features.map((feature, index) => (
              <div key={feature.id} className={`feature-detail ${index % 2 === 1 ? 'reverse' : ''}`} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="feature-detail-content">
                  <div className="feature-detail-icon">{feature.icon}</div>
                  <h2 className="display-md gradient-text">{feature.title}</h2>
                  <p className="body-lg">{feature.description}</p>
                  <ul className="feature-benefits">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="feature-metrics">
                    {Object.entries(feature.metrics).map(([key, value]) => (
                      <div key={key} className="metric-item">
                        <span className="metric-value">{value}</span>
                        <span className="metric-key">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="feature-detail-visual">
                  <Link href={`/features/${feature.id}`} className="feature-visual-card">
                    <div className="visual-placeholder">
                      <div className="visual-icon">{feature.icon}</div>
                      <span>{feature.title}</span>
                      <span className="visual-link">Learn more →</span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="features-cta">
          <div className="container">
            <div className="cta-card">
              <h2 className="display-md gradient-text">Ready to see it in action?</h2>
              <p>Schedule a technical briefing with our engineering team to explore how AI4Bharat can transform your incident response.</p>
              <div className="cta-buttons">
                <Link href="/briefing" className="btn btn-primary btn-lg">Schedule Briefing</Link>
                <Link href="/integrations" className="btn btn-outline btn-lg">View Integrations</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
