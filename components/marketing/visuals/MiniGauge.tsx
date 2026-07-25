"use client";

// Ported from the dashboard's actual gauge (src/components/ScoreGauge.tsx in
// the main revii-foundation app) — same arc math, same rose->amber->lime->emerald
// gradient — trimmed to a fixed sample score for this tile and animated to
// fill in on scroll instead of rendering statically.
import { motion } from "framer-motion";

export function MiniGauge({ score = 8.7, max = 10 }: { score?: number; max?: number }) {
  const R = 72;
  const cx = 100;
  const cy = 98;
  const totalLen = Math.PI * R;
  const pct = Math.max(0, Math.min(1, score / max));
  const dashOffset = totalLen * (1 - pct);

  return (
    <svg viewBox="0 0 200 108" className="h-auto w-36">
      <defs>
        <linearGradient id="mini-gauge-gradient" x1={cx - R} y1="0" x2={cx + R} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="65%" stopColor="#a3e635" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path
        d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
        fill="none"
        className="stroke-border"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <motion.path
        d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
        fill="none"
        stroke="url(#mini-gauge-gradient)"
        strokeWidth="13"
        strokeLinecap="round"
        strokeDasharray={`${totalLen} ${totalLen}`}
        initial={{ strokeDashoffset: totalLen }}
        whileInView={{ strokeDashoffset: dashOffset }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <text x={cx} y={cy - 18} textAnchor="middle" fill="currentColor" fontSize="34" fontWeight="700" fontFamily="inherit">
        {Number.isInteger(score) ? score : score.toFixed(1)}
      </text>
      <text x={cx} y={cy - 1} textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="inherit">
        / {max}
      </text>
    </svg>
  );
}
