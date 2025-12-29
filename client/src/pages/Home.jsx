import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import PageWrapper from "../components/PageWrapper";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

const features = [
  {
    title: "AI Code Intelligence",
    desc: "Advanced models analyze structure, logic, and security patterns in real time.",
  },
  {
    title: "Security-First Review",
    desc: "Detects vulnerabilities, unsafe dependencies, and bad practices automatically.",
  },
  {
    title: "Performance Optimization",
    desc: "Get actionable suggestions to reduce complexity and improve execution speed.",
  },
  {
    title: "Multi-Language Support",
    desc: "JavaScript, React, Python — more languages coming soon.",
  },
];

const Home = () => {
  return (
    <PageWrapper>
      <Toaster position="top-right" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-16 rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-glass backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
      >
        {/* HERO */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div {...fadeUp} className="space-y-6">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold text-primary dark:bg-slate-800 dark:text-blue-200">
              AI-Powered Code Review Platform
            </span>

            <h1 className="text-4xl font-bold leading-tight text-ink dark:text-white sm:text-5xl">
              Ship Cleaner, Safer Code <br /> With AI-Driven Reviews
            </h1>

            <p className="max-w-xl text-lg text-slate dark:text-slate-300">
              Our platform analyzes your code for bugs, security risks, and
              performance issues — instantly. No setup. No manual reviews.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => toast.success("Redirecting to Sign Up")}
                className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30"
              >
                Get Started Free
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => toast("Login to your workspace")}
                className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
              >
                Login
              </motion.button>
            </div>
          </motion.div>

          {/* HERO VISUAL */}
          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-inner dark:border-slate-700"
          >
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
              <span>AI Review Engine</span>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-300">
                Live
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <p className="text-green-400">✔ Code quality check passed</p>
              <p className="text-yellow-400">⚠ Optimization suggestions found</p>
              <p className="text-red-400">✖ Security issue detected</p>
              <p className="text-blue-400">ℹ AI generating fixes…</p>
            </div>
          </motion.div>
        </div>

        {/* TRUST METRICS */}
        <motion.div
          {...fadeUp}
          className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:grid-cols-4"
        >
          <div>
            <p className="text-3xl font-bold text-ink dark:text-white">99%</p>
            <p className="text-sm text-slate">Detection Accuracy</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-ink dark:text-white">5x</p>
            <p className="text-sm text-slate">Faster Reviews</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-ink dark:text-white">10k+</p>
            <p className="text-sm text-slate">Files Analyzed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-ink dark:text-white">24/7</p>
            <p className="text-sm text-slate">AI Availability</p>
          </div>
        </motion.div>

        {/* FEATURES */}
        <div className="space-y-6">
          <motion.h2
            {...fadeUp}
            className="text-center text-2xl font-bold text-ink dark:text-white"
          >
            Why Teams Choose Our Platform
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                {...fadeUp}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-700 dark:bg-slate-800"
              >
                <h3 className="mb-2 text-sm font-semibold text-ink dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate dark:text-slate-400">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* WORKFLOW */}
        <motion.div
          {...fadeUp}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-slate-800"
        >
          <h3 className="mb-4 text-lg font-semibold text-ink dark:text-white">
            How It Works
          </h3>

          <ol className="grid gap-4 text-sm sm:grid-cols-3">
            <li>1️⃣ Upload your code or repository</li>
            <li>2️⃣ AI analyzes quality, security & performance</li>
            <li>3️⃣ Get instant fixes & recommendations</li>
          </ol>
        </motion.div>

        {/* FINAL CTA */}
        <motion.div
          {...fadeUp}
          className="rounded-2xl bg-primary p-10 text-center text-white shadow-xl"
        >
          <h3 className="mb-3 text-2xl font-bold">
            Ready to Improve Your Code Quality?
          </h3>
          <p className="mb-6 text-sm text-blue-100">
            Join developers who trust AI for smarter, faster reviews.
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.success("Welcome aboard 🚀")}
            className="rounded-xl bg-white px-8 py-3 text-sm font-semibold text-primary"
          >
            Start Free Today
          </motion.button>
        </motion.div>
      </motion.section>
    </PageWrapper>
  );
};

export default Home;
