import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx'; 
import { 
  Code2, 
  Cpu, 
  Shield, 
  Eye, 
  Zap, 
  Layers, 
  Bot, 
  Briefcase, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import CodeEditor from '../components/CodeEditor';
import SmoothCursor from '../components/SmoothCursor';

const API_URL = import.meta.env.VITE_API_URL;

const FOCUS_AREAS = [
  { id: 'readability', label: 'Readability', icon: Eye, desc: 'Clean code & structure' },
  { id: 'performance', label: 'Performance', icon: Zap, desc: 'Speed & optimization' },
  { id: 'security', label: 'Security', icon: Shield, desc: 'Vulnerabilities & safety' },
  { id: 'scalability', label: 'Scalability', icon: Layers, desc: 'Growth & patterns' },
];

const PERSONAS = [
  { id: 'junior', label: 'Junior Dev', icon: Bot, desc: 'Educational & Encouraging' },
  { id: 'senior', label: 'Senior Engineer', icon: Briefcase, desc: 'Strict, Critical & Direct' },
];

const Upload = ({ onSaveDraft }) => {
  // State
  const [code, setCode] = useState("// Paste your code here for review...\n\nfunction calculate() {\n  return 0;\n}");
  const [language, setLanguage] = useState('javascript');
  const [description, setDescription] = useState('');
  const [focusArea, setFocusArea] = useState('readability');
  const [persona, setPersona] = useState('senior'); 
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();

  const isSenior = persona === 'senior';

  const getButtonText = () => {
    if (isAnalyzing) return "Analyzing...";
    const areaLabel = FOCUS_AREAS.find(f => f.id === focusArea)?.label;
    const actionWord = isSenior ? 'Critique' : 'Review'; 
    return `${actionWord} for ${areaLabel}`;
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await axios.post(
        `${API_URL}/ai/get-review`,
        { code, language, focusArea, description, persona }
      );
      
      navigate('/analysis', { 
        state: { 
          analysisResult: response.data, 
          persona: persona               
        } 
      });

    } catch (error) {
      console.error('Backend error:', error);
      alert("Failed to analyze code. Check console for details.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <PageWrapper>
      <SmoothCursor />
      
      <div className="min-h-screen w-full bg-[#0B1121] text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200">
        <div className="mx-auto max-w-5xl px-6 py-12">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-end justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Code Review
              </h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                <Code2 className="h-4 w-4 text-cyan-500" />
                AI-powered static analysis & refactoring engine
              </p>
            </div>
            
            {/* Persona Switcher */}
            <div className="flex rounded-lg bg-[#151e32] p-1 ring-1 ring-white/5">
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPersona(p.id)}
                  className={clsx(
                    "cursor-pointer relative flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                    persona === p.id 
                      ? "bg-[#1e293b] text-white shadow-sm ring-1 ring-white/10" 
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  <p.icon className={clsx("h-4 w-4", persona === p.id && "text-cyan-400")} />
                  {p.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Editor Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-slate-800 bg-[#151e32] shadow-2xl"
          >
            {/* Editor Toolbar (Mac Style) */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-[#111827] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/20 ring-1 ring-red-500/50" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/20 ring-1 ring-yellow-500/50" />
                  <div className="h-3 w-3 rounded-full bg-green-500/20 ring-1 ring-green-500/50" />
                </div>
                <div className="ml-4 h-4 w-[1px] bg-slate-700" />
                <span className="text-xs font-mono text-slate-500">input.{language}</span>
              </div>
              
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="cursor-pointer rounded bg-[#1e293b] px-3 py-1 text-xs font-medium text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
              </select>
            </div>

            {/* 👇 UPDATED: Cleaned up wrapper so CodeEditor handles layout */}
            <div className="w-full">
              <CodeEditor
                code={code}
                onChange={setCode}
                language={language}
                dark={true}
              />
            </div>
          </motion.div>

          {/* Configuration Grid */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            
            {/* Left Col: Context Description */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <label className="mb-3 block text-sm font-medium text-slate-400">
                Context (Optional)
              </label>
              <div className="relative group h-full">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What does this code do? E.g., 'Handles user authentication via JWT'..."
                  className="h-full w-full min-h-[160px] resize-none rounded-xl border border-slate-800 bg-[#151e32] p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all cursor-text"
                />
                <div className="absolute bottom-3 right-3 text-slate-600">
                  <Sparkles className="h-4 w-4 opacity-50" />
                </div>
              </div>
            </motion.div>

            {/* Right Col: Focus Area & Action */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-10 lg:col-span-2"
            >
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-400">
                  Review Focus
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {FOCUS_AREAS.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => setFocusArea(area.id)}
                      className={clsx(
                        "cursor-pointer group relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all",
                        focusArea === area.id
                          ? "border-cyan-500/50 bg-cyan-950/10 shadow-[0_0_20px_-5px_rgba(6,182,212,0.15)]"
                          : "border-slate-800 bg-[#151e32] hover:border-slate-700"
                      )}
                    >
                      <area.icon 
                        className={clsx(
                          "h-5 w-5 transition-colors",
                          focusArea === area.id ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-400"
                        )} 
                      />
                      <div className={clsx("text-sm font-medium", focusArea === area.id ? "text-cyan-100" : "text-slate-300")}>
                        {area.label}
                      </div>
                      {focusArea === area.id && (
                        <motion.div
                          layoutId="active-ring"
                          className="absolute inset-0 rounded-xl border-2 border-cyan-500/30"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="mt-auto pt-2">
                <button
                  onClick={handleAnalyze}
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                  disabled={isAnalyzing}
                  className={clsx(
                    "cursor-pointer relative w-full overflow-hidden rounded-xl p-[1px] transition-transform active:scale-[0.99] shadow-lg",
                    isSenior 
                      ? "bg-gradient-to-r from-slate-300 to-white shadow-white/10" 
                      : "bg-gradient-to-r from-cyan-600 to-blue-600 shadow-cyan-900/20" 
                  )}
                >
                  <div className="relative flex items-center justify-between rounded-[11px] bg-[#0f1623] px-6 py-4 transition-colors hover:bg-transparent">
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-semibold text-white">
                        {getButtonText()}
                      </span>
                      <span className={clsx("text-xs transition-colors", isSenior ? "text-slate-400" : "text-cyan-200/60")}>
                         {isAnalyzing ? "Processing..." : `Using ${persona} persona`}
                      </span>
                    </div>
                    
                    <motion.div
                      animate={{ x: isHoveringButton ? 5 : 0 }}
                      className={clsx(
                        "rounded-full p-2 text-white transition-colors",
                        isSenior ? "bg-slate-700" : "bg-white/10"
                      )}
                    >
                      {isAnalyzing ? (
                        <Cpu className="h-6 w-6 animate-spin" />
                      ) : (
                        <ArrowRight className="h-6 w-6" />
                      )}
                    </motion.div>
                  </div>
                </button>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Upload;