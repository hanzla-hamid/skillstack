import "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { E as Newspaper, et as ExternalLink } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as staggerContainer, i as slideUp } from "./SectionComponents-tAUCJcK6.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
import { l as formatDate, s as fetchNews } from "./content-BoIgMibb.mjs";
import { i as PageShell, r as GridSkeleton, t as EmptyState } from "./ContentPage-BMe9bIo1.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function NewsPage() {
	const { data, isLoading } = useQuery({
		queryKey: ["news"],
		queryFn: fetchNews
	});
	const items = data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		eyebrow: "News Center",
		title: "What's new at",
		highlight: "SkillStack",
		subtitle: "Announcements, admissions updates, partnerships and milestones from our academy.",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, {}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "w-6 h-6" }),
			title: "No announcements yet",
			description: "News and updates published by the SkillStack team will show up here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			variants: staggerContainer,
			initial: "hidden",
			animate: "visible",
			className: "flex flex-col gap-5",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: slideUp,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					hover: true,
					className: "flex flex-col md:flex-row gap-6 items-start",
					children: [item.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.image_url,
						alt: item.title,
						loading: "lazy",
						decoding: "async",
						className: "w-full md:w-56 h-40 object-cover rounded-xl border border-white/10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--color-text-muted)] mb-2",
								children: formatDate(item.published_at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-display font-semibold mb-2",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-[var(--color-text-secondary)]",
								children: item.summary
							}),
							item.source_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: item.source_url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-2 text-sm text-[var(--gold)] mt-4 hover:underline",
								children: ["Read more ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5" })]
							})
						]
					})]
				})
			}, item.id))
		})
	});
}
var SplitComponent = NewsPage;
//#endregion
export { SplitComponent as component };
