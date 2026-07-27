import type { Locale } from "@/i18n/config";
import enGB from "@/i18n/locales/en-GB.json";
import it from "@/i18n/locales/it.json";

export type TranslationDictionary = typeof it;

const dictionaries: Record<Locale, TranslationDictionary> = {
  it,
  "en-GB": enGB,
};

export function getDictionary(locale: Locale): TranslationDictionary {
  return dictionaries[locale];
}

export type TranslationParams = Record<string, string | number>;

export function translate(
  locale: Locale,
  key: string,
  params?: TranslationParams
): string {
  const dictionary = getDictionary(locale);
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dictionary);

  if (typeof value !== "string") return key;

  if (!params) return value;

  return Object.entries(params).reduce(
    (result, [paramKey, paramValue]) =>
      result.replaceAll(`{${paramKey}}`, String(paramValue)),
    value
  );
}
