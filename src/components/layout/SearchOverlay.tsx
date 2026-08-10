import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/lib/router-compat";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { searchSite } from "@/lib/search";

interface SearchOverlayProps {
  onClose: () => void;
}

/**
 * Default export so it can be lazy-loaded via React.lazy() from Navbar,
 * keeping the search UI out of the initial bundle.
 */
const SearchOverlay = ({ onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEscapeKey(onClose, true);
  useFocusTrap(panelRef, true);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => searchSite(query), [query]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-6 pt-24 sm:pt-32 bg-black/70 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: -16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label="Site search"
        className="glass-strong rounded-2xl w-full max-w-xl overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-[var(--gold)] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search courses and pages..."
            aria-label="Search courses and pages"
            className="flex-1 bg-transparent outline-none text-white placeholder:text-[var(--color-text-muted)]"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1 text-[var(--color-text-muted)] hover:text-[var(--gold)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === "" ? (
            <p className="text-sm text-[var(--color-text-muted)] px-3 py-8 text-center">
              Start typing to search courses and pages.
            </p>
          ) : results.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)] px-3 py-8 text-center">
              No results for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {results.map((result) => (
                <li key={result.id}>
                  <Link
                    href={result.href}
                    onClick={onClose}
                    className="block px-3 py-2 rounded-lg hover:bg-[var(--gold)]/10 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-white">{result.title}</span>
                      <span className="text-[10px] uppercase tracking-wide text-[var(--gold)]">
                        {result.group}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] line-clamp-1 mt-0.5">
                      {result.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SearchOverlay;
