import { supabase } from "@/lib/supabase";

export const VIDEO_BUCKET = "course-videos";

export type CourseVideo = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  course_slug: string | null;
  video_path: string;
  thumbnail_url: string | null;
  duration: string | null;
  is_published: boolean;
  created_at: string;
};

export async function fetchVideos(): Promise<CourseVideo[]> {
  const { data, error } = await supabase
    .from("course_videos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load videos:", error.message);
    return [];
  }
  return (data || []) as CourseVideo[];
}

/** Signed playback URL. Requires an authenticated session. */
export async function getVideoUrl(path: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(VIDEO_BUCKET)
    .createSignedUrl(path, 60 * 60 * 4);
  if (error) return null;
  return data?.signedUrl ?? null;
}
