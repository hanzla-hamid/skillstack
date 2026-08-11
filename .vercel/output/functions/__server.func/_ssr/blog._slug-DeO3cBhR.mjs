import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { c as useRoute, o as useAuth, r as Link$1 } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { Dt as ArrowLeft, d as ThumbsUp, et as ExternalLink, f as ThumbsDown, k as MessageCircle, u as Trash2 } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as Navbar, t as Footer } from "./Footer-DbW1t8FN.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
import { l as formatDate } from "./content-BoIgMibb.mjs";
import { a as fetchComments, c as youtubeIdFromUrl, n as deleteComment, o as fetchReactions, r as fetchBlogPost, s as setReaction, t as addComment } from "./blog-2Legky56.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-DeO3cBhR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BlogPostPage() {
	const [, params] = useRoute("/blog/:slug");
	const slug = params?.slug ?? "";
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [draft, setDraft] = (0, import_react.useState)("");
	const { data: post, isLoading } = useQuery({
		queryKey: ["blog-post", slug],
		queryFn: () => fetchBlogPost(slug),
		enabled: Boolean(slug)
	});
	const postId = post?.id ?? "";
	const { data: comments } = useQuery({
		queryKey: ["blog-comments", postId],
		queryFn: () => fetchComments(postId),
		enabled: Boolean(postId)
	});
	const { data: reactions } = useQuery({
		queryKey: ["blog-reactions", postId],
		queryFn: () => fetchReactions(postId),
		enabled: Boolean(postId)
	});
	const likes = (reactions ?? []).filter((r) => r.kind === "like").length;
	const dislikes = (reactions ?? []).filter((r) => r.kind === "dislike").length;
	const mine = (reactions ?? []).find((r) => r.user_id === user?.id)?.kind ?? null;
	const react = useMutation({
		mutationFn: async (kind) => {
			if (!user) throw new Error("Sign in to react");
			await setReaction(postId, user.id, mine === kind ? null : kind);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog-reactions", postId] })
	});
	const comment = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Sign in to comment");
			await addComment(postId, user.id, draft.trim());
		},
		onSuccess: () => {
			setDraft("");
			queryClient.invalidateQueries({ queryKey: ["blog-comments", postId] });
		}
	});
	const removeComment = useMutation({
		mutationFn: (id) => deleteComment(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog-comments", postId] })
	});
	const videoId = youtubeIdFromUrl(post?.video_url ?? null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "flex-1 pt-32 pb-24 px-6 sm:px-8 lg:px-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/blog",
						className: "inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--gold)] transition-colors mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), " Back to blog"]
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-96 rounded-3xl border border-white/10 bg-white/[0.03] animate-pulse" }) : !post ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						className: "p-10 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-semibold mb-2",
							children: "Post not found"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-[var(--color-text-secondary)]",
							children: "This post may have been removed or the link is incorrect."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs uppercase tracking-widest text-[var(--gold)] mb-3",
								children: [
									post.type === "video" ? "Video" : "Article",
									" · ",
									formatDate(post.published_at)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl sm:text-4xl font-bold mb-6 leading-tight",
								children: post.title
							}),
							videoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
									src: `https://www.youtube-nocookie.com/embed/${videoId}`,
									title: post.title,
									allow: "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture",
									allowFullScreen: true,
									loading: "lazy",
									className: "absolute inset-0 w-full h-full"
								})
							}) : post.thumbnail_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: post.thumbnail_url,
								alt: post.title,
								className: "w-full rounded-2xl border border-white/10 mb-8",
								loading: "lazy"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "prose prose-invert max-w-none whitespace-pre-line text-[var(--color-text-secondary)] leading-relaxed mb-8",
								children: post.body || post.excerpt
							}),
							post.permalink && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: post.permalink,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline mb-10",
								children: ["View original post ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-4 h-4" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 border-y border-white/10 py-4 mb-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => react.mutate("like"),
										disabled: !user || react.isPending,
										className: `inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors disabled:opacity-50 ${mine === "like" ? "bg-[var(--gold)]/15 border-[var(--gold)]/40 text-[var(--gold)]" : "border-white/10 text-[var(--color-text-secondary)] hover:border-white/25"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: "w-4 h-4" }),
											" ",
											likes
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => react.mutate("dislike"),
										disabled: !user || react.isPending,
										className: `inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors disabled:opacity-50 ${mine === "dislike" ? "bg-white/10 border-white/25 text-white" : "border-white/10 text-[var(--color-text-secondary)] hover:border-white/25"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsDown, { className: "w-4 h-4" }),
											" ",
											dislikes
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] ml-auto",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4 h-4" }),
											" ",
											(comments ?? []).length
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"aria-label": "Comments",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-xl font-semibold mb-5",
										children: "Comments"
									}),
									user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: (e) => {
											e.preventDefault();
											if (draft.trim().length > 0) comment.mutate();
										},
										className: "mb-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											value: draft,
											onChange: (e) => setDraft(e.target.value),
											rows: 3,
											maxLength: 2e3,
											placeholder: "Share your thoughts…",
											className: "w-full rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)]/50"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: comment.isPending || draft.trim().length === 0,
											className: "mt-3 px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--gold)] text-black disabled:opacity-50",
											children: comment.isPending ? "Posting…" : "Post comment"
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-[var(--color-text-secondary)] mb-8",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
												href: "/login",
												className: "text-[var(--gold)] hover:underline",
												children: "Sign in"
											}),
											" ",
											"to join the conversation."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "space-y-4",
										children: (comments ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
											className: "p-5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm font-medium",
														children: c.author_name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-[var(--color-text-secondary)] mb-2",
														children: formatDate(c.created_at)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm text-[var(--color-text-secondary)] whitespace-pre-line",
														children: c.body
													})
												] }), user?.id === c.user_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": "Delete comment",
													onClick: () => removeComment.mutate(c.id),
													className: "text-white/40 hover:text-red-400 transition-colors",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
												})]
											})
										}) }, c.id))
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = BlogPostPage;
//#endregion
export { SplitComponent as component };
