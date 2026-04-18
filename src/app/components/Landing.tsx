import { useNavigate } from "react-router";
import { ArrowRight, Activity, BarChart3, Layers3, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const howItWorks = [
  {
    icon: Activity,
    title: "Input",
    text: "Share a few habits and baseline details.",
  },
  {
    icon: BarChart3,
    title: "Simulation",
    text: "See current and improved futures side by side.",
  },
  {
    icon: Sparkles,
    title: "Insight",
    text: "Get a clear plan that shows what to change first.",
  },
];

const chartPathCurrent = "M20 170 C 70 162, 110 156, 150 150 S 230 128, 270 120 S 350 110, 420 102";
const chartPathImproved = "M20 168 C 70 154, 110 140, 150 126 S 230 100, 270 84 S 350 66, 420 48";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#0F172A]">
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 md:px-10">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-8 flex items-center justify-between rounded-3xl border border-white/70 bg-white/70 px-5 py-4 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg shadow-cyan-200/40">
              <Activity className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6B7280]">
                VITALS
              </p>
              <p className="text-sm text-[#6B7280]">Two futures. One decision.</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <Button
              variant="ghost"
              className="rounded-full px-5 text-[#0F172A] hover:bg-[#E0F2FE] hover:text-[#0284C7]"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
            <Button
              className="rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 text-white shadow-lg shadow-cyan-200/50 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              onClick={() => navigate("/onboarding")}
            >
              Start simulation
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </motion.header>

        <section className="grid flex-1 items-center gap-10 py-4 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 shadow-sm">
              <Layers3 className="size-4" />
              Health simulation for clear decisions
            </div>

            <div className="space-y-5">
              <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
                See the cost of staying the same.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-[#6B7280] md:text-xl">
                VITALS shows two future trajectories from the same baseline so users can
                compare the current path with a realistic improved path.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                className="h-12 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 text-white shadow-lg shadow-cyan-200/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                onClick={() => navigate("/onboarding")}
              >
                Begin onboarding
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-full border-slate-200 bg-white/90 px-6 text-[#0F172A] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50"
                onClick={() => navigate("/login")}
              >
                Continue to login
              </Button>
            </div>

            <div className="grid max-w-2xl grid-cols-3 gap-4 pt-2 text-sm">
              {[
                ["52 weeks", "forecast horizon"],
                ["2 paths", "same baseline"],
                ["1 plan", "clear next step"],
              ].map(([value, label]) => (
                <div
                  key={value}
                  className="rounded-2xl border border-white/80 bg-white/80 px-4 py-4 shadow-sm backdrop-blur-sm"
                >
                  <div className="text-xl font-semibold text-[#0F172A]">{value}</div>
                  <div className="mt-1 text-[#6B7280]">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="relative"
          >
            <Card className="overflow-hidden border-white/80 bg-white/85 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <CardContent className="p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#6B7280]">Dual trajectory preview</p>
                    <h2 className="text-2xl font-semibold text-[#0F172A]">Current vs improved</h2>
                  </div>
                  <div className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
                    Live mock
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4">
                  <svg viewBox="0 0 460 220" className="h-[240px] w-full">
                    <defs>
                      <linearGradient id="vitalsGrid" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.15" />
                      </linearGradient>
                    </defs>
                    {[34, 74, 114, 154].map((y) => (
                      <line
                        key={y}
                        x1="18"
                        x2="440"
                        y1={y}
                        y2={y}
                        stroke="url(#vitalsGrid)"
                        strokeDasharray="4 8"
                      />
                    ))}
                    <path d={chartPathCurrent} fill="none" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={chartPathImproved} fill="none" stroke="#0EA5E9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="420" cy="102" r="5" fill="#F43F5E" />
                    <circle cx="420" cy="48" r="5" fill="#0EA5E9" />
                    <text x="28" y="24" fill="#6B7280" fontSize="12">Trajectory score</text>
                    <text x="340" y="196" fill="#6B7280" fontSize="12">Week 0</text>
                    <text x="410" y="196" fill="#6B7280" fontSize="12">Week 52</text>
                  </svg>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-rose-100 bg-rose-50/80 p-4">
                    <div className="text-sm font-medium text-[#F43F5E]">Current path</div>
                    <div className="mt-1 text-sm text-[#6B7280]">What happens if habits stay the same.</div>
                  </div>
                  <div className="rounded-2xl border border-cyan-100 bg-cyan-50/80 p-4">
                    <div className="text-sm font-medium text-[#0EA5E9]">Improved path</div>
                    <div className="mt-1 text-sm text-[#6B7280]">What changes if you act now.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section className="py-6 md:py-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6B7280]">
                How it works
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#0F172A]">From inputs to clarity</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#6B7280]">
              A few small inputs become a simple, visual forecast that makes inaction feel immediate.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.06 }}
              >
                <Card className="h-full border-white/80 bg-white/85 shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-md shadow-cyan-200/40">
                      <item.icon className="size-5" />
                    </div>
                    <div className="text-lg font-semibold text-[#0F172A]">{item.title}</div>
                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 py-6 md:grid-cols-[1.2fr_0.8fr] md:py-10">
          <Card className="border-white/80 bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-cyan-200/40">
            <CardContent className="flex h-full flex-col justify-between p-6 md:p-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/75">
                  Differentiator
                </p>
                <h3 className="mt-3 max-w-lg text-3xl font-semibold leading-tight">
                  Make the future feel concrete enough to act on today.
                </h3>
              </div>
              <p className="mt-8 max-w-xl text-sm leading-6 text-white/85">
                VITALS does not just report a score. It shows the gap between staying the same and making one or two realistic changes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/80 bg-white/85 shadow-sm backdrop-blur-xl">
            <CardContent className="flex h-full flex-col justify-between p-6 md:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6B7280]">
                  Final CTA
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-[#0F172A]">
                  Ready to see your twin?
                </h3>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="h-12 flex-1 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 text-white transition-transform duration-200 hover:-translate-y-0.5"
                  onClick={() => navigate("/onboarding")}
                >
                  Start onboarding
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-12 flex-1 rounded-full border-slate-200 bg-white px-6 text-[#0F172A] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}