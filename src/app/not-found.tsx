'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="not-found-page">
        <div className="not-found-bg">
          <div className="not-found-glow"></div>
        </div>
        <div className="not-found-content">
          <div className="not-found-code">404</div>
          <h1 className="not-found-title">Page not found</h1>
          <p className="not-found-text">
            Sorry, we couldn't find the page you're looking for.
            It might have been moved or deleted.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <path d="M9 22V12h6v10"/>
              </svg>
              Back to Home
            </Link>
            <Link href="/support" className="btn btn-outline">
              Contact Support
            </Link>
          </div>
          <div className="not-found-links">
            <h3>You might be looking for:</h3>
            <ul>
              <li><Link href="/features">Features</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/documentation">Documentation</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
