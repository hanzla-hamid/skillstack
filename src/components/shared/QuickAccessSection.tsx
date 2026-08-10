import React from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "@/lib/router-compat";
import { BRAND, QUICK_ACCESS } from "@/lib/constants";
import { slideUp, staggerContainer } from "@/lib/animations";
import { SectionHeading, SectionWrapper } from "./SectionComponents";
import {
  MessageCircle,
  FileText,
  Globe,
  Facebook,
  Instagram,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  whatsapp: MessageCircle,
  admission: FileText,
  facebook: Facebook,
  instagram: Instagram,
  location: MapPin,
};

/** Canonical origin used so the codes resolve on any phone that scans them. */
const SITE_ORIGIN = "";

/** Three primary QR actions — the first two use official printed codes, the last is generated. */
const QR_ACTIONS: {
  id: string;
  label: string;
  caption: string;
  helper: string;
  href: string;
  scanValue?: string;
  image?: string;
  external: boolean;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "whatsapp",
    label: "Talk to SkillStack",
    caption: "WhatsApp",
    helper: "Scan to message our admissions team",
    href: BRAND.social.whatsapp,
    image: "/images/homepage/watsapp.png",
    external: true,
    icon: MessageCircle,
  },
  {
    id: "apply",
    label: "Apply / Enroll",
    caption: "Application form",
    helper: "Scan to start your application",
    href: "/admissions",
    image: "/images/homepage/Google%20form.png",
    external: false,
    icon: FileText,
  },
  {
    id: "website",
    label: "Visit SkillStack",
    caption: "Website",
    helper: "Scan to open skillstack on your phone",
    href: "/",
    image: "/images/homepage/website.png",
    external: false,
    icon: Globe,
  },
];

const SECONDARY = QUICK_ACCESS.filter((item) =>
  ["facebook", "instagram", "location"].includes(item.id),
);

export const QuickAccessSection: React.FC = () => {
  return (
    <SectionWrapper id="quick-access" className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-full max-w-3xl -translate-x-1/2 bg-[var(--gold)]/5 blur-[120px]" />

      <SectionHeading
        eyebrow="Scan & Connect"
        title="Point your camera,"
        highlight="reach us instantly"
        subtitle="Three ways to reach SkillStack — scan on a phone, or tap any card."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {QR_ACTIONS.map((item) => {
          const Icon = item.icon;
          const inner = (
            <>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                <Icon className="h-4 w-4" /> {item.caption}
              </span>

              {/* Generous white quiet-zone keeps the code reliably scannable */}
              <span className="grid w-full place-items-center rounded-2xl bg-white p-5 shadow-card sm:p-6">
                <span className="grid aspect-square w-full max-w-[13rem] place-items-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.label} QR code`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <QRCodeSVG
                      value={item.scanValue ?? SITE_ORIGIN}
                      level="M"
                      marginSize={2}
                      bgColor="#ffffff"
                      fgColor="#0a0a0a"
                      title={`${item.label} QR code`}
                      className="h-full w-full"
                    />
                  )}
                </span>
              </span>

              <span className="block">
                <span className="block font-display text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[var(--gold)]">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm text-[var(--color-text-secondary)]">
                  {item.helper}
                </span>
              </span>

              <span className="mt-auto inline-flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-semibold text-[var(--gold)]">
                Or tap to open{" "}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </>
          );

          const className =
            "group flex h-full flex-col items-start gap-6 rounded-3xl border border-white/10 bg-[var(--color-surface-card)]/70 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-card-hover focus-visible:-translate-y-1 sm:p-8";

          return (
            <motion.div key={item.id} variants={slideUp} className="h-full">
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  aria-label={item.label}
                >
                  {inner}
                </a>
              ) : (
                <Link href={item.href} className={className} aria-label={item.label}>
                  {inner}
                </Link>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SECONDARY.map((item) => {
          const Icon = ICONS[item.id] ?? Globe;
          return (
            <a
              key={item.id}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors duration-300 hover:border-[var(--gold)]/40"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--gold)]/25 bg-[var(--gold)]/10 text-[var(--gold)]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-white transition-colors group-hover:text-[var(--gold)]">
                  {item.label}
                </span>
                <span className="block truncate text-xs text-[var(--color-text-secondary)]">
                  {item.description}
                </span>
              </span>
              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-[var(--gold)]" />
            </a>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
