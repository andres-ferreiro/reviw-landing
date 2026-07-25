"use client";

import { useTranslations } from "@/lib/i18n";

export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale } = useTranslations();

  return (
    <div className={`flex items-center gap-1 rounded-full border border-border/70 p-0.5 text-xs font-semibold ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-2 py-1 transition-colors ${
          locale === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("es")}
        className={`rounded-full px-2 py-1 transition-colors ${
          locale === "es" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
        }`}
      >
        ES
      </button>
    </div>
  );
}
