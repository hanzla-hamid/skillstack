import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ImageIcon, X } from "lucide-react";
import { PageShell, GridSkeleton, EmptyState, FilterPills } from "@/components/shared/ContentPage";
import { slideUp, staggerContainer } from "@/lib/animations";
import { fetchGallery, type GalleryItem } from "@/lib/content";

export default function GalleryPage() {
  const { data, isLoading } = useQuery({ queryKey: ["gallery"], queryFn: fetchGallery });
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const items = data ?? [];
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items],
  );
  const filtered = items.filter((i) => category === "All" || i.category === category);

  return (
    <PageShell
      eyebrow="Gallery"
      title="Life at"
      highlight="SkillStack"
      subtitle="Classrooms, workshops, graduations and the moments that make our community."
    >
      {categories.length > 1 && (
        <FilterPills options={categories} value={category} onChange={setCategory} />
      )}

      {isLoading ? (
        <GridSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<ImageIcon className="w-6 h-6" />}
          title="Gallery coming together"
          description="Photos uploaded by the SkillStack team will appear in this gallery."
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]"
        >
          {filtered.map((item) => (
            <motion.button
              key={item.id}
              variants={slideUp}
              type="button"
              onClick={() => setActive(item)}
              className="mb-5 block w-full break-inside-avoid rounded-2xl overflow-hidden border border-white/10 group relative"
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.image_url}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-medium bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                {item.title}
              </span>
            </motion.button>
          ))}
        </motion.div>
      )}

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <figure className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={active.image_url} alt={active.title} className="max-h-[75vh] rounded-2xl" />
            <figcaption className="text-center text-sm text-[var(--color-text-secondary)] mt-4">
              {active.caption || active.title}
            </figcaption>
          </figure>
        </div>
      )}
    </PageShell>
  );
}
