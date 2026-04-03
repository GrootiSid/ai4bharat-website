'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export default function AboutSection() {
  const heritage = [
    { name: "Opendorse", type: "Tech Platform", initials: "OP" },
    { name: "Ameritas", type: "Financial Services", initials: "AM" },
    { name: "Capgemini", type: "Global Consulting", initials: "CG" },
    { name: "Coca-Cola", type: "Fortune 500", initials: "CC" },
    { name: "Marble Technologies", type: "FinTech", initials: "MT" },
    { name: "Nelnet", type: "Education Tech", initials: "NL" },
    { name: "University of Nebraska", type: "Research", initials: "UN" },
    { name: "DPA Auctions", type: "E-Commerce", initials: "DP" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const totalSlides = Math.ceil(heritage.length / itemsPerView);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(4);
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPaused, isDragging, nextSlide]);

  useEffect(() => {
    setCurrentTranslate(-currentIndex * (100 / itemsPerView) * itemsPerView);
  }, [currentIndex, itemsPerView]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setPrevTranslate(currentTranslate);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const current = e.clientX;
    const diff = current - startX;
    const trackWidth = trackRef.current?.offsetWidth || 1;
    const movePercentage = (diff / trackWidth) * 100;
    setCurrentTranslate(prevTranslate + movePercentage);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy > 10) prevSlide();
    else if (movedBy < -10) nextSlide();
    else setCurrentTranslate(prevTranslate);
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setPrevTranslate(currentTranslate);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const current = e.touches[0].clientX;
    const diff = current - startX;
    const trackWidth = trackRef.current?.offsetWidth || 1;
    const movePercentage = (diff / trackWidth) * 100;
    setCurrentTranslate(prevTranslate + movePercentage);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy > 10) prevSlide();
    else if (movedBy < -10) nextSlide();
    else setCurrentTranslate(prevTranslate);
    setIsDragging(false);
  };

  return (
    <section className="about-section section" id="about">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">The Organization</span>
          <h2 className="display-lg gradient-text">Built by System Operations Experts</h2>
          <p className="body-lg about-intro">
            AI4Bharat was founded by a team of engineers with decades of combined experience managing complex production infrastructures for industry leaders.
          </p>
        </div>

        <div className="about-pillars" data-aos="fade-up">
          <div className="about-card">
            <div className="about-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <h3>Precision Engineering</h3>
            <p>Our solutions aren't based on generic LLMs. They are built on specialized models trained on real engineering telemetry and decades of operational history.</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3>Autonomous Trust</h3>
            <p>We solve the "Black Box" problem with deterministic guardrails. Every AI action is logged, explained, and reversible by your human operators.</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <h3>Universal Scalability</h3>
            <p>Our long-term mission is to eliminate common toil across the whole stack, enabling your team to focus exclusively on high-leverage innovation.</p>
          </div>
        </div>

        <div className="about-heritage" data-aos="fade-up">
          <div className="heritage-header">
            <p className="heritage-title">Trusted by Engineering Teams At</p>
            <div className="heritage-nav">
              <button className="heritage-btn" onClick={prevSlide} aria-label="Previous">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button className="heritage-btn" onClick={nextSlide} aria-label="Next">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>

          <div 
            className="heritage-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => { setIsPaused(false); handleMouseUp(); }}
          >
            <div 
              className="heritage-carousel-inner"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                ref={trackRef}
                className="heritage-track"
                style={{ transform: `translateX(${currentTranslate}%)` }}
              >
                {heritage.map((company, i) => (
                  <div key={i} className="heritage-card">
                    <div className="heritage-icon">{company.initials}</div>
                    <div className="heritage-info">
                      <span className="heritage-name">{company.name}</span>
                      <span className="heritage-type">{company.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="heritage-dots">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                className={`heritage-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="about-vision" data-aos="fade-up">
          <div className="vision-content">
            <span className="section-label">The Larger Thesis</span>
            <p className="vision-main">Incident response is not the endpoint of our ambition — it is the entry point. We are establishing the foundational capability required to deploy an autonomous engineering function within any technology organization.</p>
            <div className="vision-divider"></div>
            <p className="about-punch">On-call automation is the wedge. The autonomous engineering organization is the vision.</p>
          </div>
          <div className="vision-accent"></div>
        </div>
      </div>
    </section>
  );
}
