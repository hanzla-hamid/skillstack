import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { slideUp, staggerContainer } from "@/lib/animations";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
}) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "flex flex-col gap-4 mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <motion.span
          variants={slideUp}
          className="px-4 py-1.5 rounded-full border border-[var(--gold)]/30 text-[var(--gold)] text-sm font-semibold tracking-widest uppercase bg-[var(--gold)]/5"
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        variants={slideUp}
        className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
      >
        {title} {highlight && <span className="gold-gradient-text">{highlight}</span>}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={slideUp}
          className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mt-2"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export const SectionWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className, id }) => {
  return (
    <motion.section
      id={id}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("py-20 md:py-28 px-6 sm:px-8 lg:px-12 relative z-10", className)}
    >
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </motion.section>
  );
};

export const TrustBadge: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-3 bg-[var(--color-surface-card)]/50 backdrop-blur-md border border-white/5 rounded-full px-5 py-2.5">
      <div className="text-[var(--gold)]">{icon}</div>
      <span className="text-sm font-medium text-[var(--color-text-secondary)]">{label}</span>
    </div>
  );
};
