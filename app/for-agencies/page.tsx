import type { Metadata } from "next";
import { Header } from "@/components/marketing/sections/Header";
import { AgencyHero } from "@/components/marketing/sections/AgencyHero";
import { AgencyFeatureShowcase } from "@/components/marketing/sections/AgencyFeatureShowcase";
import { AgencyProofStrip } from "@/components/marketing/sections/AgencyProofStrip";
import { AgencyPricingSection } from "@/components/marketing/sections/AgencyPricingSection";
import { AgencyFAQSection } from "@/components/marketing/sections/AgencyFAQSection";
import { AgencyFinalCTA } from "@/components/marketing/sections/AgencyFinalCTA";
import { Footer } from "@/components/marketing/sections/Footer";

const TITLE = "For Agencies — White-label Reviw and resell it to your clients";
const DESCRIPTION =
  "Turn client work into recurring revenue. White-label Reviw under your own brand, resell it to every local business you already work with, and keep 100% of what you charge.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/for-agencies",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://reviw.app/for-agencies",
    siteName: "Reviw",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

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
