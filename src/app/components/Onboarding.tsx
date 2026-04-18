import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowLeft, Activity, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

type AnswerValue = string | number;
type Answers = Record<string, AnswerValue>;

type Question =
  | {
      id: string;
      title: string;
      description: string;
      type: "number";
      placeholder: string;
      min?: number;
      max?: number;
    }
  | {
      id: string;
      title: string;
      description: string;
      type: "slider";
      min: number;
      max: number;
      step: number;
      unit: string;
    }
  | {
      id: string;
      title: string;
      description: string;
      type: "options";
      options: string[];
    };

const questions: Question[] = [
  {
    id: "age",
    title: "What is your age?",
    description: "We use this to set your baseline.",
    type: "number",
    placeholder: "Enter age",
    min: 18,
    max: 80,
  },
  {
    id: "sleep",
    title: "How many hours do you sleep?",
    description: "Quality sleep is one of the strongest signals.",
    type: "slider",
    min: 4,
    max: 10,
    step: 0.5,
    unit: "hours",
  },
  {
    id: "exercise",
    title: "How many days do you exercise each week?",
    description: "A small increase here can move the whole curve.",
    type: "slider",
    min: 0,
    max: 7,
    step: 1,
    unit: "days",
  },
  {
    id: "stress",
    title: "What is your stress level?",
    description: "Lower stress often improves the fastest.",
    type: "slider",
    min: 1,
    max: 10,
    step: 1,
    unit: "/10",
  },
  {
    id: "diet",
    title: "How would you describe your diet?",
    description: "Pick the closest match.",
    type: "options",
    options: ["Very healthy", "Mostly healthy", "Mixed", "Mostly unhealthy"],
  },
  {
    id: "sitting",
    title: "How many hours do you sit each day?",
    description: "Long sitting stretches weigh on the forecast.",
    type: "slider",
    min: 4,
    max: 14,
    step: 1,
    unit: "hours",
  },
  {
    id: "consistency",
    title: "How consistent are your habits?",
    description: "Consistency changes the uncertainty band.",
    type: "options",
    options: ["Very consistent", "Mostly consistent", "Inconsistent"],
  },
  {
    id: "goal",
    title: "What would you most like to improve?",
    description: "This helps shape the plan you see later.",
    type: "options",
    options: ["Energy", "Stress", "Fitness", "Sleep"],
  },
  {
    id: "confidence",
    title: "How confident are you in this snapshot?",
    description: "A simple self-rating keeps the flow quick.",
    type: "options",
    options: ["Low", "Moderate", "High"],
  },
  {
    id: "readiness",
    title: "Are you ready to see your twin?",
    description: "That’s the last step before the dashboard.",
    type: "options",
    options: ["Yes, show me", "Not yet"],
  },
];

const initialAnswers = questions.reduce<Answers>((accumulator, question) => {
  if (question.type === "slider") {
    accumulator[question.id] = question.min;
  }

  return accumulator;
}, {});

export function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);

  const question = questions[currentStep];
  const progress = useMemo(() => ((currentStep + 1) / questions.length) * 100, [currentStep]);
  const currentAnswer = answers[question.id];

  const canContinue =
    currentAnswer !== undefined && currentAnswer !== "" && !(question.id === "readiness" && currentAnswer === "Not yet");

  const updateAnswer = (value: AnswerValue) => {
    setAnswers((current) => ({ ...current, [question.id]: value }));
  };

  const goNext = () => {
    if (currentStep < questions.length - 1) {
      setDirection(1);
      setCurrentStep((step) => step + 1);
      return;
    }

    window.localStorage.setItem("vitalsData", JSON.stringify(answers));
    navigate("/dashboard");
  };

  const goBack = () => {
    if (currentStep === 0) {
      return;
    }

    setDirection(-1);
    setCurrentStep((step) => step - 1);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] px-6 py-8 text-[#0F172A]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center justify-center">
        <Card className="w-full border-white/80 bg-white/85 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <CardHeader className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-cyan-200/40">
                  <Activity className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-semibold">VITALS onboarding</CardTitle>
                  <CardDescription className="mt-1 text-[#6B7280]">
                    One question at a time. Ten quick steps.
                  </CardDescription>
                </div>
              </div>
              <div className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
                Step {currentStep + 1} of {questions.length}
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.25 }}
                />
              </div>
              <p className="text-sm text-[#6B7280]">Your answers stay on this page until you finish.</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 p-6 md:p-8">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={question.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 18 : -18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -18 : 18 }}
                transition={{ duration: 0.22 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold tracking-tight">{question.title}</h2>
                  <p className="text-[#6B7280]">{question.description}</p>
                </div>

                {question.type === "number" ? (
                  <Input
                    type="number"
                    min={question.min}
                    max={question.max}
                    value={typeof currentAnswer === "number" ? currentAnswer : ""}
                    onChange={(event) => updateAnswer(event.target.value === "" ? "" : Number(event.target.value))}
                    placeholder={question.placeholder}
                    className="h-14 rounded-2xl border-slate-200 bg-white text-base shadow-sm focus-visible:border-cyan-300 focus-visible:ring-cyan-200"
                  />
                ) : null}

                {question.type === "slider" ? (
                  <div className="space-y-5 rounded-3xl border border-slate-100 bg-slate-50/80 p-5">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-[#6B7280]">Current value</p>
                        <p className="mt-1 text-2xl font-semibold text-[#0F172A]">
                          {currentAnswer} {question.unit}
                        </p>
                      </div>
                      <div className="rounded-full bg-white px-3 py-1 text-sm font-medium text-[#6B7280] shadow-sm">
                        Drag to adjust
                      </div>
                    </div>
                    <Slider
                      value={[Number(currentAnswer)]}
                      min={question.min}
                      max={question.max}
                      step={question.step}
                      onValueChange={([value]) => updateAnswer(value)}
                      className="py-2"
                    />
                    <div className="flex justify-between text-sm text-[#6B7280]">
                      <span>{question.min}</span>
                      <span>{question.max}</span>
                    </div>
                  </div>
                ) : null}

                {question.type === "options" ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {question.options.map((option) => {
                      const selected = currentAnswer === option;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateAnswer(option)}
                          className={`rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                            selected
                              ? "border-cyan-300 bg-cyan-50 text-cyan-900 shadow-sm"
                              : "border-slate-200 bg-white text-[#0F172A]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-medium">{option}</span>
                            {selected ? <CheckCircle2 className="size-4 text-cyan-600" /> : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={goBack}
                disabled={currentStep === 0}
                className="rounded-full px-5 text-[#6B7280] transition-all duration-200 hover:bg-slate-100 hover:text-[#0F172A]"
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>

              <Button
                type="button"
                onClick={goNext}
                disabled={!canContinue}
                className="rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 text-white shadow-lg shadow-cyan-200/50 transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
              >
                {currentStep === questions.length - 1 ? "See dashboard" : "Next"}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}