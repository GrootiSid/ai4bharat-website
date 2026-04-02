export default function TechnicalFoundation() {
  return (
    <section className="stack-section section">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">Technical Foundation</span>
          <h2 className="display-md gradient-text">Built on frontier infrastructure</h2>
          <p className="body-lg">AI4Bharat combines proprietary reasoning with best-in-class foundation models.</p>
        </div>
        <div className="stack-grid">
          <div className="stack-features">
            <div className="stack-feat reveal">
              <div className="stack-feat-icon">⚡</div>
              <div>
                <h4>Model-agnostic reasoning layer</h4>
                <p>Deploy with Claude Opus 4.6, Gemini 2.5, or your organization&apos;s private model endpoint.</p>
              </div>
            </div>
            <div className="stack-feat reveal">
              <div className="stack-feat-icon">🛡️</div>
              <div>
                <h4>Real-time operational transparency</h4>
                <p>Full observability into every agent decision, reasoning chain, and action taken. Compliance by design.</p>
              </div>
            </div>
          </div>

          <div className="yaml-card reveal">
            <div className="yaml-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="yaml-file">integrations.yaml</span>
            </div>
            <pre className="yaml-body">
              <span className="y-k">integrations:</span><br/>
              &nbsp;&nbsp;<span className="y-k">alerting:</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="y-v">- pagerduty</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="y-v">- opsgenie</span><br/>
              <span className="y-k">observability:</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="y-v">- datadog</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="y-v">- dynatrace</span>
            </pre>
            <div className="yaml-footer">
              <strong>Zero-migration deployment</strong>
              <p>Operational in hours, not weeks. No workflow disruption.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
