import { Header } from "@/components/marketing/sections/Header";
import { Hero } from "@/components/marketing/sections/Hero";
import { SocialProofStrip } from "@/components/marketing/sections/SocialProofStrip";
import { BentoFeatureGrid } from "@/components/marketing/sections/BentoFeatureGrid";
import { HowItWorks } from "@/components/marketing/sections/HowItWorks";
import { TestimonialsMarquee } from "@/components/marketing/sections/TestimonialsMarquee";
import { PricingSection } from "@/components/marketing/sections/PricingSection";
import { AgencyTeaserBand } from "@/components/marketing/sections/AgencyTeaserBand";
import { FAQSection } from "@/components/marketing/sections/FAQSection";
import { FinalCTA } from "@/components/marketing/sections/FinalCTA";
import { MobileStickyCTA } from "@/components/marketing/sections/MobileStickyCTA";
import { Footer } from "@/components/marketing/sections/Footer";

// Business landing page ("/").
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <SocialProofStrip />
        <BentoFeatureGrid />
        <HowItWorks />
        <TestimonialsMarquee />
        <PricingSection />
        <AgencyTeaserBand />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
