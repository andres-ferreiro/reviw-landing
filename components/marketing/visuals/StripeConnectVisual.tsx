"use client";

// Feature-card visual for the Stripe/pricing step. Built around a mock
// "connect your account" modal (the kind of consent screen a real Stripe
// Connect OAuth flow shows) rather than two icons floating on a line — the
// two icon nodes are still there, but now joined by a real AnimatedBeam
// (the same primitive RoutingBeam.tsx already uses for the homepage's
// distribution tile) instead of a static SVG line, and the modal surface
// carries the "fast" / "secure" trust messaging a real OAuth consent
// screen would show. The beam connects at the icons' facing EDGES
// (startXOffset/endXOffset = half the icon width) rather than their
// centers — RoutingBeam's nodes are small circles converging at angles, so
// center-to-center reads fine there, but two same-size boxes joined by a
// straight horizontal beam need the offset or the line visibly cuts
// through both boxes instead of running between them.
//
// Below the modal, price/keep/cut used to be three separate bordered
// boxes — flat and, next to the modal's "peek from behind" card, visually
// disconnected. They're one card now: no top or bottom border/radius (it
// bleeds vertically — top hidden behind the modal via a negative margin,
// bottom cut off by the visual zone's own overflow-hidden) so it reads as
// a single strip sliding out from underneath the modal, not a fourth box
// stacked below it. On mobile there's no room for that overlap (the two
// blocks stack with normal spacing instead), and the order flips so the
// numbers people care about (price, the 100/0% split) lead, with the
// connect mechanics below.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Ban, Check, Lock, Zap } from "lucide-react";
import { NumberPopIn } from "./NumberPopIn";
import { AnimatedBeam } from "./animated-beam";
import { GradientOrb } from "@/components/marketing/primitives/GradientOrb";
import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const STRIPE_ICON_URL =
  "https://gpagwuhcgnxmbjgenogr.supabase.co/storage/v1/object/public/general-assets/stripe-icon.png";

const PRICE_STEPS = ["$25", "$45", "$65"];

// Half the icon nodes' own width (h-14 w-14 = 56px), so the beam meets
// each box at its facing edge instead of passing through its center.
const NODE_EDGE_OFFSET = 28;

export function StripeConnectVisual({ active }: { active: boolean }) {
  const { t } = useTranslations();
  const [connected, setConnected] = useState(false);
  const [priceIndex, setPriceIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const reviwNodeRef = useRef<HTMLDivElement>(null);
  const stripeNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) {
      setConnected(false);
      setPriceIndex(0);
      setRevealed(false);
      return;
    }
    const connectTimer = setTimeout(() => setConnected(true), 900);
    const priceTimers = PRICE_STEPS.map((_, i) => setTimeout(() => setPriceIndex(i), 1300 + i * 350));
    const revealTimer = setTimeout(() => setRevealed(true), 1300 + PRICE_STEPS.length * 350 + 300);
    return () => {
      clearTimeout(connectTimer);
      priceTimers.forEach(clearTimeout);
      clearTimeout(revealTimer);
    };
  }, [active]);

  return (
    // Unlike the other two visuals, this one stacks two real content
    // blocks (connect modal + price/keep/cut strip) rather than one
    // compact panel or a full-bleed background, so it doesn't reliably
    // fit the parent's fixed min-h-[320px] visual zone on mobile — with
    // `absolute inset-0` here (like the others), the parent's overflow
    // was clipping the top of the price strip and the bottom of the
    // connect button. `relative` on mobile lets this box's own height
    // grow to fit its stacked content (min-h-[320px] just becomes a
    // floor, not a fixed height); lg:absolute lg:inset-0 switches back
    // to the bento-flagship "bleed into the fixed-height card" treatment
    // once the layout is a fixed-height desktop row.
    <div className="relative flex w-full items-center justify-center overflow-hidden bg-secondary/40 p-8 sm:p-12 lg:absolute lg:inset-0">
      <GradientOrb className="-bottom-24 -right-12 h-72 w-72 opacity-20" />

      <div className="relative z-10 flex w-full max-w-md flex-col">
        {/* Connect modal: bottom on mobile, top on desktop. */}
        <div
          className="relative z-20 order-2 mt-5 rounded-2xl border border-border/60 bg-background p-6 shadow-lg shadow-black/[0.04] sm:order-1 sm:mt-0 sm:mb-[-32px]"
        >
          <div ref={containerRef} className="relative flex items-center justify-center gap-14 py-1">
            <div ref={reviwNodeRef} className="h-14 w-14 shrink-0">
              <Image
                src="/images/icon.png"
                alt=""
                aria-hidden
                width={512}
                height={512}
                className="h-14 w-14 rounded-2xl object-cover"
              />
            </div>
            <div ref={stripeNodeRef} className="h-14 w-14 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element -- external Supabase asset, not a static import */}
              <img src={STRIPE_ICON_URL} alt="" aria-hidden className="h-14 w-14 rounded-2xl object-cover" />
            </div>
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={reviwNodeRef}
              toRef={stripeNodeRef}
              startXOffset={NODE_EDGE_OFFSET}
              endXOffset={-NODE_EDGE_OFFSET}
              curvature={24}
              duration={3}
              gradientStartColor="var(--primary)"
              gradientStopColor="#635bff"
            />
          </div>

          <h4 className="mt-5 text-center text-sm font-semibold text-balance">
            {t("agencyPage.featureShowcase.visuals.stripe.connectHeadline")}
          </h4>

          <div className="mt-4 flex flex-col gap-2.5">
            <div className="flex items-start gap-2.5">
              <Zap className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  {t("agencyPage.featureShowcase.visuals.stripe.fastTitle")}.
                </span>{" "}
                {t("agencyPage.featureShowcase.visuals.stripe.fastBody")}
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  {t("agencyPage.featureShowcase.visuals.stripe.secureTitle")}.
                </span>{" "}
                {t("agencyPage.featureShowcase.visuals.stripe.secureBody")}
              </p>
            </div>
          </div>

          <div
            className={cn(
              "mt-5 flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-semibold transition-colors duration-300",
              connected ? "bg-primary text-primary-foreground" : "bg-foreground text-background"
            )}
          >
            {connected ? (
              <motion.span
                key="connected"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.34, 1.35, 0.64, 1] }}
                className="flex items-center gap-1.5"
              >
                <Check className="h-4 w-4" />
                {t<string>("agencyPage.featureShowcase.visuals.stripe.connectedLabel")}
              </motion.span>
            ) : (
              t<string>("agencyPage.featureShowcase.visuals.stripe.connectCta")
            )}
          </div>
        </div>

        {/* Price / keep / cut strip: top on mobile, peeking out from behind
            the modal on desktop. No top or bottom border/radius — border-x
            only, so it bleeds into the modal above (hidden by the negative
            margin + lower z-index) and off the visual zone's own bottom
            edge (clipped by this component's own overflow-hidden root). */}
        <div className="relative z-10 order-1 overflow-hidden border-x border-border/60 bg-background pb-6 pt-8 sm:order-2 sm:pt-10">
          <div className="grid grid-cols-3 divide-x divide-border/60">
            <div className="px-4">
              <p className="text-xs font-medium text-muted-foreground">
                {t("agencyPage.featureShowcase.visuals.stripe.priceLabel")}
              </p>
              <p className="mt-1 text-xl font-bold tabular-nums">
                <NumberPopIn value={PRICE_STEPS[priceIndex]} />
              </p>
            </div>
            <div className="px-4">
              <p className="text-xs font-medium text-muted-foreground">
                {t("agencyPage.featureShowcase.visuals.stripe.keepLabel")}
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: revealed ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-1 text-xl font-bold tabular-nums text-primary"
              >
                100%
              </motion.p>
            </div>
            <div className="px-4">
              <div className="flex items-center gap-1">
                <Ban className="h-3 w-3 shrink-0 text-muted-foreground/50" />
                <p className="text-xs font-medium text-muted-foreground">
                  {t("agencyPage.featureShowcase.visuals.stripe.cutLabel")}
                </p>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: revealed ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-1 text-xl font-bold tabular-nums text-muted-foreground/40 line-through"
              >
                0%
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
