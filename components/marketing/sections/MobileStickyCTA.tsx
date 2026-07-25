"use client";

// Mobile-only sticky CTA bar — appears once the visitor scrolls past the
// hero (its own CTA has scrolled out of reach by then). Uses Motion's
// useScroll/useMotionValueEvent rather than a raw scroll listener.
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/marketing/primitives/CTAButton";
import { CTA_URLS } from "@/lib/constants";
import { useTranslations } from "@/lib/i18n";

export function MobileStickyCTA() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const { t } = useTranslations();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 600);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-card/95 p-3 backdrop-blur-md sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <CTAButton href={CTA_URLS.register} className="w-full justify-center">
            {t("common.startFreeTrial")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </CTAButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
