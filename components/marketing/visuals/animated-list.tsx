"use client";

// Adapted from Magic UI's AnimatedList (https://magicui.design/docs/components/animated-list).
// One behavior change from the source: this loops forever (index wraps with %)
// and caps at the 3 most recent items, since a marketing-page "live feed" should
// keep cycling rather than settle once every item has appeared.
import React, { ComponentPropsWithoutRef, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

function AnimatedListItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 40 }}
      layout
      className="mx-auto w-full"
    >
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  delay?: number;
  maxVisible?: number;
}

export const AnimatedList = React.memo(function AnimatedList({
  children,
  className,
  delay = 1800,
  maxVisible = 3,
  ...props
}: AnimatedListProps) {
  const [index, setIndex] = useState(0);
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % childrenArray.length);
    }, delay);
    return () => clearTimeout(timeout);
  }, [index, delay, childrenArray.length]);

  const itemsToShow = useMemo(() => {
    const upcoming = [];
    for (let i = 0; i <= index; i++) upcoming.push(childrenArray[i]);
    return upcoming.slice(-maxVisible).reverse();
  }, [index, childrenArray, maxVisible]);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)} {...props}>
      <AnimatePresence>
        {itemsToShow.map((item) => (
          <AnimatedListItem key={(item as React.ReactElement).key}>{item}</AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  );
});
