import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import { BookOpen, Clock, Search } from "lucide-react";
import { PageShell, GridSkeleton, EmptyState, FilterPills } from "@/components/shared/ContentPage";
import { GlassCard } from "@/components/shared/GlassCard";
import { slideUp, staggerContainer } from "@/lib/animations";
import { fetchArticles, formatDate, type Article } from "@/lib/content";

export default function KnowledgePage() {
  const { data, isLoading } = useQuery({ queryKey: ["articles"], queryFn: fetchArticles });
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const articles = data ?? [];
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((a) => a.category)))],
    [articles],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a: Article) => {
      const matchesCategory = category === "All" || a.category === category;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [articles, category, query]);

  return (
    <PageShell
      eyebrow="Knowledge Hub"
      title="Learn with"
      highlight="SkillStack"
      subtitle="In-depth guides, tutorials and career articles written by our instructors — free for every learner."
    >
      <div className="relative mb-8 max-w-xl">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          aria-label="Search articles"
          className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-white/10 text-sm outline-none focus:border-[var(--gold)]/50 transition-colors"
        />
      </div>

      {categories.length > 1 && (
        <FilterPills options={categories} value={category} onChange={setCategory} />
      )}

      {isLoading ? (
        <GridSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-6 h-6" />}
          title="No articles yet"
          description="Published articles from the Knowledge Hub will appear here as soon as our team publishes them."
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((article) => (
            <motion.div key={article.id} variants={slideUp}>
              <Link href={`/knowledge/${article.slug}`} className="block h-full">
                <GlassCard hover className="h-full flex flex-col overflow-hidden group p-0">
                  {article.cover_image && (
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-44 object-cover"
                    />
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-semibold text-[var(--gold)] tracking-wider uppercase mb-2">
                      {article.category}
                    </span>
                    <h2 className="text-lg font-display font-semibold mb-2 group-hover:text-[var(--gold)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-[var(--color-text-secondary)] flex-1 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                      <span>{formatDate(article.published_at)}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.read_minutes} min read
                      </span>
                    </div>
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
