import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Bookmark,
  MessageCircle,
  Share2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Sparkles,
  Flame,
  X,
  Send,
  HelpCircle,
  Headphones,
  Layers,
  Video as VideoIcon,
  BookOpen,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { GoldButton } from "@/components/shared/buttons";
import {
  getShortsFeed,
  getShortCategories,
  getShortComments,
  type ShortItem,
  type Comment,
} from "@/lib/shorts-service";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@/lib/router-compat";

export default function ShortsFeedPage() {
  const { toast } = useToast();
  const [category, setCategory] = useState<string>("All");
  const [shorts, setShorts] = useState<ShortItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Per-short interaction states (local/session UI state)
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>({});
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});

  // Media playback controls
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Active comic slide per short
  const [slideIndexMap, setSlideIndexMap] = useState<Record<string, number>>({});

  // Active quiz state per short
  const [quizSelectedMap, setQuizSelectedMap] = useState<Record<string, number>>({});
  const [streak, setStreak] = useState(0);

  // Comment drawer state
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState("");

  const feedRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  // Fetch feed content
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getShortsFeed(category);
      setShorts(data);
      setActiveIndex(0);

      // Initialize like counts
      const counts: Record<string, number> = {};
      data.forEach((item) => {
        counts[item.id] = item.initialLikes;
      });
      setLikesCountMap((prev) => ({ ...counts, ...prev }));
      setLoading(false);
    })();
  }, [category]);

  const categories = getShortCategories();
  const activeShort = shorts[activeIndex];

  // Viewport Awareness via IntersectionObserver
  useEffect(() => {
    if (!feedRef.current || shorts.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setActiveIndex(index);
              setIsPlaying(true);
            }
          }
        });
      },
      { threshold: 0.6 },
    );

    const elements = feedRef.current.querySelectorAll(".short-card-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [shorts]);

  // Handle active video playback
  useEffect(() => {
    shorts.forEach((item, idx) => {
      const v = videoRefs.current[item.id];
      if (!v) return;

      if (idx === activeIndex && isPlaying && item.type === "video") {
        v.play().catch(() => {
          // Autoplay policy fallback
          setIsPlaying(false);
        });
      } else {
        v.pause();
      }
    });

    shorts.forEach((item, idx) => {
      const a = audioRefs.current[item.id];
      if (!a) return;
      if (idx === activeIndex && isPlaying && item.type === "audio") {
        a.play().catch(() => setIsPlaying(false));
      } else {
        a.pause();
      }
    });
  }, [activeIndex, isPlaying, shorts]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (commentDrawerOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (activeIndex < shorts.length - 1) setActiveIndex((prev) => prev + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key.toLowerCase() === "m") {
        setIsMuted((prev) => !prev);
      } else if (e.key.toLowerCase() === "l" && activeShort) {
        handleToggleLike(activeShort.id);
      }
    },
    [activeIndex, shorts, commentDrawerOpen, activeShort],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Toggle Like
  const handleToggleLike = (id: string) => {
    const currentlyLiked = likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !currentlyLiked }));
    setLikesCountMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (currentlyLiked ? -1 : 1),
    }));
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id: string) => {
    const currentlyBookmarked = bookmarkedMap[id];
    setBookmarkedMap((prev) => ({ ...prev, [id]: !currentlyBookmarked }));
    toast({
      title: currentlyBookmarked ? "Removed from saved" : "Saved to Bookmarks",
      description: currentlyBookmarked
        ? "Item removed from your offline saved list."
        : "Item saved to your local learning bookmarks.",
    });
  };

  // Handle Share
  const handleShare = async (item: ShortItem) => {
    const shareUrl = `${window.location.origin}/shorts?id=${item.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Check out this ${item.category} micro-lesson on SkillStack!`,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard if user cancels
      }
    }
    await navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied!",
      description: "SkillShort link copied to your clipboard.",
    });
  };

  // Open Comments Drawer
  const handleOpenComments = async (item: ShortItem) => {
    setCommentDrawerOpen(true);
    const data = await getShortComments(item.id);
    setComments(data);
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: "c-" + Date.now(),
      userName: "You",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      text: newCommentText.trim(),
      createdAt: "Just now",
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentText("");
  };

  // Quiz Option Click
  const handleQuizSelect = (shortId: string, optionIndex: number, isCorrect: boolean) => {
    if (quizSelectedMap[shortId] !== undefined) return; // Already answered

    setQuizSelectedMap((prev) => ({ ...prev, [shortId]: optionIndex }));
    if (isCorrect) {
      setStreak((prev) => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job! Keep the learning streak going.",
      });
    } else {
      setStreak(0);
    }
  };

  // Comic slide controls
  const handleSlideChange = (shortId: string, totalSlides: number, direction: "next" | "prev") => {
    const current = slideIndexMap[shortId] || 0;
    let next = direction === "next" ? current + 1 : current - 1;
    if (next < 0) next = 0;
    if (next >= totalSlides) next = totalSlides - 1;
    setSlideIndexMap((prev) => ({ ...prev, [shortId]: next }));
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-white flex flex-col justify-between">
      <Navbar />

      {/* Main Container */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow flex flex-col">
        {/* Header Title & Category Pills */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 px-3 py-0.5 text-xs font-semibold text-[var(--gold)]">
                <Sparkles className="w-3 h-3" /> SkillShorts Feed
              </span>
              {streak > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 border border-orange-500/30 px-3 py-0.5 text-xs font-semibold text-orange-400">
                  <Flame className="w-3.5 h-3.5 text-orange-500" /> {streak} Streak
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Bite-Sized <span className="text-gold-gradient">Micro-Learning</span>
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              Learn one key tech concept in under 60 seconds.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  category === cat
                    ? "bg-[var(--gold)] text-black font-bold shadow-lg shadow-[var(--gold)]/20"
                    : "bg-white/5 text-[var(--color-text-secondary)] border border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="h-[600px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[var(--color-text-muted)]">Loading SkillShorts…</p>
            </div>
          </div>
        ) : shorts.length === 0 ? (
          <div className="h-[500px] flex items-center justify-center">
            <GlassCard className="p-8 text-center max-w-md">
              <BookOpen className="w-12 h-12 text-[var(--gold)] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No Shorts Found</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1 mb-4">
                No micro-lessons available for "{category}". Check back soon!
              </p>
              <GoldButton onClick={() => setCategory("All")}>Show All Shorts</GoldButton>
            </GlassCard>
          </div>
        ) : (
          /* Feed Layout */
          <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-md lg:max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Main Reel Card Container (Snap Container) */}
              <div
                ref={feedRef}
                className="lg:col-span-8 h-[640px] sm:h-[680px] overflow-y-scroll snap-y snap-mandatory rounded-3xl scrollbar-none border border-white/10 relative shadow-2xl bg-black/60 backdrop-blur-md"
              >
                {shorts.map((item, idx) => {
                  const isCurrent = idx === activeIndex;
                  const isLiked = likedMap[item.id] || false;
                  const likesCount = likesCountMap[item.id] || item.initialLikes;
                  const isBookmarked = bookmarkedMap[item.id] || false;
                  const activeSlide = slideIndexMap[item.id] || 0;
                  const selectedOption = quizSelectedMap[item.id];

                  return (
                    <div
                      key={item.id}
                      data-index={idx}
                      className="short-card-item snap-start h-full w-full relative flex flex-col justify-between p-5 sm:p-6 overflow-hidden select-none"
                    >
                      {/* Background Gradient / Glow */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none z-10" />

                      {/* Top Header info inside card */}
                      <div className="relative z-20 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.creator.avatar}
                            alt={item.creator.name}
                            className="w-9 h-9 rounded-full object-cover border border-[var(--gold)]/40"
                          />
                          <div>
                            <p className="text-xs font-semibold text-white leading-tight">
                              {item.creator.name}
                            </p>
                            <p className="text-[10px] text-[var(--color-text-muted)]">
                              {item.creator.role}
                            </p>
                          </div>
                        </div>

                        {/* Category Badge & Content Type Icon */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-medium text-[var(--gold)] bg-black/60 backdrop-blur-md border border-[var(--gold)]/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                            {item.type === "video" && <VideoIcon className="w-3 h-3" />}
                            {item.type === "comic" && <Layers className="w-3 h-3" />}
                            {item.type === "audio" && <Headphones className="w-3 h-3" />}
                            {item.type === "quiz" && <HelpCircle className="w-3 h-3" />}
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Main Card Content (Typed) */}
                      <div className="relative z-20 my-auto flex flex-col justify-center">
                        {/* 1. VIDEO TYPE */}
                        {item.type === "video" && item.videoUrl && (
                          <div className="relative w-full h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-black/80 flex items-center justify-center border border-white/5">
                            <video
                              ref={(el) => (videoRefs.current[item.id] = el)}
                              src={item.videoUrl}
                              poster={item.posterUrl}
                              playsInline
                              loop
                              muted={isMuted}
                              className="w-full h-full object-cover"
                            />

                            {/* Video Controls Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group hover:bg-black/30 transition-colors">
                              <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-transform"
                                aria-label={isPlaying ? "Pause Video" : "Play Video"}
                              >
                                {isPlaying ? (
                                  <Pause className="w-6 h-6" />
                                ) : (
                                  <Play className="w-6 h-6 ml-1 text-[var(--gold)]" />
                                )}
                              </button>
                            </div>

                            {/* Sound Toggle */}
                            <button
                              onClick={() => setIsMuted(!isMuted)}
                              className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[var(--gold)] transition-colors"
                              aria-label={isMuted ? "Unmute" : "Mute"}
                            >
                              {isMuted ? (
                                <VolumeX className="w-4 h-4 text-red-400" />
                              ) : (
                                <Volume2 className="w-4 h-4 text-[var(--gold)]" />
                              )}
                            </button>
                          </div>
                        )}

                        {/* 2. COMIC / INFOGRAPHIC TYPE */}
                        {(item.type === "comic" || item.type === "infographic") &&
                          item.slides && (
                            <div className="relative w-full min-h-[360px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-md">
                              {/* Slide Tag Indicator */}
                              <div className="flex items-center justify-between text-xs font-semibold text-[var(--gold)] mb-3">
                                <span>{item.slides[activeSlide]?.tag || "CONCEPT"}</span>
                                <span className="text-[var(--color-text-muted)] font-mono">
                                  Slide {activeSlide + 1} of {item.slides.length}
                                </span>
                              </div>

                              {/* Slide Title & Text */}
                              <div className="my-auto">
                                <h3 className="text-xl font-bold font-display text-white mb-2 leading-snug">
                                  {item.slides[activeSlide]?.title}
                                </h3>
                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                  {item.slides[activeSlide]?.text}
                                </p>

                                {item.slides[activeSlide]?.codeSnippet && (
                                  <pre className="mt-3 p-3 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-emerald-400 overflow-x-auto">
                                    <code>{item.slides[activeSlide].codeSnippet}</code>
                                  </pre>
                                )}
                              </div>

                              {/* Slide Navigation Buttons */}
                              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                                <button
                                  onClick={() =>
                                    handleSlideChange(item.id, item.slides!.length, "prev")
                                  }
                                  disabled={activeSlide === 0}
                                  className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-white disabled:opacity-30 hover:bg-white/20 transition-colors flex items-center gap-1"
                                >
                                  <ChevronLeft className="w-4 h-4" /> Prev
                                </button>

                                {/* Dot Indicators */}
                                <div className="flex items-center gap-1.5">
                                  {item.slides.map((_, sIdx) => (
                                    <button
                                      key={sIdx}
                                      onClick={() =>
                                        setSlideIndexMap((prev) => ({
                                          ...prev,
                                          [item.id]: sIdx,
                                        }))
                                      }
                                      className={`h-1.5 rounded-full transition-all duration-300 ${
                                        sIdx === activeSlide
                                          ? "w-6 bg-[var(--gold)]"
                                          : "w-1.5 bg-white/30"
                                      }`}
                                    />
                                  ))}
                                </div>

                                <button
                                  onClick={() =>
                                    handleSlideChange(item.id, item.slides!.length, "next")
                                  }
                                  disabled={activeSlide === item.slides.length - 1}
                                  className="px-3 py-1.5 rounded-lg bg-[var(--gold)]/20 text-xs font-semibold text-[var(--gold)] border border-[var(--gold)]/30 disabled:opacity-30 hover:bg-[var(--gold)]/30 transition-colors flex items-center gap-1"
                                >
                                  Next <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}

                        {/* 3. AUDIO TYPE */}
                        {item.type === "audio" && item.audioUrl && (
                          <div className="w-full rounded-2xl bg-gradient-to-br from-[var(--gold)]/10 via-black/40 to-black/80 border border-[var(--gold)]/20 p-6 backdrop-blur-md flex flex-col gap-4">
                            <audio
                              ref={(el) => (audioRefs.current[item.id] = el)}
                              src={item.audioUrl}
                              loop
                            />
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-14 h-14 rounded-2xl bg-[var(--gold)] text-black flex items-center justify-center font-bold shadow-lg shadow-[var(--gold)]/30 hover:scale-105 transition-transform shrink-0"
                              >
                                {isPlaying ? (
                                  <Pause className="w-6 h-6 fill-black" />
                                ) : (
                                  <Play className="w-6 h-6 fill-black ml-1" />
                                )}
                              </button>

                              <div>
                                <h3 className="text-base font-bold text-white leading-snug">
                                  {item.title}
                                </h3>
                                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                                  {item.duration || "1:00"} Audio Snack
                                </p>
                              </div>
                            </div>

                            {/* Waveform Visualizer Animation */}
                            <div className="flex items-end justify-between h-12 px-2 pt-2 bg-black/40 rounded-xl border border-white/5">
                              {[35, 65, 40, 85, 95, 50, 75, 45, 90, 60, 30, 80, 70, 50, 90].map(
                                (h, barIdx) => (
                                  <div
                                    key={barIdx}
                                    style={{
                                      height: isPlaying ? `${h}%` : "15%",
                                      transition: "height 0.2s ease",
                                    }}
                                    className="w-1.5 bg-gradient-to-t from-[var(--gold)] to-emerald-400 rounded-full"
                                  />
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {/* 4. QUIZ TYPE */}
                        {item.type === "quiz" && item.quiz && (
                          <div className="w-full rounded-2xl bg-white/5 border border-white/10 p-5 sm:p-6 backdrop-blur-md flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--gold)]">
                              <HelpCircle className="w-4 h-4" /> Interactive Quiz Break
                            </div>

                            <h3 className="text-base sm:text-lg font-bold font-display text-white">
                              {item.quiz.question}
                            </h3>

                            <div className="flex flex-col gap-2.5 mt-1">
                              {item.quiz.options.map((opt, optIdx) => {
                                const isSelected = selectedOption === optIdx;
                                const hasAnswered = selectedOption !== undefined;

                                let btnStyle =
                                  "border-white/10 bg-white/5 text-white hover:border-[var(--gold)]/40";
                                if (hasAnswered) {
                                  if (opt.isCorrect) {
                                    btnStyle =
                                      "border-emerald-500/50 bg-emerald-500/20 text-emerald-300 font-semibold";
                                  } else if (isSelected && !opt.isCorrect) {
                                    btnStyle =
                                      "border-red-500/50 bg-red-500/20 text-red-300 font-semibold";
                                  } else {
                                    btnStyle = "border-white/5 bg-white/5 opacity-40 text-white";
                                  }
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    onClick={() =>
                                      handleQuizSelect(item.id, optIdx, opt.isCorrect)
                                    }
                                    disabled={hasAnswered}
                                    className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                                  >
                                    <span>{opt.text}</span>
                                    {hasAnswered && opt.isCorrect && (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    )}
                                    {hasAnswered && isSelected && !opt.isCorrect && (
                                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Quiz Explanation Box */}
                            {selectedOption !== undefined && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-[var(--color-text-secondary)] leading-relaxed"
                              >
                                <span className="font-bold text-white block mb-0.5">
                                  Explanation:
                                </span>
                                {item.quiz.explanation}
                              </motion.div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Card Bottom Meta & CTA */}
                      <div className="relative z-20 mt-auto pt-4 border-t border-white/10 flex items-end justify-between gap-4">
                        <div className="max-w-[75%]">
                          <h2 className="text-base font-bold font-display text-white line-clamp-1">
                            {item.title}
                          </h2>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 line-clamp-2">
                            {item.description}
                          </p>

                          {item.cta && (
                            <Link
                              href={item.cta.href}
                              className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--gold)] hover:underline"
                            >
                              {item.cta.label} →
                            </Link>
                          )}
                        </div>

                        {/* Mobile Overlay Quick Actions */}
                        <div className="flex lg:hidden items-center gap-3">
                          <button
                            onClick={() => handleToggleLike(item.id)}
                            className="flex flex-col items-center gap-1 text-white"
                          >
                            <Heart
                              className={`w-6 h-6 transition-colors ${
                                isLiked ? "fill-red-500 text-red-500" : "text-white"
                              }`}
                            />
                            <span className="text-[10px] font-bold">{likesCount}</span>
                          </button>

                          <button
                            onClick={() => handleOpenComments(item)}
                            className="flex flex-col items-center gap-1 text-white"
                          >
                            <MessageCircle className="w-6 h-6" />
                            <span className="text-[10px] font-bold">
                              {item.initialCommentsCount}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Side Action Controls Column */}
              {activeShort && (
                <div className="hidden lg:flex lg:col-span-4 flex-col gap-4">
                  <GlassCard className="p-6 flex flex-col gap-5">
                    <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                      <img
                        src={activeShort.creator.avatar}
                        alt={activeShort.creator.name}
                        className="w-12 h-12 rounded-full object-cover border border-[var(--gold)]/40"
                      />
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {activeShort.creator.name}
                        </h4>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {activeShort.creator.role}
                        </p>
                      </div>
                    </div>

                    {/* Desktop Interaction Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleToggleLike(activeShort.id)}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                          likedMap[activeShort.id]
                            ? "bg-red-500/10 border-red-500/40 text-red-400"
                            : "bg-white/5 border-white/10 text-white hover:border-white/20"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            likedMap[activeShort.id] ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                        {likesCountMap[activeShort.id] || activeShort.initialLikes} Likes
                      </button>

                      <button
                        onClick={() => handleToggleBookmark(activeShort.id)}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                          bookmarkedMap[activeShort.id]
                            ? "bg-[var(--gold)]/20 border-[var(--gold)]/40 text-[var(--gold)]"
                            : "bg-white/5 border-white/10 text-white hover:border-white/20"
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            bookmarkedMap[activeShort.id] ? "fill-[var(--gold)]" : ""
                          }`}
                        />
                        {bookmarkedMap[activeShort.id] ? "Saved" : "Save"}
                      </button>

                      <button
                        onClick={() => handleOpenComments(activeShort)}
                        className="flex items-center justify-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white hover:border-white/20 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {activeShort.initialCommentsCount} Comments
                      </button>

                      <button
                        onClick={() => handleShare(activeShort)}
                        className="flex items-center justify-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white hover:border-white/20 transition-colors"
                      >
                        <Share2 className="w-4 h-4" /> Share
                      </button>
                    </div>

                    {/* Feed Navigation Buttons */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                      <span>Keyboard: ↑ ↓ space (pause) m (mute)</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                          disabled={activeIndex === 0}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setActiveIndex((prev) => Math.min(shorts.length - 1, prev + 1))
                          }
                          disabled={activeIndex === shorts.length - 1}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Comment Drawer / Modal */}
      <AnimatePresence>
        {commentDrawerOpen && activeShort && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              className="w-full max-w-lg bg-[var(--color-surface-card)] border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 flex flex-col h-[520px]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <h3 className="font-bold text-white text-base">
                  Comments ({comments.length})
                </h3>
                <button
                  onClick={() => setCommentDrawerOpen(false)}
                  className="p-1 rounded-lg text-[var(--color-text-muted)] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comments List */}
              <div className="flex-grow overflow-y-auto space-y-4 pr-1 scrollbar-none">
                {comments.length === 0 ? (
                  <p className="text-center text-xs text-[var(--color-text-muted)] py-10">
                    No comments yet. Be the first to start the discussion!
                  </p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="flex items-start gap-3">
                      <img
                        src={c.userAvatar}
                        alt={c.userName}
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                      />
                      <div className="flex-grow bg-white/5 p-3 rounded-2xl border border-white/5">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-white">{c.userName}</span>
                          <span className="text-[10px] text-[var(--color-text-muted)]">
                            {c.createdAt}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)]">{c.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Comment Input */}
              <form
                onSubmit={handleAddComment}
                className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--gold)]/50"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-[var(--gold)] text-black font-bold hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4 fill-black" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
