'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
  { title: 'Building Resilient Systems', description: 'How AI agents are revolutionizing incident response and system resilience.', category: 'Engineering', path: '/blog', type: 'blog' },
  { title: 'The Future of DevOps', description: 'Exploring autonomous engineering and the evolution of platform engineering.', category: 'Thought Leadership', path: '/blog', type: 'blog' },
  { title: 'Scaling with AI', description: 'Lessons learned from deploying AI-driven incident management at scale.', category: 'Case Studies', path: '/blog', type: 'blog' },
  { title: 'Observability in 2026', description: 'Modern observability patterns for the AI era.', category: 'Engineering', path: '/blog', type: 'blog' },
  { title: 'Incident Management Best Practices', description: 'A comprehensive guide to modern incident management.', category: 'Guides', path: '/blog', type: 'blog' },
  { title: 'Machine Learning for SRE', description: 'How ML is transforming site reliability engineering.', category: 'Engineering', path: '/blog', type: 'blog' },
];

const typeConfig: Record<string, { color: string; bg: string; label: string }> = {
  docs: { color: 'var(--accent)', bg: 'rgba(249,115,22,0.1)', label: 'Docs' },
  blog: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', label: 'Blog' },
  changelog: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', label: 'Changelog' },
  tutorial: { color: '#a855f7', bg: 'rgba(168,85,247,0.1)', label: 'Tutorial' },
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

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
      setIsLoading(true);
      setTimeout(() => {
        const searchResults = fuse.search(searchQuery).slice(0, 8).map(r => r.item);
        setResults(searchResults);
        setSelectedIndex(0);
        setIsLoading(false);
      }, 50);
    } else {
      setResults([]);
    }
  }, [fuse]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex(i => Math.min(i + 1, results.length - 1));
        const selectedEl = document.querySelector('.search-result-item.selected') as HTMLElement;
        selectedEl?.nextElementSibling?.scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex(i => Math.max(i - 1, 0));
        const selectedEl = document.querySelector('.search-result-item.selected') as HTMLElement;
        selectedEl?.previousElementSibling?.scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      window.location.href = results[selectedIndex].path;
    }
  }, [isOpen, results, selectedIndex, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    resultsRef.current?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <div className="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation, blog posts, tutorials..."
            value={query}
            onChange={e => handleSearch(e.target.value)}
            className="search-input"
          />
          <div className="search-right">
            {isLoading && <div className="search-spinner"></div>}
            <kbd className="search-kbd">ESC</kbd>
          </div>
        </div>

        <div className="search-body" ref={resultsRef}>
          {results.length > 0 && (
            <div className="search-results">
              <div className="search-section-title">Search Results</div>
              {results.map((result, index) => {
                const config = typeConfig[result.type];
                return (
                  <Link
                    key={`${result.title}-${index}`}
                    href={result.path}
                    className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="search-result-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <path d="M14 2v6h6"/>
                      </svg>
                    </div>
                    <div className="search-result-content">
                      <div className="search-result-header">
                        <span className="search-result-title">{result.title}</span>
                        <span className="search-result-type" style={{ color: config.color, background: config.bg }}>
                          {config.label}
                        </span>
                      </div>
                      <span className="search-result-desc">{result.description}</span>
                      {result.time && result.level && (
                        <div className="search-result-meta">
                          <span>{result.time}</span>
                          <span className="meta-sep">•</span>
                          <span>{result.level}</span>
                        </div>
                      )}
                    </div>
                    <div className="search-result-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {query.length >= 2 && results.length === 0 && !isLoading && (
            <div className="search-empty">
              <div className="search-empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  <path d="M8 8l6 6M14 8l-6 6"/>
                </svg>
              </div>
              <p className="search-empty-title">No results found</p>
              <p className="search-empty-desc">Try searching for something else or check your spelling</p>
            </div>
          )}

          {query.length < 2 && (
            <div className="search-suggestions">
              <div className="search-section-title">Quick Links</div>
              <Link href="/documentation" className="search-suggestion-item">
                <div className="search-suggestion-icon docs">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                  </svg>
                </div>
                <div className="search-suggestion-content">
                  <span className="search-suggestion-title">Documentation</span>
                  <span className="search-suggestion-desc">Guides, API reference, and tutorials</span>
                </div>
              </Link>
              <Link href="/blog" className="search-suggestion-item">
                <div className="search-suggestion-icon blog">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                    <path d="M2 2l7.586 7.586"/>
                  </svg>
                </div>
                <div className="search-suggestion-content">
                  <span className="search-suggestion-title">Blog</span>
                  <span className="search-suggestion-desc">Latest insights and updates</span>
                </div>
              </Link>
              <Link href="/changelog" className="search-suggestion-item">
                <div className="search-suggestion-icon changelog">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="search-suggestion-content">
                  <span className="search-suggestion-title">Changelog</span>
                  <span className="search-suggestion-desc">Recent product updates</span>
                </div>
              </Link>
              <Link href="/support" className="search-suggestion-item">
                <div className="search-suggestion-icon support">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                </div>
                <div className="search-suggestion-content">
                  <span className="search-suggestion-title">Support</span>
                  <span className="search-suggestion-desc">Get help and contact us</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        <div className="search-footer">
          <div className="search-footer-item">
            <kbd>↑</kbd><kbd>↓</kbd>
            <span>Navigate</span>
          </div>
          <div className="search-footer-item">
            <kbd>↵</kbd>
            <span>Select</span>
          </div>
          <div className="search-footer-item">
            <kbd>ESC</kbd>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
