import "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Navbar, t as Footer } from "./Footer-CqtL07fW.mjs";
import { n as SectionWrapper } from "./SectionComponents-tAUCJcK6.mjs";
import { t as PageHero } from "./PageHero-CqVMVuWW.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var PageShell = ({ eyebrow, title, highlight, subtitle, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "min-h-screen flex flex-col",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow,
			title,
			highlight,
			subtitle
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			id: "main-content",
			className: "flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
				className: "pt-0",
				children
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	]
});
var GridSkeleton = ({ count = 6 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
	children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 rounded-2xl border border-white/10 bg-white/[0.03] animate-pulse",
		"aria-hidden": "true"
	}, i))
});
var EmptyState = ({ icon, title, description }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "text-center py-20 border border-dashed border-white/10 rounded-3xl",
	children: [
		icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-14 h-14 mx-auto mb-6 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)]",
			children: icon
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-xl font-display font-semibold mb-2",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[var(--color-text-secondary)] max-w-md mx-auto text-sm",
			children: description
		})
	]
});
var FilterPills = ({ options, value, onChange }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "flex flex-wrap gap-2 mb-10",
	role: "tablist",
	"aria-label": "Filter",
	children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "tab",
		"aria-selected": value === option,
		onClick: () => onChange(option),
		className: "px-4 py-2 rounded-full text-sm font-medium border transition-colors " + (value === option ? "bg-[var(--gold)]/15 border-[var(--gold)]/40 text-[var(--gold)]" : "border-white/10 text-[var(--color-text-secondary)] hover:border-white/25 hover:text-white"),
		children: option
	}, option))
});
//#endregion
export { PageShell as i, FilterPills as n, GridSkeleton as r, EmptyState as t };
