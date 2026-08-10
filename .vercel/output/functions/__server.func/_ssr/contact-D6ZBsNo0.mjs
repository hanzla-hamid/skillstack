import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { d as supabase, l as useToast, n as GoldButton } from "./router-CotFlDs_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { C as Phone, M as MapPin, N as Mail, O as MessageSquare, at as Clock, ft as CircleCheckBig } from "../_libs/lucide-react.mjs";
import { o as PROGRAMS, t as BRAND } from "./constants-MbwHFMBp.mjs";
import { n as Navbar, t as Footer } from "./Footer-CqtL07fW.mjs";
import { n as SectionWrapper } from "./SectionComponents-tAUCJcK6.mjs";
import { t as PageHero } from "./PageHero-CqVMVuWW.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-D6ZBsNo0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const { toast } = useToast();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [program, setProgram] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const validate = () => {
		const next = {};
		if (!name.trim()) next.name = "Name is required";
		else if (name.trim().length < 2) next.name = "Name must be at least 2 characters";
		if (!email.trim()) next.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email";
		if (!message.trim()) next.message = "Message is required";
		else if (message.trim().length < 10) next.message = "Message must be at least 10 characters";
		setErrors(next);
		return Object.keys(next).length === 0;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		setLoading(true);
		const { error } = await supabase.from("contact_messages").insert({
			name,
			email,
			phone: phone || null,
			program: program || null,
			message
		});
		if (error) toast({
			variant: "destructive",
			title: "Submission failed",
			description: "Something went wrong while sending your message. Please try again."
		});
		else {
			setSubmitted(true);
			setName("");
			setEmail("");
			setPhone("");
			setProgram("");
			setMessage("");
			toast({
				title: "Message sent!",
				description: "We will get back to you within 24 hours."
			});
		}
		setLoading(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Get in Touch",
			title: "Contact",
			highlight: "Us",
			subtitle: "Have questions about our programs? Want to visit our campus? We are here to help you take the next step in your learning journey."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
			className: "pt-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-6 h-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display font-semibold text-white mb-1",
									children: "Visit Our Campus"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-[var(--color-text-secondary)]",
									children: BRAND.address
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-6 h-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display font-semibold text-white mb-1",
										children: "Call Us"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-[var(--color-text-secondary)]",
										children: BRAND.phone1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-[var(--color-text-secondary)]",
										children: BRAND.phone2
									})
								] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-6 h-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display font-semibold text-white mb-1",
									children: "Email Us"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-[var(--color-text-secondary)]",
									children: BRAND.email
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-6 h-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display font-semibold text-white mb-1",
										children: "Office Hours"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-[var(--color-text-secondary)]",
										children: "Monday - Friday: 9:00 AM - 7:00 PM"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-[var(--color-text-secondary)]",
										children: "Saturday: 10:00 AM - 4:00 PM"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-[var(--color-text-secondary)]",
										children: "Sunday: Closed"
									})
								] })]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					className: "p-10 flex flex-col items-center justify-center text-center min-h-[400px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 h-16 rounded-full bg-[var(--gold)]/20 flex items-center justify-center mb-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-8 h-8 text-[var(--gold)]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2xl font-display font-bold text-white mb-3",
							children: "Message Sent!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--color-text-secondary)] mb-8",
							children: "Thank you for reaching out. Our team will get back to you within 24 hours."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSubmitted(false),
							className: "text-[var(--gold)] hover:underline font-medium",
							children: "Send another message"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					className: "p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-2xl font-display font-bold text-white mb-2 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-5 h-5 text-[var(--gold)]" }), " Send Us a Message"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-[var(--color-text-secondary)] mb-6",
							children: "Fill out the form below and we will respond within 24 hours."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium text-white mb-1.5 block",
										children: "Full Name *"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: "Your name",
										className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--gold)]/50 transition-colors"
									}),
									errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-red-400 mt-1",
										children: errors.name
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium text-white mb-1.5 block",
											children: "Email *"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											placeholder: "you@example.com",
											className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--gold)]/50 transition-colors"
										}),
										errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-red-400 mt-1",
											children: errors.email
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium text-white mb-1.5 block",
										children: "Phone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										value: phone,
										onChange: (e) => setPhone(e.target.value),
										placeholder: "+92 3XX XXXXXXX",
										className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--gold)]/50 transition-colors"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium text-white mb-1.5 block",
									children: "Program of Interest"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: program,
									onChange: (e) => setProgram(e.target.value),
									className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[var(--gold)]/50 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select a program"
									}), PROGRAMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: p.title,
										className: "bg-[var(--color-surface)]",
										children: p.title
									}, p.slug))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium text-white mb-1.5 block",
										children: "Message *"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: message,
										onChange: (e) => setMessage(e.target.value),
										rows: 5,
										placeholder: "Tell us how we can help...",
										className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--gold)]/50 transition-colors resize-none"
									}),
									errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-red-400 mt-1",
										children: errors.message
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
									type: "submit",
									disabled: loading,
									className: "mt-2",
									children: loading ? "Sending..." : "Send Message"
								})
							]
						})
					]
				}) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-6 sm:px-8 lg:px-12 pb-20 md:pb-28 relative z-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-7xl mx-auto w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-card rounded-2xl overflow-hidden border border-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 border-b border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-xl font-display font-bold text-white flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-5 h-5 text-[var(--gold)]" }), " Find Us on the Map"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-[var(--color-text-secondary)] mt-1",
							children: BRAND.address
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative w-full",
						style: { paddingBottom: "40%" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							title: "SkillStack Campus Location",
							src: "https://www.google.com/maps?q=Rawalpindi,Pakistan&output=embed",
							className: "absolute inset-0 w-full h-full border-0",
							loading: "lazy",
							referrerPolicy: "no-referrer-when-downgrade",
							allowFullScreen: true
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	] });
}
var SplitComponent = ContactPage;
//#endregion
export { SplitComponent as component };
