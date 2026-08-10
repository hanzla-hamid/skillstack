import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, slideUp } from "@/lib/animations";
import { DynamicBackground } from "./DynamicBackground";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, highlight, subtitle }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 flex items-center justify-center min-h-[40vh] overflow-hidden border-b border-white/5">
      <DynamicBackground />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        {eyebrow && (
          <motion.div variants={slideUp} className="mb-6">
            <span className="px-4 py-1.5 rounded-full border border-[var(--gold)]/30 text-[var(--gold)] text-sm font-semibold tracking-widest uppercase bg-[var(--gold)]/5">
              {eyebrow}
            </span>
          </motion.div>
        )}

        <motion.h1
          variants={slideUp}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
        >
          {title} {highlight && <span className="gold-gradient-text">{highlight}</span>}
        </motion.h1>

        {subtitle && (
          <motion.p
            variants={slideUp}
            className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};
