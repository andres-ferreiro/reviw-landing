"use client";

import { Quote } from "lucide-react";
import { useTranslations } from "@/lib/i18n";

// Single strong pull-quote rather than the homepage's scrolling marquee —
// this page has one agency testimonial to show (Marcos V.), and a lone
// focused quote reads more credible than a wall padded with repeats.
export function AgencyProofStrip() {
  const { t } = useTranslations();

  return (
    <section className="container py-16 sm:py-20">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
        {t("agencyPage.proof.eyebrow")}
      </p>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-8 rounded-3xl border border-border/70 bg-card p-8 text-center shadow-sm sm:p-12 md:flex-row md:text-left">
        <Quote className="h-10 w-10 shrink-0 text-primary/30" />

        <div>
          <p className="text-balance text-lg font-medium leading-relaxed sm:text-xl">
            “{t("agencyPage.proof.quote")}”
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{t("agencyPage.proof.name")}</span>
            {" · "}
            {t("agencyPage.proof.role")}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-center border-t border-border/70 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <span className="text-4xl font-bold tabular-nums tracking-tight text-primary">
            {t("agencyPage.proof.statValue")}
          </span>
          <span className="mt-1 max-w-[9rem] text-center text-xs text-muted-foreground">
            {t("agencyPage.proof.statLabel")}
          </span>
        </div>
      </div>
    </section>
  );
}
