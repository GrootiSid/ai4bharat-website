export default function Testimonials() {
  const reviews = [
    { name: "Sarah Chen", role: "VP Engineering, Series C Fintech", text: "Within 90 days of deployment, AI4Bharat autonomously resolved 68% of our P1 and P2 incidents. We reallocated the equivalent of two senior engineers entirely to product development." },
    { name: "Marcus Johnson", role: "CTO, Enterprise Infrastructure Platform", text: "Our mean time to resolution dropped from 47 minutes to under 4 minutes. The platform's ability to reason across our full observability stack is unlike anything we had evaluated." },
    { name: "Alex Rivera", role: "Principal SRE, Global Infrastructure Team", text: "AI4Bharat is not a monitoring tool or an alert router. It is the first product I have seen that genuinely operates as an autonomous engineering function — not an assistant, but an agent." }
  ];

  return (
    <section className="testimonials-section section">
      <div className="container">
        <div className="section-header center">
          <p className="hero-eyebrow">Executive Perspectives</p>
          <h2 className="display-md gradient-text">Measured outcomes from engineering leaders.</h2>
        </div>
        <div className="testimonials-grid">
          {reviews.map((r, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">{"★".repeat(5).split("").map((s, j) => <span key={j} className="star">{s}</span>)}</div>
              <p className="testimonial-text">&quot;{r.text}&quot;</p>
              <div className="testimonial-author">
                <div className="author-av">{r.name.split(' ').map(n => n[0]).join('')}</div>
                <div><div className="author-name">{r.name}</div><div className="author-role">{r.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
