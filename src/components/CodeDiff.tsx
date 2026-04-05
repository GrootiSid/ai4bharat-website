'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CodeDiff() {
  const [step, setStep] = useState(0); 
  const [isScanning, setIsScanning] = useState(false);
  const [isMerged, setIsMerged] = useState(false);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const reasonings = [
    "Implemented try/finally for deterministic connection closure, mitigating potential resource leaks in the user_service layer.",
    "Transitioned to parameterized query execution (%s) to neutralize high-risk SQL injection vectors while maintaining performance."
  ];

  const stepMessages = [
    "Vulnerability detected in user_service.py",
    "Analyzing telemetry for SQL injection signature...",
    "Synthesizing parameterized reconciliation logic...",
    "Running automated vulnerability verification...",
    "Autonomous resolution complete"
  ];

  const startScan = () => {
    if (isScanning || isMerged) return;
    setIsScanning(true);
    setStep(1);
  };

  useEffect(() => {
    if (!isScanning || step >= 4) {
      if (step >= 4) setIsScanning(false);
      return;
    }
    
    const interval = setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 1800);

    return () => clearTimeout(interval);
  }, [isScanning, step]);

  const handleMerge = () => {
    if (step === 4) {
      setIsMerged(true);
    }
  };

  const resetSimulation = () => {
    setStep(0);
    setIsScanning(false);
    setIsMerged(false);
    setHoveredLine(null);
  };

  return (
    <section className="demo-section section section-alt" id="demo">
      <div className="container">
        <div className="section-header center">
          <p className="hero-eyebrow">Autonomous Remediation Engine</p>
          <h2 className="display-md gradient-text">From vulnerability detection to verified remediation. Autonomously.</h2>
        </div>

        <div className="diff-grid reveal">
          {/* BEFORE PANE */}
          <div className="diff-pane">
            <div className="diff-pane-header">
              <span className="diff-badge before">Before — SQL injection vulnerability detected</span>
              <span className="diff-filename">user_service.py</span>
            </div>
            <pre className="diff-code">
              <span className="code-keyword">def</span> <span className="code-fn">get_user_data</span>(user_id):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;conn = db.connect()<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<motion.div 
                animate={step === 0 ? { backgroundColor: 'rgba(239, 68, 68, 0.15)', boxShadow: '0 0 15px rgba(239, 68, 68, 0.1)' } : {}}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: 'mirror' }}
                style={{ display: 'inline-block', width: '100%', borderRadius: '4px', padding: '2px 0' }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;result = conn.query(<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-str" style={{ color: step === 0 ? 'var(--red)' : 'var(--text-2)' }}>f"SELECT * FROM users WHERE id={'{'}user_id{'}'}"</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;)
              </motion.div><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;conn.close()<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> result
            </pre>
          </div>

          {/* SCAN BUTTON COLUMN */}
          <div className="diff-arrow-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <motion.button 
              className={`btn ${isMerged ? 'btn-outline' : 'btn-primary'}`}
              onClick={isMerged ? resetSimulation : startScan}
              disabled={isScanning && step < 4}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                scale: (step === 0 && !isMerged) ? [1, 1.1, 1] : 1,
                rotate: isScanning ? 360 : 0
              }}
              transition={{ 
                scale: { repeat: (step === 0 && !isMerged) ? Infinity : 0, duration: 2 },
                rotate: { repeat: isScanning ? Infinity : 0, duration: 2, ease: "linear" }
              }}
              style={{ 
                width: '52px', height: '52px', borderRadius: '50%', padding: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: (step === 0 && !isMerged) ? '0 0 25px var(--accent-glow)' : 'none',
                cursor: (isScanning && step < 4) ? 'wait' : 'pointer'
              }}
              title={isMerged ? "Reset Simulation" : "Start Autonomous Remediation"}
            >
              {isMerged ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
              ) : isScanning ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="spinning">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              )}
            </motion.button>
            <span style={{ 
              fontSize: '0.7rem', 
              color: isScanning ? 'var(--accent)' : 'var(--text-3)', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em' 
            }}>
              {isScanning ? "Fixing" : isMerged ? "Reset" : "Scan"}
            </span>
          </div>

          {/* AFTER PANE */}
          <div className="diff-pane">
            <div className="diff-pane-header">
              <span className={`diff-badge ${step >= 4 ? 'after' : ''}`} style={{ opacity: step >= 4 ? 1 : 0.3 }}>
                {step >= 4 ? "After — Parameterized query with proper resource management" : "Remediation pending..."}
              </span>
              <span className="diff-filename">user_service.py</span>
            </div>
            <pre className="diff-code" style={{ position: 'relative' }}>
              <span className="code-keyword">def</span> <span className="code-fn">get_user_data</span>(user_id):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;conn = db.connect()<br/>
              
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={step >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setHoveredLine(1)}
                onMouseLeave={() => setHoveredLine(null)}
                style={{ cursor: step >= 2 ? 'help' : 'default' }}
              >
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;try:</span><br/>
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = conn.query(</span><br/>
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"SELECT * FROM users WHERE id = %s",</span><br/>
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(user_id,)</span><br/>
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</span><br/>
              </motion.div>

              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword" style={{ opacity: step >= 2 ? 1 : 0.4 }}>return</span> <span style={{ opacity: step >= 2 ? 1 : 0.4 }}>result</span><br/>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={step >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onMouseEnter={() => setHoveredLine(0)}
                onMouseLeave={() => setHoveredLine(null)}
                style={{ cursor: step >= 3 ? 'help' : 'default' }}
              >
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;finally:</span><br/>
                <span className="diff-add">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;conn.close()</span>
              </motion.div>

              <AnimatePresence>
                {hoveredLine !== null && step >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="code-tooltip"
                    style={{
                      position: 'absolute',
                      top: hoveredLine === 1 ? '30%' : '70%',
                      left: '40px',
                      background: 'var(--bg-2)',
                      border: '1px solid var(--accent)',
                      borderRadius: '12px',
                      padding: '16px',
                      zIndex: 20,
                      maxWidth: '300px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                      pointerEvents: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                      <p style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Reasoning Loop</p>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-1)', lineHeight: 1.6 }}>{reasonings[hoveredLine]}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* EMPTY STATE PLACEHOLDER */}
              {step < 2 && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', fontStyle: 'italic' }}>
                    {isScanning ? "Synthesizing fix..." : "Awaiting scan trigger"}
                  </p>
                </div>
              )}
            </pre>
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="diff-status-bar" style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <span className={`status-dot ${isMerged ? 'dot-purple' : (isScanning || step === 4) ? 'dot-green-live' : 'dot-red'}`}></span>
            <AnimatePresence mode="wait">
              <motion.span 
                key={isMerged ? 'merged' : step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                style={{ fontWeight: 500, color: (step > 0 && step < 4) ? 'var(--text-1)' : 'var(--text-2)' }}
              >
                {isMerged ? "Resolution successfully merged to main branch" : stepMessages[step]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', opacity: step >= 4 ? 1 : 0.3 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span style={{ fontSize: '0.75rem' }}>SQLi Neutralized</span>
              </span>
              <span className="status-sep">·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span style={{ fontSize: '0.75rem' }}>Resource Safety Verified</span>
              </span>
            </div>
            
            <span className="status-sep">·</span>
            
            <button 
              className={`status-pr-tag ${isMerged ? 'merged' : ''}`} 
              onClick={handleMerge}
              disabled={step < 4 || isMerged}
              style={{ 
                background: isMerged ? 'rgba(168, 85, 247, 0.1)' : step === 4 ? 'rgba(249, 115, 22, 0.1)' : 'transparent', 
                border: isMerged ? '1px solid #a855f7' : step === 4 ? '1px solid var(--accent)' : '1px solid var(--border)', 
                cursor: step === 4 && !isMerged ? 'pointer' : 'default',
                color: isMerged ? '#a855f7' : step === 4 ? 'var(--accent)' : 'var(--text-3)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                transition: 'all 0.3s ease'
              }}
            >
              {isMerged ? "PR #2847 · MERGED" : step === 4 ? "PR #2847 · APPROVE & MERGE" : "PR #2847 · PENDING"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

