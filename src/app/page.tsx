'use client';

import { useEffect } from "react";
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
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-quad',
      once: true,
    });
  }, []);

  return (
    <main>
      <Navbar />
      <BlogPill />
      <Hero />
      <LogoCarousel />
      
      {/* 1. Capabilities */}
      <Features />
      <StrategicSection />
      
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
