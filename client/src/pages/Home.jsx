import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Marquee from "react-fast-marquee";
import { 
  CheckCircle, 
  Zap, 
  Shield, 
  Code2, 
  ArrowRight, 
  Star, 
  Terminal, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

/* ---------------- Config Data ---------------- */
const FEATURES = [
  {
    title: "AI Analysis",
    desc: "Deep static analysis for logic, security, and style.",
    icon: Code2,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Security Audit",
    desc: "Detects CVEs, injections, and unsafe packages instantly.",
    icon: Shield,
    color: "text-red-400",
    bg: "bg-red-400/10"
  },
  {
    title: "Performance",
    desc: "O(n) complexity checks and memory leak detection.",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10"
  },
];

const REVIEWS = [
  { name: "Sarah J.", role: "Senior Dev", text: "Caught a memory leak I missed for weeks.", stars: 5 },
  { name: "Alex D.", role: "Frontend Lead", text: "The refactoring suggestions are actually usable.", stars: 5 },
  { name: "Mike T.", role: "CTO", text: "Reduced our code review time by 40%.", stars: 5 },
  { name: "Emily R.", role: "Full Stack", text: "Love the junior/senior persona toggles.", stars: 4 },
  { name: "David K.", role: "DevOps", text: "Security checks are top notch.", stars: 5 },
];

const FAQS = [
  {
    question: "How is this different from ESLint?",
    answer: "ESLint catches syntax errors. We catch logic flaws, architectural issues, and complex security vulnerabilities that static linters miss. Plus, we explain *why* it's wrong."
  },
  {
    question: "Is my code stored privately?",
    answer: "Yes. We use ephemeral processing. Your code is analyzed in memory and discarded immediately after the review is generated. No data is trained on."
  },
  {
    question: "Does it support Python?",
    answer: "Currently, we support JavaScript, TypeScript, Python, Go, and Rust, with more languages coming next month."
  },
  {
    question: "Can I customize the strictness?",
    answer: "Absolutely. Use the 'Persona' toggle in the editor to switch between 'Junior Mentor' (Gentle) and 'Senior Architect' (Strict) modes."
  },
];

/* ---------------- Components ---------------- */

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left text-slate-200 transition-colors hover:text-cyan-400"
      >
        <span className="text-lg font-medium">{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------------- Main Page ---------------- */
const Home = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1e293b', color: '#fff', border: '1px solid #334155' }
      }}/>

      <div className="relative min-h-screen w-full overflow-hidden bg-[#0B1121] text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.15),transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-6 pb-24 pt-20">
          
          {/* 1. HERO SECTION */}
          <div className="grid items-center gap-16 lg:grid-cols-2">
            
            {/* Left: Text */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                <SparklesIcon />
                <span>AI Code Review 2.0 is live</span>
              </div>

              <h1 className="text-5xl font-extrabold leading-tight text-white sm:text-6xl">
                Ship <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Cleaner Code</span> <br />
                In Seconds.
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                Stop waiting for human reviewers. Get instant, senior-level feedback on logic, security, and performance.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/upload')}
                  className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] hover:shadow-cyan-500/40"
                >
                  Start Review
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button
                  onClick={() => toast("Demo video coming soon!")}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#151e32] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:border-slate-600"
                >
                  View Demo
                </button>
              </div>
            </motion.div>

            {/* Right: Code Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 blur-xl" />
              <div className="relative rounded-2xl border border-slate-700 bg-[#0f1623] shadow-2xl">
                <div className="flex items-center gap-2 border-b border-slate-800 bg-[#151e32] px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/20" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20" />
                  </div>
                  <span className="ml-2 text-xs text-slate-500 font-mono">analysis_result.json</span>
                </div>
                <div className="p-6 font-mono text-xs leading-6">
                  <div className="flex items-center gap-3 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>Syntax Validated</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-red-400">
                    <Shield className="h-4 w-4" />
                    <span>Critical: SQL Injection Risk Line 42</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-yellow-400">
                    <Zap className="h-4 w-4" />
                    <span>Warning: O(n^2) loop detected</span>
                  </div>
                  <div className="mt-4 pl-7 text-slate-500">
                    {`// AI Suggestion:`}
                    <br />
                    {`const user = await db.query(sql, [input]);`}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 2. FLOATING FEEDBACK WALL (Marquee) */}
          <div className="py-24">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-white">Trusted by Developers</h2>
            </div>
            
            <Marquee gradient={true} gradientColor={[11, 17, 33]} speed={40} pauseOnHover>
              {REVIEWS.map((review, i) => (
                <div 
                  key={i} 
                  className="mx-4 w-[300px] rounded-xl border border-slate-800 bg-[#151e32]/50 p-6 backdrop-blur-sm transition hover:border-slate-700 hover:bg-[#151e32]"
                >
                  <div className="mb-4 flex gap-1">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-slate-300">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-white">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{review.name}</p>
                      <p className="text-xs text-slate-500">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>

          {/* 3. DIFFERENTIATORS (Features) */}
          <div className="py-12">
            <h2 className="mb-12 text-center text-3xl font-bold text-white">
              Not Just Another <span className="text-cyan-400">Linter</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="group rounded-2xl border border-slate-800 bg-[#151e32] p-8 transition-colors hover:border-cyan-500/30"
                >
                  <div className={`mb-4 inline-flex rounded-lg p-3 ${f.bg} ${f.color}`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{f.title}</h3>
                  <p className="text-slate-400">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4. FAQ SECTION */}
          <div className="mx-auto max-w-3xl py-24">
            <h2 className="mb-2 text-center text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="mb-12 text-center text-slate-400">
              Everything you need to know about the platform.
            </p>
            
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} {...faq} />
              ))}
            </div>
          </div>

          {/* 5. CTA FOOTER */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-900/50 to-blue-900/50 px-6 py-16 text-center shadow-2xl">
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold text-white">Ready to modernize your workflow?</h2>
              <p className="mb-8 text-cyan-100/80">Join thousands of developers shipping safer code today.</p>
              <button 
                onClick={() => navigate('/upload')}
                className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-slate-900 shadow-xl transition-transform hover:scale-105"
              >
                Start Free Review
              </button>
            </div>
            {/* Decoration */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};

/* Helper Icon */
const SparklesIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
  </svg>
);

export default Home;