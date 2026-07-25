"use client";

import { ArrowRight, Calculator, DollarSign, Users, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { GradientOrb } from "@/components/marketing/primitives/GradientOrb";
import { GridPattern } from "@/components/marketing/primitives/grid-pattern";
import { NoiseOverlay } from "@/components/marketing/primitives/NoiseOverlay";
import { CTAButton } from "@/components/marketing/primitives/CTAButton";
import { AgencyChartAmbient } from "@/components/marketing/visuals/AgencyChartAmbient";
import { AgencyStatCard } from "@/components/marketing/visuals/AgencyStatCard";
import { AgencyClientsTable } from "@/components/marketing/visuals/AgencyClientsTable";
import { CTA_URLS } from "@/lib/constants";
import { useTranslations } from "@/lib/i18n";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

// Point-in-time metrics (MRR, client count) get real noise: churn and
// slow months mean the line dips sometimes, not a perfect ramp. All-time
// revenue is cumulative so it can't decrease, but the step size between
// months still varies instead of tracing a smooth exponential.
const MRR_DATA = [
  { value: 380 }, { value: 430 }, { value: 405 }, { value: 520 },
  { value: 590 }, { value: 555 }, { value: 720 }, { value: 850 },
  { value: 800 }, { value: 1010 }, { value: 1180 }, { value: 1350 },
];
const CLIENTS_DATA = [
  { value: 4 }, { value: 5 }, { value: 5 }, { value: 7 },
  { value: 8 }, { value: 7 }, { value: 9 }, { value: 11 },
  { value: 10 }, { value: 13 }, { value: 15 }, { value: 18 },
];
const TOTAL_REVENUE_DATA = [
  { value: 1200 }, { value: 2800 }, { value: 4100 }, { value: 5900 },
  { value: 7800 }, { value: 9200 }, { value: 11400 }, { value: 14820 },
];

// Centered hero copy, matching the homepage's Hero.tsx grammar. The
// stat-card row and client table sit in a narrower max-w-5xl column below
// (not the full .container width) so they read as an inset visual with
// side margins, the same way Hero.tsx's dashboard screenshot sits inset
// within the wider page rather than spanning edge to edge. A soft noisy
// orb sits behind that whole block (GradientOrb + NoiseOverlay) to give
// the dashboard area its own quiet backdrop, distinct from the chart
// traces (AgencyChartAmbient) behind the headline above it.
export function AgencyHero() {
  const { t } = useTranslations();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <GridPattern width={48} height={48} />
      <AgencyChartAmbient />
      <GradientOrb className="-top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative z-10 flex flex-col items-center text-center"
      >
        <motion.h1
          variants={item}
          className="max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          {t<string>("agencyPage.hero.headlinePrefix")}{" "}
          <span className="text-primary">{t<string>("agencyPage.hero.headlineSuffix")}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-lg text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {t("agencyPage.hero.subtitle")}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <CTAButton href={CTA_URLS.register}>
            {t("agencyPage.hero.ctaPrimary")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </CTAButton>
          <a
            href="#money-math"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            <Calculator className="h-4 w-4" />
            {t("agencyPage.hero.ctaSecondary")}
          </a>
        </motion.div>

        <motion.div variants={item} className="relative mt-12 w-full max-w-5xl sm:mt-14">
          {/* Center sits at the top edge of the stat-card row: the lower
              half is hidden behind the (opaque) cards below it, which is
              fine — no clipping needed there. The upper half is left
              unclipped so it bleeds freely upward into the open gap above
              the cards, fading out via its own blur/opacity well before it
              reaches the CTA row. No overflow-hidden/mask here on purpose —
              a tight clip box around a blurred circle is what caused the
              visible hard-edge seam before; the section's own (much larger)
              overflow-hidden is the only boundary this needs. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2"
          >
            <GradientOrb className="inset-0 opacity-20" />
            <NoiseOverlay className="opacity-[0.05] mix-blend-overlay" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="relative">
              {/* Mascot standing on the MRR card — the card it's "on top of"
                  specifically (not clients/revenue) since it's holding cash
                  and MRR is the money-growing-every-month stat. Positioned
                  outside the card's own overflow (a sibling, not a child).
                  Mobile gets a smaller size than desktop since the gap
                  between the CTA row above and this card is only ~48px (the
                  wrapper's mt-12): the offset (-top-12 = 48px) matches the
                  mascot's own height (h-12 = 48px) exactly, same "feet land
                  right at the card's top edge, zero overlap" math desktop
                  already used at its own scale (-top-36 offset = h-36
                  height) — previously mobile used a shallower offset than
                  its height (-top-10 vs h-20), so the mascot sank ~40px
                  into the card and covered the title/icon row. dark:invert
                  flips the black line art to white so it stays visible
                  against a dark background, same as Hero.tsx's mascot. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- external Supabase asset, not a static import */}
              <img
                src="https://gpagwuhcgnxmbjgenogr.supabase.co/storage/v1/object/public/general-assets/mascot/reviw-money.png"
                alt=""
                aria-hidden
                className="pointer-events-none absolute -top-12 left-0 z-20 h-12 w-auto dark:invert sm:-top-36 sm:left-2 sm:h-36"
              />
              <AgencyStatCard
                icon={DollarSign}
                title={t("agencyPage.hero.stats.mrrTitle")}
                value="$1,350"
                subtitle={t("agencyPage.hero.stats.mrrSubtitle")}
                data={MRR_DATA}
                delay={0.1}
              />
            </div>
            {/* Clients/all-time revenue: desktop-only. Mobile shows just the
                MRR card (the mascot's card) followed directly by the client
                list — three stacked stat cards plus a mascot plus a table is
                too much vertical scroll before reaching real content on a
                phone. */}
            <AgencyStatCard
              icon={Users}
              title={t("agencyPage.hero.stats.clientsTitle")}
              value="18"
              subtitle={t("agencyPage.hero.stats.clientsSubtitle")}
              data={CLIENTS_DATA}
              delay={0.25}
              className="hidden sm:block"
            />
            <AgencyStatCard
              icon={Wallet}
              title={t("agencyPage.hero.stats.totalTitle")}
              value="$14,820"
              subtitle={t("agencyPage.hero.stats.totalSubtitle")}
              data={TOTAL_REVENUE_DATA}
              delay={0.4}
              emphasize
              className="hidden sm:block"
            />
          </div>

          <div className="mt-4">
            <AgencyClientsTable fade />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
