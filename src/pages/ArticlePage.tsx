import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "@/lib/router-compat";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { fetchArticle, formatDate } from "@/lib/content";

export default function ArticlePage() {
  const [, params] = useRoute("/knowledge/:slug");
  const slug = params?.slug ?? "";
  const { data: article, isLoading } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticle(slug),
    enabled: !!slug,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--gold)] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
          </Link>

          {isLoading ? (
            <div className="space-y-4" aria-busy="true">
              <div className="h-10 w-3/4 rounded-lg bg-white/5 animate-pulse" />
              <div className="h-4 w-1/3 rounded bg-white/5 animate-pulse" />
              <div className="h-64 rounded-2xl bg-white/5 animate-pulse" />
            </div>
          ) : !article ? (
            <div className="text-center py-24">
              <h1 className="text-3xl font-display font-bold mb-3">Article not found</h1>
              <p className="text-[var(--color-text-secondary)]">
                This article may have been moved or unpublished.
              </p>
            </div>
          ) : (
            <article>
              <span className="text-xs font-semibold text-[var(--gold)] tracking-widest uppercase">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mt-3 mb-5">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 text-sm text-[var(--color-text-muted)] mb-10">
                <span className="inline-flex items-center gap-2">
                  <User className="w-4 h-4" /> {article.author}
                </span>
                <span>{formatDate(article.published_at)}</span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {article.read_minutes} min read
                </span>
              </div>

              {article.cover_image && (
                <img
                  src={article.cover_image}
                  alt={article.title}
                  className="w-full rounded-2xl border border-white/10 mb-10"
                  decoding="async"
                />
              )}

              <div className="prose prose-invert max-w-none prose-headings:font-display prose-a:text-[var(--gold)]">
                {article.content.split(/\n{2,}/).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs border border-white/10 text-[var(--color-text-secondary)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
