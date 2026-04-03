'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const tutorials = [
  {
    id: 'getting-started',
    title: 'Getting Started with AI4Bharat',
    description: 'Learn the basics of AI4Bharat and how to set up your first automated incident response workflow.',
    thumbnail: '🚀',
    duration: '15 min',
    level: 'Beginner',
    category: 'Basics',
    lessons: 5,
    completed: false
  },
  {
    id: 'incident-response',
    title: 'Automated Incident Response',
    description: 'Configure AI4Bharat to automatically detect, diagnose, and resolve incidents without human intervention.',
    thumbnail: '🔧',
    duration: '25 min',
    level: 'Intermediate',
    category: 'Workflows',
    lessons: 8,
    completed: false
  },
  {
    id: 'pagerduty-setup',
    title: 'PagerDuty Integration Tutorial',
    description: 'Step-by-step guide to integrating AI4Bharat with PagerDuty for seamless alert management.',
    thumbnail: '📟',
    duration: '12 min',
    level: 'Beginner',
    category: 'Integrations',
    lessons: 4,
    completed: true
  },
  {
    id: 'github-automation',
    title: 'GitHub Automation for Incidents',
    description: 'Use AI4Bharat to automatically create PRs with fixes, run tests, and merge approved changes.',
    thumbnail: '⚡',
    duration: '30 min',
    level: 'Advanced',
    category: 'Automation',
    lessons: 10,
    completed: false
  },
  {
    id: 'slack-commands',
    title: 'Mastering Slack Commands',
    description: 'Learn all the Slack commands to interact with AI4Bharat and manage incidents from any channel.',
    thumbnail: '💬',
    duration: '10 min',
    level: 'Beginner',
    category: 'Integrations',
    lessons: 3,
    completed: false
  },
  {
    id: 'datadog-monitoring',
    title: 'Advanced Datadog Monitoring',
    description: 'Configure advanced monitoring rules and correlate metrics with AI4Bharat for faster diagnostics.',
    thumbnail: '📊',
    duration: '20 min',
    level: 'Advanced',
    category: 'Monitoring',
    lessons: 6,
    completed: false
  },
  {
    id: 'self-hosted',
    title: 'Self-Hosted Deployment',
    description: 'Deploy AI4Bharat on your own infrastructure for maximum security and control.',
    thumbnail: '🏠',
    duration: '45 min',
    level: 'Advanced',
    category: 'Deployment',
    lessons: 12,
    completed: false
  },
  {
    id: 'team-onboarding',
    title: 'Onboarding Your Team',
    description: 'Best practices for introducing AI4Bharat to your engineering team and establishing workflows.',
    thumbnail: '👥',
    duration: '18 min',
    level: 'Intermediate',
    category: 'Team',
    lessons: 5,
    completed: true
  }
];

const categories = ['All', 'Basics', 'Integrations', 'Workflows', 'Automation', 'Monitoring', 'Deployment', 'Team'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const levelColors: Record<string, string> = {
  Beginner: 'feature',
  Intermediate: 'enhancement',
  Advanced: 'security'
};

export default function TutorialsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');
  const [showCompleted, setShowCompleted] = useState(false);

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = activeCategory === 'All' || tutorial.category === activeCategory;
    const matchesLevel = activeLevel === 'All' || tutorial.level === activeLevel;
    const matchesCompleted = showCompleted ? true : !tutorial.completed;
    return matchesCategory && matchesLevel && matchesCompleted;
  });

  return (
    <>
      <Navbar />
      <main className="tutorials-page">
        <section className="tutorials-hero">
          <div className="container">
            <span className="section-label">Tutorials</span>
            <h1 className="display-xl gradient-text">Learn by doing</h1>
            <p className="body-lg" style={{ maxWidth: '540px', margin: '12px auto 0' }}>
              Hands-on tutorials to help you master AI4Bharat and build powerful incident response workflows.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="tutorials-filters">
              <div className="filter-group">
                <span className="filter-label">Category:</span>
                <div className="filter-buttons">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="filter-group">
                <span className="filter-label">Level:</span>
                <div className="filter-buttons">
                  {levels.map((level) => (
                    <button
                      key={level}
                      className={`filter-btn ${activeLevel === level ? 'active' : ''}`}
                      onClick={() => setActiveLevel(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={showCompleted}
                  onChange={(e) => setShowCompleted(e.target.checked)}
                />
                <span>Show completed tutorials</span>
              </label>
            </div>

            <div className="tutorials-grid">
              {filteredTutorials.map((tutorial) => (
                <Link key={tutorial.id} href="#" className="tutorial-card">
                  <div className="tutorial-thumbnail">
                    <span>{tutorial.thumbnail}</span>
                    {tutorial.completed && (
                      <span className="tutorial-badge">Completed</span>
                    )}
                  </div>
                  <div className="tutorial-content">
                    <div className="tutorial-meta">
                      <span className={`tutorial-level ${levelColors[tutorial.level]}`}>
                        {tutorial.level}
                      </span>
                      <span className="tutorial-category">{tutorial.category}</span>
                    </div>
                    <h3>{tutorial.title}</h3>
                    <p>{tutorial.description}</p>
                    <div className="tutorial-stats">
                      <span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 6v6l4 2"/>
                        </svg>
                        {tutorial.duration}
                      </span>
                      <span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                        </svg>
                        {tutorial.lessons} lessons
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredTutorials.length === 0 && (
              <div className="tutorials-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                </svg>
                <p>No tutorials match your filters.</p>
                <button onClick={() => { setActiveCategory('All'); setActiveLevel('All'); }}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="tutorials-cta">
          <div className="container">
            <div className="cta-card">
              <h2 className="display-md gradient-text">Want to learn on your own?</h2>
              <p>Check out our documentation for detailed guides and API references.</p>
              <div className="cta-buttons">
                <Link href="/documentation" className="btn btn-primary btn-lg">View Documentation</Link>
                <Link href="/blog" className="btn btn-outline btn-lg">Read Our Blog</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
