import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WorkflowSection } from "@/components/workflow-section";
import Features from "@/components/Features";
import { InsightsSection } from "@/components/insights-section";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { FinalCTA } from "@/components/final-cta";
import { WordmarkSection } from "@/components/wordmark-section";
import { SubFooter } from "@/components/sub-footer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-indigo-100">
      <Navbar />
      <Hero />
      <WorkflowSection />
      <Features />
      <InsightsSection />
      <TestimonialsCarousel />
      <FinalCTA />
      <Footer />
      <WordmarkSection />
      <SubFooter />
    </main>
  );
}
