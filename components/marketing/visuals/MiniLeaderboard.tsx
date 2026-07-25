"use client";

import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

const ROWS = [
  { rank: 1, name: "Alex", pct: 92 },
  { rank: 2, name: "Jordan", pct: 78 },
  { rank: 3, name: "Sam", pct: 61 },
];

// Team Leaderboard tile visual — sample ranked rows, not a real screenshot.
// Bars grow in from 0 the first time they scroll into view.
export function MiniLeaderboard() {
  return (
    <div className="flex w-full flex-col gap-2.5">
      {ROWS.map((row, i) => (
        <div key={row.rank} className="flex items-center gap-2.5">
          {row.rank === 1 ? (
            <Trophy className="h-4 w-4 shrink-0 text-amber-400" />
          ) : (
            <span className="w-4 shrink-0 text-center text-xs font-semibold text-muted-foreground">
              {row.rank}
            </span>
          )}
          <span className="w-12 shrink-0 text-xs font-medium">{row.name}</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: "0%" }}
              whileInView={{ width: `${row.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.15 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
