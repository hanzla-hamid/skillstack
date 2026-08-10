import React, { useState } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { BRAND, PROGRAMS } from "@/lib/constants";
import { Logo } from "@/components/layout/Logo";
import { DynamicBackground } from "@/components/shared/DynamicBackground";
import { GlassCard } from "@/components/shared/GlassCard";
import { GoldButton } from "@/components/shared/buttons";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, MailCheck, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { refreshProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [courseInterest, setCourseInterest] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [resending, setResending] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!fullName.trim()) {
      next.fullName = "Full name is required";
    } else if (fullName.trim().length < 2) {
      next.fullName = "Name must be at least 2 characters";
    }
    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Please enter a valid email address";
    }
    if (!password) {
      next.password = "Password is required";
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      next.confirmPassword = "Passwords do not match";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (data.user) {
      const needsVerification = !data.session;

      if (!needsVerification) {
        await refreshProfile();

        if (courseInterest) {
          const { data: course } = await supabase
            .from("courses")
            .select("id")
            .eq("slug", courseInterest)
            .maybeSingle();

          if (course) {
            await supabase.from("enrollments").insert({
              user_id: data.user.id,
              course_id: (course as { id: string }).id,
            });
          }
        }

        toast({ title: "Account created!", description: "Welcome to SkillStack." });
        setLocation("/dashboard");
      } else {
        setVerificationSent(true);
      }
    }

    setLoading(false);
  };

  const handleResendVerification = async () => {
    setResending(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setResending(false);
    if (error) {
      toast({ title: "Could not resend", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Verification email sent", description: `We sent another link to ${email}.` });
  };

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });

    if (error) {
      toast({
        title: "Google sign-up failed",
        description: error.message,
        variant: "destructive",
      });
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[var(--color-bg)]">
      <DynamicBackground />

      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative z-10 border-r border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/90 pointer-events-none" />

        <div className="relative z-10">
          <Logo />
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-display font-bold mb-6 leading-tight">
            Start Your Journey as a <span className="gold-gradient-text">Founding Learner</span>
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] mb-8">
            Join the most elite hybrid learning academy in Pakistan. Master real-world skills.
          </p>

          <ul className="space-y-4">
            {[
              "Project-based physical & online classes",
              "Industry professional mentorship",
              "Verifiable certificates",
              "Career & freelancing guidance",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80">
                <div className="w-6 h-6 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/50 flex items-center justify-center text-[var(--gold)] text-sm">
                  ✓
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 text-sm text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 overflow-y-auto">
        <div className="w-full max-w-md my-auto py-8">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo />
          </div>

          {verificationSent ? (
            <GlassCard strong className="p-10 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[var(--gold)]/15 blur-[90px] pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] mb-6">
                  <MailCheck className="w-9 h-9" />
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-3">
                  Verify your email
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-2">
                  We sent a confirmation link to
                </p>
                <p className="text-[var(--gold)] font-medium break-all mb-6">{email}</p>

                <div className="w-full text-left space-y-3 bg-black/40 border border-white/10 rounded-2xl p-5 mb-8">
                  {[
                    "Open the email from SkillStack",
                    "Tap the confirmation link",
                    "You will land straight in your dashboard",
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="w-6 h-6 shrink-0 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      {s}
                    </div>
                  ))}
                </div>

                <GoldButton
                  className="w-full mb-3"
                  onClick={handleResendVerification}
                  disabled={resending}
                >
                  <RefreshCw className={`w-4 h-4 ${resending ? "animate-spin" : ""}`} />
                  {resending ? "Sending..." : "Resend verification email"}
                </GoldButton>

                <p className="text-xs text-white/40 mb-6">
                  Not in your inbox? Check spam or promotions.
                </p>

                <div className="w-full border-t border-white/10 pt-5 text-sm text-[var(--color-text-secondary)]">
                  Already verified?{" "}
                  <Link href="/login" className="text-[var(--gold)] hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard strong className="p-8 shadow-2xl relative">
              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold mb-2 text-white">Create Account</h2>
                <p className="text-[var(--color-text-secondary)]">
                  Join SkillStack and start learning today.
                </p>
              </div>

              <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={googleLoading || loading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-white/10 rounded-xl px-6 py-3.5 text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {googleLoading ? "Connecting..." : "Sign up with Google"}
              </button>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                  or
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form onSubmit={handleRegister} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <label htmlFor="reg-name" className="text-sm font-medium text-white/80">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      id="reg-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      aria-invalid={!!errors.fullName}
                      className="w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="reg-email" className="text-sm font-medium text-white/80">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      id="reg-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      aria-invalid={!!errors.email}
                      className="w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="reg-password" className="text-sm font-medium text-white/80">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      aria-invalid={!!errors.password}
                      className="w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white/70 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-400 mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="reg-confirm" className="text-sm font-medium text-white/80">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      id="reg-confirm"
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                      }}
                      aria-invalid={!!errors.confirmPassword}
                      className="w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors"
                      placeholder="Re-enter your password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-400 mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="reg-course" className="text-sm font-medium text-white/80">
                    Course of Interest (Optional)
                  </label>
                  <select
                    id="reg-course"
                    value={courseInterest}
                    onChange={(e) => setCourseInterest(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--gold)] transition-colors appearance-none"
                  >
                    <option value="">Select a program...</option>
                    {PROGRAMS.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-start gap-3 mt-4 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 rounded bg-black/60 border-white/10 text-[var(--gold)] focus:ring-[var(--gold)] w-4 h-4"
                  />
                  <label htmlFor="terms" className="text-xs text-white/60 leading-relaxed">
                    I agree to the SkillStack{" "}
                    <Link href="/terms" className="text-[var(--gold)] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-[var(--gold)] hover:underline">
                      Privacy Policy
                    </Link>
                    . I understand that this is a premium academy.
                  </label>
                </div>

                <GoldButton
                  type="submit"
                  className="w-full mt-6 flex justify-between items-center px-6"
                  disabled={loading}
                >
                  <span>{loading ? "Creating account..." : "Create Account"}</span>
                  <ArrowRight className="w-5 h-5" />
                </GoldButton>
              </form>

              <div className="mt-8 text-center text-sm text-[var(--color-text-secondary)] border-t border-white/10 pt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-[var(--gold)] hover:underline font-medium">
                  Sign in here
                </Link>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
