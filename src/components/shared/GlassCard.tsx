import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
  strong?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, hover = false, strong = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          strong ? "glass-strong" : "glass-card",
          "rounded-2xl transition-all duration-500 p-6 md:p-8",
          hover && "hover:border-[var(--gold)]/30 hover:shadow-card-hover",
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
GlassCard.displayName = "GlassCard";
