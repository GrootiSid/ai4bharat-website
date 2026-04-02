'use client';

import { useState, useEffect } from 'react';

export default function SolutionSection() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Ingests alert signals from your observability stack",
    "Performs multi-source root cause analysis",
    "Synthesizes context across repositories, logs, and history",
    "Constructs and validates a targeted remediation",
    "Verifies the fix against staging infrastructure",
    "Delivers an audited, tested pull request for review"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1100);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="solution-section section" id="how-it-works" data-aos="fade-up">
      <div className="container">
        <div className="section-header">
          <span className="section-label">The Platform</span>
          <h2 className="display-lg gradient-text">End-to-end autonomous<br className="hide-mobile"/> incident resolution</h2>
          <p className="body-lg">From signal detection to verified remediation — a complete operational loop that requires no human intervention for the majority of production incidents.</p>
        </div>
        <div className="solution-grid">
          <div>
            <p className="process-tag">ai4bharat.resolution_loop</p>
            <ul className="steps-list">
              {steps.map((step, index) => (
                <li key={index} className={`step-item ${activeStep === index ? 'active' : ''}`}>
                  <span className="step-dot"></span>{step}
                </li>
              ))}
            </ul>
            <p className="solution-tagline">Operates continuously. Escalates intelligently. Documents everything.</p>
          </div>
          <div>
            <div className="not-cards">
              <div className="not-card dim">
                <span className="not-label">Not</span>
                <span className="not-text">a copilot or chatbot</span>
              </div>
              <div className="not-card dim">
                <span className="not-label">Not</span>
                <span className="not-text">a workflow automation</span>
              </div>
              <div className="not-card is-card">
                <span className="not-label is-label">Is</span>
                <span className="not-text">an autonomous execution layer</span>
              </div>
            </div>
            <p className="not-note">The complete incident lifecycle — from alert to production-ready fix — without requiring an engineer to engage.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
