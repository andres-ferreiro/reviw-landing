// Static grain texture (SVG feTurbulence, not animated/canvas) used to add
// subtle texture to soft gradient backgrounds. Opacity/blend controlled by
// the caller via className since the right strength varies per use.
export function NoiseOverlay({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <filter id="reviw-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#reviw-noise)" />
    </svg>
  );
}
