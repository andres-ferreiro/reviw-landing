"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/marketing/primitives/SectionHeading";
import { PricingPanel } from "@/components/marketing/primitives/PricingPanel";
import { PRICING, CTA_URLS } from "@/lib/constants";
import { useTranslations } from "@/lib/i18n";

// Same PricingPanel primitive and monthly/annual toggle as the homepage's
// PricingSection — one plan, presented the same way, so the "simple, no
// per-seat surprises" pitch is backed up by the page's own pricing UI
// actually being simple.
export function AgencyPricingSection() {
  const [annual, setAnnual] = useState(true);
  const { t } = useTranslations();
  const features = t<string[]>("agencyPage.pricing.features");

  const toggle = (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex w-fit items-center gap-1 rounded-full border border-border/70 bg-background p-1">
        <button
          type="button"
          onClick={() => setAnnual(false)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            !annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          {t("landing.pricing.monthly")}
        </button>
        <button
          type="button"
          onClick={() => setAnnual(true)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          {t("landing.pricing.annual")}
        </button>
      </div>
      <span className="rounded-full bg-primary/15 px-3 py-1.5 text-xs font-semibold text-primary">
        {t("landing.pricing.saveBadge")}
      </span>
    </div>
  );

  // Same "smaller decimal" treatment as the business PricingPanel: annual
  // shows the effective monthly rate ($55.83), not the $670/yr total.
  const [wholePart, decimalPart] = PRICING.agency.yearly.effectiveMonthly.split(".");
  const price = annual ? (
    <>
      {wholePart}
      <span className="align-top text-3xl sm:text-4xl">.{decimalPart}</span>
    </>
  ) : (
    PRICING.agency.monthly.price
  );

  return (
    <section id="agency-pricing" className="container scroll-mt-24 py-16 sm:py-20">
      <SectionHeading
        eyebrow={t("agencyPage.pricing.eyebrow")}
        title={t("agencyPage.pricing.title")}
        subtitle={t("agencyPage.pricing.subtitle")}
      />

      <div className="relative z-10">
        <PricingPanel
          label={t("agencyPage.pricing.label")}
          price={price}
          period="/mo"
          trialBadge={t("agencyPage.pricing.trialBadge")}
          footnote={annual ? t("agencyPage.pricing.footnoteAnnual") : t("agencyPage.pricing.footnoteMonthly")}
          description={t("agencyPage.pricing.description")}
          features={features}
          ctaLabel={t("common.startForFree")}
          ctaHref={CTA_URLS.register}
          toggle={toggle}
          includedLabel={t("agencyPage.pricing.includedLabel")}
        />
      </div>
    </section>
  );
}
