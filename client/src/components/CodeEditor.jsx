import { useMemo, useRef, useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import clsx from "clsx";
import {
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Wand2,
} from "lucide-react";

const CodeEditor = ({
  code,
  onChange,
  language = "javascript",
  dark = true,
}) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const monaco = useMonaco();
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  /* ---------------- 1. Custom Theme ---------------- */
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("midnight-dev", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#0f1623", 
          "editor.lineHighlightBackground": "#1e293b",
          "editorGutter.background": "#0f1623",
          "scrollbarSlider.background": "#33415580",
          "editor.selectionBackground": "#06b6d430",
        },
      });
      monaco.editor.setTheme("midnight-dev");
    }
  }, [monaco]);

  /* ---------------- 2. Editor Options ---------------- */
  const options = useMemo(
    () => ({
      minimap: { enabled: false },
      fontFamily: '"Fira Code", "JetBrains Mono", monospace',
      fontSize: 14,
      
      // ✅ SCROLLING FIXES
      scrollBeyondLastLine: false, // Prevents excessive empty space at bottom
      smoothScrolling: true,
      
      // Force scrollbars to always be interactive
      scrollbar: {
        vertical: "visible",
        horizontal: "visible",
        useShadows: false,
        verticalScrollbarSize: 14, // Slightly wider to make it easier to grab
      },

      cursorBlinking: "smooth",      
      cursorSmoothCaretAnimation: "on", 
      cursorStyle: "line",            
      cursorWidth: 3,                
      
      automaticLayout: true, 
      padding: { top: 16, bottom: 16 },
      renderLineHighlight: "all",
    }),
    []
  );

  /* ---------------- 3. Handlers ---------------- */
  const handleMount = (editor) => {
    editorRef.current = editor;
  };

  const formatCode = () => {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  /* ---------------- 4. Force Layout Refresh ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  /* ---------------- UI ---------------- */
  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative flex flex-col overflow-hidden bg-[#0f1623] transition-all duration-300",
        // 👇 FIXED: 
        // Fullscreen: h-screen (100% of screen)
        // Normal: h-[600px] (Fixed pixel height forces internal scrollbar)
        isFullscreen 
          ? "fixed inset-0 z-50 h-screen w-screen" 
          : "h-[500px] w-full rounded-2xl border border-slate-800" 
      )}
    >
      {/* Floating Toolbar */}
      <div className="absolute right-6 top-4 z-20 flex items-center gap-1.5 rounded-lg border border-white/5 bg-[#151e32]/90 p-1 backdrop-blur-md shadow-xl transition-opacity hover:opacity-100 opacity-60">
        <ToolbarButton onClick={formatCode} label="Format" icon={Wand2} />
        <ToolbarButton onClick={copyCode} label={isCopied ? "Copied" : "Copy"} icon={isCopied ? Check : Copy} active={isCopied} />
        <div className="mx-1 h-4 w-[1px] bg-white/10" />
        <ToolbarButton onClick={toggleFullscreen} label={isFullscreen ? "Exit" : "Expand"} icon={isFullscreen ? Minimize2 : Maximize2} />
      </div>

      {/* Editor Surface */}
      <div className="flex-1 w-full h-full">
        <Editor
          height="100%"
          width="100%"
          language={language}
          value={code}
          onChange={(val) => onChange(val ?? "")}
          onMount={handleMount}
          theme="midnight-dev"
          options={options}
          loading={
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              Initializing Editor...
            </div>
          }
        />
      </div>
    </div>
  );
};

/* ---------------- Helper Component ---------------- */
const ToolbarButton = ({ onClick, icon: Icon, label, active }) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      "group relative flex items-center justify-center rounded-md p-2 transition-all",
      active ? "bg-green-500/10 text-green-400" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
    )}
    title={label}
  >
    <Icon className="h-4 w-4" />
  </button>
);

export default CodeEditor;