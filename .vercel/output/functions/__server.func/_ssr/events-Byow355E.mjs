import "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { M as MapPin, _t as CalendarDays } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as staggerContainer, i as slideUp } from "./SectionComponents-tAUCJcK6.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
import { a as fetchEvents } from "./content-BoIgMibb.mjs";
import { i as PageShell, r as GridSkeleton, t as EmptyState } from "./ContentPage-CAHSbKKW.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function EventCard({ event, past }) {
	const date = new Date(event.starts_at);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
		hover: true,
		className: "flex gap-6 items-start " + (past ? "opacity-60" : ""),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shrink-0 w-16 text-center rounded-xl border border-[var(--gold)]/25 bg-[var(--gold)]/5 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-2xl font-display font-bold text-[var(--gold)]",
				children: date.getDate()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]",
				children: date.toLocaleString("en-GB", { month: "short" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-display font-semibold mb-2",
					children: event.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-[var(--color-text-secondary)] mb-3",
					children: event.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-4 text-xs text-[var(--color-text-muted)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "w-3.5 h-3.5" }), date.toLocaleString("en-GB", {
							dateStyle: "medium",
							timeStyle: "short"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5" }),
							" ",
							event.location
						]
					})]
				}),
				event.register_url && !past && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: event.register_url,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-block mt-4 px-4 py-2 rounded-full text-sm font-medium bg-[var(--gold)]/15 border border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)]/25 transition-colors",
					children: "Register"
				})
			]
		})]
	});
}
function EventsPage() {
	const { data, isLoading } = useQuery({
		queryKey: ["events"],
		queryFn: fetchEvents
	});
	const items = data ?? [];
	const now = Date.now();
	const upcoming = items.filter((e) => new Date(e.starts_at).getTime() >= now);
	const past = items.filter((e) => new Date(e.starts_at).getTime() < now).reverse();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		eyebrow: "Events",
		title: "Workshops &",
		highlight: "Meetups",
		subtitle: "Free sessions, bootcamps, orientation days and industry talks hosted by SkillStack.",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, { count: 3 }) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "w-6 h-6" }),
			title: "No events scheduled",
			description: "Upcoming workshops and sessions will be listed here once scheduled."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			variants: staggerContainer,
			initial: "hidden",
			animate: "visible",
			className: "space-y-12",
			children: [upcoming.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold uppercase tracking-widest text-[var(--gold)] mb-5",
				children: "Upcoming"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5",
				children: upcoming.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: slideUp,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event: e })
				}, e.id))
			})] }), past.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-5",
				children: "Past events"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5",
				children: past.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: slideUp,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, {
						event: e,
						past: true
					})
				}, e.id))
			})] })]
		})
	});
}
var SplitComponent = EventsPage;
//#endregion
export { SplitComponent as component };
