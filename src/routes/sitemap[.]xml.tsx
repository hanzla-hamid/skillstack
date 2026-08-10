import { createFileRoute } from "@tanstack/react-router";

const COURSE_SLUGS = ["web-development", "graphic-designing", "digital-marketing", "e-commerce"];

const STATIC_PATHS: Array<[string, string]> = [
  ["/", "1.0"],
  ["/courses", "0.9"],
  ["/knowledge", "0.9"],
  ["/blog", "0.9"],
  ["/downloads", "0.8"],
  ["/events", "0.8"],
  ["/gallery", "0.7"],
  ["/showcase", "0.7"],
  ["/news", "0.7"],
  ["/library", "0.7"],
  ["/admissions", "0.8"],
  ["/about", "0.6"],
  ["/contact", "0.6"],
  ["/faq", "0.6"],
  ["/privacy-policy", "0.3"],
  ["/terms", "0.3"],
  ["/refund-policy", "0.3"],
  ["/code-of-conduct", "0.3"],
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const origin = new URL(request.url).origin;
        const urls = [
          ...STATIC_PATHS,
          ...COURSE_SLUGS.map((slug) => [`/courses/${slug}`, "0.8"] as [string, string]),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ([path, priority]) =>
      `  <url><loc>${origin}${path}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`,
  )
  .join("\n")}
</urlset>`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
