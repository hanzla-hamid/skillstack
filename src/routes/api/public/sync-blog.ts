import { createFileRoute } from "@tanstack/react-router";

function authorizeRequest(request?: Request): boolean {
  const secret = process.env["BLOG_SYNC_SECRET"] || process.env["CRON_SECRET"];
  if (!secret) {
    return false;
  }
  const provided =
    request?.headers.get("x-sync-secret") ||
    (request?.url ? new URL(request.url).searchParams.get("secret") : null);
  return provided === secret;
}

export const Route = createFileRoute("/api/public/sync-blog")({
  server: {
    handlers: {
      POST: async ({ request }: { request?: Request }) => {
        if (!authorizeRequest(request)) {
          return Response.json({ ok: false, error: "Unauthorized sync request" }, { status: 401 });
        }
        const { syncAllFeeds } = await import("@/lib/blog-sync.server");
        const results = await syncAllFeeds();
        return Response.json({ ok: true, results });
      },
      GET: async ({ request }: { request?: Request }) => {
        if (!authorizeRequest(request)) {
          return Response.json({ ok: false, error: "Unauthorized sync request" }, { status: 401 });
        }
        const { syncAllFeeds } = await import("@/lib/blog-sync.server");
        const results = await syncAllFeeds();
        return Response.json({ ok: true, results });
      },
    },
  },
});
