'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUIStore } from '@/store/useUIStore';
import SearchModal from './SearchModal';

export default function Navbar() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, isSearchOpen, openSearch, closeSearch } = useUIStore();

  // Scroll detection
  useEffect(() => {
    const nav = document.getElementById('navbar');
    const handleScroll = () => {
      nav?.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) closeMobileMenu();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isMobileMenuOpen, closeMobileMenu, openSearch]);

  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <Image
              src="/asset/mainai4bharatlogo.png"
              alt="AI4Bharat Logo"
              width={400}
              height={120}
              id="navLogo"
              style={{ objectFit: 'contain', width: '240px', height: '70px', transform: 'scale(2.0)', transformOrigin: 'center', mixBlendMode: 'screen', marginLeft: '-40px' }}
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
            <button className="search-btn-icon" onClick={openSearch} aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>
            <Link href="/signin" className="btn btn-ghost">Sign in</Link>
            <Link href="/briefing" className="btn btn-primary">Request Briefing</Link>
          </div>
          <button
            className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
            id="hamburger"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        id="mobileMenu"
        aria-hidden={!isMobileMenuOpen}
      >
        <Link href="/features" onClick={closeMobileMenu}>Features</Link>
        <Link href="/integrations" onClick={closeMobileMenu}>Integrations</Link>
        <Link href="/pricing" onClick={closeMobileMenu}>Pricing</Link>
        <Link href="/documentation" onClick={closeMobileMenu}>Documentation</Link>
        <Link href="/blog" onClick={closeMobileMenu}>Blog</Link>
        <Link href="/support" onClick={closeMobileMenu}>Support</Link>
        <div className="nav-cta-group">
          <Link href="/signin" className="btn btn-ghost" onClick={closeMobileMenu}>Sign in</Link>
          <Link href="/briefing" className="btn btn-primary" onClick={closeMobileMenu}>Request Briefing</Link>
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
