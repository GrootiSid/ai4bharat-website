'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ModalRoot from '@/components/ModalRoot';
import { useModalStore } from '@/store/useModalStore';
import Link from 'next/link';

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openCheckout, openContactSales } = useModalStore();

  const tiers = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small teams getting started with AI-powered incident response.',
      price: '$299',
      period: 'per month',
      features: [
        'Up to 5 services',
        '1,000 incident minutes/month',
        'Basic root cause analysis',
        'Email support',
        '7-day incident history',
        'Standard integrations'
      ],
      cta: 'Start Free Trial',
      ctaType: 'trial',
      featured: false
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For growing engineering teams that need advanced automation and faster resolution.',
      price: '$899',
      period: 'per month',
      features: [
        'Up to 25 services',
        '10,000 incident minutes/month',
        'Advanced root cause analysis',
        'Priority Slack support',
        '90-day incident history',
        'All integrations',
        'Custom dashboards',
        'Team collaboration'
      ],
      cta: 'Start Free Trial',
      ctaType: 'trial',
      featured: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations requiring custom deployment, compliance, and dedicated support.',
      price: 'Custom',
      period: 'Contact us for pricing',
      features: [
        'Unlimited services',
        'Unlimited incident minutes',
        'Full autonomous remediation',
        'Dedicated support engineer',
        'Unlimited incident history',
        'Self-hosted deployment',
        'SOC 2 Type II compliance',
        'Custom integrations',
        'SLA guarantees',
        'On-premise training'
      ],
      cta: 'Contact Sales',
      ctaType: 'sales',
      featured: false
    }
  ];

  const faqs = [
    {
      question: 'How does the free trial work?',
      answer: 'You get full access to all Pro features for 14 days. No credit card required. At the end of your trial, you can choose to continue with a paid plan or downgrade to a free tier.'
    },
    {
      question: 'What counts as an "incident minute"?',
      answer: 'An incident minute is any minute where AI4Bharat is actively processing, analyzing, or working on an active incident. Idle time between incidents does not count.'
    },
    {
      question: 'Can I switch between plans?',
      answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the change takes effect at the start of your next billing cycle."
    },
    {
      question: 'Do you offer discounts for startups or non-profits?',
      answer: 'Yes! We offer 50% off for qualifying startups (under 2 years old, under $1M funding) and non-profit organizations. Contact our sales team with proof of eligibility.'
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pricing-page">
        <section className="pricing-hero">
          <div className="container">
            <span className="section-label">Pricing</span>
            <h1 className="display-xl gradient-text">Simple, transparent pricing</h1>
            <p className="body-lg" style={{ maxWidth: '540px', margin: '16px auto 0' }}>
              Choose the plan that fits your team. All plans include a 14-day free trial with full access to Pro features.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="pricing-grid">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`pricing-card ${tier.featured ? 'featured' : ''}`}
                >
                  <span className="pricing-tier">{tier.name}</span>
                  <h3>{tier.name}</h3>
                  <p>{tier.description}</p>
                  
                  <div className="pricing-price">
                    <div className="pricing-amount">
                      {tier.price}
                      {tier.price !== 'Custom' && <span>/mo</span>}
                    </div>
                    <div className="pricing-period">{tier.period}</div>
                  </div>

                  <ul className="pricing-features">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="pricing-feature">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="pricing-cta">
                    {tier.ctaType === 'trial' ? (
                      <button
                        className={`btn ${tier.featured ? 'btn-primary' : 'btn-outline'} btn-lg`}
                        style={{ width: '100%' }}
                        onClick={() => openCheckout({ id: tier.id, name: tier.name, price: tier.price, period: tier.period })}
                      >
                        {tier.cta}
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline btn-lg"
                        style={{ width: '100%' }}
                        onClick={() => openContactSales()}
                      >
                        {tier.cta}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <div className="section-header center">
              <span className="section-label">FAQ</span>
              <h2 className="display-md gradient-text">Common questions</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${openFaq === index ? 'open' : ''}`}
                >
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                    <span className="faq-q-text">{faq.question}</span>
                    <span className="faq-icon">
                      <svg className="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </span>
                  </button>
                  <div className="faq-content">
                    <div className="faq-a">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="features-cta">
          <div className="container">
            <div className="cta-card">
              <h2 className="display-md gradient-text">Still have questions?</h2>
              <p>Our team is here to help you find the right plan and answer any questions about AI4Bharat.</p>
              <div className="cta-buttons">
                <button className="btn btn-primary btn-lg" onClick={() => openContactSales()}>Talk to Sales</button>
                <Link href="/features" className="btn btn-outline btn-lg">View Features</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modals rendered here, above everything */}
      <ModalRoot />
    </>
  );
}
