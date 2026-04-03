import Terminal from './Terminal';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero" data-aos="fade-up">
      <div className="hero-glow"></div>
      <div className="container">
        <div className="badges-row">
          <span className="badge">Om Foundation Portfolio</span>
          <span className="badge">SOC 2 Type II Certified</span>
          <span className="badge">Ameritas</span>
        </div>

        <p className="hero-eyebrow">Autonomous Engineering Intelligence</p>

        <h1 className="hero-title display-xl gradient-text">
          Intelligence that acts. <br className="hide-mobile"/>Infrastructure that scales.
        </h1>

        <p className="hero-subtitle">
          AI4Bharat deploys autonomous engineering agents that detect, diagnose, and resolve production incidents — with the precision of your best engineers, at the speed of software.
        </p>

        <div className="hero-cta">
          <Link href="/briefing" className="btn btn-primary btn-lg">Request Strategic Briefing</Link>
          <Link href="#demo" className="btn btn-outline btn-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor"/>
            </svg>
            View Platform Demo
          </Link>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
