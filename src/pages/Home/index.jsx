import React from 'react';
import SEO from '../../components/SEO';
import HeroSection from '../../components/sections/HeroSection';
import StatsSection from '../../components/sections/StatsSection';
import FeaturedProjects from '../../components/sections/FeaturedProjects';
import ServicesPreview from '../../components/sections/ServicesPreview';
import TestimonialsSection from '../../components/sections/TestimonialsSection';
import CTABanner from '../../components/sections/CTABanner';

export default function Home() {
  return (
    <>
      <SEO titleKey="seo.home.title" descriptionKey="seo.home.description" canonicalPath="/" />
      <HeroSection />
      <StatsSection />
      <FeaturedProjects />
      <ServicesPreview />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
