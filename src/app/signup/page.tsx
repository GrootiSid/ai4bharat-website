'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="auth-wrapper">
        <div className="auth-glow"></div>
        
        <div className="auth-card">
          <Link href="/" className="auth-close" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Link>
          <div className="auth-header">
            <h1>Create account</h1>
            <p>Start your 14-day strategic trial today.</p>
          </div>

          {status === 'success' ? (
            <div className="text-center" style={{ padding: '40px 0' }}>
              <div className="flex-center" style={{ marginBottom: '20px' }}>
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '50%', 
                  background: 'var(--green-lo)', color: 'var(--green)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
                }}>✓</div>
              </div>
              <h2 style={{ marginBottom: '12px' }}>Check your email</h2>
              <p style={{ color: 'var(--text-2)', marginBottom: '24px' }}>
                We&apos;ve sent a verification link to <strong>{formData.email}</strong>.
              </p>
              <Link href="/" className="btn btn-outline" style={{ width: '100%' }}>Return Home</Link>
            </div>
          ) : (
            <>
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" id="name" required className="auth-input" placeholder="e.g. Jane Doe" 
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input 
                      type="text" id="company" required className="auth-input" placeholder="Acme Corp" 
                      value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Work Email</label>
                  <input 
                    type="email" id="email" required className="auth-input" placeholder="jane@company.com" 
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" id="password" required className="auth-input" placeholder="••••••••" 
                    value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'} style={{ width: '100%', marginTop: '8px' }}>
                  {status === 'loading' ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <div className="auth-sep" style={{ margin: '32px 0', textAlign: 'center', color: 'var(--text-3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', position: 'relative' }}>
                <span style={{ background: 'var(--bg-1)', padding: '0 12px', position: 'relative', zIndex: 2 }}>or continue with</span>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border)', zIndex: 1 }}></div>
              </div>

              <div className="social-btns">
                <button className="social-btn" type="button" style={{ 
                  width: '100%', 
                  background: 'var(--bg-2)', 
                  border: '1px solid var(--border)', 
                  borderRadius: 'var(--r-md)',
                  padding: '12px',
                  color: 'var(--text-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>
              </div>

              <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.85rem', color: 'var(--text-3)' }}>
                Already have an account? <Link href="/signin" style={{ color: 'var(--accent)', fontWeight: '700' }}>Sign in</Link>
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
