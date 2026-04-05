'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';

interface SearchResult {
  title: string;
  description: string;
  category: string;
  path: string;
  type: 'docs' | 'blog' | 'changelog' | 'tutorial';
  time?: string;
  level?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchData: SearchResult[] = [
  // Documentation
  { title: 'Quick Start Guide', description: 'Deploy AI4Bharat in under 10 minutes with our step-by-step wizard.', category: 'Getting Started', path: '/documentation', type: 'docs', time: '5 min', level: 'Beginner' },
  { title: 'Installation & Setup', description: 'System requirements, environment configuration, and initial deployment.', category: 'Getting Started', path: '/documentation', type: 'docs', time: '10 min', level: 'Beginner' },
  { title: 'First Incident Response', description: 'Walk through a live incident from detection to autonomous remediation.', category: 'Getting Started', path: '/documentation', type: 'docs', time: '8 min', level: 'Intermediate' },
  { title: 'Basic Configuration', description: 'Set alert thresholds, define escalation rules, and configure teams.', category: 'Getting Started', path: '/documentation', type: 'docs', time: '12 min', level: 'Beginner' },
  { title: 'PagerDuty Setup', description: 'Route incidents bidirectionally between PagerDuty and AI4Bharat.', category: 'Integrations', path: '/documentation', type: 'docs', time: '8 min', level: 'Intermediate' },
  { title: 'Datadog Integration', description: 'Ingest Datadog metrics and traces for correlated incident analysis.', category: 'Integrations', path: '/documentation', type: 'docs', time: '10 min', level: 'Intermediate' },
  { title: 'Slack Notifications', description: 'Configure rich Slack alerts with one-click remediation actions.', category: 'Integrations', path: '/documentation', type: 'docs', time: '5 min', level: 'Beginner' },
  { title: 'GitHub Actions', description: 'Trigger automated PRs and rollbacks from within incident workflows.', category: 'Integrations', path: '/documentation', type: 'docs', time: '12 min', level: 'Advanced' },
  { title: 'Environment Variables', description: 'All supported env vars with types, defaults, and validation rules.', category: 'Configuration', path: '/documentation', type: 'docs', time: '6 min', level: 'Intermediate' },
  { title: 'AI Model Configuration', description: 'Select, fine-tune, and benchmark the AI models powering remediation.', category: 'Configuration', path: '/documentation', type: 'docs', time: '10 min', level: 'Advanced' },
  { title: 'Alert Routing Rules', description: 'Write CEL-based routing expressions to direct alerts to the right team.', category: 'Configuration', path: '/documentation', type: 'docs', time: '8 min', level: 'Intermediate' },
  { title: 'Custom Workflows', description: 'Build multi-step automation pipelines with conditions and retries.', category: 'Configuration', path: '/documentation', type: 'docs', time: '15 min', level: 'Advanced' },
  { title: 'REST API Overview', description: 'Base URLs, versioning strategy, pagination, and response conventions.', category: 'API Reference', path: '/documentation', type: 'docs', time: '10 min', level: 'Intermediate' },
  { title: 'Authentication', description: 'API key management, OAuth 2.0 scopes, and token rotation.', category: 'API Reference', path: '/documentation', type: 'docs', time: '5 min', level: 'Beginner' },
  { title: 'Webhooks', description: 'Register endpoints, verify signatures, and handle payload schemas.', category: 'API Reference', path: '/documentation', type: 'docs', time: '12 min', level: 'Advanced' },
  { title: 'Rate Limits', description: 'Per-endpoint limits, burst allowances, and 429 backoff strategies.', category: 'API Reference', path: '/documentation', type: 'docs', time: '3 min', level: 'Beginner' },
  { title: 'SOC 2 Compliance', description: 'Our audit scope, controls inventory, and how to access reports.', category: 'Security', path: '/documentation', type: 'docs', time: '8 min', level: 'Intermediate' },
  { title: 'Data Encryption', description: 'Encryption at rest (AES-256) and in transit (TLS 1.3) architecture.', category: 'Security', path: '/documentation', type: 'docs', time: '6 min', level: 'Advanced' },
  { title: 'Access Control', description: 'RBAC model, SSO/SAML setup, and just-in-time provisioning.', category: 'Security', path: '/documentation', type: 'docs', time: '10 min', level: 'Advanced' },
  { title: 'Troubleshooting Guide', description: 'Common issues, error codes, and diagnostic commands.', category: 'Security', path: '/documentation', type: 'docs', time: '10 min', level: 'Intermediate' },
  // Blog
  { title: 'Building Resilient Systems', description: 'How AI agents are revolutionizing incident response and system resilience.', category: 'Engineering', path: '/blog', type: 'blog' },
  { title: 'The Future of DevOps', description: 'Exploring autonomous engineering and the evolution of platform engineering.', category: 'Thought Leadership', path: '/blog', type: 'blog' },
  { title: 'Scaling with AI', description: 'Lessons learned from deploying AI-driven incident management at scale.', category: 'Case Studies', path: '/blog', type: 'blog' },
  { title: 'Observability in 2026', description: 'Modern observability patterns for the AI era.', category: 'Engineering', path: '/blog', type: 'blog' },
  { title: 'Incident Management Best Practices', description: 'A comprehensive guide to modern incident management.', category: 'Guides', path: '/blog', type: 'blog' },
  { title: 'Machine Learning for SRE', description: 'How ML is transforming site reliability engineering.', category: 'Engineering', path: '/blog', type: 'blog' },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fuse = useMemo(() => new Fuse(searchData, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'description', weight: 1 },
      { name: 'category', weight: 0.5 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  }), []);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim().length >= 2) {
      const searchResults = fuse.search(searchQuery).slice(0, 8).map(r => r.item);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [fuse]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = results[selectedIndex].path;
    }
  }, [isOpen, results, selectedIndex]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const typeColors: Record<string, string> = {
    docs: 'var(--accent)',
    blog: '#3b82f6',
    changelog: '#22c55e',
    tutorial: '#a855f7',
  };

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search docs, blog, tutorials..."
            value={query}
            onChange={e => handleSearch(e.target.value)}
            autoFocus
          />
          <kbd>ESC</kbd>
        </div>

        {results.length > 0 && (
          <div className="search-results">
            {results.map((result, index) => (
              <Link
                key={`${result.title}-${index}`}
                href={result.path}
                className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="search-result-content">
                  <span className="search-result-title">{result.title}</span>
                  <span className="search-result-desc">{result.description}</span>
                </div>
                <span className="search-result-type" style={{ color: typeColors[result.type] }}>
                  {result.type}
                </span>
              </Link>
            ))}
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="search-no-results">
            <p>No results found for "{query}"</p>
          </div>
        )}

        {query.length < 2 && (
          <div className="search-hints">
            <p>Type at least 2 characters to search</p>
          </div>
        )}

        <div className="search-footer">
          <span><kbd>↑↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
