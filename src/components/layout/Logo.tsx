import React from "react";
import { Link } from "@/lib/router-compat";
const logoUrl = "/logo.png";
import { BRAND } from "@/lib/constants";

export const Logo: React.FC<{ className?: string; scrolled?: boolean }> = ({
  className,
  scrolled = false,
}) => {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 ${className || ""}`}
    >
      <img
        src={logoUrl}
        alt="SkillStack Logo"
        className={`${scrolled ? "h-8" : "h-10"} w-auto transition-all duration-300`}
      />
      <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
        <span className="text-white">Skill</span>
        <span className="text-[var(--gold)]">Stack</span>
      </span>
    </Link>
  );
};
