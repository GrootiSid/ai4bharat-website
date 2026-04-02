'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function BriefingForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: ''
  });

  useEffect(() => {
    const interest = searchParams.get('interest');
    if (interest) {
      setFormData(prev => ({
        ...prev,
        message: `I'm interested in joining the private alpha for ${interest}. Please provide more technical details on deployment and prerequisites.`
      }));
    }
  }, [searchParams]);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="auth-card reveal in" style={{ maxWidth: '520px', position: 'relative' }}>
      <Link href="/" className="auth-close" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </Link>
      <div className="auth-header">
        <h1>Request a Briefing</h1>
        <p>Connect with our enterprise team for a tailored platform walkthrough and ROI assessment.</p>
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
          <h2 style={{ marginBottom: '12px' }}>Request Received</h2>
          <p style={{ color: 'var(--text-2)', marginBottom: '24px' }}>
            Thank you, {formData.name.split(' ')[0] || 'there'}. Our enterprise team will contact you at <strong>{formData.email}</strong> within one business day to schedule your briefing.
          </p>
          <Link href="/" className="btn btn-outline" style={{ width: '100%' }}>Return to homepage</Link>
        </div>
      ) : (
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
              <label htmlFor="email">Work Email</label>
              <input 
                type="email" id="email" required className="auth-input" placeholder="jane@company.com" 
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="auth-grid">
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input 
                type="text" id="company" required className="auth-input" placeholder="Acme Corp" 
                value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Job Title</label>
              <input 
                type="text" id="role" required className="auth-input" placeholder="VP of Engineering" 
                value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">How can AI4Bharat help?</label>
            <textarea 
              id="message" rows={4} className="auth-input" 
              style={{ resize: 'vertical' }}
              placeholder="Tell us about your infrastructure, incident volume, and current observability stack..."
              value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'} style={{ width: '100%', marginTop: '8px' }}>
            {status === 'loading' ? 'Submitting request...' : 'Schedule Briefing'}
          </button>
        </form>
      )}
    </div>
  );
}

export default function RequestBriefingPage() {
  return (
    <>
      <Navbar />
      <main className="auth-wrapper" style={{ paddingTop: '120px' }}>
        <div className="auth-glow"></div>
        <Suspense fallback={<div className="auth-card">Loading...</div>}>
          <BriefingForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
