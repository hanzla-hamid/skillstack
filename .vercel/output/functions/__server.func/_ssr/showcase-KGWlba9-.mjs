import "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { et as ExternalLink, l as Trophy } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as staggerContainer, i as slideUp } from "./SectionComponents-tAUCJcK6.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
import { c as fetchShowcase } from "./content-BoIgMibb.mjs";
import { i as PageShell, r as GridSkeleton, t as EmptyState } from "./ContentPage-BMe9bIo1.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function ShowcasePage() {
	const { data, isLoading } = useQuery({
		queryKey: ["showcase"],
		queryFn: fetchShowcase
	});
	const items = data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		eyebrow: "Student Showcase",
		title: "Built by our",
		highlight: "students",
		subtitle: "Real projects shipped by SkillStack learners during and after their programs.",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, {}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-6 h-6" }),
			title: "Showcase in progress",
			description: "Student projects approved by our instructors will be featured here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			variants: staggerContainer,
			initial: "hidden",
			animate: "visible",
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
			children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: slideUp,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					hover: true,
					className: "h-full flex flex-col p-0 overflow-hidden group",
					children: [p.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image_url,
						alt: p.title,
						loading: "lazy",
						decoding: "async",
						className: "w-full h-44 object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 flex flex-col flex-1",
						children: [
							p.course && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-[var(--gold)] uppercase tracking-wider mb-2",
								children: p.course
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-display font-semibold mb-1",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-[var(--color-text-muted)] mb-3",
								children: ["by ", p.student_name]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-[var(--color-text-secondary)] flex-1",
								children: p.description
							}),
							p.project_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: p.project_url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-2 text-sm text-[var(--gold)] mt-5 hover:underline",
								children: ["View project ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5" })]
							})
						]
					})]
				})
			}, p.id))
		})
	});
}
var SplitComponent = ShowcasePage;
//#endregion
export { SplitComponent as component };
