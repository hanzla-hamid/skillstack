import React, { useState, useEffect } from "react";
import { useRoute, Link, useLocation } from "@/lib/router-compat";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionComponents";
import { GlassCard } from "@/components/shared/GlassCard";
import { GoldButton, OutlineButton } from "@/components/shared/buttons";
import {
  Clock,
  BarChart,
  CheckCircle2,
  ChevronDown,
  Award,
  Briefcase,
  FileCode2,
} from "lucide-react";
import { supabase, type Course } from "@/lib/supabase";
import { PROGRAMS } from "@/lib/constants";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

/** Local program imagery (public/images/homepage) */
const COURSE_IMAGES: Record<string, string> = {
  "web-development": "/images/homepage/webdevelopment.png",
  "graphic-designing": "/images/homepage/graphics.jpg",
  "digital-marketing": "/images/homepage/digitalmarketing.jpg",
  "e-commerce": "/images/homepage/ecommerce.jpg",
};

export default function CourseDetailPage() {
  const [, params] = useRoute("/courses/:slug");
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModule, setOpenModule] = useState<number>(0);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (!params?.slug) return;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", params.slug)
        .maybeSingle();

      if (data) {
        setCourse(data as Course);

        if (user) {
          const { data: enrollment } = await supabase
            .from("enrollments")
            .select("id")
            .eq("user_id", user.id)
            .eq("course_id", (data as Course).id)
            .maybeSingle();
          setEnrolled(!!enrollment);
        }
      } else {
        const fallback = PROGRAMS.find((p) => p.slug === params.slug);
        if (fallback) {
          setCourse({
            id: "static-" + fallback.slug,
            slug: fallback.slug,
            title: fallback.title,
            description: fallback.description,
            duration: fallback.duration,
            difficulty: fallback.difficulty,
            projects: fallback.projects,
            category: fallback.category,
            status: fallback.status,
            features: fallback.features,
            curriculum: fallback.curriculum,
            created_at: "",
          });
        }
      }
      setLoading(false);
    })();
  }, [params?.slug, user]);

  const handleEnroll = async () => {
    if (!user) {
      setLocation("/register");
      return;
    }
    if (!course) return;

    setEnrolling(true);
    const { error } = await supabase.from("enrollments").insert({
      user_id: user.id,
      course_id: course.id,
    });

    if (error) {
      if (error.code === "23505") {
        setEnrolled(true);
        toast({
          title: "Already enrolled",
          description: "You are already enrolled in this course.",
        });
      } else {
        toast({ title: "Enrollment failed", description: error.message, variant: "destructive" });
      }
    } else {
      setEnrolled(true);
      toast({
        title: "Enrolled successfully!",
        description: `You have enrolled in ${course.title}.`,
      });
    }
    setEnrolling(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/40">Loading course...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-6xl font-display font-bold mb-4">404</h1>
          <p className="text-xl text-[var(--color-text-secondary)] mb-8">Course not found</p>
          <Link href="/courses">
            <GoldButton>Browse All Courses</GoldButton>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <PageHero
        eyebrow={`${course.category} Program`}
        title={course.title}
        subtitle={course.description}
      />

      <SectionWrapper className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            {COURSE_IMAGES[course.slug] && (
              <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                <img
                  src={COURSE_IMAGES[course.slug]}
                  alt={`${course.title} — SkillStack program`}
                  width={1280}
                  height={640}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <GlassCard className="p-4 text-center">
                <Clock className="w-6 h-6 text-[var(--gold)] mx-auto mb-2" />
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                  Duration
                </div>
                <div className="font-semibold text-white">{course.duration}</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <BarChart className="w-6 h-6 text-[var(--gold)] mx-auto mb-2" />
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                  Level
                </div>
                <div className="font-semibold text-white">{course.difficulty}</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <FileCode2 className="w-6 h-6 text-[var(--gold)] mx-auto mb-2" />
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                  Projects
                </div>
                <div className="font-semibold text-white">{course.projects}</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <Award className="w-6 h-6 text-[var(--gold)] mx-auto mb-2" />
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                  Certificate
                </div>
                <div className="font-semibold text-white">Included</div>
              </GlassCard>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">What You'll Learn</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-[var(--color-surface-card)] p-4 rounded-xl border border-white/5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[var(--gold)] shrink-0" />
                    <span className="text-white/90 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {course.curriculum && course.curriculum.length > 0 && (
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  Curriculum Outline
                </h3>
                <div className="space-y-4">
                  {course.curriculum.map((mod, idx) => (
                    <GlassCard
                      key={idx}
                      className={`p-0 overflow-hidden transition-colors ${openModule === idx ? "border-[var(--gold)]/30" : ""}`}
                    >
                      <button
                        className="w-full p-6 flex items-center justify-between text-left"
                        onClick={() => setOpenModule(openModule === idx ? -1 : idx)}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-white/10 font-display w-8">
                            0{idx + 1}
                          </span>
                          <span
                            className={`font-semibold text-lg ${openModule === idx ? "text-[var(--gold)]" : "text-white"}`}
                          >
                            {mod.module}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${openModule === idx ? "rotate-180 text-[var(--gold)]" : "text-white/50"}`}
                        />
                      </button>

                      <div
                        className={`px-6 overflow-hidden transition-all duration-300 ${openModule === idx ? "max-h-[2000px] pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="pl-12 space-y-3">
                          {mod.topics.map((topic, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 text-[var(--color-text-secondary)]"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]/50" />
                              {topic}
                            </div>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <GlassCard
                strong
                className="p-8 border-[var(--gold)]/20 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/10 blur-[50px]" />

                {course.category === "Online" ? (
                  <>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      Watch on demand
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-sm mb-6">
                      Stream every recorded lesson for this track in our online video library.
                    </p>
                    <Link href="/library">
                      <GoldButton className="w-full">Open Video Library</GoldButton>
                    </Link>
                  </>
                ) : enrolled ? (
                  <>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      You're Enrolled!
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-sm mb-6">
                      Access this course from your dashboard and start learning.
                    </p>
                    <Link href="/dashboard/courses">
                      <GoldButton className="w-full">Go to My Courses</GoldButton>
                    </Link>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      Enrollment Open
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-sm mb-6">
                      Next batch starts soon. Limited seats available.
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <span className="text-white/60 text-sm">Format</span>
                        <span className="font-semibold text-white">Physical Classes</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <span className="text-white/60 text-sm">Location</span>
                        <span className="font-semibold text-white">Rawalpindi Campus</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <span className="text-white/60 text-sm">Schedule</span>
                        <span className="font-semibold text-white">3 Days / Week</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <GoldButton className="w-full" onClick={handleEnroll} disabled={enrolling}>
                        {enrolling ? "Enrolling..." : user ? "Enroll Now" : "Sign Up to Enroll"}
                      </GoldButton>
                      <OutlineButton className="w-full bg-white/5">Download Syllabus</OutlineButton>
                    </div>
                  </>
                )}

                <p className="text-center text-xs text-white/40 mt-4 flex items-center justify-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Career support included
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}
