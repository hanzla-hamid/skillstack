import React, { useState, useEffect } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { Logo } from "@/components/layout/Logo";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Award,
  Settings,
  LogOut,
  Search,
  Mail,
  Trash2,
  CheckCircle,
  XCircle,
  UserCheck,
  Film,
  ClipboardList,
} from "lucide-react";

import { GlassCard } from "@/components/shared/GlassCard";
import { GoldButton } from "@/components/shared/buttons";
import { AdminVideos } from "@/components/admin/AdminVideos";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import {
  supabase,
  type Profile,
  type Course,
  type Certificate,
  type ContactMessage,
} from "@/lib/supabase";

type Application = {
  id: string;
  kind: "admission" | "scholarship" | "inquiry";
  full_name: string;
  email: string;
  phone: string;
  city: string | null;
  program: string;
  mode: string | null;
  scholarship_type: string | null;
  topic: string | null;
  message: string | null;
  status: "new" | "contacted" | "accepted" | "rejected" | "archived";
  created_at: string;
};

export default function AdminPage() {
  const [location, setLocation] = useLocation();
  const { user, profile, isAdmin, loading } = useAuth();
  const { toast } = useToast();
  const currentTab = location.replace("/admin", "") || "/";

  const [users, setUsers] = useState<Profile[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [certificates, setCertificates] = useState<(Certificate & { profile?: Profile })[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      setLocation("/dashboard");
    }
  }, [loading, user, isAdmin, setLocation]);

  useEffect(() => {
    if (!user || !isAdmin) return;
    (async () => {
      setDataLoading(true);
      const [
        { data: usersData },
        { data: coursesData },
        { data: certData },
        { data: msgData },
        { data: appData },
      ] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("courses").select("*").order("created_at", { ascending: false }),
        supabase
          .from("certificates")
          .select("*, course:courses(*), profile:profiles(*)")
          .order("issued_at", { ascending: false }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        supabase
          .from("admissions_applications")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);
      setUsers((usersData || []) as Profile[]);
      setCourses((coursesData || []) as Course[]);
      setCertificates((certData || []) as unknown as (Certificate & { profile?: Profile })[]);
      setMessages((msgData || []) as ContactMessage[]);
      setApplications((appData || []) as Application[]);
      setDataLoading(false);
    })();
  }, [user, isAdmin]);

  const handleApplicationStatus = async (id: string, status: Application["status"]) => {
    const { error } = await supabase
      .from("admissions_applications")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const handleDeleteApplication = async (id: string) => {
    const { error } = await supabase.from("admissions_applications").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    setApplications((prev) => prev.filter((a) => a.id !== id));
    toast({ title: "Application deleted" });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setLocation("/");
  };

  const handleMarkMessageRead = async (id: string, isRead: boolean) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: !isRead })
      .eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: !isRead } : m)));
  };

  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    setMessages((prev) => prev.filter((m) => m.id !== id));
    toast({ title: "Message deleted" });
  };

  const handleToggleAdmin = async (userId: string, currentRole: string) => {
    const makeAdmin = currentRole !== "admin";
    // Roles live in a separate table; only an existing admin can change them.
    const { error } = await supabase.rpc("set_admin", { _user_id: userId, _make_admin: makeAdmin });
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    const newRole = makeAdmin ? "admin" : "student";
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    toast({ title: "User role updated", description: `User is now ${newRole}.` });
  };

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" />
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(
    (u) =>
      !search ||
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.username?.toLowerCase().includes(search.toLowerCase()),
  );
  const filteredMessages = messages.filter(
    (m) =>
      !search ||
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()),
  );
  const filteredApplications = applications.filter((a) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      a.full_name?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q) ||
      a.program?.toLowerCase().includes(q)
    );
  });

  const navItems = [
    { label: "Overview", href: "/", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Users", href: "/users", icon: <Users className="w-5 h-5" /> },
    { label: "Courses", href: "/courses", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Certificates", href: "/certificates", icon: <Award className="w-5 h-5" /> },
    { label: "Videos", href: "/videos", icon: <Film className="w-5 h-5" /> },
    { label: "Messages", href: "/messages", icon: <Mail className="w-5 h-5" /> },
    { label: "Admissions", href: "/admissions", icon: <ClipboardList className="w-5 h-5" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col shrink-0 md:h-screen md:sticky md:top-0 z-20">
        <div className="p-6 border-b border-white/5">
          <Logo scrolled />
          <div className="mt-2 text-xs font-bold text-red-500 uppercase tracking-widest px-1">
            Admin Panel
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive =
              currentTab === item.href || (item.href !== "/" && currentTab.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={`/admin${item.href === "/" ? "" : item.href}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : "text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/5">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors mb-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            User Dashboard
          </Link>
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
        <header className="h-20 border-b border-white/5 bg-[var(--color-surface)]/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
          <h1 className="text-2xl font-display font-bold text-white capitalize">
            {currentTab === "/" ? "System Overview" : currentTab.replace("/", "")}
          </h1>
          <div className="relative w-64 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-500/50"
            />
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full">
          {currentTab === "/" && (
            <AdminOverview
              users={users}
              courses={courses}
              certificates={certificates}
              messages={messages}
              loading={dataLoading}
            />
          )}
          {currentTab === "/users" && (
            <AdminUsers
              users={filteredUsers}
              loading={dataLoading}
              onToggleAdmin={handleToggleAdmin}
            />
          )}
          {currentTab === "/courses" && <AdminCourses courses={courses} loading={dataLoading} />}
          {currentTab === "/certificates" && (
            <AdminCertificates certificates={certificates} loading={dataLoading} />
          )}
          {currentTab === "/videos" && <AdminVideos userId={user?.id} />}
          {currentTab === "/messages" && (
            <AdminMessages
              messages={filteredMessages}
              loading={dataLoading}
              onMarkRead={handleMarkMessageRead}
              onDelete={handleDeleteMessage}
            />
          )}
          {currentTab === "/admissions" && (
            <AdminApplications
              applications={filteredApplications}
              loading={dataLoading}
              onStatus={handleApplicationStatus}
              onDelete={handleDeleteApplication}
            />
          )}
          {currentTab === "/settings" && (
            <AdminSettings applicationCount={applications.length} userCount={users.length} />
          )}
        </div>
      </main>
    </div>
  );
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon?: React.ReactNode;
}) => (
  <GlassCard className="p-6">
    <div className="flex items-start justify-between mb-4">
      <h4 className="text-[var(--color-text-secondary)] text-sm font-medium">{title}</h4>
      {icon}
    </div>
    <div className="text-3xl font-display font-bold text-white mb-1">{value}</div>
    <div className="text-xs text-white/40">{subtitle}</div>
  </GlassCard>
);

const AdminOverview = ({
  users,
  courses,
  certificates,
  messages,
  loading,
}: {
  users: Profile[];
  courses: Course[];
  certificates: Certificate[];
  messages: ContactMessage[];
  loading: boolean;
}) => {
  const recentUsers = users.slice(0, 5);
  const unreadMessages = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={loading ? "..." : String(users.length)}
          subtitle={`${users.filter((u) => u.role === "admin").length} admins`}
          icon={<Users className="w-5 h-5 text-blue-400" />}
        />
        <StatCard
          title="Active Courses"
          value={loading ? "..." : String(courses.length)}
          subtitle={`${courses.filter((c) => c.status === "Available").length} available`}
          icon={<BookOpen className="w-5 h-5 text-[var(--gold)]" />}
        />
        <StatCard
          title="Certificates Issued"
          value={loading ? "..." : String(certificates.length)}
          subtitle="Total verified"
          icon={<Award className="w-5 h-5 text-green-400" />}
        />
        <StatCard
          title="Unread Messages"
          value={loading ? "..." : String(unreadMessages)}
          subtitle={`${messages.length} total`}
          icon={<Mail className="w-5 h-5 text-red-400" />}
        />
      </div>

      <GlassCard className="p-0 border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Recent Signups</h3>
        </div>
        {recentUsers.length === 0 ? (
          <div className="p-12 text-center text-[var(--color-text-secondary)]">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No user data available.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {recentUsers.map((u) => (
              <div
                key={u.id}
                className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-700 flex items-center justify-center text-black font-bold">
                    {(u.full_name || u.username || "?").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {u.full_name || u.username || "Unknown"}
                    </div>
                    <div className="text-xs text-white/40">
                      Joined {new Date(u.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${u.role === "admin" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`}
                >
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
};

const AdminUsers = ({
  users,
  loading,
  onToggleAdmin,
}: {
  users: Profile[];
  loading: boolean;
  onToggleAdmin: (id: string, role: string) => void;
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

  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-bold text-white">All Users ({users.length})</h3>
      </div>
      <div className="divide-y divide-white/5">
        {users.map((u) => (
          <div
            key={u.id}
            className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-700 flex items-center justify-center text-black font-bold">
                {(u.full_name || u.username || "?").charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-white">{u.full_name || "Unknown"}</div>
                <div className="text-xs text-white/40">
                  @{u.username || "user"} &middot; {u.xp} XP
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-2 py-1 text-xs rounded-full ${u.role === "admin" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`}
              >
                {u.role}
              </span>
              <button
                onClick={() => onToggleAdmin(u.id, u.role)}
                className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 inline mr-1" />
                {u.role === "admin" ? "Make Student" : "Make Admin"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

const AdminCourses = ({ courses, loading }: { courses: Course[]; loading: boolean }) => {
  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--gold)] animate-spin" />
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.map((c) => (
        <GlassCard key={c.id} className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-white">{c.title}</h4>
            <span
              className={`px-2 py-1 text-xs rounded-full ${c.status === "Available" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}
            >
              {c.status}
            </span>
          </div>
          <p className="text-sm text-white/60 mb-3">{c.description}</p>
          <div className="flex gap-4 text-xs text-white/40">
            <span>{c.duration}</span>
            <span>{c.difficulty}</span>
            <span>{c.category}</span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

const AdminCertificates = ({
  certificates,
  loading,
}: {
  certificates: (Certificate & { profile?: Profile })[];
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
      <GlassCard className="py-16 text-center">
        <Award className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <p className="text-[var(--color-text-secondary)]">No certificates issued yet.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-bold text-white">All Certificates ({certificates.length})</h3>
      </div>
      <div className="divide-y divide-white/5">
        {certificates.map((c) => (
          <div
            key={c.id}
            className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-white">{c.course?.title || "Course"}</div>
                <div className="text-xs text-white/40">
                  {c.profile?.full_name || "Unknown"} &middot; #{c.certificate_number}
                </div>
              </div>
            </div>
            <div className="text-xs text-white/40">
              {new Date(c.issued_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

const AdminMessages = ({
  messages,
  loading,
  onMarkRead,
  onDelete,
}: {
  messages: ContactMessage[];
  loading: boolean;
  onMarkRead: (id: string, isRead: boolean) => void;
  onDelete: (id: string) => void;
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

  if (messages.length === 0) {
    return (
      <GlassCard className="py-16 text-center">
        <Mail className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <p className="text-[var(--color-text-secondary)]">No messages yet.</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <GlassCard key={m.id} className={`p-5 ${!m.is_read ? "border-[var(--gold)]/20" : ""}`}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white">{m.name}</h4>
                {!m.is_read && (
                  <span className="px-2 py-0.5 text-xs bg-[var(--gold)]/20 text-[var(--gold)] rounded-full">
                    New
                  </span>
                )}
              </div>
              <p className="text-sm text-white/50">
                {m.email} {m.phone && `&middot; ${m.phone}`}
              </p>
              {m.program && (
                <p className="text-xs text-[var(--gold)] mt-1">Interested in: {m.program}</p>
              )}
            </div>
            <div className="text-xs text-white/40">{new Date(m.created_at).toLocaleString()}</div>
          </div>
          <p className="text-white/80 text-sm mb-4 bg-black/30 rounded-lg p-3">{m.message}</p>
          <div className="flex gap-2">
            <button
              onClick={() => onMarkRead(m.id, m.is_read)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              {m.is_read ? (
                <XCircle className="w-3.5 h-3.5" />
              ) : (
                <CheckCircle className="w-3.5 h-3.5" />
              )}
              {m.is_read ? "Mark Unread" : "Mark Read"}
            </button>
            <button
              onClick={() => onDelete(m.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-500/5 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

const STATUSES: Application["status"][] = ["new", "contacted", "accepted", "rejected", "archived"];

const statusStyle = (status: Application["status"]) =>
  status === "new"
    ? "bg-[var(--gold)]/15 text-[var(--gold)]"
    : status === "accepted"
      ? "bg-green-500/10 text-green-400"
      : status === "rejected"
        ? "bg-red-500/10 text-red-400"
        : status === "contacted"
          ? "bg-blue-500/10 text-blue-400"
          : "bg-white/10 text-white/60";

const AdminApplications = ({
  applications,
  loading,
  onStatus,
  onDelete,
}: {
  applications: Application[];
  loading: boolean;
  onStatus: (id: string, status: Application["status"]) => void;
  onDelete: (id: string) => void;
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

  if (applications.length === 0) {
    return (
      <GlassCard className="py-16 text-center">
        <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <p className="text-[var(--color-text-secondary)]">No applications yet.</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((a) => (
        <GlassCard
          key={a.id}
          className={`p-5 ${a.status === "new" ? "border-[var(--gold)]/20" : ""}`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white">{a.full_name}</h4>
                <span className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-white/60 capitalize">
                  {a.kind}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full capitalize ${statusStyle(a.status)}`}
                >
                  {a.status}
                </span>
              </div>
              <p className="text-sm text-white/50">
                {a.email}
                {a.phone ? ` · ${a.phone}` : ""}
                {a.city ? ` · ${a.city}` : ""}
              </p>
              <p className="text-xs text-[var(--gold)] mt-1">
                Program: {a.program}
                {a.mode ? ` · ${a.mode}` : ""}
                {a.scholarship_type ? ` · ${a.scholarship_type} based` : ""}
                {a.topic ? ` · ${a.topic}` : ""}
              </p>
            </div>
            <div className="text-xs text-white/40">{new Date(a.created_at).toLocaleString()}</div>
          </div>
          {a.message && (
            <p className="text-white/80 text-sm mb-4 bg-black/30 rounded-lg p-3">{a.message}</p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor={`status-${a.id}`} className="text-xs text-white/40">
              Status
            </label>
            <select
              id={`status-${a.id}`}
              value={a.status}
              onChange={(e) => onStatus(a.id, e.target.value as Application["status"])}
              className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[var(--gold)]/50"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s} className="bg-[#0a0a0a] capitalize">
                  {s}
                </option>
              ))}
            </select>
            <a
              href={`mailto:${a.email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Reply
            </a>
            <button
              onClick={() => onDelete(a.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-500/5 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

const AdminSettings = ({
  applicationCount,
  userCount,
}: {
  applicationCount: number;
  userCount: number;
}) => (
  <GlassCard className="p-8 max-w-2xl">
    <h3 className="text-lg font-bold text-white mb-6">System</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
        <div>
          <div className="font-medium text-white">Registered users</div>
          <div className="text-sm text-white/40">Accounts created through signup</div>
        </div>
        <div className="font-display text-xl font-bold text-[var(--gold)]">{userCount}</div>
      </div>
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
        <div>
          <div className="font-medium text-white">Admission submissions</div>
          <div className="text-sm text-white/40">Admission, scholarship and inquiry forms</div>
        </div>
        <div className="font-display text-xl font-bold text-[var(--gold)]">{applicationCount}</div>
      </div>
      <div className="p-4 bg-white/5 rounded-xl">
        <div className="font-medium text-white">Admin access</div>
        <div className="text-sm text-white/40 mt-1">
          Admin rights are stored separately from profiles and can only be granted by an existing
          admin from the Users tab. Nobody can promote their own account.
        </div>
      </div>
    </div>
  </GlassCard>
);
