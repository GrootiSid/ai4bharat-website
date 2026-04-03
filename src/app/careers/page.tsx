'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const departments = ['All', 'Engineering', 'Product', 'Design', 'Research', 'Sales', 'Operations'];
const locations = ['All', 'Remote', 'Bangalore', 'San Francisco', 'London', 'Singapore'];

const jobs = [
  {
    id: 'sr-ml-engineer',
    title: 'Senior ML Engineer - NLP',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Bangalore',
    remote: true,
    salary: '$150K - $200K',
    description: 'Build and optimize state-of-the-art NLP models for Indian languages. Work with cutting-edge AI research.',
    requirements: ['5+ years ML experience', 'PyTorch/TensorFlow', 'Distributed training systems', 'Top publications preferred'],
    posted: '2 days ago',
    applicants: 24,
    urgent: true
  },
  {
    id: 'staff-sre',
    title: 'Staff Site Reliability Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    remote: true,
    salary: '$180K - $240K',
    description: 'Own the reliability of our platform processing millions of API requests daily. Build systems that never fail.',
    requirements: ['8+ years SRE/DevOps', 'Kubernetes & Helm', 'Terraform/Ansible', 'On-call leadership experience'],
    posted: '1 week ago',
    applicants: 18,
    urgent: false
  },
  {
    id: 'product-manager-dx',
    title: 'Product Manager - Developer Experience',
    department: 'Product',
    type: 'Full-time',
    location: 'San Francisco',
    remote: true,
    salary: '$140K - $190K',
    description: 'Shape how developers interact with AI4Bharat. Own the roadmap for APIs, SDKs, and documentation.',
    requirements: ['4+ years PM experience', 'Developer tools background', 'Technical degree', 'User research skills'],
    posted: '3 days ago',
    applicants: 31,
    urgent: true
  },
  {
    id: 'senior-designer',
    title: 'Senior Product Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Remote',
    remote: true,
    salary: '$130K - $175K',
    description: 'Design interfaces that make AI explainable. Create delightful developer experiences that scale.',
    requirements: ['5+ years product design', 'Figma expert', 'Data visualization', 'Design systems experience'],
    posted: '5 days ago',
    applicants: 42,
    urgent: false
  },
  {
    id: 'research-scientist',
    title: 'AI Research Scientist',
    department: 'Research',
    type: 'Full-time',
    location: 'Bangalore',
    remote: false,
    salary: '₹40L - ₹80L',
    description: 'Push the boundaries of autonomous incident response. Publish at top venues and ship research to production.',
    requirements: ['PhD preferred', 'NLP/RL expertise', 'Publications at top venues', 'Python fluency'],
    posted: '1 week ago',
    applicants: 15,
    urgent: true
  },
  {
    id: 'enterprise-ae',
    title: 'Enterprise Account Executive',
    department: 'Sales',
    type: 'Full-time',
    location: 'San Francisco',
    remote: false,
    salary: '$120K + $120K OTE',
    description: 'Close Fortune 500 deals. Help enterprises transform incident response with AI4Bharat.',
    requirements: ['5+ years enterprise SaaS', '$1M+ quota attainment', 'Technical sales experience', 'MEDDIC certified'],
    posted: '2 weeks ago',
    applicants: 27,
    urgent: false
  },
  {
    id: 'backend-platform',
    title: 'Backend Engineer - Platform',
    department: 'Engineering',
    type: 'Full-time',
    location: 'London',
    remote: true,
    salary: '£100K - £140K',
    description: 'Build the scalable backend powering AI4Bharat services. Work on APIs, data pipelines, and real-time systems.',
    requirements: ['4+ years backend', 'Go/Python proficiency', 'PostgreSQL/Redis', 'gRPC/REST API design'],
    posted: '4 days ago',
    applicants: 19,
    urgent: false
  },
  {
    id: 'devrel-engineer',
    title: 'Developer Relations Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    remote: true,
    salary: '$110K - $150K',
    description: 'Be the voice of developers. Create technical content, tutorials, and build a thriving community.',
    requirements: ['3+ years DevRel', 'Technical writing portfolio', 'Public speaking', 'API expertise'],
    posted: '1 week ago',
    applicants: 33,
    urgent: false
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer - Dashboard',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Bangalore',
    remote: true,
    salary: '₹30L - ₹50L',
    description: 'Build reactive dashboards using React and TypeScript. Create performant, accessible interfaces.',
    requirements: ['4+ years frontend', 'React/TypeScript expert', 'Data visualization libs', 'Web performance optimization'],
    posted: '6 days ago',
    applicants: 45,
    urgent: false
  },
  {
    id: 'security-engineer',
    title: 'Security Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    remote: true,
    salary: '$140K - $190K',
    description: 'Own security across our platform. Conduct penetration testing and ensure SOC 2 compliance.',
    requirements: ['5+ years security', 'Cloud security (AWS/GCP)', 'SOC 2 knowledge', 'Python/Go scripting'],
    posted: '1 week ago',
    applicants: 12,
    urgent: true
  }
];

const benefits = [
  { icon: '🌍', title: 'Remote-First Culture', desc: 'Work from anywhere in the world' },
  { icon: '💰', title: 'Competitive Compensation', desc: 'Top 90th percentile + equity' },
  { icon: '🏥', title: 'Premium Healthcare', desc: 'Medical, dental, vision covered 100%' },
  { icon: '📚', title: 'Learning Budget', desc: '$3,000/year for growth' },
  { icon: '🏖️', title: 'Unlimited PTO', desc: 'Take time when you need it' },
  { icon: '🖥️', title: 'Home Office Setup', desc: '$2,500 budget + $150/mo stipend' },
  { icon: '🤝', title: 'Team Offsites', desc: 'Twice yearly, all expenses covered' },
  { icon: '👶', title: 'Parental Leave', desc: '16 weeks fully paid' }
];

const values = [
  { icon: '🎯', title: 'Mission-Driven', desc: 'Solving problems that matter' },
  { icon: '🚀', title: 'Move Fast', desc: 'Ship quickly, learn faster' },
  { icon: '🤝', title: 'Transparent', desc: 'Open communication culture' },
  { icon: '🌱', title: 'Grow Together', desc: 'Invest in each other' }
];

const testimonials = [
  { quote: 'I\'ve shipped more impactful ML models here in 18 months than in 5 years at my previous job. The infrastructure is unmatched.', name: 'Priya S.', role: 'ML Engineer' },
  { quote: 'The autonomy is incredible. I decide how to solve problems, and leadership trusts my judgment. It\'s how engineering should be.', name: 'Alex C.', role: 'Senior Engineer' },
  { quote: 'Best hiring bar I\'ve experienced. Everyone is exceptionally talented and genuinely nice to work with.', name: 'Marcus J.', role: 'Engineering Manager' }
];

const process = [
  { step: '01', title: 'Apply', desc: 'Submit your application' },
  { step: '02', title: 'Phone Screen', desc: '30-min conversation' },
  { step: '03', title: 'Technical', desc: 'Skills assessment' },
  { step: '04', title: 'Team Fit', desc: 'Meet the team' },
  { step: '05', title: 'Final', desc: 'Leadership chat' },
  { step: '06', title: 'Offer', desc: '48-hour turnaround' }
];

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState('All');
  const [activeLocation, setActiveLocation] = useState('All');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchesDept = activeDept === 'All' || job.department === activeDept;
    const matchesLocation = activeLocation === 'All' || 
      job.location === activeLocation || 
      (activeLocation === 'Remote' && job.remote);
    return matchesDept && matchesLocation;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail('');
  };

  return (
    <>
      <Navbar />
      <main className="careers-page">
        {/* Hero */}
        <section className="careers-hero">
          <div className="hero-bg-gradient"></div>
          <div className="container">
            <div className="hero-badge">
              <span className="pulse"></span>
              Actively Hiring
            </div>
            <h1 className="display-xl gradient-text">Build the future of AI</h1>
            <p className="hero-subtitle">
              Join a team of exceptional engineers, researchers, and builders working on one of the most impactful problems in technology.
            </p>
            <div className="hero-metrics">
              <div className="metric">
                <span className="metric-value">85+</span>
                <span className="metric-label">Team Members</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric">
                <span className="metric-value">12</span>
                <span className="metric-label">Countries</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric">
                <span className="metric-value">4.8</span>
                <span className="metric-label">Glassdoor Rating</span>
              </div>
            </div>
            <div className="hero-actions">
              <a href="#open-roles" className="btn btn-primary btn-lg">
                View Open Roles
              </a>
              <Link href="/about" className="btn btn-outline btn-lg">
                About Us
              </Link>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="values-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Our Culture</span>
              <h2 className="display-md gradient-text">What we believe</h2>
            </div>
            <div className="values-grid">
              {values.map((v, i) => (
                <div key={i} className="value-item">
                  <span className="value-icon">{v.icon}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="benefits-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Compensation & Benefits</span>
              <h2 className="display-md gradient-text">We take care of our people</h2>
            </div>
            <div className="benefits-grid">
              {benefits.map((b, i) => (
                <div key={i} className="benefit-item">
                  <span className="benefit-icon">{b.icon}</span>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="process-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Hiring Process</span>
              <h2 className="display-md gradient-text">How we hire</h2>
              <p>Fast, transparent, and respectful of your time.</p>
            </div>
            <div className="process-track">
              {process.map((p, i) => (
                <div key={i} className="process-step">
                  <div className="step-marker">
                    <span className="step-number">{p.step}</span>
                  </div>
                  <div className="step-content">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">Team Voices</span>
              <h2 className="display-md gradient-text">Hear from the team</h2>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="quote-icon">&ldquo;</div>
                  <p className="quote-text">{t.quote}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.name}</div>
                    <div className="author-info">
                      <span className="author-name">{t.name}</span>
                      <span className="author-role">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section id="open-roles" className="roles-section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-label">Open Positions</span>
                <h2 className="display-md gradient-text">Find your role</h2>
              </div>
              <span className="roles-count">{filteredJobs.length} positions</span>
            </div>

            <div className="filter-bar">
              <div className="filter-group">
                <span className="filter-label">Department</span>
                <div className="filter-pills">
                  {departments.map(d => (
                    <button
                      key={d}
                      className={`filter-pill ${activeDept === d ? 'active' : ''}`}
                      onClick={() => setActiveDept(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <span className="filter-label">Location</span>
                <div className="filter-pills">
                  {locations.map(l => (
                    <button
                      key={l}
                      className={`filter-pill ${activeLocation === l ? 'active' : ''}`}
                      onClick={() => setActiveLocation(l)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="roles-list">
              {filteredJobs.map(job => (
                <div 
                  key={job.id} 
                  className={`role-card ${expandedJob === job.id ? 'expanded' : ''}`}
                >
                  <button 
                    className="role-header"
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  >
                    <div className="role-info">
                      <div className="role-title-row">
                        <h3>{job.title}</h3>
                        {job.urgent && <span className="urgent-tag">Hiring Fast</span>}
                      </div>
                      <div className="role-meta">
                        <span className="role-dept">{job.department}</span>
                        <span className="meta-sep">•</span>
                        <span className="role-location">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          {job.location}
                        </span>
                        {job.remote && <span className="remote-tag">Remote</span>}
                      </div>
                    </div>
                    <div className="role-right">
                      <span className="role-salary">{job.salary}</span>
                      <span className="role-posted">{job.posted}</span>
                      <svg className={`chevron ${expandedJob === job.id ? 'rotated' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                  </button>
                  
                  {expandedJob === job.id && (
                    <div className="role-details">
                      <p className="role-desc">{job.description}</p>
                      <div className="role-requirements">
                        <h4>Requirements</h4>
                        <ul>
                          {job.requirements.map((r, i) => (
                            <li key={i}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 6L9 17l-5-5"/>
                              </svg>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="role-actions">
                        <span className="applicants-count">{job.applicants} applicants</span>
                        <Link href="/contact" className="btn btn-primary">
                          Apply for this Role
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="no-roles">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                <p>No positions match your filters</p>
                <button onClick={() => { setActiveDept('All'); setActiveLocation('All'); }}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Speculative Applications */}
        <section className="speculative-section">
          <div className="container">
            <div className="speculative-card">
              <div className="speculative-content">
                <h2>Don&apos;t see the right role?</h2>
                <p>
                  We&apos;re always looking for exceptional people. Send us your resume and tell us how you&apos;d like to contribute. We keep all applications on file.
                </p>
                <div className="speculative-actions">
                  <Link href="/contact" className="btn btn-primary btn-lg">
                    Send Your Resume
                  </Link>
                </div>
              </div>
              <div className="speculative-subscribe">
                <h3>Get job alerts</h3>
                <p>Be first to know when new positions open.</p>
                <form onSubmit={handleSubscribe} className="subscribe-form">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <section className="footer-nav">
          <div className="container">
            <div className="nav-grid">
              <Link href="/about" className="nav-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
                <span>About Us</span>
                <p>Learn our story</p>
              </Link>
              <Link href="/partners" className="nav-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span>Partners</span>
                <p>Join our ecosystem</p>
              </Link>
              <Link href="/contact" className="nav-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
                <span>Contact</span>
                <p>Get in touch</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
