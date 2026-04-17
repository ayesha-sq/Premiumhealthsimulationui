import { useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { Activity, TrendingUp, Brain, Heart, Zap, ArrowRight, Shield, Clock } from "lucide-react";
import { useRef } from "react";

export function Landing() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const features = [
    {
      icon: TrendingUp,
      title: "Dual Future Paths",
      description: "See two versions of your future health - one with current habits, one optimized.",
      color: "from-[#4F46E5] to-[#06B6D4]",
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get personalized health recommendations based on cutting-edge longevity science.",
      color: "from-[#06B6D4] to-[#0EA5E9]",
    },
    {
      icon: Heart,
      title: "Vitality Tracking",
      description: "Monitor your health trajectory and see how small changes create massive impact.",
      color: "from-[#F43F5E] to-[#EC4899]",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get your complete health trajectory in under 2 minutes",
    },
    {
      icon: Shield,
      title: "Science-Backed",
      description: "Built on peer-reviewed longevity research and medical data",
    },
    {
      icon: Clock,
      title: "Real-Time Updates",
      description: "Watch your future change as you adjust your habits",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FB] overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1758577515333-e71b713059f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Smart health technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/90 via-[#06B6D4]/80 to-[#0EA5E9]/90" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <Activity className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">VITALS</h1>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Two Futures.
            <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              One Decision.
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
          >
            Visualize your health trajectory. See how small habit changes today create
            dramatic differences in your longevity tomorrow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/onboarding")}
              className="px-10 py-5 bg-white text-[#4F46E5] rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-white/50 transition-all flex items-center gap-3 group"
            >
              See Your Future
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white rounded-2xl text-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all"
            >
              Sign In
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: "10K+", label: "Users" },
              { value: "5-8", label: "Avg. Years Added" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity } }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full" />
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-[#0F172A] mb-4">
              Your Health, Visualized
            </h3>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              VITALS uses advanced health modeling to show you exactly how your choices
              shape your future.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="text-2xl font-semibold text-[#0F172A] mb-3">
                  {feature.title}
                </h4>
                <p className="text-[#6B7280]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#4F46E5]/5 to-[#06B6D4]/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-[#0F172A] mb-4">
              Why Choose VITALS?
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-[#0F172A] mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-[#6B7280]">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          />

          <div className="relative z-10">
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Future?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Join thousands who have discovered their optimal health trajectory.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/onboarding")}
              className="px-10 py-5 bg-white text-[#4F46E5] rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-white/50 transition-all inline-flex items-center gap-3 group"
            >
              Start Free Analysis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white/50 backdrop-blur-xl border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="w-6 h-6 text-[#4F46E5]" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
              VITALS
            </span>
          </div>
          <p className="text-[#6B7280]">
            &copy; 2026 VITALS. Empowering healthier futures.
          </p>
        </div>
      </footer>
    </div>
  );
}
