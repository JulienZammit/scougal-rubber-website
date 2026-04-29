export const dynamic = "force-dynamic";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/blog-management", "/studio"],
        crawlDelay: 10,
        cleanParam: "ref /articles",
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
