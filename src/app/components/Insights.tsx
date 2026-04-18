import { useNavigate } from "react-router";
import { ArrowLeft, CalendarDays, ListChecks, Sparkles, TrendingUp } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const progressData = [
  { week: "W1", score: 46 },
  { week: "W2", score: 51 },
  { week: "W4", score: 58 },
  { week: "W8", score: 67 },
  { week: "W12", score: 74 },
];

const insights = [
  "Sleep is the fastest lever. Add 30 to 45 minutes and your trajectory improves early.",
  "Two extra exercise days usually matter more than chasing perfect diet details first.",
  "Reducing sitting time helps both energy and consistency in the same week.",
];

const plan = [
  "Move bedtime earlier by 30 minutes.",
  "Add two short walks on weekdays.",
  "Replace one long sitting block with a standing break.",
];

const routine = [
  "Mon: 20-minute walk, sleep target, water check.",
  "Wed: light workout, short reset break, simple dinner.",
  "Fri: review the week and repeat what worked.",
];

export function Insights() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F6F8FB] px-6 py-8 text-[#0F172A]">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6B7280]">Insights</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Your minimum plan</h1>
          </div>
          <Button
            variant="outline"
            className="rounded-full border-slate-200 bg-white px-5 text-[#0F172A] hover:bg-slate-50"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-white/80 bg-white/85 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                <Sparkles className="size-5 text-cyan-600" />
                Key insights
              </CardTitle>
              <CardDescription className="text-[#6B7280]">
                Short guidance, no long text blocks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm leading-6 text-[#0F172A]">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/80 bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-cyan-200/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                <TrendingUp className="size-5" />
                Progress preview
              </CardTitle>
              <CardDescription className="text-white/80">
                A simple rise over the first 12 weeks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <XAxis dataKey="week" tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.8)" />
                    <YAxis tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.8)" domain={[40, 80]} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 16,
                        border: "none",
                        background: "rgba(255,255,255,0.95)",
                      }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#FFFFFF" strokeWidth={3} dot={{ r: 4, fill: "#FFFFFF" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/80 bg-white/85 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                <ListChecks className="size-5 text-cyan-600" />
                Minimum plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-6 text-[#0F172A]">
                {plan.map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="mt-2 size-2 rounded-full bg-cyan-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-white/80 bg-white/85 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                <CalendarDays className="size-5 text-cyan-600" />
                Weekly routine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {routine.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm leading-6 text-[#0F172A]">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}