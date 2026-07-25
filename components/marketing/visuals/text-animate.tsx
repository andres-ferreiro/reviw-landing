"use client";

// Adapted from Magic UI's TextAnimate (https://magicui.design/docs/components/text-animate)
// — trimmed to the animation presets actually used on this site rather than
// the full upstream library (which also covers per-axis scale variants etc).
import { ElementType } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationType =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight";

type SplitBy = "text" | "word" | "character" | "line";

const STAGGER_BY: Record<SplitBy, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.02,
  line: 0.08,
};

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const ITEM_VARIANTS: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.3 } },
    exit: { opacity: 0, filter: "blur(10px)" },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, filter: "blur(10px)", y: 20 },
  },
  blurInDown: {
    hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
    show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, filter: "blur(10px)", y: -20 },
  },
  slideUp: {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: -20, opacity: 0 },
  },
  slideDown: {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: 20, opacity: 0 },
  },
  slideLeft: {
    hidden: { x: 20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: -20, opacity: 0 },
  },
  slideRight: {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: 20, opacity: 0 },
  },
};

function splitText(text: string, by: SplitBy): string[] {
  switch (by) {
    case "character":
      return text.split("");
    case "line":
      return text.split("\n");
    case "word":
      return text.split(/(\s+)/);
    default:
      return [text];
  }
}

export interface TextAnimateProps {
  children: string;
  className?: string;
  animation?: AnimationType;
  by?: SplitBy;
  once?: boolean;
  as?: ElementType;
  delay?: number;
}

export function TextAnimate({
  children,
  className,
  animation = "fadeIn",
  by = "word",
  once = true,
  as = "p",
  delay = 0,
}: TextAnimateProps) {
  const MotionComponent = motion.create(as) as ElementType;
  const segments = splitText(children, by);
  const itemVariants = ITEM_VARIANTS[animation];

  return (
    <MotionComponent
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once }}
      variants={{
        ...containerVariants,
        show: { ...containerVariants.show, transition: { staggerChildren: STAGGER_BY[by], delayChildren: delay } },
      }}
      className={cn("whitespace-pre-wrap", className)}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={`${by}-${i}-${segment}`}
          variants={itemVariants}
          className={by === "line" ? "block" : "inline-block whitespace-pre"}
        >
          {segment}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
