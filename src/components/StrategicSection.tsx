export default function StrategicSection() {
  return (
    <section className="why-section section" data-aos="fade-up">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">Strategic Rationale</span>
          <h2 className="display-md gradient-text">Why autonomous incident resolution is a tractable problem</h2>
          <p className="body-lg">On-call engineering exhibits the precise structural properties that make autonomous agent execution reliable at scale.</p>
        </div>
        <div className="chain-row">
          <div className="chain-block">
            <div className="chain-pill">Alerts</div>
            <span className="chain-sub">carry structured signals</span>
          </div>
          <span className="chain-sep">→</span>
          <div className="chain-block">
            <div className="chain-pill">Signals</div>
            <span className="chain-sub">point to bounded code</span>
          </div>
          <span className="chain-sep">→</span>
          <div className="chain-block">
            <div className="chain-pill">Code</div>
            <span className="chain-sub">produces deterministic diffs</span>
          </div>
          <span className="chain-sep">→</span>
          <div className="chain-block">
            <div className="chain-pill accent-pill">Diffs</div>
            <span className="chain-sub">become verifiable patches</span>
          </div>
        </div>
        <div className="why-copy text-center">
          <p>When the input is structured, the search space is bounded, and the output is verifiable — autonomous execution becomes not just possible, but superior to human response.</p>
          <p>General-purpose agent frameworks fail here because they optimize for breadth. AI4Bharat optimizes for depth in a single, high-value domain.</p>
          <p className="why-punch">We solve one problem completely. That is the strategic choice that makes us different.</p>
        </div>
      </div>
    </section>
  );
}
