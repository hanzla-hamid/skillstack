import React, { useState } from "react";
import { Link } from "@/lib/router-compat";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionComponents";
import { GlassCard } from "@/components/shared/GlassCard";
import { GoldButton, OutlineButton } from "@/components/shared/buttons";
import { PROGRAMS } from "@/lib/constants";
import {
  Search,
  Filter,
  MonitorPlay,
  BookOpen,
  Zap,
  Laptop,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, slideUp } from "@/lib/animations";

const iconMap = [MonitorPlay, BookOpen, Zap, Laptop];

/** Local program imagery (public/images/homepage) */
const COURSE_IMAGES: Record<string, string> = {
  "web-development": "/images/homepage/webdevelopment.png",
  "graphic-designing": "/images/homepage/graphics.jpg",
  "digital-marketing": "/images/homepage/digitalmarketing.jpg",
  "e-commerce": "/images/homepage/ecommerce.jpg",
};

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredPrograms = PROGRAMS.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const physicalCourses = filteredPrograms.filter((p) => p.category === "Physical");
  const onlineCourses = filteredPrograms.filter((p) => p.category === "Online");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <PageHero
        eyebrow="All Courses"
        title="Explore Our"
        highlight="Premium Programs"
        subtitle="Discover industry-aligned courses designed to build your portfolio and career."
      />

      <SectionWrapper className="pt-0">
        {/* Featured Banner */}
        <div className="relative rounded-3xl overflow-hidden glass-strong border-[var(--gold)]/20 p-8 md:p-12 mb-16 flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--gold)]/5 blur-[100px] pointer-events-none" />

          <div className="flex-1 relative z-10">
            <span className="px-3 py-1 bg-[var(--gold)]/10 border border-[var(--gold)]/20 rounded-full text-[var(--gold)] text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Featured Program
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Web Development Masterclass
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg mb-6 max-w-xl">
              Master full-stack development with modern frameworks (React, Next.js, Node.js),
              real-world projects, and production-grade code.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex flex-col">
                <span className="text-white/50 text-xs uppercase tracking-wider">Duration</span>
                <span className="font-semibold text-white">6 Months</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/50 text-xs uppercase tracking-wider">Projects</span>
                <span className="font-semibold text-white">12+ Real Projects</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/50 text-xs uppercase tracking-wider">Level</span>
                <span className="font-semibold text-white">Beginner to Pro</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/courses/web-development">
                <GoldButton>View Curriculum</GoldButton>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/3 aspect-square max-w-sm shrink-0 relative z-10">
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-black to-zinc-900 border border-white/10 p-6 flex flex-col relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/20 blur-[50px]" />
              <div className="flex items-center gap-2 text-white/50 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-4 font-mono text-sm text-[var(--gold)]/70">
                <p>
                  <span className="text-blue-400">const</span>{" "}
                  <span className="text-yellow-200">career</span> ={" "}
                  <span className="text-purple-400">new</span>{" "}
                  <span className="text-green-400">Developer</span>();
                </p>
                <p>
                  <span className="text-yellow-200">career</span>.
                  <span className="text-blue-300">learn</span>(
                  <span className="text-orange-300">"React"</span>);
                </p>
                <p>
                  <span className="text-yellow-200">career</span>.
                  <span className="text-blue-300">build</span>(
                  <span className="text-orange-300">"Portfolio"</span>);
                </p>
                <p className="text-green-400 mt-4">// Success!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 bg-black/40 p-4 rounded-2xl border border-white/5">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {["All", "Physical", "Online"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? "bg-[var(--gold)] text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {cat} Courses
              </button>
            ))}
          </div>
        </div>

        {/* Physical Courses List */}
        {(categoryFilter === "All" || categoryFilter === "Physical") &&
          physicalCourses.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
                Physical Academy{" "}
                <span className="text-sm font-normal text-[var(--color-text-secondary)]">
                  ({physicalCourses.length})
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {physicalCourses.map((program, idx) => {
                  const Icon = iconMap[idx % iconMap.length];
                  return (
                    <GlassCard
                      key={program.slug}
                      hover
                      className="group relative overflow-hidden flex flex-col"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/5 blur-[50px] group-hover:bg-[var(--gold)]/10 transition-colors duration-500 rounded-bl-full" />

                      {COURSE_IMAGES[program.slug] && (
                        <div className="relative z-10 mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                          <img
                            src={COURSE_IMAGES[program.slug]}
                            alt={`${program.title} program at SkillStack`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] group-hover:scale-110 transition-transform duration-500">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="text-right">
                          <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                            Duration
                          </span>
                          <span className="inline-block px-3 py-1 bg-white/5 text-white text-xs font-semibold rounded-full border border-white/10">
                            {program.duration}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-[var(--gold)] transition-colors relative z-10">
                        {program.title}
                      </h4>

                      <p className="text-[var(--color-text-secondary)] mb-5 relative z-10">
                        {program.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                        {program.features?.map((f: string) => (
                          <span
                            key={f}
                            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70"
                          >
                            {f}
                          </span>
                        ))}
                      </div>

                      {/* Curriculum preview */}
                      {program.curriculum && (
                        <div className="mb-6 space-y-2 relative z-10">
                          <span className="text-xs uppercase tracking-wider text-white/40">
                            Curriculum
                          </span>
                          {program.curriculum.map(
                            (mod: { module: string; topics: string[] }, i: number) => (
                              <div key={mod.module} className="flex gap-3 items-start text-sm">
                                <span className="w-5 h-5 shrink-0 mt-0.5 rounded-md bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold)] text-[10px] font-bold flex items-center justify-center">
                                  {i + 1}
                                </span>
                                <span className="text-white/80">
                                  <span className="font-medium text-white">{mod.module}</span>
                                  <span className="text-white/50"> — {mod.topics.join(", ")}</span>
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      )}

                      {/* Meta grid */}
                      <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
                        {[
                          { label: "Duration", value: program.duration },
                          { label: "Projects", value: program.projects },
                          { label: "Level", value: program.difficulty },
                        ].map((m) => (
                          <div
                            key={m.label}
                            className="rounded-xl bg-black/30 border border-white/5 px-3 py-2"
                          >
                            <div className="text-[10px] uppercase tracking-wider text-white/40">
                              {m.label}
                            </div>
                            <div className="text-sm font-medium text-white">{m.value}</div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto relative z-10">
                        <span className="text-sm text-white/60">On-campus • Rawalpindi</span>
                        <Link href={`/courses/${program.slug}`}>
                          <OutlineButton className="px-6 py-2 h-auto text-sm">
                            Course Details
                          </OutlineButton>
                        </Link>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          )}

        {/* Online Courses List */}
        {(categoryFilter === "All" || categoryFilter === "Online") && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <h3 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                Online Platform
                {onlineCourses.length > 0 && (
                  <span className="text-sm font-normal text-[var(--color-text-secondary)]">
                    ({onlineCourses.length})
                  </span>
                )}
              </h3>
              <Link href="/library">
                <OutlineButton className="px-6 py-2 h-auto text-sm">
                  <PlayCircle className="w-4 h-4" /> Open video library
                </OutlineButton>
              </Link>
            </div>

            {onlineCourses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {onlineCourses.map((program) => (
                  <Link key={program.slug} href="/library">
                    <div className="h-full bg-[var(--color-surface-card)] border border-white/5 hover:border-[var(--gold)]/30 rounded-2xl p-6 relative overflow-hidden group transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] mb-4">
                        <PlayCircle className="w-5 h-5" />
                      </div>
                      <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[var(--gold)] transition-colors">
                        {program.title}
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4">
                        {program.description}
                      </p>
                      <div className="text-xs font-medium text-white/60">{program.duration}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <GlassCard
              strong
              className="p-8 md:p-10 border-[var(--gold)]/20 relative overflow-hidden flex flex-col md:flex-row items-center gap-8"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-[var(--gold)]/10 blur-[90px] pointer-events-none" />
              <div className="flex-1 relative z-10">
                <h4 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                  Learn online, on your schedule
                </h4>
                <p className="text-[var(--color-text-secondary)] max-w-xl">
                  Every recorded lesson from our physical classrooms lands in the video library —
                  stream full modules, rewatch anything, and follow along with the same projects.
                </p>
              </div>
              <div className="relative z-10">
                <Link href="/library">
                  <GoldButton>
                    Watch lessons <ArrowRight className="w-4 h-4" />
                  </GoldButton>
                </Link>
              </div>
            </GlassCard>
          </div>
        )}

        {filteredPrograms.length === 0 && (
          <div className="text-center py-20 glass-card">
            <h3 className="text-2xl font-bold text-white mb-2">No courses found</h3>
            <p className="text-[var(--color-text-secondary)]">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategoryFilter("All");
              }}
              className="mt-4 text-[var(--gold)] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </SectionWrapper>

      <Footer />
    </div>
  );
}
