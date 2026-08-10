import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { d as supabase, i as OutlineButton, l as useToast, n as GoldButton, o as useAuth, r as Link$1, s as useLocation } from "./router-CotFlDs_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { $ as EyeOff, F as LogOut, J as Film, L as LayoutDashboard, N as Mail, Q as Eye, _ as Settings, a as Users, bt as BookOpen, ft as CircleCheckBig, it as CloudUpload, ot as ClipboardList, s as UserCheck, st as CircleX, u as Trash2, v as Search, wt as Award } from "../_libs/lucide-react.mjs";
import { o as PROGRAMS } from "./constants-MbwHFMBp.mjs";
import { t as Logo } from "./Logo-Do6YLRpC.mjs";
import { t as GlassCard } from "./GlassCard-SzpZpfvg.mjs";
import { n as fetchVideos, t as VIDEO_BUCKET } from "./videos-BF72UZra.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminPage-dZVx1po0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminVideos({ userId }) {
	const { toast } = useToast();
	const [videos, setVideos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [progressLabel, setProgressLabel] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("General");
	const [courseSlug, setCourseSlug] = (0, import_react.useState)("");
	const [duration, setDuration] = (0, import_react.useState)("");
	const [file, setFile] = (0, import_react.useState)(null);
	const fileRef = (0, import_react.useRef)(null);
	const load = () => fetchVideos().then((v) => {
		setVideos(v);
		setLoading(false);
	});
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const reset = () => {
		setTitle("");
		setDescription("");
		setCategory("General");
		setCourseSlug("");
		setDuration("");
		setFile(null);
		if (fileRef.current) fileRef.current.value = "";
	};
	const handleUpload = async (e) => {
		e.preventDefault();
		if (!file || !title.trim()) {
			toast({
				title: "Missing details",
				description: "Add a title and pick a video file.",
				variant: "destructive"
			});
			return;
		}
		setUploading(true);
		setProgressLabel("Uploading video…");
		const ext = file.name.split(".").pop() || "mp4";
		const path = `${Date.now()}-${title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")}.${ext}`;
		const { error: upErr } = await supabase.storage.from(VIDEO_BUCKET).upload(path, file, {
			cacheControl: "3600",
			contentType: file.type || "video/mp4"
		});
		if (upErr) {
			setUploading(false);
			setProgressLabel("");
			toast({
				title: "Upload failed",
				description: upErr.message,
				variant: "destructive"
			});
			return;
		}
		setProgressLabel("Saving lesson…");
		const { error: dbErr } = await supabase.from("course_videos").insert({
			title: title.trim(),
			description: description.trim() || null,
			category,
			course_slug: courseSlug || null,
			video_path: path,
			duration: duration.trim() || null,
			is_published: true,
			created_by: userId ?? null
		});
		setUploading(false);
		setProgressLabel("");
		if (dbErr) {
			toast({
				title: "Could not save lesson",
				description: dbErr.message,
				variant: "destructive"
			});
			return;
		}
		toast({
			title: "Lesson published",
			description: `${title} is now in the video library.`
		});
		reset();
		load();
	};
	const togglePublish = async (video) => {
		const { error } = await supabase.from("course_videos").update({ is_published: !video.is_published }).eq("id", video.id);
		if (error) {
			toast({
				title: "Update failed",
				description: error.message,
				variant: "destructive"
			});
			return;
		}
		load();
	};
	const remove = async (video) => {
		await supabase.storage.from(VIDEO_BUCKET).remove([video.video_path]);
		const { error } = await supabase.from("course_videos").delete().eq("id", video.id);
		if (error) {
			toast({
				title: "Delete failed",
				description: error.message,
				variant: "destructive"
			});
			return;
		}
		toast({ title: "Lesson deleted" });
		load();
	};
	const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)] transition-colors";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			strong: true,
			className: "p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-11 h-11 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "w-5 h-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-display font-bold text-white",
					children: "Upload a lesson"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-[var(--color-text-secondary)]",
					children: "Published lessons appear instantly in the online video library."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleUpload,
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						placeholder: "Lesson title",
						value: title,
						onChange: (e) => setTitle(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						placeholder: "Duration (e.g. 42 min)",
						value: duration,
						onChange: (e) => setDuration(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputCls,
						placeholder: "Category (e.g. Web Development)",
						value: category,
						onChange: (e) => setCategory(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: inputCls,
						value: courseSlug,
						onChange: (e) => setCourseSlug(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							className: "bg-black",
							children: "Not linked to a course"
						}), PROGRAMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p.slug,
							className: "bg-black",
							children: p.title
						}, p.slug))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inputCls} md:col-span-2 min-h-[100px] resize-y`,
						placeholder: "Short description of what this lesson covers",
						value: description,
						onChange: (e) => setDescription(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "md:col-span-2 flex items-center justify-between gap-4 border border-dashed border-white/15 rounded-xl px-5 py-4 cursor-pointer hover:border-[var(--gold)]/40 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-white/70 truncate",
								children: file ? file.name : "Choose a video file (MP4, WebM, MOV)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-[var(--gold)] uppercase tracking-wider shrink-0",
								children: "Browse"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "video/*",
								className: "hidden",
								onChange: (e) => setFile(e.target.files?.[0] ?? null)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GoldButton, {
							type: "submit",
							disabled: uploading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "w-4 h-4" }), uploading ? progressLabel || "Uploading…" : "Publish lesson"]
						}), file && !uploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineButton, {
							type: "button",
							className: "px-5 py-2 h-auto text-sm",
							onClick: reset,
							children: "Clear"
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			className: "p-0 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 py-5 border-b border-white/10 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "w-5 h-5 text-[var(--gold)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-display font-bold text-white",
					children: [
						"Library (",
						loading ? "…" : videos.length,
						")"
					]
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6 space-y-3",
				children: [
					0,
					1,
					2
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 rounded-xl bg-white/[0.03] animate-pulse" }, i))
			}) : videos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-10 text-center text-[var(--color-text-secondary)]",
				children: "No lessons uploaded yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-white/5",
				children: videos.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-4 flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-white truncate",
								children: v.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-white/50",
								children: [
									v.category,
									v.duration ? ` • ${v.duration}` : "",
									v.is_published ? "" : " • Hidden"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => togglePublish(v),
							className: "p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10",
							title: v.is_published ? "Unpublish" : "Publish",
							children: v.is_published ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => remove(v),
							className: "p-2 rounded-lg text-red-400 hover:bg-red-400/10",
							title: "Delete",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
						})
					]
				}, v.id))
			})]
		})]
	});
}
function AdminPage() {
	const [location, setLocation] = useLocation();
	const { user, profile, isAdmin, loading } = useAuth();
	const { toast } = useToast();
	const currentTab = location.replace("/admin", "") || "/";
	const [users, setUsers] = (0, import_react.useState)([]);
	const [courses, setCourses] = (0, import_react.useState)([]);
	const [certificates, setCertificates] = (0, import_react.useState)([]);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [applications, setApplications] = (0, import_react.useState)([]);
	const [dataLoading, setDataLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!loading && (!user || !isAdmin)) setLocation("/dashboard");
	}, [
		loading,
		user,
		isAdmin,
		setLocation
	]);
	(0, import_react.useEffect)(() => {
		if (!user || !isAdmin) return;
		(async () => {
			setDataLoading(true);
			const [{ data: usersData }, { data: coursesData }, { data: certData }, { data: msgData }, { data: appData }] = await Promise.all([
				supabase.from("profiles").select("*").order("created_at", { ascending: false }),
				supabase.from("courses").select("*").order("created_at", { ascending: false }),
				supabase.from("certificates").select("*, course:courses(*), profile:profiles(*)").order("issued_at", { ascending: false }),
				supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
				supabase.from("admissions_applications").select("*").order("created_at", { ascending: false })
			]);
			setUsers(usersData || []);
			setCourses(coursesData || []);
			setCertificates(certData || []);
			setMessages(msgData || []);
			setApplications(appData || []);
			setDataLoading(false);
		})();
	}, [user, isAdmin]);
	const handleApplicationStatus = async (id, status) => {
		const { error } = await supabase.from("admissions_applications").update({
			status,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id);
		if (error) {
			toast({
				title: "Update failed",
				description: error.message,
				variant: "destructive"
			});
			return;
		}
		setApplications((prev) => prev.map((a) => a.id === id ? {
			...a,
			status
		} : a));
	};
	const handleDeleteApplication = async (id) => {
		const { error } = await supabase.from("admissions_applications").delete().eq("id", id);
		if (error) {
			toast({
				title: "Delete failed",
				description: error.message,
				variant: "destructive"
			});
			return;
		}
		setApplications((prev) => prev.filter((a) => a.id !== id));
		toast({ title: "Application deleted" });
	};
	const handleSignOut = async () => {
		await supabase.auth.signOut();
		setLocation("/");
	};
	const handleMarkMessageRead = async (id, isRead) => {
		const { error } = await supabase.from("contact_messages").update({ is_read: !isRead }).eq("id", id);
		if (error) {
			toast({
				title: "Update failed",
				description: error.message,
				variant: "destructive"
			});
			return;
		}
		setMessages((prev) => prev.map((m) => m.id === id ? {
			...m,
			is_read: !isRead
		} : m));
	};
	const handleDeleteMessage = async (id) => {
		const { error } = await supabase.from("contact_messages").delete().eq("id", id);
		if (error) {
			toast({
				title: "Delete failed",
				description: error.message,
				variant: "destructive"
			});
			return;
		}
		setMessages((prev) => prev.filter((m) => m.id !== id));
		toast({ title: "Message deleted" });
	};
	const handleToggleAdmin = async (userId, currentRole) => {
		const makeAdmin = currentRole !== "admin";
		const { error } = await supabase.rpc("set_admin", {
			_user_id: userId,
			_make_admin: makeAdmin
		});
		if (error) {
			toast({
				title: "Update failed",
				description: error.message,
				variant: "destructive"
			});
			return;
		}
		const newRole = makeAdmin ? "admin" : "student";
		setUsers((prev) => prev.map((u) => u.id === userId ? {
			...u,
			role: newRole
		} : u));
		toast({
			title: "User role updated",
			description: `User is now ${newRole}.`
		});
	};
	if (loading || !user || !isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[var(--color-bg)] flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-10 h-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-white/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" })]
		})
	});
	const filteredUsers = users.filter((u) => !search || u.full_name?.toLowerCase().includes(search.toLowerCase()) || u.username?.toLowerCase().includes(search.toLowerCase()));
	const filteredMessages = messages.filter((m) => !search || m.name?.toLowerCase().includes(search.toLowerCase()) || m.email?.toLowerCase().includes(search.toLowerCase()));
	const filteredApplications = applications.filter((a) => {
		if (!search) return true;
		const q = search.toLowerCase();
		return a.full_name?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) || a.program?.toLowerCase().includes(q);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[var(--color-bg)] flex flex-col md:flex-row font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "w-full md:w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col shrink-0 md:h-screen md:sticky md:top-0 z-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 border-b border-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { scrolled: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-widest px-1",
						children: "Admin Panel"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2",
					children: [
						{
							label: "Overview",
							href: "/",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "w-5 h-5" })
						},
						{
							label: "Users",
							href: "/users",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-5 h-5" })
						},
						{
							label: "Courses",
							href: "/courses",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-5 h-5" })
						},
						{
							label: "Certificates",
							href: "/certificates",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-5 h-5" })
						},
						{
							label: "Videos",
							href: "/videos",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "w-5 h-5" })
						},
						{
							label: "Messages",
							href: "/messages",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5" })
						},
						{
							label: "Admissions",
							href: "/admissions",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "w-5 h-5" })
						},
						{
							label: "Settings",
							href: "/settings",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-5 h-5" })
						}
					].map((item) => {
						const isActive = currentTab === item.href || item.href !== "/" && currentTab.startsWith(item.href);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							href: `/admin${item.href === "/" ? "" : item.href}`,
							className: `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive ? "bg-red-500/10 text-red-400 border border-red-500/20" : "text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white"}`,
							children: [item.icon, item.label]
						}, item.href);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-t border-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/dashboard",
						className: "flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "w-4 h-4" }), "User Dashboard"]
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
				className: "h-20 border-b border-white/5 bg-[var(--color-surface)]/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-display font-bold text-white capitalize",
					children: currentTab === "/" ? "System Overview" : currentTab.replace("/", "")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-64 hidden md:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-500/50"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-8 max-w-6xl mx-auto w-full",
				children: [
					currentTab === "/" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminOverview, {
						users,
						courses,
						certificates,
						messages,
						loading: dataLoading
					}),
					currentTab === "/users" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminUsers, {
						users: filteredUsers,
						loading: dataLoading,
						onToggleAdmin: handleToggleAdmin
					}),
					currentTab === "/courses" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCourses, {
						courses,
						loading: dataLoading
					}),
					currentTab === "/certificates" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCertificates, {
						certificates,
						loading: dataLoading
					}),
					currentTab === "/videos" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminVideos, { userId: user?.id }),
					currentTab === "/messages" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminMessages, {
						messages: filteredMessages,
						loading: dataLoading,
						onMarkRead: handleMarkMessageRead,
						onDelete: handleDeleteMessage
					}),
					currentTab === "/admissions" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminApplications, {
						applications: filteredApplications,
						loading: dataLoading,
						onStatus: handleApplicationStatus,
						onDelete: handleDeleteApplication
					}),
					currentTab === "/settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSettings, {
						applicationCount: applications.length,
						userCount: users.length
					})
				]
			})]
		})]
	});
}
var StatCard = ({ title, value, subtitle, icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
	className: "p-6",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-[var(--color-text-secondary)] text-sm font-medium",
				children: title
			}), icon]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-3xl font-display font-bold text-white mb-1",
			children: value
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-white/40",
			children: subtitle
		})
	]
});
var AdminOverview = ({ users, courses, certificates, messages, loading }) => {
	const recentUsers = users.slice(0, 5);
	const unreadMessages = messages.filter((m) => !m.is_read).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					title: "Total Users",
					value: loading ? "..." : String(users.length),
					subtitle: `${users.filter((u) => u.role === "admin").length} admins`,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-5 h-5 text-blue-400" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					title: "Active Courses",
					value: loading ? "..." : String(courses.length),
					subtitle: `${courses.filter((c) => c.status === "Available").length} available`,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-5 h-5 text-[var(--gold)]" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					title: "Certificates Issued",
					value: loading ? "..." : String(certificates.length),
					subtitle: "Total verified",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-5 h-5 text-green-400" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					title: "Unread Messages",
					value: loading ? "..." : String(unreadMessages),
					subtitle: `${messages.length} total`,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5 text-red-400" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			className: "p-0 border-white/10 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6 border-b border-white/10 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-bold text-white",
					children: "Recent Signups"
				})
			}), recentUsers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-12 text-center text-[var(--color-text-secondary)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-12 h-12 mx-auto mb-4 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No user data available." })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-white/5",
				children: recentUsers.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 flex items-center justify-between hover:bg-white/5 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-700 flex items-center justify-center text-black font-bold",
							children: (u.full_name || u.username || "?").charAt(0).toUpperCase()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium text-white",
							children: u.full_name || u.username || "Unknown"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-white/40",
							children: ["Joined ", new Date(u.created_at).toLocaleDateString()]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `px-2 py-1 text-xs rounded-full ${u.role === "admin" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`,
						children: u.role
					})]
				}, u.id))
			})]
		})]
	});
};
var AdminUsers = ({ users, loading, onToggleAdmin }) => {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-8 h-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-white/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" })]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
		className: "p-0 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-6 border-b border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "text-lg font-bold text-white",
				children: [
					"All Users (",
					users.length,
					")"
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divide-y divide-white/5",
			children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 flex items-center justify-between hover:bg-white/5 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-700 flex items-center justify-center text-black font-bold",
						children: (u.full_name || u.username || "?").charAt(0).toUpperCase()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-white",
						children: u.full_name || "Unknown"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-white/40",
						children: [
							"@",
							u.username || "user",
							" · ",
							u.xp,
							" XP"
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `px-2 py-1 text-xs rounded-full ${u.role === "admin" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`,
						children: u.role
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onToggleAdmin(u.id, u.role),
						className: "px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "w-3.5 h-3.5 inline mr-1" }), u.role === "admin" ? "Make Student" : "Make Admin"]
					})]
				})]
			}, u.id))
		})]
	});
};
var AdminCourses = ({ courses, loading }) => {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-8 h-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-white/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" })]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 md:grid-cols-2 gap-4",
		children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-bold text-white",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `px-2 py-1 text-xs rounded-full ${c.status === "Available" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`,
						children: c.status
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-white/60 mb-3",
					children: c.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4 text-xs text-white/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.duration }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.difficulty }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.category })
					]
				})
			]
		}, c.id))
	});
};
var AdminCertificates = ({ certificates, loading }) => {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-8 h-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-white/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" })]
		})
	});
	if (certificates.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
		className: "py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-12 h-12 mx-auto mb-4 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[var(--color-text-secondary)]",
			children: "No certificates issued yet."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
		className: "p-0 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-6 border-b border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "text-lg font-bold text-white",
				children: [
					"All Certificates (",
					certificates.length,
					")"
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divide-y divide-white/5",
			children: certificates.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 flex items-center justify-between hover:bg-white/5 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-white",
						children: c.course?.title || "Course"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-white/40",
						children: [
							c.profile?.full_name || "Unknown",
							" · #",
							c.certificate_number
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-white/40",
					children: new Date(c.issued_at).toLocaleDateString()
				})]
			}, c.id))
		})]
	});
};
var AdminMessages = ({ messages, loading, onMarkRead, onDelete }) => {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-8 h-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-white/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" })]
		})
	});
	if (messages.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
		className: "py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-12 h-12 mx-auto mb-4 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[var(--color-text-secondary)]",
			children: "No messages yet."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			className: `p-5 ${!m.is_read ? "border-[var(--gold)]/20" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-bold text-white",
								children: m.name
							}), !m.is_read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-2 py-0.5 text-xs bg-[var(--gold)]/20 text-[var(--gold)] rounded-full",
								children: "New"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-white/50",
							children: [
								m.email,
								" ",
								m.phone && `&middot; ${m.phone}`
							]
						}),
						m.program && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-[var(--gold)] mt-1",
							children: ["Interested in: ", m.program]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-white/40",
						children: new Date(m.created_at).toLocaleString()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-white/80 text-sm mb-4 bg-black/30 rounded-lg p-3",
					children: m.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onMarkRead(m.id, m.is_read),
						className: "flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors",
						children: [m.is_read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3.5 h-3.5" }), m.is_read ? "Mark Unread" : "Mark Read"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onDelete(m.id),
						className: "flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-500/5 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" }), "Delete"]
					})]
				})
			]
		}, m.id))
	});
};
var STATUSES = [
	"new",
	"contacted",
	"accepted",
	"rejected",
	"archived"
];
var statusStyle = (status) => status === "new" ? "bg-[var(--gold)]/15 text-[var(--gold)]" : status === "accepted" ? "bg-green-500/10 text-green-400" : status === "rejected" ? "bg-red-500/10 text-red-400" : status === "contacted" ? "bg-blue-500/10 text-blue-400" : "bg-white/10 text-white/60";
var AdminApplications = ({ applications, loading, onStatus, onDelete }) => {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-8 h-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-white/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" })]
		})
	});
	if (applications.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
		className: "py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "w-12 h-12 mx-auto mb-4 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[var(--color-text-secondary)]",
			children: "No applications yet."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: applications.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			className: `p-5 ${a.status === "new" ? "border-[var(--gold)]/20" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-bold text-white",
									children: a.full_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2 py-0.5 text-xs rounded-full bg-white/5 text-white/60 capitalize",
									children: a.kind
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `px-2 py-0.5 text-xs rounded-full capitalize ${statusStyle(a.status)}`,
									children: a.status
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-white/50",
							children: [
								a.email,
								a.phone ? ` · ${a.phone}` : "",
								a.city ? ` · ${a.city}` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-[var(--gold)] mt-1",
							children: [
								"Program: ",
								a.program,
								a.mode ? ` · ${a.mode}` : "",
								a.scholarship_type ? ` · ${a.scholarship_type} based` : "",
								a.topic ? ` · ${a.topic}` : ""
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-white/40",
						children: new Date(a.created_at).toLocaleString()
					})]
				}),
				a.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-white/80 text-sm mb-4 bg-black/30 rounded-lg p-3",
					children: a.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: `status-${a.id}`,
							className: "text-xs text-white/40",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: `status-${a.id}`,
							value: a.status,
							onChange: (e) => onStatus(a.id, e.target.value),
							className: "px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[var(--gold)]/50",
							children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								className: "bg-[#0a0a0a] capitalize",
								children: s
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `mailto:${a.email}`,
							className: "flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-3.5 h-3.5" }), "Reply"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onDelete(a.id),
							className: "flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-500/5 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" }), "Delete"]
						})
					]
				})
			]
		}, a.id))
	});
};
var AdminSettings = ({ applicationCount, userCount }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
	className: "p-8 max-w-2xl",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "text-lg font-bold text-white mb-6",
		children: "System"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-4 bg-white/5 rounded-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium text-white",
					children: "Registered users"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-white/40",
					children: "Accounts created through signup"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-xl font-bold text-[var(--gold)]",
					children: userCount
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-4 bg-white/5 rounded-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium text-white",
					children: "Admission submissions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-white/40",
					children: "Admission, scholarship and inquiry forms"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-xl font-bold text-[var(--gold)]",
					children: applicationCount
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 bg-white/5 rounded-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium text-white",
					children: "Admin access"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-white/40 mt-1",
					children: "Admin rights are stored separately from profiles and can only be granted by an existing admin from the Users tab. Nobody can promote their own account."
				})]
			})
		]
	})]
});
//#endregion
export { AdminPage as t };
