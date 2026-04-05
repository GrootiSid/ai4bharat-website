'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';

interface SearchResult {
  title: string;
  description: string;
  category: string;
  path: string;
  type: 'docs' | 'blog' | 'changelog' | 'tutorial' | 'cmd';
  time?: string;
  level?: string;
  command?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchData: SearchResult[] = [
  // Commands
  { title: 'investigate', description: 'Start an incident investigation with AI-powered root cause analysis', category: 'Commands', path: '/documentation', type: 'cmd', command: 'investigate' },
  { title: 'help', description: 'Get help with AI4Bharat commands and features', category: 'Commands', path: '/support', type: 'cmd', command: 'help' },
  { title: 'docs', description: 'Open documentation and guides', category: 'Commands', path: '/documentation', type: 'cmd', command: 'docs' },
  { title: 'pricing', description: 'View pricing plans and enterprise options', category: 'Commands', path: '/pricing', type: 'cmd', command: 'pricing' },
  { title: 'features', description: 'Explore AI4Bharat features and capabilities', category: 'Commands', path: '/features', type: 'cmd', command: 'features' },
  { title: 'blog', description: 'Read latest insights and updates', category: 'Commands', path: '/blog', type: 'cmd', command: 'blog' },
  { title: 'status', description: 'Check system status and uptime', category: 'Commands', path: '/status', type: 'cmd', command: 'status' },
  { title: 'contact', description: 'Get in touch with our team', category: 'Commands', path: '/contact', type: 'cmd', command: 'contact' },
  // Documentation
  { title: 'Quick Start Guide', description: 'Deploy AI4Bharat in under 10 minutes', category: 'Getting Started', path: '/documentation', type: 'docs', time: '5 min', level: 'Beginner' },
  { title: 'Installation & Setup', description: 'System requirements and environment configuration', category: 'Getting Started', path: '/documentation', type: 'docs', time: '10 min', level: 'Beginner' },
  { title: 'First Incident Response', description: 'Walk through incident detection to autonomous remediation', category: 'Getting Started', path: '/documentation', type: 'docs', time: '8 min', level: 'Intermediate' },
  { title: 'PagerDuty Setup', description: 'Route incidents bidirectionally with PagerDuty', category: 'Integrations', path: '/documentation', type: 'docs', time: '8 min', level: 'Intermediate' },
  { title: 'Datadog Integration', description: 'Ingest metrics and traces for correlated analysis', category: 'Integrations', path: '/documentation', type: 'docs', time: '10 min', level: 'Intermediate' },
  { title: 'Slack Notifications', description: 'Configure rich Slack alerts with remediation actions', category: 'Integrations', path: '/documentation', type: 'docs', time: '5 min', level: 'Beginner' },
  { title: 'REST API Overview', description: 'Base URLs, versioning, pagination conventions', category: 'API Reference', path: '/documentation', type: 'docs', time: '10 min', level: 'Intermediate' },
  { title: 'Authentication', description: 'API key management, OAuth 2.0, token rotation', category: 'API Reference', path: '/documentation', type: 'docs', time: '5 min', level: 'Beginner' },
  { title: 'SOC 2 Compliance', description: 'Audit scope, controls inventory, access reports', category: 'Security', path: '/documentation', type: 'docs', time: '8 min', level: 'Intermediate' },
  { title: 'Data Encryption', description: 'AES-256 at rest, TLS 1.3 in transit', category: 'Security', path: '/documentation', type: 'docs', time: '6 min', level: 'Advanced' },
  // Blog
  { title: 'AI Incident Response', description: 'How AI is transforming incident response', category: 'Engineering', path: '/blog', type: 'blog' },
  { title: 'SOC 2 Compliance Guide', description: 'Achieving SOC 2 with AI-powered incident management', category: 'Security', path: '/blog', type: 'blog' },
  { title: 'Autonomous Remediation', description: 'Deep dive into autonomous remediation and safety measures', category: 'Technology', path: '/blog', type: 'blog' },
  { title: 'Multi-Model Reasoning', description: 'Why multiple AI models provide better accuracy', category: 'Engineering', path: '/blog', type: 'blog' },
  // Changelog
  { title: 'v2.4.1 Release', description: 'Latest enterprise features and improvements', category: 'Changelog', path: '/changelog', type: 'changelog' },
  { title: 'v2.4.0 Release', description: 'New investigation engine and correlation features', category: 'Changelog', path: '/changelog', type: 'changelog' },
];

const typeConfig: Record<string, { color: string; bg: string; label: string }> = {
  cmd: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', label: 'Command' },
  docs: { color: 'var(--accent)', bg: 'rgba(249,115,22,0.1)', label: 'Docs' },
  blog: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', label: 'Blog' },
  changelog: { color: '#a855f7', bg: 'rgba(168,85,247,0.1)', label: 'Changelog' },
  tutorial: { color: '#ec4899', bg: 'rgba(236,72,153,0.1)', label: 'Tutorial' },
};

const terminalOutput: Record<string, { title: string; content: string[] }> = {
  help: {
    title: 'AI4Bharat Command Help',
    content: [
      'Available commands:',
      '  • investigate  - Start AI-powered incident investigation',
      '  • docs         - Open documentation and guides',
      '  • features     - View AI4Bharat features',
      '  • pricing      - View pricing plans',
      '  • blog         - Read latest insights',
      '  • status       - Check system status',
      '  • contact      - Get in touch',
      '  • help         - Show this help message',
      '',
      'Tips:',
      '  • Type to search across all content',
      '  • Use ↑↓ arrows to navigate',
      '  • Press Enter to select',
      '  • Press ESC to close',
    ],
  },
  investigate: {
    title: 'Incident Investigation',
    content: [
      'AI4Bharat Autonomous Agent',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '[ACTIVE] Monitoring production environments',
      'Observability integrations: Datadog, PagerDuty, GitHub',
      '',
      '❯ investigate',
      'Initiating incident investigation...',
      '',
      'To start an investigation:',
      '  1. Go to /documentation',
      '  2. Follow the Quick Start Guide',
      '  3. Connect your observability tools',
      '  4. Let AI4Bharat detect and diagnose incidents',
      '',
      'Key Features:',
      '  • Automated root cause analysis',
      '  • Cross-referencing deployment history',
      '  • Schema change correlation',
      '  • Autonomous remediation suggestions',
      '  • One-click PR generation',
    ],
  },
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalKey, setTerminalKey] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(() => new Fuse(searchData, {
    keys: [
      { name: 'title', weight: 2.5 },
      { name: 'description', weight: 1 },
      { name: 'category', weight: 0.5 },
      { name: 'command', weight: 2 },
    ],
    threshold: 0.35,
    includeScore: true,
    minMatchCharLength: 1,
  }), []);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setShowTerminal(false);
    setTerminalKey('');

    const cmd = searchQuery.toLowerCase().trim();
    
    if (cmd === 'help') {
      setShowTerminal(true);
      setTerminalKey('help');
      setResults([]);
      return;
    }
    
    if (cmd === 'investigate') {
      setShowTerminal(true);
      setTerminalKey('investigate');
      setResults([]);
      return;
    }

    if (searchQuery.trim().length >= 1) {
      setIsLoading(true);
      setTimeout(() => {
        const searchResults = fuse.search(searchQuery).slice(0, 10).map(r => r.item);
        setResults(searchResults);
        setSelectedIndex(0);
        setIsLoading(false);
      }, 30);
    } else {
      setResults([]);
    }
  }, [fuse]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    let totalItems = 0;
    if (showTerminal) {
      totalItems = 0; // Terminal is display only
    } else if (results.length > 0) {
      totalItems = results.length;
    } else {
      totalItems = 8; // 4 quick commands + 4 quick links
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, totalItems - 1));
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (showTerminal && terminalKey) {
        if (terminalKey === 'help') {
          window.location.href = '/support';
        } else if (terminalKey === 'investigate') {
          window.location.href = '/documentation';
        }
      } else if (results.length > 0 && results[selectedIndex]) {
        onClose();
        window.location.href = results[selectedIndex].path;
      } else if (query.trim() === '') {
        // Quick commands (0-3) and Quick links (4-7)
        const links = [
          '/documentation', // investigate
          '/documentation', // docs
          '/support',       // help
          '/status',        // status
          '/documentation', // Documentation
          '/blog',          // Blog
          '/changelog',     // Changelog
          '/support',       // Support
        ];
        onClose();
        window.location.href = links[selectedIndex] || '/documentation';
      }
    }
  }, [isOpen, results, selectedIndex, onClose, showTerminal, terminalKey, query]);

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
      setShowTerminal(false);
      setTerminalKey('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const termContent = terminalOutput[terminalKey];

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <div className="search-prompt">
            <span className="prompt-symbol">❯</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
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
          {showTerminal && termContent ? (
            <div className="terminal-output">
              <div className="terminal-header">
                <span className="terminal-title-text">{termContent.title}</span>
              </div>
              <div className="terminal-content">
                {termContent.content.map((line, i) => (
                  <div key={i} className="terminal-line">{line || '\u00A0'}</div>
                ))}
              </div>
              <div className="terminal-footer-hint">
                Press <kbd>Enter</kbd> to continue or <kbd>ESC</kbd> to close
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="search-results">
              <div className="search-section-title">
                {query.startsWith('/') ? 'Commands' : 'Search Results'}
              </div>
              {results.map((result, index) => {
                const config = typeConfig[result.type] || typeConfig.docs;
                return (
                  <Link
                    key={`${result.title}-${index}`}
                    href={result.path}
                    className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={onClose}
                  >
                    <div className="search-result-icon" style={{ background: config.bg, color: config.color }}>
                      {result.type === 'cmd' ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                          <path d="M14 2v6h6"/>
                        </svg>
                      )}
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
          ) : query.length >= 1 && !isLoading ? (
            <div className="search-empty">
              <div className="search-empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <p className="search-empty-title">No results found</p>
              <p className="search-empty-desc">Try typing "help" or "investigate" for commands</p>
            </div>
          ) : (
            <div className="search-suggestions">
              <div className="search-section-title">Quick Commands</div>
              <Link 
                href="/documentation" 
                className={`search-suggestion-item ${selectedIndex === 0 ? 'selected' : ''}`} 
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(0)}
              >
                <div className="search-suggestion-icon" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
                  </svg>
                </div>
                <div className="search-suggestion-content">
                  <span className="search-suggestion-title">investigate</span>
                  <span className="search-suggestion-desc">Start AI-powered incident investigation</span>
                </div>
              </Link>
              <Link 
                href="/documentation" 
                className={`search-suggestion-item ${selectedIndex === 1 ? 'selected' : ''}`} 
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(1)}
              >
                <div className="search-suggestion-icon" style={{ background: 'rgba(249,115,22,0.1)', color: 'var(--accent)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <path d="M14 2v6h6"/>
                  </svg>
                </div>
                <div className="search-suggestion-content">
                  <span className="search-suggestion-title">docs</span>
                  <span className="search-suggestion-desc">Open documentation and guides</span>
                </div>
              </Link>
              <Link 
                href="/support" 
                className={`search-suggestion-item ${selectedIndex === 2 ? 'selected' : ''}`} 
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(2)}
              >
                <div className="search-suggestion-icon" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                </div>
                <div className="search-suggestion-content">
                  <span className="search-suggestion-title">help</span>
                  <span className="search-suggestion-desc">Get help and support</span>
                </div>
              </Link>
              <Link 
                href="/status" 
                className={`search-suggestion-item ${selectedIndex === 3 ? 'selected' : ''}`} 
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(3)}
              >
                <div className="search-suggestion-icon" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <div className="search-suggestion-content">
                  <span className="search-suggestion-title">status</span>
                  <span className="search-suggestion-desc">Check system status and uptime</span>
                </div>
              </Link>
              
              <div className="search-section-title" style={{ marginTop: '16px' }}>Quick Links</div>
              
              <Link 
                href="/documentation" 
                className={`search-suggestion-item ${selectedIndex === 4 ? 'selected' : ''}`} 
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(4)}
              >
                <div className="search-suggestion-icon" style={{ background: 'rgba(249,115,22,0.1)', color: 'var(--accent)' }}>
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
              <Link 
                href="/blog" 
                className={`search-suggestion-item ${selectedIndex === 5 ? 'selected' : ''}`} 
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(5)}
              >
                <div className="search-suggestion-icon" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                  </svg>
                </div>
                <div className="search-suggestion-content">
                  <span className="search-suggestion-title">Blog</span>
                  <span className="search-suggestion-desc">Latest insights and updates</span>
                </div>
              </Link>
              <Link 
                href="/changelog" 
                className={`search-suggestion-item ${selectedIndex === 6 ? 'selected' : ''}`} 
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(6)}
              >
                <div className="search-suggestion-icon" style={{ background: 'rgba(168,85,247,0.1)', color: '#a855f7' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="search-suggestion-content">
                  <span className="search-suggestion-title">Changelog</span>
                  <span className="search-suggestion-desc">Recent product updates</span>
                </div>
              </Link>
              <Link 
                href="/support" 
                className={`search-suggestion-item ${selectedIndex === 7 ? 'selected' : ''}`} 
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(7)}
              >
                <div className="search-suggestion-icon" style={{ background: 'rgba(236,72,153,0.1)', color: '#ec4899' }}>
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
