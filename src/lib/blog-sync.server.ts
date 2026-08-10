import { createClient } from "@supabase/supabase-js";

const YOUTUBE_CHANNEL_ID = "UCnkbWMUq7qmBEERsrD42Bjw";
const YOUTUBE_FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

function adminClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key) throw new Error("Backend credentials are not configured");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

function pick(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? decodeEntities(m[1].trim()) : "";
}

function decodeEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function slugify(input: string, suffix: string) {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "post"}-${suffix.toLowerCase().slice(0, 8)}`;
}

export type SyncResult = { synced: number; source: string; error?: string };

/**
 * Pulls the latest uploads from the SkillStack YouTube channel and mirrors them
 * into the blog feed. Existing rows are refreshed, new videos are inserted.
 */
export async function syncYoutube(): Promise<SyncResult> {
  try {
    const response = await fetch(YOUTUBE_FEED, {
      headers: { "User-Agent": "SkillStackBlogSync/1.0" },
    });
    if (!response.ok) {
      return { synced: 0, source: "youtube", error: `Feed request failed (${response.status})` };
    }
    const xml = await response.text();
    const entries = xml.split("<entry>").slice(1);
    if (entries.length === 0) return { synced: 0, source: "youtube" };

    const rows = entries.map((entry) => {
      const videoId = pick(entry, "yt:videoId");
      const title = pick(entry, "title");
      const published = pick(entry, "published") || new Date().toISOString();
      const description = pick(entry, "media:description");
      const thumb = entry.match(/<media:thumbnail[^>]*url="([^"]+)"/);
      return {
        source: "youtube" as const,
        external_id: videoId,
        type: "video" as const,
        title: title || "Untitled video",
        slug: slugify(title, videoId),
        excerpt: description.split("\n")[0]?.slice(0, 240) ?? "",
        body: description,
        video_url: `https://www.youtube.com/watch?v=${videoId}`,
        permalink: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail_url: thumb?.[1] ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        tags: ["youtube"],
        author: "SkillStack",
        status: "published" as const,
        published_at: published,
        updated_at: new Date().toISOString(),
      };
    });

    const supabase = adminClient();
    const { error } = await supabase
      .from("blog_posts")
      .upsert(rows, { onConflict: "source,external_id", ignoreDuplicates: false });
    if (error) return { synced: 0, source: "youtube", error: error.message };
    return { synced: rows.length, source: "youtube" };
  } catch (error) {
    return {
      synced: 0,
      source: "youtube",
      error: error instanceof Error ? error.message : "Unknown sync error",
    };
  }
}

/**
 * Mirrors Facebook / Instagram posts. Requires a Meta page access token; until
 * one is configured the sync is skipped instead of failing the whole run.
 */
export async function syncMeta(): Promise<SyncResult[]> {
  const token = process.env["META_PAGE_ACCESS_TOKEN"];
  const pageId = process.env["META_PAGE_ID"];
  if (!token || !pageId) {
    return [{ synced: 0, source: "meta", error: "Meta access token not configured" }];
  }

  try {
    const url = `https://graph.facebook.com/v21.0/${pageId}/posts?fields=id,message,created_time,permalink_url,full_picture&limit=25&access_token=${token}`;
    const response = await fetch(url);
    if (!response.ok) {
      return [{ synced: 0, source: "facebook", error: `Graph API failed (${response.status})` }];
    }
    const json = (await response.json()) as {
      data?: {
        id: string;
        message?: string;
        created_time: string;
        permalink_url?: string;
        full_picture?: string;
      }[];
    };
    const posts = json.data ?? [];
    if (posts.length === 0) return [{ synced: 0, source: "facebook" }];

    const rows = posts.map((post) => {
      const message = post.message ?? "Facebook update";
      const title = message.split("\n")[0].slice(0, 90) || "Facebook update";
      return {
        source: "facebook" as const,
        external_id: post.id,
        type: "article" as const,
        title,
        slug: slugify(title, post.id.replace(/[^A-Za-z0-9]/g, "")),
        excerpt: message.slice(0, 240),
        body: message,
        video_url: null,
        permalink: post.permalink_url ?? null,
        thumbnail_url: post.full_picture ?? null,
        tags: ["facebook"],
        author: "SkillStack",
        status: "published" as const,
        published_at: post.created_time,
        updated_at: new Date().toISOString(),
      };
    });

    const supabase = adminClient();
    const { error } = await supabase
      .from("blog_posts")
      .upsert(rows, { onConflict: "source,external_id", ignoreDuplicates: false });
    if (error) return [{ synced: 0, source: "facebook", error: error.message }];
    return [{ synced: rows.length, source: "facebook" }];
  } catch (error) {
    return [
      {
        synced: 0,
        source: "facebook",
        error: error instanceof Error ? error.message : "Unknown sync error",
      },
    ];
  }
}

export async function syncAllFeeds(): Promise<SyncResult[]> {
  const [youtube, meta] = await Promise.all([syncYoutube(), syncMeta()]);
  return [youtube, ...meta];
}
