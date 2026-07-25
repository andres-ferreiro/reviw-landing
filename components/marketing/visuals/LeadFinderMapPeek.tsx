import Image from "next/image";
import { Crosshair, Star } from "lucide-react";

// Agency teaser background: a Lead Finder map mockup that fills the card
// (absolute inset-0 against the card's own `relative` positioning), fading
// to the card's own background color so it reads as part of the card
// rather than a boxed illustration sitting on top of it. `from-card`
// already resolves to the right value in both themes since it's a CSS
// variable, not a hardcoded color.
//
// The source map image (public/images/map-background.png) is a near-white
// street map, so it's inverted in dark mode rather than shown as-is — a
// light map would clash badly against a dark card.
//
// Below `lg` the card is a single stacked column (text, then button) that
// fills nearly the whole card height, so there's no safe zone left/bottom
// for the pins to sit without covering text — they're hidden below `lg`.
// The visible corner also flips: at `lg`+ the fade leaves the *top*-right
// visible (clear of the bottom-anchored text/button in the row layout);
// below `lg` it leaves the *bottom*-right visible instead, since text
// starts higher and the button sits bottom-left.
const PINS = [
  { top: "26%", left: "56%", score: "3.2", tone: "target" as const },
  { top: "38%", left: "72%", score: "4.7", tone: "cool" as const },
  { top: "36%", left: "88%", score: "4.1", tone: "warm" as const },
];

function Pin({ score, tone }: { score: string; tone: "warm" | "cool" | "target" }) {
  if (tone === "target") {
    return (
      <div className="flex items-center gap-1 rounded-full bg-foreground px-2 py-1 text-[11px] font-semibold text-background shadow-sm">
        <Star className="h-2.5 w-2.5 fill-current" />
        {score}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 rounded-full border border-border/70 bg-card px-2 py-1 text-[11px] font-semibold shadow-sm">
      <Star
        className={
          tone === "warm" ? "h-2.5 w-2.5 fill-warning text-warning" : "h-2.5 w-2.5 fill-info text-info"
        }
      />
      {score}
    </div>
  );
}

export function LeadFinderMapPeek() {
  return (
    <div className="absolute inset-0 bg-muted/30" aria-hidden>
      <Image
        src="/images/map-background.png"
        alt=""
        fill
        sizes="800px"
        className="object-cover opacity-90 dark:opacity-30 dark:invert"
      />

      <div className="hidden lg:contents">
        {PINS.map((pin) => (
          <div
            key={pin.top + pin.left}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: pin.top, left: pin.left }}
          >
            <Pin score={pin.score} tone={pin.tone} />
          </div>
        ))}

        <div className="absolute right-6 top-14 flex items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-sm">
          <Crosshair className="h-3 w-3 text-primary" />
          12 prospects nearby
        </div>
      </div>

      {/* Left fade: constant at every breakpoint */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-card via-card/70 to-transparent" />
      {/* Vertical fade: top visible corner on lg+, bottom visible corner below lg */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-card via-card/70 to-transparent lg:top-auto lg:bottom-0 lg:bg-gradient-to-t" />
    </div>
  );
}
