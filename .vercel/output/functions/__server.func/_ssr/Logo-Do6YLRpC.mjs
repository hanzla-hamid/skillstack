import "./rolldown-runtime-D7D4PA-g.mjs";
import { r as Link$1 } from "./router-CotFlDs_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var logoUrl = "/logo.png";
var Logo = ({ className, scrolled = false }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
		href: "/",
		className: `flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 ${className || ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: logoUrl,
			alt: "SkillStack Logo",
			className: `${scrolled ? "h-8" : "h-10"} w-auto transition-all duration-300`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-display font-bold text-xl tracking-tight hidden sm:block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-white",
				children: "Skill"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[var(--gold)]",
				children: "Stack"
			})]
		})]
	});
};
//#endregion
export { Logo as t };
