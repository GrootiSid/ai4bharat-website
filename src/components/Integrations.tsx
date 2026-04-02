'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Integrations() {
  const [prStatus, setPrStatus] = useState<'OPEN' | 'MERGING' | 'MERGED'>('OPEN');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleApprove = () => {
    setPrStatus('MERGING');
    setTimeout(() => {
      setPrStatus('MERGED');
    }, 1800);
  };

  return (
    <section className="integrations-section section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Integration Ecosystem</span>
          <h2 className="display-md gradient-text">Embedded in your operational fabric</h2>
          <p className="body-lg">AI4Bharat integrates natively with your alerting, observability, and source control infrastructure.</p>
          <a href="#" className="link-arrow">View full integration catalog →</a>
        </div>

        <div className="int-demo-grid">
          <div className="int-card">
            <div className="int-card-label">PagerDuty · Incident Response</div>
            <div className="int-alert-title">API Latency Degradation</div>
            <div className="int-alert-sub">p99 latency: 2,847ms · SLA threshold: 500ms</div>
            <div className="int-alert-id">Incident #PD-4521 · Severity: P1</div>
            <div className="int-status-row">
              <span className="status-dot dot-orange-live pulsing"></span>
              AI4Bharat agent engaged — investigating
            </div>
          </div>
          <div className="int-card">
            <div className="int-term-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
            </div>
            <div className="int-term-body">
              <span className="t-line t-green">[OK] Production cluster connected</span>
              <span className="t-line t-yellow">[ANALYZING] Processing 2,847 log events...</span>
              <span className="t-line t-red">[ROOT CAUSE] Connection pool exhaustion detected</span>
              <span className="t-line t-dim">→ Constructing remediation plan...</span>
            </div>
          </div>
          <div className="int-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span className="int-card-label gh">GitHub · Pull Request</span>
              <span className="int-avatar">TM</span>
              <span className="int-reviewer">ai4bharat-agent[bot]</span>
            </div>
            <div className="int-diff-name">src/config/database.ts</div>
            <div className="int-diff-body" style={{ opacity: prStatus === 'MERGED' ? 0.6 : 1 }}>
              <span className="int-diff-line">port: parseInt(process.env.DB_PORT || &apos;5432&apos;),</span>
              <span className={`int-diff-line ${prStatus === 'MERGED' ? '' : 'int-diff-rm'}`}>
                {prStatus === 'MERGED' ? '  pool_size: 50,' : '− pool_size: 10,'}
              </span>
              {prStatus !== 'MERGED' && <span className="int-diff-line int-diff-add">+ pool_size: 50,</span>}
              <span className="int-diff-line">connection_timeout: 30000,</span>
            </div>
            <div className="int-pr-row" style={{ marginTop: '16px' }}>
              <button 
                className="btn btn-ghost btn-sm" 
                onClick={() => setShowAnalysis(true)}
                disabled={prStatus === 'MERGING'}
              >
                View Analysis
              </button>
              <button 
                className={`btn btn-sm ${prStatus === 'MERGED' ? 'btn-ghost' : 'btn-primary'}`}
                onClick={handleApprove}
                disabled={prStatus !== 'OPEN'}
                style={{ 
                  backgroundColor: prStatus === 'MERGED' ? 'rgba(168, 85, 247, 0.1)' : '',
                  borderColor: prStatus === 'MERGED' ? '#a855f7' : '',
                  color: prStatus === 'MERGED' ? '#a855f7' : ''
                }}
              >
                {prStatus === 'OPEN' && "Approve"}
                {prStatus === 'MERGING' && "Merging..."}
                {prStatus === 'MERGED' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Merged
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAnalysis && (
          <motion.div 
            className="modal-overlay" 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px) saturate(180%)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={() => setShowAnalysis(false)}
            style={{ zIndex: 1000 }}
          >
            <motion.div 
              className="modal-content" 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '540px' }}
            >
              <button className="modal-close" onClick={() => setShowAnalysis(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className="modal-header">
                <span className="section-label">Diagnostic Analysis</span>
                <h3 className="display-sm gradient-text">Connection Pool Exhaustion</h3>
              </div>
              
              <div className="modal-body">
                <div className="analysis-chart" style={{ height: '140px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
                  {/* CSS-only Chart Simulation */}
                  <div style={{ position: 'absolute', bottom: '20px', left: '10%', right: '10%', height: '80px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                    {[20, 30, 25, 45, 80, 95, 98, 40, 35].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        style={{ flex: 1, background: h > 90 ? 'var(--red)' : h > 70 ? 'var(--orange)' : 'var(--accent)', borderRadius: '2px 2px 0 0' }}
                      />
                    ))}
                  </div>
                  <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--red)', fontSize: '0.65rem', fontWeight: 800 }}>CRITICAL·98% POOL LOAD</div>
                </div>

                <div className="analysis-summary">
                  <div className="detail-item">
                    <h4>Agent Reasoning</h4>
                    <p style={{ fontSize: '0.9rem' }}>Identified connection pool exhaustion causing P1 API latency degradation. Multi-agent reconciliation loop analyzed telemetry from PagerDuty and determined the optimal pool capacity increase to neutralize the bottleneck without CPU oversaturation.</p>
                  </div>
                  <div className="detail-item">
                    <h4>Verification Metrics</h4>
                    <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Synthetic test performed in container-0482 verified a 74% reduction in p99 latency under simulated load peak.</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setShowAnalysis(false)} style={{ width: '100%' }}>Return to Operations</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
