import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";
import { 
  ShieldAlert, 
  GitPullRequest, 
  XCircle,
  ArrowLeft,
  Bot,
  Briefcase,
  BookOpen,
  Lightbulb,
  Check,
  Code
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import SmoothCursor from "../components/SmoothCursor";
import CodeEditor from "../components/CodeEditor"; 

/* ---------------- MOCK DATA (Fallback) ---------------- */
const MOCK_SENIOR_REPORT = {
  verdict: "Unsafe for Production",
  riskLevel: "High",
  score: 45,
  focus: "Security",
  issues: [
    {
      id: 1,
      severity: "Critical",
      title: "Unsanitized SQL Query via Input Concatenation",
      impact: "Full database compromise (Data Exfiltration)",
      trigger: "Malicious payload in 'search' parameter",
    },
    {
      id: 2,
      severity: "Medium",
      title: "Hardcoded API Secrets in Client Bundle",
      impact: "Unauthorized 3rd-party service usage",
      trigger: "Public repository scan",
    }
  ],
  tradeoff: "Deployment blocked due to SQL Injection vulnerability.",
};

const MOCK_JUNIOR_REPORT = {
  verdict: "Good Start, Needs Fixes",
  score: 60,
  summary: "You've got the logic down! 🚀 However, there are a few security risks.",
  tips: [
    {
      id: 1,
      title: "Watch out for SQL Injection",
      desc: "Combining strings with variables is risky.",
      fix: "Use 'Parameterized Queries' instead.",
      codeSnippet: `// ✅ Safe\nconst query = "SELECT * FROM users WHERE name = ?";`
    }
  ]
};

/* ---------------- COMPONENTS ---------------- */
const SeverityBadge = ({ level }) => {
  const styles = {
    Critical: "bg-red-500/10 text-red-400 border-red-500/20",
    Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Low: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };
  return (
    <span className={clsx("rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", styles[level] || styles.Low)}>
      {level}
    </span>
  );
};

/* ---------------- JUNIOR VIEW ---------------- */
const JuniorView = ({ report }) => (
  <div className="space-y-8">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-8 text-center"
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 ring-4 ring-blue-500/10">
        <Lightbulb className="h-8 w-8 text-blue-400" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-white">{report.verdict}</h2>
      <p className="mx-auto max-w-lg text-slate-300">{report.summary}</p>
    </motion.div>

    <div className="space-y-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
        <BookOpen className="h-5 w-5 text-cyan-400" />
        Learning Moments
      </h3>
      
      {report.tips?.map((tip, idx) => (
        <motion.div
          key={tip.id || idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.15 }}
          className="overflow-hidden rounded-xl border border-slate-800 bg-[#151e32]"
        >
          <div className="border-b border-slate-800 p-5">
            <h4 className="flex items-center gap-2 font-semibold text-cyan-300">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-cyan-500/20 text-xs font-bold">{idx + 1}</span>
              {tip.title}
            </h4>
            <p className="mt-2 text-sm text-slate-400">{tip.desc}</p>
          </div>
          <div className="bg-[#0f1623] p-5">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-400">
              <Check className="h-4 w-4" />
              Suggested Fix
            </div>
            <p className="mb-4 text-sm text-slate-300">{tip.fix}</p>
            {tip.codeSnippet && (
              <div className="rounded-lg border border-slate-800">
                 <CodeEditor 
                   code={tip.codeSnippet} 
                   language="javascript" 
                   dark={true}
                   options={{ readOnly: true, minimap: { enabled: false } }} 
                 />
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ---------------- SENIOR VIEW ---------------- */
const SeniorView = ({ report }) => (
  <div className="space-y-8">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-6 border-b border-slate-800 pb-8 md:grid-cols-[2fr_1fr]"
    >
      <div>
        <div className="mb-4 flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-white">Senior Review</h1>
          {report.focus && (
            <span className="rounded-full border border-slate-700 bg-[#151e32] px-3 py-1 text-xs font-medium text-slate-400">
              Focus: {report.focus}
            </span>
          )}
        </div>
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-red-950/30 p-3 ring-1 ring-red-500/20">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{report.verdict}</h2>
            <p className="mt-1 text-sm text-slate-400">Blocking issues detected.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center rounded-xl border border-slate-800 bg-[#151e32]/50 p-6">
        <div className="text-4xl font-bold text-white">{report.score}/100</div>
        <div className="text-xs font-medium uppercase tracking-wider text-slate-500">Risk Score</div>
      </div>
    </motion.div>

    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
        <ShieldAlert className="h-4 w-4" />
        Critical Findings
      </h3>
      {report.issues?.map((issue, idx) => (
        <motion.div
          key={issue.id || idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="group relative overflow-hidden rounded-lg border border-slate-800 bg-[#151e32] p-5 transition-all hover:border-slate-600"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <div className="min-w-[80px]">
              <SeverityBadge level={issue.severity} />
            </div>
            <div className="flex-1 space-y-3">
              <h4 className="font-mono text-sm font-semibold text-white">{issue.title}</h4>
              <div className="grid gap-x-8 gap-y-2 text-xs sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-slate-500">Business Impact</span>
                  <span className="text-slate-300">{issue.impact}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-slate-500">Failure Trigger</span>
                  <span className="text-red-200/80 font-mono">{issue.trigger}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="rounded-lg border border-slate-800 bg-[#0f1623] p-5"
    >
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        <GitPullRequest className="h-3.5 w-3.5" />
        Trade-off Analysis
      </div>
      <p className="font-mono text-sm leading-relaxed text-slate-400">{report.tradeoff}</p>
    </motion.div>
  </div>
);

/* ---------------- MAIN PAGE ---------------- */

const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Get Real API Data from Router State
  const { analysisResult, persona: initialPersona } = location.state || {};
  
  // 2. Set Active Persona (Default to whatever was passed, or fallback to senior)
  const [activePersona, setActivePersona] = useState(initialPersona || 'senior');
  
  // 3. Determine which data to show
  // LOGIC: If the user passed data AND the active persona matches the passed data, use Real Data.
  // Otherwise, fallback to MOCK data (because we don't have real data for the *other* persona).
  const isDataMatchingPersona = analysisResult && initialPersona === activePersona;
  
  const report = isDataMatchingPersona 
    ? analysisResult 
    : (activePersona === 'senior' ? MOCK_SENIOR_REPORT : MOCK_JUNIOR_REPORT);

  return (
    <PageWrapper>
      <SmoothCursor />
      
      <div className="min-h-screen w-full bg-[#0B1121] text-slate-300 selection:bg-white/20 selection:text-white">
        <div className="mx-auto max-w-4xl px-6 py-12">

          {/* Navigation Bar */}
          <div className="mb-10 flex items-center justify-between">
            <button 
              onClick={() => navigate('/upload')}
              className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Editor
            </button>

            <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-[#151e32] p-1">
              <span className="px-3 text-xs font-medium text-slate-500">View Mode:</span>
              
              <button 
                onClick={() => setActivePersona('junior')}
                className={clsx(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition",
                  activePersona === 'junior' 
                    ? "bg-cyan-500/20 text-cyan-400 shadow-sm ring-1 ring-cyan-500/40" 
                    : "text-slate-400 hover:text-white"
                )}
              >
                <Bot className="h-3 w-3" />
                Junior
              </button>
              
              <button 
                onClick={() => setActivePersona('senior')}
                className={clsx(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition",
                  activePersona === 'senior' 
                    ? "bg-white/10 text-white shadow-sm ring-1 ring-white/20" 
                    : "text-slate-400 hover:text-white"
                )}
              >
                <Briefcase className="h-3 w-3" />
                Senior
              </button>
            </div>
          </div>

          {/* Render Active View */}
          {activePersona === 'senior' ? (
            <SeniorView report={report} />
          ) : (
            <JuniorView report={report} />
          )}

        </div>
      </div>
    </PageWrapper>
  );
};

export default Analysis;