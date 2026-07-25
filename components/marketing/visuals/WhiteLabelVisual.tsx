"use client";

// Feature-card visual for AgencyFeatureShowcase's white-label step. No own
// card chrome — it fills the parent big card's visual zone directly (the
// card itself provides the border/background), matching the "blend into
// the card" bento-flagship treatment. Logo swap timing adapted from
// transitions.dev's icon-swap reference; the domain field uses TypingText
// (adapted from Magic UI's TypingAnimation) instead of a crossfade, since
// "typing out a domain" reads more literally as "this is editable" than a
// fade between two static strings.
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Check } from "lucide-react";
import { GridPattern } from "@/components/marketing/primitives/grid-pattern";
import { GradientOrb } from "@/components/marketing/primitives/GradientOrb";
import { TypingText } from "@/components/marketing/primitives/TypingText";
import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SWATCHES = ["var(--primary)", "var(--info)", "var(--warning)"];

export function WhiteLabelVisual({ active }: { active: boolean }) {
  const { t } = useTranslations();
  const [logoUploaded, setLogoUploaded] = useState(false);
  const [swatchIndex, setSwatchIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      setLogoUploaded(false);
      setSwatchIndex(0);
      return;
    }
    const logoTimer = setTimeout(() => setLogoUploaded(true), 700);
    const swatchInterval = setInterval(() => setSwatchIndex((s) => (s + 1) % SWATCHES.length), 1600);
    return () => {
      clearTimeout(logoTimer);
      clearInterval(swatchInterval);
    };
  }, [active]);

  const domainWords = [
    t<string>("agencyPage.featureShowcase.visuals.whiteLabel.domainDefault"),
    t<string>("agencyPage.featureShowcase.visuals.whiteLabel.domainCustom"),
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-muted/20 p-8 sm:p-12">
      <GridPattern width={32} height={32} />
      <GradientOrb className="-right-16 -top-16 h-64 w-64 opacity-15" />
      <GradientOrb className="-bottom-20 -left-10 h-56 w-56 opacity-10" />

      <div className="relative z-10 flex w-full max-w-md flex-col gap-5">
        <div className="flex items-center gap-5">
          <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-2 border-dashed border-border">
            <AnimatePresence mode="wait">
              {logoUploaded ? (
                <motion.div
                  key="uploaded"
                  initial={{ opacity: 0, scale: 0.25, filter: "blur(2px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="grid h-14 w-14 place-items-center rounded-xl bg-primary text-primary-foreground"
                >
                  <Check className="h-7 w-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.25, filter: "blur(2px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.25, filter: "blur(2px)" }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                >
                  <Upload className="h-7 w-7 text-muted-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {t("agencyPage.featureShowcase.visuals.whiteLabel.logoLabel")}
            </p>
            <p className="text-lg font-semibold">{logoUploaded ? "logo.svg" : "—"}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 rounded-2xl border border-border/60 bg-background px-5 py-4">
          <p className="text-xs font-medium text-muted-foreground">
            {t("agencyPage.featureShowcase.visuals.whiteLabel.domainLabel")}
          </p>
          <div className="h-7">
            <TypingText words={domainWords} active={active} className="text-lg font-semibold tabular-nums" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background px-5 py-4">
          <p className="text-xs font-medium text-muted-foreground">
            {t("agencyPage.featureShowcase.visuals.whiteLabel.colorLabel")}
          </p>
          <div className="flex items-center gap-3">
            {SWATCHES.map((color, i) => (
              <span
                key={color}
                className={cn(
                  "h-6 w-6 rounded-full ring-2 ring-offset-2 ring-offset-background transition-shadow",
                  i === swatchIndex ? "ring-foreground/70" : "ring-transparent"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
