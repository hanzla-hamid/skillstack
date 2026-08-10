import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Ambient background glow that follows the pointer.
 * The glow is moved by writing to the DOM inside a rAF frame instead of
 * React state, so pointer movement never triggers a re-render.
 */
export const DynamicBackground: React.FC<{ className?: string }> = ({ className }) => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      const el = glowRef.current;
      if (el) el.style.transform = `translate3d(${x - 400}px, ${y - 400}px, 0)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={cn("fixed inset-0 pointer-events-none z-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid-texture-fine radial-fade opacity-30" />

      <div
        ref={glowRef}
        className="absolute w-[800px] h-[800px] rounded-full bg-[var(--gold)]/5 blur-[120px] transition-transform duration-1000 ease-out will-change-transform"
      />

      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--gold)]/10 blur-[150px] animate-glow-pulse" />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[var(--gold)]/5 blur-[150px] animate-glow-pulse"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
};
