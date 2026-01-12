import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import CodeEditor from '../components/CodeEditor';

const API_URL =import.meta.env.VITE_API_URL;

const Upload = ({ onSaveDraft, dark }) => {
  const [code, setCode] = useState("// Paste or write your code here\nfunction greet() {\n  return 'hello';\n}");
  const [language, setLanguage] = useState('javascript');
  const [showOptimized, setShowOptimized] = useState(true);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/ai/get-review`, // 👈 HTTP from .env USED HERE
      {
        code,
        language,
        showOptimized,
      }
    );

    onSaveDraft(response.data, { showOptimized, code });
    navigate('/analysis');

  } catch (error) {
    console.error('Backend error:', error);
  }
};


  return (
    <PageWrapper>
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-glass dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-ink dark:text-white">Upload Code</h1>
            <p className="text-sm text-slate dark:text-slate-300">
              Local-only mock analysis. No data leaves your browser.
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            <input
              type="checkbox"
              checked={showOptimized}
              onChange={(e) => setShowOptimized(e.target.checked)}
              className="h-4 w-4"
            />
            Show optimized code
          </label>
        </div>

        <CodeEditor
          code={code}
          onChange={setCode}
          language={language}
          onLanguageChange={setLanguage}
          dark={dark}
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleAnalyze}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5"
          >
            Analyze Code
          </button>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-slate dark:text-slate-300"
          >
            Quick mock review with smooth animations.
          </motion.span>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Upload;

