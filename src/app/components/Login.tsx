import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Activity, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

export function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] px-6 py-8 text-[#0F172A]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.section
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-center gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-cyan-200/40">
                <Activity className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6B7280]">
                  VITALS
                </p>
                <h1 className="text-3xl font-semibold">Two futures. One decision.</h1>
              </div>
            </div>

            <div className="max-w-xl space-y-4">
              <h2 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Continue to your twin.
              </h2>
              <p className="text-lg leading-8 text-[#6B7280]">
                This screen is UI only. It gives you a quick entry point before the 10-step onboarding flow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Fast", "No clutter"],
                ["Clear", "Simple step flow"],
                ["Visual", "Chart first"],
              ].map(([title, description]) => (
                <Card key={title} className="border-white/80 bg-white/80 shadow-sm backdrop-blur-xl">
                  <CardContent className="p-4">
                    <div className="text-sm font-semibold text-[#0F172A]">{title}</div>
                    <div className="mt-1 text-sm text-[#6B7280]">{description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <Card className="border-white/80 bg-white/85 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-semibold text-[#0F172A]">
                      {mode === "signin" ? "Sign in" : "Create account"}
                    </CardTitle>
                    <CardDescription className="mt-1 text-[#6B7280]">
                      Use the UI to continue into onboarding.
                    </CardDescription>
                  </div>
                  <div className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
                    Demo UI
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 rounded-full bg-slate-100 p-1">
                  {[
                    ["signin", "Sign in"],
                    ["signup", "Sign up"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setMode(value as "signin" | "signup")}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        mode === value
                          ? "bg-white text-[#0F172A] shadow-sm"
                          : "text-[#6B7280] hover:text-[#0F172A]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0F172A]">Email</label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94A3B8]" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="h-12 rounded-2xl border-slate-200 bg-white pl-10 text-base shadow-sm transition-all duration-200 focus-visible:border-cyan-300 focus-visible:ring-cyan-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0F172A]">Password</label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94A3B8]" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 rounded-2xl border-slate-200 bg-white pl-10 pr-12 text-base shadow-sm transition-all duration-200 focus-visible:border-cyan-300 focus-visible:ring-cyan-200"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current: boolean) => !current)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] transition-colors hover:text-[#0F172A]"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-[#6B7280]">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="size-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-200" />
                      Remember me
                    </label>
                    <button type="button" className="font-medium text-cyan-600 transition-colors hover:text-cyan-700">
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-cyan-200/50 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Continue
                    <ArrowRight className="size-4" />
                  </Button>
                </form>

                <div className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 text-sm leading-6 text-cyan-900">
                  The toggle only changes the UI state. Submitting takes you to onboarding.
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  );
}