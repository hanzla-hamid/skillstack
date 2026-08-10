import React, { useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Rss, Play, FileText, RefreshCw, Youtube, Facebook, Instagram } from "lucide-react";
import { PageShell, GridSkeleton, EmptyState, FilterPills } from "@/components/shared/ContentPage";
import { GlassCard } from "@/components/shared/GlassCard";
import { Link } from "@/lib/router-compat";
import { slideUp, staggerContainer } from "@/lib/animations";
import { formatDate, YOUTUBE_CHANNEL_URL } from "@/lib/content";
import { fetchBlogPosts, type BlogPost } from "@/lib/blog";
import { syncBlogFeeds } from "@/lib/blog.functions";
import blogBackdrop from "@/assets/blog-backdrop.jpg";

const FILTERS = ["All", "Videos", "Articles"];

const SOURCE_ICON: Record<string, React.ReactNode> = {
  youtube: <Youtube className="w-3.5 h-3.5" />,
  facebook: <Facebook className="w-3.5 h-3.5" />,
  instagram: <Instagram className="w-3.5 h-3.5" />,
};

export default function BlogPage() {
  const [filter, setFilter] = useState("All");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });

  const sync = useMutation({
    mutationFn: async () => syncBlogFeeds(),
    onSettled: () => {
      void refetch();
    },
  });

  const posts = useMemo(() => {
    const items = (data ?? []) as BlogPost[];
    if (filter === "Videos") return items.filter((p) => p.type === "video");
    if (filter === "Articles") return items.filter((p) => p.type === "article");
    return items;
  }, [data, filter]);

  return (
    <PageShell
      eyebrow="SkillStack Blog"
      title="Everything we"
      highlight="publish"
      subtitle="Videos, articles and updates from SkillStack — synced automatically from our YouTube channel and social pages."
    >
      <div
        className="relative mb-12 overflow-hidden rounded-3xl border border-[var(--gold)]/20"
        style={{
          backgroundImage: `url(${blogBackdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/70 backdrop-blur-[2px] px-6 py-10 sm:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-semibold mb-2">One feed, every channel</h2>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-xl">
              New uploads and posts appear here automatically. You can also refresh the feed on
              demand.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => sync.mutate()}
              disabled={sync.isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--gold)] text-black hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${sync.isPending ? "animate-spin" : ""}`} />
              {sync.isPending ? "Syncing…" : "Sync latest"}
            </button>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors"
            >
              <Youtube className="w-4 h-4" /> YouTube channel
            </a>
          </div>
        </div>
      </div>

      <FilterPills options={FILTERS} value={filter} onChange={setFilter} />

      {isLoading ? (
        <GridSkeleton />
      ) : posts.length === 0 ? (
        <EmptyState
          icon={<Rss className="w-6 h-6" />}
          title="Nothing published yet"
          description="Videos and articles will show up here as soon as they are posted or synced."
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={slideUp}>
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <GlassCard className="h-full flex flex-col p-0 overflow-hidden group">
                  <div className="relative aspect-video bg-black/60">
                    {post.thumbnail_url ? (
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--gold)]/50">
                        <FileText className="w-10 h-10" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-black/70 text-[var(--gold)] border border-[var(--gold)]/30">
                      {post.type === "video" ? (
                        <Play className="w-3 h-3" />
                      ) : (
                        <FileText className="w-3 h-3" />
                      )}
                      {post.type === "video" ? "Video" : "Article"}
                    </span>
                    {SOURCE_ICON[post.source] && (
                      <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white/80">
                        {SOURCE_ICON[post.source]}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                      {formatDate(post.published_at)}
                    </p>
                    <h3 className="font-display font-semibold text-lg mb-2 line-clamp-2 group-hover:text-[var(--gold)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageShell>
  );
}
