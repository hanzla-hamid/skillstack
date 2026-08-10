import { createServerFn } from "@tanstack/react-start";

/**
 * Public sync trigger. Pulls the latest YouTube uploads (and Meta posts when a
 * token is configured) into the blog feed.
 */
export const syncBlogFeeds = createServerFn({ method: "POST" }).handler(async () => {
  const { syncAllFeeds } = await import("./blog-sync.server");
  return syncAllFeeds();
});
