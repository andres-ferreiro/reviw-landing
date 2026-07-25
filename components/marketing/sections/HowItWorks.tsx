"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { QrCode, Split, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/marketing/primitives/SectionHeading";
import { GradientOrb } from "@/components/marketing/primitives/GradientOrb";
import { useTranslations } from "@/lib/i18n";

const STEP_ICONS = [QrCode, Split, TrendingUp];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// Same "flow" motif as the routing beam in the bento grid: a moving
// highlight traveling along a static line, ties the two sections together
// visually instead of a plain static arrow glyph.
function StepConnector() {
  return (
    <div className="relative mx-2 mt-11 hidden h-px flex-1 self-start overflow-hidden sm:block">
      <div className="absolute inset-0 bg-border" />
      <motion.div
        className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{ left: ["-10%", "110%"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

interface Step {
  title: string;
  description: string;
}

export function HowItWorks() {
  const { t } = useTranslations();
  const steps = t<Step[]>("landing.howItWorks.steps");

  return (
    <section id="how-it-works" className="relative container scroll-mt-24 py-20 sm:py-28">
      <GradientOrb className="left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/3 opacity-10" />

      <div className="relative z-10">
        <SectionHeading
          eyebrow={t("landing.howItWorks.eyebrow")}
          title={t("landing.howItWorks.title")}
          subtitle={t("landing.howItWorks.subtitle")}
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-0"
        >
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <Fragment key={step.title}>
                <motion.div
                  variants={item}
                  className="group relative flex flex-1 flex-col items-start rounded-2xl border border-border/70 bg-card/40 p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-5 text-base font-semibold sm:text-lg">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </motion.div>

                {i < steps.length - 1 && <StepConnector />}
              </Fragment>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
