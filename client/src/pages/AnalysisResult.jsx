import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Section = ({ title, items = [] }) => (
  <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>

    <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
      {items.length > 0 ? (
        items.map((item, idx) => (
          <li
            key={idx}
            className="rounded-lg bg-slate-100/60 p-2 dark:bg-slate-800/70"
          >
            {item}
          </li>
        ))
      ) : (
        <li className="text-xs opacity-70">No items found</li>
      )}
    </ul>
  </div>
);

const AnalysisResult = ({ result, onSaveHistory }) => {
  const navigate = useNavigate();

  // If there's no result, redirect safely AFTER render
  React.useEffect(() => {
    if (!result) navigate("/upload");
  }, [result, navigate]);

  if (!result) return null;

  return (
    <PageWrapper>
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Analysis Result
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {result.summary || "AI Code Review Output"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/upload")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              Back to Upload
            </button>

            <button
              onClick={() => onSaveHistory(result)}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5"
            >
              Save to History
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="grid gap-4 md:grid-cols-2">
          <Section title="Bug Report" items={result.bugReport} />
          <Section title="Bad Practices" items={result.badPractices} />
          <Section title="Security Issues" items={result.security} />
        </div>

        {/* Optimized code block */}
        {result.optimized && (
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-slate-50 shadow-inner dark:border-slate-700">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-200">
              <span>Optimized Code</span>
              <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-100">
                {result.language}
              </span>
            </div>

            <pre className="overflow-auto text-sm leading-6 whitespace-pre">
              {result.optimized}
            </pre>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default AnalysisResult;

