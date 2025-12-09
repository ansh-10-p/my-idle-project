import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

const Home = () => {
  return (
    <PageWrapper>
      <motion.section
        layout
        className="grid gap-8 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-glass backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left Section */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20 dark:bg-slate-800 dark:text-blue-200"
            >
              Modern AI review workflow
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <h1 className="text-4xl font-bold text-ink dark:text-white sm:text-5xl">
                AI-Based Code Review Platform
              </h1>
              <p className="mt-4 text-lg text-slate dark:text-slate-300">
                Upload your JavaScript, React, or Python code and get instant AI-powered review.
              </p>
            </motion.div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/upload"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5"
              >
                Start Upload
              </Link>

              <Link
                to="/history"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                View History
              </Link>
            </div>

            {/* Features Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-3 gap-4 text-center text-sm text-slate dark:text-slate-300"
            >
              {["Bug detection", "Security checks", "Optimized fixes"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/80"
                  >
                    {item}
                  </div>
                )
              )}
            </motion.div>
          </div>

          {/* Right Section – Preview Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-50 shadow-inner dark:border-slate-700"
          >
            <div className="mb-4 flex items-center justify-between text-sm text-slate-300">
              <span>Preview</span>
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-100">
                Lottie placeholder
              </span>
            </div>

            {/* Placeholder visual */}
            <div className="h-48 rounded-xl bg-slate-800/80 ring-1 ring-slate-700" />

            <p className="mt-4 text-sm text-slate-200">
              Smooth animations, glassy cards, and a responsive layout for the AI review experience.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </PageWrapper>
  );
};

export default Home;
