import { MessageCircle, Star, TrendingUp, Trophy } from "lucide-react";
import { AnimatedList } from "./animated-list";

const EVENTS = [
  { icon: Star, color: "bg-amber-400/15 text-amber-500", title: "New 5-star review", meta: "Maria J. · just now" },
  { icon: MessageCircle, color: "bg-primary/15 text-primary", title: "Survey completed", meta: "David K. · 2m ago" },
  { icon: Trophy, color: "bg-amber-400/15 text-amber-500", title: "Goal reached", meta: "Alex · 5m ago" },
  { icon: TrendingUp, color: "bg-info/15 text-info", title: "Google rating synced", meta: "4.8★ · 12m ago" },
];

// Customer CRM tile visual — every saved respondent shown as a live-feeling feed.
export function LiveActivityFeed() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatedList className="gap-2" delay={1800} maxVisible={2}>
        {EVENTS.map((event) => (
          <div
            key={event.title}
            className="flex w-full items-center gap-2.5 rounded-xl border border-border/70 bg-card px-3 py-2"
          >
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${event.color}`}>
              <event.icon className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium">{event.title}</p>
              <p className="truncate text-[11px] text-muted-foreground">{event.meta}</p>
            </div>
          </div>
        ))}
      </AnimatedList>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-card/40 to-transparent" />
    </div>
  );
}
