"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultLocale,
  LOCALE_STORAGE_KEY,
  resolveInitialLocale,
  toHtmlLang,
  type Locale,
} from "@/i18n/config";
import { translate, type TranslationParams } from "@/i18n/translations";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: TranslationParams) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = resolveInitialLocale();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate locale from localStorage on mount
    setLocaleState(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = toHtmlLang(locale);
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale, ready]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
  }, []);

  const t = useCallback(
    (key: string, params?: TranslationParams) => translate(locale, key, params),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  if (!ready) return null;

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

export function useTranslations() {
  return useI18n();
}
