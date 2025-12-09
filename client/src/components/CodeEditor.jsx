import { useMemo } from 'react';
import Editor from '@monaco-editor/react';
import clsx from 'clsx';

const CodeEditor = ({ code, onChange, language, onLanguageChange, dark }) => {
  const options = useMemo(
    () => ({
      minimap: { enabled: false },
      fontSize: 14,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      theme: dark ? 'vs-dark' : 'vs-light',
    }),
    [dark],
  );

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-200">Language</span>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">React (TSX)</option>
            <option value="python">Python</option>
          </select>
        </div>
        <button
          type="button"
          className={clsx(
            'rounded-lg px-3 py-2 text-sm font-semibold transition',
            'border border-slate-200 bg-slate-100 text-slate-700 hover:-translate-y-0.5 hover:shadow',
            'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
          )}
        >
          Fullscreen
        </button>
      </div>
      <div className="h-[360px] overflow-hidden rounded-xl border border-slate-200 shadow-inner dark:border-slate-700">
        <Editor
          height="360px"
          defaultLanguage={language}
          value={code}
          onChange={(val) => onChange(val || '')}
          theme={dark ? 'vs-dark' : 'vs-light'}
          options={options}
        />
      </div>
    </div>
  );
};

export default CodeEditor;

