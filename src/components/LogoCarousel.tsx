'use client';
import { useState } from 'react';
import Image from 'next/image';

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
        <Image
          src={logo.path!}
          alt={logo.name}
          onError={() => setHasError(true)}
          fill
          sizes="200px"
          style={imgStyle}
        />
      )}
    </div>
  );
}

export default function LogoCarousel() {
  const logos: LogoEntry[] = [
    {
      name: "NTT data",
      path: "/asset/nttdata.png",
      imgStyle: { clipPath: 'inset(0 6% 0 5.5%)', transform: 'scale(1.08)' },
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
      name: "Santen pharmaceuticals",
      path: "/asset/complogo/Screenshot 2026-04-03 215552.png",
      imgStyle: { clipPath: 'inset(0 6% 0 5.5%)', transform: 'scale(1.08)' },
    },
    {
      name: "Lancesoft",
      path: "/asset/complogo/Screenshot 2026-04-03 215631.png",
      imgStyle: { clipPath: 'inset(0 6% 0 6%)', transform: 'scale(1.08)' },
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
