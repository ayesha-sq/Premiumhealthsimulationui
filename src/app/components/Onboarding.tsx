import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Activity } from "lucide-react";

interface OnboardingData {
  age: string;
  sex: string;
  height: string;
  weight: string;
  health: string;
  sleep: string;
  consistency: string;
  stress: string;
  activity: string;
  sitting: string;
  diet: string;
}

const questions = [
  {
    id: "age",
    title: "What's your age?",
    type: "number",
    placeholder: "Enter your age",
  },
  {
    id: "sex",
    title: "What's your biological sex?",
    type: "select",
    options: ["Male", "Female"],
  },
  {
    id: "height",
    title: "What's your height?",
    type: "text",
    placeholder: "e.g., 5'10\" or 178cm",
  },
  {
    id: "weight",
    title: "What's your weight?",
    type: "text",
    placeholder: "e.g., 165 lbs or 75 kg",
  },
  {
    id: "health",
    title: "How would you rate your overall health?",
    type: "select",
    options: ["Excellent", "Good", "Fair", "Poor"],
  },
  {
    id: "sleep",
    title: "How many hours do you sleep per night?",
    type: "number",
    placeholder: "Average hours",
  },
  {
    id: "consistency",
    title: "How consistent are your sleep and meal times?",
    type: "select",
    options: ["Very consistent", "Somewhat consistent", "Inconsistent"],
  },
  {
    id: "stress",
    title: "How would you rate your stress levels?",
    type: "select",
    options: ["Low", "Moderate", "High", "Very high"],
  },
  {
    id: "activity",
    title: "How many days per week do you exercise?",
    type: "number",
    placeholder: "Days per week",
  },
  {
    id: "sitting",
    title: "How many hours do you sit per day?",
    type: "number",
    placeholder: "Average hours",
  },
  {
    id: "diet",
    title: "How would you describe your diet?",
    type: "select",
    options: ["Very healthy", "Mostly healthy", "Mixed", "Mostly unhealthy"],
  },
];

export function Onboarding() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    age: "",
    sex: "",
    height: "",
    weight: "",
    health: "",
    sleep: "",
    consistency: "",
    stress: "",
    activity: "",
    sitting: "",
    diet: "",
  });
  const navigate = useNavigate();

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleNext = () => {
    if (step < questions.length - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      localStorage.setItem("vitalsData", JSON.stringify(data));
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const updateData = (value: string) => {
    setData({ ...data, [currentQuestion.id]: value });
  };

  const isValid = data[currentQuestion.id as keyof OnboardingData] !== "";

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity className="w-8 h-8 text-[#4F46E5]" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
              VITALS
            </h1>
          </div>
          <p className="text-[#6B7280]">Two futures. One decision.</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-sm text-[#6B7280] mt-2 text-center">
            Step {step + 1} of {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg p-8 border border-white/20"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-6">
                {currentQuestion.title}
              </h2>

              {currentQuestion.type === "number" || currentQuestion.type === "text" ? (
                <input
                  type={currentQuestion.type}
                  value={data[currentQuestion.id as keyof OnboardingData]}
                  onChange={(e) => updateData(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full px-4 py-4 text-lg bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
                  autoFocus
                />
              ) : (
                <div className="grid gap-3">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option}
                      onClick={() => updateData(option)}
                      className={`p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                        data[currentQuestion.id as keyof OnboardingData] === option
                          ? "border-[#4F46E5] bg-[#4F46E5]/5"
                          : "border-gray-200 bg-white/80 hover:border-[#4F46E5]/50"
                      }`}
                    >
                      <span className="text-[#0F172A]">{option}</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 gap-4">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="px-6 py-3 text-[#6B7280] hover:text-[#0F172A] disabled:opacity-0 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!isValid}
              className="px-8 py-3 bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 flex items-center gap-2"
            >
              {step === questions.length - 1 ? "See My Future" : "Next"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
