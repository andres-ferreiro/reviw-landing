"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/marketing/primitives/SectionHeading";
import { GradientOrb } from "@/components/marketing/primitives/GradientOrb";
import { BentoTile, BentoTileContent } from "@/components/marketing/primitives/BentoTile";
import { RoutingBeam } from "@/components/marketing/visuals/RoutingBeam";
import { MiniGauge } from "@/components/marketing/visuals/MiniGauge";
import { MiniLeaderboard } from "@/components/marketing/visuals/MiniLeaderboard";
import { LiveActivityFeed } from "@/components/marketing/visuals/LiveActivityFeed";
import { QRPeek } from "@/components/marketing/visuals/QRPeek";
import { MiniChatSuggestion } from "@/components/marketing/visuals/MiniChatSuggestion";
import { useTranslations } from "@/lib/i18n";

// Bento layout, explicit lg: placement (safer than relying on grid
// auto-placement for the flagship 2x2 span):
//
//  ┌───────────────┬───────┬───────┐
//  │               │ Gauge │ Board │
//  │  Flagship     ├───────┼───────┤
//  │  (2x2)        │ CRM   │  QR   │
//  ├───────────────┴───────┴───────┤
//  │       AI suggestion (4x1)      │
//  └─────────────────────────────────┘
export function BentoFeatureGrid() {
  const { t } = useTranslations();

  return (
    <section id="features" className="container scroll-mt-24 py-20 sm:py-28">
      <SectionHeading
        eyebrow={t("landing.features.eyebrow")}
        title={t("landing.features.title")}
        subtitle={t("landing.features.subtitle")}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3"
      >
        <BentoTile className="min-h-[420px] items-center text-center sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <GradientOrb className="-right-16 -top-16 h-56 w-56 opacity-10" />
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-8">
            <RoutingBeam />
            <div className="max-w-sm">
              <p className="text-lg font-semibold sm:text-xl">{t("landing.features.flagship.title")}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("landing.features.flagship.description")}
              </p>
            </div>
          </div>
        </BentoTile>

        <BentoTile className="min-h-[200px] lg:col-start-3 lg:row-start-1">
          <BentoTileContent
            title={t("landing.features.reputation.title")}
            description={t("landing.features.reputation.description")}
            visual={<MiniGauge />}
          />
        </BentoTile>

        <BentoTile className="min-h-[200px] lg:col-start-4 lg:row-start-1">
          <BentoTileContent
            title={t("landing.features.leaderboard.title")}
            description={t("landing.features.leaderboard.description")}
            visual={<MiniLeaderboard />}
          />
        </BentoTile>

        <BentoTile className="min-h-[200px] lg:col-start-3 lg:row-start-2">
          <BentoTileContent
            title={t("landing.features.crm.title")}
            description={t("landing.features.crm.description")}
            visual={<LiveActivityFeed />}
            visualClassName="h-24"
          />
        </BentoTile>

        <BentoTile className="min-h-[200px] lg:col-start-4 lg:row-start-2">
          <BentoTileContent
            title={t("landing.features.qr.title")}
            description={t("landing.features.qr.description")}
            visual={<QRPeek />}
            visualClassName="h-24 justify-start"
          />
        </BentoTile>

        <BentoTile className="relative items-center py-14 text-center sm:col-span-2 lg:col-span-4 lg:col-start-1 lg:row-start-3">
          <GradientOrb className="bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 translate-y-1/2" />
          <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center gap-4">
            <div>
              <p className="text-lg font-semibold sm:text-xl">{t("landing.features.ai.title")}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("landing.features.ai.description")}
              </p>
            </div>
            <MiniChatSuggestion />
          </div>
        </BentoTile>
      </motion.div>
    </section>
  );
}
