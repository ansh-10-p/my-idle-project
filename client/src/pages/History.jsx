import { useState, useEffect } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Clock, 
  Briefcase, 
  Bot, 
  AlertTriangle, 
  CheckCircle2 
} from "lucide-react";
import clsx from "clsx";
import PageWrapper from "../components/PageWrapper";
import SmoothCursor from "../components/SmoothCursor";

const API_URL = import.meta.env.VITE_API_URL;

/* ---------------- CARD COMPONENT ---------------- */
const HistoryCard = ({ item, onDelete }) => {
  const [open, setOpen] = useState(false);
  const { persona, analysisResult, createdAt, language } = item;
  const isSenior = persona === 'senior';

  // Format Date: "Feb 6, 2026"
  const dateStr = new Date(createdAt).toLocaleDateString("en-US", {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  // Format Time: "9:30 PM"
  const timeStr = new Date(createdAt).toLocaleTimeString("en-US", {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={clsx(
        "group relative overflow-hidden rounded-xl border p-5 transition-all",
        isSenior 
          ? "border-slate-700 bg-[#151e32] hover:border-slate-500" 
          : "border-blue-900/30 bg-blue-950/10 hover:border-blue-500/30"
      )}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4">
        
        {/* Left: Icon & Title */}
        <div className="flex items-start gap-4">
          <div className={clsx(
            "mt-1 flex h-10 w-10 items-center justify-center rounded-lg ring-1",
            isSenior 
              ? "bg-slate-800 ring-slate-600 text-slate-300" 
              : "bg-cyan-950/30 ring-cyan-500/30 text-cyan-400"
          )}>
            {isSenior ? <Briefcase size={20} /> : <Bot size={20} />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-100">
                {analysisResult.verdict}
              </h3>
              <span className={clsx(
                "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                isSenior ? "bg-slate-700 text-slate-300" : "bg-cyan-900 text-cyan-300"
              )}>
                {language}
              </span>
            </div>
            
            <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {dateStr}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {timeStr}
              </span>
              <span className="font-mono text-slate-500">
                Score: {analysisResult.score}/100
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            {open ? "Hide" : "Review"}
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <button
            onClick={() => onDelete(item._id)}
            className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Expandable Content (The Mistakes/Analysis) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-slate-800 pt-4">
              
              {/* Summary / Tradeoff */}
              <p className="mb-4 text-sm leading-relaxed text-slate-400">
                {isSenior ? analysisResult.tradeoff : analysisResult.summary}
              </p>

              {/* LIST OF MISTAKES / FINDINGS */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {isSenior ? "Critical Findings" : "Fix Suggestions"}
                </h4>

                {/* Logic to handle different data structures for Senior vs Junior */}
                {isSenior ? (
                  // Senior Issues List
                  analysisResult.issues?.map((issue, idx) => (
                    <div key={idx} className="flex gap-3 rounded-md bg-[#0f1623] p-3">
                      <AlertTriangle className="mt-0.5 h-4 w-4 text-red-400 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-200">{issue.title}</p>
                        <p className="text-xs text-slate-500 mt-1">Impact: {issue.impact}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  // Junior Tips List
                  analysisResult.tips?.map((tip, idx) => (
                    <div key={idx} className="flex gap-3 rounded-md bg-[#0f1623] p-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-400 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-200">{tip.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{tip.desc}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ---------------- MAIN PAGE ---------------- */
const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch History from Backend
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/history`);
      setHistory(res.data);
    } catch (error) {
      console.error("Failed to fetch history", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this review record?")) return;
    try {
      await axios.delete(`${API_URL}/history/${id}`);
      setHistory(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  return (
    <PageWrapper>
      <SmoothCursor />
      <div className="min-h-screen w-full bg-[#0B1121] text-slate-300">
        <div className="mx-auto max-w-4xl px-6 py-12">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Review History</h1>
            <p className="mt-1 text-slate-400">Past code analysis reports and insights.</p>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {loading ? (
                <div className="text-center text-sm text-slate-500 py-10">Loading history...</div>
              ) : history.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-dashed border-slate-800 p-10 text-center"
                >
                  <p className="text-slate-500">No reviews found yet.</p>
                </motion.div>
              ) : (
                history.map((item) => (
                  <HistoryCard key={item._id} item={item} onDelete={handleDelete} />
                ))
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};

export default History;