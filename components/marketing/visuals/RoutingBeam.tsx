"use client";

// Flagship-tile visual: every distribution channel feeds into Reviw, which
// then routes happy customers to Google and unhappy ones to private feedback.
// Built on the real Magic UI AnimatedBeam technique (ref-measured node
// positions + ResizeObserver), which is the right tool here since node count
// and spacing come from flexbox, not fixed coordinates.
import { forwardRef, useRef } from "react";
import Image from "next/image";
import { Lock, Mail, QrCode, Link2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./animated-beam";

const GOOGLE_ICON_URL =
  "https://gpagwuhcgnxmbjgenogr.supabase.co/storage/v1/object/public/general-assets/Google%20Icon.svg";

const Node = forwardRef<HTMLDivElement, { className?: string; children: React.ReactNode }>(
  ({ className, children }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )
);
Node.displayName = "Node";

export function RoutingBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const mailRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const googleRef = useRef<HTMLDivElement>(null);
  const privateRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-56 w-full max-w-md items-center justify-between sm:h-64"
    >
      <div className="flex flex-col gap-8">
        <Node ref={qrRef}>
          <QrCode className="h-4 w-4 text-muted-foreground" />
        </Node>
        <Node ref={linkRef}>
          <Link2 className="h-4 w-4 text-muted-foreground" />
        </Node>
        <Node ref={mailRef}>
          <Mail className="h-4 w-4 text-muted-foreground" />
        </Node>
      </div>

      <Node ref={hubRef} className="h-16 w-16 border-primary/40 bg-primary/10">
        <Star className="h-6 w-6 fill-primary text-primary" />
      </Node>

      <div className="flex flex-col gap-10">
        <Node ref={googleRef}>
          <Image src={GOOGLE_ICON_URL} alt="Google" width={20} height={20} />
        </Node>
        <Node ref={privateRef}>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </Node>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={qrRef} toRef={hubRef} curvature={40} duration={3.5} />
      <AnimatedBeam containerRef={containerRef} fromRef={linkRef} toRef={hubRef} curvature={0} duration={3.5} delay={0.3} />
      <AnimatedBeam containerRef={containerRef} fromRef={mailRef} toRef={hubRef} curvature={-40} duration={3.5} delay={0.6} />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={hubRef}
        toRef={googleRef}
        curvature={55}
        duration={3.5}
        delay={0.9}
        gradientStartColor="var(--success)"
        gradientStopColor="var(--primary)"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={hubRef}
        toRef={privateRef}
        curvature={-55}
        duration={3.5}
        delay={1.2}
        gradientStartColor="var(--muted-foreground)"
        gradientStopColor="var(--primary)"
      />
    </div>
  );
}
