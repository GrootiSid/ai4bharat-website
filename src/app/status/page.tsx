'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  { name: 'Translation API', status: 'operational', uptime: 99.99 },
  { name: 'Speech-to-Text API', status: 'operational', uptime: 99.95 },
  { name: 'Text-to-Speech API', status: 'operational', uptime: 99.98 },
  { name: 'OCR API', status: 'operational', uptime: 99.97 },
  { name: 'NLU API', status: 'operational', uptime: 99.99 },
  { name: 'Dashboard', status: 'operational', uptime: 99.99 },
  { name: 'API Status Page', status: 'operational', uptime: 99.99 },
  { name: 'Webhook Delivery', status: 'operational', uptime: 99.90 },
];

const incidents = [
  {
    id: 1,
    date: 'April 2, 2026',
    title: 'Elevated Latency - Translation API',
    status: 'resolved',
    impact: 'Minor',
    duration: '23 minutes',
    description: 'We experienced elevated latency on the Translation API between 14:30 and 14:53 UTC. The issue was caused by a database query optimization that temporarily increased response times. The issue has been resolved and response times have returned to normal.',
    updates: [
      { time: '14:53 UTC', text: 'Issue resolved. Translation API response times have returned to normal.' },
      { time: '14:45 UTC', text: 'Root cause identified. Working on a fix.' },
      { time: '14:30 UTC', text: 'Monitoring elevated latency on Translation API.' },
    ]
  },
  {
    id: 2,
    date: 'March 28, 2026',
    title: 'Scheduled Maintenance - Speech APIs',
    status: 'resolved',
    impact: 'Major',
    duration: '2 hours',
    description: 'Completed scheduled maintenance to upgrade Speech-to-Text and Text-to-Speech infrastructure. All systems are now running on the new platform with improved performance.',
    updates: [
      { time: '10:00 UTC', text: 'Maintenance completed successfully. All Speech APIs are operational.' },
      { time: '08:00 UTC', text: 'Scheduled maintenance window begins.' },
    ]
  },
];

const maintenanceWindows = [
  {
    date: 'April 15, 2026',
    time: '02:00 - 04:00 UTC',
    services: 'Dashboard, API Status Page',
    description: 'Routine infrastructure updates',
  },
];

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedIncident, setExpandedIncident] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' : 'degraded';
  const statusColors = {
    operational: { bg: 'var(--green-lo)', text: 'var(--green)', border: 'var(--green)' },
    degraded: { bg: 'var(--yellow)', text: 'var(--yellow)', border: 'var(--yellow)' },
    outage: { bg: 'var(--red-lo)', text: 'var(--red)', border: 'var(--red)' },
  };
  const statusLabels = {
    operational: 'All Systems Operational',
    degraded: 'Partial Degradation',
    outage: 'Major Outage',
  };

  return (
    <>
      <Navbar />
      <main className="status-page">
        <section className="status-hero">
          <div className="container">
            <div className="status-header">
              <div className="status-indicator" style={{ background: statusColors[overallStatus].bg }}>
                <div className="status-dot-large" style={{ background: statusColors[overallStatus].text }}></div>
              </div>
              <div>
                <h1 className="display-md">{statusLabels[overallStatus as keyof typeof statusLabels]}</h1>
                <p className="status-time">Last checked: {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="status-grid">
              <div className="status-main">
                <h2>Services</h2>
                <div className="services-list">
                  {services.map((service, i) => (
                    <div key={i} className="service-item">
                      <div className="service-info">
                        <span className={`service-status-dot ${service.status}`}></span>
                        <span className="service-name">{service.name}</span>
                      </div>
                      <div className="service-uptime">
                        <span className="uptime-value">{service.uptime}%</span>
                        <span className="uptime-label">uptime</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 style={{ marginTop: '48px' }}>Recent Incidents</h2>
                {incidents.length === 0 ? (
                  <div className="no-incidents">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <p>No incidents in the last 30 days</p>
                  </div>
                ) : (
                  <div className="incidents-list">
                    {incidents.map((incident) => (
                      <div key={incident.id} className="incident-card">
                        <button 
                          className="incident-header"
                          onClick={() => setExpandedIncident(expandedIncident === incident.id ? null : incident.id)}
                        >
                          <div className="incident-info">
                            <span className={`incident-status ${incident.status}`}>{incident.status}</span>
                            <h3>{incident.title}</h3>
                            <span className="incident-date">{incident.date}</span>
                          </div>
                          <div className="incident-meta">
                            <span className={`incident-impact ${incident.impact.toLowerCase()}`}>{incident.impact} Impact</span>
                            <span className="incident-duration">{incident.duration}</span>
                            <svg 
                              width="20" 
                              height="20" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2"
                              style={{ transform: expandedIncident === incident.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                            >
                              <path d="M6 9l6 6 6-6"/>
                            </svg>
                          </div>
                        </button>
                        {expandedIncident === incident.id && (
                          <div className="incident-details">
                            <p>{incident.description}</p>
                            <div className="incident-updates">
                              <h4>Timeline</h4>
                              {incident.updates.map((update, i) => (
                                <div key={i} className="update-item">
                                  <span className="update-time">{update.time}</span>
                                  <span className="update-text">{update.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <h2 style={{ marginTop: '48px' }}>Upcoming Maintenance</h2>
                {maintenanceWindows.length === 0 ? (
                  <div className="no-maintenance">
                    <p>No scheduled maintenance</p>
                  </div>
                ) : (
                  <div className="maintenance-list">
                    {maintenanceWindows.map((window, i) => (
                      <div key={i} className="maintenance-card">
                        <div className="maintenance-date">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          <span>{window.date}</span>
                        </div>
                        <div className="maintenance-details">
                          <h4>{window.services}</h4>
                          <p>{window.description}</p>
                          <span className="maintenance-time">{window.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="status-sidebar">
                <div className="status-card">
                  <h3>Subscribe to Updates</h3>
                  <p>Get notified about incidents and maintenance</p>
                  <form className="subscribe-form">
                    <input type="email" placeholder="your@email.com" />
                    <button type="submit" className="btn btn-primary">Subscribe</button>
                  </form>
                </div>

                <div className="status-card">
                  <h3>30-Day Uptime</h3>
                  <div className="uptime-chart">
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '98%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '99%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                    <div className="uptime-bar" style={{ height: '100%' }}></div>
                  </div>
                  <div className="uptime-stats">
                    <div className="stat">
                      <span className="stat-value">99.97%</span>
                      <span className="stat-label">Last 30 days</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">4</span>
                      <span className="stat-label">Incidents</span>
                    </div>
                  </div>
                </div>

                <div className="status-card">
                  <h3>Contact Support</h3>
                  <p>Experiencing issues? Our team is here to help.</p>
                  <a href="/support" className="btn btn-outline">Get Support</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
