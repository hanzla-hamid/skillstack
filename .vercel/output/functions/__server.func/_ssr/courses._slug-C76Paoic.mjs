import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { c as useRoute, d as supabase, i as OutlineButton, l as useToast, n as GoldButton, o as useAuth, r as Link$1, s as useLocation } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { X as FileCodeCorner, at as Clock, dt as CircleCheck, ht as ChartNoAxesColumnIncreasing, pt as ChevronDown, vt as Briefcase, wt as Award } from "../_libs/lucide-react.mjs";
import { o as PROGRAMS } from "./constants-MbwHFMBp.mjs";
import { n as Navbar, t as Footer } from "./Footer-DbW1t8FN.mjs";
import { n as SectionWrapper } from "./SectionComponents-tAUCJcK6.mjs";
import { t as PageHero } from "./PageHero-OT7eUp5v.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses._slug-C76Paoic.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Local program imagery (public/images/homepage) */
var COURSE_IMAGES = {
	"web-development": "/images/homepage/webdevelopment.png",
	"graphic-designing": "/images/homepage/graphics.jpg",
	"digital-marketing": "/images/homepage/digitalmarketing.jpg",
	"e-commerce": "/images/homepage/ecommerce.jpg"
};
function CourseDetailPage() {
	const [, params] = useRoute("/courses/:slug");
	const [, setLocation] = useLocation();
	const { user } = useAuth();
	const { toast } = useToast();
	const [course, setCourse] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [openModule, setOpenModule] = (0, import_react.useState)(0);
	const [enrolled, setEnrolled] = (0, import_react.useState)(false);
	const [enrolling, setEnrolling] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!params?.slug) return;
		(async () => {
			setLoading(true);
			const { data } = await supabase.from("courses").select("*").eq("slug", params.slug).maybeSingle();
			if (data) {
				setCourse(data);
				if (user) {
					const { data: enrollment } = await supabase.from("enrollments").select("id").eq("user_id", user.id).eq("course_id", data.id).maybeSingle();
					setEnrolled(!!enrollment);
				}
			} else {
				const fallback = PROGRAMS.find((p) => p.slug === params.slug);
				if (fallback) setCourse({
					id: "static-" + fallback.slug,
					slug: fallback.slug,
					title: fallback.title,
					description: fallback.description,
					duration: fallback.duration,
					difficulty: fallback.difficulty,
					projects: fallback.projects,
					category: fallback.category,
					status: fallback.status,
					features: fallback.features,
					curriculum: fallback.curriculum,
					created_at: ""
				});
			}
			setLoading(false);
		})();
	}, [params?.slug, user]);
	const handleEnroll = async () => {
		if (!user) {
			setLocation("/register");
			return;
		}
		if (!course) return;
		setEnrolling(true);
		const { error } = await supabase.from("enrollments").insert({
			user_id: user.id,
			course_id: course.id
		});
		if (error) {
			if (error.code === "23505") {
				setEnrolled(true);
				toast({
					title: "Already enrolled",
					description: "You are already enrolled in this course."
				});
			} else toast({
				title: "Enrollment failed",
				description: error.message,
				variant: "destructive"
			});
		} else {
			setEnrolled(true);
			toast({
				title: "Enrolled successfully!",
				description: `You have enrolled in ${course.title}.`
			});
		}
		setEnrolling(false);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-white/40",
					children: "Loading course..."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	if (!course) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col items-center justify-center p-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-6xl font-display font-bold mb-4",
						children: "404"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xl text-[var(--color-text-secondary)] mb-8",
						children: "Course not found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: "/courses",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, { children: "Browse All Courses" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				eyebrow: `${course.category} Program`,
				title: course.title,
				subtitle: course.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
				className: "pt-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-8 space-y-12",
						children: [
							COURSE_IMAGES[course.slug] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[16/8] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: COURSE_IMAGES[course.slug],
									alt: `${course.title} — SkillStack program`,
									width: 1280,
									height: 640,
									className: "w-full h-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
										className: "p-4 text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-6 h-6 text-[var(--gold)] mx-auto mb-2" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1",
												children: "Duration"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-white",
												children: course.duration
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
										className: "p-4 text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumnIncreasing, { className: "w-6 h-6 text-[var(--gold)] mx-auto mb-2" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1",
												children: "Level"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-white",
												children: course.difficulty
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
										className: "p-4 text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCodeCorner, { className: "w-6 h-6 text-[var(--gold)] mx-auto mb-2" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1",
												children: "Projects"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-white",
												children: course.projects
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
										className: "p-4 text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-6 h-6 text-[var(--gold)] mx-auto mb-2" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1",
												children: "Certificate"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-white",
												children: "Included"
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-display font-bold text-white mb-6",
								children: "What You'll Learn"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: course.features.map((feature, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3 bg-[var(--color-surface-card)] p-4 rounded-xl border border-white/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5 text-[var(--gold)] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white/90 font-medium",
										children: feature
									})]
								}, idx))
							})] }),
							course.curriculum && course.curriculum.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-display font-bold text-white mb-6",
								children: "Curriculum Outline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: course.curriculum.map((mod, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
									className: `p-0 overflow-hidden transition-colors ${openModule === idx ? "border-[var(--gold)]/30" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "w-full p-6 flex items-center justify-between text-left",
										onClick: () => setOpenModule(openModule === idx ? -1 : idx),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-2xl font-bold text-white/10 font-display w-8",
												children: ["0", idx + 1]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `font-semibold text-lg ${openModule === idx ? "text-[var(--gold)]" : "text-white"}`,
												children: mod.module
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `w-5 h-5 transition-transform duration-300 ${openModule === idx ? "rotate-180 text-[var(--gold)]" : "text-white/50"}` })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `px-6 overflow-hidden transition-all duration-300 ${openModule === idx ? "max-h-[2000px] pb-6 opacity-100" : "max-h-0 opacity-0"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pl-12 space-y-3",
											children: mod.topics.map((topic, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 text-[var(--color-text-secondary)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-[var(--gold)]/50" }), topic]
											}, i))
										})
									})]
								}, idx))
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-4 relative",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sticky top-32",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
								strong: true,
								className: "p-8 border-[var(--gold)]/20 shadow-2xl relative overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/10 blur-[50px]" }),
									course.category === "Online" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-display font-bold text-white mb-2",
											children: "Watch on demand"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[var(--color-text-secondary)] text-sm mb-6",
											children: "Stream every recorded lesson for this track in our online video library."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
											href: "/library",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
												className: "w-full",
												children: "Open Video Library"
											})
										})
									] }) : enrolled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-display font-bold text-white mb-2",
											children: "You're Enrolled!"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[var(--color-text-secondary)] text-sm mb-6",
											children: "Access this course from your dashboard and start learning."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
											href: "/dashboard/courses",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
												className: "w-full",
												children: "Go to My Courses"
											})
										})
									] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-display font-bold text-white mb-2",
											children: "Enrollment Open"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[var(--color-text-secondary)] text-sm mb-6",
											children: "Next batch starts soon. Limited seats available."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4 mb-8",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between py-3 border-b border-white/10",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-white/60 text-sm",
														children: "Format"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-white",
														children: "Physical Classes"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between py-3 border-b border-white/10",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-white/60 text-sm",
														children: "Location"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-white",
														children: "Rawalpindi Campus"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between py-3 border-b border-white/10",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-white/60 text-sm",
														children: "Schedule"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-white",
														children: "3 Days / Week"
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
												className: "w-full",
												onClick: handleEnroll,
												disabled: enrolling,
												children: enrolling ? "Enrolling..." : user ? "Enroll Now" : "Sign Up to Enroll"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineButton, {
												className: "w-full bg-white/5",
												children: "Download Syllabus"
											})]
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-center text-xs text-white/40 mt-4 flex items-center justify-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-3.5 h-3.5" }), " Career support included"]
									})
								]
							})
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = CourseDetailPage;
//#endregion
export { SplitComponent as component };
