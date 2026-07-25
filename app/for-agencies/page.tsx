import { Header } from "@/components/marketing/sections/Header";
import { AgencyHero } from "@/components/marketing/sections/AgencyHero";
import { AgencyFeatureShowcase } from "@/components/marketing/sections/AgencyFeatureShowcase";
import { AgencyProofStrip } from "@/components/marketing/sections/AgencyProofStrip";
import { AgencyPricingSection } from "@/components/marketing/sections/AgencyPricingSection";
import { AgencyFAQSection } from "@/components/marketing/sections/AgencyFAQSection";
import { AgencyFinalCTA } from "@/components/marketing/sections/AgencyFinalCTA";
import { Footer } from "@/components/marketing/sections/Footer";

// Agency / reseller landing page ("/for-agencies"). The revenue calculator
// (formerly a standalone MoneyMathModule section) now lives inside
// AgencyFeatureShowcase's last card ("Start earning") — see
// EarningsCalculator.tsx.
export default function ForAgenciesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <AgencyHero />
        <AgencyFeatureShowcase />
        <AgencyProofStrip />
        <AgencyPricingSection />
        <AgencyFAQSection />
        <AgencyFinalCTA />
      </main>
      <Footer />
    </>
  );
}
