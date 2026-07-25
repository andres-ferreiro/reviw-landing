"use client";

// Minimal reimplementation of Magic UI's TypingAnimation (multi-word
// variant): types out each word, pauses, deletes it, then moves to the
// next word in the list, looping while `active`. Plain setTimeout/state
// rather than a library — the effect is simple enough not to warrant a
// dependency, and it stays consistent with how every other decorative
// loop in this codebase (WhiteLabelVisual's color swatch cycle, etc.) is
// implemented with plain intervals gated by an `active` prop.
import { useEffect, useState } from "react";

type Phase = "typing" | "pause" | "deleting";

export function TypingText({
  words,
  active,
  typeSpeed = 55,
  deleteSpeed = 28,
  pauseDuration = 1400,
  className,
}: {
  words: string[];
  active: boolean;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (!active) {
      setWordIndex(0);
      setCharCount(0);
      setPhase("typing");
      return;
    }

    const currentWord = words[wordIndex] ?? "";
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charCount < currentWord.length) {
        timer = setTimeout(() => setCharCount((c) => c + 1), typeSpeed);
      } else {
        timer = setTimeout(() => setPhase("deleting"), pauseDuration);
      }
    } else {
      if (charCount > 0) {
        timer = setTimeout(() => setCharCount((c) => c - 1), deleteSpeed);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [active, phase, charCount, wordIndex, words, typeSpeed, deleteSpeed, pauseDuration]);

  const text = (words[wordIndex] ?? "").slice(0, charCount);

  return (
    <span className={className}>
      {text}
      <span
        aria-hidden
        className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle"
        style={{ height: "1em" }}
      />
    </span>
  );
}
