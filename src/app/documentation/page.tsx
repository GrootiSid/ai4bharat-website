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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    docs: [
      { title: 'Quick Start Guide', time: '5 min', level: 'Beginner' },
      { title: 'Installation & Setup', time: '10 min', level: 'Beginner' },
      { title: 'First Incident Response', time: '8 min', level: 'Intermediate' },
      { title: 'Basic Configuration', time: '12 min', level: 'Beginner' }
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <path d="M9 12h6M12 9v6"/>
      </svg>
    ),
    docs: [
      { title: 'PagerDuty Setup', time: '8 min', level: 'Intermediate' },
      { title: 'Datadog Integration', time: '10 min', level: 'Intermediate' },
      { title: 'Slack Notifications', time: '5 min', level: 'Beginner' },
      { title: 'GitHub Actions', time: '12 min', level: 'Advanced' }
    ]
  },
  {
    id: 'configuration',
    title: 'Configuration',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    docs: [
      { title: 'Environment Variables', time: '6 min', level: 'Intermediate' },
      { title: 'AI Model Configuration', time: '10 min', level: 'Advanced' },
      { title: 'Alert Routing Rules', time: '8 min', level: 'Intermediate' },
      { title: 'Custom Workflows', time: '15 min', level: 'Advanced' }
    ]
  },
  {
    id: 'api',
    title: 'API Reference',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    ),
    docs: [
      { title: 'REST API Overview', time: '10 min', level: 'Intermediate' },
      { title: 'Authentication', time: '5 min', level: 'Beginner' },
      { title: 'Webhooks', time: '12 min', level: 'Advanced' },
      { title: 'Rate Limits', time: '3 min', level: 'Beginner' }
    ]
  },
  {
    id: 'security',
    title: 'Security',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    docs: [
      { title: 'SOC 2 Compliance', time: '8 min', level: 'Intermediate' },
      { title: 'Data Encryption', time: '6 min', level: 'Advanced' },
      { title: 'Access Control', time: '10 min', level: 'Advanced' },
      { title: 'Audit Logging', time: '5 min', level: 'Intermediate' }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4M12 8h.01"/>
      </svg>
    ),
    docs: [
      { title: 'Common Issues', time: '5 min', level: 'Beginner' },
      { title: 'Debug Mode', time: '8 min', level: 'Advanced' },
      { title: 'Logs & Monitoring', time: '10 min', level: 'Intermediate' },
      { title: 'Performance Tuning', time: '15 min', level: 'Advanced' }
    ]
  }
];

const levelColors: Record<string, string> = {
  Beginner: 'feature',
  Intermediate: 'enhancement',
  Advanced: 'security'
};

export default function DocumentationPage() {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const activeDocs = categories.find(c => c.id === activeCategory)?.docs || [];
  const filteredDocs = searchQuery
    ? categories.flatMap(c => c.docs.filter(d => 
        d.title.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    : activeDocs;

  return (
    <>
      <Navbar />
      <main className="docs-page">
        <section className="docs-hero">
          <div className="container">
            <span className="section-label">Documentation</span>
            <h1 className="display-xl gradient-text">Learn AI4Bharat</h1>
            <p className="body-lg" style={{ maxWidth: '540px', margin: '12px auto 0' }}>
              Comprehensive guides, API references, and tutorials to help you get the most out of AI4Bharat.
            </p>
            
            <div className="docs-search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search documentation..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="docs-layout">
            <aside className="docs-sidebar">
              <nav className="docs-nav">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`docs-nav-item ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="docs-nav-icon">{category.icon}</span>
                    <span>{category.title}</span>
                  </button>
                ))}
              </nav>
            </aside>

            <div className="docs-content">
              <h2 className="docs-section-title">
                {searchQuery ? `Search Results (${filteredDocs.length})` : categories.find(c => c.id === activeCategory)?.title}
              </h2>
              
              {filteredDocs.length === 0 ? (
                <div className="docs-empty">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  <p>No documentation found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="docs-grid">
                  {filteredDocs.map((doc, i) => (
                    <Link key={i} href="#" className="doc-card">
                      <div className="doc-card-header">
                        <span className={`doc-level ${levelColors[doc.level]}`}>{doc.level}</span>
                        <span className="doc-time">{doc.time} read</span>
                      </div>
                      <h3>{doc.title}</h3>
                      <span className="doc-link">Read more →</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="docs-help">
          <div className="container">
            <div className="docs-help-card">
              <div className="docs-help-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              </div>
              <div className="docs-help-content">
                <h3>Need help?</h3>
                <p>Our support team is available 24/7 to assist you with any questions.</p>
              </div>
              <Link href="/support" className="btn btn-primary">Contact Support</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
