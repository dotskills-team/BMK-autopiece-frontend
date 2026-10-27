import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { localeTags, routing, type Locale } from "@/i18n/routing";

/** Merge Tailwind classes safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceFormatters = new Map<string, Intl.NumberFormat>();

/** 129.9 -> "129,90 €" (fr) / "€129.90" (en) */
export function formatPrice(value: number, locale: Locale = routing.defaultLocale) {
  let formatter = priceFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(localeTags[locale].intl, { style: "currency", currency: "EUR" });
    priceFormatters.set(locale, formatter);
  }
  return formatter.format(value);
}

/**
 * Normalise an OEM / reference number so that "1K0 698-151", "1k0.698.151"
 * and "1K0698151" all match.
 */
export function normalizeReference(value: string) {
  return value.replace(/[\s.\-_/]/g, "").toUpperCase();
}

/** "Pare-choc avant" -> "pare-choc-avant" */
export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatYearRange(from: number, to: number) {
  return from === to ? `${from}` : `${from} – ${to}`;
}
