import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionComponents";

export const PageShell: React.FC<{
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ eyebrow, title, highlight, subtitle, children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <PageHero eyebrow={eyebrow} title={title} highlight={highlight} subtitle={subtitle} />
    <main id="main-content" className="flex-1">
      <SectionWrapper className="pt-0">{children}</SectionWrapper>
    </main>
    <Footer />
  </div>
);

export const GridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-64 rounded-2xl border border-white/10 bg-white/[0.03] animate-pulse"
        aria-hidden="true"
      />
    ))}
  </div>
);

export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
    {icon && (
      <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)]">
        {icon}
      </div>
    )}
    <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
    <p className="text-[var(--color-text-secondary)] max-w-md mx-auto text-sm">{description}</p>
  </div>
);

export const FilterPills: React.FC<{
  options: string[];
  value: string;
  onChange: (v: string) => void;
}> = ({ options, value, onChange }) => (
  <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter">
    {options.map((option) => (
      <button
        key={option}
        type="button"
        role="tab"
        aria-selected={value === option}
        onClick={() => onChange(option)}
        className={
          "px-4 py-2 rounded-full text-sm font-medium border transition-colors " +
          (value === option
            ? "bg-[var(--gold)]/15 border-[var(--gold)]/40 text-[var(--gold)]"
            : "border-white/10 text-[var(--color-text-secondary)] hover:border-white/25 hover:text-white")
        }
      >
        {option}
      </button>
    ))}
  </div>
);
