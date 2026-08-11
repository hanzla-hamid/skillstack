import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { d as supabase, n as GoldButton } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { W as GraduationCap, dt as CircleCheck, lt as CircleQuestionMark, wt as Award } from "../_libs/lucide-react.mjs";
import { o as PROGRAMS } from "./constants-MbwHFMBp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as slideUp, n as SectionWrapper } from "./SectionComponents-tAUCJcK6.mjs";
import { t as PageHero } from "./PageHero-OT7eUp5v.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admissions-D8CVW7ip.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var applicationSchema = objectType({
	kind: enumType([
		"admission",
		"scholarship",
		"inquiry"
	]),
	full_name: stringType().trim().min(2, "Please enter your full name").max(120),
	email: stringType().trim().email("Please enter a valid email address").max(255),
	phone: stringType().trim().min(6, "Please enter a valid phone number").max(30).regex(/^[0-9+()\-\s]+$/, "Phone number can only contain digits and + ( ) -"),
	city: stringType().trim().max(80).nullable(),
	program: stringType().trim().min(1, "Please select a program").max(120),
	mode: stringType().trim().max(40).nullable(),
	scholarship_type: stringType().trim().max(40).nullable(),
	topic: stringType().trim().max(40).nullable(),
	message: stringType().trim().max(2e3).nullable()
});
var TABS = [
	{
		id: "admission",
		label: "Admission Form",
		icon: GraduationCap,
		blurb: "Apply for a seat in the upcoming batch."
	},
	{
		id: "scholarship",
		label: "Scholarship Form",
		icon: Award,
		blurb: "Request need or merit based financial support."
	},
	{
		id: "inquiry",
		label: "Course Inquiry",
		icon: CircleQuestionMark,
		blurb: "Ask us anything before you enroll."
	}
];
var inputClass = "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-[var(--color-text-muted)] outline-none transition-colors focus:border-[var(--gold)]/60 focus:ring-2 focus:ring-[var(--gold)]/20";
var Field = ({ id, label, children, type = "text", required = true, placeholder }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "flex flex-col gap-2",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		htmlFor: id,
		className: "text-sm font-medium text-[var(--color-text-secondary)]",
		children: [
			label,
			" ",
			required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[var(--gold)]",
				children: "*"
			})
		]
	}), children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		id,
		name: id,
		type,
		required,
		placeholder,
		className: inputClass
	})]
});
function AdmissionsPage() {
	const [tab, setTab] = (0, import_react.useState)("admission");
	const [submitted, setSubmitted] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (submitting) return;
		const form = e.currentTarget;
		const data = new FormData(form);
		const value = (key) => String(data.get(key) ?? "").trim();
		const payload = {
			kind: tab,
			full_name: value("fullName"),
			email: value("email").toLowerCase(),
			phone: value("phone"),
			city: value("city") || null,
			program: value("program"),
			mode: tab === "admission" ? value("mode") || null : null,
			scholarship_type: tab === "scholarship" ? value("scholarshipType") || null : null,
			topic: tab === "inquiry" ? value("topic") || null : null,
			message: value("message") || null
		};
		const parsed = applicationSchema.safeParse(payload);
		if (!parsed.success) {
			toast.error("Please check your details", { description: parsed.error.issues[0]?.message ?? "Some fields are invalid." });
			return;
		}
		setSubmitting(true);
		const { error } = await supabase.from("admissions_applications").insert(parsed.data);
		setSubmitting(false);
		if (error) {
			const duplicate = typeof error.message === "string" && error.message.includes("duplicate_application");
			toast.error(duplicate ? "Already submitted" : "Submission failed", { description: duplicate ? "We already received this form for the same program in the last 24 hours. Our team will contact you soon." : "Something went wrong. Please try again in a moment." });
			return;
		}
		setSubmitted(tab);
		toast.success("Submitted successfully", { description: "Our team will contact you within 24 hours." });
		form.reset();
	};
	const active = TABS.find((t) => t.id === tab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Admissions",
			title: "Start your journey with",
			highlight: "SkillStack",
			subtitle: "Apply for admission, request a scholarship, or ask us about any program."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "tablist",
					"aria-label": "Admissions forms",
					className: "mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3",
					children: TABS.map((t) => {
						const Icon = t.icon;
						const isActive = t.id === tab;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							role: "tab",
							id: `tab-${t.id}`,
							"aria-selected": isActive,
							"aria-controls": `panel-${t.id}`,
							onClick: () => {
								setTab(t.id);
								setSubmitted(null);
							},
							className: `flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 ${isActive ? "border-[var(--gold)]/60 bg-[var(--gold)]/10 text-[var(--gold)]" : "border-white/10 bg-[var(--color-surface-card)]/50 text-[var(--color-text-secondary)] hover:border-[var(--gold)]/30 hover:text-white"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0" }), t.label]
						}, t.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2",
					children: [{
						img: "/images/homepage/Google%20form.png",
						alt: "QR code linking to the SkillStack admission application form",
						label: "Application Form",
						text: "Scan to open the application form on your phone."
					}, {
						img: "/images/homepage/watsapp.png",
						alt: "QR code to message the SkillStack admissions team on WhatsApp",
						label: "Talk to Admissions",
						text: "Scan to message our admissions team on WhatsApp."
					}].map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-2xl border border-white/10 bg-[var(--color-surface-card)]/50 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: q.img,
								alt: q.alt,
								width: 96,
								height: 96,
								loading: "lazy",
								decoding: "async",
								className: "h-full w-full object-contain"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold text-white",
							children: q.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-[var(--color-text-secondary)]",
							children: q.text
						})] })]
					}, q.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: slideUp,
					initial: "hidden",
					animate: "visible",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						strong: true,
						className: "p-6 md:p-10",
						role: "tabpanel",
						id: `panel-${tab}`,
						"aria-labelledby": `tab-${tab}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold text-white md:text-3xl",
								children: active.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[var(--color-text-secondary)]",
								children: active.blurb
							}),
							submitted === tab ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-col items-center gap-4 rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-8 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10 text-[var(--gold)]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl font-semibold text-white",
										children: "Thank you!"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[var(--color-text-secondary)]",
										children: [
											"Your ",
											active.label.toLowerCase(),
											" has been received. Our team will reach out within 24 hours."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSubmitted(null),
										className: "min-h-11 text-sm font-semibold text-[var(--gold)] underline-offset-4 hover:underline",
										children: "Submit another response"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit,
								className: "mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "fullName",
										label: "Full name",
										placeholder: "Your full name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "email",
										label: "Email",
										type: "email",
										placeholder: "you@example.com"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "phone",
										label: "Phone number",
										type: "tel",
										placeholder: "+92 3XX XXXXXXX"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "city",
										label: "City",
										placeholder: "Rawalpindi"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "program",
										label: "Program of interest",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "program",
											name: "program",
											required: true,
											className: inputClass,
											defaultValue: "",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													disabled: true,
													children: "Select a program"
												}),
												PROGRAMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: p.slug,
													children: p.title
												}, p.slug)),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "other",
													children: "Other / Not sure yet"
												})
											]
										})
									}),
									tab === "admission" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "mode",
										label: "Preferred mode",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "mode",
											name: "mode",
											required: true,
											className: inputClass,
											defaultValue: "physical",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "physical",
												children: "Physical (Rawalpindi campus)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "online",
												children: "Online"
											})]
										})
									}),
									tab === "scholarship" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "scholarshipType",
										label: "Scholarship type",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "scholarshipType",
											name: "scholarshipType",
											required: true,
											className: inputClass,
											defaultValue: "need",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "need",
												children: "Need based"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "merit",
												children: "Merit based"
											})]
										})
									}),
									tab === "inquiry" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "topic",
										label: "Inquiry about",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "topic",
											name: "topic",
											required: true,
											className: inputClass,
											defaultValue: "fees",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "fees",
													children: "Fees & payment plans"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "schedule",
													children: "Class schedule"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "curriculum",
													children: "Curriculum details"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "other",
													children: "Something else"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "sm:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											id: "message",
											label: tab === "scholarship" ? "Why do you need this scholarship?" : tab === "inquiry" ? "Your question" : "Anything we should know?",
											required: tab !== "admission",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												id: "message",
												name: "message",
												rows: 5,
												required: tab !== "admission",
												placeholder: "Tell us a little more…",
												className: inputClass
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
											type: "submit",
											className: "w-full sm:w-auto",
											disabled: submitting,
											children: submitting ? "Submitting…" : `Submit ${active.label.replace(" Form", "")}`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-xs text-[var(--color-text-muted)]",
											children: "By submitting you agree to be contacted by the SkillStack admissions team."
										})]
									})
								]
							})
						]
					})
				}, tab)
			]
		}) })]
	});
}
var SplitComponent = AdmissionsPage;
//#endregion
export { SplitComponent as component };
