// Adapted from Magic UI's Grid Pattern (https://magicui.design/docs/components/grid-pattern)
// — restyled to use theme tokens (very low-opacity foreground) instead of a
// hardcoded gray, and masked with a radial gradient so it fades out toward
// the edges rather than covering the section edge-to-edge.
import { useId } from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: Array<[x: number, y: number]>;
  strokeDasharray?: string;
  className?: string;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  ...props
}: GridPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-foreground/[0.02] stroke-foreground/[0.06]",
        "[mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent_75%)]",
        className
      )}
      {...props}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy]) => (
            <rect strokeWidth="0" key={`${sx}-${sy}`} width={width - 1} height={height - 1} x={sx * width + 1} y={sy * height + 1} />
          ))}
        </svg>
      )}
    </svg>
  );
}
