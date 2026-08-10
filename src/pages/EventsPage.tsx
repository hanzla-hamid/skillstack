import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { PageShell, GridSkeleton, EmptyState } from "@/components/shared/ContentPage";
import { GlassCard } from "@/components/shared/GlassCard";
import { slideUp, staggerContainer } from "@/lib/animations";
import { fetchEvents, type EventItem } from "@/lib/content";

function EventCard({ event, past }: { event: EventItem; past?: boolean }) {
  const date = new Date(event.starts_at);
  return (
    <GlassCard hover className={"flex gap-6 items-start " + (past ? "opacity-60" : "")}>
      <div className="shrink-0 w-16 text-center rounded-xl border border-[var(--gold)]/25 bg-[var(--gold)]/5 py-3">
        <div className="text-2xl font-display font-bold text-[var(--gold)]">{date.getDate()}</div>
        <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
          {date.toLocaleString("en-GB", { month: "short" })}
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-display font-semibold mb-2">{event.title}</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3">{event.description}</p>
        <div className="flex flex-wrap gap-4 text-xs text-[var(--color-text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            {date.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> {event.location}
          </span>
        </div>
        {event.register_url && !past && (
          <a
            href={event.register_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 rounded-full text-sm font-medium bg-[var(--gold)]/15 border border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)]/25 transition-colors"
          >
            Register
          </a>
        )}
      </div>
    </GlassCard>
  );
}

export default function EventsPage() {
  const { data, isLoading } = useQuery({ queryKey: ["events"], queryFn: fetchEvents });
  const items = data ?? [];
  const now = Date.now();
  const upcoming = items.filter((e) => new Date(e.starts_at).getTime() >= now);
  const past = items.filter((e) => new Date(e.starts_at).getTime() < now).reverse();

  return (
    <PageShell
      eyebrow="Events"
      title="Workshops &"
      highlight="Meetups"
      subtitle="Free sessions, bootcamps, orientation days and industry talks hosted by SkillStack."
    >
      {isLoading ? (
        <GridSkeleton count={3} />
      ) : items.length === 0 ? (
        <EmptyState
          icon={<CalendarDays className="w-6 h-6" />}
          title="No events scheduled"
          description="Upcoming workshops and sessions will be listed here once scheduled."
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {upcoming.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)] mb-5">
                Upcoming
              </h2>
              <div className="space-y-5">
                {upcoming.map((e) => (
                  <motion.div key={e.id} variants={slideUp}>
                    <EventCard event={e} />
                  </motion.div>
                ))}
              </div>
            </section>
          )}
          {past.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-5">
                Past events
              </h2>
              <div className="space-y-5">
                {past.map((e) => (
                  <motion.div key={e.id} variants={slideUp}>
                    <EventCard event={e} past />
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      )}
    </PageShell>
  );
}
