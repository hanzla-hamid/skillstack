import React, { useState } from "react";
import { Link } from "@/lib/router-compat";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper, SectionHeading, TrustBadge } from "@/components/shared/SectionComponents";
import { GlassCard } from "@/components/shared/GlassCard";
import { GoldButton, OutlineButton } from "@/components/shared/buttons";
import { ParticleCanvas } from "@/components/shared/ParticleCanvas";
import { DynamicBackground } from "@/components/shared/DynamicBackground";
import { PartnersSection } from "@/components/shared/PartnersSection";
import { QuickAccessSection } from "@/components/shared/QuickAccessSection";
import { slideUp, staggerContainer, staggerItem } from "@/lib/animations";
import { PROGRAMS, FAQS, BRAND } from "@/lib/constants";
import {
  MapPin,
  Layers,
  BookOpen,
  PlayCircle,
  MonitorPlay,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Laptop,
  Plus,
  Compass,
  GraduationCap,
  Hammer,
  FolderOpen,
  Briefcase,
  Users,
  Check,
} from "lucide-react";
const COURSE_IMAGES: Record<string, string> = {
  "web-development": "/images/homepage/webdevelopment.png",
  "graphic-designing": "/images/homepage/graphics.jpg",
  "digital-marketing": "/images/homepage/digitalmarketing.jpg",
  "e-commerce": "/images/homepage/ecommerce.jpg",
};

const PROGRAM_ICONS = [MonitorPlay, BookOpen, Zap, Laptop];

/** Editorial benefit pillars — descriptive only, no statistics or claims. */
const PILLARS = [
  {
    title: "Practical before theoretical",
    description:
      "Every module starts with something you make. Concepts are introduced where they are needed, not memorised in advance.",
  },
  {
    title: "Project-based by design",
    description:
      "Each program is structured around deliverables — a site, an identity system, a campaign, a store — that stay yours afterwards.",
  },
  {
    title: "A curriculum with a spine",
    description:
      "Modules build on each other in a fixed sequence, so nothing is skipped and nothing is repeated without reason.",
  },
  {
    title: "Guided, not automated",
    description:
      "Mentors review your work in person at the Rawalpindi campus and tell you what to change and why.",
  },
];

/** Five-stage journey. Outcomes are described as directions, never guarantees. */
const JOURNEY = [
  {
    step: "01",
    title: "Discover",
    icon: Compass,
    description:
      "Compare programs, sit in on the curriculum, and pick the track that matches where you want to work.",
  },
  {
    step: "02",
    title: "Learn",
    icon: GraduationCap,
    description:
      "Follow a structured, sequenced curriculum with mentors who review your work as you go.",
  },
  {
    step: "03",
    title: "Build",
    icon: Hammer,
    description:
      "Apply each module to a real deliverable instead of an exercise you throw away afterwards.",
  },
  {
    step: "04",
    title: "Showcase",
    icon: FolderOpen,
    description:
      "Finish with a portfolio you can send to anyone, plus a certificate with a verification ID.",
  },
  {
    step: "05",
    title: "Career",
    icon: Briefcase,
    description:
      "Take it toward freelancing, employment or your own venture, with guidance on how to present your work.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const physicalPrograms = PROGRAMS.filter((p) => p.category === "Physical");

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden border-b border-white/5 pb-16 pt-28 lg:pt-24">
        <DynamicBackground />
        <ParticleCanvas />

        <div className="absolute inset-0 grid-texture-fine radial-fade opacity-30 z-0" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left lg:col-span-7"
          >
            <motion.div variants={slideUp} className="mb-8 inline-flex">
              <div className="relative flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--gold)]" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-[var(--gold)]">
                  Applications Now Open
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={slideUp}
              className="mb-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl xl:text-[5rem]"
            >
              Skill<span className="gold-gradient-text">Stack</span>
              <span className="mt-4 block text-3xl leading-[1.15] text-white sm:text-4xl lg:text-5xl">
                From Learning
                <br className="hidden sm:block" /> to{" "}
                <span className="gold-gradient-text">Earning.</span>
              </span>
            </motion.h1>

            <motion.p
              variants={slideUp}
              className="mb-10 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]"
            >
              A premium hybrid learning academy in Rawalpindi. Web Development, Graphic Design,
              Digital Marketing and E-Commerce — taught through real projects and in-person
              mentorship.
            </motion.p>

            <motion.div
              variants={slideUp}
              className="mb-12 flex w-full flex-wrap items-center gap-4"
            >
              <Link href="/admissions">
                <GoldButton className="w-full sm:w-auto">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    Apply Now <ArrowRight className="h-5 w-5" />
                  </span>
                </GoldButton>
              </Link>
              <Link href="/courses">
                <OutlineButton className="w-full sm:w-auto">Explore Programs</OutlineButton>
              </Link>
            </motion.div>

            <motion.div variants={staggerContainer} className="flex flex-wrap gap-3">
              <TrustBadge icon={<MapPin className="h-4 w-4" />} label="Rawalpindi Campus" />
              <TrustBadge icon={<Layers className="h-4 w-4" />} label="Project-Based Curriculum" />
              <TrustBadge icon={<Users className="h-4 w-4" />} label="In-Person Mentorship" />
            </motion.div>
          </motion.div>

          {/* Hero visual — logo optically centred inside the rings */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:col-span-5 lg:block"
          >
            <div className="relative mx-auto w-full max-w-[36rem] pb-16">
              <div className="relative aspect-square w-full [perspective:1200px]">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute inset-[10%] animate-glow-pulse rounded-full bg-[var(--gold)]/10 blur-[100px]" />

                {/* Rotating rings, concentric with the logo */}
                <div className="absolute left-1/2 top-1/2 aspect-square w-full -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-[var(--gold)]/20" />
                <div className="absolute left-1/2 top-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-[var(--gold)]/15 [animation-direction:reverse]" />

                <motion.div
                  animate={{ rotateY: [-12, 12, -12], rotateX: [6, -6, 6], y: [0, -14, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 [transform-style:preserve-3d]"
                >
                  {/* Depth layers behind the logo for a 3D extruded feel */}
                  <img
                    src="/logo.png"
                    alt=""
                    aria-hidden
                    className="absolute left-1/2 top-1/2 h-full w-full object-contain opacity-25 blur-[2px] [transform:translate(-50%,-50%)_translateZ(-40px)_scale(1.2)]"
                  />
                  <img
                    src="/logo.png"
                    alt=""
                    aria-hidden
                    className="absolute left-1/2 top-1/2 h-full w-full object-contain opacity-40 blur-[1px] [transform:translate(-50%,-50%)_translateZ(-20px)_scale(1.17)]"
                  />
                  <img
                    src="/logo.png"
                    alt="SkillStack"
                    className="absolute left-1/2 top-1/2 h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(234,179,8,0.4)] [transform:translate(-50%,-50%)_translateZ(40px)_scale(1.15)]"
                  />
                </motion.div>
              </div>

              {/* Wordmark sits outside the ring box so it never shifts the logo */}
              <span className="absolute bottom-0 left-1/2 block -translate-x-1/2 whitespace-nowrap text-center font-display text-4xl font-bold tracking-tight xl:text-5xl">
                <span className="text-white">Skill</span>
                <span className="text-[var(--gold)]">Stack</span>
              </span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-60 md:flex">
          <span className="text-[10px] uppercase tracking-widest text-[var(--gold)]">Scroll</span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-[var(--gold)] p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]"
            />
          </div>
        </div>
      </section>

      {/* 2. PROGRAMS */}
      <SectionWrapper id="programs" className="relative overflow-hidden bg-[var(--color-surface)]">
        <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)]/5 blur-[120px]" />

        <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="mb-4 inline-block rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
              Programs
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Four tracks.
              <br />
              <span className="gold-gradient-text">One way of teaching.</span>
            </h2>
          </div>
          <p className="text-lg text-[var(--color-text-secondary)] lg:col-span-5">
            Each program runs on campus, follows a fixed module sequence, and ends with work you can
            show — not a transcript you have to explain.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {physicalPrograms.map((program, idx) => {
            const Icon = PROGRAM_ICONS[idx % PROGRAM_ICONS.length];
            const wide = idx % 3 === 0;
            return (
              <motion.div
                key={program.slug}
                variants={staggerItem}
                className={wide ? "md:col-span-2" : ""}
              >
                <Link
                  href={`/courses/${program.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[var(--color-surface-card)]/70 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-card-hover"
                >
                  <div className={wide ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-col"}>
                    <div
                      className={`relative overflow-hidden ${wide ? "h-56 md:h-full md:min-h-[20rem]" : "h-48 sm:h-56"}`}
                    >
                      {COURSE_IMAGES[program.slug] && (
                        <img
                          src={COURSE_IMAGES[program.slug]}
                          alt={`${program.title} at SkillStack`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                        />
                      )}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-[var(--color-surface-card)] via-black/40 to-transparent ${wide ? "md:bg-gradient-to-r" : ""}`}
                      />
                      <span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl border border-[var(--gold)]/25 bg-black/50 text-[var(--gold)] backdrop-blur-md">
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6 md:p-8">
                      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/10 px-3 py-1 font-semibold text-[var(--gold)]">
                          {program.duration}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                          {program.difficulty}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                          {program.projects}
                        </span>
                      </div>

                      <h3 className="mb-3 font-display text-2xl font-bold text-white transition-colors group-hover:text-[var(--gold)] md:text-3xl">
                        {program.title}
                      </h3>
                      <p className="mb-6 text-[var(--color-text-secondary)]">
                        {program.description}
                      </p>

                      <ul className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {program.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2 text-sm text-white/75">
                            <Check className="h-4 w-4 shrink-0 text-[var(--gold)]" />
                            {feat}
                          </li>
                        ))}
                      </ul>

                      <span className="mt-auto inline-flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-semibold text-[var(--gold)]">
                        View curriculum
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* 3. WHY SKILLSTACK — editorial */}
      <SectionWrapper id="why" className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <span className="mb-5 inline-block rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                Why SkillStack
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold leading-tight md:text-5xl">
                Built around the work,
                <br />
                <span className="gold-gradient-text">not the lecture.</span>
              </h2>
              <p className="mb-10 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                {BRAND.name} is a physical academy first. What you learn is decided by what the work
                actually requires, and every module is checked against something you have built.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={COURSE_IMAGES["web-development"]}
                    alt="Web development work at the SkillStack campus"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={COURSE_IMAGES["graphic-designing"]}
                    alt="Design work produced in the SkillStack graphic design program"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {PILLARS.map((pillar, idx) => (
                <motion.li
                  key={pillar.title}
                  variants={staggerItem}
                  className="group flex gap-6 py-8 md:gap-10 md:py-10"
                >
                  <span className="font-display text-3xl font-bold text-white/15 transition-colors duration-500 group-hover:text-[var(--gold)]/60 md:text-4xl">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="mb-3 font-display text-xl font-bold text-white md:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="max-w-xl leading-relaxed text-[var(--color-text-secondary)]">
                      {pillar.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </SectionWrapper>

      {/* 4. HOW YOUR JOURNEY UNFOLDS */}
      <SectionWrapper
        id="journey"
        className="relative overflow-hidden border-y border-white/5 bg-[var(--color-surface)]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

        <SectionHeading
          eyebrow="The Journey"
          title="How your journey"
          highlight="unfolds"
          subtitle="Five stages, in order. Where it leads is up to the work you produce along the way."
        />

        <div className="relative">
          {/* Connector rail — vertical on mobile, horizontal across the stage row on desktop */}
          <div className="absolute left-[1.75rem] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--gold)]/0 via-[var(--gold)]/30 to-[var(--gold)]/0 lg:left-0 lg:right-0 lg:top-[3.5rem] lg:bottom-auto lg:h-px lg:w-full lg:bg-gradient-to-r" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-5"
          >
            {JOURNEY.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.step}
                  variants={staggerItem}
                  className="group relative flex gap-6 lg:flex-col lg:gap-0"
                >
                  <div className="relative z-10 shrink-0">
                    <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-[var(--color-bg)] text-[var(--gold)] shadow-card transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-[var(--gold)]/60 group-hover:bg-[var(--gold)]/10 group-hover:shadow-glow-sm">
                      <Icon className="h-6 w-6" />
                      <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-[var(--gold)]/40 bg-[var(--color-bg)] font-display text-[0.65rem] font-bold text-[var(--gold)]">
                        {stage.step}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-500 group-hover:border-[var(--gold)]/25 group-hover:bg-white/[0.04] lg:mt-8 lg:min-h-[13rem]">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-[var(--gold)]">
                        {stage.title}
                      </h3>
                      {idx < JOURNEY.length - 1 && (
                        <ArrowRight className="h-4 w-4 shrink-0 text-[var(--gold)]/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--gold)]" />
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {stage.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-[var(--color-bg)]/60 p-8 backdrop-blur-md md:p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-lg leading-relaxed text-white/85">
              Stage five is not a promise. It is a direction — a portfolio, a certificate you can
              verify, and guidance on taking that into freelancing, a job, or your own venture.
            </p>
            <Link href="/showcase" className="shrink-0">
              <OutlineButton>
                See student work <ArrowUpRight className="h-4 w-4" />
              </OutlineButton>
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* 5. PHYSICAL ACADEMY VS ONLINE */}
      <SectionWrapper id="academies">
        <SectionHeading
          eyebrow="Two Environments"
          title="On campus, and"
          highlight="self-paced online"
          subtitle="The academy is where the programs run. The online library is open to everyone, right now."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GlassCard strong className="group relative overflow-hidden border-[var(--gold)]/20 p-0">
            <div className="relative h-52 overflow-hidden sm:h-64">
              <img
                src={COURSE_IMAGES["digital-marketing"]}
                alt="Learning on campus at the SkillStack academy in Rawalpindi"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-card)] via-black/40 to-transparent" />
              <span className="absolute bottom-5 left-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-black/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--gold)] backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5" /> Rawalpindi
              </span>
            </div>
            <div className="p-8 md:p-10">
              <h3 className="mb-4 font-display text-3xl font-bold text-white">Physical Academy</h3>
              <p className="mb-8 text-lg text-[var(--color-text-secondary)]">
                Immersive, in-person learning with direct mentorship and a room built for focus.
              </p>
              <ul className="mb-10 space-y-4">
                {[
                  "Dedicated lab access",
                  "Face-to-face mentor support",
                  "Collaborative peer environment",
                  "Scheduled, structured sessions",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--gold)]/20 text-[var(--gold)]">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <OutlineButton className="w-full sm:w-auto">Book a campus visit</OutlineButton>
              </Link>
            </div>
          </GlassCard>

          <GlassCard className="group relative overflow-hidden p-0">
            <div className="relative h-52 overflow-hidden sm:h-64">
              <img
                src={COURSE_IMAGES["e-commerce"]}
                alt="Self-paced online learning resources from SkillStack"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-card)] via-black/50 to-transparent" />
              <span className="absolute bottom-5 left-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-md">
                <PlayCircle className="h-3.5 w-3.5" /> Open now
              </span>
            </div>
            <div className="p-8 md:p-10">
              <h3 className="mb-4 font-display text-3xl font-bold text-white">Online Library</h3>
              <p className="mb-8 text-lg text-[var(--color-text-secondary)]">
                Self-paced resources across programming, design, marketing and freelancing — free to
                browse and use at your own pace.
              </p>
              <ul className="mb-10 space-y-4">
                {[
                  "Self-paced learning tracks",
                  "Knowledge hub articles and guides",
                  "Downloadable resources",
                  "Open to everyone, no batch required",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-white/70">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/library">
                  <GoldButton className="w-full sm:w-auto">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap">
                      Browse the library <ArrowRight className="h-5 w-5" />
                    </span>
                  </GoldButton>
                </Link>
                <Link href="/knowledge">
                  <OutlineButton className="w-full sm:w-auto">Knowledge Hub</OutlineButton>
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </SectionWrapper>

      {/* 6. QR / QUICK ACCESS */}
      <QuickAccessSection />

      {/* 7. PARTNERS */}
      <SectionWrapper id="partners" className="border-y border-white/5 bg-[var(--color-surface)]">
        <PartnersSection />
      </SectionWrapper>

      {/* 8. FAQ */}
      <SectionWrapper id="faq">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="mb-5 font-display text-3xl font-bold leading-tight md:text-5xl">
                Got <span className="gold-gradient-text">questions?</span>
              </h2>
              <p className="mb-8 text-lg text-[var(--color-text-secondary)]">
                The essentials about programs, duration and requirements. Anything else, ask us
                directly.
              </p>
              <Link href="/faq">
                <OutlineButton>
                  All FAQs <ArrowUpRight className="h-4 w-4" />
                </OutlineButton>
              </Link>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-8">
            {FAQS.map((faq, idx) => (
              <div
                key={faq.question}
                className={`glass-card overflow-hidden transition-all duration-300 ${
                  openFaq === idx ? "border-[var(--gold)]/40 bg-white/[0.04]" : ""
                }`}
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span
                    className={`pr-4 font-semibold transition-colors ${
                      openFaq === idx ? "text-[var(--gold)]" : "text-white"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                      openFaq === idx
                        ? "rotate-45 bg-[var(--gold)]/20 text-[var(--gold)]"
                        : "bg-white/5 text-white/50"
                    }`}
                  >
                    <Plus className="h-5 w-5" />
                  </span>
                </button>
                <div
                  className={`overflow-hidden px-6 transition-all duration-300 ease-in-out ${
                    openFaq === idx ? "max-h-56 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="leading-relaxed text-[var(--color-text-secondary)]">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* 9. FINAL CTA */}
      <section
        id="enroll"
        className="relative flex flex-col items-center justify-center overflow-hidden border-t border-white/5 px-6 py-32 text-center"
      >
        <DynamicBackground />
        <ParticleCanvas />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-[var(--gold)]/10 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center"
        >
          <div className="mb-10 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

          <h2 className="mb-6 font-display text-4xl font-bold leading-[1.1] md:text-6xl lg:text-7xl">
            Learn something
            <br />
            <span className="gold-gradient-text">you can use.</span>
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-[var(--color-text-secondary)] md:text-xl">
            Applications for the next campus batch are open. Class sizes are kept small so every
            student gets reviewed work, not just attendance.
          </p>

          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link href="/admissions">
              <GoldButton className="w-full px-10 py-5 text-lg sm:w-auto">
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  Apply Now <ArrowRight className="h-5 w-5" />
                </span>
              </GoldButton>
            </Link>
            <Link href="/contact">
              <OutlineButton className="w-full px-10 py-5 text-lg sm:w-auto">
                Talk to Admissions
              </OutlineButton>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
