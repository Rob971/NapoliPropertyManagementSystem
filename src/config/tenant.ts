import type { Locale } from "@/i18n/config";

/**
 * Customer/tenant branding — driven by NEXT_PUBLIC_* env vars at build time.
 * Defaults match the Napoli PoC; fork deploy/tenants/ for new customers.
 */
export interface TenantConfig {
  id: string;
  appName: string;
  municipality: string;
  adminName: Record<Locale, string>;
  cleanerSupplier: string;
  localeStorageKey: string;
}

function readEnv(key: string, fallback: string): string {
  return process.env[key]?.trim() || fallback;
}

export const tenant: TenantConfig = {
  id: readEnv("NEXT_PUBLIC_TENANT_ID", "napoli"),
  appName: readEnv("NEXT_PUBLIC_APP_NAME", "Napoli PMS"),
  municipality: readEnv("NEXT_PUBLIC_MUNICIPALITY", "Comune di Napoli"),
  adminName: {
    it: readEnv("NEXT_PUBLIC_ADMIN_NAME_IT", readEnv("NEXT_PUBLIC_ADMIN_NAME", "Admin Napoli")),
    "en-GB": readEnv(
      "NEXT_PUBLIC_ADMIN_NAME_EN",
      readEnv("NEXT_PUBLIC_ADMIN_NAME", "Napoli Admin")
    ),
  },
  cleanerSupplier: readEnv("NEXT_PUBLIC_CLEANER_SUPPLIER", "Pulizie Napoli"),
  localeStorageKey: `${readEnv("NEXT_PUBLIC_TENANT_ID", "napoli")}-pms-locale`,
};

export function getTenantInterpolationParams(locale: Locale): Record<string, string> {
  return {
    appName: tenant.appName,
    municipality: tenant.municipality,
    adminName: tenant.adminName[locale],
    cleanerSupplier: tenant.cleanerSupplier,
  };
}

export function getTenantMetadata(locale: Locale = "it") {
  return {
    title:
      locale === "en-GB"
        ? `${tenant.appName} | Property Management System`
        : `${tenant.appName} | Sistema di Gestione Immobiliare`,
    description:
      locale === "en-GB"
        ? `Property management for ${tenant.municipality} — CIN compliance, unified calendar, and WhatsApp cleaner dispatch.`
        : `Sistema di gestione immobiliare per ${tenant.municipality} — conformità CIN, calendario unificato e dispatch pulizie via WhatsApp.`,
  };
}
