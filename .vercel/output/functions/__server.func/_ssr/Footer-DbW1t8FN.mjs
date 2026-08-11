import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { i as OutlineButton, o as useAuth, r as Link$1, s as useLocation, u as cn } from "./router-BsmUf-rF.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { A as Menu, Et as ArrowRight, F as LogOut, L as LayoutDashboard, N as Mail, ct as CircleUser, dt as CircleCheck, g as Shield, o as User, pt as ChevronDown, r as X, v as Search } from "../_libs/lucide-react.mjs";
import { i as useFocusTrap, n as useClickOutside, r as useEscapeKey, t as NotificationsMenu } from "./NotificationsMenu-TUt9LWZL.mjs";
import { o as PROGRAMS, r as FOOTER_COLUMNS, t as BRAND } from "./constants-MbwHFMBp.mjs";
import { t as Logo } from "./Logo-D4HGjyX7.mjs";
import { a as SiX, i as SiWhatsapp, n as SiFacebook, o as SiYoutube, r as SiInstagram, t as SiDiscord } from "../_libs/react-icons.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Footer-DbW1t8FN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AccountMenu = ({ isLoggedIn, displayName, roleLabel, initials, isAdmin, onSignOut, onNavigate }) => {
	const [open, setOpen] = (0, import_react.useState)(false);
	const containerRef = (0, import_react.useRef)(null);
	const menuRef = (0, import_react.useRef)(null);
	const close = (0, import_react.useCallback)(() => setOpen(false), []);
	useClickOutside(containerRef, close, open);
	useEscapeKey(close, open);
	useFocusTrap(menuRef, open);
	const handleSignOut = () => {
		onSignOut();
		close();
	};
	const handleNavigate = () => {
		onNavigate?.();
		close();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		ref: containerRef,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((prev) => !prev),
			"aria-haspopup": "menu",
			"aria-expanded": open,
			"aria-label": isLoggedIn ? "Account menu for " + displayName : "Account menu",
			className: "flex items-center gap-2 pl-4 border-l border-white/10 hover:text-[var(--gold)] transition-colors",
			children: [isLoggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-8 h-8 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-700 flex items-center justify-center text-black font-bold text-sm",
				children: initials
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4 transition-transform " + (open ? "rotate-180" : "") })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			ref: menuRef,
			initial: {
				opacity: 0,
				y: 8
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: 8
			},
			transition: {
				duration: .18,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			role: "menu",
			"aria-label": "Account",
			className: "absolute top-full right-0 pt-6 z-50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-xl p-4 w-64 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-3 pb-3 mb-2 border-b border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-white truncate",
						children: isLoggedIn ? displayName : "Guest User"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-[var(--color-text-muted)]",
						children: isLoggedIn ? roleLabel : "Sign in to access your dashboard"
					})]
				}), isLoggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/dashboard",
						role: "menuitem",
						onClick: handleNavigate,
						className: "px-3 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] transition-colors flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "w-4 h-4" }), " Dashboard"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/dashboard/profile",
						role: "menuitem",
						onClick: handleNavigate,
						className: "px-3 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] transition-colors flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUser, { className: "w-4 h-4" }), " Profile"]
					}),
					isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/admin",
						role: "menuitem",
						onClick: handleNavigate,
						className: "px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-4 h-4" }), " Admin Panel"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "menuitem",
						onClick: handleSignOut,
						className: "px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4" }), " Logout"]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
					href: "/login",
					role: "menuitem",
					onClick: handleNavigate,
					className: "px-3 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] transition-colors",
					children: "Login"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
					href: "/register",
					role: "menuitem",
					onClick: handleNavigate,
					className: "px-3 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] transition-colors",
					children: "Register"
				})] })]
			})
		}) })]
	});
};
var SearchOverlay = (0, import_react.lazy)(() => import("./SearchOverlay-C41sXXDp.mjs"));
var Navbar = () => {
	const [isScrolled, setIsScrolled] = (0, import_react.useState)(false);
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [location] = useLocation();
	const { user, profile, isAdmin, signOut } = useAuth();
	(0, import_react.useEffect)(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setMobileMenuOpen(false);
	}, [location]);
	(0, import_react.useEffect)(() => {
		if (searchOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [searchOpen]);
	const handleSignOut = async () => {
		await signOut();
		setMobileMenuOpen(false);
	};
	const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
	const initials = displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
	const roleLabel = isAdmin ? "Administrator" : "Student";
	const navLinks = [
		{
			label: "Home",
			href: "/"
		},
		{
			label: "Courses",
			href: "/courses",
			hasMega: true
		},
		{
			label: "Knowledge",
			href: "/knowledge"
		},
		{
			label: "Blog",
			href: "/blog"
		},
		{
			label: "Events",
			href: "/events"
		},
		{
			label: "Admissions",
			href: "/admissions"
		},
		{
			label: "About",
			href: "/about"
		},
		{
			label: "Contact",
			href: "/contact"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
		initial: { y: -80 },
		animate: { y: 0 },
		transition: {
			duration: .6,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: cn("fixed top-0 inset-x-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top)]", isScrolled ? "glass-strong border-b border-[var(--color-border-default)] py-3 md:py-4" : "bg-transparent py-4 md:py-6"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { scrolled: isScrolled }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden md:flex items-center gap-8",
					"aria-label": "Main navigation",
					children: navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							href: link.href,
							className: cn("text-sm font-medium transition-colors hover:text-[var(--gold)] flex items-center gap-1", location === link.href ? "text-[var(--gold)]" : "text-[var(--color-text-secondary)]"),
							children: link.label
						}), link.hasMega && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "glass-strong rounded-2xl p-6 w-[600px] grid grid-cols-2 gap-4",
								children: PROGRAMS.slice(0, 4).map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
									href: "/courses/" + course.slug,
									className: "group/course p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-[var(--gold)]/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display font-semibold text-white group-hover/course:text-[var(--gold)] transition-colors mb-1",
										children: course.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[var(--color-text-muted)] line-clamp-2",
										children: course.description
									})]
								}, course.slug))
							})
						})]
					}, link.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden md:flex items-center gap-4 text-[var(--color-text-secondary)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSearchOpen(true),
							"aria-label": "Search",
							className: "p-2 hover:text-[var(--gold)] transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsMenu, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountMenu, {
							isLoggedIn: !!user,
							displayName,
							roleLabel,
							initials,
							isAdmin,
							onSignOut: handleSignOut
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex md:hidden items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSearchOpen(true),
						"aria-label": "Search",
						className: "p-2.5 rounded-xl text-[var(--color-text-secondary)] active:scale-90 active:bg-white/5 transition-all",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "p-2.5 rounded-xl text-white active:scale-90 active:bg-white/5 transition-all",
						onClick: () => setMobileMenuOpen(true),
						"aria-label": "Open menu",
						"aria-expanded": mobileMenuOpen,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-6 h-6" })
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: mobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: { duration: .25 },
			className: "fixed inset-0 z-50 bg-[var(--color-bg)] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[var(--gold)]/10 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute bottom-0 -left-20 h-64 w-64 rounded-full bg-[var(--gold)]/5 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative px-5 py-4 flex items-center justify-between border-b border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setMobileMenuOpen(false),
						className: "p-2.5 rounded-xl active:scale-90 active:bg-white/5 transition-all",
						"aria-label": "Close menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 overflow-y-auto py-6 px-5 flex flex-col",
					children: [
						navLinks.map((link, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								x: -16
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: {
								delay: .04 * i,
								duration: .35,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								href: link.href,
								onClick: () => setMobileMenuOpen(false),
								className: cn("flex items-center justify-between py-3.5 border-b border-white/5 text-[1.35rem] font-display font-semibold transition-colors active:text-[var(--gold)]", location === link.href ? "text-[var(--gold)]" : "text-white"),
								children: [link.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 w-1.5 rounded-full transition-opacity", location === link.href ? "bg-[var(--gold)] opacity-100" : "opacity-0") })]
							})
						}, link.href)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setMobileMenuOpen(false);
								setSearchOpen(true);
							},
							className: "py-3.5 text-[1.35rem] font-display font-semibold text-left text-[var(--color-text-secondary)] active:text-[var(--gold)] transition-colors flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-5 h-5" }), " Search"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 pt-6 border-t border-white/10 flex flex-col gap-3",
							children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 p-3 rounded-2xl glass-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-11 h-11 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-700 flex items-center justify-center text-black font-bold",
										children: initials
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium text-white",
										children: displayName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-[var(--gold)]",
										children: roleLabel
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/dashboard",
									onClick: () => setMobileMenuOpen(false),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineButton, {
										className: "w-full py-3.5",
										children: "Dashboard"
									})
								}),
								isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/admin",
									onClick: () => setMobileMenuOpen(false),
									className: "text-center text-red-400 py-2",
									children: "Admin Panel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleSignOut,
									className: "text-center text-red-400 text-sm py-2",
									children: "Sign Out"
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/login",
								onClick: () => setMobileMenuOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineButton, {
									className: "w-full py-3.5",
									children: "Sign In"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/register",
								onClick: () => setMobileMenuOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineButton, {
									className: "w-full py-3.5",
									children: "Create Account"
								})
							})] })
						})
					]
				})
			]
		}) })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchOverlay, { onClose: () => setSearchOpen(false) })
	}) })] });
};
var ParticleCanvas = ({ className }) => {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let animationFrameId = 0;
		let particles = [];
		const resize = () => {
			const parent = canvas.parentElement;
			if (parent) {
				canvas.width = parent.clientWidth;
				canvas.height = parent.clientHeight;
			}
		};
		const initParticles = () => {
			particles = [];
			const numParticles = Math.floor(canvas.width * canvas.height / 2e4);
			for (let i = 0; i < numParticles; i++) particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				size: Math.random() * 2 + .5,
				speedY: (Math.random() * .5 + .1) * -1,
				opacity: Math.random() * .3 + .05
			});
		};
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#EAB308";
			particles.forEach((p) => {
				ctx.globalAlpha = p.opacity;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fill();
				p.y += p.speedY;
				if (p.y < 0) {
					p.y = canvas.height;
					p.x = Math.random() * canvas.width;
				}
			});
			animationFrameId = requestAnimationFrame(animate);
		};
		const onResize = () => {
			resize();
			initParticles();
		};
		window.addEventListener("resize", onResize, { passive: true });
		resize();
		initParticles();
		const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let visible = false;
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible && !reduceMotion && !animationFrameId) animate();
			else if (!visible && animationFrameId) {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = 0;
			}
		}, { rootMargin: "100px" });
		observer.observe(canvas);
		if (reduceMotion) {
			ctx.fillStyle = "#EAB308";
			particles.forEach((p) => {
				ctx.globalAlpha = p.opacity;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fill();
			});
		}
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", onResize);
			if (animationFrameId) cancelAnimationFrame(animationFrameId);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		"aria-hidden": "true",
		className: `absolute inset-0 pointer-events-none ${className || ""}`
	});
};
var SocialIcon = ({ name }) => {
	switch (name) {
		case "facebook": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiFacebook, { className: "w-5 h-5" });
		case "instagram": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiInstagram, { className: "w-5 h-5" });
		case "x": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiX, { className: "w-5 h-5" });
		case "youtube": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiYoutube, { className: "w-5 h-5" });
		case "discord": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiDiscord, { className: "w-5 h-5" });
		case "whatsapp": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiWhatsapp, { className: "w-5 h-5" });
		case "email": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5" });
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5" });
	}
};
var Footer = () => {
	const [email, setEmail] = (0, import_react.useState)("");
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const handleNewsletterSubmit = (e) => {
		e.preventDefault();
		if (email.trim()) {
			setSubmitted(true);
			setEmail("");
			setTimeout(() => setSubmitted(false), 4e3);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative bg-[var(--color-surface)] border-t border-white/5 pt-16 pb-8 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--gold)]/10 blur-[120px] rounded-full pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleCanvas, { className: "opacity-30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-4 flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[var(--color-text-secondary)] mt-1 text-sm sm:text-base",
								children: [
									BRAND.tagline,
									" ",
									BRAND.subtitle
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center gap-3 mt-2",
								children: Object.entries(BRAND.social).map(([key, url]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: url,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": BRAND.name + " on " + key,
									className: "w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--gold)] hover:border-[var(--gold)]/50 hover:bg-[var(--gold)]/10 transition-all duration-300 hover:-translate-y-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, { name: key })
								}, key))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display font-semibold text-white mb-3 text-sm",
									children: "Newsletter"
								}), submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-[var(--gold)] text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" }), " You're subscribed! Watch your inbox."]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleNewsletterSubmit,
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: "Your email",
										"aria-label": "Email for newsletter",
										className: "flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--gold)]/50 transition-colors"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										"aria-label": "Subscribe",
										className: "shrink-0 w-10 h-10 rounded-xl bg-[var(--gold)] text-black flex items-center justify-center hover:bg-[var(--gold-hover)] transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })
									})]
								})]
							})
						]
					}), FOOTER_COLUMNS.map((col, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display font-semibold text-white mb-4 text-sm sm:text-base",
							children: col.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-3",
							children: col.links.map((link, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: link.href,
								className: "text-[var(--color-text-secondary)] hover:text-[var(--gold)] transition-colors text-sm",
								children: link.label
							}) }, i))
						})]
					}, idx))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--color-text-muted)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center sm:text-left",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" ",
							BRAND.name,
							". ",
							BRAND.organization,
							"."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/privacy-policy",
								className: "hover:text-[var(--gold)] transition-colors",
								children: "Privacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/terms",
								className: "hover:text-[var(--gold)] transition-colors",
								children: "Terms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/refund-policy",
								className: "hover:text-[var(--gold)] transition-colors",
								children: "Refunds"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Designed by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[var(--gold)]",
								children: "Hanzla Hamid"
							})] })
						]
					})]
				})]
			})
		]
	});
};
//#endregion
export { Navbar as n, ParticleCanvas as r, Footer as t };
