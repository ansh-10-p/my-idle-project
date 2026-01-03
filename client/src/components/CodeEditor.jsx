import { useMemo, useRef, useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import clsx from "clsx";
import {
  HiOutlineArrowsExpand,
  HiX,
  HiOutlineClipboardCopy,
  HiOutlineSparkles,
} from "react-icons/hi";

const LANGUAGES = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript / TSX", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
];

const CodeEditor = ({
  code,
  onChange,
  language,
  onLanguageChange,
  dark,
  initialCode = "",
}) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* ---------------- Editor Options ---------------- */
  const options = useMemo(
    () => ({
      minimap: { enabled: false },
      fontSize: 14,
      fontLigatures: true,
      smoothScrolling: true,
      cursorSmoothCaretAnimation: true,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      formatOnPaste: true,
      formatOnType: true,
      bracketPairColorization: { enabled: true },
      renderLineHighlight: "all",
      padding: { top: 12, bottom: 12 },
    }),
    [],
  );

  /* ---------------- Handlers ---------------- */
  const handleMount = (editor) => {
    editorRef.current = editor;
  };

  const formatCode = () => {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const resetCode = () => {
    onChange(initialCode);
  };

  /* ---------------- UI ---------------- */
  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative space-y-3 rounded-2xl border bg-white shadow-sm",
        "border-slate-200 dark:border-slate-700 dark:bg-slate-900",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
      )}
    >
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 rounded-t-2xl bg-white/90 px-4 py-3 backdrop-blur dark:bg-slate-900/90">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-200">
            Language
          </span>

          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <ToolbarButton onClick={formatCode} label="Format">
            <HiOutlineSparkles />
          </ToolbarButton>

          <ToolbarButton onClick={copyCode} label="Copy">
            <HiOutlineClipboardCopy />
          </ToolbarButton>

          <ToolbarButton onClick={toggleFullscreen} label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
            {isFullscreen ? (
              <HiX />
            ) : (
              <HiOutlineArrowsExpand />
            )}
          </ToolbarButton>
        </div>
      </div>

      {/* Editor */}
      <div
        className={clsx(
          "overflow-hidden border-t border-slate-200 dark:border-slate-700",
          isFullscreen ? "h-[calc(100vh-64px)]" : "h-[360px]",
        )}
      >
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(val) => onChange(val ?? "")}
          onMount={handleMount}
          theme={dark ? "vs-dark" : "vs-light"}
          options={options}
        />
      </div>
    </div>
  );
};

/* ---------------- Toolbar Button ---------------- */
const ToolbarButton = ({ onClick, children, label }) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    className={clsx(
      "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition",
      "border border-slate-200 bg-slate-100 text-slate-700 hover:-translate-y-0.5 hover:shadow",
      "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",
    )}
  >
    {children}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export default CodeEditor;
