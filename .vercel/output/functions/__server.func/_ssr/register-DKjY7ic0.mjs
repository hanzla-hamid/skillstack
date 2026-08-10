import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { d as supabase, l as useToast, n as GoldButton, o as useAuth, r as Link$1, s as useLocation, t as DynamicBackground } from "./router-CotFlDs_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { $ as EyeOff, Et as ArrowRight, I as Lock, N as Mail, P as MailCheck, Q as Eye, b as RefreshCw, o as User } from "../_libs/lucide-react.mjs";
import { o as PROGRAMS, t as BRAND } from "./constants-MbwHFMBp.mjs";
import { t as Logo } from "./Logo-Do6YLRpC.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-DKjY7ic0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegisterPage() {
	const [, setLocation] = useLocation();
	const { toast } = useToast();
	const { refreshProfile } = useAuth();
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [courseInterest, setCourseInterest] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [googleLoading, setGoogleLoading] = (0, import_react.useState)(false);
	const [verificationSent, setVerificationSent] = (0, import_react.useState)(false);
	const [resending, setResending] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const validate = () => {
		const next = {};
		if (!fullName.trim()) next.fullName = "Full name is required";
		else if (fullName.trim().length < 2) next.fullName = "Name must be at least 2 characters";
		if (!email.trim()) next.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address";
		if (!password) next.password = "Password is required";
		else if (password.length < 6) next.password = "Password must be at least 6 characters";
		if (password !== confirmPassword) next.confirmPassword = "Passwords do not match";
		setErrors(next);
		return Object.keys(next).length === 0;
	};
	const handleRegister = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		setLoading(true);
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${window.location.origin}/dashboard`,
				data: { full_name: fullName }
			}
		});
		if (error) {
			toast({
				title: "Registration failed",
				description: error.message,
				variant: "destructive"
			});
			setLoading(false);
			return;
		}
		if (data.user) {
			if (!!data.session) {
				await refreshProfile();
				if (courseInterest) {
					const { data: course } = await supabase.from("courses").select("id").eq("slug", courseInterest).maybeSingle();
					if (course) await supabase.from("enrollments").insert({
						user_id: data.user.id,
						course_id: course.id
					});
				}
				toast({
					title: "Account created!",
					description: "Welcome to SkillStack."
				});
				setLocation("/dashboard");
			} else setVerificationSent(true);
		}
		setLoading(false);
	};
	const handleResendVerification = async () => {
		setResending(true);
		const { error } = await supabase.auth.resend({
			type: "signup",
			email,
			options: { emailRedirectTo: `${window.location.origin}/dashboard` }
		});
		setResending(false);
		if (error) {
			toast({
				title: "Could not resend",
				description: error.message,
				variant: "destructive"
			});
			return;
		}
		toast({
			title: "Verification email sent",
			description: `We sent another link to ${email}.`
		});
	};
	const handleGoogleRegister = async () => {
		setGoogleLoading(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/dashboard` }
		});
		if (error) {
			toast({
				title: "Google sign-up failed",
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
								children: ["Start Your Journey as a ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "gold-gradient-text",
									children: "Founding Learner"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl text-[var(--color-text-secondary)] mb-8",
								children: "Join the most elite hybrid learning academy in Pakistan. Master real-world skills."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-4",
								children: [
									"Project-based physical & online classes",
									"Industry professional mentorship",
									"Verifiable certificates",
									"Career & freelancing guidance"
								].map((feature, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3 text-white/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-6 h-6 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/50 flex items-center justify-center text-[var(--gold)] text-sm",
										children: "✓"
									}), feature]
								}, i))
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
				className: "w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md my-auto py-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:hidden mb-8 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}), verificationSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						strong: true,
						className: "p-10 shadow-2xl relative overflow-hidden text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[var(--gold)]/15 blur-[90px] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 flex flex-col items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-20 h-20 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] mb-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "w-9 h-9" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-display font-bold text-white mb-3",
									children: "Verify your email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[var(--color-text-secondary)] mb-2",
									children: "We sent a confirmation link to"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[var(--gold)] font-medium break-all mb-6",
									children: email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full text-left space-y-3 bg-black/40 border border-white/10 rounded-2xl p-5 mb-8",
									children: [
										"Open the email from SkillStack",
										"Tap the confirmation link",
										"You will land straight in your dashboard"
									].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3 text-sm text-white/70",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-6 h-6 shrink-0 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-bold flex items-center justify-center",
											children: i + 1
										}), s]
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GoldButton, {
									className: "w-full mb-3",
									onClick: handleResendVerification,
									disabled: resending,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-4 h-4 ${resending ? "animate-spin" : ""}` }), resending ? "Sending..." : "Resend verification email"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-white/40 mb-6",
									children: "Not in your inbox? Check spam or promotions."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full border-t border-white/10 pt-5 text-sm text-[var(--color-text-secondary)]",
									children: [
										"Already verified?",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
											href: "/login",
											className: "text-[var(--gold)] hover:underline font-medium",
											children: "Sign in"
										})
									]
								})
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						strong: true,
						className: "p-8 shadow-2xl relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-display font-bold mb-2 text-white",
									children: "Create Account"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[var(--color-text-secondary)]",
									children: "Join SkillStack and start learning today."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleGoogleRegister,
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
								}), googleLoading ? "Connecting..." : "Sign up with Google"]
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
								onSubmit: handleRegister,
								className: "space-y-4",
								noValidate: true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "reg-name",
												className: "text-sm font-medium text-white/80",
												children: "Full Name"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													id: "reg-name",
													type: "text",
													required: true,
													value: fullName,
													onChange: (e) => {
														setFullName(e.target.value);
														setErrors((prev) => ({
															...prev,
															fullName: void 0
														}));
													},
													"aria-invalid": !!errors.fullName,
													className: "w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors",
													placeholder: "John Doe"
												})]
											}),
											errors.fullName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-red-400 mt-1",
												children: errors.fullName
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "reg-email",
												className: "text-sm font-medium text-white/80",
												children: "Email Address"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													id: "reg-email",
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
													className: "w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors",
													placeholder: "john@example.com"
												})]
											}),
											errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-red-400 mt-1",
												children: errors.email
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "reg-password",
												className: "text-sm font-medium text-white/80",
												children: "Password"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														id: "reg-password",
														type: showPassword ? "text" : "password",
														required: true,
														minLength: 6,
														value: password,
														onChange: (e) => {
															setPassword(e.target.value);
															setErrors((prev) => ({
																...prev,
																password: void 0
															}));
														},
														"aria-invalid": !!errors.password,
														className: "w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors",
														placeholder: "Create a strong password"
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
												className: "text-xs text-red-400 mt-1",
												children: errors.password
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "reg-confirm",
												className: "text-sm font-medium text-white/80",
												children: "Confirm Password"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													id: "reg-confirm",
													type: showPassword ? "text" : "password",
													required: true,
													value: confirmPassword,
													onChange: (e) => {
														setConfirmPassword(e.target.value);
														setErrors((prev) => ({
															...prev,
															confirmPassword: void 0
														}));
													},
													"aria-invalid": !!errors.confirmPassword,
													className: "w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors",
													placeholder: "Re-enter your password"
												})]
											}),
											errors.confirmPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-red-400 mt-1",
												children: errors.confirmPassword
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "reg-course",
											className: "text-sm font-medium text-white/80",
											children: "Course of Interest (Optional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "reg-course",
											value: courseInterest,
											onChange: (e) => setCourseInterest(e.target.value),
											className: "w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--gold)] transition-colors appearance-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Select a program..."
											}), PROGRAMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: p.slug,
												children: p.title
											}, p.slug))]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3 mt-4 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											id: "terms",
											required: true,
											className: "mt-1 rounded bg-black/60 border-white/10 text-[var(--gold)] focus:ring-[var(--gold)] w-4 h-4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											htmlFor: "terms",
											className: "text-xs text-white/60 leading-relaxed",
											children: [
												"I agree to the SkillStack",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
													href: "/terms",
													className: "text-[var(--gold)] hover:underline",
													children: "Terms of Service"
												}),
												" ",
												"and",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
													href: "/privacy-policy",
													className: "text-[var(--gold)] hover:underline",
													children: "Privacy Policy"
												}),
												". I understand that this is a premium academy."
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GoldButton, {
										type: "submit",
										className: "w-full mt-6 flex justify-between items-center px-6",
										disabled: loading,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loading ? "Creating account..." : "Create Account" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 text-center text-sm text-[var(--color-text-secondary)] border-t border-white/10 pt-6",
								children: [
									"Already have an account?",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										href: "/login",
										className: "text-[var(--gold)] hover:underline font-medium",
										children: "Sign in here"
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
var SplitComponent = RegisterPage;
//#endregion
export { SplitComponent as component };
