"use client";

import { Marquee } from "@/components/marketing/primitives/marquee";
import { useTranslations } from "@/lib/i18n";

// Deliberately generic: role + industry only, no invented names or business
// names. We don't have verified customers to attribute real quotes to yet —
// see knowlagebase.md's content rules on testimonials needing permission
// before use. Subtle by design: small cards, muted colors, no star ratings.
interface Quote {
  quote: string;
  role: string;
}

function QuoteCard({ quote, role }: Quote) {
  return (
    <div className="mx-2 flex w-72 shrink-0 flex-col gap-3 rounded-2xl border border-border/60 bg-card/50 p-5">
      <p className="text-sm leading-relaxed text-foreground">&ldquo;{quote}&rdquo;</p>
      <span className="text-xs font-medium text-muted-foreground">{role}</span>
    </div>
  );
}

export function TestimonialsMarquee() {
  const { t } = useTranslations();
  const quotes = t<Quote[]>("landing.testimonials.quotes");

  return (
    <section className="py-16 sm:py-20">
      <div className="container mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {t("landing.testimonials.eyebrow")}
        </p>
      </div>

      <div className="relative">
        <Marquee pauseOnHover className="[--duration:35s]">
          {quotes.map((q) => (
            <QuoteCard key={q.role} {...q} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />
      </div>
    </section>
  );
}
