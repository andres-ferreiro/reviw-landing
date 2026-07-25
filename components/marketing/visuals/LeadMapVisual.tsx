"use client";

// Feature-card visual for the lead-finding step: full-bleed background
// treatment (absolute inset-0), same grammar as the homepage bento's
// flagship LeadFinderMapPeek tile — the map fills the entire visual zone
// rather than sitting in its own boxed panel. Purpose-built rather than
// reusing LeadFinderMapPeek directly: that component hides pins below `lg`
// and reserves fade space for overlaid card text, neither of which fits
// here (the parent FeatureCard handles its own text-side fade). Same Pin
// visual language (score + star, warm/cool/target tones) for consistency.
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Crosshair, Star } from "lucide-react";

const PINS = [
  { top: "20%", left: "32%", score: "3.1", tone: "target" as const },
  { top: "32%", left: "62%", score: "4.6", tone: "cool" as const },
  { top: "58%", left: "26%", score: "4.2", tone: "warm" as const },
  { top: "64%", left: "72%", score: "3.8", tone: "target" as const },
];

function Pin({ score, tone }: { score: string; tone: "warm" | "cool" | "target" }) {
  if (tone === "target") {
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-sm font-semibold text-background shadow-md">
        <Star className="h-3.5 w-3.5 fill-current" />
        {score}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5 text-sm font-semibold shadow-md">
      <Star className={tone === "warm" ? "h-3.5 w-3.5 fill-warning text-warning" : "h-3.5 w-3.5 fill-info text-info"} />
      {score}
    </div>
  );
}

export function LeadMapVisual({ active }: { active: boolean }) {
  // Bumped every time `active` flips true so the pin layer remounts and
  // replays its stagger each time the step is revisited, not just once.
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (active) setCycle((c) => c + 1);
  }, [active]);

  return (
    <div className="absolute inset-0" aria-hidden>
      <motion.div
        className="absolute inset-0"
        animate={active ? { scale: [1, 1.08, 1], x: [0, -8, 0], y: [0, 6, 0] } : { scale: 1, x: 0, y: 0 }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/map-background.png"
          alt=""
          fill
          sizes="900px"
          className="object-cover opacity-90 dark:opacity-30 dark:invert"
        />
      </motion.div>

      <div key={cycle}>
        {PINS.map((pin, i) => (
          <motion.div
            key={pin.top + pin.left}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: pin.top, left: pin.left }}
            initial={{ opacity: 0, y: -20, scale: 0.6 }}
            animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -20, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 320, damping: 18, delay: active ? 0.3 + i * 0.15 : 0 }}
          >
            <Pin score={pin.score} tone={pin.tone} />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3, delay: active ? 0.3 + PINS.length * 0.15 + 0.15 : 0 }}
          className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm"
        >
          <Crosshair className="h-3.5 w-3.5 text-primary" />
          14 prospects nearby
        </motion.div>
      </div>
    </div>
  );
}
