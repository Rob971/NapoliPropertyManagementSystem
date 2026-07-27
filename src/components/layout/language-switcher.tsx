"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { localeFlags, localeLabels, locales, type Locale } from "@/i18n/config";
import { useTranslations } from "@/i18n/i18n-provider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useTranslations();

  return (
    <div className={cn("flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1", className)}>
      <Globe className="ml-1.5 size-4 text-muted-foreground" aria-hidden />
      {locales.map((code) => (
        <Button
          key={code}
          size="xs"
          variant={locale === code ? "default" : "ghost"}
          className={cn(
            "h-7 gap-1 px-2 text-xs",
            locale === code && "shadow-sm"
          )}
          onClick={() => setLocale(code as Locale)}
          aria-label={`${t("language.switchTo")}: ${localeLabels[code as Locale]}`}
          aria-pressed={locale === code}
        >
          <span aria-hidden>{localeFlags[code as Locale]}</span>
          <span className="hidden sm:inline">{code === "it" ? "IT" : "EN"}</span>
        </Button>
      ))}
    </div>
  );
}
