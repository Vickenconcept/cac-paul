import type { MetadataRoute } from "next";
import { SITE_BRAND_ONLINE, SITE_CANONICAL_URL, SITE_LEGAL_NAME } from "./lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_BRAND_ONLINE} | Accredited CAC Agent Nigeria`,
    short_name: SITE_BRAND_ONLINE,
    description: `${SITE_BRAND_ONLINE} (${SITE_LEGAL_NAME}) — business registration and CAC compliance across Nigeria.`,
    start_url: "/",
    display: "standalone",
    background_color: "#060F1C",
    theme_color: "#0B1F3A",
    lang: "en-NG",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    id: SITE_CANONICAL_URL,
  };
}
