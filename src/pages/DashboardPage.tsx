import React, { useState, useEffect } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { BRAND } from "@/lib/constants";
import { Logo } from "@/components/layout/Logo";
import { NotificationsMenu } from "@/components/layout/NotificationsMenu";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  CheckSquare,
  Trophy,
  User,
  LogOut,
  Flame,
  PlayCircle,
  BookMarked,
  Download,
} from "lucide-react";
import { GoldButton } from "@/components/shared/buttons";
import { GlassCard } from "@/components/shared/GlassCard";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { supabase, type Enrollment, type Certificate } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [location, setLocation] = useLocation();
  const { user, profile, loading, signOut } = useAuth();
  const currentTab = location.replace("/dashboard", "") || "/";

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/login");
    }
  }, [loading, user, setLocation]);

  useEffect(() => {
    if (!user) return;
    setFullName(profile?.full_name || "");
    setUsername(profile?.username || "");
    setBio(profile?.bio || "");
  }, [user, profile]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setDataLoading(true);
      const [{ data: enrollData }, { data: certData }] = await Promise.all([
        supabase.from("enrollments").select("*, course:courses(*)").eq("user_id", user.id),
        supabase.from("certificates").select("*, course:courses(*)").eq("user_id", user.id),
      ]);
      setEnrollments((enrollData || []) as Enrollment[]);
      setCertificates((certData || []) as Certificate[]);
      setDataLoading(false);
    })();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    setLocation("/");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingProfile(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, username, bio, updated_at: new Date().toISOString() })
      .eq("id", user.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated", description: "Your changes have been saved." });
    }
    setSavingProfile(false);
  };

  const handleUpdateProgress = async (enrollmentId: string, progress: number) => {
    const status = progress >= 100 ? "completed" : "active";
    const completedAt = progress >= 100 ? new Date().toISOString() : null;
    const { error } = await supabase
      .from("enrollments")
      .update({ progress, status, completed_at: completedAt })
      .eq("id", enrollmentId);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setEnrollments((prev) =>
      prev.map((e) =>
        e.id === enrollmentId ? { ...e, progress, status, completed_at: completedAt } : e,
      ),
    );
    if (progress >= 100) {
      toast({ title: "Course completed!", description: "You earned a certificate." });
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" />
        </div>
      </div>
    );
  }

  const displayName = profile?.full_name || user.email || "Student";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const xp = profile?.xp || 0;
  const level = Math.floor(xp / 100) + 1;
  const levelName =
    level === 1
      ? "Novice"
      : level === 2
        ? "Apprentice"
        : level === 3
          ? "Adept"
          : level >= 4
            ? "Expert"
            : "Master";

  const navItems = [
    { label: "Overview", href: "/", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "My Courses", href: "/courses", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Certificates", href: "/certificates", icon: <Award className="w-5 h-5" /> },
    { label: "Assignments", href: "/assignments", icon: <CheckSquare className="w-5 h-5" /> },
    { label: "Profile", href: "/profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-black border-r border-white/5 flex flex-col shrink-0 md:h-screen md:sticky md:top-0 z-20">
        <div className="p-6 border-b border-white/5 flex items-center justify-between md:justify-start">
          <Logo scrolled />
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          <div className="text-xs font-bold text-white/30 uppercase tracking-widest px-4 mb-2">
            Menu
          </div>
          {navItems.map((item) => {
            const isActive =
              currentTab === item.href || (item.href !== "/" && currentTab.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={"/dashboard" + (item.href === "/" ? "" : item.href)}
                className={
                  isActive
                    ? "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20 shadow-glow-sm"
                    : "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white"
                }
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-700 flex items-center justify-center text-black font-bold text-lg">
              {initials}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold text-white truncate">{displayName}</div>
              <div className="text-xs text-[var(--gold)]">
                Level {level} {levelName}
              </div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col min-w-0 md:max-h-screen md:overflow-y-auto">
        <header className="h-20 border-b border-white/5 bg-[var(--color-surface)]/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6 sm:px-8">
          <h1 className="text-xl sm:text-2xl font-display font-bold text-white capitalize">
            {currentTab === "/" ? "Dashboard Overview" : currentTab.replace("/", "")}
          </h1>
          <div className="flex items-center gap-4">
            <NotificationsMenu />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-white">{xp}</span>
            </div>
          </div>
        </header>
        <div className="p-6 sm:p-8">
          {currentTab === "/" && (
            <OverviewTab
              displayName={displayName}
              xp={xp}
              enrollments={enrollments}
              certificates={certificates}
              loading={dataLoading}
            />
          )}
          {currentTab === "/certificates" && (
            <CertificatesTab certificates={certificates} loading={dataLoading} />
          )}
          {currentTab === "/assignments" && <AssignmentsTab />}
          {currentTab === "/profile" && (
            <ProfileTab
              fullName={fullName}
              username={username}
              bio={bio}
              email={user.email || ""}
              initials={initials}
              setFullName={setFullName}
              setUsername={setUsername}
              setBio={setBio}
              onSave={handleSaveProfile}
              saving={savingProfile}
            />
          )}
          {currentTab === "/courses" && (
            <CoursesTab
              enrollments={enrollments}
              loading={dataLoading}
              onUpdateProgress={handleUpdateProgress}
            />
          )}
        </div>
      </main>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

const OverviewTab = ({
  displayName,
  xp,
  enrollments,
  certificates,
  loading,
}: {
  displayName: string;
  xp: number;
  enrollments: Enrollment[];
  certificates: Certificate[];
  loading: boolean;
}) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-black via-zinc-900 to-black border border-[var(--gold)]/20 p-6 sm:p-8 flex items-center justify-between"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold)]/10 blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
            Welcome back, {displayName.split(" ")[0]}!
          </h2>
          <p className="text-[var(--color-text-secondary)] text-sm sm:text-base">
            Ready to continue your learning journey?
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-4 sm:gap-6">
          <div className="text-right">
            <div className="text-xs sm:text-sm text-[var(--gold)] font-bold uppercase tracking-wider mb-1">
              Total XP
            </div>
            <div className="text-3xl sm:text-4xl font-display font-bold text-white">{xp}</div>
          </div>
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[var(--gold)]/30 flex items-center justify-center text-2xl">
            🎯
          </div>
        </div>
      </motion.div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: <PlayCircle className="w-6 h-6" />,
            count: loading ? "..." : enrollments.filter((e) => e.status === "active").length,
            label: "Active Courses",
            bg: "bg-blue-500/10",
            text: "text-blue-400",
          },
          {
            icon: <Award className="w-6 h-6" />,
            count: loading ? "..." : certificates.length,
            label: "Certificates",
            bg: "bg-[var(--gold)]/10",
            text: "text-[var(--gold)]",
          },
          {
            icon: <BookMarked className="w-6 h-6" />,
            count: loading ? "..." : enrollments.length,
            label: "Total Enrolled",
            bg: "bg-purple-500/10",
            text: "text-purple-400",
          },
          {
            icon: <Trophy className="w-6 h-6" />,
            count: loading ? "..." : enrollments.filter((e) => e.status === "completed").length,
            label: "Completed",
            bg: "bg-green-500/10",
            text: "text-green-400",
          },
        ].map((card, i) => (
          <motion.div key={i} custom={i} variants={cardVariants} initial="hidden" animate="visible">
            <GlassCard className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
              <div
                className={
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-xl " +
                  card.bg +
                  " " +
                  card.text +
                  " flex items-center justify-center shrink-0"
                }
              >
                {card.icon}
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold text-white">{card.count}</div>
                <div className="text-xs text-[var(--color-text-secondary)] truncate">
                  {card.label}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      {enrollments.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Your Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrollments.map((e) => (
              <GlassCard key={e.id} className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-white">{e.course?.title || "Unknown Course"}</h4>
                  <span
                    className={
                      e.status === "completed"
                        ? "px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400"
                        : "px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400"
                    }
                  >
                    {e.status === "completed" ? "Completed" : "Active"}
                  </span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 mb-2">
                  <div
                    className="bg-[var(--gold)] h-2 rounded-full transition-all"
                    style={{ width: e.progress + "%" }}
                  />
                </div>
                <div className="text-xs text-white/50">{e.progress}% complete</div>
              </GlassCard>
            ))}
          </div>
        </div>
      ) : (
        <GlassCard strong className="py-16 text-center border-dashed border-2 border-white/10">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white/20" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No active courses</h3>
          <p className="text-[var(--color-text-secondary)] mb-6 max-w-sm mx-auto">
            You haven't enrolled in any courses yet. Browse our premium programs to start learning.
          </p>
          <Link href="/courses">
            <GoldButton>Browse Courses</GoldButton>
          </Link>
        </GlassCard>
      )}
    </div>
  );
};

const CertificatesTab = ({
  certificates,
  loading,
}: {
  certificates: Certificate[];
  loading: boolean;
}) => {
  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" />
        </div>
      </div>
    );
  if (certificates.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <GlassCard
          strong
          className="py-20 text-center border-dashed border-2 border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--gold)]/5 blur-[80px]" />
          <div className="relative z-10">
            <div className="w-20 h-20 bg-[var(--gold)]/10 border border-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--gold)]">
              <Award className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No certificates yet</h3>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto">
              Complete a course to earn your first verifiable certificate from SkillStack.
            </p>
          </div>
        </GlassCard>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Your Certificates</h3>
      {certificates.map((cert) => (
        <GlassCard
          key={cert.id}
          className="p-6 flex items-center justify-between border-[var(--gold)]/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)]">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">{cert.course?.title || "Course"}</h4>
              <p className="text-sm text-white/50">Certificate #{cert.certificate_number}</p>
              <p className="text-xs text-white/40">
                Issued on {new Date(cert.issued_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors">
            <Download className="w-4 h-4" />
            Download
          </button>
        </GlassCard>
      ))}
    </div>
  );
};

const AssignmentsTab = () => (
  <div className="max-w-4xl mx-auto">
    <GlassCard strong className="py-20 text-center border-dashed border-2 border-white/10">
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckSquare className="w-10 h-10 text-white/20" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">All caught up!</h3>
      <p className="text-[var(--color-text-secondary)]">
        You have no pending assignments at the moment.
      </p>
    </GlassCard>
  </div>
);

const CoursesTab = ({
  enrollments,
  loading,
  onUpdateProgress,
}: {
  enrollments: Enrollment[];
  loading: boolean;
  onUpdateProgress: (id: string, progress: number) => void;
}) => {
  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" />
        </div>
      </div>
    );
  if (enrollments.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <GlassCard strong className="py-16 text-center border-dashed border-2 border-white/10">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white/20" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No enrolled courses</h3>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Browse our programs and enroll to start learning.
          </p>
          <Link href="/courses">
            <GoldButton>Browse Courses</GoldButton>
          </Link>
        </GlassCard>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">My Courses</h3>
      {enrollments.map((e) => (
        <GlassCard key={e.id} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-white text-lg">{e.course?.title || "Unknown"}</h4>
              <p className="text-sm text-white/50">
                {e.course?.duration} &middot; {e.course?.difficulty}
              </p>
            </div>
            <span
              className={
                e.status === "completed"
                  ? "px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400"
                  : "px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400"
              }
            >
              {e.status === "completed" ? "Completed" : "Active"}
            </span>
          </div>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">Progress</span>
              <span className="text-white font-bold">{e.progress}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-3">
              <div
                className="bg-[var(--gold)] h-3 rounded-full transition-all"
                style={{ width: e.progress + "%" }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input
              type="range"
              min="0"
              max="100"
              value={e.progress}
              onChange={(ev) => onUpdateProgress(e.id, parseInt(ev.target.value))}
              className="flex-1 accent-[var(--gold)]"
              aria-label={"Progress for " + (e.course?.title || "course")}
            />
            <span className="text-sm text-white/60 w-12 text-right">{e.progress}%</span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

const ProfileTab = ({
  fullName,
  username,
  bio,
  email,
  initials,
  setFullName,
  setUsername,
  setBio,
  onSave,
  saving,
}: {
  fullName: string;
  username: string;
  bio: string;
  email: string;
  initials: string;
  setFullName: (v: string) => void;
  setUsername: (v: string) => void;
  setBio: (v: string) => void;
  onSave: (e: React.FormEvent) => void;
  saving: boolean;
}) => (
  <div className="max-w-3xl mx-auto">
    <GlassCard className="p-6 sm:p-8 border-[var(--gold)]/10">
      <div className="flex items-center gap-6 mb-10 pb-8 border-b border-white/10">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-700 flex items-center justify-center text-black font-bold text-2xl sm:text-3xl shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 truncate">
            {fullName || "Student"}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-sm truncate">{email}</p>
        </div>
      </div>
      <form className="space-y-6" onSubmit={onSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="profile-name" className="text-sm font-medium text-white/60">
              Full Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="profile-username" className="text-sm font-medium text-white/60">
              Username
            </label>
            <input
              id="profile-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors outline-none"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="profile-email" className="text-sm font-medium text-white/60">
            Email (read-only)
          </label>
          <input
            id="profile-email"
            type="email"
            disabled
            value={email}
            className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-white/40 outline-none cursor-not-allowed"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="profile-bio" className="text-sm font-medium text-white/60">
            Bio
          </label>
          <textarea
            id="profile-bio"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors outline-none resize-none"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>
        <div className="pt-4 flex justify-end">
          <GoldButton type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </GoldButton>
        </div>
      </form>
    </GlassCard>
  </div>
);
