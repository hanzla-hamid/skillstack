import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { u as cn } from "./router-CotFlDs_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GlassCard-SzpZpfvg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GlassCard = (0, import_react.forwardRef)(({ className, children, hover = false, strong = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		className: cn(strong ? "glass-strong" : "glass-card", "rounded-2xl transition-all duration-500 p-6 md:p-8", hover && "hover:border-[var(--gold)]/30 hover:shadow-card-hover", className),
		...props,
		children
	});
});
GlassCard.displayName = "GlassCard";
//#endregion
export { GlassCard as t };
