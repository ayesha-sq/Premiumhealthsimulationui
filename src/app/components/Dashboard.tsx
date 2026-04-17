import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Activity, TrendingUp, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

interface HabitSettings {
  sleep: number;
  exercise: number;
  stress: number;
  diet: number;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState<HabitSettings>({
    sleep: 6,
    exercise: 2,
    stress: 7,
    diet: 5,
  });

  useEffect(() => {
    const stored = localStorage.getItem("vitalsData");
    if (!stored) {
      navigate("/");
    }
  }, [navigate]);

  const combinedData = useMemo(() => {
    const generateChartData = (improved: boolean) => {
      const data = [];
      const currentAge = 30;
      const sleepFactor = improved ? 8 : habits.sleep;
      const exerciseFactor = improved ? 5 : habits.exercise;
      const stressFactor = improved ? 3 : habits.stress;
      const dietFactor = improved ? 8 : habits.diet;

      const healthScore =
        (sleepFactor / 8) * 25 +
        (exerciseFactor / 7) * 25 +
        ((10 - stressFactor) / 10) * 25 +
        (dietFactor / 10) * 25;

      const declineRate = improved ? 0.3 : 1.2;

      for (let year = 0; year <= 50; year += 5) {
        const age = currentAge + year;
        const decline = year * declineRate;
        const vitality = Math.max(20, healthScore - decline);
        data.push({
          age,
          vitality: Math.round(vitality),
        });
      }

      return data;
    };

    const currentData = generateChartData(false);
    const improvedData = generateChartData(true);

    return currentData.map((current, index) => ({
      id: `age-${current.age}`,
      age: current.age,
      current: current.vitality,
      improved: improvedData[index].vitality,
    }));
  }, [habits.sleep, habits.exercise, habits.stress, habits.diet]);

  const yearsDifference = useMemo(() => {
    const currentIndex = combinedData.findIndex((d) => d.current < 50);
    const improvedIndex = combinedData.findIndex((d) => d.improved < 50);
    return improvedIndex - currentIndex;
  }, [combinedData]);

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* Topbar */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#4F46E5]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
              VITALS
            </h1>
          </div>
          <button
            onClick={() => navigate("/insights")}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <Lightbulb className="w-4 h-4" />
            View Insights
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 min-h-[calc(100vh-73px)] bg-white/50 backdrop-blur-xl border-r border-white/20 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-[#6B7280] mb-4">
                ADJUST YOUR HABITS
              </h3>
              <div className="space-y-6">
                {/* Sleep */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-[#0F172A]">Sleep</label>
                    <span className="text-sm font-medium text-[#4F46E5]">
                      {habits.sleep}h/night
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="10"
                    step="0.5"
                    value={habits.sleep}
                    onChange={(e) =>
                      setHabits({ ...habits, sleep: parseFloat(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4F46E5]"
                  />
                </div>

                {/* Exercise */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-[#0F172A]">Exercise</label>
                    <span className="text-sm font-medium text-[#4F46E5]">
                      {habits.exercise} days/week
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="7"
                    step="1"
                    value={habits.exercise}
                    onChange={(e) =>
                      setHabits({ ...habits, exercise: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4F46E5]"
                  />
                </div>

                {/* Stress */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-[#0F172A]">Stress Level</label>
                    <span className="text-sm font-medium text-[#F43F5E]">
                      {habits.stress}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={habits.stress}
                    onChange={(e) =>
                      setHabits({ ...habits, stress: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#F43F5E]"
                  />
                </div>

                {/* Diet */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-[#0F172A]">Diet Quality</label>
                    <span className="text-sm font-medium text-[#4F46E5]">
                      {habits.diet}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={habits.diet}
                    onChange={(e) =>
                      setHabits({ ...habits, diet: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4F46E5]"
                  />
                </div>
              </div>
            </div>

            {/* Impact Card */}
            <motion.div
              key={yearsDifference}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-2xl p-6 text-white"
            >
              <TrendingUp className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-1">Potential Impact</h3>
              <p className="text-sm opacity-90">
                Improving your habits could add{" "}
                <span className="font-bold text-lg">{Math.max(0, yearsDifference * 5)}</span>{" "}
                healthy years to your life
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-2">
                Your Health Trajectory
              </h2>
              <p className="text-[#6B7280]">
                See how your choices shape your future vitality
              </p>
            </div>

            {/* Chart Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg p-8 border border-white/20">
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={combinedData} id="vitality-chart">
                    <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      key="x-axis"
                      dataKey="age"
                      stroke="#6B7280"
                      label={{ value: "Age", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      key="y-axis"
                      stroke="#6B7280"
                      label={{ value: "Vitality Score", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      key="tooltip"
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "12px",
                      }}
                    />
                    <Legend key="legend" />
                    <Line
                      key="current-line"
                      type="monotone"
                      dataKey="current"
                      stroke="#F43F5E"
                      strokeWidth={3}
                      name="Current Path"
                      dot={{ fill: "#F43F5E", r: 4 }}
                      isAnimationActive={false}
                    />
                    <Line
                      key="improved-line"
                      type="monotone"
                      dataKey="improved"
                      stroke="#0EA5E9"
                      strokeWidth={3}
                      name="Improved Path"
                      dot={{ fill: "#0EA5E9", r: 4 }}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Legend Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-4 rounded-full bg-[#F43F5E]" />
                  <h3 className="font-semibold text-[#0F172A]">Current Path</h3>
                </div>
                <p className="text-sm text-[#6B7280]">
                  Based on your current lifestyle habits
                </p>
              </div>
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-4 rounded-full bg-[#0EA5E9]" />
                  <h3 className="font-semibold text-[#0F172A]">Improved Path</h3>
                </div>
                <p className="text-sm text-[#6B7280]">
                  What's possible with optimized habits
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
