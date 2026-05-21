/**
 * Sitemap & robots.txt for CACPro (Palmary Green Kampos Limited).
 * Set NEXT_PUBLIC_SITE_URL in each environment so Host / sitemap URLs match production.
 * @type {import('next-sitemap').IConfig}
 */

async function fetchBlogPaths() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("[next-sitemap] Supabase env missing — blog post URLs omitted from sitemap.");
    return [];
  }

  try {
    const { createClient } = require("@supabase/supabase-js");
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await supabase
      .from("posts")
      .select("slug, published_at")
      .order("published_at", { ascending: false });

    if (error || !data) {
      console.warn("[next-sitemap] Could not fetch posts:", error?.message);
      return [];
    }
    return data;
  } catch (err) {
    console.warn("[next-sitemap] Blog fetch failed:", err);
    return [];
  }
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.cacpro.com.ng",
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
    const paths = [
      await config.transform(config, "/", { priority: 1.0, changefreq: "weekly" }),
      await config.transform(config, "/blog", { priority: 0.85, changefreq: "weekly" }),
    ];

    const posts = await fetchBlogPaths();
    for (const post of posts) {
      paths.push(
        await config.transform(config, `/blog/${post.slug}`, {
          priority: 0.8,
          changefreq: "monthly",
          lastmod: post.published_at
            ? new Date(post.published_at).toISOString()
            : undefined,
        })
      );
    }

    return paths;
  },
};
