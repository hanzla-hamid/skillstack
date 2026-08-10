import React, { useEffect, useMemo, useState } from "react";
import { Link } from "@/lib/router-compat";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionComponents";
import { GlassCard } from "@/components/shared/GlassCard";
import { GoldButton, OutlineButton } from "@/components/shared/buttons";
import { LIBRARY_RESOURCES } from "@/lib/constants";
import { fetchVideos, getVideoUrl, type CourseVideo } from "@/lib/videos";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/lib/animations";
import {
  BookOpen,
  Video,
  BrainCircuit,
  LineChart,
  PenTool,
  Briefcase,
  Megaphone,
  Palette,
  Sparkles,
  PlayCircle,
  Lock,
  X,
  Upload,
} from "lucide-react";

const getIconForCategory = (title: string) => {
  if (title.includes("Python")) return <BookOpen className="w-6 h-6" />;
  if (title.includes("Video") || title.includes("CapCut")) return <Video className="w-6 h-6" />;
  if (title.includes("Intelligence") || title.includes("Prompt"))
    return <BrainCircuit className="w-6 h-6" />;
  if (title.includes("Excel")) return <LineChart className="w-6 h-6" />;
  if (title.includes("Content")) return <PenTool className="w-6 h-6" />;
  if (title.includes("Freelancing")) return <Briefcase className="w-6 h-6" />;
  if (title.includes("Social")) return <Megaphone className="w-6 h-6" />;
  if (title.includes("Canva")) return <Palette className="w-6 h-6" />;
  return <Sparkles className="w-6 h-6" />;
};

export default function LibraryPage() {
  const { user, profile, isAdmin } = useAuth();
  const [videos, setVideos] = useState<CourseVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<CourseVideo | null>(null);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchVideos().then((v) => {
      setVideos(v);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
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

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(videos.map((v) => v.category)))],
    [videos],
  );
  const shown = filter === "All" ? videos : videos.filter((v) => v.category === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <PageHero
        eyebrow="Online Courses"
        title="Video"
        highlight="Library"
        subtitle="Watch full lessons on demand. New recordings are added by our instructors as each module is delivered."
      />

      <SectionWrapper className="pt-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
            Video Lessons
            <span className="text-sm font-normal text-[var(--color-text-secondary)]">
              ({loading ? "…" : videos.length})
            </span>
          </h2>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === cat
                    ? "bg-[var(--gold)] text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
            {isAdmin && (
              <Link href="/admin/videos">
                <OutlineButton className="px-4 py-2 h-auto text-sm whitespace-nowrap">
                  <Upload className="w-4 h-4" /> Upload
                </OutlineButton>
              </Link>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-white/[0.03] border border-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : shown.length === 0 ? (
          <GlassCard className="text-center py-16 mb-20">
            <div className="w-14 h-14 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] mx-auto mb-5">
              <Video className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              No lessons published yet
            </h3>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              Recordings appear here as soon as an instructor uploads them.
            </p>
            {isAdmin && (
              <Link href="/admin/videos" className="inline-block mt-6">
                <GoldButton>Upload the first lesson</GoldButton>
              </Link>
            )}
          </GlassCard>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          >
            {shown.map((video) => (
              <motion.div key={video.id} variants={slideUp}>
                <GlassCard hover className="h-full flex flex-col overflow-hidden group p-0">
                  <button
                    type="button"
                    onClick={() => user && setActive(video)}
                    className="relative aspect-video w-full bg-black overflow-hidden text-left"
                  >
                    {video.thumbnail_url ? (
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-black/60 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] group-hover:scale-110 transition-transform">
                        {user ? <PlayCircle className="w-7 h-7" /> : <Lock className="w-6 h-6" />}
                      </div>
                    </div>
                    {video.duration && (
                      <span className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-[11px] text-white/80 font-medium">
                        {video.duration}
                      </span>
                    )}
                  </button>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-semibold text-[var(--gold)] tracking-wider uppercase mb-2">
                      {video.category}
                    </span>
                    <h3 className="text-lg font-display font-semibold text-white mb-2">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-[var(--color-text-secondary)] text-sm flex-1">
                        {video.description}
                      </p>
                    )}
                    <div className="mt-5">
                      {user ? (
                        <button
                          onClick={() => setActive(video)}
                          className="text-sm font-medium text-[var(--gold)] hover:underline flex items-center gap-2"
                        >
                          <PlayCircle className="w-4 h-4" /> Watch lesson
                        </button>
                      ) : (
                        <Link
                          href="/login"
                          className="text-sm font-medium text-white/60 hover:text-white flex items-center gap-2"
                        >
                          <Lock className="w-4 h-4" /> Sign in to watch
                        </Link>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Self-paced tracks */}
        <h2 className="text-2xl font-display font-bold text-white mb-8">Self-Paced Tracks</h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {LIBRARY_RESOURCES.map((item: (typeof LIBRARY_RESOURCES)[number], idx: number) => (
            <motion.div key={idx} variants={slideUp}>
              <GlassCard hover className="h-full flex flex-col relative overflow-hidden group">
                <div className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-[var(--gold)]/10 border border-[var(--gold)]/20 rounded-full text-[var(--gold)]">
                  {item.lessons} lessons
                </div>

                <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] mb-6 group-hover:scale-110 transition-transform">
                  {getIconForCategory(item.title)}
                </div>

                <div className="mb-2">
                  <span className="text-xs font-semibold text-[var(--gold)] tracking-wider uppercase">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-[var(--gold)] transition-colors">
                  {item.title}
                </h3>

                <p className="text-[var(--color-text-secondary)] text-sm mb-6 flex-1">
                  {item.description}
                </p>

                <div className="mt-auto flex items-center justify-between text-xs text-white/50">
                  <span>{item.duration}</span>
                  <span>{item.difficulty}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-display font-bold text-white">{active.title}</h3>
              <button
                onClick={() => setActive(null)}
                className="text-white/60 hover:text-white p-2"
                aria-label="Close video"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/10">
              {activeUrl ? (
                <video src={activeUrl} controls autoPlay className="w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">
                  Loading video…
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
