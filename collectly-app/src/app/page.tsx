import CreamNavbar from "@/components/cream/CreamNavbar";
import CreamHero from "@/components/cream/CreamHero";
import CreamLogos from "@/components/cream/CreamLogos";
import CreamFeatures from "@/components/cream/CreamFeatures";
import CreamComparison from "@/components/cream/CreamComparison";
import CreamTestimonials from "@/components/cream/CreamTestimonials";
import CreamPricing from "@/components/cream/CreamPricing";
import CreamFAQ from "@/components/cream/CreamFAQ";
import CreamFinalCTA from "@/components/cream/CreamFinalCTA";
import CreamFooter from "@/components/cream/CreamFooter";
import { FounderModal } from "@/components/FounderModal";

export default function Home() {
  return (
    <main id="hero" className="min-h-screen bg-[#FAF6F0] text-[#1E1915] antialiased selection:bg-[#C86524] selection:text-white">
      <CreamNavbar />
      <CreamHero />
      <CreamLogos />
      <CreamFeatures />
      <CreamComparison />
      <CreamTestimonials />
      <CreamPricing />
      <CreamFAQ />
      <CreamFinalCTA />
      <CreamFooter />
      <FounderModal />
    </main>
  );
}
