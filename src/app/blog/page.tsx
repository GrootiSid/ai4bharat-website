'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const posts = [
  {
    id: 'ai-incident-response',
    title: 'How AI is Transforming Incident Response',
    excerpt: 'Explore how artificial intelligence is revolutionizing the way engineering teams handle production incidents, from faster diagnosis to automated remediation.',
    category: 'Engineering',
    author: { name: 'Priya Sharma', role: 'Head of AI Research' },
    date: 'March 25, 2026',
    readTime: '8 min read',
    featured: true,
    tags: ['AI', 'Incident Response', 'SRE']
  },
  {
    id: 'soc2-compliance',
    title: 'Achieving SOC 2 Compliance with AI-Powered Incident Management',
    excerpt: 'Learn how AI4Bharat helped a Fortune 500 company achieve SOC 2 Type II certification while reducing their MTTR by 80%.',
    category: 'Security',
    author: { name: 'Rajesh Kumar', role: 'Security Engineer' },
    date: 'March 20, 2026',
    readTime: '6 min read',
    featured: false,
    tags: ['SOC 2', 'Compliance', 'Security']
  },
  {
    id: 'autonomous-remediation',
    title: 'The Future of Autonomous Remediation',
    excerpt: 'A deep dive into how autonomous remediation works, the safety measures in place, and why it\'s the future of DevOps.',
    category: 'Technology',
    author: { name: 'Arjun Mehta', role: 'Principal Engineer' },
    date: 'March 15, 2026',
    readTime: '12 min read',
    featured: false,
    tags: ['Autonomous', 'Remediation', 'Future']
  },
  {
    id: 'multi-model-reasoning',
    title: 'Multi-Model Reasoning: Why One Model isn\'t Enough',
    excerpt: 'Discover why using multiple AI models together provides better accuracy and reliability for complex incident diagnosis.',
    category: 'Engineering',
    author: { name: 'Sneha Patel', role: 'ML Engineer' },
    date: 'March 10, 2026',
    readTime: '10 min read',
    featured: false,
    tags: ['AI', 'Machine Learning', 'Models']
  },
  {
    id: 'mttf-metrics',
    title: 'Measuring What Matters: MTTF vs MTTR in Modern Ops',
    excerpt: 'Why Mean Time to Failure awareness is changing how we think about incident metrics and operational excellence.',
    category: 'Operations',
    author: { name: 'Vikram Singh', role: 'Head of SRE' },
    date: 'March 5, 2026',
    readTime: '7 min read',
    featured: false,
    tags: ['Metrics', 'SRE', 'Operations']
  },
  {
    id: 'enterprise-memory',
    title: 'Enterprise Memory: Building Organizational Knowledge with AI',
    excerpt: 'How persistent semantic memory transforms isolated incident resolutions into collective organizational intelligence.',
    category: 'Product',
    author: { name: 'Ananya Desai', role: 'Product Manager' },
    date: 'February 28, 2026',
    readTime: '9 min read',
    featured: false,
    tags: ['Enterprise', 'Knowledge', 'AI']
  }
];

const categories = ['All', 'Engineering', 'Security', 'Technology', 'Operations', 'Product'];
const categoryColors: Record<string, string> = {
  Engineering: 'feature',
  Security: 'security',
  Technology: 'enhancement',
  Operations: 'enhancement',
  Product: 'feature'
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const featuredPost = posts.find(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <>
      <Navbar />
      <main className="blog-page">
        <section className="blog-hero">
          <div className="container">
            <span className="section-label">Blog</span>
            <h1 className="display-xl gradient-text">Insights & Updates</h1>
            <p className="body-lg" style={{ maxWidth: '540px', margin: '12px auto 0' }}>
              Expert perspectives on AI-powered incident response, engineering best practices, and product updates.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            {featuredPost && !featuredPost.category.includes(activeCategory) && (
              <Link href="#" className="featured-post">
                <div className="featured-badge">Featured</div>
                <div className="featured-content">
                  <span className={`post-category ${categoryColors[featuredPost.category]}`}>
                    {featuredPost.category}
                  </span>
                  <h2>{featuredPost.title}</h2>
                  <p>{featuredPost.excerpt}</p>
                  <div className="post-meta">
                    <div className="post-author">
                      <div className="author-avatar">
                        {featuredPost.author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <span className="author-name">{featuredPost.author.name}</span>
                        <span className="author-role">{featuredPost.author.role}</span>
                      </div>
                    </div>
                    <div className="post-info">
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="featured-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </Link>
            )}

            <div className="blog-filters">
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

            <div className="blog-grid">
              {regularPosts.map((post) => (
                <Link key={post.id} href="#" className="blog-card">
                  <div className="blog-card-header">
                    <span className={`post-category ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="post-tags">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="post-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="post-meta">
                    <div className="post-author">
                      <div className="author-avatar small">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="author-name">{post.author.name}</span>
                    </div>
                    <span className="post-date">{post.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="blog-subscribe">
          <div className="container">
            <div className="subscribe-card">
              <div className="subscribe-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
              </div>
              <div className="subscribe-content">
                <h2>Subscribe to our blog</h2>
                <p>Get the latest articles, tutorials, and updates delivered to your inbox.</p>
              </div>
              <form className="subscribe-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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
