// Wide single-plan pricing panel: price/toggle/CTA on the left, feature
// checklist on the right, inside one full-width card. We only ever show one
// plan per page (Business here, Agency on /for-agencies) — this is not a
// multi-plan comparison layout, just a fuller presentation of a single plan.
//
// The CTA is the most visually dominant element on purpose — the trial
// badge is a quiet reassurance next to it, not a competing focal point.
import { Check } from "lucide-react";
import { CTAButton } from "./CTAButton";

export function PricingPanel({
  label,
  price,
  period,
  trialBadge,
  footnote,
  description,
  features,
  ctaLabel,
  ctaHref,
  toggle,
  includedLabel = "What's included",
}: {
  label: string;
  price: React.ReactNode;
  period: string;
  trialBadge?: string;
  footnote?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  toggle?: React.ReactNode;
  includedLabel?: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl shadow-black/[0.03]">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col p-8 sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>

          {toggle && <div className="mt-5">{toggle}</div>}

          <div className="mt-6 flex items-end gap-1.5">
            <span className="text-6xl font-bold tabular-nums tracking-tight sm:text-7xl">{price}</span>
            <span className="mb-3 text-base text-muted-foreground">{period}</span>
          </div>

          {(trialBadge || footnote) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {trialBadge && (
                <span className="inline-flex items-center rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {trialBadge}
                </span>
              )}
              {footnote && <span className="text-xs text-muted-foreground">{footnote}</span>}
            </div>
          )}

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>

          <div className="mt-8">
            <CTAButton href={ctaHref} className="h-14 px-8 text-base font-semibold shadow-md shadow-primary/20">
              {ctaLabel}
            </CTAButton>
          </div>
        </div>

        <div className="border-t border-border/70 bg-muted/20 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{includedLabel}</p>
          <ul className="mt-5 flex flex-col gap-4">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-3 w-3 text-primary" />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
