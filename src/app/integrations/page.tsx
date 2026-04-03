'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'monitoring', label: 'Monitoring' },
    { id: 'alerting', label: 'Alerting' },
    { id: 'communication', label: 'Communication' },
    { id: 'incident', label: 'Incident Management' },
    { id: 'collaboration', label: 'Collaboration' },
    { id: 'version-control', label: 'Version Control' },
    { id: 'deployment', label: 'Deployment' }
  ];

  const integrations = [
    {
      id: 'pagerduty',
      name: 'PagerDuty',
      category: 'alerting',
      description: 'Receive incidents directly in PagerDuty. AI4Bharat acts as an automated responder, investigating and resolving before your on-call engineer is paged.',
      status: 'Available',
      tags: ['Alert Routing', 'Escalation', 'On-Call']
    },
    {
      id: 'datadog',
      name: 'Datadog',
      category: 'monitoring',
      description: 'Connect to Datadog metrics, logs, and traces. AI4Bharat correlates telemetry across your entire infrastructure to pinpoint root causes.',
      status: 'Available',
      tags: ['Metrics', 'Logs', 'APM']
    },
    {
      id: 'slack',
      name: 'Slack',
      category: 'communication',
      description: 'Get incident updates, investigation progress, and resolution summaries directly in Slack. The AI can respond to commands and queries.',
      status: 'Available',
      tags: ['Notifications', 'Commands', 'Threads']
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'version-control',
      description: 'AI4Bharat analyzes code history, creates pull requests with remediation, and can automatically merge approved changes.',
      status: 'Available',
      tags: ['PR Creation', 'Code Review', 'Merging']
    },
    {
      id: 'jenkins',
      name: 'Jenkins',
      category: 'deployment',
      description: 'Trigger rollbacks, deploy known-good configurations, and coordinate deployment workflows during incident response.',
      status: 'Available',
      tags: ['CI/CD', 'Rollbacks', 'Deployments']
    },
    {
      id: 'grafana',
      name: 'Grafana',
      category: 'monitoring',
      description: 'Visualize incident context alongside your existing dashboards. AI4Bharat annotations show exactly when and why interventions occurred.',
      status: 'Available',
      tags: ['Dashboards', 'Metrics', 'Alerts']
    },
    {
      id: 'opsgenie',
      name: 'Opsgenie',
      category: 'alerting',
      description: 'Alternative alerting destination with intelligent routing. AI4Bharat receives alerts alongside your existing responders.',
      status: 'Available',
      tags: ['Alert Routing', 'Escalation', 'Scheduling']
    },
    {
      id: 'jira',
      name: 'Jira',
      category: 'incident',
      description: 'Automatically create Jira tickets for unresolved incidents. Link AI findings directly to existing tickets for seamless handoffs.',
      status: 'Available',
      tags: ['Ticketing', 'Issue Tracking', 'Projects']
    },
    {
      id: 'splunk',
      name: 'Splunk',
      category: 'monitoring',
      description: 'Query historical logs and correlate with current metrics. AI4Bharat uses Splunk data for comprehensive root cause analysis.',
      status: 'Available',
      tags: ['Log Analysis', 'SIEM', 'Search']
    },
    {
      id: 'linear',
      name: 'Linear',
      category: 'collaboration',
      description: 'Create Linear issues from incidents with pre-filled context. Link resolutions to issues for complete audit trails.',
      status: 'Available',
      tags: ['Issues', 'Projects', 'Sprints']
    },
    {
      id: 'gitlab',
      name: 'GitLab',
      category: 'version-control',
      description: 'Full integration with GitLab CI/CD pipelines. AI4Bharat can create merge requests, run pipelines, and merge approved changes.',
      status: 'Coming Soon',
      tags: ['CI/CD', 'Merge Requests', 'Pipelines']
    },
    {
      id: 'prometheus',
      name: 'Prometheus',
      category: 'monitoring',
      description: 'Pull metrics directly from Prometheus. AI4Bharat understands your metric relationships and alert thresholds.',
      status: 'Available',
      tags: ['Metrics', 'PromQL', 'Alerting']
    }
  ];

  const filteredIntegrations = activeCategory === 'all' 
    ? integrations 
    : integrations.filter(i => i.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="integrations-page">
        <section className="integrations-hero">
          <div className="container">
            <span className="section-label">Integrations</span>
            <h1 className="display-xl gradient-text">Connect your entire stack</h1>
            <p className="body-lg" style={{ maxWidth: '540px', margin: '16px auto 0' }}>
              AI4Bharat integrates with the tools your team already uses, bringing AI-powered incident response directly into your existing workflows.
            </p>
            
            <div className="integrations-categories">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`integration-category ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="integrations-grid">
              {filteredIntegrations.map((integration) => (
                <Link key={integration.id} href={`/integrations/${integration.id}`} className="integration-card">
                  <div className="integration-header">
                    <div className="integration-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="3"/>
                        <path d="M9 12h6M12 9v6"/>
                      </svg>
                    </div>
                    <div className="integration-info">
                      <h3>{integration.name}</h3>
                      <span>{categories.find(c => c.id === integration.category)?.label}</span>
                    </div>
                  </div>
                  
                  <p>{integration.description}</p>
                  
                  <div className="integration-status">
                    <span className="status-dot"></span>
                    <span>{integration.status}</span>
                  </div>
                  
                  <div className="integration-tags">
                    {integration.tags.map((tag, i) => (
                      <span key={i} className="integration-tag">{tag}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="integrations-cta">
          <div className="container">
            <div className="cta-card">
              <h2 className="display-md gradient-text">Don't see your tool?</h2>
              <p>We add new integrations regularly. Contact us to request an integration or discuss a custom connector for your stack.</p>
              <div className="cta-buttons">
                <Link href="/briefing" className="btn btn-primary btn-lg">Request Integration</Link>
                <Link href="/features" className="btn btn-outline btn-lg">View All Features</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
