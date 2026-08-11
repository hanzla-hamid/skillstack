import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { Y as FileText, nt as Download } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as staggerContainer, i as slideUp } from "./SectionComponents-tAUCJcK6.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
import { i as fetchDownloads } from "./content-BoIgMibb.mjs";
import { i as PageShell, n as FilterPills, r as GridSkeleton, t as EmptyState } from "./ContentPage-BMe9bIo1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/downloads-BXutB6oi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DownloadsPage() {
	const { data, isLoading } = useQuery({
		queryKey: ["downloads"],
		queryFn: fetchDownloads
	});
	const [category, setCategory] = (0, import_react.useState)("All");
	const items = data ?? [];
	const categories = (0, import_react.useMemo)(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
	const filtered = items.filter((i) => category === "All" || i.category === category);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		eyebrow: "Download Center",
		title: "Free",
		highlight: "resources",
		subtitle: "Cheat sheets, templates, prospectuses and practice files — download and keep.",
		children: [categories.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPills, {
			options: categories,
			value: category,
			onChange: setCategory
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-6 h-6" }),
			title: "No downloads yet",
			description: "Files published by the SkillStack team will be available here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			variants: staggerContainer,
			initial: "hidden",
			animate: "visible",
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
			children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: slideUp,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					hover: true,
					className: "h-full flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 h-12 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] mb-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-6 h-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-display font-semibold mb-2",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-[var(--color-text-secondary)] flex-1",
							children: item.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mt-6 text-xs text-[var(--color-text-muted)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item.file_type, item.size_label ? ` · ${item.size_label}` : ""] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: item.file_url,
								target: "_blank",
								rel: "noopener noreferrer",
								download: true,
								className: "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[var(--gold)]/15 border border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)]/25 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5" }), " Download"]
							})]
						})
					]
				})
			}, item.id))
		})]
	});
}
var SplitComponent = DownloadsPage;
//#endregion
export { SplitComponent as component };
