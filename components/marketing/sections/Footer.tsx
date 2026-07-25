"use client";

import Link from "next/link";
import { BrandMark } from "@/components/marketing/primitives/BrandMark";
import { CTA_URLS } from "@/lib/constants";
import { useTranslations } from "@/lib/i18n";

export function Footer() {
  const { t } = useTranslations();

  // "#" links below are placeholders for pages not built yet (legal,
  // careers, etc.) — swap for real routes once those pages exist.
  const columns = [
    {
      heading: t("landing.footer.columns.product"),
      links: [
        { label: t("landing.footer.links.features"), href: "#features" },
        { label: t("landing.footer.links.howItWorks"), href: "#how-it-works" },
        { label: t("landing.footer.links.pricing"), href: "#pricing" },
      ],
    },
    {
      heading: t("landing.footer.columns.agency"),
      links: [
        { label: t("landing.footer.links.forAgencies"), href: "/for-agencies" },
        { label: t("landing.footer.links.signIn"), href: CTA_URLS.login },
      ],
    },
    {
      heading: t("landing.footer.columns.legal"),
      links: [
        { label: t("landing.footer.links.privacy"), href: "#" },
        { label: t("landing.footer.links.terms"), href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/70 bg-[color-mix(in_oklch,var(--primary)_6%,var(--background))] pb-20 sm:pb-0">
      <div className="container flex flex-col gap-12 py-14 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <BrandMark />
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("landing.footer.tagline")}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-16">
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {col.heading}
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="container flex flex-col-reverse items-center gap-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {t("landing.footer.copyright")}
          </span>
        </div>
      </div>
    </footer>
  );
}
