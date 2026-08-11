import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { r as Link$1 } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { B as Instagram, S as Play, Y as FileText, Z as Facebook, b as RefreshCw, n as Youtube, y as Rss } from "../_libs/lucide-react.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as staggerContainer, i as slideUp } from "./SectionComponents-tAUCJcK6.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
import { l as formatDate, t as YOUTUBE_CHANNEL_URL } from "./content-BoIgMibb.mjs";
import { i as fetchBlogPosts } from "./blog-2Legky56.mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./server-DuURjVew.mjs";
import { i as PageShell, n as FilterPills, r as GridSkeleton, t as EmptyState } from "./ContentPage-BMe9bIo1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog.index-Dpddxali.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Public sync trigger. Pulls the latest YouTube uploads (and Meta posts when a
* token is configured) into the blog feed.
*/
var syncBlogFeeds = createServerFn({ method: "POST" }).handler(createSsrRpc("761ea1fcb4b1a747c424a31d8a3427a252f9d4c046b43ca2b563d579a34fd28f"));
var blog_backdrop_default = "/assets/blog-backdrop-nfRLdXf1.jpg";
var FILTERS = [
	"All",
	"Videos",
	"Articles"
];
var SOURCE_ICON = {
	youtube: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "w-3.5 h-3.5" }),
	facebook: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "w-3.5 h-3.5" }),
	instagram: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "w-3.5 h-3.5" })
};
function BlogPage() {
	const [filter, setFilter] = (0, import_react.useState)("All");
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["blog-posts"],
		queryFn: fetchBlogPosts
	});
	const sync = useMutation({
		mutationFn: async () => syncBlogFeeds(),
		onSettled: () => {
			refetch();
		}
	});
	const posts = (0, import_react.useMemo)(() => {
		const items = data ?? [];
		if (filter === "Videos") return items.filter((p) => p.type === "video");
		if (filter === "Articles") return items.filter((p) => p.type === "article");
		return items;
	}, [data, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		eyebrow: "SkillStack Blog",
		title: "Everything we",
		highlight: "publish",
		subtitle: "Videos, articles and updates from SkillStack — synced automatically from our YouTube channel and social pages.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mb-12 overflow-hidden rounded-3xl border border-[var(--gold)]/20",
				style: {
					backgroundImage: `url(${blog_backdrop_default})`,
					backgroundSize: "cover",
					backgroundPosition: "center"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-black/70 backdrop-blur-[2px] px-6 py-10 sm:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold mb-2",
						children: "One feed, every channel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-[var(--color-text-secondary)] max-w-xl",
						children: "New uploads and posts appear here automatically. You can also refresh the feed on demand."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => sync.mutate(),
							disabled: sync.isPending,
							className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--gold)] text-black hover:opacity-90 transition-opacity disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-4 h-4 ${sync.isPending ? "animate-spin" : ""}` }), sync.isPending ? "Syncing…" : "Sync latest"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: YOUTUBE_CHANNEL_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "w-4 h-4" }), " YouTube channel"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPills, {
				options: FILTERS,
				value: filter,
				onChange: setFilter
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, {}) : posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rss, { className: "w-6 h-6" }),
				title: "Nothing published yet",
				description: "Videos and articles will show up here as soon as they are posted or synced."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: staggerContainer,
				initial: "hidden",
				animate: "visible",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: slideUp,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: `/blog/${post.slug}`,
						className: "block h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "h-full flex flex-col p-0 overflow-hidden group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-video bg-black/60",
								children: [
									post.thumbnail_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: post.thumbnail_url,
										alt: post.title,
										loading: "lazy",
										decoding: "async",
										className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full h-full flex items-center justify-center text-[var(--gold)]/50",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-10 h-10" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-black/70 text-[var(--gold)] border border-[var(--gold)]/30",
										children: [post.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3 h-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-3 h-3" }), post.type === "video" ? "Video" : "Article"]
									}),
									SOURCE_ICON[post.source] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-3 right-3 w-7 h-7 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white/80",
										children: SOURCE_ICON[post.source]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 flex flex-col flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[var(--color-text-secondary)] mb-2",
										children: formatDate(post.published_at)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display font-semibold text-lg mb-2 line-clamp-2 group-hover:text-[var(--gold)] transition-colors",
										children: post.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-[var(--color-text-secondary)] line-clamp-3",
										children: post.excerpt
									})
								]
							})]
						})
					})
				}, post.id))
			})
		]
	});
}
var SplitComponent = BlogPage;
//#endregion
export { SplitComponent as component };
