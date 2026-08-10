import { supabase } from "./supabase";
import { SEED_ARTICLES } from "./articles-seed";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image: string | null;
  author: string;
  read_minutes: number;
  tags: string[];
  featured: boolean;
  published: boolean;
  published_at: string;
};

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  image_url: string | null;
  source_url: string | null;
  published_at: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  category: string;
  caption: string | null;
  sort_order: number;
};

export type ShowcaseProject = {
  id: string;
  student_name: string;
  title: string;
  description: string;
  image_url: string | null;
  project_url: string | null;
  course: string | null;
  featured: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  avatar_url: string | null;
  rating: number;
  featured: boolean;
};

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  starts_at: string;
  ends_at: string | null;
  image_url: string | null;
  register_url: string | null;
};

export type DownloadItem = {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  size_label: string | null;
  category: string;
  downloads_count: number;
};

export type VideoItem = {
  id: string;
  youtube_id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  published_at: string;
};

/**
 * Reads a table and degrades to an empty list when the table does not exist yet
 * (i.e. db/schema.sql has not been applied). Keeps every page renderable.
 */
async function safeList<T>(
  table: string,
  build: (q: ReturnType<typeof supabase.from>) => PromiseLike<{ data: unknown; error: unknown }>,
): Promise<T[]> {
  try {
    const { data, error } = await build(supabase.from(table));
    if (error) return [];
    return (data as T[]) ?? [];
  } catch {
    return [];
  }
}

export const fetchArticles = async (): Promise<Article[]> => {
  const rows = await safeList<Article>("articles", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any).select("*").eq("published", true).order("published_at", { ascending: false }),
  );
  const slugs = new Set(rows.map((r) => r.slug));
  const extras = SEED_ARTICLES.filter((a) => !slugs.has(a.slug));
  return [...rows, ...extras].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  );
};

export const fetchArticle = async (slug: string): Promise<Article | null> => {
  const seed = SEED_ARTICLES.find((a) => a.slug === slug) ?? null;
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) return seed;
    return (data as Article) ?? seed;
  } catch {
    return seed;
  }
};

export const fetchNews = () =>
  safeList<NewsItem>("news_items", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any).select("*").order("published_at", { ascending: false }),
  );

export const fetchGallery = () =>
  safeList<GalleryItem>("gallery_items", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any).select("*").order("sort_order", { ascending: true }),
  );

export const fetchShowcase = () =>
  safeList<ShowcaseProject>("showcase_projects", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any).select("*").order("created_at", { ascending: false }),
  );

export const fetchTestimonials = () =>
  safeList<Testimonial>("testimonials", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any).select("*").order("created_at", { ascending: false }),
  );

export const fetchEvents = () =>
  safeList<EventItem>("events", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any).select("*").order("starts_at", { ascending: true }),
  );

export const fetchDownloads = () =>
  safeList<DownloadItem>("downloads", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any).select("*").order("created_at", { ascending: false }),
  );

export const fetchVideos = () =>
  safeList<VideoItem>("videos", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any).select("*").order("published_at", { ascending: false }),
  );

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@Skillstack-h2x";

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
