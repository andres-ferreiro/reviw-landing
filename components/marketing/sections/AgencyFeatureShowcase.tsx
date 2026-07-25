"use client";

// Replaces both the old 3-step AgencyHowItWorks and the AgencyFeatureGrid
// bento with one section: four large cards walking through white-label →
// Stripe/pricing → lead finding → earning, each with its own animated
// visual (bento-flagship grammar: visuals bleed full-bleed into the card
// rather than sitting in small boxed mockups).
//
// Cards use a sticky-stack effect: each card is `position: sticky` at the
// same offset, so as the user scrolls, each new card slides up and covers
// the previous one (later cards are later in the DOM, so they naturally
// paint over earlier ones once both are pinned at the same spot — no
// z-index juggling needed). The outgoing card shrinks slightly
// (scale 1 → 0.92) as it's covered, driven by a per-card
// useScroll({ target })/useTransform pair — same framer-motion primitives
// as MobileStickyCTA.tsx, just mapped through useTransform instead of a
// single change-event threshold. No GSAP: this project has no GSAP
// dependency, and the effect is simple enough not to need scroll-hijacking.
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { SectionHeading } from "@/components/marketing/primitives/SectionHeading";
import { WhiteLabelVisual } from "@/components/marketing/visuals/WhiteLabelVisual";
import { StripeConnectVisual } from "@/components/marketing/visuals/StripeConnectVisual";
import { LeadMapVisual } from "@/components/marketing/visuals/LeadMapVisual";
import { EarningsCalculator } from "@/components/marketing/visuals/EarningsCalculator";
import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// Only the first three steps use the generic active-triggered Visual demo
// pattern. The last step renders EarningsCalculator directly instead — it's
// a real interactive tool (sliders driving live numbers), not a canned
// animation keyed off viewport entry, so it doesn't take an `active` prop.
const VISUALS = [WhiteLabelVisual, StripeConnectVisual, LeadMapVisual];

interface Step {
  title: string;
  description: string;
}

// Replaces the old per-card ghost numeral (a decorative text-9xl "01" sitting
// behind the heading) with a scroll-driven rail next to the whole stack: a
// thin line that fills as the user scrolls through the cards, with one node
// per step that lights up once the scroll has passed that step's threshold.
// Functional wayfinding tied to the same scroll distance the sticky-stack
// cards already use, rather than static decoration. Hidden below `lg` since
// there's no room next to a single-column stack on mobile; reduced-motion
// users get a fully-drawn static rail instead of the animated fill/nodes.
function RailNode({
  threshold,
  scrollYProgress,
  reduced,
}: {
  threshold: number;
  scrollYProgress: MotionValue<number>;
  reduced: boolean;
}) {
  const opacity = useTransform(scrollYProgress, [Math.max(threshold - 0.001, 0), threshold], [0, 1]);
  return (
    <div className="relative h-2 w-2 rounded-full bg-border">
      {reduced ? (
        <div className="absolute inset-0 rounded-full bg-primary" />
      ) : (
        <motion.div className="absolute inset-0 rounded-full bg-primary" style={{ opacity }} />
      )}
    </div>
  );
}

function StepRail({ target, count }: { target: React.RefObject<HTMLDivElement | null>; count: number }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative hidden w-px shrink-0 lg:block" aria-hidden>
      <div className="absolute inset-y-0 left-0 w-px bg-border" />
      <motion.div
        className="absolute left-0 top-0 w-px origin-top bg-primary"
        style={reduced ? { height: "100%" } : { scaleY: fillScale, height: "100%" }}
      />
      <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col justify-between py-1">
        {Array.from({ length: count }).map((_, i) => (
          <RailNode key={i} threshold={count === 1 ? 0 : i / (count - 1)} scrollYProgress={scrollYProgress} reduced={!!reduced} />
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ step, index, isLast }: { step: Step; index: number; isLast: boolean }) {
  const slotRef = useRef<HTMLDivElement>(null);
  // Demos play once, on mount, rather than waiting for a "this card is now
  // in view" scroll signal (whileInView/onViewportEnter, and a scroll-value
  // change-event trigger, both proved unreliable for these sticky cards —
  // see the `initial={false}` note below). Practically: by the time a
  // visitor scrolls down to card 3 or 4, cards 1-2's few-second demo
  // sequences have already finished and settled into their end state, which
  // reads fine (a completed mock UI) rather than catching the animation
  // mid-flight.
  const [active] = useState(true);
  const Visual = VISUALS[index];
  const reverse = !isLast && index % 2 === 1;

  // Tracks this card's own slot scrolling past the sticky point: 0 when
  // it first sticks, 1 right as the next card is about to fully cover it.
  const { scrollYProgress } = useScroll({ target: slotRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <div
      ref={slotRef}
      id={isLast ? "money-math" : undefined}
      className={cn("sticky top-24", !isLast && "min-h-[85vh]", isLast && "scroll-mt-24")}
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        // Deliberately no initial/animate opacity+y entrance here. Both a
        // whileInView reveal and a plain mount-triggered animate got stuck
        // at their `initial` value (opacity:0) and never transitioned for
        // every card in this stack — a framer-motion + position:sticky
        // interaction issue in this exact setup, not specific to either
        // API. `initial={false}` skips that transition machinery entirely
        // and renders each card at its resting state immediately; the
        // sticky-shrink effect (the `scale` motion value below) still works
        // fine since that's driven independently via useScroll/useTransform.
        initial={false}
        style={isLast ? undefined : { scale }}
        className={cn(
          "origin-top",
          isLast
            ? "overflow-visible bg-background"
            : "overflow-hidden rounded-3xl border border-border/70 bg-card shadow-2xl shadow-black/[0.06]"
        )}
      >
        {isLast ? (
          // Finale layout: no card border/shadow/rounding so this step reads
          // as part of the page rather than one more boxed card — but it
          // still needs an OPAQUE background (bg-background, same color as
          // the page) rather than none at all: this card is later in the DOM
          // and higher z-index than step 3, so as it slides up to cover step
          // 3 during the sticky-stack transition, a transparent background
          // here would let step 3 show through underneath instead of being
          // properly hidden. bg-background matches the page exactly, so it
          // still looks blended, just no longer see-through.
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="flex flex-col gap-4 lg:max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{step.title}</h3>
              <p className="max-w-xl text-balance leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
            <div className="mt-10">
              <EarningsCalculator />
            </div>
          </div>
        ) : (
          <div className={cn("flex flex-col lg:min-h-[500px]", reverse ? "lg:flex-row-reverse" : "lg:flex-row")}>
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 lg:w-[42%] lg:p-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{step.title}</h3>
              <p className="max-w-sm text-balance leading-relaxed text-muted-foreground">{step.description}</p>
            </div>

            {/* No padding/centering here on purpose — each Visual fills this
                zone edge-to-edge itself (absolute inset-0), the same way
                LeadMapVisual's map bleeds to the borders. */}
            <div className="relative min-h-[320px] flex-1 overflow-hidden lg:min-h-0">
              <Visual active={active} />
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-y-0 z-10 hidden w-1/3 lg:block",
                  reverse
                    ? "right-0 bg-gradient-to-l from-card via-card/60 to-transparent"
                    : "left-0 bg-gradient-to-r from-card via-card/60 to-transparent"
                )}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function AgencyFeatureShowcase() {
  const { t } = useTranslations();
  const steps = t<Step[]>("agencyPage.featureShowcase.steps");
  const stackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="container py-20 sm:py-28">
      <SectionHeading
        eyebrow={t("agencyPage.featureShowcase.eyebrow")}
        title={t("agencyPage.featureShowcase.title")}
        subtitle={t("agencyPage.featureShowcase.subtitle")}
      />

      <div className="flex gap-8">
        <StepRail target={stackRef} count={steps.length} />
        <div ref={stackRef} className="flex flex-1 flex-col gap-6">
          {steps.map((step, i) => (
            <FeatureCard key={step.title} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
