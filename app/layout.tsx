import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {
  SITE_BRAND_ONLINE,
  SITE_CANONICAL_URL,
  SITE_LEGAL_NAME,
} from "./lib/brand";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "2348012345678";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CANONICAL_URL),
  applicationName: SITE_BRAND_ONLINE,
  title: {
    default: "CACPro | Accredited CAC Agent | Business registration Nigeria",
    template: `%s | ${SITE_BRAND_ONLINE}`,
  },
  description: `CACPro (${SITE_LEGAL_NAME}) is Nigeria's accredited CAC agent for business name registration (₦45k), company incorporation (₦100k), NGO registration (₦150k), and post incorporation compliance. Fast, transparent, 100% remote.`,
  keywords: [
    "CACPro",
    SITE_LEGAL_NAME,
    "CAC agent Nigeria",
    "business registration Nigeria",
    "company incorporation Nigeria",
    "CAC registration",
    "register business name Nigeria",
    "private limited company Nigeria",
    "NGO registration Nigeria",
    "Corporate Affairs Commission",
    "RC number Nigeria",
    "annual returns Nigeria",
    "accredited CAC agent Lagos",
    "business name registration 45000",
  ],
  authors: [{ name: SITE_LEGAL_NAME }],
  creator: SITE_LEGAL_NAME,
  publisher: `${SITE_BRAND_ONLINE} (${SITE_LEGAL_NAME})`,
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_CANONICAL_URL,
    siteName: `${SITE_BRAND_ONLINE} · ${SITE_LEGAL_NAME}`,
    title: `Accredited CAC Agent | Business registration Nigeria | ${SITE_BRAND_ONLINE}`,
    description: `Register with ${SITE_BRAND_ONLINE} (${SITE_LEGAL_NAME}): business name ₦45k, company ₦100k, NGO ₦150k. Fast, transparent, remote.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_BRAND_ONLINE} | CAC business registration Nigeria`,
    description: `${SITE_BRAND_ONLINE} · ${SITE_LEGAL_NAME}. Business name ₦45k | Company ₦100k | NGO ₦150k.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_CANONICAL_URL,
  },
  category: "Legal Services",
};

export { WHATSAPP };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": `${SITE_CANONICAL_URL}/#organization`,
        legalName: SITE_LEGAL_NAME,
        name: SITE_BRAND_ONLINE,
        url: SITE_CANONICAL_URL,
        logo: `${SITE_CANONICAL_URL}/logo.png`,
        image: `${SITE_CANONICAL_URL}/og-image.png`,
        description: `${SITE_BRAND_ONLINE} (${SITE_LEGAL_NAME}): accredited CAC agent for business name registration, company incorporation, NGO registration, and post incorporation compliance across Nigeria.`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "NG",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: "English",
        },
        areaServed: {
          "@type": "Country",
          name: "Nigeria",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "CAC Registration Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Business Name Registration" },
              price: "45000",
              priceCurrency: "NGN",
            },
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Private Limited Company Incorporation" },
              price: "100000",
              priceCurrency: "NGN",
            },
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "NGO / Incorporated Trustees Registration" },
              price: "150000",
              priceCurrency: "NGN",
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CANONICAL_URL}/#website`,
        url: SITE_CANONICAL_URL,
        name: SITE_BRAND_ONLINE,
        publisher: { "@id": `${SITE_CANONICAL_URL}/#organization` },
        inLanguage: "en-NG",
      },
    ],
  };

  return (
    <html lang="en-NG" className={`${poppins.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="theme-color" content="#0B1F3A" />
        <meta name="geo.region" content="NG" />
        <meta name="geo.country" content="Nigeria" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
