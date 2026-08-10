import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { i as OutlineButton, n as GoldButton, o as useAuth, r as Link$1 } from "./router-CotFlDs_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { I as Lock, T as Palette, bt as BookOpen, c as Upload, gt as ChartLine, h as Sparkles, i as Video, j as Megaphone, r as X, ut as CirclePlay, vt as Briefcase, w as PenTool, yt as BrainCircuit } from "../_libs/lucide-react.mjs";
import { i as LIBRARY_RESOURCES } from "./constants-MbwHFMBp.mjs";
import { n as Navbar, t as Footer } from "./Footer-CqtL07fW.mjs";
import { a as staggerContainer, i as slideUp, n as SectionWrapper } from "./SectionComponents-tAUCJcK6.mjs";
import { t as PageHero } from "./PageHero-CqVMVuWW.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
import { n as fetchVideos, r as getVideoUrl } from "./videos-BF72UZra.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-C-98-_1o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getIconForCategory = (title) => {
	if (title.includes("Python")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-6 h-6" });
	if (title.includes("Video") || title.includes("CapCut")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "w-6 h-6" });
	if (title.includes("Intelligence") || title.includes("Prompt")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "w-6 h-6" });
	if (title.includes("Excel")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "w-6 h-6" });
	if (title.includes("Content")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, { className: "w-6 h-6" });
	if (title.includes("Freelancing")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-6 h-6" });
	if (title.includes("Social")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "w-6 h-6" });
	if (title.includes("Canva")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "w-6 h-6" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-6 h-6" });
};
function LibraryPage() {
	const { user, profile, isAdmin } = useAuth();
	const [videos, setVideos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [active, setActive] = (0, import_react.useState)(null);
	const [activeUrl, setActiveUrl] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("All");
	(0, import_react.useEffect)(() => {
		fetchVideos().then((v) => {
			setVideos(v);
			setLoading(false);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!active) {
			setActiveUrl(null);
			return;
		}
		let cancelled = false;
		getVideoUrl(active.video_path).then((url) => {
			if (!cancelled) setActiveUrl(url);
		});
		return () => {
			cancelled = true;
		};
	}, [active]);
	const categories = (0, import_react.useMemo)(() => ["All", ...Array.from(new Set(videos.map((v) => v.category)))], [videos]);
	const shown = filter === "All" ? videos : videos.filter((v) => v.category === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				eyebrow: "Online Courses",
				title: "Video",
				highlight: "Library",
				subtitle: "Watch full lessons on demand. New recordings are added by our instructors as each module is delivered."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionWrapper, {
				className: "pt-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-2xl font-display font-bold text-white flex items-center gap-3",
							children: ["Video Lessons", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-normal text-[var(--color-text-secondary)]",
								children: [
									"(",
									loading ? "…" : videos.length,
									")"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 overflow-x-auto pb-1",
							children: [categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setFilter(cat),
								className: `px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${filter === cat ? "bg-[var(--gold)] text-black" : "bg-white/5 text-white/70 hover:bg-white/10"}`,
								children: cat
							}, cat)), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/admin/videos",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OutlineButton, {
									className: "px-4 py-2 h-auto text-sm whitespace-nowrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4" }), " Upload"]
								})
							})]
						})]
					}),
					loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20",
						children: [
							0,
							1,
							2
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 rounded-2xl bg-white/[0.03] border border-white/5 animate-pulse" }, i))
					}) : shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						className: "text-center py-16 mb-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] mx-auto mb-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "w-7 h-7" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-display font-bold text-white mb-2",
								children: "No lessons published yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[var(--color-text-secondary)] max-w-md mx-auto",
								children: "Recordings appear here as soon as an instructor uploads them."
							}),
							isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/admin/videos",
								className: "inline-block mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, { children: "Upload the first lesson" })
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: staggerContainer,
						initial: "hidden",
						animate: "visible",
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20",
						children: shown.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: slideUp,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
								hover: true,
								className: "h-full flex flex-col overflow-hidden group p-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => user && setActive(video),
									className: "relative aspect-video w-full bg-black overflow-hidden text-left",
									children: [
										video.thumbnail_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: video.thumbnail_url,
											alt: video.title,
											className: "w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-14 h-14 rounded-full bg-black/60 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] group-hover:scale-110 transition-transform",
												children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "w-7 h-7" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-6 h-6" })
											})
										}),
										video.duration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-[11px] text-white/80 font-medium",
											children: video.duration
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 flex flex-col flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-[var(--gold)] tracking-wider uppercase mb-2",
											children: video.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-display font-semibold text-white mb-2",
											children: video.title
										}),
										video.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[var(--color-text-secondary)] text-sm flex-1",
											children: video.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-5",
											children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setActive(video),
												className: "text-sm font-medium text-[var(--gold)] hover:underline flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "w-4 h-4" }), " Watch lesson"]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
												href: "/login",
												className: "text-sm font-medium text-white/60 hover:text-white flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4" }), " Sign in to watch"]
											})
										})
									]
								})]
							})
						}, video.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-display font-bold text-white mb-8",
						children: "Self-Paced Tracks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: staggerContainer,
						initial: "hidden",
						animate: "visible",
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: LIBRARY_RESOURCES.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: slideUp,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
								hover: true,
								className: "h-full flex flex-col relative overflow-hidden group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-[var(--gold)]/10 border border-[var(--gold)]/20 rounded-full text-[var(--gold)]",
										children: [item.lessons, " lessons"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] mb-6 group-hover:scale-110 transition-transform",
										children: getIconForCategory(item.title)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mb-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-[var(--gold)] tracking-wider uppercase",
											children: item.category
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-display font-semibold mb-3 group-hover:text-[var(--gold)] transition-colors",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[var(--color-text-secondary)] text-sm mb-6 flex-1",
										children: item.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-auto flex items-center justify-between text-xs text-white/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.duration }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.difficulty })]
									})
								]
							})
						}, idx))
					})
				]
			}),
			active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4",
				onClick: () => setActive(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-4xl",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-display font-bold text-white",
							children: active.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActive(null),
							className: "text-white/60 hover:text-white p-2",
							"aria-label": "Close video",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/10",
						children: activeUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							src: activeUrl,
							controls: true,
							autoPlay: true,
							className: "w-full h-full"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full h-full flex items-center justify-center text-white/50 text-sm",
							children: "Loading video…"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = LibraryPage;
//#endregion
export { SplitComponent as component };
