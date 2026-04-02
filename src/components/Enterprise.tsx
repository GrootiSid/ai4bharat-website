import Link from 'next/link';

export default function Enterprise() {
  const sections = [
    {
      title: "Platform Capabilities",
      items: ["Unlimited autonomous investigations", "Multi-environment monitoring", "Advanced root cause reasoning", "Automated PR generation with tests", "Incident pattern recognition and learning"]
    },
    {
      title: "Integration & Deployment",
      items: ["PagerDuty, Datadog, New Relic, Grafana", "GitHub, GitLab, Bitbucket", "Slack, Microsoft Teams, Jira", "Custom API and webhook support", "Self-hosted and air-gapped options"]
    },
    {
      title: "Security & Compliance",
      items: ["SOC 2 Type II certified", "SSO, SAML, and MFA enforcement", "Role-based access control (RBAC)", "Immutable audit logs for all agent actions", "End-to-end encryption at rest and in transit"]
    },
    {
      title: "Service & Support",
      items: ["Dedicated customer success director", "99.9% uptime SLA with financial guarantee", "Priority 24/7 engineering support", "Custom model fine-tuning on your codebase", "Executive business reviews and ROI reporting"]
    }
  ];

  return (
    <section className="enterprise-section section section-alt" id="pricing">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">Enterprise</span>
          <h2 className="display-md gradient-text">Designed for regulated, high-availability environments</h2>
          <p className="body-lg">AI4Bharat is purpose-built for organizations where reliability, compliance, and security are non-negotiable requirements.</p>
        </div>
        <div className="enterprise-cols">
          {sections.map((s, i) => (
            <div 
              key={i} 
              className="ent-col" 
              data-aos="fade-up" 
              data-aos-delay={i * 100}
            >
              <h4>{s.title}</h4>
              <ul>
                {s.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ent-cta" data-aos="fade-up">
          <h3>Ready to quantify the operational impact?</h3>
          <p>Speak with our enterprise team for a tailored assessment and ROI analysis</p>
          <Link href="/briefing" className="btn btn-primary btn-lg">Schedule Strategic Briefing</Link>
        </div>
      </div>
    </section>
  );
}
