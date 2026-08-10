import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-sync.server-BkIl0Rd3.js
var YOUTUBE_FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=UCnkbWMUq7qmBEERsrD42Bjw`;
function adminClient() {
	const url = process.env["SUPABASE_URL"];
	const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
	if (!url || !key) throw new Error("Backend credentials are not configured");
	return createClient(url, key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false
		},
		global: { fetch: (input, init) => {
			const headers = new Headers(init?.headers);
			if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
			headers.set("apikey", key);
			return fetch(input, {
				...init,
				headers
			});
		} }
	});
}
function pick(block, tag) {
	const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
	return m ? decodeEntities(m[1].trim()) : "";
}
function decodeEntities(value) {
	return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#39;/g, "'").replace(/&amp;/g, "&");
}
function slugify(input, suffix) {
	return `${input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "post"}-${suffix.toLowerCase().slice(0, 8)}`;
}
/**
* Pulls the latest uploads from the SkillStack YouTube channel and mirrors them
* into the blog feed. Existing rows are refreshed, new videos are inserted.
*/
async function syncYoutube() {
	try {
		const response = await fetch(YOUTUBE_FEED, { headers: { "User-Agent": "SkillStackBlogSync/1.0" } });
		if (!response.ok) return {
			synced: 0,
			source: "youtube",
			error: `Feed request failed (${response.status})`
		};
		const entries = (await response.text()).split("<entry>").slice(1);
		if (entries.length === 0) return {
			synced: 0,
			source: "youtube"
		};
		const rows = entries.map((entry) => {
			const videoId = pick(entry, "yt:videoId");
			const title = pick(entry, "title");
			const published = pick(entry, "published") || (/* @__PURE__ */ new Date()).toISOString();
			const description = pick(entry, "media:description");
			const thumb = entry.match(/<media:thumbnail[^>]*url="([^"]+)"/);
			return {
				source: "youtube",
				external_id: videoId,
				type: "video",
				title: title || "Untitled video",
				slug: slugify(title, videoId),
				excerpt: description.split("\n")[0]?.slice(0, 240) ?? "",
				body: description,
				video_url: `https://www.youtube.com/watch?v=${videoId}`,
				permalink: `https://www.youtube.com/watch?v=${videoId}`,
				thumbnail_url: thumb?.[1] ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
				tags: ["youtube"],
				author: "SkillStack",
				status: "published",
				published_at: published,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
		});
		const { error } = await adminClient().from("blog_posts").upsert(rows, {
			onConflict: "source,external_id",
			ignoreDuplicates: false
		});
		if (error) return {
			synced: 0,
			source: "youtube",
			error: error.message
		};
		return {
			synced: rows.length,
			source: "youtube"
		};
	} catch (error) {
		return {
			synced: 0,
			source: "youtube",
			error: error instanceof Error ? error.message : "Unknown sync error"
		};
	}
}
/**
* Mirrors Facebook / Instagram posts. Requires a Meta page access token; until
* one is configured the sync is skipped instead of failing the whole run.
*/
async function syncMeta() {
	const token = process.env["META_PAGE_ACCESS_TOKEN"];
	const pageId = process.env["META_PAGE_ID"];
	if (!token || !pageId) return [{
		synced: 0,
		source: "meta",
		error: "Meta access token not configured"
	}];
	try {
		const url = `https://graph.facebook.com/v21.0/${pageId}/posts?fields=id,message,created_time,permalink_url,full_picture&limit=25&access_token=${token}`;
		const response = await fetch(url);
		if (!response.ok) return [{
			synced: 0,
			source: "facebook",
			error: `Graph API failed (${response.status})`
		}];
		const posts = (await response.json()).data ?? [];
		if (posts.length === 0) return [{
			synced: 0,
			source: "facebook"
		}];
		const rows = posts.map((post) => {
			const message = post.message ?? "Facebook update";
			const title = message.split("\n")[0].slice(0, 90) || "Facebook update";
			return {
				source: "facebook",
				external_id: post.id,
				type: "article",
				title,
				slug: slugify(title, post.id.replace(/[^A-Za-z0-9]/g, "")),
				excerpt: message.slice(0, 240),
				body: message,
				video_url: null,
				permalink: post.permalink_url ?? null,
				thumbnail_url: post.full_picture ?? null,
				tags: ["facebook"],
				author: "SkillStack",
				status: "published",
				published_at: post.created_time,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
		});
		const { error } = await adminClient().from("blog_posts").upsert(rows, {
			onConflict: "source,external_id",
			ignoreDuplicates: false
		});
		if (error) return [{
			synced: 0,
			source: "facebook",
			error: error.message
		}];
		return [{
			synced: rows.length,
			source: "facebook"
		}];
	} catch (error) {
		return [{
			synced: 0,
			source: "facebook",
			error: error instanceof Error ? error.message : "Unknown sync error"
		}];
	}
}
async function syncAllFeeds() {
	const [youtube, meta] = await Promise.all([syncYoutube(), syncMeta()]);
	return [youtube, ...meta];
}
//#endregion
export { syncAllFeeds };
