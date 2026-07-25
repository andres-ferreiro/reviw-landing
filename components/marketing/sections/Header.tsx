"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/marketing/primitives/BrandMark";
import { ThemeToggle } from "@/components/marketing/primitives/ThemeToggle";
import { LanguageSwitch } from "@/components/marketing/primitives/LanguageSwitch";
import { CTAButton } from "@/components/marketing/primitives/CTAButton";
import { CTA_URLS } from "@/lib/constants";
import { useTranslations } from "@/lib/i18n";

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { t } = useTranslations();

  const navLinks = [
    { label: t("common.nav.features"), href: "/#features" },
    { label: t("common.nav.howItWorks"), href: "/#how-it-works" },
    { label: t("common.nav.pricing"), href: "/#pricing" },
    { label: t("common.nav.forAgencies"), href: "/for-agencies" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitch />
          <ThemeToggle />
          <Link
            href={CTA_URLS.login}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("common.signIn")}
          </Link>
          <CTAButton href={CTA_URLS.register}>{t("common.startFreeTrial")}</CTAButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/70 md:hidden"
          >
            <div className="container flex flex-col gap-4 py-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between">
                <Link href={CTA_URLS.login} className="text-sm font-medium text-muted-foreground">
                  {t("common.signIn")}
                </Link>
                <LanguageSwitch />
              </div>
              <CTAButton href={CTA_URLS.register}>{t("common.startFreeTrial")}</CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
