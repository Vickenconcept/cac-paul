/**
 * Sitemap & robots.txt for CACPro (Palmary Green Kampos Limited).
 * Set NEXT_PUBLIC_SITE_URL in each environment so Host / sitemap URLs match production.
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://cac-paul.vercel.app",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin", "/admin/*", "/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
  },
  additionalPaths: async (config) => {
    return [
      await config.transform(config, "/"),
      await config.transform(config, "/blog"),
    ];
  },
};
