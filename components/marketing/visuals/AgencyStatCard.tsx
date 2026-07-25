"use client";

// Matches the real app's dashboard stat card: label + muted icon up top,
// a big value, a plain caption underneath, and an area chart that bleeds
// to the card's own left/right/bottom edges rather than sitting inside a
// padded box. Single brand-mint color. Chart draws in on mount.
import { motion } from "framer-motion";
import { NumberPopIn } from "./NumberPopIn";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface DataPoint {
  value: number;
}

function generatePaths(data: DataPoint[]) {
  const width = 280;
  const height = 56;

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;

  const points = data.map((point, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((point.value - min) / range) * (height - 6) - 3;
    return { x, y };
  });

  const areaPath = [`M 0 ${height}`, ...points.map((p) => `L ${p.x} ${p.y}`), `L ${width} ${height}`, "Z"].join(" ");
  const linePath = [`M ${points[0].x} ${points[0].y}`, ...points.slice(1).map((p) => `L ${p.x} ${p.y}`)].join(" ");

  return { areaPath, linePath };
}

export function AgencyStatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  data,
  delay = 0,
  emphasize = false,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
  data: DataPoint[];
  delay?: number;
  emphasize?: boolean;
  className?: string;
}) {
  const { areaPath, linePath } = generatePaths(data);
  const chartId = `agency-stat-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border/60 bg-card text-left", className)}>
      <div className="p-4 pb-1.5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {Icon && <Icon className="h-4 w-4 shrink-0 text-muted-foreground/50" />}
        </div>
        <p className={cn("mt-0.5 font-bold tracking-tight", emphasize ? "text-3xl" : "text-2xl")}>
          <NumberPopIn value={value} />
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
      </div>

      <div className="h-12 w-full">
        <svg viewBox="0 0 280 56" className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={chartId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={areaPath}
            fill={`url(#${chartId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: delay + 0.3 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay, ease: "easeOut" }}
          />
        </svg>
      </div>
    </div>
  );
}
