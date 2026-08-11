import "./rolldown-runtime-D7D4PA-g.mjs";
import { t as DynamicBackground } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { a as staggerContainer, i as slideUp } from "./SectionComponents-tAUCJcK6.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var PageHero = ({ eyebrow, title, highlight, subtitle }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 flex items-center justify-center min-h-[40vh] overflow-hidden border-b border-white/5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicBackground, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			variants: staggerContainer,
			initial: "hidden",
			animate: "visible",
			className: "relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center",
			children: [
				eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: slideUp,
					className: "mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-4 py-1.5 rounded-full border border-[var(--gold)]/30 text-[var(--gold)] text-sm font-semibold tracking-widest uppercase bg-[var(--gold)]/5",
						children: eyebrow
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
					variants: slideUp,
					className: "text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6",
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
					className: "text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl",
					children: subtitle
				})
			]
		})]
	});
};
//#endregion
export { PageHero as t };
