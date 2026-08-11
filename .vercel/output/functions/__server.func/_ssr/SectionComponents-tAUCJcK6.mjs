import "./rolldown-runtime-D7D4PA-g.mjs";
import { u as cn } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var EASE_PREMIUM = [
	.22,
	1,
	.36,
	1
];
var slideUp = {
	hidden: {
		opacity: 0,
		y: 40
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .7,
			ease: EASE_PREMIUM
		}
	}
};
var staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: .1,
			delayChildren: .1
		}
	}
};
var staggerItem = {
	hidden: {
		opacity: 0,
		y: 30
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .6,
			ease: EASE_PREMIUM
		}
	}
};
var SectionHeading = ({ eyebrow, title, highlight, subtitle, align = "center", className }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		variants: staggerContainer,
		initial: "hidden",
		whileInView: "visible",
		viewport: {
			once: true,
			margin: "-100px"
		},
		className: cn("flex flex-col gap-4 mb-16", align === "center" ? "items-center text-center" : "items-start text-left", className),
		children: [
			eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				variants: slideUp,
				className: "px-4 py-1.5 rounded-full border border-[var(--gold)]/30 text-[var(--gold)] text-sm font-semibold tracking-widest uppercase bg-[var(--gold)]/5",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
				variants: slideUp,
				className: "text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight",
				children: [
					title,
					" ",
					highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gold-gradient-text",
						children: highlight
					})
				]
			}),
			subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				variants: slideUp,
				className: "text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mt-2",
				children: subtitle
			})
		]
	});
};
var SectionWrapper = ({ children, className, id }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.section, {
		id,
		variants: staggerContainer,
		initial: "hidden",
		whileInView: "visible",
		viewport: {
			once: true,
			margin: "-100px"
		},
		className: cn("py-20 md:py-28 px-6 sm:px-8 lg:px-12 relative z-10", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-7xl mx-auto w-full",
			children
		})
	});
};
var TrustBadge = ({ icon, label }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 bg-[var(--color-surface-card)]/50 backdrop-blur-md border border-white/5 rounded-full px-5 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[var(--gold)]",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium text-[var(--color-text-secondary)]",
			children: label
		})]
	});
};
//#endregion
export { staggerContainer as a, slideUp as i, SectionWrapper as n, staggerItem as o, TrustBadge as r, SectionHeading as t };
