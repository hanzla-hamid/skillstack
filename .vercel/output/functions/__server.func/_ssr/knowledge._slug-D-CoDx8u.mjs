import "./rolldown-runtime-D7D4PA-g.mjs";
import { c as useRoute, r as Link$1 } from "./router-CotFlDs_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Dt as ArrowLeft, at as Clock, o as User } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as Navbar, t as Footer } from "./Footer-CqtL07fW.mjs";
import { l as formatDate, n as fetchArticle } from "./content-BoIgMibb.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function ArticlePage() {
	const [, params] = useRoute("/knowledge/:slug");
	const slug = params?.slug ?? "";
	const { data: article, isLoading } = useQuery({
		queryKey: ["article", slug],
		queryFn: () => fetchArticle(slug),
		enabled: !!slug
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "flex-1 pt-32 pb-24 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/knowledge",
						className: "inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--gold)] transition-colors mb-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), " Back to Knowledge Hub"]
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						"aria-busy": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-3/4 rounded-lg bg-white/5 animate-pulse" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/3 rounded bg-white/5 animate-pulse" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 rounded-2xl bg-white/5 animate-pulse" })
						]
					}) : !article ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-display font-bold mb-3",
							children: "Article not found"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--color-text-secondary)]",
							children: "This article may have been moved or unpublished."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold text-[var(--gold)] tracking-widest uppercase",
							children: article.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl md:text-5xl font-display font-bold leading-tight mt-3 mb-5",
							children: article.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-5 text-sm text-[var(--color-text-muted)] mb-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4" }),
										" ",
										article.author
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(article.published_at) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-4 h-4" }),
										" ",
										article.read_minutes,
										" min read"
									]
								})
							]
						}),
						article.cover_image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: article.cover_image,
							alt: article.title,
							className: "w-full rounded-2xl border border-white/10 mb-10",
							decoding: "async"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "prose prose-invert max-w-none prose-headings:font-display prose-a:text-[var(--gold)]",
							children: article.content.split(/\n{2,}/).map((paragraph, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, i))
						}),
						article.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10",
							children: article.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-3 py-1 rounded-full text-xs border border-white/10 text-[var(--color-text-secondary)]",
								children: ["#", tag]
							}, tag))
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = ArticlePage;
//#endregion
export { SplitComponent as component };
