"use client";

// Inline hero-headline detail: renders as the text "5-star" on mount, then
// dissolves into 5 golden star icons popping in one by one, once. `mode
//="popLayout"` (not "wait") lets the exiting text and entering stars
// animate concurrently instead of a hard sequential swap, so they visually
// blend into each other rather than one finishing before the next starts.
// Sized in em units so it scales with whatever heading font-size it's
// nested inside.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";

export function FiveStarSwap() {
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowStars(true), 1400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="relative inline-flex h-[1em] items-center align-middle">
      <AnimatePresence mode="popLayout">
        {!showStars ? (
          <motion.span
            key="text"
            initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            5-star
          </motion.span>
        ) : (
          <motion.span
            key="stars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative inline-flex gap-0.5 overflow-hidden"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -45, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.15 + i * 0.09, type: "spring", stiffness: 260, damping: 16 }}
              >
                <Star className="h-[0.8em] w-[0.8em] fill-amber-400 text-amber-400" />
              </motion.span>
            ))}

            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-amber-100/90 to-transparent"
              initial={{ left: "-60%" }}
              animate={{ left: "160%" }}
              transition={{ delay: 1, duration: 1, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
