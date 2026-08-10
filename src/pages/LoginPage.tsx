import React, { useState } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { BRAND } from "@/lib/constants";
import { Logo } from "@/components/layout/Logo";
import { DynamicBackground } from "@/components/shared/DynamicBackground";
import { GlassCard } from "@/components/shared/GlassCard";
import { GoldButton } from "@/components/shared/buttons";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { refreshProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = (): boolean => {
    const next: typeof errors = {};
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
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    await refreshProfile();
    toast({ title: "Login successful", description: "Welcome back to your dashboard." });
    setLocation("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });

    if (error) {
      toast({
        title: "Google sign-in failed",
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
            Welcome Back to <span className="gold-gradient-text">SkillStack</span>
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] mb-12">
            Continue your journey from learning to earning. Access your courses, projects, and
            community.
          </p>

          <div className="flex gap-8">
            <div>
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-[var(--gold)] uppercase tracking-wider font-semibold">
                Practical
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">0%</div>
              <div className="text-sm text-[var(--gold)] uppercase tracking-wider font-semibold">
                Theory Waste
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-12 flex justify-center">
            <Logo />
          </div>

          <GlassCard strong className="p-8 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/10 blur-[60px] pointer-events-none" />

            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold mb-2 text-white">Sign In</h2>
              <p className="text-[var(--color-text-secondary)]">
                Enter your credentials to access your account
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
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
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                or
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <form onSubmit={handleLogin} className="space-y-5" noValidate>
              <div className="space-y-2">
                <label htmlFor="login-email" className="text-sm font-medium text-white/80">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "login-email-error" : undefined}
                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p id="login-email-error" className="text-xs text-red-400 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="login-password" className="text-sm font-medium text-white/80">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "login-password-error" : undefined}
                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors"
                    placeholder="••••••••"
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
                  <p id="login-password-error" className="text-xs text-red-400 mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <GoldButton
                type="submit"
                className="w-full mt-6 flex justify-between items-center px-6"
                disabled={loading}
              >
                <span>{loading ? "Signing in..." : "Sign In to Dashboard"}</span>
                <ArrowRight className="w-5 h-5" />
              </GoldButton>
            </form>

            <div className="mt-8 text-center text-sm text-[var(--color-text-secondary)] border-t border-white/10 pt-6">
              Don't have an account yet?{" "}
              <Link href="/register" className="text-[var(--gold)] hover:underline font-medium">
                Create one now
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
