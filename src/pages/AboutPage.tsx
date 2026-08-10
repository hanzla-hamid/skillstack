import React from "react";
import { Link } from "@/lib/router-compat";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper, SectionHeading } from "@/components/shared/SectionComponents";
import { GlassCard } from "@/components/shared/GlassCard";
import { GoldButton } from "@/components/shared/buttons";
import { BRAND, STATS } from "@/lib/constants";
import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/lib/animations";
import { Target, Users, Zap, MessageCircle, Drama as Instagram } from "lucide-react";

// Team member photos (local public assets)
const CEO_PHOTO = "/images/about/WhatsApp_8_3_2026_1_08_25_AM.png";
const DEV_PHOTO = "/images/about/WhatsApp_Image_2026-07-05_at_12.23.15_AM.jpeg";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <PageHero
        eyebrow="Our Story"
        title="About"
        highlight="SkillStack"
        subtitle="We are redefining education in Pakistan by bridging the gap between theoretical knowledge and practical industry skills."
      />

      {/* Mission quote */}
      <SectionWrapper className="pt-0">
        <GlassCard
          strong
          className="border-[var(--gold)]/30 text-center py-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[var(--gold)]/5 blur-[100px] pointer-events-none" />
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-display font-medium leading-relaxed max-w-4xl mx-auto relative z-10"
          >
            "Our mission is to help students transform practical skills into successful careers
            through project-based learning and expert mentorship."
          </motion.h3>
        </GlassCard>
      </SectionWrapper>

      {/* Genesis */}
      <SectionWrapper className="bg-white/[0.02]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionHeading align="left" title="The Genesis of" highlight="SkillStack" />
            <div className="space-y-6 text-[var(--color-text-secondary)] text-lg">
              <motion.p variants={slideUp}>
                Founded in 2025 in Rawalpindi, SkillStack emerged from a simple observation:
                traditional education leaves students unprepared for the modern job market.
              </motion.p>
              <motion.p variants={slideUp}>
                As an initiative of The Prudents, we built a hybrid learning academy that combines
                the focus of physical classrooms with the scale of digital resources. We believe
                that true mastery comes not from memorization, but from building.
              </motion.p>
              <motion.p variants={slideUp}>
                Today, we offer intensive, project-driven programs in Web Development, Graphic
                Design, Digital Marketing, and E-Commerce—designed to take you from learning to
                earning.
              </motion.p>
            </div>
            <motion.div variants={slideUp} className="mt-10">
              <Link href="/courses">
                <GoldButton>View Our Programs</GoldButton>
              </Link>
            </motion.div>
          </motion.div>

          <div className="relative h-[600px] rounded-3xl overflow-hidden glass-card flex items-center justify-center border-white/10">
            <div className="absolute inset-0 grid-texture-fine opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--gold)]/20 blur-[80px]" />
            <div className="relative z-10 text-center">
              <h1 className="text-8xl font-bold font-display opacity-10">2025</h1>
              <p className="text-[var(--gold)] font-medium mt-2 tracking-widest uppercase">
                Est. Rawalpindi
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Core Values */}
      <SectionWrapper>
        <SectionHeading
          title="Our Core"
          highlight="Values"
          subtitle="The principles that guide our educational approach."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Target className="w-8 h-8" />,
              title: "Excellence",
              desc: "We demand high standards in code, design, and strategy. Good enough is never good enough.",
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Community",
              desc: "Learning is a multiplayer game. We foster collaboration, peer review, and network building.",
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Innovation",
              desc: "We teach tomorrow's tools today, keeping our curriculum constantly updated with industry trends.",
            },
          ].map((val, idx) => (
            <GlassCard key={idx} hover className="text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)] mb-6">
                {val.icon}
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4">{val.title}</h3>
              <p className="text-[var(--color-text-secondary)]">{val.desc}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* Stats */}
      <SectionWrapper className="bg-white/[0.02]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-5xl md:text-6xl font-display font-bold gold-gradient-text mb-2">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-[var(--color-text-secondary)] font-medium tracking-wide uppercase text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Team */}
      <SectionWrapper>
        <SectionHeading
          title="Meet the"
          highlight="Team"
          subtitle="The people behind SkillStack, dedicated to transforming education in Pakistan."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 — Founder & CEO */}
          <GlassCard
            strong
            className="p-8 md:p-10 border-[var(--gold)]/20 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--gold)]/10 blur-[80px]" />
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* CEO photo */}
              <div className="w-36 h-36 shrink-0 rounded-full border-4 border-[var(--gold)]/30 overflow-hidden bg-white/5 mb-6 shadow-glow-sm">
                <img
                  src={CEO_PHOTO}
                  alt="Mr. Shujja — Founder & CEO"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="text-[var(--gold)] text-sm font-bold tracking-wider uppercase mb-2">
                Founder & CEO
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-1">Mr. Shujja</h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-4 uppercase tracking-widest">
                The Prudents
              </p>
              <p className="text-[var(--color-text-secondary)] text-base mb-6 leading-relaxed italic">
                "I started SkillStack because I saw incredible potential in our youth being wasted
                on outdated curricula. We are building the academy I wish I had when I started my
                career."
              </p>

              <div className="flex gap-3 flex-wrap justify-center">
                <a
                  href="https://wa.me/923245700090"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--gold)]/30 text-white hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 hover:text-[var(--gold-light)] transition-all duration-300 text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </GlassCard>

          {/* Card 2 — Lead Developer (Hanzla Hamid) */}
          <GlassCard
            strong
            className="p-8 md:p-10 border-[var(--gold)]/20 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--gold)]/10 blur-[80px]" />
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Developer photo */}
              <div className="w-36 h-36 shrink-0 rounded-full border-4 border-[var(--gold)]/30 overflow-hidden bg-white/5 mb-6 shadow-glow-sm">
                <img
                  src={DEV_PHOTO}
                  alt="Hanzla Hamid — Lead Developer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="text-[var(--gold)] text-sm font-bold tracking-wider uppercase mb-2">
                Lead Developer
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-1">Hanzla Hamid</h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-4 uppercase tracking-widest">
                Full Stack Engineer
              </p>
              <p className="text-[var(--color-text-secondary)] text-base mb-6 leading-relaxed italic">
                "Building SkillStack from the ground up has been an incredible journey. I'm proud to
                craft the technology that powers our students' success."
              </p>

              <div className="flex gap-3 flex-wrap justify-center">
                <a
                  href="https://www.instagram.com/hanzlahamid63/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--gold)]/30 text-white hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 hover:text-[var(--gold-light)] transition-all duration-300 text-sm font-medium"
                >
                  <Instagram className="w-4 h-4" /> @hanzlahamid63
                </a>
                <a
                  href="https://wa.me/923419293971"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--gold)]/30 text-white hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 hover:text-[var(--gold-light)] transition-all duration-300 text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </GlassCard>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}
