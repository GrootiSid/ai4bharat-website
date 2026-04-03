import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Features() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  useEffect(() => {
    if (activeFeature !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeFeature]);

  const featureData = [
    {
      title: "Autonomous root cause analysis",
      description: "Multi-source diagnostic reasoning across logs, traces, metrics, and code history. Identifies root cause in seconds, not hours — without an engineer ever being paged.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2L3 6l8 4 8-4-8-4zM3 16l8 4 8-4M3 11l8 4 8-4" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Enterprise memory and context",
      description: "Persistent semantic memory across your entire incident history, codebase, and runbooks. Every resolution is informed by organizational knowledge accumulated over time.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="10" cy="10" r="7" stroke="#f97316" strokeWidth="1.75"/>
          <path d="M19 19l-3.5-3.5" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: "Audit-ready remediation",
      description: "Every fix is delivered as a documented, tested pull request with full reasoning, rollback procedure, and compliance evidence. Built for regulated industries.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M8 11l3 3 6-6" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="2" y="2" width="18" height="18" rx="4" stroke="#f97316" strokeWidth="1.75"/>
        </svg>
      )
    },
    {
      title: "Zero-trust security architecture",
      description: "SOC 2 Type II certified. Self-hosted deployment available. Air-gapped execution environments ensure your intellectual property never leaves your infrastructure perimeter.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="10" width="16" height="10" rx="2" stroke="#f97316" strokeWidth="1.75"/>
          <path d="M7 10V7a4 4 0 018 0v3" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className="features-section section" id="capabilities">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">Core Capabilities</span>
          <h2 className="display-md gradient-text">Engineered for operational excellence</h2>
          <p className="body-lg">Four foundational capabilities that together constitute a complete autonomous engineering function.</p>
        </div>
        <div className="features-grid">
          {featureData.map((f, i) => (
            <div 
              key={i} 
              className="feature-card" 
              data-aos="fade-up" 
              data-aos-delay={i * 100}
            >
              <div className="feature-icon-wrap">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
              <button onClick={() => setActiveFeature(i)} className="link-arrow" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Explore capability →
              </button>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeFeature !== null && (
          <motion.div 
            className="modal-overlay" 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px) saturate(180%)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={() => setActiveFeature(null)}
          >
            <motion.div 
              className="modal-content" 
              initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setActiveFeature(null)} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className="modal-header">
                <div className="feature-icon-wrap" style={{ width: '56px', height: '56px' }}>
                  {featureData[activeFeature].icon}
                </div>
                <h2 className="display-sm gradient-text">{featureData[activeFeature].title}</h2>
              </div>
              
              <div className="modal-body">
                <p className="body-lg">{featureData[activeFeature].description}</p>
                
                <div className="modal-details">
                  <div className="detail-item">
                    <h4>Strategic Advantage</h4>
                    <p>Deployed in production environments to automate incident response, reducing Mean Time to Resolution (MTTR) by up to 80% through verified autonomous execution.</p>
                  </div>
                  <div className="detail-item">
                    <h4>Technical Architecture</h4>
                    <p>Utilizes proprietary multi-agent reasoning models specialized in infrastructure telemetry, security compliance, and deterministic remediation pathfinding.</p>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    document.body.style.overflow = '';
                    setActiveFeature(null);
                    router.push('/briefing');
                  }}
                >
                  Request Access for Enterprise
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
