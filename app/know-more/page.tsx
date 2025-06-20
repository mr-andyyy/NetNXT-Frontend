'use client';

import { useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import ClientLogos from '@/components/home/ClientLogos';
import AboutUs from '@/components/home/AboutUs';
import Services from '@/components/home/Services';
import StatsSection from '@/components/home/StatsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import LogoCTA from '@/components/home/LogoCTA';
import Industries from '@/components/home/Industries';
import Testimonials from '@/components/home/Testimonials';
import PartnerLogos from '@/components/home/PartnerLogos';
import OfficeLocations from '@/components/home/OfficeLocations';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);

  // Adjust this value to match your header's height (in px)
  const HEADER_OFFSET = 80;

  const scrollToServices = () => servicesRef.current?.scrollIntoView({ behavior: 'smooth' });

  const scrollToWhyChooseUs = () => {
    if (whyChooseUsRef.current) {
      const y = whyChooseUsRef.current.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // For Home navigation
  const goToHome = () => {
    window.location.href = '/';
  };

  // For Contact navigation
  const contactLink = "https://forms.gle/F2ZbFB9YA2wNrLqV8";

  return (
    <>
      <Header
        onHomeClick={goToHome}
        onServicesClick={scrollToServices}
        onAboutClick={scrollToWhyChooseUs}
        contactLink={contactLink}
      />
      <Hero />
      <ClientLogos />
      <AboutUs />
      <div ref={servicesRef}>
        <Services />
      </div>
      <StatsSection />
      <div ref={whyChooseUsRef}>
        <WhyChooseUs />
      </div>
      <LogoCTA />
      <Industries />
      <Testimonials />
      <OfficeLocations />
      <PartnerLogos />
      <Footer />
    </>
  );
}