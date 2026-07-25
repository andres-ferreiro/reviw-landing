"use client";

import { motion } from "framer-motion";

// Adapted from the app's digit pop-in effect (t-digit-pop-in): each
// character of the formatted value blurs/translates/fades in with a ~70ms
// stagger, implemented with framer-motion variants instead of a global CSS
// keyframe so it stays self-contained to this component.
export function NumberPopIn({ value, className }: { value: string; className?: string }) {
  return (
    <span className={className} aria-label={value}>
      {value.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}
