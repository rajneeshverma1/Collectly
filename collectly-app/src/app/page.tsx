import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ConfigurableSection } from "@/components/ConfigurableSection";
import { WhoWeServeSection } from "@/components/WhoWeServeSection";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { FinalCTA } from "@/components/final-cta";
import { FAQSection } from "@/components/FAQSection";
import { WordmarkSection } from "@/components/wordmark-section";
import { SubFooter } from "@/components/sub-footer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemSection id="problem" />
      <HowItWorksSection id="how-it-works" />
      <ConfigurableSection />
      <WhoWeServeSection />
      <IntegrationsSection id="integrations" />
      <TestimonialsCarousel />
      <FinalCTA />
      <FAQSection />
      <WordmarkSection />
      <SubFooter />
    </main>
  );
}
