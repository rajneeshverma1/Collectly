import React from 'react';
import ParadevNavbar from "@/components/paradev/ParadevNavbar";
import ParadevPricing from "@/components/paradev/ParadevPricing";
import ParadevFAQ from "@/components/paradev/ParadevFAQ";
import ParadevFooter from "@/components/paradev/ParadevFooter";
import { FounderModal } from "@/components/FounderModal";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#090a0b] text-[#ededed] antialiased selection:bg-brand selection:text-white">
      <ParadevNavbar />
      <div className="pt-8">
        <ParadevPricing id="pricing-page" />
      </div>
      <ParadevFAQ />
      <ParadevFooter />
      <FounderModal />
    </main>
  );
}
