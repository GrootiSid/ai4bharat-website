'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [view, setView] = useState<'signin' | 'forgot' | 'reset_success'>('signin');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('idle');
      setView('reset_success');
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <div className="auth-container">
          {/* Left Side - Branding */}
          <div className="auth-branding">
            <div className="branding-content">
              <Link href="/" className="branding-logo">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                AI4Bharat
              </Link>
              <h1>Welcome back</h1>
              <p>Sign in to access your AI-powered engineering dashboard and continue building amazing things.</p>
              
              <div className="branding-features">
                <div className="feature">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>Access your dashboards</span>
                </div>
                <div className="feature">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>Manage your API keys</span>
                </div>
                <div className="feature">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>View usage analytics</span>
                </div>
              </div>
            </div>
            <div className="branding-footer">
              <p>Trusted by 10,000+ developers worldwide</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="auth-form-section">
            <div className="auth-card">
              {status === 'success' && view === 'signin' ? (
                <div className="auth-success">
                  <div className="success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                      <path d="M22 4L12 14.01l-3-3"/>
                    </svg>
                  </div>
                  <h2>Welcome back!</h2>
                  <p>Redirecting to your dashboard...</p>
                  <Link href="/" className="btn btn-primary btn-lg">Go to Dashboard</Link>
                </div>
              ) : view === 'reset_success' ? (
                <div className="auth-success">
                  <div className="success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <path d="M22 6l-10 7L2 6"/>
                    </svg>
                  </div>
                  <h2>Check your email</h2>
                  <p>We&apos;ve sent a password reset link to <strong>{formData.email}</strong></p>
                  <button onClick={() => setView('signin')} className="btn btn-outline btn-lg">Return to Sign In</button>
                </div>
              ) : view === 'forgot' ? (
                <>
                  <div className="auth-header">
                    <h2>Reset password</h2>
                    <p>Enter your work email and we&apos;ll send you instructions to reset your password.</p>
                  </div>
                  
                  <form className="auth-form" onSubmit={handleResetPassword}>
                    <div className="form-group">
                      <label htmlFor="reset-email">Work Email</label>
                      <input 
                        type="email" 
                        id="reset-email" 
                        required 
                        placeholder="name@company.com" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    
                    <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'}>
                      {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
                    </button>

                    <button type="button" onClick={() => setView('signin')} className="back-link">
                      ← Back to sign in
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="auth-header">
                    <h2>Sign in</h2>
                    <p>Enter your credentials to access your account</p>
                  </div>

                  <form className="auth-form" onSubmit={handleSignIn}>
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input 
                        type="email" 
                        id="email" 
                        required 
                        placeholder="name@company.com" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <div className="label-row">
                        <label htmlFor="password">Password</label>
                        <button type="button" onClick={() => setView('forgot')} className="forgot-link">
                          Forgot password?
                        </button>
                      </div>
                      <div className="password-input">
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          id="password" 
                          required 
                          placeholder="Enter your password" 
                          value={formData.password} 
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <button 
                          type="button" 
                          className="toggle-password"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                              <line x1="1" y1="1" x2="23" y2="23"/>
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'}>
                      {status === 'loading' ? (
                        <span className="loading-spinner"></span>
                      ) : (
                        'Sign In'
                      )}
                    </button>
                  </form>

                  <div className="auth-divider">
                    <span>or continue with</span>
                  </div>

                  <div className="social-login">
                    <button className="social-btn google">
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </button>
                    <button className="social-btn github">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Continue with GitHub
                    </button>
                  </div>

                  <p className="auth-footer-text">
                    Don&apos;t have an account? <Link href="/signup">Create account</Link>
                  </p>
                </>
              )}
            </div>

            <p className="auth-legal">
              By signing in, you agree to our <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
