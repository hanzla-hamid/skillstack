import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, Trash2, BellOff } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useNotifications } from "@/hooks/useNotifications";

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return minutes + "m ago";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "h ago";
  const days = Math.floor(hours / 24);
  return days + "d ago";
}

export const NotificationsMenu = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead, clearAll } =
    useNotifications();
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(containerRef, close, open);
  useEscapeKey(close, open);
  useFocusTrap(menuRef, open);
  const handleToggle = () => setOpen((prev) => !prev);
  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={unreadCount > 0 ? "Notifications, " + unreadCount + " unread" : "Notifications"}
        className="relative p-2 hover:text-[var(--gold)] transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-[var(--gold)] text-black text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="menu"
            aria-label="Notifications"
            className="absolute top-full right-0 pt-6 z-50"
          >
            <div className="glass-strong rounded-xl p-4 w-80 max-w-[calc(100vw-2rem)] flex flex-col gap-2">
              <div className="flex items-center justify-between px-1 pb-3 mb-1 border-b border-white/10">
                <p className="font-medium text-white text-sm">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 text-xs text-[var(--gold)]">{unreadCount} new</span>
                  )}
                </p>
                {notifications.length > 0 && (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="text-xs text-[var(--gold)] hover:underline flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Mark all read
                    </button>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-xs text-[var(--color-text-muted)] hover:text-red-400 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Clear all
                    </button>
                  </div>
                )}
              </div>
              {loading ? (
                <div className="px-1 py-6 text-center">
                  <div className="w-6 h-6 border-2 border-white/20 border-t-[var(--gold)] rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="px-1 py-8 text-center">
                  <BellOff className="w-8 h-8 text-white/20 mx-auto mb-3" />
                  <p className="text-sm text-[var(--color-text-muted)]">No notifications yet.</p>
                </div>
              ) : (
                <ul className="max-h-80 overflow-y-auto flex flex-col gap-1">
                  {notifications.map((notification) => (
                    <li key={notification.id}>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => markAsRead(notification.id)}
                        className={
                          notification.read
                            ? "w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-[var(--gold)]/10 text-[var(--color-text-secondary)]"
                            : "w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-[var(--gold)]/10 text-white bg-[var(--gold)]/5"
                        }
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium">{notification.title}</span>
                          {!notification.read && (
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                          {notification.message}
                        </p>
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
                          {formatRelativeTime(notification.createdAt)}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
