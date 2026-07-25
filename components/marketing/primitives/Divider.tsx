export function Divider({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return <div className="hidden h-10 w-px shrink-0 bg-border/70 sm:block" />;
  }
  return <div className="h-px w-full bg-border/70" />;
}
