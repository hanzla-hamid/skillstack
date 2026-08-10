import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Trophy, ExternalLink } from "lucide-react";
import { PageShell, GridSkeleton, EmptyState } from "@/components/shared/ContentPage";
import { GlassCard } from "@/components/shared/GlassCard";
import { slideUp, staggerContainer } from "@/lib/animations";
import { fetchShowcase } from "@/lib/content";

export default function ShowcasePage() {
  const { data, isLoading } = useQuery({ queryKey: ["showcase"], queryFn: fetchShowcase });
  const items = data ?? [];

  return (
    <PageShell
      eyebrow="Student Showcase"
      title="Built by our"
      highlight="students"
      subtitle="Real projects shipped by SkillStack learners during and after their programs."
    >
      {isLoading ? (
        <GridSkeleton />
      ) : items.length === 0 ? (
        <EmptyState
          icon={<Trophy className="w-6 h-6" />}
          title="Showcase in progress"
          description="Student projects approved by our instructors will be featured here."
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((p) => (
            <motion.div key={p.id} variants={slideUp}>
              <GlassCard hover className="h-full flex flex-col p-0 overflow-hidden group">
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-44 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col flex-1">
                  {p.course && (
                    <span className="text-xs font-semibold text-[var(--gold)] uppercase tracking-wider mb-2">
                      {p.course}
                    </span>
                  )}
                  <h2 className="text-lg font-display font-semibold mb-1">{p.title}</h2>
                  <p className="text-xs text-[var(--color-text-muted)] mb-3">by {p.student_name}</p>
                  <p className="text-sm text-[var(--color-text-secondary)] flex-1">
                    {p.description}
                  </p>
                  {p.project_url && (
                    <a
                      href={p.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[var(--gold)] mt-5 hover:underline"
                    >
                      View project <ExternalLink className="w-3.5 h-3.5" />
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
