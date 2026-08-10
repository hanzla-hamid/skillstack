import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { d as supabase, l as useToast, n as GoldButton, o as useAuth, r as Link$1, s as useLocation, t as DynamicBackground } from "./router-CotFlDs_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { $ as EyeOff, Et as ArrowRight, I as Lock, N as Mail, Q as Eye } from "../_libs/lucide-react.mjs";
import { t as BRAND } from "./constants-MbwHFMBp.mjs";
import { t as Logo } from "./Logo-Do6YLRpC.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Ds7zk5Eh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const [, setLocation] = useLocation();
	const { toast } = useToast();
	const { refreshProfile } = useAuth();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [googleLoading, setGoogleLoading] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const validate = () => {
		const next = {};
		if (!email.trim()) next.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address";
		if (!password) next.password = "Password is required";
		else if (password.length < 6) next.password = "Password must be at least 6 characters";
		setErrors(next);
		return Object.keys(next).length === 0;
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			toast({
				title: "Login failed",
				description: error.message,
				variant: "destructive"
			});
			setLoading(false);
			return;
		}
		await refreshProfile();
		toast({
			title: "Login successful",
			description: "Welcome back to your dashboard."
		});
		setLocation("/dashboard");
	};
	const handleGoogleLogin = async () => {
		setGoogleLoading(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/dashboard` }
		});
		if (error) {
			toast({
				title: "Google sign-in failed",
				description: error.message,
				variant: "destructive"
			});
			setGoogleLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex relative overflow-hidden bg-[var(--color-bg)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden lg:flex flex-col justify-between w-1/2 p-12 relative z-10 border-r border-white/5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-black/60 to-black/90 pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative z-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 max-w-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-5xl font-display font-bold mb-6 leading-tight",
								children: ["Welcome Back to ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "gold-gradient-text",
									children: "SkillStack"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl text-[var(--color-text-secondary)] mb-12",
								children: "Continue your journey from learning to earning. Access your courses, projects, and community."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-3xl font-bold text-white mb-1",
									children: "100%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-[var(--gold)] uppercase tracking-wider font-semibold",
									children: "Practical"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-3xl font-bold text-white mb-1",
									children: "0%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-[var(--gold)] uppercase tracking-wider font-semibold",
									children: "Theory Waste"
								})] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 text-sm text-[var(--color-text-muted)]",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" ",
							BRAND.name,
							". All rights reserved."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:hidden mb-12 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						strong: true,
						className: "p-8 shadow-2xl relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/10 blur-[60px] pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-display font-bold mb-2 text-white",
									children: "Sign In"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[var(--color-text-secondary)]",
									children: "Enter your credentials to access your account"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleGoogleLogin,
								disabled: googleLoading || loading,
								className: "w-full flex items-center justify-center gap-3 bg-white border border-white/10 rounded-xl px-6 py-3.5 text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									className: "w-5 h-5",
									viewBox: "0 0 24 24",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#4285F4",
											d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#34A853",
											d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#FBBC05",
											d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#EA4335",
											d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										})
									]
								}), googleLoading ? "Connecting..." : "Continue with Google"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 my-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-white/10" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-[var(--color-text-muted)] uppercase tracking-wider",
										children: "or"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-white/10" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleLogin,
								className: "space-y-5",
								noValidate: true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "login-email",
												className: "text-sm font-medium text-white/80",
												children: "Email Address"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													id: "login-email",
													type: "email",
													required: true,
													value: email,
													onChange: (e) => {
														setEmail(e.target.value);
														setErrors((prev) => ({
															...prev,
															email: void 0
														}));
													},
													"aria-invalid": !!errors.email,
													"aria-describedby": errors.email ? "login-email-error" : void 0,
													className: "w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors",
													placeholder: "you@example.com"
												})]
											}),
											errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												id: "login-email-error",
												className: "text-xs text-red-400 mt-1",
												children: errors.email
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex justify-between items-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													htmlFor: "login-password",
													className: "text-sm font-medium text-white/80",
													children: "Password"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														id: "login-password",
														type: showPassword ? "text" : "password",
														required: true,
														value: password,
														onChange: (e) => {
															setPassword(e.target.value);
															setErrors((prev) => ({
																...prev,
																password: void 0
															}));
														},
														"aria-invalid": !!errors.password,
														"aria-describedby": errors.password ? "login-password-error" : void 0,
														className: "w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors",
														placeholder: "••••••••"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setShowPassword((prev) => !prev),
														className: "absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white/70 transition-colors",
														"aria-label": showPassword ? "Hide password" : "Show password",
														children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-5 h-5" })
													})
												]
											}),
											errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												id: "login-password-error",
												className: "text-xs text-red-400 mt-1",
												children: errors.password
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GoldButton, {
										type: "submit",
										className: "w-full mt-6 flex justify-between items-center px-6",
										disabled: loading,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loading ? "Signing in..." : "Sign In to Dashboard" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 text-center text-sm text-[var(--color-text-secondary)] border-t border-white/10 pt-6",
								children: [
									"Don't have an account yet?",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										href: "/register",
										className: "text-[var(--gold)] hover:underline font-medium",
										children: "Create one now"
									})
								]
							})
						]
					})]
				})
			})
		]
	});
}
var SplitComponent = LoginPage;
//#endregion
export { SplitComponent as component };
