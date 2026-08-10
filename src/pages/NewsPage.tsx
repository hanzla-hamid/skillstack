import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink } from "lucide-react";
import { PageShell, GridSkeleton, EmptyState } from "@/components/shared/ContentPage";
import { GlassCard } from "@/components/shared/GlassCard";
import { slideUp, staggerContainer } from "@/lib/animations";
import { fetchNews, formatDate } from "@/lib/content";

export default function NewsPage() {
  const { data, isLoading } = useQuery({ queryKey: ["news"], queryFn: fetchNews });
  const items = data ?? [];

  return (
    <PageShell
      eyebrow="News Center"
      title="What's new at"
      highlight="SkillStack"
      subtitle="Announcements, admissions updates, partnerships and milestones from our academy."
    >
      {isLoading ? (
        <GridSkeleton />
      ) : items.length === 0 ? (
        <EmptyState
          icon={<Newspaper className="w-6 h-6" />}
          title="No announcements yet"
          description="News and updates published by the SkillStack team will show up here."
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5"
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={slideUp}>
              <GlassCard hover className="flex flex-col md:flex-row gap-6 items-start">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full md:w-56 h-40 object-cover rounded-xl border border-white/10"
                  />
                )}
                <div className="flex-1">
                  <p className="text-xs text-[var(--color-text-muted)] mb-2">
                    {formatDate(item.published_at)}
                  </p>
                  <h2 className="text-xl font-display font-semibold mb-2">{item.title}</h2>
                  <p className="text-sm text-[var(--color-text-secondary)]">{item.summary}</p>
                  {item.source_url && (
                    <a
                      href={item.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[var(--gold)] mt-4 hover:underline"
                    >
                      Read more <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageShell>
  );
}
