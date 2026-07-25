"use client";

// Auto-cycling crossfade between the three real survey screenshots — shows
// customers can pick whichever format fits their brand. Fills whatever box
// the caller gives it; the caller owns the frame (phone bezel, notch, etc.)
//
// Each source screenshot is a tall (~1200x2000) capture with the actual
// survey content sitting at a different vertical band — DETAILED is dense
// top-to-bottom, INTERACTIVE and STAR have the real content only in the
// middle third with blank space above it. objectPosition is tuned per image
// so cropping shows the content, not blank space.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SURVEYS = [
  { src: "/images/DETAILED-SURVEY.png", alt: "Detailed multi-question survey", objectPosition: "center 12%" },
  { src: "/images/INTERACTIVE-SUREY.png", alt: "Interactive emoji-scale survey", objectPosition: "center 48%" },
  { src: "/images/STAR-SURVEY.png", alt: "Star rating survey", objectPosition: "center 45%" },
];

export function SurveyPeek({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SURVEYS.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={SURVEYS[index].src}
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={SURVEYS[index].src}
            alt={SURVEYS[index].alt}
            fill
            sizes="260px"
            className="object-cover"
            style={{ objectPosition: SURVEYS[index].objectPosition }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
