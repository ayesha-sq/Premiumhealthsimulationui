import { useNavigate } from "react-router";
import {
  Activity,
  ArrowLeft,
  TrendingUp,
  Target,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const improvementData = [
  { id: "w1", week: "Week 1", score: 45 },
  { id: "w2", week: "Week 2", score: 52 },
  { id: "w3", week: "Week 3", score: 58 },
  { id: "w4", week: "Week 4", score: 65 },
  { id: "w8", week: "Week 8", score: 72 },
  { id: "w12", week: "Week 12", score: 78 },
];

export function Insights() {
  const navigate = useNavigate();

  const insights = [
    {
      icon: TrendingUp,
      title: "Sleep is Your Foundation",
      description:
        "Increasing sleep from 6 to 7.5 hours could improve your vitality score by 15% within 3 months. Quality sleep enhances recovery, cognition, and metabolic health.",
    },
    {
      icon: Target,
      title: "Movement Compounds",
      description:
        "Adding just 2 more days of exercise per week creates exponential benefits. Regular activity reduces chronic disease risk by up to 40%.",
    },
    {
      icon: AlertCircle,
      title: "Stress Management Matters",
      description:
        "Chronic stress accelerates aging. Reducing stress from 7/10 to 4/10 through mindfulness or therapy could add 5-8 healthy years.",
    },
  ];

  const minimalChanges = [
    {
      habit: "Sleep",
      current: "6 hours",
      target: "7.5 hours",
      action: "Go to bed 30 minutes earlier, starting tonight",
    },
    {
      habit: "Exercise",
      current: "2 days/week",
      target: "4 days/week",
      action: "Add 2 morning walks (20min) on Tuesday and Thursday",
    },
    {
      habit: "Stress",
      current: "7/10",
      target: "4/10",
      action: "5-minute breathing exercises before lunch and dinner",
    },
  ];

  const weeklyRoutine = [
    { day: "Monday", tasks: ["7.5h sleep", "Morning meditation (5min)", "Healthy lunch prep"] },
    { day: "Tuesday", tasks: ["7.5h sleep", "20min walk", "Track meals"] },
    { day: "Wednesday", tasks: ["7.5h sleep", "Strength training (30min)", "Evening wind-down"] },
    { day: "Thursday", tasks: ["7.5h sleep", "20min walk", "Stress check-in"] },
    { day: "Friday", tasks: ["7.5h sleep", "Yoga or stretching (25min)", "Weekly review"] },
    { day: "Saturday", tasks: ["8h sleep", "Outdoor activity (45min)", "Meal prep"] },
    { day: "Sunday", tasks: ["8h sleep", "Nature walk", "Plan next week"] },
  ];

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
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 text-[#6B7280] hover:text-[#0F172A] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-[#0F172A] mb-3">
            Your Personalized Plan
          </h2>
          <p className="text-lg text-[#6B7280]">
            Small, sustainable changes that create lasting impact
          </p>
        </motion.div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold text-[#0F172A] mb-6">Key Insights</h3>
          <div className="grid gap-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex items-center justify-center">
                      <insight.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0F172A] mb-2">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-[#6B7280]">{insight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Minimum Change Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-[#4F46E5]" />
            <h3 className="text-2xl font-semibold text-[#0F172A]">
              Minimum Effective Changes
            </h3>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {minimalChanges.map((change, index) => (
                <div key={index} className="p-6 hover:bg-white/50 transition-all">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">Habit</p>
                      <p className="font-semibold text-[#0F172A]">{change.habit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">Current</p>
                      <p className="text-[#F43F5E] font-medium">{change.current}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">Target</p>
                      <p className="text-[#0EA5E9] font-medium">{change.target}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">Action</p>
                      <p className="text-sm text-[#0F172A]">{change.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Weekly Routine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-[#4F46E5]" />
            <h3 className="text-2xl font-semibold text-[#0F172A]">Weekly Routine</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {weeklyRoutine.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/20"
              >
                <h4 className="font-semibold text-[#0F172A] mb-3">{day.day}</h4>
                <ul className="space-y-2">
                  {day.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-1.5 flex-shrink-0" />
                      <span className="text-[#6B7280]">{task}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-2xl font-semibold text-[#0F172A] mb-6">
            Expected Progress
          </h3>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={improvementData} id="progress-chart">
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis key="x-axis" dataKey="week" stroke="#6B7280" />
                  <YAxis key="y-axis" stroke="#6B7280" />
                  <Tooltip
                    key="tooltip"
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                    }}
                  />
                  <Line
                    key="improvement-line"
                    type="monotone"
                    dataKey="score"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={{ fill: "#4F46E5", r: 5 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-sm text-[#6B7280] mt-4">
              Your vitality score with consistent habit improvements
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
