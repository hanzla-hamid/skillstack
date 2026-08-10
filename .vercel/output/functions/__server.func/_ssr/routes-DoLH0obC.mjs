import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { i as OutlineButton, n as GoldButton, r as Link$1, t as DynamicBackground } from "./router-CotFlDs_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { B as Instagram, D as MonitorPlay, Et as ArrowRight, G as Globe, K as FolderOpen, M as MapPin, R as Layers, Tt as ArrowUpRight, U as Hammer, W as GraduationCap, Y as FileText, Z as Facebook, a as Users, bt as BookOpen, k as MessageCircle, mt as Check, rt as Compass, t as Zap, ut as CirclePlay, vt as Briefcase, x as Plus, z as Laptop } from "../_libs/lucide-react.mjs";
import { a as PARTNERS, n as FAQS, o as PROGRAMS, s as QUICK_ACCESS, t as BRAND } from "./constants-MbwHFMBp.mjs";
import { n as Navbar, r as ParticleCanvas, t as Footer } from "./Footer-CqtL07fW.mjs";
import { a as staggerContainer, i as slideUp, n as SectionWrapper, o as staggerItem, r as TrustBadge, t as SectionHeading } from "./SectionComponents-tAUCJcK6.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
import { t as QRCodeSVG } from "../_libs/qrcode.react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DoLH0obC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Official partners only. Each card renders a real logo when `logo` is set in
* constants, otherwise an elegant typographic mark — never an empty box.
*/
var PartnersSection = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8 flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-xl font-bold text-white",
			children: "Our Partners"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		variants: staggerContainer,
		initial: "hidden",
		whileInView: "visible",
		viewport: {
			once: true,
			margin: "-80px"
		},
		className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
		children: PARTNERS.map((partner) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			variants: slideUp,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
				href: partner.href,
				className: "group flex h-full min-h-[13rem] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[var(--color-surface-card)]/60 p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-card-hover focus-visible:-translate-y-1 focus-visible:border-[var(--gold)]/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-[var(--gold)]/25 bg-[var(--gold)]/5 transition-colors duration-300 group-hover:border-[var(--gold)]/50",
					children: partner.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: partner.logo,
						alt: `${partner.name} logo`,
						loading: "lazy",
						decoding: "async",
						className: "h-14 w-14 object-contain",
						style: "whiten" in partner && partner.whiten ? { filter: "brightness(0) invert(1)" } : void 0
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gold-gradient-text font-display text-2xl font-bold tracking-widest",
						children: partner.initials
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[var(--gold)]",
						children: partner.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-widest text-[var(--color-text-muted)]",
						children: partner.description
					})]
				})]
			})
		}, partner.name))
	})] });
};
var ICONS = {
	whatsapp: MessageCircle,
	admission: FileText,
	facebook: Facebook,
	instagram: Instagram,
	location: MapPin
};
/** Canonical origin used so the codes resolve on any phone that scans them. */
var SITE_ORIGIN = "";
/** Three primary QR actions — the first two use official printed codes, the last is generated. */
var QR_ACTIONS = [
	{
		id: "whatsapp",
		label: "Talk to SkillStack",
		caption: "WhatsApp",
		helper: "Scan to message our admissions team",
		href: BRAND.social.whatsapp,
		image: "/images/homepage/watsapp.png",
		external: true,
		icon: MessageCircle
	},
	{
		id: "apply",
		label: "Apply / Enroll",
		caption: "Application form",
		helper: "Scan to start your application",
		href: "/admissions",
		image: "/images/homepage/Google%20form.png",
		external: false,
		icon: FileText
	},
	{
		id: "website",
		label: "Visit SkillStack",
		caption: "Website",
		helper: "Scan to open skillstack on your phone",
		href: "/",
		image: "/images/homepage/website.png",
		external: false,
		icon: Globe
	}
];
var SECONDARY = QUICK_ACCESS.filter((item) => [
	"facebook",
	"instagram",
	"location"
].includes(item.id));
var QuickAccessSection = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionWrapper, {
		id: "quick-access",
		className: "relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute left-1/2 top-0 h-64 w-full max-w-3xl -translate-x-1/2 bg-[var(--gold)]/5 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Scan & Connect",
				title: "Point your camera,",
				highlight: "reach us instantly",
				subtitle: "Three ways to reach SkillStack — scan on a phone, or tap any card."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: staggerContainer,
				initial: "hidden",
				whileInView: "visible",
				viewport: {
					once: true,
					margin: "-80px"
				},
				className: "relative grid grid-cols-1 gap-6 md:grid-cols-3",
				children: QR_ACTIONS.map((item) => {
					const Icon = item.icon;
					const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }),
								" ",
								item.caption
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid w-full place-items-center rounded-2xl bg-white p-5 shadow-card sm:p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid aspect-square w-full max-w-[13rem] place-items-center",
								children: item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: `${item.label} QR code`,
									loading: "lazy",
									decoding: "async",
									className: "h-full w-full object-contain"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QRCodeSVG, {
									value: item.scanValue ?? SITE_ORIGIN,
									level: "M",
									marginSize: 2,
									bgColor: "#ffffff",
									fgColor: "#0a0a0a",
									title: `${item.label} QR code`,
									className: "h-full w-full"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[var(--gold)]",
								children: item.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm text-[var(--color-text-secondary)]",
								children: item.helper
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-auto inline-flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-semibold text-[var(--gold)]",
							children: [
								"Or tap to open",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
							]
						})
					] });
					const className = "group flex h-full flex-col items-start gap-6 rounded-3xl border border-white/10 bg-[var(--color-surface-card)]/70 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-card-hover focus-visible:-translate-y-1 sm:p-8";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: slideUp,
						className: "h-full",
						children: item.external ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							target: "_blank",
							rel: "noopener noreferrer",
							className,
							"aria-label": item.label,
							children: inner
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							href: item.href,
							className,
							"aria-label": item.label,
							children: inner
						})
					}, item.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3",
				children: SECONDARY.map((item) => {
					const Icon = ICONS[item.id] ?? Globe;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: item.href,
						target: item.external ? "_blank" : void 0,
						rel: item.external ? "noopener noreferrer" : void 0,
						className: "group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors duration-300 hover:border-[var(--gold)]/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--gold)]/25 bg-[var(--gold)]/10 text-[var(--gold)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-semibold text-white transition-colors group-hover:text-[var(--gold)]",
									children: item.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-xs text-[var(--color-text-secondary)]",
									children: item.description
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-auto h-4 w-4 shrink-0 text-[var(--gold)]" })
						]
					}, item.id);
				})
			})
		]
	});
};
var COURSE_IMAGES = {
	"web-development": "/images/homepage/webdevelopment.png",
	"graphic-designing": "/images/homepage/graphics.jpg",
	"digital-marketing": "/images/homepage/digitalmarketing.jpg",
	"e-commerce": "/images/homepage/ecommerce.jpg"
};
var PROGRAM_ICONS = [
	MonitorPlay,
	BookOpen,
	Zap,
	Laptop
];
/** Editorial benefit pillars — descriptive only, no statistics or claims. */
var PILLARS = [
	{
		title: "Practical before theoretical",
		description: "Every module starts with something you make. Concepts are introduced where they are needed, not memorised in advance."
	},
	{
		title: "Project-based by design",
		description: "Each program is structured around deliverables — a site, an identity system, a campaign, a store — that stay yours afterwards."
	},
	{
		title: "A curriculum with a spine",
		description: "Modules build on each other in a fixed sequence, so nothing is skipped and nothing is repeated without reason."
	},
	{
		title: "Guided, not automated",
		description: "Mentors review your work in person at the Rawalpindi campus and tell you what to change and why."
	}
];
/** Five-stage journey. Outcomes are described as directions, never guarantees. */
var JOURNEY = [
	{
		step: "01",
		title: "Discover",
		icon: Compass,
		description: "Compare programs, sit in on the curriculum, and pick the track that matches where you want to work."
	},
	{
		step: "02",
		title: "Learn",
		icon: GraduationCap,
		description: "Follow a structured, sequenced curriculum with mentors who review your work as you go."
	},
	{
		step: "03",
		title: "Build",
		icon: Hammer,
		description: "Apply each module to a real deliverable instead of an exercise you throw away afterwards."
	},
	{
		step: "04",
		title: "Showcase",
		icon: FolderOpen,
		description: "Finish with a portfolio you can send to anyone, plus a certificate with a verification ID."
	},
	{
		step: "05",
		title: "Career",
		icon: Briefcase,
		description: "Take it toward freelancing, employment or your own venture, with guidance on how to present your work."
	}
];
function HomePage() {
	const [openFaq, setOpenFaq] = (0, import_react.useState)(0);
	const physicalPrograms = PROGRAMS.filter((p) => p.category === "Physical");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[var(--color-bg)] flex flex-col font-sans overflow-x-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative flex min-h-[100dvh] items-center overflow-hidden border-b border-white/5 pb-16 pt-28 lg:pt-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicBackground, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleCanvas, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-texture-fine radial-fade opacity-30 z-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: staggerContainer,
							initial: "hidden",
							animate: "visible",
							className: "flex flex-col items-start text-left lg:col-span-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									variants: slideUp,
									className: "mb-8 inline-flex",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-2 backdrop-blur-md",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "relative flex h-2 w-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-[var(--gold)]" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold uppercase tracking-wide text-[var(--gold)]",
											children: "Applications Now Open"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
									variants: slideUp,
									className: "mb-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl xl:text-[5rem]",
									children: [
										"Skill",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "gold-gradient-text",
											children: "Stack"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "mt-4 block text-3xl leading-[1.15] text-white sm:text-4xl lg:text-5xl",
											children: [
												"From Learning",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden sm:block" }),
												" to",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "gold-gradient-text",
													children: "Earning."
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									variants: slideUp,
									className: "mb-10 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]",
									children: "A premium hybrid learning academy in Rawalpindi. Web Development, Graphic Design, Digital Marketing and E-Commerce — taught through real projects and in-person mentorship."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									variants: slideUp,
									className: "mb-12 flex w-full flex-wrap items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										href: "/admissions",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
											className: "w-full sm:w-auto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-2 whitespace-nowrap",
												children: ["Apply Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5" })]
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										href: "/courses",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineButton, {
											className: "w-full sm:w-auto",
											children: "Explore Programs"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									variants: staggerContainer,
									className: "flex flex-wrap gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
											label: "Rawalpindi Campus"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-4 w-4" }),
											label: "Project-Based Curriculum"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
											label: "In-Person Mentorship"
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								x: 50
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: {
								duration: 1,
								delay: .2,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "hidden lg:col-span-5 lg:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mx-auto w-full max-w-[36rem] pb-16",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-square w-full [perspective:1200px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-[10%] animate-glow-pulse rounded-full bg-[var(--gold)]/10 blur-[100px]" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 aspect-square w-full -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-[var(--gold)]/20" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-[var(--gold)]/15 [animation-direction:reverse]" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											animate: {
												rotateY: [
													-12,
													12,
													-12
												],
												rotateX: [
													6,
													-6,
													6
												],
												y: [
													0,
													-14,
													0
												]
											},
											transition: {
												duration: 12,
												repeat: Infinity,
												ease: "easeInOut"
											},
											className: "absolute inset-0 [transform-style:preserve-3d]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: "/logo.png",
													alt: "",
													"aria-hidden": true,
													className: "absolute left-1/2 top-1/2 h-full w-full object-contain opacity-25 blur-[2px] [transform:translate(-50%,-50%)_translateZ(-40px)_scale(1.2)]"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: "/logo.png",
													alt: "",
													"aria-hidden": true,
													className: "absolute left-1/2 top-1/2 h-full w-full object-contain opacity-40 blur-[1px] [transform:translate(-50%,-50%)_translateZ(-20px)_scale(1.17)]"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: "/logo.png",
													alt: "SkillStack",
													className: "absolute left-1/2 top-1/2 h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(234,179,8,0.4)] [transform:translate(-50%,-50%)_translateZ(40px)_scale(1.15)]"
												})
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute bottom-0 left-1/2 block -translate-x-1/2 whitespace-nowrap text-center font-display text-4xl font-bold tracking-tight xl:text-5xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white",
										children: "Skill"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[var(--gold)]",
										children: "Stack"
									})]
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-60 md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-widest text-[var(--gold)]",
							children: "Scroll"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-6 items-start justify-center rounded-full border border-[var(--gold)] p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								animate: { y: [
									0,
									12,
									0
								] },
								transition: {
									repeat: Infinity,
									duration: 1.5,
									ease: "easeInOut"
								},
								className: "h-1.5 w-1.5 rounded-full bg-[var(--gold)]"
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionWrapper, {
				id: "programs",
				className: "relative overflow-hidden bg-[var(--color-surface)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)]/5 blur-[120px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-4 inline-block rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-[var(--gold)]",
								children: "Programs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-3xl font-bold leading-tight md:text-5xl lg:text-6xl",
								children: [
									"Four tracks.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "gold-gradient-text",
										children: "One way of teaching."
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg text-[var(--color-text-secondary)] lg:col-span-5",
							children: "Each program runs on campus, follows a fixed module sequence, and ends with work you can show — not a transcript you have to explain."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-6 md:grid-cols-2",
						children: physicalPrograms.map((program, idx) => {
							const Icon = PROGRAM_ICONS[idx % PROGRAM_ICONS.length];
							const wide = idx % 3 === 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								variants: staggerItem,
								className: wide ? "md:col-span-2" : "",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: `/courses/${program.slug}`,
									className: "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[var(--color-surface-card)]/70 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-card-hover",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: wide ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `relative overflow-hidden ${wide ? "h-56 md:h-full md:min-h-[20rem]" : "h-48 sm:h-56"}`,
											children: [
												COURSE_IMAGES[program.slug] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: COURSE_IMAGES[program.slug],
													alt: `${program.title} at SkillStack`,
													loading: "lazy",
													decoding: "async",
													className: "h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 bg-gradient-to-t from-[var(--color-surface-card)] via-black/40 to-transparent ${wide ? "md:bg-gradient-to-r" : ""}` }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl border border-[var(--gold)]/25 bg-black/50 text-[var(--gold)] backdrop-blur-md",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-1 flex-col p-6 md:p-8",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mb-4 flex flex-wrap items-center gap-2 text-xs",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/10 px-3 py-1 font-semibold text-[var(--gold)]",
															children: program.duration
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70",
															children: program.difficulty
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70",
															children: program.projects
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mb-3 font-display text-2xl font-bold text-white transition-colors group-hover:text-[var(--gold)] md:text-3xl",
													children: program.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mb-6 text-[var(--color-text-secondary)]",
													children: program.description
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
													className: "mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2",
													children: program.features.map((feat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex items-center gap-2 text-sm text-white/75",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 shrink-0 text-[var(--gold)]" }), feat]
													}, feat))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mt-auto inline-flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-semibold text-[var(--gold)]",
													children: ["View curriculum", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
												})
											]
										})]
									})
								})
							}, program.slug);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
				id: "why",
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:sticky lg:top-28",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-5 inline-block rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-[var(--gold)]",
									children: "Why SkillStack"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mb-6 font-display text-3xl font-bold leading-tight md:text-5xl",
									children: [
										"Built around the work,",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "gold-gradient-text",
											children: "not the lecture."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mb-10 text-lg leading-relaxed text-[var(--color-text-secondary)]",
									children: [BRAND.name, " is a physical academy first. What you learn is decided by what the work actually requires, and every module is checked against something you have built."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: COURSE_IMAGES["web-development"],
											alt: "Web development work at the SkillStack campus",
											loading: "lazy",
											decoding: "async",
											className: "h-full w-full object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative mt-8 aspect-[4/5] overflow-hidden rounded-2xl border border-white/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: COURSE_IMAGES["graphic-designing"],
											alt: "Design work produced in the SkillStack graphic design program",
											loading: "lazy",
											decoding: "async",
											className: "h-full w-full object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" })]
									})]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "divide-y divide-white/10 border-y border-white/10",
							children: PILLARS.map((pillar, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
								variants: staggerItem,
								className: "group flex gap-6 py-8 md:gap-10 md:py-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-3xl font-bold text-white/15 transition-colors duration-500 group-hover:text-[var(--gold)]/60 md:text-4xl",
									children: ["0", idx + 1]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-3 font-display text-xl font-bold text-white md:text-2xl",
									children: pillar.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-xl leading-relaxed text-[var(--color-text-secondary)]",
									children: pillar.description
								})] })]
							}, pillar.title))
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionWrapper, {
				id: "journey",
				className: "relative overflow-hidden border-y border-white/5 bg-[var(--color-surface)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "The Journey",
						title: "How your journey",
						highlight: "unfolds",
						subtitle: "Five stages, in order. Where it leads is up to the work you produce along the way."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[1.75rem] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--gold)]/0 via-[var(--gold)]/30 to-[var(--gold)]/0 lg:left-0 lg:right-0 lg:top-[3.5rem] lg:bottom-auto lg:h-px lg:w-full lg:bg-gradient-to-r" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: staggerContainer,
							initial: "hidden",
							whileInView: "visible",
							viewport: {
								once: true,
								margin: "-80px"
							},
							className: "relative grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-5",
							children: JOURNEY.map((stage, idx) => {
								const Icon = stage.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									variants: staggerItem,
									className: "group relative flex gap-6 lg:flex-col lg:gap-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative z-10 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-[var(--color-bg)] text-[var(--gold)] shadow-card transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-[var(--gold)]/60 group-hover:bg-[var(--gold)]/10 group-hover:shadow-glow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-[var(--gold)]/40 bg-[var(--color-bg)] font-display text-[0.65rem] font-bold text-[var(--gold)]",
												children: stage.step
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-500 group-hover:border-[var(--gold)]/25 group-hover:bg-white/[0.04] lg:mt-8 lg:min-h-[13rem]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-2 flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-[var(--gold)]",
												children: stage.title
											}), idx < JOURNEY.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 shrink-0 text-[var(--gold)]/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--gold)]" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm leading-relaxed text-[var(--color-text-secondary)]",
											children: stage.description
										})]
									})]
								}, stage.step);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-16 rounded-3xl border border-white/10 bg-[var(--color-bg)]/60 p-8 backdrop-blur-md md:p-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-2xl text-lg leading-relaxed text-white/85",
								children: "Stage five is not a promise. It is a direction — a portfolio, a certificate you can verify, and guidance on taking that into freelancing, a job, or your own venture."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/showcase",
								className: "shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OutlineButton, { children: ["See student work ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })] })
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionWrapper, {
				id: "academies",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Two Environments",
					title: "On campus, and",
					highlight: "self-paced online",
					subtitle: "The academy is where the programs run. The online library is open to everyone, right now."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						strong: true,
						className: "group relative overflow-hidden border-[var(--gold)]/20 p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-52 overflow-hidden sm:h-64",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: COURSE_IMAGES["digital-marketing"],
									alt: "Learning on campus at the SkillStack academy in Rawalpindi",
									loading: "lazy",
									decoding: "async",
									className: "h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[var(--color-surface-card)] via-black/40 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute bottom-5 left-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-black/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--gold)] backdrop-blur-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), " Rawalpindi"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-8 md:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-4 font-display text-3xl font-bold text-white",
									children: "Physical Academy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-8 text-lg text-[var(--color-text-secondary)]",
									children: "Immersive, in-person learning with direct mentorship and a room built for focus."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mb-10 space-y-4",
									children: [
										"Dedicated lab access",
										"Face-to-face mentor support",
										"Collaborative peer environment",
										"Scheduled, structured sessions"
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-3 text-white/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--gold)]/20 text-[var(--gold)]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" })
										}), item]
									}, item))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/contact",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineButton, {
										className: "w-full sm:w-auto",
										children: "Book a campus visit"
									})
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						className: "group relative overflow-hidden p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-52 overflow-hidden sm:h-64",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: COURSE_IMAGES["e-commerce"],
									alt: "Self-paced online learning resources from SkillStack",
									loading: "lazy",
									decoding: "async",
									className: "h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[var(--color-surface-card)] via-black/50 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute bottom-5 left-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-3.5 w-3.5" }), " Open now"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-8 md:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-4 font-display text-3xl font-bold text-white",
									children: "Online Library"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-8 text-lg text-[var(--color-text-secondary)]",
									children: "Self-paced resources across programming, design, marketing and freelancing — free to browse and use at your own pace."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mb-10 space-y-4",
									children: [
										"Self-paced learning tracks",
										"Knowledge hub articles and guides",
										"Downloadable resources",
										"Open to everyone, no batch required"
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-3 text-white/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-white/70",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" })
										}), item]
									}, item))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										href: "/library",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
											className: "w-full sm:w-auto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-2 whitespace-nowrap",
												children: ["Browse the library ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5" })]
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										href: "/knowledge",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineButton, {
											className: "w-full sm:w-auto",
											children: "Knowledge Hub"
										})
									})]
								})
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAccessSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
				id: "partners",
				className: "border-y border-white/5 bg-[var(--color-surface)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnersSection, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
				id: "faq",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:sticky lg:top-28",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mb-5 font-display text-3xl font-bold leading-tight md:text-5xl",
									children: ["Got ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "gold-gradient-text",
										children: "questions?"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-8 text-lg text-[var(--color-text-secondary)]",
									children: "The essentials about programs, duration and requirements. Anything else, ask us directly."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/faq",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OutlineButton, { children: ["All FAQs ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })] })
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4 lg:col-span-8",
						children: FAQS.map((faq, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `glass-card overflow-hidden transition-all duration-300 ${openFaq === idx ? "border-[var(--gold)]/40 bg-white/[0.04]" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex w-full items-center justify-between px-6 py-5 text-left",
								onClick: () => setOpenFaq(openFaq === idx ? null : idx),
								"aria-expanded": openFaq === idx,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `pr-4 font-semibold transition-colors ${openFaq === idx ? "text-[var(--gold)]" : "text-white"}`,
									children: faq.question
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${openFaq === idx ? "rotate-45 bg-[var(--gold)]/20 text-[var(--gold)]" : "bg-white/5 text-white/50"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `overflow-hidden px-6 transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-56 pb-5 opacity-100" : "max-h-0 opacity-0"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "leading-relaxed text-[var(--color-text-secondary)]",
									children: faq.answer
								})
							})]
						}, faq.question))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "enroll",
				className: "relative flex flex-col items-center justify-center overflow-hidden border-t border-white/5 px-6 py-32 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicBackground, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleCanvas, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute left-1/2 top-1/2 h-72 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-[var(--gold)]/10 blur-[120px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
							margin: "-80px"
						},
						transition: {
							duration: .8,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "relative z-10 mx-auto flex max-w-4xl flex-col items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-10 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mb-6 font-display text-4xl font-bold leading-[1.1] md:text-6xl lg:text-7xl",
								children: [
									"Learn something",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "gold-gradient-text",
										children: "you can use."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-12 max-w-2xl text-lg text-[var(--color-text-secondary)] md:text-xl",
								children: "Applications for the next campus batch are open. Class sizes are kept small so every student gets reviewed work, not just attendance."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex w-full flex-col gap-4 sm:w-auto sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/admissions",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
										className: "w-full px-10 py-5 text-lg sm:w-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2 whitespace-nowrap",
											children: ["Apply Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5" })]
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/contact",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineButton, {
										className: "w-full px-10 py-5 text-lg sm:w-auto",
										children: "Talk to Admissions"
									})
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = HomePage;
//#endregion
export { SplitComponent as component };
