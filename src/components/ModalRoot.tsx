'use client';

import { useState, useEffect, useRef } from 'react';
import { useModalStore } from '@/store/useModalStore';
import { useUIStore } from '@/store/useUIStore';

/* ─── Checkout Steps ─── */
type CheckoutStep = 'review' | 'payment' | 'success';

function CheckoutModal() {
  const { selectedPlan, closeModal } = useModalStore();
  const { showToast } = useUIStore();
  const [step, setStep] = useState<CheckoutStep>('review');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });

  const formatCardNumber = (val: string) => {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  };
  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing — replace with real gateway call in production
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2200);
  };

  if (!selectedPlan) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && step !== 'success' && closeModal()}>
      <div className="modal-panel checkout-modal">

        {/* Step: Review */}
        {step === 'review' && (
          <>
            <div className="modal-header">
              <div>
                <p className="modal-eyebrow">Start Your Free Trial</p>
                <h2 className="modal-title gradient-text">{selectedPlan.name} Plan</h2>
              </div>
              <button className="modal-close-btn" onClick={closeModal} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="checkout-plan-summary">
              <div className="plan-summary-row">
                <span>{selectedPlan.name} Plan — 14-day free trial</span>
                <span className="plan-summary-price">$0.00</span>
              </div>
              <div className="plan-summary-divider" />
              <div className="plan-summary-row muted">
                <span>Then {selectedPlan.price}/mo after trial ends</span>
                <span>Cancel anytime</span>
              </div>
            </div>

            <div className="checkout-badges">
              <span className="checkout-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>256-bit SSL encryption</span>
              <span className="checkout-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>No charge for 14 days</span>
              <span className="checkout-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>Cancel anytime</span>
            </div>

            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }} onClick={() => setStep('payment')}>
              Continue to Payment Details →
            </button>
            <p className="checkout-legal">We collect your card details to start your trial. You won&apos;t be charged until day 15.</p>
          </>
        )}

        {/* Step: Payment */}
        {step === 'payment' && (
          <>
            <div className="modal-header">
              <div>
                <button className="modal-back-btn" onClick={() => setStep('review')}>← Back</button>
                <h2 className="modal-title gradient-text">Payment Details</h2>
              </div>
              <button className="modal-close-btn" onClick={closeModal} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Card preview */}
            <div className="card-preview">
              <div className="card-preview-top">
                <svg width="40" height="28" viewBox="0 0 40 28" fill="none"><rect width="40" height="28" rx="5" fill="rgba(255,255,255,0.08)"/><circle cx="14" cy="14" r="9" fill="rgba(249,115,22,0.6)"/><circle cx="26" cy="14" r="9" fill="rgba(255,200,0,0.4)"/></svg>
                <span className="card-preview-chip"></span>
              </div>
              <div className="card-preview-number">
                {cardData.number || '•••• •••• •••• ••••'}
              </div>
              <div className="card-preview-bottom">
                <div><span className="card-label">CARDHOLDER</span><span>{cardData.name || 'FULL NAME'}</span></div>
                <div><span className="card-label">EXPIRES</span><span>{cardData.expiry || 'MM/YY'}</span></div>
              </div>
            </div>

            <form className="auth-form" onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Cardholder Name</label>
                <input type="text" required className="auth-input" placeholder="Jane Doe"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Card Number</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" required className="auth-input" placeholder="0000 0000 0000 0000" inputMode="numeric"
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                    style={{ paddingRight: '50px' }}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', color: 'var(--text-3)', letterSpacing: '0.02em' }}>
                    {cardData.number.replace(/\s/g, '').length > 0 ? (cardData.number.replace(/\s/g, '').startsWith('4') ? 'VISA' : cardData.number.replace(/\s/g, '').startsWith('5') ? 'MC' : '•••') : ''}
                  </span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Expiry Date</label>
                  <input type="text" required className="auth-input" placeholder="MM/YY" inputMode="numeric"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>CVV</label>
                  <input type="password" required className="auth-input" placeholder="•••" maxLength={4} inputMode="numeric"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                  />
                </div>
              </div>

              <div className="checkout-badges" style={{ marginTop: '4px' }}>
                <span className="checkout-badge"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>PCI DSS Compliant</span>
                <span className="checkout-badge"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Stripe-powered</span>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={isProcessing} style={{ width: '100%', marginTop: '4px' }}>
                {isProcessing ? (
                  <div className="flex-center" style={{ gap: '10px' }}>
                    <span className="loading-spinner" style={{ width: '18px', height: '18px' }}></span>
                    Processing payment...
                  </div>
                ) : 'Start Free Trial — No Charge Today'}
              </button>
              <p className="checkout-legal">You will only be billed {selectedPlan.price}/month starting on day 15 of your trial.</p>
            </form>
          </>
        )}

        {/* Step: Success */}
        {step === 'success' && (
          <div className="checkout-success">
            <div className="success-ring">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h2 className="modal-title gradient-text">You&apos;re all set! 🎉</h2>
            <p style={{ color: 'var(--text-2)', textAlign: 'center', lineHeight: 1.6 }}>
              Your <strong>{selectedPlan.name}</strong> trial is now active. You have 14 days of full access — no charges until then.
            </p>
            <div className="success-details">
              <div className="success-detail-row">
                <span>Plan</span>
                <strong>{selectedPlan.name}</strong>
              </div>
              <div className="success-detail-row">
                <span>Trial ends</span>
                <strong>{new Date(Date.now() + 14 * 864e5).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
              </div>
              <div className="success-detail-row">
                <span>First charge</span>
                <strong>{selectedPlan.price}/mo</strong>
              </div>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => { closeModal(); showToast('Trial activated! Welcome aboard.', 'success'); }}>
              Go to Dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Contact Sales Modal ─── */
function ContactSalesModal() {
  const { closeModal } = useModalStore();
  const { showToast } = useUIStore();
  const [formData, setFormData] = useState({ name: '', email: '', company: '', employees: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      showToast('Our sales team will contact you within 24 hours.', 'success');
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div className="modal-panel contact-sales-modal">
        <div className="modal-header">
          <div>
            <p className="modal-eyebrow">Enterprise Plan</p>
            <h2 className="modal-title gradient-text">Talk to Sales</h2>
          </div>
          <button className="modal-close-btn" onClick={closeModal} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {status === 'success' ? (
          <div className="checkout-success">
            <div className="success-ring" style={{ background: 'rgba(249,115,22,0.1)', borderColor: 'rgba(249,115,22,0.3)', color: 'var(--accent)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h2 className="modal-title gradient-text">Message sent!</h2>
            <p style={{ color: 'var(--text-2)', textAlign: 'center', lineHeight: 1.6 }}>
              Thank you, <strong>{formData.name.split(' ')[0]}</strong>. A senior enterprise account executive will reach out to <strong>{formData.email}</strong> within one business day.
            </p>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }} onClick={closeModal}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="sales-perks">
              <div className="sales-perk"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>Custom pricing & volume discounts</div>
              <div className="sales-perk"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>Dedicated implementation support</div>
              <div className="sales-perk"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>SOC 2 & on-premise deployment</div>
              <div className="sales-perk"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>SLA guarantees & 24/7 support</div>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Full Name</label>
                  <input type="text" required className="auth-input" placeholder="Jane Doe"
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Work Email</label>
                  <input type="email" required className="auth-input" placeholder="jane@company.com"
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Company</label>
                  <input type="text" required className="auth-input" placeholder="Acme Corp"
                    value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Team Size</label>
                  <select required className="auth-input"
                    value={formData.employees} onChange={(e) => setFormData({ ...formData, employees: e.target.value })}>
                    <option value="" disabled hidden>Select...</option>
                    <option value="50-200">50 – 200</option>
                    <option value="200-1000">200 – 1,000</option>
                    <option value="1000-5000">1,000 – 5,000</option>
                    <option value="5000+">5,000+</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>What are you trying to solve?</label>
                <textarea required className="auth-input" rows={3} placeholder="Describe your use case, current pain points, or specific requirements..."
                  style={{ resize: 'vertical' }}
                  value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'} style={{ width: '100%', marginTop: '4px' }}>
                {status === 'loading' ? (
                  <div className="flex-center" style={{ gap: '10px' }}>
                    <span className="loading-spinner" style={{ width: '18px', height: '18px' }}></span>
                    Sending...
                  </div>
                ) : 'Contact Enterprise Sales'}
              </button>
              <p className="checkout-legal">Typically responds within 4 business hours. No spam, ever.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Modal Root ─── */
export default function ModalRoot() {
  const { activeModal } = useModalStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

  if (!activeModal) return null;
  if (activeModal === 'checkout') return <CheckoutModal />;
  if (activeModal === 'contact-sales') return <ContactSalesModal />;
  return null;
}
