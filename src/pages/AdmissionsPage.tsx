import React, { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionComponents";
import { GlassCard } from "@/components/shared/GlassCard";
import { GoldButton } from "@/components/shared/buttons";
import { PROGRAMS } from "@/lib/constants";
import { slideUp } from "@/lib/animations";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { CheckCircle2, GraduationCap, Award, HelpCircle } from "lucide-react";

const applicationSchema = z.object({
  kind: z.enum(["admission", "scholarship", "inquiry"]),
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number")
    .max(30)
    .regex(/^[0-9+()\-\s]+$/, "Phone number can only contain digits and + ( ) -"),
  city: z.string().trim().max(80).nullable(),
  program: z.string().trim().min(1, "Please select a program").max(120),
  mode: z.string().trim().max(40).nullable(),
  scholarship_type: z.string().trim().max(40).nullable(),
  topic: z.string().trim().max(40).nullable(),
  message: z.string().trim().max(2000).nullable(),
});

type TabId = "admission" | "scholarship" | "inquiry";

const TABS: {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  blurb: string;
}[] = [
  {
    id: "admission",
    label: "Admission Form",
    icon: GraduationCap,
    blurb: "Apply for a seat in the upcoming batch.",
  },
  {
    id: "scholarship",
    label: "Scholarship Form",
    icon: Award,
    blurb: "Request need or merit based financial support.",
  },
  {
    id: "inquiry",
    label: "Course Inquiry",
    icon: HelpCircle,
    blurb: "Ask us anything before you enroll.",
  },
];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-[var(--color-text-muted)] outline-none transition-colors focus:border-[var(--gold)]/60 focus:ring-2 focus:ring-[var(--gold)]/20";

const Field: React.FC<{
  id: string;
  label: string;
  children?: React.ReactNode;
  type?: string;
  required?: boolean;
  placeholder?: string;
}> = ({ id, label, children, type = "text", required = true, placeholder }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-[var(--color-text-secondary)]">
      {label} {required && <span className="text-[var(--gold)]">*</span>}
    </label>
    {children ?? (
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    )}
  </div>
);

export default function AdmissionsPage() {
  const [tab, setTab] = useState<TabId>("admission");
  const [submitted, setSubmitted] = useState<TabId | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const payload = {
      kind: tab,
      full_name: value("fullName"),
      email: value("email").toLowerCase(),
      phone: value("phone"),
      city: value("city") || null,
      program: value("program"),
      mode: tab === "admission" ? value("mode") || null : null,
      scholarship_type: tab === "scholarship" ? value("scholarshipType") || null : null,
      topic: tab === "inquiry" ? value("topic") || null : null,
      message: value("message") || null,
    };

    const parsed = applicationSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error("Please check your details", {
        description: parsed.error.issues[0]?.message ?? "Some fields are invalid.",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("admissions_applications").insert(parsed.data);
    setSubmitting(false);

    if (error) {
      const duplicate =
        typeof error.message === "string" && error.message.includes("duplicate_application");
      toast.error(duplicate ? "Already submitted" : "Submission failed", {
        description: duplicate
          ? "We already received this form for the same program in the last 24 hours. Our team will contact you soon."
          : "Something went wrong. Please try again in a moment.",
      });
      return;
    }

    setSubmitted(tab);
    toast.success("Submitted successfully", {
      description: "Our team will contact you within 24 hours.",
    });
    form.reset();
  };

  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Admissions"
        title="Start your journey with"
        highlight="SkillStack"
        subtitle="Apply for admission, request a scholarship, or ask us about any program."
      />

      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          <div
            role="tablist"
            aria-label="Admissions forms"
            className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = t.id === tab;
              return (
                <button
                  key={t.id}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => {
                    setTab(t.id);
                    setSubmitted(null);
                  }}
                  className={`flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "border-[var(--gold)]/60 bg-[var(--gold)]/10 text-[var(--gold)]"
                      : "border-white/10 bg-[var(--color-surface-card)]/50 text-[var(--color-text-secondary)] hover:border-[var(--gold)]/30 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Scan-to-apply alternatives (local QR assets) */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                img: "/images/homepage/Google%20form.png",
                alt: "QR code linking to the SkillStack admission application form",
                label: "Application Form",
                text: "Scan to open the application form on your phone.",
              },
              {
                img: "/images/homepage/watsapp.png",
                alt: "QR code to message the SkillStack admissions team on WhatsApp",
                label: "Talk to Admissions",
                text: "Scan to message our admissions team on WhatsApp.",
              },
            ].map((q) => (
              <div
                key={q.label}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[var(--color-surface-card)]/50 p-4"
              >
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white p-1">
                  <img
                    src={q.img}
                    alt={q.alt}
                    width={96}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{q.label}</div>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{q.text}</p>
                </div>
              </div>
            ))}
          </div>

          <motion.div key={tab} variants={slideUp} initial="hidden" animate="visible">
            <GlassCard
              strong
              className="p-6 md:p-10"
              role="tabpanel"
              id={`panel-${tab}`}
              aria-labelledby={`tab-${tab}`}
            >
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                {active.label}
              </h2>
              <p className="mt-2 text-[var(--color-text-secondary)]">{active.blurb}</p>

              {submitted === tab ? (
                <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-8 text-center">
                  <CheckCircle2 className="h-10 w-10 text-[var(--gold)]" />
                  <p className="font-display text-xl font-semibold text-white">Thank you!</p>
                  <p className="text-[var(--color-text-secondary)]">
                    Your {active.label.toLowerCase()} has been received. Our team will reach out
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(null)}
                    className="min-h-11 text-sm font-semibold text-[var(--gold)] underline-offset-4 hover:underline"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
                >
                  <Field id="fullName" label="Full name" placeholder="Your full name" />
                  <Field id="email" label="Email" type="email" placeholder="you@example.com" />
                  <Field id="phone" label="Phone number" type="tel" placeholder="+92 3XX XXXXXXX" />
                  <Field id="city" label="City" placeholder="Rawalpindi" />

                  <Field id="program" label="Program of interest">
                    <select
                      id="program"
                      name="program"
                      required
                      className={inputClass}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a program
                      </option>
                      {PROGRAMS.map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.title}
                        </option>
                      ))}
                      <option value="other">Other / Not sure yet</option>
                    </select>
                  </Field>

                  {tab === "admission" && (
                    <Field id="mode" label="Preferred mode">
                      <select
                        id="mode"
                        name="mode"
                        required
                        className={inputClass}
                        defaultValue="physical"
                      >
                        <option value="physical">Physical (Rawalpindi campus)</option>
                        <option value="online">Online</option>
                      </select>
                    </Field>
                  )}

                  {tab === "scholarship" && (
                    <Field id="scholarshipType" label="Scholarship type">
                      <select
                        id="scholarshipType"
                        name="scholarshipType"
                        required
                        className={inputClass}
                        defaultValue="need"
                      >
                        <option value="need">Need based</option>
                        <option value="merit">Merit based</option>
                      </select>
                    </Field>
                  )}

                  {tab === "inquiry" && (
                    <Field id="topic" label="Inquiry about">
                      <select
                        id="topic"
                        name="topic"
                        required
                        className={inputClass}
                        defaultValue="fees"
                      >
                        <option value="fees">Fees & payment plans</option>
                        <option value="schedule">Class schedule</option>
                        <option value="curriculum">Curriculum details</option>
                        <option value="other">Something else</option>
                      </select>
                    </Field>
                  )}

                  <div className="sm:col-span-2">
                    <Field
                      id="message"
                      label={
                        tab === "scholarship"
                          ? "Why do you need this scholarship?"
                          : tab === "inquiry"
                            ? "Your question"
                            : "Anything we should know?"
                      }
                      required={tab !== "admission"}
                    >
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required={tab !== "admission"}
                        placeholder="Tell us a little more…"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <GoldButton type="submit" className="w-full sm:w-auto" disabled={submitting}>
                      {submitting ? "Submitting…" : `Submit ${active.label.replace(" Form", "")}`}
                    </GoldButton>

                    <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                      By submitting you agree to be contacted by the SkillStack admissions team.
                    </p>
                  </div>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
