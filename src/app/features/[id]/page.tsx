'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const features = [
  {
    id: 'root-cause',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <path d="M11 8v6M8 11h6"/>
      </svg>
    ),
    title: 'Autonomous Root Cause Analysis',
    tagline: 'Identify root cause in seconds, not hours',
    description: 'Multi-source diagnostic reasoning across logs, traces, metrics, and code history. Identifies root cause in seconds, not hours — without an engineer ever being paged.',
    benefits: [
      'Multi-source correlation (logs, traces, metrics)',
      'Code history analysis and context',
      'Dependency mapping and impact assessment',
      'Hypothesis generation and validation',
      'Automated diagnostic workflows',
      'Correlated event timeline'
    ],
    metrics: { resolution: '83%', speed: '10x faster', accuracy: '98%' },
    howItWorks: [
      {
        step: 1,
        title: 'Alert Ingestion',
        description: 'Receives alerts from PagerDuty, Datadog, or any monitoring tool simultaneously with your on-call engineer.'
      },
      {
        step: 2,
        title: 'Context Gathering',
        description: 'Collects logs, metrics, traces, and code changes across your entire infrastructure in parallel.'
      },
      {
        step: 3,
        title: 'Root Cause Identification',
        description: 'Analyzes patterns, correlations, and dependencies to pinpoint the exact source of the issue.'
      },
      {
        step: 4,
        title: 'Resolution Delivery',
        description: 'Generates a documented fix as a pull request with full reasoning and rollback procedure.'
      }
    ],
    relatedFeatures: ['memory', 'remediation', 'transparency'],
    useCases: [
      'Database performance degradation',
      'API timeout and latency issues',
      'Memory and resource leaks',
      'Configuration drift detection',
      'Dependency failures'
    ]
  },
  {
    id: 'memory',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Enterprise Memory & Context',
    tagline: 'Organizational knowledge that grows with every incident',
    description: 'Persistent semantic memory across your entire incident history, codebase, and runbooks. Every resolution is informed by organizational knowledge accumulated over time.',
    benefits: [
      'Cross-incident pattern recognition',
      'Codebase context preservation',
      'Runbook integration and learning',
      'Organizational knowledge graphs',
      'Historical incident correlation',
      'Team-specific learning'
    ],
    metrics: { memory: '5M+', patterns: '1,200+', retention: 'Unlimited' },
    howItWorks: [
      {
        step: 1,
        title: 'Knowledge Ingestion',
        description: 'Continuously learns from incident resolutions, runbooks, documentation, and code changes.'
      },
      {
        step: 2,
        title: 'Semantic Indexing',
        description: 'Builds a searchable knowledge graph that understands context and relationships between concepts.'
      },
      {
        step: 3,
        title: 'Pattern Recognition',
        description: 'Identifies recurring issues and known solutions across your incident history.'
      },
      {
        step: 4,
        title: 'Context Injection',
        description: 'Applies relevant historical knowledge to every new incident for faster, more accurate resolution.'
      }
    ],
    relatedFeatures: ['root-cause', 'transparency', 'models'],
    useCases: [
      'Recurring issue prevention',
      'Knowledge transfer between teams',
      'On-call preparation',
      'Post-mortem automation',
      'Runbook recommendations'
    ]
  },
  {
    id: 'remediation',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 11l3 3 6-6"/>
        <rect x="3" y="3" width="18" height="18" rx="2"/>
      </svg>
    ),
    title: 'Audit-Ready Remediation',
    tagline: 'Every fix documented, tested, and compliant',
    description: 'Every fix is delivered as a documented, tested pull request with full reasoning, rollback procedure, and compliance evidence. Built for regulated industries.',
    benefits: [
      'Automated PR generation with tests',
      'Rollback procedures included',
      'Compliance documentation',
      'Code review workflow integration',
      'Change approval workflows',
      'Audit trail generation'
    ],
    metrics: { acceptance: '83%', docs: '100%', compliance: 'SOC 2' },
    howItWorks: [
      {
        step: 1,
        title: 'Fix Generation',
        description: 'Creates a complete code fix with inline comments explaining the reasoning behind each change.'
      },
      {
        step: 2,
        title: 'Test Suite Creation',
        description: 'Generates unit tests, integration tests, and regression tests to verify the fix works correctly.'
      },
      {
        step: 3,
        title: 'Documentation Assembly',
        description: 'Packages everything with impact analysis, rollback procedures, and compliance evidence.'
      },
      {
        step: 4,
        title: 'Review & Merge',
        description: 'Opens a pull request for human review, or auto-merges if confidence thresholds are met.'
      }
    ],
    relatedFeatures: ['root-cause', 'security', 'transparency'],
    useCases: [
      'SOC 2 compliance documentation',
      'PCI-DSS change management',
      'HIPAA audit trails',
      'Financial system changes',
      'Security vulnerability fixes'
    ]
  },
  {
    id: 'security',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Zero-Trust Security',
    tagline: 'SOC 2 Type II certified. Your data, your infrastructure.',
    description: 'SOC 2 Type II certified. Self-hosted deployment available. Air-gapped execution environments ensure your intellectual property never leaves your infrastructure perimeter.',
    benefits: [
      'SOC 2 Type II certified',
      'Self-hosted deployment option',
      'Air-gapped execution environments',
      'End-to-end encryption',
      'Private network connectivity',
      'Data residency controls'
    ],
    metrics: { certification: 'SOC 2 II', deployment: 'Self-hosted', encryption: 'E2E' },
    howItWorks: [
      {
        step: 1,
        title: 'Secure Deployment',
        description: 'Choose cloud hosting with encrypted data at rest and in transit, or deploy on your own infrastructure.'
      },
      {
        step: 2,
        title: 'Access Control',
        description: 'Role-based access control with SSO integration and detailed permission management.'
      },
      {
        step: 3,
        title: 'Audit Logging',
        description: 'Every action is logged with immutable audit trails for compliance and security review.'
      },
      {
        step: 4,
        title: 'Continuous Monitoring',
        description: '24/7 security monitoring with automated threat detection and response.'
      }
    ],
    relatedFeatures: ['transparency', 'remediation', 'memory'],
    useCases: [
      'Enterprise security requirements',
      'Regulatory compliance (SOC 2, HIPAA, PCI)',
      'Air-gapped government systems',
      'Financial services deployments',
      'Healthcare data protection'
    ]
  },
  {
    id: 'transparency',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: 'Real-Time Transparency',
    tagline: 'Full visibility into every AI decision',
    description: 'Full observability into every agent decision, reasoning chain, and action taken. You always know what the AI is doing and why.',
    benefits: [
      'Complete decision logging',
      'Reasoning chain visibility',
      'Action audit trails',
      'Compliance reporting',
      'Human-in-the-loop controls',
      'ExplAINable AI outputs'
    ],
    metrics: { visibility: '100%', logging: 'Complete', audit: 'Real-time' },
    howItWorks: [
      {
        step: 1,
        title: 'Decision Capture',
        description: 'Every AI decision is logged with full context, inputs, and outputs in real-time.'
      },
      {
        step: 2,
        title: 'Reasoning Visualization',
        description: 'View the complete reasoning chain showing how conclusions were reached.'
      },
      {
        step: 3,
        title: 'Action Tracking',
        description: 'Every action taken is recorded with timestamps, responsible parties, and outcomes.'
      },
      {
        step: 4,
        title: 'Reporting Dashboard',
        description: 'Access comprehensive reports for compliance, auditing, and continuous improvement.'
      }
    ],
    relatedFeatures: ['root-cause', 'memory', 'remediation'],
    useCases: [
      'SOC 2 compliance evidence',
      'Engineering team reviews',
      'Executive reporting',
      'Incident post-mortems',
      'AI governance and oversight'
    ]
  },
  {
    id: 'models',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Multi-Model Reasoning',
    tagline: 'Deploy with Claude, Gemini, or your own models',
    description: 'Deploy with Claude Opus 4.6, Gemini 2.5, or your organization\'s private model endpoint. Model-agnostic architecture for maximum flexibility.',
    benefits: [
      'Claude, Gemini, GPT-4o support',
      'Private model endpoints',
      'Automatic model failover',
      '< 200ms reasoning latency',
      'Model performance tracking',
      'Cost optimization controls'
    ],
    metrics: { latency: '<200ms', models: '4+', context: '2M tokens' },
    howItWorks: [
      {
        step: 1,
        title: 'Model Selection',
        description: 'Choose from our curated list of models or connect your own private endpoint.'
      },
      {
        step: 2,
        title: 'Context Preparation',
        description: 'Relevant context is gathered and formatted for optimal model performance.'
      },
      {
        step: 3,
        title: 'Reasoning Execution',
        description: 'Model processes the incident context with specialized prompts and tools.'
      },
      {
        step: 4,
        title: 'Output Validation',
        description: 'Responses are validated against safety and accuracy checks before action.'
      }
    ],
    relatedFeatures: ['root-cause', 'memory', 'transparency'],
    useCases: [
      'Multi-cloud AI strategies',
      'Private model deployment',
      'Cost-sensitive organizations',
      'Low-latency requirements',
      'Custom model fine-tuning'
    ]
  }
];

const featureTitles: Record<string, string> = {
  'root-cause': 'Root Cause Analysis',
  'memory': 'Enterprise Memory',
  'remediation': 'Audit-Ready Remediation',
  'security': 'Zero-Trust Security',
  'transparency': 'Real-Time Transparency',
  'models': 'Multi-Model Reasoning'
};

export default function FeatureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const feature = features.find(f => f.id === id);
  
  if (!feature) {
    notFound();
  }

  const relatedFeatureObjects = features.filter(f => feature.relatedFeatures.includes(f.id));

  return (
    <>
      <Navbar />
      <main className="feature-detail-page">
        <section className="detail-hero">
          <div className="container">
            <Link href="/features" className="back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              All Features
            </Link>
            <div className="detail-icon">{feature.icon}</div>
            <h1 className="display-xl gradient-text">{feature.title}</h1>
            <p className="detail-tagline">{feature.tagline}</p>
            <p className="body-lg detail-description">{feature.description}</p>
          </div>
        </section>

        <section className="detail-metrics">
          <div className="container">
            <div className="metrics-grid">
              {Object.entries(feature.metrics).map(([key, value]) => (
                <div key={key} className="metric-card">
                  <span className="metric-value">{value}</span>
                  <span className="metric-label">{key}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="detail-benefits">
          <div className="container">
            <h2 className="display-md">Key Capabilities</h2>
            <div className="benefits-grid">
              {feature.benefits.map((benefit, i) => (
                <div key={i} className="benefit-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="detail-how">
          <div className="container">
            <h2 className="display-md">How It Works</h2>
            <div className="steps-grid">
              {feature.howItWorks.map((step) => (
                <div key={step.step} className="step-card">
                  <span className="step-number">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="detail-use-cases">
          <div className="container">
            <h2 className="display-md">Common Use Cases</h2>
            <div className="use-cases-grid">
              {feature.useCases.map((useCase, i) => (
                <div key={i} className="use-case-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  <span>{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {relatedFeatureObjects.length > 0 && (
          <section className="detail-related">
            <div className="container">
              <h2 className="display-md">Related Features</h2>
              <div className="related-grid">
                {relatedFeatureObjects.map((related) => (
                  <Link key={related.id} href={`/features/${related.id}`} className="related-card">
                    <div className="related-icon">{related.icon}</div>
                    <h3>{related.title}</h3>
                    <p>{related.tagline}</p>
                    <span className="related-link">Learn more →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="detail-cta">
          <div className="container">
            <div className="cta-card">
              <h2 className="display-md gradient-text">Ready to see {featureTitles[id]} in action?</h2>
              <p>Schedule a technical briefing with our engineering team to explore how this capability can transform your incident response.</p>
              <div className="cta-buttons">
                <Link href="/briefing" className="btn btn-primary btn-lg">Schedule Briefing</Link>
                <Link href="/pricing" className="btn btn-outline btn-lg">View Pricing</Link>
                <Link href="/changelog" className="btn btn-ghost btn-lg">View Changelog</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
