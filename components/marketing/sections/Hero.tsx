"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { GradientOrb } from "@/components/marketing/primitives/GradientOrb";
import { GridPattern } from "@/components/marketing/primitives/grid-pattern";
import { CTAButton } from "@/components/marketing/primitives/CTAButton";
import { SurveyPeek } from "@/components/marketing/visuals/SurveyPeek";
import { FiveStarSwap } from "@/components/marketing/visuals/FiveStarSwap";
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

export function Hero() {
  const { t } = useTranslations();

  return (
    <section id="hero" className="relative overflow-hidden py-24 sm:py-32 lg:py-36">
      <GridPattern width={48} height={48} />
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
          {t<string>("landing.hero.headlinePrefix")} <FiveStarSwap /> {t<string>("landing.hero.headlineSuffix")}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {t("landing.hero.subtitle")}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <CTAButton href={CTA_URLS.register}>
            {t("common.startFreeTrial")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </CTAButton>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            <PlayCircle className="h-5 w-5" />
            {t("landing.hero.ctaSecondary")}
          </a>
        </motion.div>

        <motion.div variants={item} className="relative mt-16 w-full max-w-4xl sm:mt-20">
          {/* eslint-disable-next-line @next/next/no-img-element -- unknown intrinsic size, avoid next/image aspect distortion */}
          <img
            src="https://gpagwuhcgnxmbjgenogr.supabase.co/storage/v1/object/public/general-assets/mascot/feliz.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute -top-36 right-6 z-20 hidden h-28 w-auto drop-shadow-xl dark:invert sm:block sm:h-36 lg:right-12"
          />

          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-black/10">
            <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/40 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/50" />
            </div>
            <Image
              src="/images/dashboard.png"
              alt="Reviw reputation dashboard"
              width={2288}
              height={1750}
              className="w-full"
              priority
            />
          </div>

          <div className="absolute -bottom-14 -right-6 hidden sm:block lg:-right-14 lg:-bottom-16">
            <div className="w-[230px] rotate-6 rounded-[2rem] border-[6px] border-card bg-card shadow-2xl shadow-black/20 ring-1 ring-border/70">
              <div className="relative aspect-[9/19] overflow-hidden rounded-[1.5rem]">
                <div className="absolute left-1/2 top-2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-foreground/15" />
                <SurveyPeek />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
