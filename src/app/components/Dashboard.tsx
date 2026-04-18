import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Activity, ChevronRight, Menu, Sparkles, Clock3 } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Slider } from "./ui/slider";

type Habits = {
  sleep: number;
  exercise: number;
  stress: number;
  diet: number;
  sitting: number;
};

type Point = {
  week: number;
  current: number;
  improved: number;
};

const weeks = [0, 4, 12, 26, 52];

const habitConfig = [
  { key: "sleep", label: "Sleep", min: 4, max: 10, step: 0.5, unit: "h" },
  { key: "exercise", label: "Exercise", min: 0, max: 7, step: 1, unit: "days" },
  { key: "stress", label: "Stress", min: 1, max: 10, step: 1, unit: "/10" },
  { key: "diet", label: "Diet", min: 1, max: 10, step: 1, unit: "/10" },
  { key: "sitting", label: "Sitting", min: 4, max: 14, step: 1, unit: "h" },
] as const;

const initialHabits: Habits = {
  sleep: 6.5,
  exercise: 2,
  stress: 7,
  diet: 5,
  sitting: 10,
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const toScore = (habits: Habits) => {
  const sleepScore = (habits.sleep - 4) / 6;
  const exerciseScore = habits.exercise / 7;
  const stressScore = 1 - (habits.stress - 1) / 9;
  const dietScore = (habits.diet - 1) / 9;
  const sittingScore = 1 - (habits.sitting - 4) / 10;

  const raw = sleepScore * 0.28 + exerciseScore * 0.22 + stressScore * 0.22 + dietScore * 0.18 + sittingScore * 0.1;
  return 42 + raw * 40;
};

export function Dashboard() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habits>(initialHabits);

  useEffect(() => {
    const stored = window.localStorage.getItem("vitalsData");
    if (!stored) {
      navigate("/onboarding");
    }
  }, [navigate]);

  const chartData = useMemo<Point[]>(() => {
    const baseline = toScore(habits);
    const improvementBonus = clamp(
      (habits.sleep - 6) * 1.2 + habits.exercise * 1.4 + (10 - habits.stress) * 0.9 + habits.diet * 0.7 + (12 - habits.sitting) * 0.8,
      0,
      18,
    );

    return weeks.map((week, index) => {
      const currentDrop = week * 0.23 + index * 0.5;
      const improvedGain = week * 0.12 + improvementBonus * 0.28 + index * 0.3;

      return {
        week,
        current: Math.round(clamp(baseline - currentDrop, 18, 100)),
        improved: Math.round(clamp(baseline + improvedGain, 18, 100)),
      };
    });
  }, [habits]);

  const gap = Math.max(0, chartData[chartData.length - 1].improved - chartData[chartData.length - 1].current);

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#0F172A]">
      <div className="flex min-h-screen flex-col">
        <header className="flex h-16 items-center justify-between border-b border-white/80 bg-white/70 px-6 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-cyan-200/40">
              <Activity className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6B7280]">VITALS</p>
              <p className="text-sm text-[#6B7280]">Trajectory dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden rounded-full px-4 text-[#0F172A] hover:bg-slate-100 sm:inline-flex"
              onClick={() => navigate("/insights")}
            >
              Insights
              <ChevronRight className="size-4" />
            </Button>
            <Button
              className="rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 text-white shadow-lg shadow-cyan-200/40 transition-transform duration-200 hover:-translate-y-0.5"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </div>
        </header>

        <div className="grid flex-1 lg:grid-cols-[280px_1fr]">
          <aside className="border-b border-white/80 bg-white/70 p-6 backdrop-blur-xl lg:border-b-0 lg:border-r">
            <div className="space-y-4">
              <Card className="border-white/80 bg-white/90 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#6B7280]">Improvement gap</p>
                      <p className="mt-1 text-3xl font-semibold">+{gap}</p>
                    </div>
                    <div className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
                      Week 52
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                    The chart updates instantly when the sliders move.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-white/80 bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-cyan-200/40">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-white/85">
                    <Sparkles className="size-4" />
                    Small adjustments matter
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/90">
                    Try changing one habit at a time to see how the improved path pulls away.
                  </p>
                </CardContent>
              </Card>

              <div className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
                  <Menu className="size-4" />
                  Quick context
                </div>
                <div className="mt-4 space-y-3 text-sm text-[#6B7280]">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Current path</span>
                    <span className="font-medium text-rose-500">#F43F5E</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Improved path</span>
                    <span className="font-medium text-cyan-600">#0EA5E9</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Timeline</span>
                    <span className="font-medium text-[#0F172A]">0, 4, 12, 26, 52 weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="space-y-6 p-6 md:p-8">
            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
              <Card className="border-white/80 bg-white/85 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <CardHeader className="pb-0">
                  <CardTitle className="text-2xl font-semibold">Your future trajectory</CardTitle>
                  <CardDescription className="text-[#6B7280]">
                    Current habits versus a realistic improved path.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[420px] rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 10, right: 16, bottom: 8, left: 0 }}>
                        <CartesianGrid strokeDasharray="4 8" stroke="#E2E8F0" vertical={false} />
                        <XAxis dataKey="week" tickLine={false} axisLine={false} stroke="#94A3B8" />
                        <YAxis tickLine={false} axisLine={false} stroke="#94A3B8" domain={[20, 100]} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: 16,
                            border: "1px solid #E2E8F0",
                            background: "rgba(255,255,255,0.96)",
                          }}
                        />
                        <Line type="monotone" dataKey="current" stroke="#F43F5E" strokeWidth={3} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="improved" stroke="#0EA5E9" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-rose-100 bg-rose-50/80 p-4">
                      <div className="text-sm font-medium text-rose-500">Current path</div>
                      <p className="mt-1 text-sm text-[#6B7280]">What happens if nothing changes.</p>
                    </div>
                    <div className="rounded-2xl border border-cyan-100 bg-cyan-50/80 p-4">
                      <div className="text-sm font-medium text-cyan-600">Improved path</div>
                      <p className="mt-1 text-sm text-[#6B7280]">What happens if habits improve.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/80 bg-white/85 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-semibold">Divergence snapshot</CardTitle>
                  <CardDescription className="text-[#6B7280]">Fast readout based on the current slider state.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Gap at week 52", value: `+${gap}` },
                    { label: "Current score", value: `${chartData[chartData.length - 1].current}` },
                    { label: "Improved score", value: `${chartData[chartData.length - 1].improved}` },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                      <span className="text-sm text-[#6B7280]">{item.label}</span>
                      <span className="text-lg font-semibold text-[#0F172A]">{item.value}</span>
                    </div>
                  ))}

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm leading-6 text-[#6B7280]">
                    Move to the plan view for concise next steps, or keep tuning the habits below.
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-white/80 bg-white/85 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Adjust habits</CardTitle>
                <CardDescription className="text-[#6B7280]">Five sliders drive the chart in real time.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 lg:grid-cols-2">
                {habitConfig.map((item) => {
                  const value = habits[item.key];

                  return (
                    <motion.div
                      key={item.key}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4"
                    >
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-sm font-medium text-[#6B7280]">{item.label}</div>
                          <div className="mt-1 text-xl font-semibold text-[#0F172A]">
                            {value} {item.unit}
                          </div>
                        </div>
                        <Clock3 className="size-5 text-[#94A3B8]" />
                      </div>

                      <Slider
                        value={[value]}
                        min={item.min}
                        max={item.max}
                        step={item.step}
                        onValueChange={(nextValues: number[]) =>
                          setHabits((current) => ({
                            ...current,
                            [item.key]: nextValues[0],
                          }))
                        }
                        className="py-2"
                      />
                      <div className="mt-3 flex items-center justify-between text-xs text-[#94A3B8]">
                        <span>{item.min}</span>
                        <span>{item.max}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>

            <div className="flex justify-end pb-2">
              <Button
                className="rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 text-white shadow-lg shadow-cyan-200/40 transition-transform duration-200 hover:-translate-y-0.5"
                onClick={() => navigate("/insights")}
              >
                View insights
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}