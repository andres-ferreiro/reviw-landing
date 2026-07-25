// Adapted from Magic UI's Shimmer Button (https://magicui.design/docs/components/shimmer-button)
// — the upstream version renders a <button>; ours renders a <Link> since
// every CTA in this codebase navigates rather than submits. Requires the
// animate-shimmer-slide / animate-spin-around utilities in globals.css.
// Colors default to our brand tokens instead of the upstream white-on-black.
import Link from "next/link";
import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

export function ShimmerButton({
  href,
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "2.5s",
  borderRadius = "9999px",
  background = "var(--primary)",
}: ShimmerButtonProps) {
  return (
    <Link
      href={href}
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as CSSProperties
      }
      className={cn(
        "group relative z-0 flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap px-7 py-4 text-sm font-semibold text-primary-foreground [background:var(--bg)] [border-radius:var(--radius)]",
        "transform-gpu transition-transform duration-300 ease-in-out hover:scale-[1.02] active:translate-y-px active:scale-100",
        className
      )}
    >
      <div className="absolute inset-0 -z-30 overflow-visible blur-[2px] @container-[size]">
        <div className="animate-shimmer-slide absolute inset-0 aspect-square h-[100cqh] [mask:none]">
          <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>

      {children}

      <div className="absolute inset-0 size-full [border-radius:var(--radius)] shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]" />
      <div className="absolute inset-(--cut) -z-20 [background:var(--bg)] [border-radius:var(--radius)]" />
    </Link>
  );
}
