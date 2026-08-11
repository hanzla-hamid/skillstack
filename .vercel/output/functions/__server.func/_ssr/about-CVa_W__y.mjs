import "./rolldown-runtime-D7D4PA-g.mjs";
import { n as GoldButton, r as Link$1 } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { a as Users, k as MessageCircle, p as Target, t as Zap, tt as Drama } from "../_libs/lucide-react.mjs";
import { c as STATS } from "./constants-MbwHFMBp.mjs";
import { n as Navbar, t as Footer } from "./Footer-DbW1t8FN.mjs";
import { a as staggerContainer, i as slideUp, n as SectionWrapper, t as SectionHeading } from "./SectionComponents-tAUCJcK6.mjs";
import { t as PageHero } from "./PageHero-OT7eUp5v.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var CEO_PHOTO = "/images/about/WhatsApp_8_3_2026_1_08_25_AM.png";
var DEV_PHOTO = "/images/about/WhatsApp_Image_2026-07-05_at_12.23.15_AM.jpeg";
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				eyebrow: "Our Story",
				title: "About",
				highlight: "SkillStack",
				subtitle: "We are redefining education in Pakistan by bridging the gap between theoretical knowledge and practical industry skills."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
				className: "pt-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					strong: true,
					className: "border-[var(--gold)]/30 text-center py-16 relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[var(--gold)]/5 blur-[100px] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h3, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						className: "text-2xl md:text-4xl font-display font-medium leading-relaxed max-w-4xl mx-auto relative z-10",
						children: "\"Our mission is to help students transform practical skills into successful careers through project-based learning and expert mentorship.\""
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
				className: "bg-white/[0.02]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: staggerContainer,
						initial: "hidden",
						whileInView: "visible",
						viewport: { once: true },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
								align: "left",
								title: "The Genesis of",
								highlight: "SkillStack"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6 text-[var(--color-text-secondary)] text-lg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
										variants: slideUp,
										children: "Founded in 2025 in Rawalpindi, SkillStack emerged from a simple observation: traditional education leaves students unprepared for the modern job market."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
										variants: slideUp,
										children: "As an initiative of The Prudents, we built a hybrid learning academy that combines the focus of physical classrooms with the scale of digital resources. We believe that true mastery comes not from memorization, but from building."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
										variants: slideUp,
										children: "Today, we offer intensive, project-driven programs in Web Development, Graphic Design, Digital Marketing, and E-Commerce—designed to take you from learning to earning."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								variants: slideUp,
								className: "mt-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/courses",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, { children: "View Our Programs" })
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-[600px] rounded-3xl overflow-hidden glass-card flex items-center justify-center border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-texture-fine opacity-50" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--gold)]/20 blur-[80px]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-8xl font-bold font-display opacity-10",
									children: "2025"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[var(--gold)] font-medium mt-2 tracking-widest uppercase",
									children: "Est. Rawalpindi"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionWrapper, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Our Core",
				highlight: "Values",
				subtitle: "The principles that guide our educational approach."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-8",
				children: [
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-8 h-8" }),
						title: "Excellence",
						desc: "We demand high standards in code, design, and strategy. Good enough is never good enough."
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-8 h-8" }),
						title: "Community",
						desc: "Learning is a multiplayer game. We foster collaboration, peer review, and network building."
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-8 h-8" }),
						title: "Innovation",
						desc: "We teach tomorrow's tools today, keeping our curriculum constantly updated with industry trends."
					}
				].map((val, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					hover: true,
					className: "text-center flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)] mb-6",
							children: val.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2xl font-display font-semibold mb-4",
							children: val.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--color-text-secondary)]",
							children: val.desc
						})
					]
				}, idx))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
				className: "bg-white/[0.02]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 md:grid-cols-4 gap-8",
					children: STATS.map((stat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-5xl md:text-6xl font-display font-bold gold-gradient-text mb-2",
							children: [stat.value, stat.suffix]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[var(--color-text-secondary)] font-medium tracking-wide uppercase text-sm",
							children: stat.label
						})]
					}, idx))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionWrapper, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Meet the",
				highlight: "Team",
				subtitle: "The people behind SkillStack, dedicated to transforming education in Pakistan."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					strong: true,
					className: "p-8 md:p-10 border-[var(--gold)]/20 relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -right-20 w-64 h-64 bg-[var(--gold)]/10 blur-[80px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-36 h-36 shrink-0 rounded-full border-4 border-[var(--gold)]/30 overflow-hidden bg-white/5 mb-6 shadow-glow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: CEO_PHOTO,
									alt: "Mr. Shujja — Founder & CEO",
									className: "w-full h-full object-cover object-center"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[var(--gold)] text-sm font-bold tracking-wider uppercase mb-2",
								children: "Founder & CEO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl md:text-3xl font-display font-bold mb-1",
								children: "Mr. Shujja"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--color-text-muted)] mb-4 uppercase tracking-widest",
								children: "The Prudents"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[var(--color-text-secondary)] text-base mb-6 leading-relaxed italic",
								children: "\"I started SkillStack because I saw incredible potential in our youth being wasted on outdated curricula. We are building the academy I wish I had when I started my career.\""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-3 flex-wrap justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://wa.me/923245700090",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--gold)]/30 text-white hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 hover:text-[var(--gold-light)] transition-all duration-300 text-sm font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4 h-4" }), " WhatsApp"]
								})
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					strong: true,
					className: "p-8 md:p-10 border-[var(--gold)]/20 relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -right-20 w-64 h-64 bg-[var(--gold)]/10 blur-[80px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-36 h-36 shrink-0 rounded-full border-4 border-[var(--gold)]/30 overflow-hidden bg-white/5 mb-6 shadow-glow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: DEV_PHOTO,
									alt: "Hanzla Hamid — Lead Developer",
									className: "w-full h-full object-cover object-top"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[var(--gold)] text-sm font-bold tracking-wider uppercase mb-2",
								children: "Lead Developer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl md:text-3xl font-display font-bold mb-1",
								children: "Hanzla Hamid"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--color-text-muted)] mb-4 uppercase tracking-widest",
								children: "Full Stack Engineer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[var(--color-text-secondary)] text-base mb-6 leading-relaxed italic",
								children: "\"Building SkillStack from the ground up has been an incredible journey. I'm proud to craft the technology that powers our students' success.\""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 flex-wrap justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://www.instagram.com/hanzlahamid63/",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--gold)]/30 text-white hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 hover:text-[var(--gold-light)] transition-all duration-300 text-sm font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drama, { className: "w-4 h-4" }), " @hanzlahamid63"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://wa.me/923419293971",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--gold)]/30 text-white hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 hover:text-[var(--gold-light)] transition-all duration-300 text-sm font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4 h-4" }), " WhatsApp"]
								})]
							})
						]
					})]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = AboutPage;
//#endregion
export { SplitComponent as component };
