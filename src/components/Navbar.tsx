'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <Image
              src="/asset/mainai4bharatlogo.png"
              alt="AI4Bharat Logo"
              width={400}
              height={100}
              style={{ objectFit: 'contain', width: '200px', height: '60px', transform: 'scale(2.4)', transformOrigin: 'center', mixBlendMode: 'screen', marginLeft: '-70px' }}
            />
          </Link>
          <ul className="nav-links">
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/integrations">Integrations</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/documentation">Docs</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/support">Support</Link></li>
          </ul>
          <div className="nav-actions">
            <Link href="/signin" className="btn btn-ghost">Sign in</Link>
            <Link href="/briefing" className="btn btn-primary">Request Briefing</Link>
          </div>
          <button
            className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
            id="hamburger"
            aria-label="Open menu"
            onClick={toggleMobileMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <Link href="/features" onClick={toggleMobileMenu}>Features</Link>
        <Link href="/integrations" onClick={toggleMobileMenu}>Integrations</Link>
        <Link href="/pricing" onClick={toggleMobileMenu}>Pricing</Link>
        <Link href="/documentation" onClick={toggleMobileMenu}>Documentation</Link>
        <Link href="/blog" onClick={toggleMobileMenu}>Blog</Link>
        <Link href="/support" onClick={toggleMobileMenu}>Support</Link>
        <div className="nav-cta-group">
          <Link href="/signin" className="btn btn-ghost" onClick={toggleMobileMenu}>Sign in</Link>
          <Link href="/briefing" className="btn btn-primary" onClick={toggleMobileMenu}>Request Briefing</Link>
        </div>
      </div>
    </>
  );
}
