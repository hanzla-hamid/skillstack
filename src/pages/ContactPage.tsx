import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionComponents";
import { GlassCard } from "@/components/shared/GlassCard";
import { GoldButton } from "@/components/shared/buttons";
import { BRAND, PROGRAMS } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Name is required";
    else if (name.trim().length < 2) next.name = "Name must be at least 2 characters";
    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email";
    if (!message.trim()) next.message = "Message is required";
    else if (message.trim().length < 10) next.message = "Message must be at least 10 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone: phone || null,
      program: program || null,
      message,
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Something went wrong while sending your message. Please try again.",
      });
    } else {
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setProgram("");
      setMessage("");
      toast({ title: "Message sent!", description: "We will get back to you within 24 hours." });
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <PageHero
        eyebrow="Get in Touch"
        title="Contact"
        highlight="Us"
        subtitle="Have questions about our programs? Want to visit our campus? We are here to help you take the next step in your learning journey."
      />

      <SectionWrapper className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white mb-1">Visit Our Campus</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{BRAND.address}</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white mb-1">Call Us</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{BRAND.phone1}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{BRAND.phone2}</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white mb-1">Email Us</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{BRAND.email}</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white mb-1">Office Hours</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Monday - Friday: 9:00 AM - 7:00 PM
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Saturday: 10:00 AM - 4:00 PM
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Sunday: Closed</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Contact Form */}
          <div>
            {submitted ? (
              <GlassCard className="p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-[var(--gold)]/20 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-[var(--color-text-secondary)] mb-8">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[var(--gold)] hover:underline font-medium"
                >
                  Send another message
                </button>
              </GlassCard>
            ) : (
              <GlassCard className="p-8">
                <h3 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[var(--gold)]" /> Send Us a Message
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Fill out the form below and we will respond within 24 hours.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-1.5 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--gold)]/50 transition-colors"
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-1.5 block">Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--gold)]/50 transition-colors"
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-1.5 block">Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 3XX XXXXXXX"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--gold)]/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-1.5 block">
                      Program of Interest
                    </label>
                    <select
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[var(--gold)]/50 transition-colors"
                    >
                      <option value="">Select a program</option>
                      {PROGRAMS.map((p) => (
                        <option key={p.slug} value={p.title} className="bg-[var(--color-surface)]">
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-1.5 block">Message *</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--gold)]/50 transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1">{errors.message}</p>
                    )}
                  </div>
                  <GoldButton type="submit" disabled={loading} className="mt-2">
                    {loading ? "Sending..." : "Send Message"}
                  </GoldButton>
                </form>
              </GlassCard>
            )}
          </div>
        </div>
      </SectionWrapper>

      {/* Google Maps */}
      <section className="px-6 sm:px-8 lg:px-12 pb-20 md:pb-28 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--gold)]" /> Find Us on the Map
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">{BRAND.address}</p>
            </div>
            <div className="relative w-full" style={{ paddingBottom: "40%" }}>
              <iframe
                title="SkillStack Campus Location"
                src="https://www.google.com/maps?q=Rawalpindi,Pakistan&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
