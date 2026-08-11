import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { r as Link$1 } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { r as X, v as Search } from "../_libs/lucide-react.mjs";
import { i as useFocusTrap, r as useEscapeKey } from "./NotificationsMenu-TUt9LWZL.mjs";
import { o as PROGRAMS } from "./constants-MbwHFMBp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SearchOverlay-C41sXXDp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATIC_PAGES = [
	{
		id: "page-home",
		title: "Home",
		description: "SkillStack homepage",
		href: "/",
		group: "Pages"
	},
	{
		id: "page-courses",
		title: "Courses",
		description: "Browse all courses and programs",
		href: "/courses",
		group: "Pages"
	},
	{
		id: "page-library",
		title: "Library",
		description: "Learning resources library",
		href: "/library",
		group: "Pages"
	},
	{
		id: "page-knowledge",
		title: "Knowledge Hub",
		description: "Guides, tutorials and career articles",
		href: "/knowledge",
		group: "Pages"
	},
	{
		id: "page-blog",
		title: "Blog",
		description: "Videos, articles and updates from SkillStack",
		href: "/blog",
		group: "Pages"
	},
	{
		id: "page-news",
		title: "News Center",
		description: "Announcements and updates from SkillStack",
		href: "/news",
		group: "Pages"
	},
	{
		id: "page-gallery",
		title: "Gallery",
		description: "Photos from campus life and events",
		href: "/gallery",
		group: "Pages"
	},
	{
		id: "page-showcase",
		title: "Student Showcase",
		description: "Projects built by SkillStack students",
		href: "/showcase",
		group: "Pages"
	},
	{
		id: "page-events",
		title: "Events",
		description: "Workshops, bootcamps and meetups",
		href: "/events",
		group: "Pages"
	},
	{
		id: "page-downloads",
		title: "Download Center",
		description: "Free cheat sheets, templates and prospectus",
		href: "/downloads",
		group: "Pages"
	},
	{
		id: "page-about",
		title: "About",
		description: "About SkillStack academy",
		href: "/about",
		group: "Pages"
	},
	{
		id: "page-contact",
		title: "Contact",
		description: "Get in touch with admissions",
		href: "/contact",
		group: "Pages"
	},
	{
		id: "page-faq",
		title: "FAQ",
		description: "Frequently asked questions",
		href: "/faq",
		group: "Pages"
	},
	{
		id: "page-login",
		title: "Login",
		description: "Sign in to your account",
		href: "/login",
		group: "Pages"
	},
	{
		id: "page-register",
		title: "Register",
		description: "Create a new account",
		href: "/register",
		group: "Pages"
	},
	{
		id: "page-dashboard",
		title: "Dashboard",
		description: "Your learning dashboard",
		href: "/dashboard",
		group: "Pages"
	},
	{
		id: "page-privacy",
		title: "Privacy Policy",
		description: "How we handle your data",
		href: "/privacy-policy",
		group: "Pages"
	},
	{
		id: "page-terms",
		title: "Terms & Conditions",
		description: "Terms of service",
		href: "/terms",
		group: "Pages"
	},
	{
		id: "page-refund",
		title: "Refund Policy",
		description: "Refund and cancellation policy",
		href: "/refund-policy",
		group: "Pages"
	},
	{
		id: "page-conduct",
		title: "Code of Conduct",
		description: "Community code of conduct",
		href: "/code-of-conduct",
		group: "Pages"
	}
];
function searchSite(query) {
	const normalized = query.trim().toLowerCase();
	if (!normalized) return [];
	const pageResults = STATIC_PAGES.filter((page) => page.title.toLowerCase().includes(normalized) || page.description.toLowerCase().includes(normalized));
	const courseResults = PROGRAMS.filter((program) => program.title.toLowerCase().includes(normalized) || program.description.toLowerCase().includes(normalized)).map((program) => ({
		id: `course-${program.slug ?? program.title}`,
		title: program.title,
		description: program.description,
		href: program.slug ? `/courses/${program.slug}` : "/courses",
		group: "Courses"
	}));
	return [...pageResults, ...courseResults];
}
/**
* Default export so it can be lazy-loaded via React.lazy() from Navbar,
* keeping the search UI out of the initial bundle.
*/
var SearchOverlay = ({ onClose }) => {
	const [query, setQuery] = (0, import_react.useState)("");
	const panelRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	useEscapeKey(onClose, true);
	useFocusTrap(panelRef, true);
	(0, import_react.useEffect)(() => {
		inputRef.current?.focus();
	}, []);
	const results = (0, import_react.useMemo)(() => searchSite(query), [query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-start justify-center px-6 pt-24 sm:pt-32 bg-black/70 backdrop-blur-sm",
		onMouseDown: (event) => {
			if (event.target === event.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			ref: panelRef,
			initial: {
				opacity: 0,
				y: -16,
				scale: .98
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				y: -16,
				scale: .98
			},
			transition: {
				duration: .2,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Site search",
			className: "glass-strong rounded-2xl w-full max-w-xl overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-5 py-4 border-b border-white/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						className: "w-5 h-5 text-[var(--gold)] shrink-0",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "text",
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search courses and pages...",
						"aria-label": "Search courses and pages",
						className: "flex-1 bg-transparent outline-none text-white placeholder:text-[var(--color-text-muted)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Close search",
						className: "p-1 text-[var(--color-text-muted)] hover:text-[var(--gold)] transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-96 overflow-y-auto p-2",
				children: query.trim() === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-[var(--color-text-muted)] px-3 py-8 text-center",
					children: "Start typing to search courses and pages."
				}) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-[var(--color-text-muted)] px-3 py-8 text-center",
					children: [
						"No results for “",
						query,
						"”."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-1",
					children: results.map((result) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: result.href,
						onClick: onClose,
						className: "block px-3 py-2 rounded-lg hover:bg-[var(--gold)]/10 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-white",
								children: result.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-wide text-[var(--gold)]",
								children: result.group
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--color-text-muted)] line-clamp-1 mt-0.5",
							children: result.description
						})]
					}) }, result.id))
				})
			})]
		})
	});
};
//#endregion
export { SearchOverlay as default };
