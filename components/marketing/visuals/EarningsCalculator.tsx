"use client";

// The section's finale: merges what used to be two separate pieces — the
// passive canned-notification demo (EarningsVisual) and the standalone
// MoneyMathModule calculator further down the page. Both survive here: the
// Stripe notification toasts still play as ambient proof-of-life, using the
// same AnimatedList primitive LiveActivityFeed already uses elsewhere on
// the site (rather than a bespoke AnimatePresence loop) — it handles its
// own timing/looping internally, so it doesn't need an external `active`
// gate. The toasts are deliberately NOT the same number as the calculator —
// they're a fixed demo sequence, the profit figure is whatever the visitor
// drags the sliders to — so they carry no running total of their own;
// showing two competing "totals" would read as a bug, not a feature.
import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { PRICING } from "@/lib/constants";
import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { AnimatedList } from "./animated-list";

const AGENCY_BASE_COST = Number(PRICING.agency.monthly.price.replace(/\D/g, ""));
const INCLUDED_LOCATIONS = PRICING.agency.includedLocations;
const EXTRA_LOCATION_PRICE = Number(PRICING.agency.extraLocationPrice.replace(/\D/g, ""));

// Defaults reflect a realistic mid-size agency, not the smallest possible
// client list: 20 clients (5 past the 15 included) at $60/mo each, so the
// extra-location fee is visible from the very first render.
const DEFAULT_CLIENTS = 20;
const DEFAULT_PRICE = 60;

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// base-ui's Slider onValueChange hands back a plain number when the change
// comes from a track click, but an array when it comes from a thumb drag —
// normalize both here rather than assuming the array shape everywhere.
const singleValue = (value: number | readonly number[]) => (Array.isArray(value) ? value[0] : value);

// Fixed-shape ramp scaled to the current revenue, purely illustrative (the
// disclaimer below says so) — a stand-in for "this is what growth toward
// your number could look like," not a real projection.
const GROWTH_SHAPE = [0.08, 0.22, 0.4, 0.62, 0.8, 1];

const STRIPE_ICON_URL =
  "https://gpagwuhcgnxmbjgenogr.supabase.co/storage/v1/object/public/general-assets/stripe-icon.png";

const NOTIFS = [
  { titleKey: "notif1Title", metaKey: "notif1Meta" },
  { titleKey: "notif2Title", metaKey: "notif2Meta" },
  { titleKey: "notif3Title", metaKey: "notif3Meta" },
] as const;

function generatePaths(data: number[]) {
  const width = 800;
  const height = 280;
  const max = Math.max(...data) || 1;
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - (v / max) * (height - 6) - 3,
  }));
  const areaPath = [`M 0 ${height}`, ...points.map((p) => `L ${p.x} ${p.y}`), `L ${width} ${height}`, "Z"].join(" ");
  const linePath = [`M ${points[0].x} ${points[0].y}`, ...points.slice(1).map((p) => `L ${p.x} ${p.y}`)].join(" ");
  return { areaPath, linePath };
}

export function EarningsCalculator() {
  const { t } = useTranslations();
  const [clients, setClients] = useState(DEFAULT_CLIENTS);
  const [pricePerClient, setPricePerClient] = useState(DEFAULT_PRICE);

  const { revenue, cost, extraClients, profit, margin } = useMemo(() => {
    const revenue = clients * pricePerClient;
    const extraClients = Math.max(0, clients - INCLUDED_LOCATIONS);
    const cost = AGENCY_BASE_COST + extraClients * EXTRA_LOCATION_PRICE;
    const profit = revenue - cost;
    const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;
    return { revenue, cost, extraClients, profit, margin };
  }, [clients, pricePerClient]);

  const { areaPath, linePath } = useMemo(
    () => generatePaths(GROWTH_SHAPE.map((f) => f * revenue)),
    [revenue]
  );
  const chartId = "earnings-calculator-fill";

  return (
    <div className="relative overflow-hidden">
      <svg
        viewBox="0 0 800 280"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-[200px] w-full sm:h-[260px]"
        aria-hidden
      >
        <defs>
          <linearGradient id={chartId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${chartId})`} />
        <path d={linePath} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* Fades the line's right edge into the card background instead of
          letting it end on a hard, ruler-straight cut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[200px] w-24 bg-gradient-to-r from-transparent to-background sm:h-[260px] sm:w-32"
      />

      <div className="relative z-10 flex flex-col gap-10 pt-6 sm:pt-8">
        <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Fixed height + overflow-hidden so the card doesn't resize as
              each toast lands — the list fills a stable window instead,
              with new cards arriving up front and older ones receding
              toward the bottom, faded out by the gradient mask rather than
              pushing the whole card taller. */}
          <div className="relative h-[210px] w-full overflow-hidden sm:max-w-xs">
            <AnimatedList className="gap-2.5" delay={1300} maxVisible={3}>
              {NOTIFS.map((n) => (
                <div
                  key={n.titleKey}
                  className="flex w-full items-center gap-3 rounded-2xl border border-border/70 bg-background/95 px-4 py-3 shadow-sm backdrop-blur-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- external Supabase asset, not a static import */}
                  <img src={STRIPE_ICON_URL} alt="" aria-hidden className="h-8 w-8 shrink-0 rounded-lg object-contain" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {t<string>(`agencyPage.featureShowcase.visuals.earnings.${n.titleKey}`)}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {t<string>(`agencyPage.featureShowcase.visuals.earnings.${n.metaKey}`)}
                    </p>
                  </div>
                </div>
              ))}
            </AnimatedList>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="sm:mr-2 sm:mt-8 sm:text-right">
            <p className="text-xs font-medium text-muted-foreground">{t("agencyPage.moneyMath.profitLabel")}</p>
            <p
              className={cn(
                "text-5xl font-bold tabular-nums tracking-tight sm:text-6xl",
                profit >= 0 ? "text-foreground" : "text-destructive"
              )}
            >
              {currency(profit)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          <div>
            <p className="text-xs text-muted-foreground">{t("agencyPage.moneyMath.revenueLabel")}</p>
            <p className="text-lg font-semibold tabular-nums">{currency(revenue)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t("agencyPage.moneyMath.costLabel")}</p>
            <p className="text-lg font-semibold tabular-nums text-muted-foreground">−{currency(cost)}</p>
            {extraClients > 0 && (
              <p className="text-[11px] text-muted-foreground">
                {INCLUDED_LOCATIONS} + {extraClients} × ${EXTRA_LOCATION_PRICE}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t("agencyPage.moneyMath.marginLabel")}</p>
            <p className="text-lg font-semibold tabular-nums text-primary">{margin}%</p>
          </div>
        </div>

        <div className="grid gap-6 rounded-2xl border border-border/70 bg-card/80 p-5 backdrop-blur-sm sm:grid-cols-2 sm:p-6">
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="finale-clients-slider" className="text-sm font-medium text-muted-foreground">
                {t("agencyPage.moneyMath.clientsLabel")}
              </label>
              <span className="text-xl font-bold tabular-nums">{clients}</span>
            </div>
            <Slider
              id="finale-clients-slider"
              className="mt-2"
              min={1}
              max={30}
              step={1}
              value={[clients]}
              onValueChange={(value) => setClients(singleValue(value))}
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="finale-price-slider" className="text-sm font-medium text-muted-foreground">
                {t("agencyPage.moneyMath.priceLabel")}
              </label>
              <span className="text-xl font-bold tabular-nums">{currency(pricePerClient)}</span>
            </div>
            <Slider
              id="finale-price-slider"
              className="mt-2"
              min={15}
              max={75}
              step={1}
              value={[pricePerClient]}
              onValueChange={(value) => setPricePerClient(singleValue(value))}
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{t("agencyPage.moneyMath.disclaimer")}</p>
      </div>
    </div>
  );
}
