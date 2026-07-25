import { cn } from "@/lib/utils";

// Card wrapper for BentoFeatureGrid tiles. Grid placement (span/start) is
// passed in via className from the section, so this stays a dumb shell.
export function BentoTile({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/40 p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-sm sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

// Shared title + description + visual layout used by the four small square
// tiles. Any "fade into the background" treatment for a given visual lives
// on that visual itself (see QRPeek), self-contained to its own box — a
// shared blur spanning into this text area caused a visible seam, because
// the fade's opaque `from-card` never matched the tile's own translucent
// bg-card/40 at rest.
export function BentoTileContent({
  title,
  description,
  visual,
  visualClassName = "h-24",
}: {
  title: string;
  description: string;
  visual: React.ReactNode;
  visualClassName?: string;
}) {
  return (
    <>
      <div className={cn("flex items-center justify-center", visualClassName)}>{visual}</div>
      <div className="mt-auto pt-6">
        <p className="text-base font-semibold">{title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </>
  );
}
