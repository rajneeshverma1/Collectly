"use client";

import SkyBackground from '@/components/landing/SkyBackground';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import DashboardMockup from '@/components/landing/DashboardMockupSimple';
import HowItWorks from '@/components/landing/HowItWorks';
import RouteComparison from '@/components/landing/RouteComparison';
import AirMapFeature from '@/components/landing/AirMapFeature';
import FeaturesSection from '@/components/landing/FeaturesSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="antialiased min-h-screen overflow-x-hidden selection:bg-black selection:text-white text-slate-800 font-sans bg-[#ABCDE9] relative">
      <SkyBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow flex flex-col items-center pt-16 pb-20 px-4 md:px-6 w-full max-w-7xl mx-auto">
          <HeroSection />
          <DashboardMockup />
        </main>

        <HowItWorks />

        <section className="w-full max-w-7xl mx-auto px-4 md:px-12 py-24 relative z-10">
          <RouteComparison />
          <AirMapFeature />
        </section>

        <FeaturesSection />

        <section className="md:px-12 z-10 w-full max-w-7xl mx-auto px-4 relative">
          <FinalCTA />
        </section>

        <Footer />
      </div>
    </div>
  );
}
