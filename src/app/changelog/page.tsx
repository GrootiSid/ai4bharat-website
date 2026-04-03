'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const typeConfig = {
  feature: { label: 'New Feature', color: 'feature', icon: '✨' },
  enhancement: { label: 'Enhancement', color: 'enhancement', icon: '⚡' },
  fix: { label: 'Bug Fix', color: 'fix', icon: '🐛' },
  security: { label: 'Security', color: 'security', icon: '🔒' }
};

const changelog = [
  {
    month: 'March 2026',
    entries: [
      {
        type: 'feature',
        date: 'March 28',
        title: 'Multi-Model Reasoning Engine',
        description: 'Deploy with Claude Opus 4.6, Gemini 2.5, or your organization\'s private model endpoint. Model-agnostic architecture for maximum flexibility.',
        link: '/features/models',
        linkLabel: 'Learn more'
      },
      {
        type: 'enhancement',
        date: 'March 21',
        title: 'Improved Log Correlation Speed',
        description: 'Query performance improved by 3x for large-scale log analysis. Reduced average investigation time from 45 seconds to 15 seconds.',
        details: [
          'Optimized query engine for parallel processing',
          'Improved indexing strategy for log data',
          'Reduced memory footprint by 40%'
        ]
      },
      {
        type: 'fix',
        date: 'March 18',
        title: 'Fixed GitHub Merge Conflicts',
        description: 'Resolved an issue where AI4Bharat would fail to merge PRs when there were unrelated changes in the same files.',
        link: '/integrations/github',
        linkLabel: 'View Integration'
      },
      {
        type: 'enhancement',
        date: 'March 14',
        title: 'Slack Thread Grouping',
        description: 'Incident updates now group into threaded conversations, keeping your Slack channels clean and organized.',
        link: '/integrations/slack',
        linkLabel: 'View Integration',
        details: [
          'Automatic thread creation per incident',
          'Thread summaries in channel overview',
          'Configurable notification preferences'
        ]
      }
    ]
  },
  {
    month: 'February 2026',
    entries: [
      {
        type: 'feature',
        date: 'February 26',
        title: 'Enterprise Memory & Context',
        description: 'Persistent semantic memory across your entire incident history, codebase, and runbooks. Every resolution is informed by organizational knowledge.',
        link: '/features/memory',
        linkLabel: 'Learn more'
      },
      {
        type: 'security',
        date: 'February 19',
        title: 'SOC 2 Type II Certification',
        description: 'AI4Bharat has achieved SOC 2 Type II compliance, meeting the highest standards for security, availability, and confidentiality.',
        link: '/features/security',
        linkLabel: 'View Security'
      },
      {
        type: 'fix',
        date: 'February 12',
        title: 'Resolved Metric Collection Timeouts',
        description: 'Fixed edge case where Datadog metric collection would timeout for services with more than 10,000 unique metrics.',
        link: '/integrations/datadog',
        linkLabel: 'View Integration'
      },
      {
        type: 'enhancement',
        date: 'February 5',
        title: 'Custom Dashboard Builder',
        description: 'Create custom dashboards with drag-and-drop widgets. Track resolution metrics, MTTR trends, and AI accuracy over time.',
        details: [
          'Drag-and-drop widget placement',
          'Custom date range selection',
          'Export to PDF and CSV'
        ]
      }
    ]
  },
  {
    month: 'January 2026',
    entries: [
      {
        type: 'feature',
        date: 'January 30',
        title: 'Autonomous Root Cause Analysis',
        description: 'Multi-source diagnostic reasoning across logs, traces, metrics, and code history. Identifies root cause in seconds, not hours.',
        link: '/features/root-cause',
        linkLabel: 'Learn more'
      },
      {
        type: 'enhancement',
        date: 'January 22',
        title: 'Datadog Dashboard Embeds',
        description: 'AI4Bharat investigation context can now be embedded directly into your Datadog dashboards for unified observability.',
        link: '/integrations/datadog',
        linkLabel: 'View Integration'
      },
      {
        type: 'fix',
        date: 'January 15',
        title: 'PagerDuty Alert Routing',
        description: 'Fixed incident routing issue where alerts from certain services were not being received by the AI agent.',
        link: '/integrations/pagerduty',
        linkLabel: 'View Integration'
      },
      {
        type: 'security',
        date: 'January 8',
        title: 'Enhanced Encryption at Rest',
        description: 'Upgraded encryption for stored incident data using AES-256-GCM for enhanced data protection.',
        link: '/features/security',
        linkLabel: 'View Security'
      }
    ]
  }
];

const roadmap = [
  { quarter: 'Q2 2026', items: ['Kubernetes Native Deployment', 'Custom Model Fine-tuning', 'Incident Playbooks'] },
  { quarter: 'Q3 2026', items: ['Multi-Region Failover', 'API Rate Limit Controls', 'Advanced Anomaly Detection'] },
  { quarter: 'Q4 2026', items: ['GPT-5 Integration', 'Mobile App', 'Custom Incident Workflows'] }
];

export default function ChangelogPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'feature', label: 'Features' },
    { id: 'enhancement', label: 'Enhancements' },
    { id: 'fix', label: 'Bug Fixes' },
    { id: 'security', label: 'Security' }
  ];

  const toggleEntry = (monthIndex: number, entryIndex: number) => {
    const key = `${monthIndex}-${entryIndex}`;
    setExpandedEntries(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const filteredChangelog = changelog
    .map(month => ({
      ...month,
      entries: month.entries.filter(entry => {
        const matchesFilter = activeFilter === 'all' || entry.type === activeFilter;
        const matchesSearch = searchQuery === '' || 
          entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      })
    }))
    .filter(month => month.entries.length > 0);

  const totalEntries = changelog.reduce((acc, month) => acc + month.entries.length, 0);
  const featureCount = changelog.reduce((acc, month) => 
    acc + month.entries.filter(e => e.type === 'feature').length, 0);
  const enhancementCount = changelog.reduce((acc, month) => 
    acc + month.entries.filter(e => e.type === 'enhancement').length, 0);
  const fixCount = changelog.reduce((acc, month) => 
    acc + month.entries.filter(e => e.type === 'fix').length, 0);

  return (
    <>
      <Navbar />
      <main className="changelog-page">
        <section className="changelog-hero">
          <div className="container">
            <span className="section-label">Changelog</span>
            <h1 className="display-xl gradient-text">What&apos;s new</h1>
            <p className="body-lg" style={{ maxWidth: '540px', margin: '12px auto 0' }}>
              We ship improvements continuously. Track our progress and see what&apos;s coming next.
            </p>
            
            <div className="changelog-stats">
              <div className="stat-pill">
                <span className="stat-value">{totalEntries}</span>
                <span className="stat-label">Total Updates</span>
              </div>
              <div className="stat-pill feature">
                <span className="stat-value">{featureCount}</span>
                <span className="stat-label">Features</span>
              </div>
              <div className="stat-pill enhancement">
                <span className="stat-value">{enhancementCount}</span>
                <span className="stat-label">Enhancements</span>
              </div>
              <div className="stat-pill fix">
                <span className="stat-value">{fixCount}</span>
                <span className="stat-label">Bug Fixes</span>
              </div>
            </div>

            <div className="changelog-controls">
              <div className="changelog-search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search updates..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="changelog-filters">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`changelog-filter ${activeFilter === filter.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="changelog-timeline">
              {filteredChangelog.map((month, monthIndex) => (
                <div key={month.month} className="changelog-month">
                  <h2 className="changelog-month-title">{month.month}</h2>
                  <div className="changelog-entries">
                    {month.entries.map((entry, entryIndex) => {
                      const key = `${monthIndex}-${entryIndex}`;
                      const isExpanded = expandedEntries.has(key);
                      const config = typeConfig[entry.type as keyof typeof typeConfig];
                      
                      return (
                        <div key={key} className="changelog-entry">
                          <button 
                            className="changelog-entry-header"
                            onClick={() => toggleEntry(monthIndex, entryIndex)}
                          >
                            <span className={`changelog-tag ${entry.type}`}>
                              {config.icon} {config.label}
                            </span>
                            <span className="changelog-date">{entry.date}</span>
                            <svg 
                              className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
                              width="20" height="20" viewBox="0 0 24 24" fill="none" 
                              stroke="currentColor" strokeWidth="2"
                            >
                              <path d="M6 9l6 6 6-6"/>
                            </svg>
                          </button>
                          
                          <div className="changelog-entry-content">
                            <h3>{entry.title}</h3>
                            <p>{entry.description}</p>
                            
                            {isExpanded && entry.details && (
                              <ul className="entry-details">
                                {entry.details.map((detail, i) => (
                                  <li key={i}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M20 6L9 17l-5-5"/>
                                    </svg>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            )}
                            
                            {entry.link && (
                              <Link href={entry.link} className="entry-link">
                                {entry.linkLabel} →
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {filteredChangelog.length === 0 && (
                <div className="no-results">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  <p>No updates found matching your search.</p>
                  <button onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}>
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="roadmap-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Coming Soon</span>
              <h2 className="display-md gradient-text">Roadmap</h2>
              <p className="body-lg">What we&apos;re working on next.</p>
            </div>
            
            <div className="roadmap-grid">
              {roadmap.map((quarter) => (
                <div key={quarter.quarter} className="roadmap-card">
                  <h3>{quarter.quarter}</h3>
                  <ul>
                    {quarter.items.map((item, i) => (
                      <li key={i}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 16v-4M12 8h.01"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="roadmap-cta">
              <p>Have a feature request? We&apos;d love to hear from you.</p>
              <Link href="/briefing" className="btn btn-primary">Request a Feature</Link>
            </div>
          </div>
        </section>

        <section className="changelog-subscribe">
          <div className="container">
            <div className="subscribe-card">
              <div className="subscribe-content">
                <h2>Stay updated</h2>
                <p>Get notified when we ship new features and improvements.</p>
              </div>
              <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
