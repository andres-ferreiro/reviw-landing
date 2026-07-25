// Soft blurred radial background accent in primary color. The gradient's
// own fade is a hard ramp to transparent at its "closest-side" edge, so
// blur-3xl's fixed 64px softening radius is what actually hides that edge.
// Against light mode's near-white background that's plenty (the color
// contrast at the tail end is already tiny), but the same 64px reads as a
// visible ring against dark mode's much darker background — a lower
// opacity and a wider blur radius push the fade far enough out that it
// disappears before it "ends," instead of getting clipped by the section's
// own overflow-hidden while still visibly tinted.
export function GradientOrb({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full opacity-20 blur-3xl dark:opacity-10 dark:blur-[100px] ${className}`}
      style={{ background: "radial-gradient(closest-side, var(--primary), transparent)" }}
    />
  );
}
