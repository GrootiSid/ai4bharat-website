'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CodeDiff() {
  const [step, setStep] = useState(0); 
  const [isMerged, setIsMerged] = useState(false);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const reasonings = [
    "Implemented try/finally for deterministic connection closure, mitigating potential resource leaks in the user_service layer.",
    "Transitioned to parameterized query execution (%s) to neutralize high-risk SQL injection vectors while maintaining performance."
  ];

  useEffect(() => {
    if (isMerged) return;
    
    const interval = setInterval(() => {
      setStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 2500);

    return () => clearInterval(interval);
  }, [isMerged]);

  const stepMessages = [
    "Analyzing telemetry for SQL injection signature...",
    "Synthesizing parameterized reconciliation logic...",
    "Running automated vulnerability verification...",
    "Autonomous resolution complete"
  ];

  const handleMerge = () => {
    if (step === 3) {
      setIsMerged(true);
    }
  };

  return (
    <section className="demo-section section section-alt" id="demo">
      <div className="container">
        <div className="section-header center">
          <p className="hero-eyebrow">Live Platform Output</p>
          <h2 className="display-md gradient-text">From vulnerability detection to verified remediation. Autonomously.</h2>
        </div>

        <div className="diff-grid reveal">
          <div className="diff-pane">
            <div className="diff-pane-header">
              <span className="diff-badge before">Before — SQL injection vulnerability detected</span>
              <span className="diff-filename">user_service.py</span>
            </div>
            <pre className="diff-code">
              <span className="code-keyword">def</span> <span className="code-fn">get_user_data</span>(user_id):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;conn = db.connect()<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<motion.div 
                animate={step === 0 ? { backgroundColor: 'rgba(239, 68, 68, 0.2)' } : {}}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: 'mirror' }}
                style={{ display: 'inline-block', width: '100%', borderRadius: '4px' }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;result = conn.query(<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-str">f"SELECT * FROM users WHERE id={'{'}user_id{'}'}"</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;)
              </motion.div><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;conn.close()<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> result
            </pre>
          </div>
          <div className="diff-arrow-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <motion.button 
              className="btn btn-primary"
              onClick={() => {
                setStep(0);
                setIsMerged(false);
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: step === 0 && !isMerged ? [1, 1.05, 1] : 1,
                opacity: 1 
              }}
              transition={{ 
                scale: { repeat: step === 0 && !isMerged ? Infinity : 0, duration: 2 },
                opacity: { duration: 0.3 }
              }}
              style={{ 
                width: '44px', height: '44px', borderRadius: '50%', padding: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: step === 0 && !isMerged ? '0 0 20px rgba(249, 115, 22, 0.4)' : 'none'
              }}
              title={isMerged ? "Restart Simulation" : "Trigger Autonomous Fix"}
            >
              {isMerged ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </motion.button>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scan</span>
          </div>
          <div className="diff-pane">
            <div className="diff-pane-header">
              <span className="diff-badge after">After — Parameterized query with proper resource management</span>
              <span className="diff-filename">user_service.py</span>
            </div>
            <pre className="diff-code" style={{ position: 'relative' }}>
              <span className="code-keyword">def</span> <span className="code-fn">get_user_data</span>(user_id):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;conn = db.connect()<br/>
              <motion.div
                initial={{ opacity: 0 }}
                animate={step >= 1 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setHoveredLine(0)}
                onMouseLeave={() => setHoveredLine(null)}
                style={{ cursor: step >= 1 ? 'help' : 'default' }}
              >
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;try:</span><br/>
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = conn.query(</span><br/>
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"SELECT * FROM users WHERE id = %s",</span><br/>
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(user_id,)</span><br/>
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</span><br/>
              </motion.div>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> result<br/>
              <motion.div
                initial={{ opacity: 0 }}
                animate={step >= 1 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onMouseEnter={() => setHoveredLine(1)}
                onMouseLeave={() => setHoveredLine(null)}
                style={{ cursor: step >= 1 ? 'help' : 'default' }}
              >
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;finally:</span><br/>
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;conn.close()</span>
              </motion.div>

              <AnimatePresence>
                {hoveredLine !== null && step >= 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="code-tooltip"
                    style={{
                      position: 'absolute',
                      top: hoveredLine === 0 ? '40%' : '80%',
                      left: '20px',
                      background: 'var(--bg-2)',
                      border: '1px solid var(--accent)',
                      borderRadius: '8px',
                      padding: '12px',
                      zIndex: 10,
                      maxWidth: '280px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                  >
                    <p style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>Agent Reasoning Loop</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-1)', lineHeight: 1.5 }}>{reasonings[hoveredLine]}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </pre>
          </div>
        </div>

        <div className="diff-status-bar">
          <span className={`status-dot ${isMerged ? 'dot-purple' : 'dot-green-live'}`}></span>
          <AnimatePresence mode="wait">
            <motion.span 
              key={isMerged ? 'merged' : step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {isMerged ? "Resolution merged successfully" : stepMessages[step]}
            </motion.span>
          </AnimatePresence>
          <span className="status-sep">·</span>
          <span>SQL injection eliminated</span>
          <span className="status-sep">·</span>
          <span>Resource leak addressed</span>
          <span className="status-sep">·</span>
          <button 
            className={`status-pr-tag ${isMerged ? 'merged' : ''}`} 
            onClick={handleMerge}
            disabled={step < 3 || isMerged}
            style={{ 
              background: 'none', 
              border: isMerged ? '1px solid #a855f7' : '1px solid var(--border)', 
              cursor: step === 3 && !isMerged ? 'pointer' : 'default',
              color: isMerged ? '#a855f7' : '' 
            }}
          >
            {isMerged ? "PR #2847 · Merged" : "PR #2847 · Awaiting approval"}
          </button>
        </div>
      </div>
    </section>
  );
}
