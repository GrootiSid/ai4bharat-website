'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    docs: [
      { title: 'Quick Start Guide',        description: 'Deploy AI4Bharat in under 10 minutes with our step-by-step wizard.',        time: '5 min',  level: 'Beginner' },
      { title: 'Installation & Setup',     description: 'System requirements, environment configuration, and initial deployment.',    time: '10 min', level: 'Beginner' },
      { title: 'First Incident Response',  description: 'Walk through a live incident from detection to autonomous remediation.',     time: '8 min',  level: 'Intermediate' },
      { title: 'Basic Configuration',      description: 'Set alert thresholds, define escalation rules, and configure teams.',       time: '12 min', level: 'Beginner' },
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 12h6M12 9v6"/>
      </svg>
    ),
    docs: [
      { title: 'PagerDuty Setup',          description: 'Route incidents bidirectionally between PagerDuty and AI4Bharat.',          time: '8 min',  level: 'Intermediate' },
      { title: 'Datadog Integration',      description: 'Ingest Datadog metrics and traces for correlated incident analysis.',       time: '10 min', level: 'Intermediate' },
      { title: 'Slack Notifications',      description: 'Configure rich Slack alerts with one-click remediation actions.',           time: '5 min',  level: 'Beginner' },
      { title: 'GitHub Actions',           description: 'Trigger automated PRs and rollbacks from within incident workflows.',       time: '12 min', level: 'Advanced' },
    ]
  },
  {
    id: 'configuration',
    title: 'Configuration',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    docs: [
      { title: 'Environment Variables',    description: 'All supported env vars with types, defaults, and validation rules.',        time: '6 min',  level: 'Intermediate' },
      { title: 'AI Model Configuration',   description: 'Select, fine-tune, and benchmark the AI models powering remediation.',     time: '10 min', level: 'Advanced' },
      { title: 'Alert Routing Rules',      description: 'Write CEL-based routing expressions to direct alerts to the right team.',   time: '8 min',  level: 'Intermediate' },
      { title: 'Custom Workflows',         description: 'Build multi-step automation pipelines with conditions and retries.',        time: '15 min', level: 'Advanced' },
    ]
  },
  {
    id: 'api',
    title: 'API Reference',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    ),
    docs: [
      { title: 'REST API Overview',        description: 'Base URLs, versioning strategy, pagination, and response conventions.',     time: '10 min', level: 'Intermediate' },
      { title: 'Authentication',           description: 'API key management, OAuth 2.0 scopes, and token rotation.',                time: '5 min',  level: 'Beginner' },
      { title: 'Webhooks',                 description: 'Register endpoints, verify signatures, and handle payload schemas.',        time: '12 min', level: 'Advanced' },
      { title: 'Rate Limits',              description: 'Per-endpoint limits, burst allowances, and 429 backoff strategies.',        time: '3 min',  level: 'Beginner' },
    ]
  },
  {
    id: 'security',
    title: 'Security',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    docs: [
      { title: 'SOC 2 Compliance',         description: 'Our audit scope, controls inventory, and how to access reports.',           time: '8 min',  level: 'Intermediate' },
      { title: 'Data Encryption',          description: 'Encryption at rest (AES-256) and in transit (TLS 1.3) architecture.',      time: '6 min',  level: 'Advanced' },
      { title: 'Access Control',           description: 'RBAC model, SSO/SAML setup, and just-in-time provisioning.',               time: '10 min', level: 'Advanced' },
      { title: 'Audit Logging',            description: 'Immutable event logs, export formats, SIEM integrations.',                  time: '5 min',  level: 'Intermediate' },
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
      </svg>
    ),
    docs: [
      { title: 'Common Issues',            description: 'Top 20 errors, their causes, and copy-paste fix commands.',                 time: '5 min',  level: 'Beginner' },
      { title: 'Debug Mode',               description: 'Enable verbose logging and interpret structured debug output.',             time: '8 min',  level: 'Advanced' },
      { title: 'Logs & Monitoring',        description: 'Query structured logs, set health check alerts, and export to Grafana.',   time: '10 min', level: 'Intermediate' },
      { title: 'Performance Tuning',       description: 'Profiling bottlenecks, caching strategies, and cluster scaling tips.',     time: '15 min', level: 'Advanced' },
    ]
  }
];

const levelConfig: Record<string, { label: string; color: string; bg: string }> = {
  Beginner:     { label: 'Beginner',     color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  Intermediate: { label: 'Intermediate', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  Advanced:     { label: 'Advanced',     color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
};

export default function DocumentationPage() {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const activeDocs = categories.find(c => c.id === activeCategory)?.docs || [];
  const filteredDocs = searchQuery
    ? categories.flatMap(c => c.docs.filter(d =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    : activeDocs;

  const activeTitle = categories.find(c => c.id === activeCategory)?.title || '';

  return (
    <>
      <Navbar />
      <main className="docs-page">

        {/* ── Hero ── */}
        <section className="docs-hero">
          <div className="container">
            <span className="section-label">Documentation</span>
            <h1 className="display-xl gradient-text">Learn AI4Bharat</h1>
            <p style={{ color: 'var(--text-2)', maxWidth: '520px', margin: '12px auto 28px', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Comprehensive guides, API references, and tutorials to build faster with AI4Bharat.
            </p>
            <div className="docs-search-bar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search docs, guides, API..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: '4px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>

            {/* Quick links */}
            <div className="docs-quick-links">
              {['Quick Start Guide', 'REST API Overview', 'Slack Notifications'].map(title => (
                <Link key={title} href="#" className="docs-quick-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main Docs Layout ── */}
        <div className="docs-layout-wrapper">
          <div className="docs-layout">

            {/* Sidebar */}
            <aside className="docs-sidebar">
              <p className="docs-sidebar-label">Categories</p>
              <nav className="docs-nav">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`docs-nav-item ${activeCategory === cat.id && !searchQuery ? 'active' : ''}`}
                    onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                  >
                    <span className="docs-nav-icon">{cat.icon}</span>
                    <span>{cat.title}</span>
                    <span className="docs-nav-count">{cat.docs.length}</span>
                  </button>
                ))}
              </nav>

              <div className="docs-sidebar-divider" />

              <div className="docs-sidebar-cta">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '2px' }}>Need help?</p>
                  <Link href="/support" style={{ fontSize: '0.78rem', color: 'var(--accent)' }}>Talk to support →</Link>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="docs-content">
              <div className="docs-content-header">
                <h2 className="docs-section-title">
                  {searchQuery ? `Results for "${searchQuery}"` : activeTitle}
                </h2>
                {!searchQuery && (
                  <span className="docs-count-badge">{filteredDocs.length} articles</span>
                )}
              </div>

              {filteredDocs.length === 0 ? (
                <div className="docs-empty">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <p>No results for &quot;{searchQuery}&quot;</p>
                  <button onClick={() => setSearchQuery('')} className="btn btn-outline" style={{ marginTop: '12px' }}>Clear search</button>
                </div>
              ) : (
                <div className="docs-grid">
                  {filteredDocs.map((doc, i) => {
                    const lv = levelConfig[doc.level];
                    return (
                      <Link key={i} href="#" className="doc-card">
                        <div className="doc-card-meta">
                          <span className="doc-level-badge" style={{ color: lv.color, background: lv.bg }}>
                            {lv.label}
                          </span>
                          <span className="doc-time">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            {doc.time}
                          </span>
                        </div>
                        <h3 className="doc-title">{doc.title}</h3>
                        <p className="doc-description">{doc.description}</p>
                        <span className="doc-link">
                          Read article
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
