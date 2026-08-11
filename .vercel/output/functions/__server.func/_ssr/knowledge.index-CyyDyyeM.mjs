import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { r as Link$1 } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { at as Clock, bt as BookOpen, v as Search } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as staggerContainer, i as slideUp } from "./SectionComponents-tAUCJcK6.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
import { l as formatDate, r as fetchArticles } from "./content-BoIgMibb.mjs";
import { i as PageShell, n as FilterPills, r as GridSkeleton, t as EmptyState } from "./ContentPage-BMe9bIo1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/knowledge.index-CyyDyyeM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KnowledgePage() {
	const { data, isLoading } = useQuery({
		queryKey: ["articles"],
		queryFn: fetchArticles
	});
	const [category, setCategory] = (0, import_react.useState)("All");
	const [query, setQuery] = (0, import_react.useState)("");
	const articles = data ?? [];
	const categories = (0, import_react.useMemo)(() => ["All", ...Array.from(new Set(articles.map((a) => a.category)))], [articles]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return articles.filter((a) => {
			const matchesCategory = category === "All" || a.category === category;
			const matchesQuery = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q));
			return matchesCategory && matchesQuery;
		});
	}, [
		articles,
		category,
		query
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		eyebrow: "Knowledge Hub",
		title: "Learn with",
		highlight: "SkillStack",
		subtitle: "In-depth guides, tutorials and career articles written by our instructors — free for every learner.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-8 max-w-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search articles…",
					"aria-label": "Search articles",
					className: "w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-white/10 text-sm outline-none focus:border-[var(--gold)]/50 transition-colors"
				})]
			}),
			categories.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPills, {
				options: categories,
				value: category,
				onChange: setCategory
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-6 h-6" }),
				title: "No articles yet",
				description: "Published articles from the Knowledge Hub will appear here as soon as our team publishes them."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: staggerContainer,
				initial: "hidden",
				animate: "visible",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: filtered.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: slideUp,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: `/knowledge/${article.slug}`,
						className: "block h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							hover: true,
							className: "h-full flex flex-col overflow-hidden group p-0",
							children: [article.cover_image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: article.cover_image,
								alt: article.title,
								loading: "lazy",
								decoding: "async",
								className: "w-full h-44 object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 flex flex-col flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-[var(--gold)] tracking-wider uppercase mb-2",
										children: article.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-display font-semibold mb-2 group-hover:text-[var(--gold)] transition-colors",
										children: article.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-[var(--color-text-secondary)] flex-1 line-clamp-3",
										children: article.excerpt
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 flex items-center gap-4 text-xs text-[var(--color-text-muted)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(article.published_at) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }),
												" ",
												article.read_minutes,
												" min read"
											]
										})]
									})
								]
							})]
						})
					})
				}, article.id))
			})
		]
	});
}
var SplitComponent = KnowledgePage;
//#endregion
export { SplitComponent as component };
