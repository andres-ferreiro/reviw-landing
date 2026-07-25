// Number + label used in the social proof strip.
export function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-2xl font-bold tabular-nums tracking-tight sm:text-3xl">{value}</span>
      <span className="text-xs text-muted-foreground sm:text-sm">{label}</span>
    </div>
  );
}
