"use client";

// Faithful port of the app's own multi-client table (same grid, same status
// vocabulary, same "Custom" pricing badge) re-skinned onto this site's
// design tokens. Business names are generic placeholders, not real
// clients; revenue is illustrative and priced in the $65-95/mo range so
// the row total reads as a real book of business. Avatars come from the
// Dicebear "glass" API rather than static assets, same as the app.
import { Filter, Search, ChevronRight, ChevronsUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const rowContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const row = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

type Status = "active" | "trialing" | "pending" | "canceled";

interface Client {
  id: string;
  name: string;
  categoryKey: string;
  status: Status;
  revenue: number;
  isCustom?: boolean;
  dateAdded: string;
  avatarColor: string;
}

const CLIENTS: Client[] = [
  { id: "bright-smile", name: "Bright Smile Dental", categoryKey: "dental", status: "active", revenue: 95, isCustom: true, dateAdded: "7/6/2026", avatarColor: "ffd5dc" },
  { id: "urban-cuts", name: "Urban Cuts Barbershop", categoryKey: "barbershop", status: "active", revenue: 75, dateAdded: "6/18/2026", avatarColor: "b6e3f4" },
  { id: "fresh-bites", name: "Fresh Bites Café", categoryKey: "restaurant", status: "trialing", revenue: 75, dateAdded: "6/7/2026", avatarColor: "ffdfbf" },
  { id: "peak-fitness", name: "Peak Fitness Studio", categoryKey: "fitness", status: "pending", revenue: 75, dateAdded: "5/31/2026", avatarColor: "c0aede" },
  { id: "sparkle-auto", name: "Sparkle Auto Detail", categoryKey: "automotive", status: "canceled", revenue: 75, dateAdded: "5/24/2026", avatarColor: "d1d4f9" },
  { id: "bloom-nail", name: "Bloom Nail Studio", categoryKey: "salon", status: "trialing", revenue: 65, dateAdded: "5/6/2026", avatarColor: "c7f2c2" },
];

const STATUS_STYLES: Record<Status, string> = {
  active: "bg-success/10 text-success",
  trialing: "bg-info/10 text-info",
  pending: "bg-warning/10 text-warning",
  canceled: "bg-destructive/10 text-destructive",
};

const STATUS_DOT: Record<Status, string> = {
  active: "bg-success",
  trialing: "bg-info",
  pending: "bg-warning",
  canceled: "bg-destructive",
};

function avatarUrl(seed: string, backgroundColor: string) {
  return `https://api.dicebear.com/10.x/glass/svg?rotate=-38&scale=0.77&borderRadius=50&translateX=-1&flip=both&backgroundColor=${backgroundColor}&seed=${encodeURIComponent(seed)}`;
}

export function AgencyClientsTable({ fade = false }: { fade?: boolean }) {
  const { t } = useTranslations();
  const statusLabel: Record<Status, string> = {
    active: t("agencyPage.hero.table.statusActive"),
    trialing: t("agencyPage.hero.table.statusTrialing"),
    pending: t("agencyPage.hero.table.statusPending"),
    canceled: t("agencyPage.hero.table.statusCanceled"),
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-card p-4 text-left sm:p-6",
        fade ? "border-x border-t border-border/70" : "border border-border/70 shadow-sm"
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              disabled
              placeholder={t("agencyPage.hero.table.searchPlaceholder")}
              className="w-full rounded-lg border border-border/70 bg-background py-1.5 pl-8 pr-3 text-xs text-muted-foreground placeholder:text-muted-foreground/70 sm:text-sm"
            />
          </div>
          <span className="hidden items-center gap-1.5 rounded-lg border border-border/70 px-3 py-1.5 text-xs font-medium text-muted-foreground sm:inline-flex">
            <Filter className="h-3.5 w-3.5" />
            {t("agencyPage.hero.table.filters")}
          </span>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">{t("agencyPage.hero.table.results")}</span>
      </div>

      <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:grid">
        <span className="flex items-center gap-1">
          {t("agencyPage.hero.table.business")}
          <ChevronsUpDown className="h-3 w-3" />
        </span>
        <span className="flex items-center gap-1">
          {t("agencyPage.hero.table.status")}
          <ChevronsUpDown className="h-3 w-3" />
        </span>
        <span className="flex items-center gap-1">
          {t("agencyPage.hero.table.revenue")}
          <ChevronsUpDown className="h-3 w-3" />
        </span>
        <span className="flex items-center gap-1">
          {t("agencyPage.hero.table.added")}
          <ChevronsUpDown className="h-3 w-3" />
        </span>
        <span className="w-4" />
      </div>

      <motion.div variants={rowContainer} initial="hidden" animate="show" className="flex flex-col gap-1">
        {CLIENTS.map((client) => (
          <motion.div
            key={client.id}
            variants={row}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted/50 sm:grid-cols-[2fr_1fr_1fr_1fr_auto]"
          >
            <div className="col-span-2 flex min-w-0 items-center gap-3 sm:col-span-1">
              {/* eslint-disable-next-line @next/next/no-img-element -- dynamic external SVG avatar, not a static asset */}
              <img src={avatarUrl(client.id, client.avatarColor)} alt="" aria-hidden className="h-9 w-9 shrink-0 rounded-full" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{client.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {t(`agencyPage.hero.table.categories.${client.categoryKey}`)}
                </p>
              </div>
            </div>

            <div className="hidden items-center sm:flex">
              <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", STATUS_STYLES[client.status])}>
                <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[client.status])} />
                {statusLabel[client.status]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tabular-nums">${client.revenue.toFixed(2)}</span>
              {client.isCustom && (
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                  {t("agencyPage.hero.table.custom")}
                </span>
              )}
            </div>

            <div className="hidden items-center text-sm text-muted-foreground sm:flex">{client.dateAdded}</div>

            <div className="hidden items-center justify-end sm:flex">
              <ChevronRight className="h-4 w-4 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {fade && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 rounded-b-2xl bg-gradient-to-t from-background via-background/90 to-transparent"
        />
      )}
    </div>
  );
}
