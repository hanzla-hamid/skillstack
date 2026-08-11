import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as BRAND } from "./constants-MbwHFMBp.mjs";
import { n as SectionWrapper } from "./SectionComponents-tAUCJcK6.mjs";
import { t as PageHero } from "./PageHero-OT7eUp5v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LegalPage-Cg7CC2zT.js
var import_jsx_runtime = require_jsx_runtime();
var LegalPage = ({ title, highlight, eyebrow, lastUpdated, sections }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow,
		title,
		highlight
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-[var(--color-text-muted)] mb-12",
				children: ["Last updated: ", lastUpdated]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-12",
				children: sections.map((section, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 24
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-100px"
					},
					transition: {
						duration: .5,
						delay: index * .05
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-display font-semibold text-white mb-4",
						children: section.heading
					}), section.body.map((paragraph, pIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--color-text-secondary)] text-base leading-relaxed mb-4",
						children: paragraph
					}, pIndex))]
				}, index))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 pt-8 border-t border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[var(--color-text-secondary)] text-base",
					children: [
						"Questions about this policy? Contact us at",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:" + BRAND.email,
							className: "text-[var(--gold)] hover:underline",
							children: BRAND.email
						}),
						" ",
						"or call",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "tel:" + BRAND.phone1.replace(/\s/g, ""),
							className: "text-[var(--gold)] hover:underline",
							children: BRAND.phone1
						}),
						"."
					]
				})
			})
		]
	}) })] });
};
//#endregion
export { LegalPage as t };
