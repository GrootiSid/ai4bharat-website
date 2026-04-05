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
      <Navbar />
      <main className="auth-wrapper" style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="auth-glow"></div>
        
        <div className="auth-card reveal in" style={{ maxWidth: '440px', width: '100%', position: 'relative', margin: '0 auto', padding: '32px' }}>
          <Link href="/" className="auth-close" aria-label="Close" style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--text-3)', zIndex: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Link>
          <div className="auth-header text-center" style={{ marginBottom: '32px' }}>
            <h1 className="display-sm gradient-text" style={{ marginBottom: '8px' }}>Create account</h1>
            <p style={{ color: 'var(--text-3)', fontSize: '0.95rem' }}>Start your 14-day strategic trial today.</p>
          </div>

          {status === 'success' ? (
            <div className="text-center" style={{ padding: '30px 0' }}>
              <div className="flex-center" style={{ marginBottom: '20px' }}>
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '50%', 
                  background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
                }}>✓</div>
              </div>
              <h2 className="display-sm gradient-text" style={{ marginBottom: '12px' }}>Check your email</h2>
              <p style={{ color: 'var(--text-2)', marginBottom: '24px', fontSize: '0.95rem' }}>
                We&apos;ve sent a verification link to <strong>{formData.email}</strong>.
              </p>
              <Link href="/" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Return Home</Link>
            </div>
          ) : (
            <>
              <form className="auth-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="auth-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
                    <input 
                      type="text" id="name" required className="auth-input" placeholder="Jane Doe" 
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company" style={{ display: 'block', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</label>
                    <input 
                      type="text" id="company" required className="auth-input" placeholder="Acme Corp" 
                      value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Work Email</label>
                  <input 
                    type="email" id="email" required className="auth-input" placeholder="jane@company.com" 
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
                  <input 
                    type="password" id="password" required className="auth-input" placeholder="••••••••" 
                    value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'} style={{ width: '100%', marginTop: '10px' }}>
                  {status === 'loading' ? (
                    <div className="flex-center" style={{ gap: '8px' }}>
                      <span className="loading-spinner" style={{ width: '18px', height: '18px' }}></span>
                      Creating account...
                    </div>
                  ) : 'Create Account'}
                </button>
              </form>

              <div className="auth-divider" style={{ margin: '24px 0', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.06)' }}></div>
                <span style={{ position: 'relative', background: '#0a0a0a', padding: '0 12px', fontSize: '0.7rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or continue with</span>
              </div>

              <div className="social-login">
                <button className="btn btn-ghost" type="button" style={{ 
                  width: '100%', 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid var(--border)', 
                  padding: '12px',
                  justifyContent: 'center'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
                  Google
                </button>
              </div>

              <p className="auth-footer-text" style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-3)' }}>
                Already have an account? <Link href="/signin" style={{ color: 'var(--accent)', fontWeight: '700' }}>Sign in</Link>
              </p>

              <p className="auth-legal" style={{ textAlign: 'center', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.75rem', color: 'var(--text-3)', lineHeight: 1.5 }}>
                By creating an account, you agree to our <Link href="/terms" style={{ color: 'var(--text-2)' }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: 'var(--text-2)' }}>Privacy Policy</Link>
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
