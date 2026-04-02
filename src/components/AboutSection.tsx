export default function AboutSection() {
  const heritage = [
    "Opendorse", "Ameritas", "Capgemini", "Coca-Cola", 
    "Marble Technologies", "Nelnet", "University of Nebraska", "DPA Auctions"
  ];

  return (
    <section className="about-section section" id="about">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">The Organization</span>
          <h2 className="display-lg gradient-text">Built by System Operations Experts</h2>
          <p className="body-lg about-intro">
            AI4Bharat was founded by a team of engineers with decades of combined experience managing complex production infrastructures for industry leaders.
          </p>
        </div>

        <div className="about-pillars" data-aos="fade-up">
          <div className="about-card">
            <div className="about-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <h3>Precision Engineering</h3>
            <p>Our solutions aren't based on generic LLMs. They are built on specialized models trained on real engineering telemetry and decades of operational history.</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3>Autonomous Trust</h3>
            <p>We solve the "Black Box" problem with deterministic guardrails. Every AI action is logged, explained, and reversible by your human operators.</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <h3>Universal Scalability</h3>
            <p>Our long-term mission is to eliminate common toil across the whole stack, enabling your team to focus exclusively on high-leverage innovation.</p>
          </div>
        </div>

        <div className="about-heritage" data-aos="fade-up">
          <p className="heritage-title">Direct Operational Background From:</p>
          <div className="logos-track-wrapper">
            <div className="logos-track">
              {/* Set 1 */}
              {heritage.map((company, i) => (
                <span key={`h1-${i}`} className="heritage-item">{company}</span>
              ))}
              {/* Set 2 (for loop) */}
              {heritage.map((company, i) => (
                <span key={`h2-${i}`} className="heritage-item">{company}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="about-vision" data-aos="fade-up">
          <div className="vision-content">
            <span className="section-label">The Larger Thesis</span>
            <p className="vision-main">Incident response is not the endpoint of our ambition — it is the entry point. We are establishing the foundational capability required to deploy an autonomous engineering function within any technology organization.</p>
            <div className="vision-divider"></div>
            <p className="about-punch">On-call automation is the wedge. The autonomous engineering organization is the vision.</p>
          </div>
          <div className="vision-accent"></div>
        </div>
      </div>
    </section>
  );
}
