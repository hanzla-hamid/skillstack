import { Link } from "@/lib/router-compat";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";
import { OutlineButton } from "@/components/shared/buttons";
import { DynamicBackground } from "@/components/shared/DynamicBackground";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <DynamicBackground />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-lg mx-auto px-6 text-center flex flex-col items-center"
      >
        <h1 className="text-[8rem] md:text-[10rem] font-display font-bold leading-none gold-gradient-text">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mt-4 mb-3">
          Page Not Found
        </h2>
        <p className="text-[var(--color-text-secondary)] text-lg mb-10 max-w-md">
          The page you're looking for may have been moved, renamed, or never existed. Let's get you
          back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <span className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold bg-[var(--gold)] text-black shadow-glow-sm hover:shadow-glow-md hover:bg-[var(--gold-hover)] transition-all duration-300">
              <Home className="w-5 h-5" /> Back Home
            </span>
          </Link>
          <Link href="/courses">
            <OutlineButton className="flex items-center gap-2">
              <Compass className="w-5 h-5" /> Browse Courses
            </OutlineButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
