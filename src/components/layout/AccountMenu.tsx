import { useCallback, useRef, useState } from "react";
import { Link } from "@/lib/router-compat";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LayoutDashboard, LogOut, Shield, User, UserCircle } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface AccountMenuProps {
  isLoggedIn: boolean;
  displayName: string;
  roleLabel: string;
  initials: string;
  isAdmin: boolean;
  onSignOut: () => void;
  onNavigate?: () => void;
}

export const AccountMenu = ({
  isLoggedIn,
  displayName,
  roleLabel,
  initials,
  isAdmin,
  onSignOut,
  onNavigate,
}: AccountMenuProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
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
  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={isLoggedIn ? "Account menu for " + displayName : "Account menu"}
        className="flex items-center gap-2 pl-4 border-l border-white/10 hover:text-[var(--gold)] transition-colors"
      >
        {isLoggedIn ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-700 flex items-center justify-center text-black font-bold text-sm">
            {initials}
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <User className="w-4 h-4" />
          </div>
        )}
        <ChevronDown className={"w-4 h-4 transition-transform " + (open ? "rotate-180" : "")} />
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
            aria-label="Account"
            className="absolute top-full right-0 pt-6 z-50"
          >
            <div className="glass-strong rounded-xl p-4 w-64 flex flex-col gap-2">
              <div className="px-3 pb-3 mb-2 border-b border-white/10">
                <p className="font-medium text-white truncate">
                  {isLoggedIn ? displayName : "Guest User"}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {isLoggedIn ? roleLabel : "Sign in to access your dashboard"}
                </p>
              </div>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    role="menuitem"
                    onClick={handleNavigate}
                    className="px-3 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] transition-colors flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    role="menuitem"
                    onClick={handleNavigate}
                    className="px-3 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] transition-colors flex items-center gap-2"
                  >
                    <UserCircle className="w-4 h-4" /> Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      role="menuitem"
                      onClick={handleNavigate}
                      className="px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4" /> Admin Panel
                    </Link>
                  )}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleSignOut}
                    className="px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2 text-left"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    role="menuitem"
                    onClick={handleNavigate}
                    className="px-3 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    role="menuitem"
                    onClick={handleNavigate}
                    className="px-3 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
