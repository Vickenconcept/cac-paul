/** Public-facing online brand and registered legal entity (owner-approved). */
export const SITE_BRAND_ONLINE = "CACPro";
export const SITE_LEGAL_NAME = "Palmary Green Kampos Limited";

/**
 * Canonical site URL for metadata, Open Graph, JSON-LD, and sitemap.
 * Override with NEXT_PUBLIC_SITE_URL in each environment (e.g. production domain).
 */
export const SITE_CANONICAL_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://cac-paul.vercel.app";

/** Contact email when NEXT_PUBLIC_EMAIL is unset (keep mailbox until a CACPro domain is live). */
export const SITE_DEFAULT_EMAIL =
  process.env.NEXT_PUBLIC_EMAIL || "info@paulcacservices.ng";
