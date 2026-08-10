import React, { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { GoldButton, OutlineButton } from "@/components/shared/buttons";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { fetchVideos, VIDEO_BUCKET, type CourseVideo } from "@/lib/videos";
import { PROGRAMS } from "@/lib/constants";
import { UploadCloud, Trash2, Eye, EyeOff, Film } from "lucide-react";

export function AdminVideos({ userId }: { userId: string | undefined }) {
  const { toast } = useToast();
  const [videos, setVideos] = useState<CourseVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progressLabel, setProgressLabel] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [courseSlug, setCourseSlug] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () =>
    fetchVideos().then((v) => {
      setVideos(v);
      setLoading(false);
    });
  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setTitle("");
    setDescription("");
    setCategory("General");
    setCourseSlug("");
    setDuration("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      toast({
        title: "Missing details",
        description: "Add a title and pick a video file.",
        variant: "destructive",
      });
      return;
    }
    setUploading(true);
    setProgressLabel("Uploading video…");

    const ext = file.name.split(".").pop() || "mp4";
    const path = `${Date.now()}-${title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}.${ext}`;

    const { error: upErr } = await supabase.storage.from(VIDEO_BUCKET).upload(path, file, {
      cacheControl: "3600",
      contentType: file.type || "video/mp4",
    });

    if (upErr) {
      setUploading(false);
      setProgressLabel("");
      toast({ title: "Upload failed", description: upErr.message, variant: "destructive" });
      return;
    }

    setProgressLabel("Saving lesson…");
    const { error: dbErr } = await supabase.from("course_videos").insert({
      title: title.trim(),
      description: description.trim() || null,
      category,
      course_slug: courseSlug || null,
      video_path: path,
      duration: duration.trim() || null,
      is_published: true,
      created_by: userId ?? null,
    });

    setUploading(false);
    setProgressLabel("");

    if (dbErr) {
      toast({ title: "Could not save lesson", description: dbErr.message, variant: "destructive" });
      return;
    }

    toast({ title: "Lesson published", description: `${title} is now in the video library.` });
    reset();
    load();
  };

  const togglePublish = async (video: CourseVideo) => {
    const { error } = await supabase
      .from("course_videos")
      .update({ is_published: !video.is_published })
      .eq("id", video.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    load();
  };

  const remove = async (video: CourseVideo) => {
    await supabase.storage.from(VIDEO_BUCKET).remove([video.video_path]);
    const { error } = await supabase.from("course_videos").delete().eq("id", video.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Lesson deleted" });
    load();
  };

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)] transition-colors";

  return (
    <div className="space-y-8">
      <GlassCard strong className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)]">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white">Upload a lesson</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Published lessons appear instantly in the online video library.
            </p>
          </div>
        </div>

        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className={inputCls}
            placeholder="Lesson title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className={inputCls}
            placeholder="Duration (e.g. 42 min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <input
            className={inputCls}
            placeholder="Category (e.g. Web Development)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <select
            className={inputCls}
            value={courseSlug}
            onChange={(e) => setCourseSlug(e.target.value)}
          >
            <option value="" className="bg-black">
              Not linked to a course
            </option>
            {PROGRAMS.map((p: { slug: string; title: string }) => (
              <option key={p.slug} value={p.slug} className="bg-black">
                {p.title}
              </option>
            ))}
          </select>

          <textarea
            className={`${inputCls} md:col-span-2 min-h-[100px] resize-y`}
            placeholder="Short description of what this lesson covers"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="md:col-span-2 flex items-center justify-between gap-4 border border-dashed border-white/15 rounded-xl px-5 py-4 cursor-pointer hover:border-[var(--gold)]/40 transition-colors">
            <span className="text-sm text-white/70 truncate">
              {file ? file.name : "Choose a video file (MP4, WebM, MOV)"}
            </span>
            <span className="text-xs font-semibold text-[var(--gold)] uppercase tracking-wider shrink-0">
              Browse
            </span>
            <input
              ref={fileRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>

          <div className="md:col-span-2 flex items-center gap-4">
            <GoldButton type="submit" disabled={uploading}>
              <UploadCloud className="w-4 h-4" />
              {uploading ? progressLabel || "Uploading…" : "Publish lesson"}
            </GoldButton>
            {file && !uploading && (
              <OutlineButton type="button" className="px-5 py-2 h-auto text-sm" onClick={reset}>
                Clear
              </OutlineButton>
            )}
          </div>
        </form>
      </GlassCard>

      <GlassCard className="p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
          <Film className="w-5 h-5 text-[var(--gold)]" />
          <h3 className="font-display font-bold text-white">
            Library ({loading ? "…" : videos.length})
          </h3>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-white/[0.03] animate-pulse" />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="p-10 text-center text-[var(--color-text-secondary)]">
            No lessons uploaded yet.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {videos.map((v) => (
              <div key={v.id} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white truncate">{v.title}</div>
                  <div className="text-xs text-white/50">
                    {v.category}
                    {v.duration ? ` • ${v.duration}` : ""}
                    {v.is_published ? "" : " • Hidden"}
                  </div>
                </div>
                <button
                  onClick={() => togglePublish(v)}
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
                  title={v.is_published ? "Unpublish" : "Publish"}
                >
                  {v.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => remove(v)}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-400/10"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
