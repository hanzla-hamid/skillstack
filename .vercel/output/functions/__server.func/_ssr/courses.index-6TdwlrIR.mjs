import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { i as OutlineButton, n as GoldButton, r as Link$1 } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { D as MonitorPlay, Et as ArrowRight, bt as BookOpen, t as Zap, ut as CirclePlay, v as Search, z as Laptop } from "../_libs/lucide-react.mjs";
import { o as PROGRAMS } from "./constants-MbwHFMBp.mjs";
import { n as Navbar, t as Footer } from "./Footer-DbW1t8FN.mjs";
import { n as SectionWrapper } from "./SectionComponents-tAUCJcK6.mjs";
import { t as PageHero } from "./PageHero-OT7eUp5v.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses.index-6TdwlrIR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var iconMap = [
	MonitorPlay,
	BookOpen,
	Zap,
	Laptop
];
/** Local program imagery (public/images/homepage) */
var COURSE_IMAGES = {
	"web-development": "/images/homepage/webdevelopment.png",
	"graphic-designing": "/images/homepage/graphics.jpg",
	"digital-marketing": "/images/homepage/digitalmarketing.jpg",
	"e-commerce": "/images/homepage/ecommerce.jpg"
};
function CoursesPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("All");
	const filteredPrograms = PROGRAMS.filter((p) => {
		const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
		const matchCat = categoryFilter === "All" || p.category === categoryFilter;
		return matchSearch && matchCat;
	});
	const physicalCourses = filteredPrograms.filter((p) => p.category === "Physical");
	const onlineCourses = filteredPrograms.filter((p) => p.category === "Online");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				eyebrow: "All Courses",
				title: "Explore Our",
				highlight: "Premium Programs",
				subtitle: "Discover industry-aligned courses designed to build your portfolio and career."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionWrapper, {
				className: "pt-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative rounded-3xl overflow-hidden glass-strong border-[var(--gold)]/20 p-8 md:p-12 mb-16 flex flex-col md:flex-row gap-8 items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--gold)]/5 blur-[100px] pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 relative z-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-3 py-1 bg-[var(--gold)]/10 border border-[var(--gold)]/20 rounded-full text-[var(--gold)] text-xs font-bold uppercase tracking-wider mb-4 inline-block",
										children: "Featured Program"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-3xl md:text-5xl font-display font-bold text-white mb-4",
										children: "Web Development Masterclass"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[var(--color-text-secondary)] text-lg mb-6 max-w-xl",
										children: "Master full-stack development with modern frameworks (React, Next.js, Node.js), real-world projects, and production-grade code."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-6 mb-8",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white/50 text-xs uppercase tracking-wider",
													children: "Duration"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-white",
													children: "6 Months"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white/50 text-xs uppercase tracking-wider",
													children: "Projects"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-white",
													children: "12+ Real Projects"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white/50 text-xs uppercase tracking-wider",
													children: "Level"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-white",
													children: "Beginner to Pro"
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
											href: "/courses/web-development",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, { children: "View Curriculum" })
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full md:w-1/3 aspect-square max-w-sm shrink-0 relative z-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full h-full rounded-2xl bg-gradient-to-br from-black to-zinc-900 border border-white/10 p-6 flex flex-col relative overflow-hidden shadow-2xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/20 blur-[50px]" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-white/50 mb-6",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-red-500" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-yellow-500" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-green-500" })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4 font-mono text-sm text-[var(--gold)]/70",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-blue-400",
														children: "const"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-yellow-200",
														children: "career"
													}),
													" =",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-purple-400",
														children: "new"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-green-400",
														children: "Developer"
													}),
													"();"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-yellow-200",
														children: "career"
													}),
													".",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-blue-300",
														children: "learn"
													}),
													"(",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-orange-300",
														children: "\"React\""
													}),
													");"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-yellow-200",
														children: "career"
													}),
													".",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-blue-300",
														children: "build"
													}),
													"(",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-orange-300",
														children: "\"Portfolio\""
													}),
													");"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-green-400 mt-4",
													children: "// Success!"
												})
											]
										})
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row justify-between items-center gap-4 mb-12 bg-black/40 p-4 rounded-2xl border border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full md:w-96",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search courses...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)] transition-colors"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0",
							children: [
								"All",
								"Physical",
								"Online"
							].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setCategoryFilter(cat),
								className: `px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${categoryFilter === cat ? "bg-[var(--gold)] text-black" : "bg-white/5 text-white/70 hover:bg-white/10"}`,
								children: [cat, " Courses"]
							}, cat))
						})]
					}),
					(categoryFilter === "All" || categoryFilter === "Physical") && physicalCourses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-2xl font-display font-bold text-white mb-8 flex items-center gap-3",
							children: [
								"Physical Academy",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-normal text-[var(--color-text-secondary)]",
									children: [
										"(",
										physicalCourses.length,
										")"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-6",
							children: physicalCourses.map((program, idx) => {
								const Icon = iconMap[idx % iconMap.length];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
									hover: true,
									className: "group relative overflow-hidden flex flex-col",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/5 blur-[50px] group-hover:bg-[var(--gold)]/10 transition-colors duration-500 rounded-bl-full" }),
										COURSE_IMAGES[program.slug] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative z-10 mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: COURSE_IMAGES[program.slug],
												alt: `${program.title} program at SkillStack`,
												loading: "lazy",
												decoding: "async",
												className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-start mb-6 relative z-10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-14 h-14 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] group-hover:scale-110 transition-transform duration-500",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-7 h-7" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-right",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1",
													children: "Duration"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "inline-block px-3 py-1 bg-white/5 text-white text-xs font-semibold rounded-full border border-white/10",
													children: program.duration
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-2xl font-display font-bold text-white mb-3 group-hover:text-[var(--gold)] transition-colors relative z-10",
											children: program.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[var(--color-text-secondary)] mb-5 relative z-10",
											children: program.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2 mb-6 relative z-10",
											children: program.features?.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70",
												children: f
											}, f))
										}),
										program.curriculum && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-6 space-y-2 relative z-10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs uppercase tracking-wider text-white/40",
												children: "Curriculum"
											}), program.curriculum.map((mod, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-3 items-start text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-5 h-5 shrink-0 mt-0.5 rounded-md bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold)] text-[10px] font-bold flex items-center justify-center",
													children: i + 1
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-white/80",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-white",
														children: mod.module
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-white/50",
														children: [" — ", mod.topics.join(", ")]
													})]
												})]
											}, mod.module))]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-3 gap-3 mb-6 relative z-10",
											children: [
												{
													label: "Duration",
													value: program.duration
												},
												{
													label: "Projects",
													value: program.projects
												},
												{
													label: "Level",
													value: program.difficulty
												}
											].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl bg-black/30 border border-white/5 px-3 py-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] uppercase tracking-wider text-white/40",
													children: m.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-sm font-medium text-white",
													children: m.value
												})]
											}, m.label))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-6 border-t border-white/10 flex items-center justify-between mt-auto relative z-10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-white/60",
												children: "On-campus • Rawalpindi"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
												href: `/courses/${program.slug}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineButton, {
													className: "px-6 py-2 h-auto text-sm",
													children: "Course Details"
												})
											})]
										})
									]
								}, program.slug);
							})
						})]
					}),
					(categoryFilter === "All" || categoryFilter === "Online") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-2xl font-display font-bold text-white flex items-center gap-3",
								children: ["Online Platform", onlineCourses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-normal text-[var(--color-text-secondary)]",
									children: [
										"(",
										onlineCourses.length,
										")"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/library",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OutlineButton, {
									className: "px-6 py-2 h-auto text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "w-4 h-4" }), " Open video library"]
								})
							})]
						}),
						onlineCourses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10",
							children: onlineCourses.map((program) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/library",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "h-full bg-[var(--color-surface-card)] border border-white/5 hover:border-[var(--gold)]/30 rounded-2xl p-6 relative overflow-hidden group transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] mb-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "w-5 h-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display font-bold text-lg text-white mb-2 group-hover:text-[var(--gold)] transition-colors",
											children: program.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4",
											children: program.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-medium text-white/60",
											children: program.duration
										})
									]
								})
							}, program.slug))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							strong: true,
							className: "p-8 md:p-10 border-[var(--gold)]/20 relative overflow-hidden flex flex-col md:flex-row items-center gap-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 -right-24 w-72 h-72 bg-[var(--gold)]/10 blur-[90px] pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 relative z-10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-2xl md:text-3xl font-display font-bold text-white mb-3",
										children: "Learn online, on your schedule"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[var(--color-text-secondary)] max-w-xl",
										children: "Every recorded lesson from our physical classrooms lands in the video library — stream full modules, rewatch anything, and follow along with the same projects."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative z-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										href: "/library",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GoldButton, { children: ["Watch lessons ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })] })
									})
								})
							]
						})
					] }),
					filteredPrograms.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-20 glass-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-bold text-white mb-2",
								children: "No courses found"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[var(--color-text-secondary)]",
								children: "Try adjusting your search or filters."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setSearch("");
									setCategoryFilter("All");
								},
								className: "mt-4 text-[var(--gold)] hover:underline",
								children: "Clear all filters"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = CoursesPage;
//#endregion
export { SplitComponent as component };
