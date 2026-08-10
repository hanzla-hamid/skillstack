import { s as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { d as supabase } from "./router-CotFlDs_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { Ct as BellOff, St as Bell, mt as Check, u as Trash2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/NotificationsMenu-TUt9LWZL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Calls `onEscape` when the Escape key is pressed, while `active` is true. */
function useEscapeKey(onEscape, active = true) {
	(0, import_react.useEffect)(() => {
		if (!active) return;
		function handleKeyDown(event) {
			if (event.key === "Escape") onEscape();
		}
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onEscape, active]);
}
var FOCUSABLE_SELECTOR = "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex=\"-1\"])";
/**
* Traps Tab/Shift+Tab focus inside `ref.current` while `active` is true,
* and focuses the first focusable element on activation. Restores nothing
* on its own — callers should return focus to the trigger button on close
* if desired.
*/
function useFocusTrap(ref, active = true) {
	(0, import_react.useEffect)(() => {
		if (!active || !ref.current) return;
		const container = ref.current;
		const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		first?.focus();
		function handleKeyDown(event) {
			if (event.key !== "Tab" || focusable.length === 0) return;
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last?.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first?.focus();
			}
		}
		container.addEventListener("keydown", handleKeyDown);
		return () => container.removeEventListener("keydown", handleKeyDown);
	}, [ref, active]);
}
/**
* Calls `onOutside` when a pointer event occurs outside `ref.current`.
* Only attaches the listener while `active` is true, so idle dropdowns
* don't pay for a document-level listener.
*/
function useClickOutside(ref, onOutside, active = true) {
	(0, import_react.useEffect)(() => {
		if (!active) return;
		function handlePointerDown(event) {
			const target = event.target;
			if (ref.current && target && !ref.current.contains(target)) onOutside();
		}
		document.addEventListener("pointerdown", handlePointerDown);
		return () => document.removeEventListener("pointerdown", handlePointerDown);
	}, [
		ref,
		onOutside,
		active
	]);
}
function toNotification(row) {
	return {
		id: row.id,
		title: row.title,
		message: row.message ?? "",
		type: row.type,
		read: row.read,
		link: row.link,
		createdAt: row.created_at
	};
}
async function fetchAll() {
	const { data: { user } } = await supabase.auth.getUser();
	if (!user) return [];
	const { data, error } = await supabase.from("notifications").select("id, title, message, type, read, link, created_at").order("created_at", { ascending: false }).limit(50);
	if (error) {
		console.error("Error loading notifications:", error.message);
		return [];
	}
	return (data ?? []).map(toNotification);
}
/**
* Notification service backed by the `notifications` table, with live updates
* through Realtime. Rows are private per user via RLS.
*/
var notificationService = {
	list() {
		return fetchAll();
	},
	subscribe(listener) {
		let active = true;
		const push = async () => {
			const next = await fetchAll();
			if (active) listener(next);
		};
		push();
		const channel = supabase.channel("notifications-feed").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "notifications"
		}, () => {
			push();
		}).subscribe();
		const { data: authListener } = supabase.auth.onAuthStateChange(() => {
			push();
		});
		return () => {
			active = false;
			authListener?.subscription?.unsubscribe?.();
			supabase.removeChannel(channel);
		};
	},
	async markAsRead(id) {
		const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id);
		if (error) console.error("Error marking notification read:", error.message);
	},
	async markAllAsRead() {
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) return;
		const { error } = await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
		if (error) console.error("Error marking notifications read:", error.message);
	},
	async clearAll() {
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) return;
		const { error } = await supabase.from("notifications").delete().eq("user_id", user.id);
		if (error) console.error("Error clearing notifications:", error.message);
	}
};
function useNotifications() {
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		return notificationService.subscribe((next) => {
			setNotifications(next);
			setLoading(false);
		});
	}, []);
	const markAsRead = (0, import_react.useCallback)((id) => {
		notificationService.markAsRead(id);
	}, []);
	const markAllAsRead = (0, import_react.useCallback)(() => {
		notificationService.markAllAsRead();
	}, []);
	const clearAll = (0, import_react.useCallback)(() => {
		notificationService.clearAll();
	}, []);
	return {
		notifications,
		unreadCount: notifications.reduce((count, n) => count + (n.read ? 0 : 1), 0),
		loading,
		markAsRead,
		markAllAsRead,
		clearAll
	};
}
function formatRelativeTime(iso) {
	const diffMs = Date.now() - new Date(iso).getTime();
	const minutes = Math.floor(diffMs / 6e4);
	if (minutes < 1) return "Just now";
	if (minutes < 60) return minutes + "m ago";
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return hours + "h ago";
	return Math.floor(hours / 24) + "d ago";
}
var NotificationsMenu = () => {
	const [open, setOpen] = (0, import_react.useState)(false);
	const containerRef = (0, import_react.useRef)(null);
	const menuRef = (0, import_react.useRef)(null);
	const buttonRef = (0, import_react.useRef)(null);
	const { notifications, unreadCount, loading, markAsRead, markAllAsRead, clearAll } = useNotifications();
	const close = (0, import_react.useCallback)(() => setOpen(false), []);
	useClickOutside(containerRef, close, open);
	useEscapeKey(close, open);
	useFocusTrap(menuRef, open);
	const handleToggle = () => setOpen((prev) => !prev);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		ref: containerRef,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			ref: buttonRef,
			type: "button",
			onClick: handleToggle,
			"aria-haspopup": "menu",
			"aria-expanded": open,
			"aria-label": unreadCount > 0 ? "Notifications, " + unreadCount + " unread" : "Notifications",
			className: "relative p-2 hover:text-[var(--gold)] transition-colors",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-5 h-5" }), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-[var(--gold)] text-black text-[10px] font-bold flex items-center justify-center",
				children: unreadCount > 9 ? "9+" : unreadCount
			})]
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
			"aria-label": "Notifications",
			className: "absolute top-full right-0 pt-6 z-50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-xl p-4 w-80 max-w-[calc(100vw-2rem)] flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-1 pb-3 mb-1 border-b border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium text-white text-sm",
						children: ["Notifications", unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 text-xs text-[var(--gold)]",
							children: [unreadCount, " new"]
						})]
					}), notifications.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: markAllAsRead,
							className: "text-xs text-[var(--gold)] hover:underline flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3" }), " Mark all read"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: clearAll,
							className: "text-xs text-[var(--color-text-muted)] hover:text-red-400 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3 h-3" }), " Clear all"]
						})]
					})]
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-1 py-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-6 h-6 border-2 border-white/20 border-t-[var(--gold)] rounded-full animate-spin mx-auto mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-[var(--color-text-muted)]",
						children: "Loading..."
					})]
				}) : notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-1 py-8 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellOff, { className: "w-8 h-8 text-white/20 mx-auto mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-[var(--color-text-muted)]",
						children: "No notifications yet."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "max-h-80 overflow-y-auto flex flex-col gap-1",
					children: notifications.map((notification) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "menuitem",
						onClick: () => markAsRead(notification.id),
						className: notification.read ? "w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-[var(--gold)]/10 text-[var(--color-text-secondary)]" : "w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-[var(--gold)]/10 text-white bg-[var(--gold)]/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: notification.title
								}), !notification.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 mt-1.5 rounded-full bg-[var(--gold)] shrink-0" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--color-text-muted)] mt-0.5",
								children: notification.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-[var(--color-text-muted)] mt-1",
								children: formatRelativeTime(notification.createdAt)
							})
						]
					}) }, notification.id))
				})]
			})
		}) })]
	});
};
//#endregion
export { useFocusTrap as i, useClickOutside as n, useEscapeKey as r, NotificationsMenu as t };
