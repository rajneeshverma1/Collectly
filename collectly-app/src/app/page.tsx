import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AutomateBillingSection } from "@/components/AutomateBillingSection";
import { ProblemSection } from "@/components/ProblemSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import Features from "@/components/Features";
import { ConfigurableSection } from "@/components/ConfigurableSection";
import { WhoWeServeSection } from "@/components/WhoWeServeSection";
import { AboutSection } from "@/components/AboutSection";
import { FinalCTA } from "@/components/final-cta";
import { FAQSection } from "@/components/FAQSection";
import { LLMCTASection } from "@/components/LLMCTASection";
import { WordmarkSection } from "@/components/wordmark-section";
import { SubFooter } from "@/components/sub-footer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AutomateBillingSection />
      <ProblemSection id="problem" />
      <HowItWorksSection id="how-it-works" />
      <Features id="features" />
      <ConfigurableSection />
      <WhoWeServeSection id="solutions" />
      <AboutSection id="about" />
      <FinalCTA />
      <FAQSection />
      <LLMCTASection />
      <Footer />
      <WordmarkSection />
      <SubFooter />
    </main>
  );
}
