"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/marketing/primitives/SectionHeading";
import { PricingPanel } from "@/components/marketing/primitives/PricingPanel";
import { PRICING, CTA_URLS } from "@/lib/constants";
import { useTranslations } from "@/lib/i18n";

export function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const { t } = useTranslations();
  const features = t<string[]>("landing.pricing.features");

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

  // Annual shows the effective monthly rate ($15.83) with the decimal portion
  // smaller, since $190/yr as a giant number reads oddly next to "/mo".
  const [wholePart, decimalPart] = PRICING.business.yearly.effectiveMonthly.split(".");
  const price = annual ? (
    <>
      {wholePart}
      <span className="align-top text-3xl sm:text-4xl">.{decimalPart}</span>
    </>
  ) : (
    PRICING.business.monthly.price
  );

  return (
    <section id="pricing" className="container scroll-mt-24 pt-20 sm:pt-28">
      <SectionHeading
        eyebrow={t("landing.pricing.eyebrow")}
        title={t("landing.pricing.title")}
        subtitle={t("landing.pricing.subtitle")}
      />

      <div className="relative z-10">
        <PricingPanel
          label={t("landing.pricing.label")}
          price={price}
          period="/mo"
          trialBadge={t("landing.pricing.trialBadge")}
          footnote={annual ? t("landing.pricing.footnoteAnnual") : t("landing.pricing.footnoteMonthly")}
          description={t("landing.pricing.description")}
          features={features}
          ctaLabel={t("common.startForFree")}
          ctaHref={CTA_URLS.register}
          toggle={toggle}
          includedLabel={t("landing.pricing.includedLabel")}
        />
      </div>
    </section>
  );
}
