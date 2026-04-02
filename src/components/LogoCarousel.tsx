import { useState } from 'react';

function LogoItem({ logo, set, index }: { logo: any, set: number, index: number }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div key={`logo-${set}-${index}`} className="logo-item" title={logo.name}>
      {!hasError ? (
        <img 
          src={logo.path} 
          alt={logo.name} 
          onError={() => setHasError(true)}
          loading="lazy"
        />
      ) : (
        <span style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.02em' }}>{logo.name}</span>
      )}
    </div>
  );
}

export default function LogoCarousel() {
  const logos = [
    { name: "NTT Data", path: "/logos/ntt-data.png" },
    { name: "Ralph Lauren", path: "/logos/ralph-lauren.png" },
    { name: "Novolex", path: "/logos/novolex.png" },
    { name: "Pactiv Evergreen", path: "/logos/pactiv-evergreen.png" },
    { name: "Santen Pharmaceuticals", path: "/logos/santen.png" },
    { name: "Lancesoft", path: "/logos/lancesoft.png" },
    { name: "Ameritas", path: "/logos/ameritas.png" },
    { name: "NVIDIA Inception", path: "/logos/nvidia.png" },
    { name: "Forum Ventures", path: "/logos/forum-ventures.png" },
    { name: "DPA Auctions", path: "/logos/dpa-auctions.png" },
    { name: "Dedalus Labs", path: "/logos/dedalus.png" },
    { name: "AgentMail", path: "/logos/agentmail.png" }
  ];

  return (
    <section className="trust-section">
      <p className="trust-label">Backed & Trusted by<span>Customers, Partners, and Engineers</span></p>
      <div className="logos-track-wrapper">
        <div className="logos-track">
          {/* First set of logos for infinite loop */}
          {logos.map((logo, index) => <LogoItem key={`l1-${index}`} logo={logo} set={1} index={index} />)}
          {/* Duplicate set for seamless scrolling */}
          {logos.map((logo, index) => <LogoItem key={`l2-${index}`} logo={logo} set={2} index={index} />)}
        </div>
      </div>
    </section>
  );
}
