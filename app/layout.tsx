import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://paulcacservices.ng";
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "2348012345678";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Paul & Associates | Accredited CAC Agent — Business Registration Nigeria",
    template: "%s | Paul & Associates CAC Services",
  },
  description:
    "Nigeria's trusted accredited CAC Agent for business name registration (₦45k), company incorporation (₦100k), NGO registration (₦150k), and all post-incorporation compliance. Fast, transparent, and 100% remote.",
  keywords: [
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
  authors: [{ name: "Paul & Associates Legal Practitioners" }],
  creator: "Paul & Associates",
  publisher: "Paul & Associates CAC Services",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: "Paul & Associates CAC Services",
    title: "Accredited CAC Agent | Business Registration Nigeria — Paul & Associates",
    description:
      "Register your business name (₦45k), incorporate a company (₦100k), or set up an NGO (₦150k) with Nigeria's trusted accredited CAC Agent. Fast. Transparent. 100% Remote.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul & Associates | CAC Business Registration Nigeria",
    description:
      "Nigeria's trusted accredited CAC Agent. Business name ₦45k | Company ₦100k | NGO ₦150k. Fast, transparent, remote.",
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
    canonical: SITE_URL,
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
        "@id": `${SITE_URL}/#organization`,
        name: "Paul & Associates CAC Services",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/og-image.png`,
        description:
          "Accredited CAC Agent providing business name registration, company incorporation, NGO registration, and post-incorporation compliance services across Nigeria.",
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
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Paul & Associates CAC Services",
        publisher: { "@id": `${SITE_URL}/#organization` },
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
