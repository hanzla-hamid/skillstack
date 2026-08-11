import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { d as supabase, l as useToast, n as GoldButton, o as useAuth, r as Link$1, s as useLocation } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { F as LogOut, L as LayoutDashboard, bt as BookOpen, l as Trophy, m as SquareCheckBig, nt as Download, o as User, q as Flame, ut as CirclePlay, wt as Award, xt as BookMarked } from "../_libs/lucide-react.mjs";
import { t as NotificationsMenu } from "./NotificationsMenu-TUt9LWZL.mjs";
import { t as Logo } from "./Logo-D4HGjyX7.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DashboardPage-CGVAtS14.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const [location, setLocation] = useLocation();
	const { user, profile, loading, signOut } = useAuth();
	const currentTab = location.replace("/dashboard", "") || "/";
	const [enrollments, setEnrollments] = (0, import_react.useState)([]);
	const [certificates, setCertificates] = (0, import_react.useState)([]);
	const [dataLoading, setDataLoading] = (0, import_react.useState)(true);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [savingProfile, setSavingProfile] = (0, import_react.useState)(false);
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		if (!loading && !user) setLocation("/login");
	}, [
		loading,
		user,
		setLocation
	]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		setFullName(profile?.full_name || "");
		setUsername(profile?.username || "");
		setBio(profile?.bio || "");
	}, [user, profile]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		(async () => {
			setDataLoading(true);
			const [{ data: enrollData }, { data: certData }] = await Promise.all([supabase.from("enrollments").select("*, course:courses(*)").eq("user_id", user.id), supabase.from("certificates").select("*, course:courses(*)").eq("user_id", user.id)]);
			setEnrollments(enrollData || []);
			setCertificates(certData || []);
			setDataLoading(false);
		})();
	}, [user]);
	const handleSignOut = async () => {
		await signOut();
		setLocation("/");
	};
	const handleSaveProfile = async (e) => {
		e.preventDefault();
		if (!user) return;
		setSavingProfile(true);
		const { error } = await supabase.from("profiles").update({
			full_name: fullName,
			username,
			bio,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", user.id);
		if (error) toast({
			title: "Update failed",
			description: error.message,
			variant: "destructive"
		});
		else toast({
			title: "Profile updated",
			description: "Your changes have been saved."
		});
		setSavingProfile(false);
	};
	const handleUpdateProgress = async (enrollmentId, progress) => {
		const status = progress >= 100 ? "completed" : "active";
		const completedAt = progress >= 100 ? (/* @__PURE__ */ new Date()).toISOString() : null;
		const { error } = await supabase.from("enrollments").update({
			progress,
			status,
			completed_at: completedAt
		}).eq("id", enrollmentId);
		if (error) {
			toast({
				title: "Update failed",
				description: error.message,
				variant: "destructive"
			});
			return;
		}
		setEnrollments((prev) => prev.map((e) => e.id === enrollmentId ? {
			...e,
			progress,
			status,
			completed_at: completedAt
		} : e));
		if (progress >= 100) toast({
			title: "Course completed!",
			description: "You earned a certificate."
		});
	};
	if (loading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[var(--color-bg)] flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-10 h-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-white/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" })]
		})
	});
	const displayName = profile?.full_name || user.email || "Student";
	const initials = displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
	const xp = profile?.xp || 0;
	const level = Math.floor(xp / 100) + 1;
	const levelName = level === 1 ? "Novice" : level === 2 ? "Apprentice" : level === 3 ? "Adept" : level >= 4 ? "Expert" : "Master";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[var(--color-bg)] flex flex-col md:flex-row font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "w-full md:w-64 bg-black border-r border-white/5 flex flex-col shrink-0 md:h-screen md:sticky md:top-0 z-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 border-b border-white/5 flex items-center justify-between md:justify-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { scrolled: true })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-bold text-white/30 uppercase tracking-widest px-4 mb-2",
						children: "Menu"
					}), [
						{
							label: "Overview",
							href: "/",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "w-5 h-5" })
						},
						{
							label: "My Courses",
							href: "/courses",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-5 h-5" })
						},
						{
							label: "Certificates",
							href: "/certificates",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-5 h-5" })
						},
						{
							label: "Assignments",
							href: "/assignments",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "w-5 h-5" })
						},
						{
							label: "Profile",
							href: "/profile",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5" })
						}
					].map((item) => {
						const isActive = currentTab === item.href || item.href !== "/" && currentTab.startsWith(item.href);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							href: "/dashboard" + (item.href === "/" ? "" : item.href),
							className: isActive ? "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20 shadow-glow-sm" : "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white",
							children: [item.icon, item.label]
						}, item.href);
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-t border-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-4 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-700 flex items-center justify-center text-black font-bold text-lg",
							children: initials
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-bold text-white truncate",
								children: displayName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-[var(--gold)]",
								children: [
									"Level ",
									level,
									" ",
									levelName
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSignOut,
						className: "flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4" }), "Sign Out"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 flex flex-col min-w-0 md:max-h-screen md:overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "h-20 border-b border-white/5 bg-[var(--color-surface)]/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl sm:text-2xl font-display font-bold text-white capitalize",
					children: currentTab === "/" ? "Dashboard Overview" : currentTab.replace("/", "")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsMenu, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-4 h-4 text-orange-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold text-white",
							children: xp
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 sm:p-8",
				children: [
					currentTab === "/" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewTab, {
						displayName,
						xp,
						enrollments,
						certificates,
						loading: dataLoading
					}),
					currentTab === "/certificates" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificatesTab, {
						certificates,
						loading: dataLoading
					}),
					currentTab === "/assignments" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignmentsTab, {}),
					currentTab === "/profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileTab, {
						fullName,
						username,
						bio,
						email: user.email || "",
						initials,
						setFullName,
						setUsername,
						setBio,
						onSave: handleSaveProfile,
						saving: savingProfile
					}),
					currentTab === "/courses" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoursesTab, {
						enrollments,
						loading: dataLoading,
						onUpdateProgress: handleUpdateProgress
					})
				]
			})]
		})]
	});
}
var cardVariants = {
	hidden: {
		opacity: 0,
		y: 20
	},
	visible: (i) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * .1,
			duration: .4,
			ease: "easeOut"
		}
	})
};
var OverviewTab = ({ displayName, xp, enrollments, certificates, loading }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 max-w-6xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .5,
					ease: "easeOut"
				},
				className: "relative rounded-2xl overflow-hidden bg-gradient-to-r from-black via-zinc-900 to-black border border-[var(--gold)]/20 p-6 sm:p-8 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-64 h-64 bg-[var(--gold)]/10 blur-[80px] pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-xl sm:text-2xl font-bold text-white mb-1",
							children: [
								"Welcome back, ",
								displayName.split(" ")[0],
								"!"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--color-text-secondary)] text-sm sm:text-base",
							children: "Ready to continue your learning journey?"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex items-center gap-4 sm:gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs sm:text-sm text-[var(--gold)] font-bold uppercase tracking-wider mb-1",
								children: "Total XP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-3xl sm:text-4xl font-display font-bold text-white",
								children: xp
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[var(--gold)]/30 flex items-center justify-center text-2xl",
							children: "🎯"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "w-6 h-6" }),
						count: loading ? "..." : enrollments.filter((e) => e.status === "active").length,
						label: "Active Courses",
						bg: "bg-blue-500/10",
						text: "text-blue-400"
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-6 h-6" }),
						count: loading ? "..." : certificates.length,
						label: "Certificates",
						bg: "bg-[var(--gold)]/10",
						text: "text-[var(--gold)]"
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "w-6 h-6" }),
						count: loading ? "..." : enrollments.length,
						label: "Total Enrolled",
						bg: "bg-purple-500/10",
						text: "text-purple-400"
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-6 h-6" }),
						count: loading ? "..." : enrollments.filter((e) => e.status === "completed").length,
						label: "Completed",
						bg: "bg-green-500/10",
						text: "text-green-400"
					}
				].map((card, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					custom: i,
					variants: cardVariants,
					initial: "hidden",
					animate: "visible",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						className: "p-4 sm:p-5 flex items-center gap-3 sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 sm:w-12 sm:h-12 rounded-xl " + card.bg + " " + card.text + " flex items-center justify-center shrink-0",
							children: card.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl sm:text-2xl font-bold text-white",
								children: card.count
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-[var(--color-text-secondary)] truncate",
								children: card.label
							})]
						})]
					})
				}, i))
			}),
			enrollments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xl font-bold text-white mb-4",
				children: "Your Courses"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: enrollments.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-bold text-white",
								children: e.course?.title || "Unknown Course"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: e.status === "completed" ? "px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400" : "px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400",
								children: e.status === "completed" ? "Completed" : "Active"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full bg-white/5 rounded-full h-2 mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-[var(--gold)] h-2 rounded-full transition-all",
								style: { width: e.progress + "%" }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-white/50",
							children: [e.progress, "% complete"]
						})
					]
				}, e.id))
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				strong: true,
				className: "py-16 text-center border-dashed border-2 border-white/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-10 h-10 text-white/20" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold text-white mb-2",
						children: "No active courses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--color-text-secondary)] mb-6 max-w-sm mx-auto",
						children: "You haven't enrolled in any courses yet. Browse our premium programs to start learning."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: "/courses",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, { children: "Browse Courses" })
					})
				]
			})
		]
	});
};
var CertificatesTab = ({ certificates, loading }) => {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-8 h-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-white/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" })]
		})
	});
	if (certificates.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-4xl mx-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			strong: true,
			className: "py-20 text-center border-dashed border-2 border-white/10 relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--gold)]/5 blur-[80px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 bg-[var(--gold)]/10 border border-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--gold)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-10 h-10" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl font-bold text-white mb-2",
						children: "No certificates yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto",
						children: "Complete a course to earn your first verifiable certificate from SkillStack."
					})
				]
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl mx-auto space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-xl font-bold text-white mb-4",
			children: "Your Certificates"
		}), certificates.map((cert) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			className: "p-6 flex items-center justify-between border-[var(--gold)]/20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-14 h-14 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-7 h-7" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-bold text-white text-lg",
						children: cert.course?.title || "Course"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-white/50",
						children: ["Certificate #", cert.certificate_number]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-white/40",
						children: ["Issued on ", new Date(cert.issued_at).toLocaleDateString()]
					})
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4" }), "Download"]
			})]
		}, cert.id))]
	});
};
var AssignmentsTab = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "max-w-4xl mx-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
		strong: true,
		className: "py-20 text-center border-dashed border-2 border-white/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "w-10 h-10 text-white/20" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xl font-bold text-white mb-2",
				children: "All caught up!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[var(--color-text-secondary)]",
				children: "You have no pending assignments at the moment."
			})
		]
	})
});
var CoursesTab = ({ enrollments, loading, onUpdateProgress }) => {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-8 h-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-white/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" })]
		})
	});
	if (enrollments.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-4xl mx-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			strong: true,
			className: "py-16 text-center border-dashed border-2 border-white/10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-10 h-10 text-white/20" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl font-bold text-white mb-2",
					children: "No enrolled courses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[var(--color-text-secondary)] mb-6",
					children: "Browse our programs and enroll to start learning."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
					href: "/courses",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, { children: "Browse Courses" })
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl mx-auto space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-xl font-bold text-white mb-4",
			children: "My Courses"
		}), enrollments.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			className: "p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-bold text-white text-lg",
						children: e.course?.title || "Unknown"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-white/50",
						children: [
							e.course?.duration,
							" · ",
							e.course?.difficulty
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: e.status === "completed" ? "px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400" : "px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400",
						children: e.status === "completed" ? "Completed" : "Active"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white/60",
							children: "Progress"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-white font-bold",
							children: [e.progress, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full bg-white/5 rounded-full h-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-[var(--gold)] h-3 rounded-full transition-all",
							style: { width: e.progress + "%" }
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: "0",
						max: "100",
						value: e.progress,
						onChange: (ev) => onUpdateProgress(e.id, parseInt(ev.target.value)),
						className: "flex-1 accent-[var(--gold)]",
						"aria-label": "Progress for " + (e.course?.title || "course")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-white/60 w-12 text-right",
						children: [e.progress, "%"]
					})]
				})
			]
		}, e.id))]
	});
};
var ProfileTab = ({ fullName, username, bio, email, initials, setFullName, setUsername, setBio, onSave, saving }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "max-w-3xl mx-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
		className: "p-6 sm:p-8 border-[var(--gold)]/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-6 mb-10 pb-8 border-b border-white/10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-700 flex items-center justify-center text-black font-bold text-2xl sm:text-3xl shrink-0",
				children: initials
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl font-bold text-white mb-1 truncate",
					children: fullName || "Student"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[var(--color-text-secondary)] text-sm truncate",
					children: email
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-6",
			onSubmit: onSave,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "profile-name",
							className: "text-sm font-medium text-white/60",
							children: "Full Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "profile-name",
							type: "text",
							value: fullName,
							onChange: (e) => setFullName(e.target.value),
							className: "w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors outline-none"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "profile-username",
							className: "text-sm font-medium text-white/60",
							children: "Username"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "profile-username",
							type: "text",
							value: username,
							onChange: (e) => setUsername(e.target.value),
							className: "w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors outline-none"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "profile-email",
						className: "text-sm font-medium text-white/60",
						children: "Email (read-only)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "profile-email",
						type: "email",
						disabled: true,
						value: email,
						className: "w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-white/40 outline-none cursor-not-allowed"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "profile-bio",
						className: "text-sm font-medium text-white/60",
						children: "Bio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "profile-bio",
						rows: 4,
						value: bio,
						onChange: (e) => setBio(e.target.value),
						className: "w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors outline-none resize-none",
						placeholder: "Tell us about yourself..."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pt-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
						type: "submit",
						disabled: saving,
						children: saving ? "Saving..." : "Save Changes"
					})
				})
			]
		})]
	})
});
//#endregion
export { DashboardPage as t };
