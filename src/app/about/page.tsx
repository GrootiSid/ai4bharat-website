'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const team = [
  {
    name: 'Dr. Anand Kumar',
    role: 'CEO & Co-founder',
    bio: 'Former Google AI Research Lead with 15+ years in machine learning. PhD from IIT Bombay.',
    image: 'AK'
  },
  {
    name: 'Priya Sharma',
    role: 'CTO & Co-founder',
    bio: 'Ex-Amazon Principal Engineer. Built AI systems processing 1B+ events daily.',
    image: 'PS'
  },
  {
    name: 'Rajesh Mehta',
    role: 'VP of Engineering',
    bio: 'Led SRE at Netflix. Expert in distributed systems and incident response.',
    image: 'RM'
  },
  {
    name: 'Sneha Patel',
    role: 'Head of AI Research',
    bio: 'Former OpenAI researcher. Published 20+ papers on autonomous agents.',
    image: 'SP'
  },
  {
    name: 'Vikram Singh',
    role: 'VP of Product',
    bio: 'Built products at Datadog and PagerDuty. Expert in developer tools.',
    image: 'VS'
  },
  {
    name: 'Ananya Desai',
    role: 'Head of Design',
    bio: 'Design Lead at Figma. Creating intuitive experiences for complex systems.',
    image: 'AD'
  }
];

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Reliability First',
    description: 'We build systems that engineering teams can trust with their most critical infrastructure.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Speed Matters',
    description: 'Every second of downtime costs money and customers. We optimize for speed at every layer.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: 'Transparency',
    description: 'Full visibility into every AI decision. No black boxes. No surprises.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Customer Success',
    description: 'Your success is our success. We measure ourselves by your MTTR reduction.'
  }
];

const milestones = [
  { year: '2023', title: 'Founded', description: 'AI4Bharat launched from IIT Bombay research labs.' },
  { year: '2024', title: 'Seed Round', description: 'Raised $5M from top-tier investors to accelerate development.' },
  { year: '2024', title: 'First 10 Customers', description: 'Deployed at Fortune 500 companies including finance and healthcare leaders.' },
  { year: '2025', title: 'Series A', description: 'Raised $25M to expand engineering team and product capabilities.' },
  { year: '2025', title: 'SOC 2 Certified', description: 'Achieved industry-leading security compliance for enterprise customers.' },
  { year: '2026', title: '1M+ Incidents', description: 'Resolved over 1 million production incidents across our customer base.' }
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <>
      <Navbar />
      <main className="about-page">
        <section className="about-hero">
          <div className="container">
            <span className="section-label">About Us</span>
            <h1 className="display-xl gradient-text">Building the future of incident response</h1>
            <p className="body-lg" style={{ maxWidth: '640px', margin: '16px auto 0' }}>
              AI4Bharat is on a mission to eliminate manual incident response. We believe AI should handle the repetitive, letting engineers focus on building.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="about-tabs">
              <button 
                className={`about-tab ${activeTab === 'mission' ? 'active' : ''}`}
                onClick={() => setActiveTab('mission')}
              >
                Mission
              </button>
              <button 
                className={`about-tab ${activeTab === 'story' ? 'active' : ''}`}
                onClick={() => setActiveTab('story')}
              >
                Story
              </button>
              <button 
                className={`about-tab ${activeTab === 'values' ? 'active' : ''}`}
                onClick={() => setActiveTab('values')}
              >
                Values
              </button>
            </div>

            {activeTab === 'mission' && (
              <div className="about-content">
                <h2 className="display-md">Our Mission</h2>
                <p className="body-lg">
                  To eliminate manual incident response and give engineering teams their nights and weekends back. We believe every production issue should be diagnosed in seconds, not hours.
                </p>
                <div className="mission-stats">
                  <div className="mission-stat">
                    <span className="mission-stat-value">1M+</span>
                    <span className="mission-stat-label">Incidents Resolved</span>
                  </div>
                  <div className="mission-stat">
                    <span className="mission-stat-value">80%</span>
                    <span className="mission-stat-label">MTTR Reduction</span>
                  </div>
                  <div className="mission-stat">
                    <span className="mission-stat-value">500+</span>
                    <span className="mission-stat-label">Engineering Teams</span>
                  </div>
                  <div className="mission-stat">
                    <span className="mission-stat-value">99.99%</span>
                    <span className="mission-stat-label">Platform Uptime</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'story' && (
              <div className="about-timeline">
                <h2 className="display-md">Our Journey</h2>
                <div className="timeline">
                  {milestones.map((milestone, i) => (
                    <div key={i} className="timeline-item">
                      <div className="timeline-year">{milestone.year}</div>
                      <div className="timeline-content">
                        <h3>{milestone.title}</h3>
                        <p>{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="about-values">
                <h2 className="display-md">What We Stand For</h2>
                <div className="values-grid">
                  {values.map((value, i) => (
                    <div key={i} className="value-card">
                      <div className="value-icon">{value.icon}</div>
                      <h3>{value.title}</h3>
                      <p>{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="about-team">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Our Team</span>
              <h2 className="display-md gradient-text">Meet the people building AI4Bharat</h2>
              <p className="body-lg">
                World-class engineers, researchers, and designers working to transform incident response.
              </p>
            </div>
            <div className="team-grid">
              {team.map((member, i) => (
                <div key={i} className="team-card">
                  <div className="team-avatar">{member.image}</div>
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-cta">
          <div className="container">
            <div className="cta-card">
              <h2 className="display-md gradient-text">Want to join us?</h2>
              <p>We're always looking for talented people who want to make a difference.</p>
              <div className="cta-buttons">
                <Link href="/careers" className="btn btn-primary btn-lg">View Open Positions</Link>
                <Link href="/contact" className="btn btn-outline btn-lg">Get in Touch</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
