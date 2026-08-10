import { d as supabase } from "./router-CotFlDs_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-2Legky56.js
async function fetchBlogPosts() {
	try {
		const { data, error } = await supabase.from("blog_posts").select("*").eq("status", "published").order("published_at", { ascending: false });
		if (error) return [];
		return data ?? [];
	} catch {
		return [];
	}
}
async function fetchBlogPost(slug) {
	try {
		const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).maybeSingle();
		if (error) return null;
		return data ?? null;
	} catch {
		return null;
	}
}
async function fetchComments(postId) {
	try {
		const { data, error } = await supabase.from("blog_comments").select("*").eq("post_id", postId).order("created_at", { ascending: true });
		if (error) return [];
		return data ?? [];
	} catch {
		return [];
	}
}
async function addComment(postId, userId, body) {
	const { error } = await supabase.from("blog_comments").insert({
		post_id: postId,
		user_id: userId,
		body
	});
	if (error) throw error;
}
async function deleteComment(id) {
	const { error } = await supabase.from("blog_comments").delete().eq("id", id);
	if (error) throw error;
}
async function fetchReactions(postId) {
	try {
		const { data, error } = await supabase.from("blog_reactions").select("*").eq("post_id", postId);
		if (error) return [];
		return data ?? [];
	} catch {
		return [];
	}
}
async function setReaction(postId, userId, kind) {
	if (kind === null) {
		const { error } = await supabase.from("blog_reactions").delete().eq("post_id", postId).eq("user_id", userId);
		if (error) throw error;
		return;
	}
	const { error } = await supabase.from("blog_reactions").upsert({
		post_id: postId,
		user_id: userId,
		kind
	}, { onConflict: "post_id,user_id" });
	if (error) throw error;
}
function youtubeIdFromUrl(url) {
	if (!url) return null;
	const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
	return match ? match[1] : null;
}
//#endregion
export { fetchComments as a, youtubeIdFromUrl as c, fetchBlogPosts as i, deleteComment as n, fetchReactions as o, fetchBlogPost as r, setReaction as s, addComment as t };
