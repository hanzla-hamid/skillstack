import React from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import { PARTNERS } from "@/lib/constants";
import { slideUp, staggerContainer } from "@/lib/animations";

/**
 * Official partners only. Each card renders a real logo when `logo` is set in
 * constants, otherwise an elegant typographic mark — never an empty box.
 */
export const PartnersSection: React.FC = () => {
  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <h3 className="font-display text-xl font-bold text-white">Our Partners</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PARTNERS.map((partner) => (
          <motion.div key={partner.name} variants={slideUp}>
            <Link
              href={partner.href}
              className="group flex h-full min-h-[13rem] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[var(--color-surface-card)]/60 p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-card-hover focus-visible:-translate-y-1 focus-visible:border-[var(--gold)]/40"
            >
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-[var(--gold)]/25 bg-[var(--gold)]/5 transition-colors duration-300 group-hover:border-[var(--gold)]/50">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    loading="lazy"
                    decoding="async"
                    className="h-14 w-14 object-contain"
                    style={
                      "whiten" in partner && partner.whiten
                        ? { filter: "brightness(0) invert(1)" }
                        : undefined
                    }
                  />
                ) : (
                  <span className="gold-gradient-text font-display text-2xl font-bold tracking-widest">
                    {partner.initials}
                  </span>
                )}
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-display text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[var(--gold)]">
                  {partner.name}
                </span>
                <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  {partner.description}
                </span>
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
