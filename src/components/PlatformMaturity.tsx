'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function PlatformMaturity() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const categories = ['All', 'Production', 'In Development', 'Roadmap'];

  const items = [
    { 
      badge: "Production", 
      title: "Autonomous Incident Agent", 
      desc: "End-to-end incident investigation, remediation generation, and pull request delivery",
      detail: "Deployed across Fortune 500 SRE teams. Automates 85% of tier-1 and tier-2 production incidents with verified autonomous root-cause reasoning."
    },
    { 
      badge: "Production", 
      title: "Organizational Memory Layer", 
      desc: "Semantic retrieval across incident history, runbooks, and codebase at enterprise scale",
      detail: "Utilizes advanced RAG (Retrieval-Augmented Generation) to maintain context across 100M+ lines of code and decadal incident history."
    },
    { 
      badge: "Production", 
      title: "Enterprise Integration Suite", 
      desc: "Native connectors for PagerDuty, Datadog, GitHub, Jira, Slack, and Azure DevOps",
      detail: "Certified SOC 2 Type II connectors ensuring zero-latency data ingestion with localized governance and audit trails."
    },
    { 
      badge: "Proprietary", 
      title: "Domain Reasoning Engine", 
      desc: "In-house reasoning layer fine-tuned for software operations, outperforming general-purpose models",
      detail: "A specialized model architecture trained specifically on infrastructure telemetry and SRE playbooks, reducing hallucinations by 64%."
    },
    { 
      badge: "In Development", 
      title: "Autonomous Patch Deployment", 
      desc: "Safe, canary-tested patch deployment with automated rollback — closing the loop from PR to production",
      detail: "Currently in Private Alpha. Integrates with Spinnaker and ArgoCD to perform autonomous canary analysis before final promotion."
    },
    { 
      badge: "Roadmap", 
      title: "Python SDK & API", 
      desc: "Programmatic access to the AI4Bharat reasoning layer for custom integration and workflow embedding",
      detail: "Coming Q4. Will allow specialized platform teams to build custom agents on top of our core Infrastructure-aware LLM."
    }
  ];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.badge === activeCategory || (activeCategory === 'Production' && item.badge === 'Proprietary'));

  return (
    <section className="built-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-label">Platform Maturity</span>
            <h2 className="display-md gradient-text">Production-grade capabilities, deployed today</h2>
          </div>
          
          <div className="filter-tabs" style={{ display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                style={{
                  background: activeCategory === cat ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
                  color: activeCategory === cat ? '#fff' : 'var(--text-2)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="built-grid" style={{ minHeight: '400px' }}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div 
                layout
                key={item.title} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  y: -5, 
                  borderColor: 'var(--accent)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.4), 0 0 25px rgba(249,115,22,0.15)'
                }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                onClick={() => setSelectedItem(items.indexOf(item))}
                className="built-item"
                style={{ cursor: 'pointer' }}
              >
                <span className={`built-badge ${item.badge.toLowerCase().replace(/\s+/g, '')}`}>{item.badge}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                  <div className="built-plus">+</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <p className="built-outro">The complete autonomous engineering function.<br/>Operating while your team builds product.</p>
      </div>

      <AnimatePresence>
        {selectedItem !== null && (
          <motion.div 
            className="modal-overlay" 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={() => setSelectedItem(null)}
            style={{ zIndex: 1000 }}
          >
            <motion.div 
              className="modal-content" 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '500px' }}
            >
              <button className="modal-close" onClick={() => setSelectedItem(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className="modal-header">
                <span className={`built-badge ${items[selectedItem].badge.toLowerCase().replace(/\s+/g, '')}`}>{items[selectedItem].badge}</span>
                <h3 className="display-sm gradient-text" style={{ marginTop: '12px' }}>{items[selectedItem].title}</h3>
              </div>
              
              <div className="modal-body">
                <p className="body-lg" style={{ marginBottom: '24px' }}>{items[selectedItem].desc}</p>
                <div className="detail-box" style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px', letterSpacing: '0.05em' }}>Technical Specification</h4>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{items[selectedItem].detail}</p>
                </div>
              </div>

              <div className="modal-footer" style={{ marginTop: '24px' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%' }}
                  onClick={() => {
                    const interest = encodeURIComponent(items[selectedItem].title);
                    setSelectedItem(null);
                    router.push(`/briefing?interest=${interest}`);
                  }}
                >
                  {items[selectedItem].badge === 'Production' ? 'Request Enterprise Access' : 'Join Private Alpha'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
