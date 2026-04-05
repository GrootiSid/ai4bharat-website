'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CTAForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');

    try {
      const response = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_email: email,
          user_name: 'Homepage Lead',
          interest: 'Waitlist signup'
        }),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          router.push(`/briefing?email=${encodeURIComponent(email)}`);
        }, 1000);
      } else {
        throw new Error('API submission failed');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      // Still redirect even if API fails to not block user
      router.push(`/briefing?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <section className="cta-section" id="access" data-aos="fade-up">
      <div className="cta-glow"></div>
      <div className="container">
        <p className="cta-mono">The operational imperative</p>
        <h2 className="cta-title display-xl gradient-text">
          Your engineers should be <br className="hide-mobile"/>building, not firefighting.
        </h2>
        <p className="cta-subtitle">Deploy the autonomous engineering agent that resolves incidents, generates verified fixes, and delivers clean pull requests — without waking anyone up.</p>
        <form className="cta-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            className="cta-email" 
            placeholder={status === 'success' ? "We'll be in touch soon" : "Enter your work email"}
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            disabled={status !== 'idle'}
            style={{ 
              background: status === 'success' ? 'var(--green)' : '' 
            }}
          >
            {status === 'loading' ? 'Joining waitlist...' : status === 'success' ? "You're on the list!" : 'Request Access'}
          </button>
        </form>
        <p className="cta-fine">No commitment required · Enterprise deployments available · Response within one business day</p>
      </div>
    </section>
  );
}
