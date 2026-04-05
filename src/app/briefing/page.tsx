'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBriefingStore } from '@/store/useBriefingStore';
import { useUIStore } from '@/store/useUIStore';

function BriefingForm() {
  const searchParams = useSearchParams();
  const { formData, isDirty, updateField, prefill, markSubmitted, resetForm } = useBriefingStore();
  const { showToast } = useUIStore();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Prefill from URL params (e.g. ?interest=incident-resolution&email=x@y.com)
  useEffect(() => {
    const interestParam = searchParams.get('interest');
    const emailParam = searchParams.get('email');
    if (interestParam || emailParam) {
      prefill({
        ...(emailParam ? { email: emailParam } : {}),
        ...(interestParam ? {
          interest: interestParam,
          message: `I'm interested in joining the private alpha for ${interestParam}. Please provide more technical details on deployment and prerequisites.`,
        } : {}),
      });
    }
  }, [searchParams, prefill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({ success: false, error: 'Unexpected response format' }));

      if (response.ok && data.success) {
        setStatus('success');
        markSubmitted(); // Clears the persisted form + marks as submitted
        showToast('Briefing request sent! Our team will reach out shortly.', 'success');
      } else {
        setStatus('error');
        showToast(data.error || 'Submission failed. Please check your connection.', 'error');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      showToast('Network error. Please check your connection.', 'error');
    }
  };

  return (
    <div className="auth-card reveal in" style={{ maxWidth: '560px', position: 'relative' }}>
      <Link href="/" className="auth-close" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </Link>
      <div className="auth-header">
        <h1>Request a Briefing</h1>
        <p>
          Connect with our enterprise team for a tailored platform walkthrough and ROI assessment.
          {isDirty && (
            <span style={{ display: 'block', marginTop: '8px', fontSize: '0.78rem', color: 'var(--accent)', opacity: 0.8 }}>
              ✓ Draft saved automatically
            </span>
          )}
        </p>
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
            Thank you, {formData.name.split(' ')[0] || 'there'}. Our enterprise team will contact you within one business day.
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
                value={formData.name} onChange={(e) => updateField('name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Work Email</label>
              <input 
                type="email" id="email" required className="auth-input" placeholder="jane@company.com" 
                value={formData.email} onChange={(e) => updateField('email', e.target.value)}
              />
            </div>
          </div>

          <div className="auth-grid">
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input 
                type="text" id="company" required className="auth-input" placeholder="Acme Corp" 
                value={formData.company} onChange={(e) => updateField('company', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Job Title</label>
              <input 
                type="text" id="role" required className="auth-input" placeholder="VP of Engineering" 
                value={formData.role} onChange={(e) => updateField('role', e.target.value)}
              />
            </div>
          </div>

          <div className="auth-grid">
            <div className="form-group">
              <label htmlFor="companySize">Company Size</label>
              <select 
                id="companySize" required className="auth-input"
                value={formData.companySize} onChange={(e) => updateField('companySize', e.target.value)}
              >
                <option value="" disabled hidden>Select size...</option>
                <option value="1-50">1-50 employees</option>
                <option value="51-250">51-250 employees</option>
                <option value="251-1000">251-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="interest">Primary Interest</label>
              <select 
                id="interest" required className="auth-input"
                value={formData.interest} onChange={(e) => updateField('interest', e.target.value)}
              >
                <option value="" disabled hidden>Select interest...</option>
                <option value="incident-resolution">Autonomous Incident Resolution</option>
                <option value="infra-optimization">Infrastructure Optimization</option>
                <option value="dev-productivity">Developer Productivity</option>
                <option value="custom-llm">Custom Enterprise LLMs</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cloudStack">Primary Cloud Environment</label>
            <select 
              id="cloudStack" required className="auth-input"
              value={formData.cloudStack} onChange={(e) => updateField('cloudStack', e.target.value)}
            >
              <option value="" disabled hidden>Select environment...</option>
              <option value="aws">Amazon Web Services (AWS)</option>
              <option value="gcp">Google Cloud Platform (GCP)</option>
              <option value="azure">Microsoft Azure</option>
              <option value="on-prem">On-Premises / Private Cloud</option>
              <option value="multi-cloud">Multi-Cloud</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Additional Requirements (Optional)</label>
            <textarea 
              id="message" rows={3} className="auth-input" 
              style={{ resize: 'vertical' }}
              placeholder="Tell us about your infrastructure, incident volume, or specific goals..."
              value={formData.message} onChange={(e) => updateField('message', e.target.value)}
            ></textarea>
          </div>
          
          {status === 'error' && (
            <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: '16px' }}>
              Failed to submit. Please try again.
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'} style={{ flex: 1 }}>
              {status === 'loading' ? 'Submitting request...' : 'Schedule Briefing'}
            </button>
            {isDirty && (
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-ghost"
                title="Clear saved draft"
                style={{ flexShrink: 0, padding: '0 16px' }}
              >
                Clear
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

// Global Toast component
function GlobalToast() {
  const { toast, clearToast } = useUIStore();
  if (!toast) return null;

  const colors = {
    success: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: '#22c55e' },
    error:   { bg: 'rgba(239, 68, 68, 0.1)',  border: 'rgba(239, 68, 68, 0.3)',  text: '#ef4444' },
    info:    { bg: 'rgba(249, 115, 22, 0.1)', border: 'rgba(249, 115, 22, 0.3)', text: 'var(--accent)' },
  };
  const c = colors[toast.type];

  return (
    <div
      style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
        background: c.bg, border: `1px solid ${c.border}`, borderRadius: '12px',
        padding: '14px 20px', maxWidth: '360px',
        backdropFilter: 'blur(16px)', color: c.text,
        display: 'flex', alignItems: 'center', gap: '12px',
        fontWeight: 600, fontSize: '0.9rem',
        animation: 'slideUp 0.3s ease-out',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button onClick={clearToast} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', opacity: 0.7, padding: '2px' }}>✕</button>
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
      <GlobalToast />
    </>
  );
}
