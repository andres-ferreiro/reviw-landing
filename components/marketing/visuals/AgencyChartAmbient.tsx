"use client";

// Ambient background texture for the agency hero — faint animated chart
// traces that read as "revenue growing" without competing with the
// headline. Blended into the page the same way LeadFinderMapPeek blends
// into its card: instead of a hard-edged image, a radial mask fades the
// whole thing to transparent at the edges so it dissolves into the
// background rather than sitting on top of it as a visible layer.
import { motion } from "framer-motion";

const LINES = [
  { d: "M0,120 C150,120 200,40 400,40 S650,90 800,20", opacity: 0.5, delay: 0 },
  { d: "M0,150 C180,150 220,90 420,90 S680,130 800,70", opacity: 0.35, delay: 0.3 },
  { d: "M0,180 C200,180 260,140 440,140 S700,165 800,120", opacity: 0.22, delay: 0.6 },
];

export function AgencyChartAmbient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px] overflow-hidden opacity-70 dark:opacity-40"
      style={{
        maskImage: "radial-gradient(60% 60% at 50% 30%, black 0%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(60% 60% at 50% 30%, black 0%, transparent 75%)",
      }}
    >
      <svg viewBox="0 0 800 220" className="h-full w-full" preserveAspectRatio="none">
        {LINES.map((line, i) => (
          <motion.path
            key={i}
            d={line.d}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeOpacity={line.opacity}
            pathLength={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeOut", delay: line.delay }}
          />
        ))}
      </svg>
    </div>
  );
}
