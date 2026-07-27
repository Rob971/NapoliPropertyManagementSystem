export const locales = ["it", "en-GB"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "it";

export const localeLabels: Record<Locale, string> = {
  it: "Italiano",
  "en-GB": "English (UK)",
};

export const localeFlags: Record<Locale, string> = {
  it: "🇮🇹",
  "en-GB": "🇬🇧",
};

export const LOCALE_STORAGE_KEY = "napoli-pms-locale";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && isLocale(stored)) return stored;

  return defaultLocale;
}

export function toHtmlLang(locale: Locale): string {
  return locale === "en-GB" ? "en-GB" : "it";
}

export function toDateLocale(locale: Locale): string {
  return locale === "en-GB" ? "en-GB" : "it-IT";
}
