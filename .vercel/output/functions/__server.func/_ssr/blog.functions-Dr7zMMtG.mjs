import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./server-DuURjVew.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog.functions-Dr7zMMtG.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Public sync trigger. Pulls the latest YouTube uploads (and Meta posts when a
* token is configured) into the blog feed.
*/
var syncBlogFeeds_createServerFn_handler = createServerRpc({
	id: "761ea1fcb4b1a747c424a31d8a3427a252f9d4c046b43ca2b563d579a34fd28f",
	name: "syncBlogFeeds",
	filename: "src/lib/blog.functions.ts"
}, (opts) => syncBlogFeeds.__executeServer(opts));
var syncBlogFeeds = createServerFn({ method: "POST" }).handler(syncBlogFeeds_createServerFn_handler, async () => {
	const { syncAllFeeds } = await import("./blog-sync.server-BkIl0Rd3.mjs");
	return syncAllFeeds();
});
//#endregion
export { syncBlogFeeds_createServerFn_handler };
