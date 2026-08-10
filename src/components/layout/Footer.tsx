import React, { useState } from "react";
import { Link } from "@/lib/router-compat";
import { Logo } from "./Logo";
import { BRAND, FOOTER_COLUMNS } from "@/lib/constants";
import { ParticleCanvas } from "../shared/ParticleCanvas";
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube, SiDiscord, SiWhatsapp } from "react-icons/si";

const SocialIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "facebook":
      return <SiFacebook className="w-5 h-5" />;
    case "instagram":
      return <SiInstagram className="w-5 h-5" />;
    case "x":
      return <SiX className="w-5 h-5" />;
    case "youtube":
      return <SiYoutube className="w-5 h-5" />;
    case "discord":
      return <SiDiscord className="w-5 h-5" />;
    case "whatsapp":
      return <SiWhatsapp className="w-5 h-5" />;
    case "email":
      return <Mail className="w-5 h-5" />;
    default:
      return <Mail className="w-5 h-5" />;
  }
};

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[var(--color-surface)] border-t border-white/5 pt-16 pb-8 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--gold)]/10 blur-[120px] rounded-full pointer-events-none" />
      <ParticleCanvas className="opacity-30" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Logo />
            <p className="text-[var(--color-text-secondary)] mt-1 text-sm sm:text-base">
              {BRAND.tagline} {BRAND.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {Object.entries(BRAND.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={BRAND.name + " on " + key}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--gold)] hover:border-[var(--gold)]/50 hover:bg-[var(--gold)]/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <SocialIcon name={key} />
                </a>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="font-display font-semibold text-white mb-3 text-sm">Newsletter</h4>
              {submitted ? (
                <div className="flex items-center gap-2 text-[var(--gold)] text-sm">
                  <CheckCircle2 className="w-4 h-4" /> You're subscribed! Watch your inbox.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    aria-label="Email for newsletter"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--gold)]/50 transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="shrink-0 w-10 h-10 rounded-xl bg-[var(--gold)] text-black flex items-center justify-center hover:bg-[var(--gold-hover)] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
          {FOOTER_COLUMNS.map((col, idx) => (
            <div key={idx} className="lg:col-span-2">
              <h4 className="font-display font-semibold text-white mb-4 text-sm sm:text-base">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-[var(--color-text-secondary)] hover:text-[var(--gold)] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--color-text-muted)]">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {BRAND.name}. {BRAND.organization}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[var(--gold)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--gold)] transition-colors">
              Terms
            </Link>
            <Link href="/refund-policy" className="hover:text-[var(--gold)] transition-colors">
              Refunds
            </Link>
            <span>
              Designed by <span className="text-[var(--gold)]">Hanzla Hamid</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
