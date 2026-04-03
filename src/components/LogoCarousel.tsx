'use client';
import { useState } from 'react';

interface LogoEntry {
  name: string;
  path?: string;
  textOnly?: boolean;
  noBlend?: boolean;
  imgStyle?: React.CSSProperties;
  textColor?: string;
  textStyle?: React.CSSProperties;
}

function LogoItem({ logo, set, index }: { logo: LogoEntry, set: number, index: number }) {
  const [hasError, setHasError] = useState(false);

  const imgStyle: React.CSSProperties = {
    ...(logo.noBlend ? {} : { mixBlendMode: 'multiply' as const }),
    ...(logo.imgStyle || {}),
  };

  const showText = logo.textOnly || hasError;

  return (
    <div key={`logo-${set}-${index}`} className="logo-item" title={logo.name}>
      {showText ? (
        <span style={{
          fontSize: '1rem',
          fontWeight: '800',
          letterSpacing: '-0.02em',
          color: logo.textColor || '#111',
          textTransform: 'none',
          ...(logo.textStyle || {})
        }}>
          {logo.name}
        </span>
      ) : (
        <img
          src={logo.path}
          alt={logo.name}
          onError={() => setHasError(true)}
          loading="lazy"
          style={imgStyle}
        />
      )}
    </div>
  );
}

export default function LogoCarousel() {
  const logos: LogoEntry[] = [
    {
      name: "NTT DATA",
      path: "/asset/complogo/Screenshot 2026-04-03 215138.png",
      imgStyle: { filter: 'contrast(1.8) saturate(3)' },
    },
    {
      name: "Ralph Lauren",
      path: "/asset/complogo/Screenshot 2026-04-03 215258.png",
    },
    {
      name: "Novolex",
      path: "/asset/complogo/Screenshot 2026-04-03 215330.png",
    },
    {
      name: "Pactiv Evergreen",
      path: "/asset/complogo/Screenshot 2026-04-03 215446.png",
    },
    {
      name: "Santen",
      path: "/asset/complogo/Screenshot 2026-04-03 215552.png",
    },
    {
      name: "Lancesoft",
      path: "/asset/complogo/Screenshot 2026-04-03 215631.png",
    },
    {
      name: "Ameritas",
      path: "/asset/complogo/Screenshot 2026-04-03 215714.png",
    },
    {
      // NVIDIA Inception program screenshot was low quality - use styled text fallback
      name: "NVIDIA Inception",
      textOnly: true,
      textColor: '#76b900', // NVIDIA green
      textStyle: { fontSize: '1.1rem', fontWeight: '900', letterSpacing: '-0.03em' },
    },
    {
      name: "Forum Ventures",
      path: "/asset/complogo/Screenshot 2026-04-03 215852.png",
    },
    {
      name: "DPA Auctions",
      path: "/asset/complogo/Screenshot 2026-04-03 215927.png",
    },
    {
      // Dedalus Labs screenshot was a company profile page - use styled text
      name: "Dedalus Labs",
      textOnly: true,
      textColor: '#c8a832', // Dedalus gold
      textStyle: { fontSize: '1.05rem', fontWeight: '800' },
    },
    {
      // AgentMail had white logo on black - processed but low quality
      name: "AgentMail",
      textOnly: true,
      textColor: '#1a1a1a',
      textStyle: { fontSize: '1.05rem', fontWeight: '700' },
    },
  ];

  return (
    <section className="trust-section">
      <p className="trust-label">Backed &amp; Trusted by<span>Customers, Partners, and Engineers</span></p>
      <div className="logos-track-wrapper">
        <div className="logos-track">
          {logos.map((logo, index) => <LogoItem key={`l1-${index}`} logo={logo} set={1} index={index} />)}
          {logos.map((logo, index) => <LogoItem key={`l2-${index}`} logo={logo} set={2} index={index} />)}
        </div>
      </div>
    </section>
  );
}
