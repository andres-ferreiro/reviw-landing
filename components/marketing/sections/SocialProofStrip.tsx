"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { StatItem } from "@/components/marketing/primitives/StatItem";
import { Divider } from "@/components/marketing/primitives/Divider";
import { useTranslations } from "@/lib/i18n";

export function SocialProofStrip() {
  const { t } = useTranslations();

  const stats = [
    { value: "500+", label: t("landing.socialProof.businesses") },
    { value: "4.8★", label: t("landing.socialProof.rating") },
    { value: "2.3×", label: t("landing.socialProof.reviews") },
    { value: "87%", label: t("landing.socialProof.redirect") },
  ];

  return (
    <section className="border-y border-border/70 py-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4 }}
        className="container flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-12"
      >
        {stats.map((stat, i) => (
          <Fragment key={stat.label}>
            {i > 0 && <Divider vertical />}
            <StatItem value={stat.value} label={stat.label} />
          </Fragment>
        ))}
      </motion.div>
    </section>
  );
}
