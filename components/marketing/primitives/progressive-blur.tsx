"use client";

// Adapted from Magic UI's Progressive Blur (https://magicui.design/docs/components/progressive-blur)
// — stacks one absolutely-positioned div per blur level, each masked to a
// sliding window so blur strength increases smoothly toward the edge
// instead of a single hard backdrop-blur cutoff. `position="both"` isn't
// implemented (we only need "bottom" here) — falls back to "bottom".
import { cn } from "@/lib/utils";

export interface ProgressiveBlurProps {
  className?: string;
  height?: string;
  position?: "top" | "bottom" | "both";
  blurLevels?: number[];
}

export function ProgressiveBlur({
  className,
  height = "30%",
  position = "bottom",
  blurLevels = [0.5, 1, 2, 4, 8, 16, 32, 64],
}: ProgressiveBlurProps) {
  const n = blurLevels.length;
  const unit = 100 / n;
  const effectivePosition = position === "both" ? "bottom" : position;
  const direction = effectivePosition === "top" ? "to top" : "to bottom";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 z-[5]",
        effectivePosition === "top" ? "top-0" : "bottom-0",
        className
      )}
      style={{ height }}
    >
      {blurLevels.map((blur, i) => {
        const stops = `rgba(0,0,0,0) ${i * unit}%, rgba(0,0,0,1) ${(i + 1) * unit}%, rgba(0,0,0,1) ${
          (i + 2) * unit
        }%, rgba(0,0,0,0) ${(i + 3) * unit}%`;
        const mask = `linear-gradient(${direction}, ${stops})`;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              zIndex: i + 1,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
