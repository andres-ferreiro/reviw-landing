"use client";

// Lightweight client-side i18n: no route-based locales (that's a bigger
// migration than this pass covers) — just a React context holding the
// current locale, persisted to localStorage, with a `t()` accessor over
// the content/{en,es}.json dictionaries. `t()` returns whatever the JSON
// value is (string, array, or object) so callers can pull lists (features,
// FAQ items, testimonials) as well as plain strings.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import en from "@/content/en.json";
import es from "@/content/es.json";

export const SUPPORTED_LOCALES = ["en", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

const DICTIONARIES = { en, es } as const;
const STORAGE_KEY = "reviw-locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") setLocaleState(stored);
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

function getPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}

export function useTranslations() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useTranslations must be used within a LocaleProvider");
  const dict = DICTIONARIES[ctx.locale];

  function t<T = string>(key: string): T {
    const value = getPath(dict, key);
    if (value === undefined) {
      // Missing key: fall back to English rather than showing raw dot-path text.
      const fallback = getPath(en, key);
      return (fallback as T) ?? (key as unknown as T);
    }
    return value as T;
  }

  return { t, locale: ctx.locale, setLocale: ctx.setLocale };
}
