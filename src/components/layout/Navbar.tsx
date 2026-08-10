import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { PROGRAMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { OutlineButton } from "../shared/buttons";
import { useAuth } from "@/hooks/use-auth";
import { NotificationsMenu } from "./NotificationsMenu";
import { AccountMenu } from "./AccountMenu";

const SearchOverlay = lazy(() => import("./SearchOverlay"));

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [location] = useLocation();
  const { user, profile, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };
  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const roleLabel = isAdmin ? "Administrator" : "Student";
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses", hasMega: true },
    { label: "Knowledge", href: "/knowledge" },
    { label: "Blog", href: "/blog" },
    { label: "Events", href: "/events" },
    { label: "Admissions", href: "/admissions" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top)]",
          isScrolled
            ? "glass-strong border-b border-[var(--color-border-default)] py-3 md:py-4"
            : "bg-transparent py-4 md:py-6",
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          <Logo scrolled={isScrolled} />

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[var(--gold)] flex items-center gap-1",
                    location === link.href
                      ? "text-[var(--gold)]"
                      : "text-[var(--color-text-secondary)]",
                  )}
                >
                  {link.label}
                </Link>
                {link.hasMega && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                    <div className="glass-strong rounded-2xl p-6 w-[600px] grid grid-cols-2 gap-4">
                      {PROGRAMS.slice(0, 4).map((course) => (
                        <Link
                          key={course.slug}
                          href={"/courses/" + course.slug}
                          className="group/course p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-[var(--gold)]/20"
                        >
                          <h4 className="font-display font-semibold text-white group-hover/course:text-[var(--gold)] transition-colors mb-1">
                            {course.title}
                          </h4>
                          <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">
                            {course.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4 text-[var(--color-text-secondary)]">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2 hover:text-[var(--gold)] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <NotificationsMenu />
            <AccountMenu
              isLoggedIn={!!user}
              displayName={displayName}
              roleLabel={roleLabel}
              initials={initials}
              isAdmin={isAdmin}
              onSignOut={handleSignOut}
            />
          </div>
          <div className="flex md:hidden items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2.5 rounded-xl text-[var(--color-text-secondary)] active:scale-90 active:bg-white/5 transition-all"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2.5 rounded-xl text-white active:scale-90 active:bg-white/5 transition-all"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-[var(--color-bg)] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
            >
              <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[var(--gold)]/10 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 -left-20 h-64 w-64 rounded-full bg-[var(--gold)]/5 blur-3xl" />
              <div className="relative px-5 py-4 flex items-center justify-between border-b border-white/10">
                <Logo />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl active:scale-90 active:bg-white/5 transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="relative flex-1 overflow-y-auto py-6 px-5 flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3.5 border-b border-white/5 text-[1.35rem] font-display font-semibold transition-colors active:text-[var(--gold)]",
                        location === link.href ? "text-[var(--gold)]" : "text-white",
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-opacity",
                          location === link.href ? "bg-[var(--gold)] opacity-100" : "opacity-0",
                        )}
                      />
                    </Link>
                  </motion.div>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="py-3.5 text-[1.35rem] font-display font-semibold text-left text-[var(--color-text-secondary)] active:text-[var(--gold)] transition-colors flex items-center gap-3"
                >
                  <Search className="w-5 h-5" /> Search
                </button>
                <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 p-3 rounded-2xl glass-card">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-700 flex items-center justify-center text-black font-bold">
                          {initials}
                        </div>
                        <div>
                          <div className="font-medium text-white">{displayName}</div>
                          <div className="text-xs text-[var(--gold)]">{roleLabel}</div>
                        </div>
                      </div>
                      <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <OutlineButton className="w-full py-3.5">Dashboard</OutlineButton>
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-center text-red-400 py-2"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="text-center text-red-400 text-sm py-2"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <OutlineButton className="w-full py-3.5">Sign In</OutlineButton>
                      </Link>
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                        <OutlineButton className="w-full py-3.5">Create Account</OutlineButton>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      <AnimatePresence>
        {searchOpen && (
          <Suspense fallback={null}>
            <SearchOverlay onClose={() => setSearchOpen(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
};
