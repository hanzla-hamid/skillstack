import { supabase } from "./supabase";

export type BlogPost = {
  id: string;
  source: "manual" | "youtube" | "facebook" | "instagram";
  external_id: string | null;
  type: "article" | "video";
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  video_url: string | null;
  permalink: string | null;
  thumbnail_url: string | null;
  tags: string[];
  author: string;
  status: "draft" | "published";
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type BlogComment = {
  id: string;
  post_id: string;
  parent_id: string | null;
  user_id: string;
  author_name: string;
  body: string;
  created_at: string;
};

export type BlogReaction = {
  id: string;
  post_id: string;
  user_id: string;
  kind: "like" | "dislike";
};

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error) return [];
    return (data as BlogPost[]) ?? [];
  } catch {
    return [];
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) return null;
    return (data as BlogPost) ?? null;
  } catch {
    return null;
  }
}

export async function fetchComments(postId: string): Promise<BlogComment[]> {
  try {
    const { data, error } = await supabase
      .from("blog_comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) return [];
    return (data as BlogComment[]) ?? [];
  } catch {
    return [];
  }
}

export async function addComment(postId: string, userId: string, body: string) {
  const { error } = await supabase
    .from("blog_comments")
    .insert({ post_id: postId, user_id: userId, body });
  if (error) throw error;
}

export async function deleteComment(id: string) {
  const { error } = await supabase.from("blog_comments").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchReactions(postId: string): Promise<BlogReaction[]> {
  try {
    const { data, error } = await supabase.from("blog_reactions").select("*").eq("post_id", postId);
    if (error) return [];
    return (data as BlogReaction[]) ?? [];
  } catch {
    return [];
  }
}

export async function setReaction(postId: string, userId: string, kind: "like" | "dislike" | null) {
  if (kind === null) {
    const { error } = await supabase
      .from("blog_reactions")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", userId);
    if (error) throw error;
    return;
  }
  const { error } = await supabase
    .from("blog_reactions")
    .upsert({ post_id: postId, user_id: userId, kind }, { onConflict: "post_id,user_id" });
  if (error) throw error;
}

export function youtubeIdFromUrl(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
  return match ? match[1] : null;
}
