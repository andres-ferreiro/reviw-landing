"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { NoiseOverlay } from "@/components/marketing/primitives/NoiseOverlay";
import { BorderBeam } from "@/components/marketing/primitives/border-beam";
import { CTA_URLS } from "@/lib/constants";
import { useTranslations } from "@/lib/i18n";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

// Closing CTA band, shared by both pages. Bold mint panel (not a neutral
// card) with the page's own mascot bookending its hero appearance, split
// asymmetrically like AgencyFeatureShowcase's cards rather than centered in
// empty space.
//
// Every in-panel color is anchored to --primary-foreground (not
// --foreground/--muted-foreground/--primary): --primary is light-to-mid
// mint in BOTH themes (never dark), so text-foreground would read as
// near-white-on-mint in dark mode. --primary-foreground is a stable dark
// mint-black in both :root and .dark (verified identical in globals.css),
// so anchoring to it makes contrast correct in both themes with zero
// dark: overrides. --success (BorderBeam's gradient stop) is identical
// across both theme blocks for the same reason.
export function FinalCTA({
  title,
  subtitle,
  primaryLabel,
  primaryHref = CTA_URLS.register,
  secondaryLabel,
  secondaryHref = CTA_URLS.login,
  trust,
  mascotSrc = "https://gpagwuhcgnxmbjgenogr.supabase.co/storage/v1/object/public/general-assets/mascot/feliz.png",
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  trust?: string[];
  mascotSrc?: string;
} = {}) {
  const { t } = useTranslations();
  const reduced = useReducedMotion();
  const trustPoints = trust ?? t<string[]>("landing.finalCta.trust");

  const resolvedTitle = title ?? t("landing.finalCta.title");
  const resolvedSubtitle = subtitle ?? t("landing.finalCta.subtitle");
  const resolvedPrimaryLabel = primaryLabel ?? t("common.startForFree");
  const resolvedSecondaryLabel = secondaryLabel ?? t("landing.finalCta.secondary");

  return (
    <section className="container pb-8 pt-16 sm:pb-12 sm:pt-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--success)_35%)] shadow-2xl shadow-primary/25">
        <NoiseOverlay className="opacity-[0.05] mix-blend-overlay" />

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 flex flex-col lg:min-h-[420px] lg:flex-row"
        >
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center gap-4 p-8 text-center sm:p-12 lg:basis-3/5 lg:items-start lg:justify-center lg:p-14 lg:text-left"
          >
            <motion.h2
              variants={item}
              className="max-w-xl text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl"
            >
              {resolvedTitle}
            </motion.h2>
            <motion.p
              variants={item}
              className="max-w-md text-balance text-sm text-primary-foreground/70 sm:text-base"
            >
              {resolvedSubtitle}
            </motion.p>
            <motion.div variants={item} className="mt-4 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <div className="relative inline-flex rounded-full">
                <Link
                  href={primaryHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-foreground px-7 text-sm font-semibold text-primary transition-transform hover:scale-[1.02] hover:bg-primary-foreground/90 active:scale-100"
                >
                  {resolvedPrimaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <BorderBeam size={60} duration={4} borderWidth={1.5} colorFrom="var(--primary)" colorTo="var(--success)" />
              </div>
              <Link
                href={secondaryHref}
                className="inline-flex h-12 items-center justify-center rounded-full border border-primary-foreground/30 px-7 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/60 hover:bg-primary-foreground/10"
              >
                {resolvedSecondaryLabel}
              </Link>
            </motion.div>

            <motion.ul
              variants={item}
              className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start"
            >
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-1.5 text-xs text-primary-foreground/75">
                  <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <div className="relative flex items-end justify-center overflow-hidden pt-8 sm:pt-10 lg:basis-2/5 lg:items-end lg:justify-end lg:p-0">
            {/* Recolored to a flat primary-foreground silhouette instead of
                the black-line-art PNG + dark:invert used elsewhere (Hero.tsx,
                AgencyHero.tsx): dark:invert flips black to white, but against
                this panel's mint-gradient background (never dark, in either
                theme) an all-white mascot reads flat/washed-out rather than
                matching the primary CTA button next to it. Masking the same
                PNG with bg-primary-foreground ties the mascot's color
                directly to the button's fill color, so it's identical in
                both themes with no dark: override needed (same reasoning as
                this panel's text colors, see file-level comment above). The
                invisible img element exists purely to size the box — it carries
                the real intrinsic aspect ratio via height and w-auto classes,
                the way a mask on a bare div can't — while the masked div layered on top of
                it renders the actual visible (colored) silhouette. */}
            <div className="relative h-36 w-auto sm:h-44 lg:h-auto lg:max-h-[14rem]">
              {/* eslint-disable-next-line @next/next/no-img-element -- external Supabase asset, not a static import */}
              <img src={mascotSrc} alt="" aria-hidden className="pointer-events-none h-full w-auto object-contain opacity-0" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-primary-foreground drop-shadow-xl"
                style={{
                  maskImage: `url(${mascotSrc})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "bottom",
                  WebkitMaskImage: `url(${mascotSrc})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "bottom",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
