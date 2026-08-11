import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { V as Image, r as X } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as staggerContainer, i as slideUp } from "./SectionComponents-tAUCJcK6.mjs";
import { o as fetchGallery } from "./content-BoIgMibb.mjs";
import { i as PageShell, n as FilterPills, r as GridSkeleton, t as EmptyState } from "./ContentPage-BMe9bIo1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-tlmLd9NZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GalleryPage() {
	const { data, isLoading } = useQuery({
		queryKey: ["gallery"],
		queryFn: fetchGallery
	});
	const [category, setCategory] = (0, import_react.useState)("All");
	const [active, setActive] = (0, import_react.useState)(null);
	const items = data ?? [];
	const categories = (0, import_react.useMemo)(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
	const filtered = items.filter((i) => category === "All" || i.category === category);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		eyebrow: "Gallery",
		title: "Life at",
		highlight: "SkillStack",
		subtitle: "Classrooms, workshops, graduations and the moments that make our community.",
		children: [
			categories.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPills, {
				options: categories,
				value: category,
				onChange: setCategory
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "w-6 h-6" }),
				title: "Gallery coming together",
				description: "Photos uploaded by the SkillStack team will appear in this gallery."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: staggerContainer,
				initial: "hidden",
				animate: "visible",
				className: "columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]",
				children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					variants: slideUp,
					type: "button",
					onClick: () => setActive(item),
					className: "mb-5 block w-full break-inside-avoid rounded-2xl overflow-hidden border border-white/10 group relative",
					"aria-label": `View ${item.title}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.image_url,
						alt: item.title,
						loading: "lazy",
						decoding: "async",
						className: "w-full transition-transform duration-500 group-hover:scale-105"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute inset-x-0 bottom-0 p-4 text-left text-sm font-medium bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity",
						children: item.title
					})]
				}, item.id))
			}),
			active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-6",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": active.title,
				onClick: () => setActive(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActive(null),
					"aria-label": "Close",
					className: "absolute top-6 right-6 p-2 text-white/70 hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "max-w-4xl",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: active.image_url,
						alt: active.title,
						className: "max-h-[75vh] rounded-2xl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "text-center text-sm text-[var(--color-text-secondary)] mt-4",
						children: active.caption || active.title
					})]
				})]
			})
		]
	});
}
var SplitComponent = GalleryPage;
//#endregion
export { SplitComponent as component };
