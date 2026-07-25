"use client";

import { ArrowRight, Check } from "lucide-react";
import { ShimmerButton } from "@/components/marketing/primitives/shimmer-button";
import { LeadFinderMapPeek } from "@/components/marketing/visuals/LeadFinderMapPeek";
import { useTranslations } from "@/lib/i18n";

// "Are you an agency?" callout linking to /for-agencies — the required
// secondary path off the business-focused landing page. Uses the same light
// card grammar as PricingPanel (rounded-3xl, border-border/70, bg-card) so
// it reads as part of the same page, not a different one. The mint accent
// is reserved for the CTA and check icons only, not the section background.
// The Lead Finder map sits as a full-bleed background layer (min-h gives it
// room to show on the right), fading into the card's own bg-card color
// toward the text — see LeadFinderMapPeek for the fade logic.
export function AgencyTeaserBand() {
  const { t } = useTranslations();
  const highlights = t<string[]>("landing.agency.highlights");

  return (
    <section className="container relative z-0 -mt-6 pb-16 sm:-mt-8 sm:pb-20">
      <div className="relative mx-4 min-h-[300px] overflow-hidden rounded-3xl border border-border/70 bg-card p-8 shadow-lg shadow-black/[0.04] sm:mx-8 sm:p-10 lg:p-12">
        <LeadFinderMapPeek />

        <div className="relative z-10 flex h-full flex-col justify-end gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("landing.agency.eyebrow")}
            </p>
            <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              {t("landing.agency.title")}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("landing.agency.description")}
            </p>
            <ul className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <ShimmerButton href="/for-agencies" className="shrink-0" shimmerColor="var(--success)">
            {t("landing.agency.cta")}
            <ArrowRight className="h-4 w-4" />
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
