import { d as supabase } from "./router-CotFlDs_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/videos-BF72UZra.js
var VIDEO_BUCKET = "course-videos";
async function fetchVideos() {
	const { data, error } = await supabase.from("course_videos").select("*").order("created_at", { ascending: false });
	if (error) {
		console.error("Failed to load videos:", error.message);
		return [];
	}
	return data || [];
}
/** Signed playback URL. Requires an authenticated session. */
async function getVideoUrl(path) {
	const { data, error } = await supabase.storage.from(VIDEO_BUCKET).createSignedUrl(path, 14400);
	if (error) return null;
	return data?.signedUrl ?? null;
}
//#endregion
export { fetchVideos as n, getVideoUrl as r, VIDEO_BUCKET as t };
