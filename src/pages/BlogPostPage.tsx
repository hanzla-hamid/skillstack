import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle, ExternalLink, Trash2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { Link, useRoute } from "@/lib/router-compat";
import { useAuth } from "@/hooks/use-auth";
import { formatDate } from "@/lib/content";
import {
  fetchBlogPost,
  fetchComments,
  fetchReactions,
  addComment,
  deleteComment,
  setReaction,
  youtubeIdFromUrl,
} from "@/lib/blog";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState("");

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchBlogPost(slug),
    enabled: Boolean(slug),
  });

  const postId = post?.id ?? "";

  const { data: comments } = useQuery({
    queryKey: ["blog-comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: Boolean(postId),
  });

  const { data: reactions } = useQuery({
    queryKey: ["blog-reactions", postId],
    queryFn: () => fetchReactions(postId),
    enabled: Boolean(postId),
  });

  const likes = (reactions ?? []).filter((r) => r.kind === "like").length;
  const dislikes = (reactions ?? []).filter((r) => r.kind === "dislike").length;
  const mine = (reactions ?? []).find((r) => r.user_id === user?.id)?.kind ?? null;

  const react = useMutation({
    mutationFn: async (kind: "like" | "dislike") => {
      if (!user) throw new Error("Sign in to react");
      await setReaction(postId, user.id, mine === kind ? null : kind);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog-reactions", postId] }),
  });

  const comment = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Sign in to comment");
      await addComment(postId, user.id, draft.trim());
    },
    onSuccess: () => {
      setDraft("");
      void queryClient.invalidateQueries({ queryKey: ["blog-comments", postId] });
    },
  });

  const removeComment = useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog-comments", postId] }),
  });

  const videoId = youtubeIdFromUrl(post?.video_url ?? null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 pt-32 pb-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--gold)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          {isLoading ? (
            <div className="h-96 rounded-3xl border border-white/10 bg-white/[0.03] animate-pulse" />
          ) : !post ? (
            <GlassCard className="p-10 text-center">
              <h1 className="font-display text-2xl font-semibold mb-2">Post not found</h1>
              <p className="text-sm text-[var(--color-text-secondary)]">
                This post may have been removed or the link is incorrect.
              </p>
            </GlassCard>
          ) : (
            <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-xs uppercase tracking-widest text-[var(--gold)] mb-3">
                {post.type === "video" ? "Video" : "Article"} · {formatDate(post.published_at)}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {videoId ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-8">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : post.thumbnail_url ? (
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="w-full rounded-2xl border border-white/10 mb-8"
                  loading="lazy"
                />
              ) : null}

              <div className="prose prose-invert max-w-none whitespace-pre-line text-[var(--color-text-secondary)] leading-relaxed mb-8">
                {post.body || post.excerpt}
              </div>

              {post.permalink && (
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline mb-10"
                >
                  View original post <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <div className="flex items-center gap-3 border-y border-white/10 py-4 mb-10">
                <button
                  type="button"
                  onClick={() => react.mutate("like")}
                  disabled={!user || react.isPending}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors disabled:opacity-50 ${
                    mine === "like"
                      ? "bg-[var(--gold)]/15 border-[var(--gold)]/40 text-[var(--gold)]"
                      : "border-white/10 text-[var(--color-text-secondary)] hover:border-white/25"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" /> {likes}
                </button>
                <button
                  type="button"
                  onClick={() => react.mutate("dislike")}
                  disabled={!user || react.isPending}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors disabled:opacity-50 ${
                    mine === "dislike"
                      ? "bg-white/10 border-white/25 text-white"
                      : "border-white/10 text-[var(--color-text-secondary)] hover:border-white/25"
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" /> {dislikes}
                </button>
                <span className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] ml-auto">
                  <MessageCircle className="w-4 h-4" /> {(comments ?? []).length}
                </span>
              </div>

              <section aria-label="Comments">
                <h2 className="font-display text-xl font-semibold mb-5">Comments</h2>

                {user ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (draft.trim().length > 0) comment.mutate();
                    }}
                    className="mb-8"
                  >
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      rows={3}
                      maxLength={2000}
                      placeholder="Share your thoughts…"
                      className="w-full rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)]/50"
                    />
                    <button
                      type="submit"
                      disabled={comment.isPending || draft.trim().length === 0}
                      className="mt-3 px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--gold)] text-black disabled:opacity-50"
                    >
                      {comment.isPending ? "Posting…" : "Post comment"}
                    </button>
                  </form>
                ) : (
                  <p className="text-sm text-[var(--color-text-secondary)] mb-8">
                    <Link href="/login" className="text-[var(--gold)] hover:underline">
                      Sign in
                    </Link>{" "}
                    to join the conversation.
                  </p>
                )}

                <ul className="space-y-4">
                  {(comments ?? []).map((c) => (
                    <li key={c.id}>
                      <GlassCard className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium">{c.author_name}</p>
                            <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                              {formatDate(c.created_at)}
                            </p>
                            <p className="text-sm text-[var(--color-text-secondary)] whitespace-pre-line">
                              {c.body}
                            </p>
                          </div>
                          {user?.id === c.user_id && (
                            <button
                              type="button"
                              aria-label="Delete comment"
                              onClick={() => removeComment.mutate(c.id)}
                              className="text-white/40 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </GlassCard>
                    </li>
                  ))}
                </ul>
              </section>
            </motion.article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
