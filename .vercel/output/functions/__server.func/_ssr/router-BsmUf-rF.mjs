import { i as __exportAll, s as __toESM, t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { t as supabase$1 } from "./client-DYeZuFCv.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { H as House, r as X, rt as Compass } from "../_libs/lucide-react.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { _ as createRootRouteWithContext, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { a as Root2, i as Provider, n as Close, o as Title, r as Description, s as Viewport, t as Action } from "../_libs/@radix-ui/react-toast+[...].mjs";
import { n as Portal, r as Provider$1, t as Content2 } from "../_libs/radix-ui__react-tooltip.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-BaxKIi0E.js
var supabase = supabase$1;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/utils-B6DEad1T.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BsmUf-rF.js
var router_BsmUf_rF_exports = /* @__PURE__ */ __exportAll({
	a: () => useToast,
	c: () => useLocation,
	getRouter: () => getRouter,
	i: () => OutlineButton,
	l: () => useRoute,
	n: () => DynamicBackground,
	o: () => useAuth,
	r: () => GoldButton,
	s: () => Link$1,
	t: () => router_exports
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Link$1 = import_react.forwardRef(({ href, children, onClick, ...rest }, ref) => {
	if (/^(https?:|mailto:|tel:|#)/.test(href)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		ref,
		href,
		onClick,
		...rest,
		children
	});
	const handleClick = (e) => {
		onClick?.(e);
		if (typeof window !== "undefined") requestAnimationFrame(() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth"
			});
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		ref,
		to: href,
		onClick: handleClick,
		...rest,
		children
	});
});
Link$1.displayName = "Link";
function useLocation() {
	const router = useRouter();
	return [useRouterState({ select: (s) => s.location.pathname }), import_react.useCallback((to) => {
		router.navigate({ to });
	}, [router])];
}
function useRoute(pattern) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const keys = [];
	const match = new RegExp("^" + pattern.split("/").map((seg) => {
		if (seg.startsWith(":")) {
			keys.push(seg.slice(1).replace(/\?$/, ""));
			return "([^/]+)";
		}
		return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}).join("/") + "/?$").exec(pathname);
	if (!match) return [false, null];
	const params = {};
	keys.forEach((k, i) => {
		params[k] = decodeURIComponent(match[i + 1]);
	});
	return [true, params];
}
var styles_default = "/assets/styles-DqDqyzpk.css";
var AuthContext = (0, import_react.createContext)({
	session: null,
	user: null,
	profile: null,
	isAdmin: false,
	loading: true,
	signOut: async () => {},
	refreshProfile: async () => {}
});
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const fetchIsAdmin = (0, import_react.useCallback)(async (userId) => {
		const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
		if (error) {
			console.error("Error fetching roles:", error);
			setIsAdmin(false);
			return;
		}
		setIsAdmin(!!data);
	}, []);
	const fetchProfile = (0, import_react.useCallback)(async (userId) => {
		const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
		if (error) {
			console.error("Error fetching profile:", error);
			return;
		}
		setProfile(data);
	}, []);
	const refreshProfile = (0, import_react.useCallback)(async () => {
		if (user) await Promise.all([fetchProfile(user.id), fetchIsAdmin(user.id)]);
	}, [
		user,
		fetchProfile,
		fetchIsAdmin
	]);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (!mounted) return;
			setSession(session);
			setUser(session?.user ?? null);
			if (session?.user) Promise.all([fetchProfile(session.user.id), fetchIsAdmin(session.user.id)]).finally(() => mounted && setLoading(false));
			else setLoading(false);
		});
		const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
			if (!mounted) return;
			setSession(session);
			setUser(session?.user ?? null);
			if (session?.user) (async () => {
				await Promise.all([fetchProfile(session.user.id), fetchIsAdmin(session.user.id)]);
			})();
			else {
				setProfile(null);
				setIsAdmin(false);
			}
			setLoading(false);
		});
		return () => {
			mounted = false;
			authListener.subscription.unsubscribe();
		};
	}, [fetchProfile, fetchIsAdmin]);
	const signOut = (0, import_react.useCallback)(async () => {
		await supabase.auth.signOut();
		setProfile(null);
		setIsAdmin(false);
		setSession(null);
		setUser(null);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			session,
			user,
			profile,
			isAdmin,
			loading,
			signOut,
			refreshProfile
		},
		children
	});
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}
var TooltipProvider = Provider$1;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]", className),
	...props
}) }));
TooltipContent.displayName = Content2.displayName;
var ToastProvider = Provider;
var ToastViewport = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
	ref,
	className: cn("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
	...props
}));
ToastViewport.displayName = Viewport.displayName;
var toastVariants = cva("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
	variants: { variant: {
		default: "border bg-background text-foreground",
		destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
	} },
	defaultVariants: { variant: "default" }
});
var Toast = import_react.forwardRef(({ className, variant, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		ref,
		className: cn(toastVariants({ variant }), className),
		...props
	});
});
Toast.displayName = Root2.displayName;
var ToastAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
	...props
}));
ToastAction.displayName = Action.displayName;
var ToastClose = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
	ref,
	className: cn("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
	"toast-close": "",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
}));
ToastClose.displayName = Close.displayName;
var ToastTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	ref,
	className: cn("text-sm font-semibold", className),
	...props
}));
ToastTitle.displayName = Title.displayName;
var ToastDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	ref,
	className: cn("text-sm opacity-90", className),
	...props
}));
ToastDescription.displayName = Description.displayName;
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1e6;
var count = 0;
function genId() {
	count = (count + 1) % Number.MAX_SAFE_INTEGER;
	return count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
	if (toastTimeouts.has(toastId)) return;
	const timeout = setTimeout(() => {
		toastTimeouts.delete(toastId);
		dispatch({
			type: "REMOVE_TOAST",
			toastId
		});
	}, TOAST_REMOVE_DELAY);
	toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
	switch (action.type) {
		case "ADD_TOAST": return {
			...state,
			toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
		};
		case "UPDATE_TOAST": return {
			...state,
			toasts: state.toasts.map((t) => t.id === action.toast.id ? {
				...t,
				...action.toast
			} : t)
		};
		case "DISMISS_TOAST": {
			const { toastId } = action;
			if (toastId) addToRemoveQueue(toastId);
			else state.toasts.forEach((toast) => {
				addToRemoveQueue(toast.id);
			});
			return {
				...state,
				toasts: state.toasts.map((t) => t.id === toastId || toastId === void 0 ? {
					...t,
					open: false
				} : t)
			};
		}
		case "REMOVE_TOAST":
			if (action.toastId === void 0) return {
				...state,
				toasts: []
			};
			return {
				...state,
				toasts: state.toasts.filter((t) => t.id !== action.toastId)
			};
	}
};
var listeners = [];
var memoryState = { toasts: [] };
function dispatch(action) {
	memoryState = reducer(memoryState, action);
	listeners.forEach((listener) => {
		listener(memoryState);
	});
}
function toast$1({ ...props }) {
	const id = genId();
	const update = (props) => dispatch({
		type: "UPDATE_TOAST",
		toast: {
			...props,
			id
		}
	});
	const dismiss = () => dispatch({
		type: "DISMISS_TOAST",
		toastId: id
	});
	dispatch({
		type: "ADD_TOAST",
		toast: {
			...props,
			id,
			open: true,
			onOpenChange: (open) => {
				if (!open) dismiss();
			}
		}
	});
	return {
		id,
		dismiss,
		update
	};
}
function useToast() {
	const [state, setState] = import_react.useState(memoryState);
	import_react.useEffect(() => {
		listeners.push(setState);
		return () => {
			const index = listeners.indexOf(setState);
			if (index > -1) listeners.splice(index, 1);
		};
	}, [state]);
	return {
		...state,
		toast: toast$1,
		dismiss: (toastId) => dispatch({
			type: "DISMISS_TOAST",
			toastId
		})
	};
}
function Toaster$2() {
	const { toasts } = useToast();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastProvider, { children: [toasts.map(function({ id, title, description, action, ...props }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toast, {
			...props,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1",
					children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastTitle, { children: title }), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastDescription, { children: description })]
				}),
				action,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastClose, {})
			]
		}, id);
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastViewport, {})] });
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var GoldButton = (0, import_react.forwardRef)(({ className, children, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
		ref,
		whileHover: { y: -4 },
		whileTap: { y: 0 },
		className: cn("relative group inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold transition-all duration-300", "bg-[var(--gold)] text-black shadow-glow-sm hover:shadow-glow-md hover:bg-[var(--gold-hover)]", "overflow-hidden", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
			children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute w-1.5 h-1.5 bg-white/40 rounded-full",
				style: {
					transform: `rotate(${i * 36}deg) translateY(-20px)`,
					animation: `glow-pulse ${1 + i % 3}s infinite ease-in-out`
				}
			}, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative z-10",
			children
		})]
	});
});
GoldButton.displayName = "GoldButton";
var OutlineButton = (0, import_react.forwardRef)(({ className, children, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		ref,
		whileHover: { y: -4 },
		whileTap: { y: 0 },
		className: cn("inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-medium transition-all duration-300", "bg-transparent border border-[var(--gold)]/30 text-white", "hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 hover:text-[var(--gold-light)]", className),
		...props,
		children
	});
});
OutlineButton.displayName = "OutlineButton";
/**
* Ambient background glow that follows the pointer.
* The glow is moved by writing to the DOM inside a rAF frame instead of
* React state, so pointer movement never triggers a re-render.
*/
var DynamicBackground = ({ className }) => {
	const glowRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(pointer: coarse)").matches) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let frame = 0;
		let x = 0;
		let y = 0;
		const apply = () => {
			frame = 0;
			const el = glowRef.current;
			if (el) el.style.transform = `translate3d(${x - 400}px, ${y - 400}px, 0)`;
		};
		const handleMouseMove = (e) => {
			x = e.clientX;
			y = e.clientY;
			if (!frame) frame = window.requestAnimationFrame(apply);
		};
		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			if (frame) window.cancelAnimationFrame(frame);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("fixed inset-0 pointer-events-none z-0 overflow-hidden", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-texture-fine radial-fade opacity-30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: glowRef,
				className: "absolute w-[800px] h-[800px] rounded-full bg-[var(--gold)]/5 blur-[120px] transition-transform duration-1000 ease-out will-change-transform"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--gold)]/10 blur-[150px] animate-glow-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[var(--gold)]/5 blur-[150px] animate-glow-pulse",
				style: { animationDelay: "2s" }
			})
		]
	});
};
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen w-full flex items-center justify-center relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicBackground, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 24
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .6,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "relative z-10 max-w-lg mx-auto px-6 text-center flex flex-col items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-[8rem] md:text-[10rem] font-display font-bold leading-none gold-gradient-text",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl md:text-3xl font-display font-semibold text-white mt-4 mb-3",
					children: "Page Not Found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[var(--color-text-secondary)] text-lg mb-10 max-w-md",
					children: "The page you're looking for may have been moved, renamed, or never existed. Let's get you back on track."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold bg-[var(--gold)] text-black shadow-glow-sm hover:shadow-glow-md hover:bg-[var(--gold-hover)] transition-all duration-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "w-5 h-5" }), " Back Home"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: "/courses",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OutlineButton, {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "w-5 h-5" }), " Browse Courses"]
						})
					})]
				})
			]
		})]
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$29 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SkillStack | Skills Institute in Rawalpindi & Islamabad" },
			{
				name: "description",
				content: "SkillStack is a premium hybrid skills institute in Rawalpindi & Islamabad teaching web development, graphic design, digital marketing and e-commerce."
			},
			{
				name: "robots",
				content: "index, follow, max-image-preview:large, max-snippet:-1"
			},
			{
				name: "author",
				content: "SkillStack"
			},
			{
				property: "og:site_name",
				content: "SkillStack"
			},
			{
				property: "og:locale",
				content: "en_PK"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#0a0a0a"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@400;600;700;800&display=swap"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "EducationalOrganization",
				name: "SkillStack",
				alternateName: ["SkillStack Institute", "SkillStack Rawalpindi"],
				url: "",
				description: "Premium hybrid skills institute in Rawalpindi & Islamabad offering web development, graphic design, digital marketing and e-commerce programs.",
				address: {
					"@type": "PostalAddress",
					addressLocality: "Rawalpindi",
					addressRegion: "Punjab",
					addressCountry: "PK"
				},
				areaServed: [
					"Rawalpindi",
					"Islamabad",
					"Pakistan"
				]
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFound,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function ScrollManager() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant"
		});
	}, [pathname]);
	return null;
}
function RootComponent() {
	const { queryClient } = Route$29.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main-content",
				className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[var(--gold)] focus:px-4 focus:py-2 focus:font-semibold focus:text-black",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollManager, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$2, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		] }) })
	});
}
var $$splitComponentImporter$26 = () => import("./routes-B8GMCSmF.mjs");
var SITE = "";
var TITLE = "SkillStack — Skills Institute in Rawalpindi | Learn to Earn";
var DESCRIPTION = "SkillStack is a premium hybrid institute in Rawalpindi & Islamabad. Learn web development, graphic design, digital marketing and e-commerce with live projects, mentors and job-ready portfolios.";
var Route$28 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: TITLE },
			{
				name: "description",
				content: DESCRIPTION
			},
			{
				name: "keywords",
				content: "SkillStack, SkillStack Rawalpindi, skills institute Rawalpindi, web development course Islamabad, graphic design course Rawalpindi, digital marketing course Pakistan, e-commerce training"
			},
			{
				property: "og:title",
				content: TITLE
			},
			{
				property: "og:description",
				content: DESCRIPTION
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: TITLE
			},
			{
				name: "twitter:description",
				content: DESCRIPTION
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "WebSite",
						"@id": `${SITE}/#website`,
						name: "SkillStack",
						alternateName: [
							"SkillStack Pakistan",
							"SkillStack Institute",
							"SkillStack Rawalpindi"
						],
						url: SITE,
						inLanguage: "en-PK",
						publisher: { "@id": `${SITE}/#organization` },
						potentialAction: {
							"@type": "SearchAction",
							target: `${SITE}/knowledge?q={search_term_string}`,
							"query-input": "required name=search_term_string"
						}
					},
					{
						"@type": "EducationalOrganization",
						"@id": `${SITE}/#organization`,
						name: "SkillStack",
						url: SITE,
						logo: `${SITE}/favicon.svg`,
						email: "skillstack.pk.official@gmail.com",
						areaServed: [
							"Rawalpindi",
							"Islamabad",
							"Pakistan"
						],
						sameAs: [
							"https://www.facebook.com/profile.php?id=61591636781863",
							"https://www.instagram.com/skillstack.pk.official/",
							"https://x.com/Skillstackpk",
							"https://www.youtube.com/@Skillstack-h2x"
						]
					},
					{
						"@type": "ItemList",
						name: "SkillStack Programs",
						itemListElement: [
							"Web Development",
							"Graphic Designing",
							"Digital Marketing",
							"E-Commerce"
						].map((name, i) => ({
							"@type": "ListItem",
							position: i + 1,
							name,
							url: `${SITE}/courses`
						}))
					}
				]
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./about-CVa_W__y.mjs");
var Route$27 = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: "About Us — SkillStack" },
			{
				name: "description",
				content: "Meet the team behind SkillStack and the mission driving our Rawalpindi learning institute."
			},
			{
				property: "og:title",
				content: "About Us — SkillStack"
			},
			{
				property: "og:description",
				content: "Meet the team behind SkillStack and the mission driving our Rawalpindi learning institute."
			},
			{
				property: "og:url",
				content: "/about"
			},
			{
				name: "twitter:title",
				content: "About Us — SkillStack"
			},
			{
				name: "twitter:description",
				content: "Meet the team behind SkillStack and the mission driving our Rawalpindi learning institute."
			}
		],
		links: [{
			rel: "canonical",
			href: "/about"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./admissions-D8CVW7ip.mjs");
var Route$26 = createFileRoute("/admissions")({
	head: () => ({
		meta: [
			{ title: "Admissions — Apply to SkillStack" },
			{
				name: "description",
				content: "Apply for admission, request a scholarship, or send a course inquiry to SkillStack in Rawalpindi."
			},
			{
				property: "og:title",
				content: "Admissions — Apply to SkillStack"
			},
			{
				property: "og:description",
				content: "Apply for admission, request a scholarship, or send a course inquiry to SkillStack in Rawalpindi."
			},
			{
				property: "og:url",
				content: "/admissions"
			},
			{
				name: "twitter:title",
				content: "Admissions — Apply to SkillStack"
			},
			{
				name: "twitter:description",
				content: "Apply for admission, request a scholarship, or send a course inquiry to SkillStack in Rawalpindi."
			}
		],
		links: [{
			rel: "canonical",
			href: "/admissions"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./code-of-conduct-DCuBg2ZJ.mjs");
var Route$25 = createFileRoute("/code-of-conduct")({
	head: () => ({
		meta: [
			{ title: "Code of Conduct — SkillStack" },
			{
				name: "description",
				content: "Community standards expected from SkillStack students and staff."
			},
			{
				property: "og:title",
				content: "Code of Conduct — SkillStack"
			},
			{
				property: "og:description",
				content: "Community standards expected from SkillStack students and staff."
			},
			{
				property: "og:url",
				content: "/code-of-conduct"
			},
			{
				name: "twitter:title",
				content: "Code of Conduct — SkillStack"
			},
			{
				name: "twitter:description",
				content: "Community standards expected from SkillStack students and staff."
			}
		],
		links: [{
			rel: "canonical",
			href: "/code-of-conduct"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./contact-DhigqNj6.mjs");
var Route$24 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: "Contact — SkillStack" },
			{
				name: "description",
				content: "Get in touch with the SkillStack admissions and support team."
			},
			{
				property: "og:title",
				content: "Contact — SkillStack"
			},
			{
				property: "og:description",
				content: "Get in touch with the SkillStack admissions and support team."
			},
			{
				property: "og:url",
				content: "/contact"
			},
			{
				name: "twitter:title",
				content: "Contact — SkillStack"
			},
			{
				name: "twitter:description",
				content: "Get in touch with the SkillStack admissions and support team."
			}
		],
		links: [{
			rel: "canonical",
			href: "/contact"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./downloads-BXutB6oi.mjs");
var title$6 = "Download Center — Free Resources | SkillStack";
var description$6 = "Download SkillStack cheat sheets, templates, prospectuses and practice files for free.";
var Route$23 = createFileRoute("/downloads")({
	head: () => ({
		meta: [
			{ title: title$6 },
			{
				name: "description",
				content: description$6
			},
			{
				property: "og:title",
				content: title$6
			},
			{
				property: "og:description",
				content: description$6
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/downloads"
			}
		],
		links: [{
			rel: "canonical",
			href: "/downloads"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./events-DQrJXTxY.mjs");
var title$5 = "Events — Workshops & Meetups | SkillStack";
var description$5 = "Upcoming SkillStack workshops, bootcamps, orientation days and industry talks.";
var Route$22 = createFileRoute("/events")({
	head: () => ({
		meta: [
			{ title: title$5 },
			{
				name: "description",
				content: description$5
			},
			{
				property: "og:title",
				content: title$5
			},
			{
				property: "og:description",
				content: description$5
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/events"
			}
		],
		links: [{
			rel: "canonical",
			href: "/events"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./faq-DhdArGg0.mjs");
var Route$21 = createFileRoute("/faq")({
	head: () => ({
		meta: [
			{ title: "FAQ — SkillStack" },
			{
				name: "description",
				content: "Answers to the most common questions about SkillStack courses, fees and admissions."
			},
			{
				property: "og:title",
				content: "FAQ — SkillStack"
			},
			{
				property: "og:description",
				content: "Answers to the most common questions about SkillStack courses, fees and admissions."
			},
			{
				property: "og:url",
				content: "/faq"
			},
			{
				name: "twitter:title",
				content: "FAQ — SkillStack"
			},
			{
				name: "twitter:description",
				content: "Answers to the most common questions about SkillStack courses, fees and admissions."
			}
		],
		links: [{
			rel: "canonical",
			href: "/faq"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./gallery-tlmLd9NZ.mjs");
var title$4 = "Gallery — Life at SkillStack";
var description$4 = "Photos from SkillStack classrooms, workshops, graduations and community events.";
var Route$20 = createFileRoute("/gallery")({
	head: () => ({
		meta: [
			{ title: title$4 },
			{
				name: "description",
				content: description$4
			},
			{
				property: "og:title",
				content: title$4
			},
			{
				property: "og:description",
				content: description$4
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/gallery"
			}
		],
		links: [{
			rel: "canonical",
			href: "/gallery"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./library-PrDKa6x1.mjs");
var Route$19 = createFileRoute("/library")({
	head: () => ({
		meta: [
			{ title: "Learning Library — SkillStack" },
			{
				name: "description",
				content: "Free guides, resources and learning material from SkillStack."
			},
			{
				property: "og:title",
				content: "Learning Library — SkillStack"
			},
			{
				property: "og:description",
				content: "Free guides, resources and learning material from SkillStack."
			},
			{
				property: "og:url",
				content: "/library"
			},
			{
				name: "twitter:title",
				content: "Learning Library — SkillStack"
			},
			{
				name: "twitter:description",
				content: "Free guides, resources and learning material from SkillStack."
			}
		],
		links: [{
			rel: "canonical",
			href: "/library"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./login-BMouUEAQ.mjs");
var Route$18 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Sign In — SkillStack" },
		{
			name: "description",
			content: "Sign in to your SkillStack student dashboard."
		},
		{
			property: "og:title",
			content: "Sign In — SkillStack"
		},
		{
			property: "og:description",
			content: "Sign in to your SkillStack student dashboard."
		},
		{
			property: "og:url",
			content: "/login"
		},
		{
			name: "twitter:title",
			content: "Sign In — SkillStack"
		},
		{
			name: "twitter:description",
			content: "Sign in to your SkillStack student dashboard."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./news-BfWXr0F6.mjs");
var title$3 = "News Center — Announcements | SkillStack";
var description$3 = "Admissions updates, partnerships, results and milestones from SkillStack academy.";
var Route$17 = createFileRoute("/news")({
	head: () => ({
		meta: [
			{ title: title$3 },
			{
				name: "description",
				content: description$3
			},
			{
				property: "og:title",
				content: title$3
			},
			{
				property: "og:description",
				content: description$3
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/news"
			}
		],
		links: [{
			rel: "canonical",
			href: "/news"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./privacy-policy-GdAYpjTK.mjs");
var Route$16 = createFileRoute("/privacy-policy")({
	head: () => ({
		meta: [
			{ title: "Privacy Policy — SkillStack" },
			{
				name: "description",
				content: "How SkillStack collects, uses and protects your personal information."
			},
			{
				property: "og:title",
				content: "Privacy Policy — SkillStack"
			},
			{
				property: "og:description",
				content: "How SkillStack collects, uses and protects your personal information."
			},
			{
				property: "og:url",
				content: "/privacy-policy"
			},
			{
				name: "twitter:title",
				content: "Privacy Policy — SkillStack"
			},
			{
				name: "twitter:description",
				content: "How SkillStack collects, uses and protects your personal information."
			}
		],
		links: [{
			rel: "canonical",
			href: "/privacy-policy"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./refund-policy-BIo3ffVJ.mjs");
var Route$15 = createFileRoute("/refund-policy")({
	head: () => ({
		meta: [
			{ title: "Refund Policy — SkillStack" },
			{
				name: "description",
				content: "SkillStack's fee, cancellation and refund policy."
			},
			{
				property: "og:title",
				content: "Refund Policy — SkillStack"
			},
			{
				property: "og:description",
				content: "SkillStack's fee, cancellation and refund policy."
			},
			{
				property: "og:url",
				content: "/refund-policy"
			},
			{
				name: "twitter:title",
				content: "Refund Policy — SkillStack"
			},
			{
				name: "twitter:description",
				content: "SkillStack's fee, cancellation and refund policy."
			}
		],
		links: [{
			rel: "canonical",
			href: "/refund-policy"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./register-Am5nP-8L.mjs");
var Route$14 = createFileRoute("/register")({
	head: () => ({ meta: [
		{ title: "Create Account — SkillStack" },
		{
			name: "description",
			content: "Create your SkillStack account and start learning."
		},
		{
			property: "og:title",
			content: "Create Account — SkillStack"
		},
		{
			property: "og:description",
			content: "Create your SkillStack account and start learning."
		},
		{
			property: "og:url",
			content: "/register"
		},
		{
			name: "twitter:title",
			content: "Create Account — SkillStack"
		},
		{
			name: "twitter:description",
			content: "Create your SkillStack account and start learning."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./showcase-KGWlba9-.mjs");
var title$2 = "Student Showcase — Projects | SkillStack";
var description$2 = "Real projects built and shipped by SkillStack students across every program.";
var Route$13 = createFileRoute("/showcase")({
	head: () => ({
		meta: [
			{ title: title$2 },
			{
				name: "description",
				content: description$2
			},
			{
				property: "og:title",
				content: title$2
			},
			{
				property: "og:description",
				content: description$2
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/showcase"
			}
		],
		links: [{
			rel: "canonical",
			href: "/showcase"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var COURSE_SLUGS = [
	"web-development",
	"graphic-designing",
	"digital-marketing",
	"e-commerce"
];
var STATIC_PATHS = [
	["/", "1.0"],
	["/courses", "0.9"],
	["/knowledge", "0.9"],
	["/blog", "0.9"],
	["/downloads", "0.8"],
	["/events", "0.8"],
	["/gallery", "0.7"],
	["/showcase", "0.7"],
	["/news", "0.7"],
	["/library", "0.7"],
	["/admissions", "0.8"],
	["/about", "0.6"],
	["/contact", "0.6"],
	["/faq", "0.6"],
	["/privacy-policy", "0.3"],
	["/terms", "0.3"],
	["/refund-policy", "0.3"],
	["/code-of-conduct", "0.3"]
];
var Route$12 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async ({ request }) => {
	const origin = new URL(request.url).origin;
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...STATIC_PATHS, ...COURSE_SLUGS.map((slug) => [`/courses/${slug}`, "0.8"])].map(([path, priority]) => `  <url><loc>${origin}${path}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`).join("\n")}
</urlset>`;
	return new Response(body, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$10 = () => import("./terms-KbBrc3Es.mjs");
var Route$11 = createFileRoute("/terms")({
	head: () => ({
		meta: [
			{ title: "Terms & Conditions — SkillStack" },
			{
				name: "description",
				content: "The terms that govern the use of SkillStack services and courses."
			},
			{
				property: "og:title",
				content: "Terms & Conditions — SkillStack"
			},
			{
				property: "og:description",
				content: "The terms that govern the use of SkillStack services and courses."
			},
			{
				property: "og:url",
				content: "/terms"
			},
			{
				name: "twitter:title",
				content: "Terms & Conditions — SkillStack"
			},
			{
				name: "twitter:description",
				content: "The terms that govern the use of SkillStack services and courses."
			}
		],
		links: [{
			rel: "canonical",
			href: "/terms"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./admin.index-D_ulrvhc.mjs");
var Route$10 = createFileRoute("/admin/")({
	head: () => ({ meta: [
		{ title: "Admin Panel — SkillStack" },
		{
			name: "description",
			content: "SkillStack administration panel."
		},
		{
			property: "og:title",
			content: "Admin Panel — SkillStack"
		},
		{
			property: "og:description",
			content: "SkillStack administration panel."
		},
		{
			property: "og:url",
			content: "/admin"
		},
		{
			name: "twitter:title",
			content: "Admin Panel — SkillStack"
		},
		{
			name: "twitter:description",
			content: "SkillStack administration panel."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./admin._section-BbuLqz74.mjs");
var Route$9 = createFileRoute("/admin/$section")({
	head: () => ({ meta: [
		{ title: "Admin Panel — SkillStack" },
		{
			name: "description",
			content: "SkillStack administration panel."
		},
		{
			property: "og:title",
			content: "Admin Panel — SkillStack"
		},
		{
			property: "og:description",
			content: "SkillStack administration panel."
		},
		{
			name: "twitter:title",
			content: "Admin Panel — SkillStack"
		},
		{
			name: "twitter:description",
			content: "SkillStack administration panel."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./blog.index-Dpddxali.mjs");
var title$1 = "Blog — Videos, Articles & Updates | SkillStack";
var description$1 = "Watch SkillStack videos and read articles and updates, synced automatically from our YouTube channel and social pages.";
var Route$8 = createFileRoute("/blog/")({
	head: () => ({
		meta: [
			{ title: title$1 },
			{
				name: "description",
				content: description$1
			},
			{
				property: "og:title",
				content: title$1
			},
			{
				property: "og:description",
				content: description$1
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/blog"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "/blog"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./blog._slug-DeO3cBhR.mjs");
var Route$7 = createFileRoute("/blog/$slug")({
	head: ({ params }) => {
		const title = "SkillStack Blog Post";
		const description = "Read or watch this update from the SkillStack blog.";
		const url = `/blog/${params.slug}`;
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: description
				},
				{
					property: "og:title",
					content: title
				},
				{
					property: "og:description",
					content: description
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					property: "og:url",
					content: url
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				}
			],
			links: [{
				rel: "canonical",
				href: url
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./courses.index-6TdwlrIR.mjs");
var Route$6 = createFileRoute("/courses/")({
	head: () => ({
		meta: [
			{ title: "Courses — SkillStack" },
			{
				name: "description",
				content: "Explore SkillStack's project-based courses in web development, design, marketing and e-commerce."
			},
			{
				property: "og:title",
				content: "Courses — SkillStack"
			},
			{
				property: "og:description",
				content: "Explore SkillStack's project-based courses in web development, design, marketing and e-commerce."
			},
			{
				property: "og:url",
				content: "/courses"
			},
			{
				name: "twitter:title",
				content: "Courses — SkillStack"
			},
			{
				name: "twitter:description",
				content: "Explore SkillStack's project-based courses in web development, design, marketing and e-commerce."
			}
		],
		links: [{
			rel: "canonical",
			href: "/courses"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./courses._slug-C76Paoic.mjs");
var Route$5 = createFileRoute("/courses/$slug")({
	head: () => ({ meta: [
		{ title: "Course Details — SkillStack" },
		{
			name: "description",
			content: "Full curriculum, outcomes and schedule for this SkillStack program."
		},
		{
			property: "og:title",
			content: "Course Details — SkillStack"
		},
		{
			property: "og:description",
			content: "Full curriculum, outcomes and schedule for this SkillStack program."
		},
		{
			name: "twitter:title",
			content: "Course Details — SkillStack"
		},
		{
			name: "twitter:description",
			content: "Full curriculum, outcomes and schedule for this SkillStack program."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./dashboard.index-Bu4fkMlC.mjs");
var Route$4 = createFileRoute("/dashboard/")({
	head: () => ({ meta: [
		{ title: "Dashboard — SkillStack" },
		{
			name: "description",
			content: "Your SkillStack learning dashboard."
		},
		{
			property: "og:title",
			content: "Dashboard — SkillStack"
		},
		{
			property: "og:description",
			content: "Your SkillStack learning dashboard."
		},
		{
			property: "og:url",
			content: "/dashboard"
		},
		{
			name: "twitter:title",
			content: "Dashboard — SkillStack"
		},
		{
			name: "twitter:description",
			content: "Your SkillStack learning dashboard."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./dashboard._section-CoCUAGj_.mjs");
var Route$3 = createFileRoute("/dashboard/$section")({
	head: () => ({ meta: [
		{ title: "Dashboard — SkillStack" },
		{
			name: "description",
			content: "Your SkillStack learning dashboard."
		},
		{
			property: "og:title",
			content: "Dashboard — SkillStack"
		},
		{
			property: "og:description",
			content: "Your SkillStack learning dashboard."
		},
		{
			name: "twitter:title",
			content: "Dashboard — SkillStack"
		},
		{
			name: "twitter:description",
			content: "Your SkillStack learning dashboard."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./knowledge.index-CyyDyyeM.mjs");
var title = "Knowledge Hub — Guides & Tutorials | SkillStack";
var description = "Free in-depth guides, tutorials and career articles written by SkillStack instructors.";
var Route$2 = createFileRoute("/knowledge/")({
	head: () => ({
		meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/knowledge"
			}
		],
		links: [{
			rel: "canonical",
			href: "/knowledge"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./knowledge._slug-C97kJMAq.mjs");
var Route$1 = createFileRoute("/knowledge/$slug")({
	head: ({ params }) => {
		const title = "Article — SkillStack Knowledge Hub";
		const description = "Read this guide from the SkillStack Knowledge Hub.";
		const url = `/knowledge/${params.slug}`;
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: description
				},
				{
					property: "og:title",
					content: title
				},
				{
					property: "og:description",
					content: description
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					property: "og:url",
					content: url
				}
			],
			links: [{
				rel: "canonical",
				href: url
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
function authorizeRequest(request) {
	const secret = process.env["BLOG_SYNC_SECRET"] || process.env["CRON_SECRET"];
	if (!secret) return false;
	return (request?.headers.get("x-sync-secret") || (request?.url ? new URL(request.url).searchParams.get("secret") : null)) === secret;
}
var Route = createFileRoute("/api/public/sync-blog")({ server: { handlers: {
	POST: async ({ request }) => {
		if (!authorizeRequest(request)) return Response.json({
			ok: false,
			error: "Unauthorized sync request"
		}, { status: 401 });
		const { syncAllFeeds } = await import("./blog-sync.server-BkIl0Rd3.mjs");
		const results = await syncAllFeeds();
		return Response.json({
			ok: true,
			results
		});
	},
	GET: async ({ request }) => {
		if (!authorizeRequest(request)) return Response.json({
			ok: false,
			error: "Unauthorized sync request"
		}, { status: 401 });
		const { syncAllFeeds } = await import("./blog-sync.server-BkIl0Rd3.mjs");
		const results = await syncAllFeeds();
		return Response.json({
			ok: true,
			results
		});
	}
} } });
var IndexRoute = Route$28.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$29
});
var AboutRoute = Route$27.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$29
});
var AdmissionsRoute = Route$26.update({
	id: "/admissions",
	path: "/admissions",
	getParentRoute: () => Route$29
});
var CodeOfConductRoute = Route$25.update({
	id: "/code-of-conduct",
	path: "/code-of-conduct",
	getParentRoute: () => Route$29
});
var ContactRoute = Route$24.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$29
});
var DownloadsRoute = Route$23.update({
	id: "/downloads",
	path: "/downloads",
	getParentRoute: () => Route$29
});
var EventsRoute = Route$22.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => Route$29
});
var FaqRoute = Route$21.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$29
});
var GalleryRoute = Route$20.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$29
});
var LibraryRoute = Route$19.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => Route$29
});
var LoginRoute = Route$18.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$29
});
var NewsRoute = Route$17.update({
	id: "/news",
	path: "/news",
	getParentRoute: () => Route$29
});
var PrivacyPolicyRoute = Route$16.update({
	id: "/privacy-policy",
	path: "/privacy-policy",
	getParentRoute: () => Route$29
});
var RefundPolicyRoute = Route$15.update({
	id: "/refund-policy",
	path: "/refund-policy",
	getParentRoute: () => Route$29
});
var RegisterRoute = Route$14.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$29
});
var ShowcaseRoute = Route$13.update({
	id: "/showcase",
	path: "/showcase",
	getParentRoute: () => Route$29
});
var SitemapDotxmlRoute = Route$12.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$29
});
var TermsRoute = Route$11.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$29
});
var AdminIndexRoute = Route$10.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$29
});
var AdminSectionRoute = Route$9.update({
	id: "/admin/$section",
	path: "/admin/$section",
	getParentRoute: () => Route$29
});
var BlogIndexRoute = Route$8.update({
	id: "/blog/",
	path: "/blog/",
	getParentRoute: () => Route$29
});
var BlogSlugRoute = Route$7.update({
	id: "/blog/$slug",
	path: "/blog/$slug",
	getParentRoute: () => Route$29
});
var CoursesIndexRoute = Route$6.update({
	id: "/courses/",
	path: "/courses/",
	getParentRoute: () => Route$29
});
var CoursesSlugRoute = Route$5.update({
	id: "/courses/$slug",
	path: "/courses/$slug",
	getParentRoute: () => Route$29
});
var DashboardIndexRoute = Route$4.update({
	id: "/dashboard/",
	path: "/dashboard/",
	getParentRoute: () => Route$29
});
var DashboardSectionRoute = Route$3.update({
	id: "/dashboard/$section",
	path: "/dashboard/$section",
	getParentRoute: () => Route$29
});
var KnowledgeIndexRoute = Route$2.update({
	id: "/knowledge/",
	path: "/knowledge/",
	getParentRoute: () => Route$29
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdmissionsRoute,
	CodeOfConductRoute,
	ContactRoute,
	DownloadsRoute,
	EventsRoute,
	FaqRoute,
	GalleryRoute,
	LibraryRoute,
	LoginRoute,
	NewsRoute,
	PrivacyPolicyRoute,
	RefundPolicyRoute,
	RegisterRoute,
	ShowcaseRoute,
	SitemapDotxmlRoute,
	TermsRoute,
	AdminSectionRoute,
	BlogSlugRoute,
	CoursesSlugRoute,
	DashboardSectionRoute,
	KnowledgeSlugRoute: Route$1.update({
		id: "/knowledge/$slug",
		path: "/knowledge/$slug",
		getParentRoute: () => Route$29
	}),
	AdminIndexRoute,
	BlogIndexRoute,
	CoursesIndexRoute,
	DashboardIndexRoute,
	KnowledgeIndexRoute,
	ApiPublicSyncBlogRoute: Route.update({
		id: "/api/public/sync-blog",
		path: "/api/public/sync-blog",
		getParentRoute: () => Route$29
	})
};
var routeTree = Route$29._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll$1({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient({ defaultOptions: { queries: {
		staleTime: 3e5,
		gcTime: 18e5,
		refetchOnWindowFocus: false,
		retry: 1
	} } });
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadDelay: 50,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { router_BsmUf_rF_exports as a, useRoute as c, supabase as d, OutlineButton as i, useToast as l, GoldButton as n, useAuth as o, Link$1 as r, useLocation as s, DynamicBackground as t, cn as u };
