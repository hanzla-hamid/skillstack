import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { PageShell, GridSkeleton, EmptyState, FilterPills } from "@/components/shared/ContentPage";
import { GlassCard } from "@/components/shared/GlassCard";
import { slideUp, staggerContainer } from "@/lib/animations";
import { fetchDownloads } from "@/lib/content";

export default function DownloadsPage() {
  const { data, isLoading } = useQuery({ queryKey: ["downloads"], queryFn: fetchDownloads });
  const [category, setCategory] = useState("All");

  const items = data ?? [];
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items],
  );
  const filtered = items.filter((i) => category === "All" || i.category === category);

  return (
    <PageShell
      eyebrow="Download Center"
      title="Free"
      highlight="resources"
      subtitle="Cheat sheets, templates, prospectuses and practice files — download and keep."
    >
      {categories.length > 1 && (
        <FilterPills options={categories} value={category} onChange={setCategory} />
      )}

      {isLoading ? (
        <GridSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Download className="w-6 h-6" />}
          title="No downloads yet"
          description="Files published by the SkillStack team will be available here."
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((item) => (
            <motion.div key={item.id} variants={slideUp}>
              <GlassCard hover className="h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] mb-5">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-display font-semibold mb-2">{item.title}</h2>
                <p className="text-sm text-[var(--color-text-secondary)] flex-1">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-6 text-xs text-[var(--color-text-muted)]">
                  <span>
                    {item.file_type}
                    {item.size_label ? ` · ${item.size_label}` : ""}
                  </span>
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[var(--gold)]/15 border border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)]/25 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageShell>
  );
}
