'use client';

import { useState } from 'react';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      q: "How does AI4Bharat integrate with our existing incident response workflow?",
      a: "AI4Bharat integrates at the alert layer — connecting to PagerDuty, Opsgenie, or VictorOps as a new responder. When an alert fires, the agent receives it simultaneously with your on-call engineer and begins investigation immediately. Your existing workflows, runbooks, and escalation paths remain unchanged."
    },
    {
      q: "What is the data handling model? Does our source code leave our environment?",
      a: "We offer two deployment models. In our cloud deployment, code context is processed ephemerally and never retained beyond the active investigation session. In our self-hosted deployment, all processing occurs within your infrastructure perimeter."
    },
    {
      q: "What categories of incidents can the platform resolve autonomously?",
      a: "The platform achieves full autonomous resolution for database performance degradation, memory and resource leaks, API timeout and latency issues, configuration drift, dependency failures, and common security vulnerabilities."
    },
    {
      q: "What is the accuracy and acceptance rate of generated remediation?",
      a: "Across our production customer base, 83% of AI4Bharat-generated pull requests are approved and merged with no modifications. An additional 12% require minor adjustments."
    },
    {
      q: "Is the platform language and framework agnostic?",
      a: "Yes. The platform's reasoning layer operates across all major languages and frameworks. Current production deployments include Python, TypeScript, Go, Java, Ruby, and Rust."
    },
    {
      q: "What happens when the agent cannot fully resolve an incident?",
      a: "The agent escalates with a structured investigation brief: confirmed root cause hypotheses, evidence gathered, remediation options evaluated, and recommended next steps."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header center">
          <h2 className="display-md gradient-text">Frequently asked questions</h2>
          <p className="body-lg">Technical and commercial questions from engineering and procurement teams.</p>
        </div>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <button className="faq-q" onClick={() => toggleFaq(index)}>
                {item.q}
                <svg className="faq-chevron" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4.5 6.75L9 11.25l4.5-4.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="faq-contact">
          <p>Technical or commercial questions not addressed here?</p>
          <a href="mailto:enterprise@ai4bharat.ai" className="link-arrow">Contact our enterprise team →</a>
        </div>
      </div>
    </section>
  );
}
