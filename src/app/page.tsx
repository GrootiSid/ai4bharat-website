'use client';

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "@/components/Navbar";
import BlogPill from "@/components/BlogPill";
import Hero from "@/components/Hero";
import LogoCarousel from "@/components/LogoCarousel";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import CodeDiff from "@/components/CodeDiff";
import Features from "@/components/Features";
import StrategicSection from "@/components/StrategicSection";
import InfrastructureSection from "@/components/InfrastructureSection";
import Integrations from "@/components/Integrations";
import PlatformMaturity from "@/components/PlatformMaturity";
import Testimonials from "@/components/Testimonials";
import TechnicalFoundation from "@/components/TechnicalFoundation";
import Enterprise from "@/components/Enterprise";
import FAQAccordion from "@/components/FAQAccordion";
import AboutSection from "@/components/AboutSection";
import CTAForm from "@/components/CTAForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      disable: false,
      startEvent: 'DOMContentLoaded',
      offset: 50,
      delay: 0,
    });

    setIsLoaded(true);
    
    const handleScroll = () => {
      if (window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    };
    
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
      <Navbar />
      <BlogPill />
      <Hero />
      <LogoCarousel />
      
      {/* 1. Capabilities */}
      <Features />
      <StrategicSection />
      <InfrastructureSection />
      
      {/* 2. Platform */}
      <ProblemSection />
      <SolutionSection />
      <CodeDiff />
      <Integrations />
      <PlatformMaturity />
      <Testimonials />
      <TechnicalFoundation />

      {/* 3. Enterprise */}
      <Enterprise />

      {/* 4. About */}
      <AboutSection />

      {/* 5. FAQ */}
      <FAQAccordion />

      <CTAForm />
      <Footer />
    </main>
  );
}
