import React, { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

type ButtonBaseProps = {
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const GoldButton = forwardRef<
  HTMLButtonElement,
  ButtonBaseProps & HTMLMotionProps<"button">
>(({ className, children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -4 }}
      whileTap={{ y: 0 }}
      className={cn(
        "relative group inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold transition-all duration-300",
        "bg-[var(--gold)] text-black shadow-glow-sm hover:shadow-glow-md hover:bg-[var(--gold-hover)]",
        "overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
            style={{
              transform: `rotate(${i * 36}deg) translateY(-20px)`,
              animation: `glow-pulse ${1 + (i % 3)}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
});
GoldButton.displayName = "GoldButton";

export const OutlineButton = forwardRef<
  HTMLButtonElement,
  ButtonBaseProps & HTMLMotionProps<"button">
>(({ className, children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -4 }}
      whileTap={{ y: 0 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-medium transition-all duration-300",
        "bg-transparent border border-[var(--gold)]/30 text-white",
        "hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 hover:text-[var(--gold-light)]",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});
OutlineButton.displayName = "OutlineButton";
