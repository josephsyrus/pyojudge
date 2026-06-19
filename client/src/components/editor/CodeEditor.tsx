import { useEffect, useState } from "react";
import MonacoEditor, { loader } from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  editorTheme?: string;
}

export const EDITOR_THEMES = [
  { id: "vs-dark", label: "Dark" },
  { id: "vs", label: "Light" },
  { id: "hc-black", label: "High Contrast" },
  { id: "monokai", label: "Monokai" },
  { id: "github-dark", label: "GitHub Dark" },
];

export function CodeEditor({
  value,
  onChange,
  disabled = false,
  editorTheme = "vs-dark",
}: CodeEditorProps) {
  const [monacoFailed, setMonacoFailed] = useState(false);

  // Monaco loads its assets asynchronously; fall back to a textarea if that fails.
  useEffect(() => {
    loader.init().catch(() => setMonacoFailed(true));
  }, []);

  const handleMount: OnMount = (_editor, monaco) => {
    if (!monaco) {
      setMonacoFailed(true);
      return;
    }

    monaco.editor.defineTheme("monokai", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "75715e", fontStyle: "italic" },
        { token: "keyword", foreground: "f92672" },
        { token: "string", foreground: "e6db74" },
        { token: "number", foreground: "ae81ff" },
        { token: "type", foreground: "66d9e8" },
        { token: "function", foreground: "a6e22e" },
        { token: "variable", foreground: "f8f8f2" },
      ],
      colors: {
        "editor.background": "#272822",
        "editor.foreground": "#f8f8f2",
        "editor.lineHighlightBackground": "#3e3d32",
        "editor.selectionBackground": "#49483e",
        "editorLineNumber.foreground": "#75715e",
        "editorLineNumber.activeForeground": "#a59f85",
      },
    });

    monaco.editor.defineTheme("github-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "8b949e", fontStyle: "italic" },
        { token: "keyword", foreground: "ff7b72" },
        { token: "string", foreground: "a5d6ff" },
        { token: "number", foreground: "79c0ff" },
        { token: "type", foreground: "ffa657" },
        { token: "function", foreground: "d2a8ff" },
        { token: "variable", foreground: "c9d1d9" },
      ],
      colors: {
        "editor.background": "#0d1117",
        "editor.foreground": "#c9d1d9",
        "editor.lineHighlightBackground": "#161b22",
        "editor.selectionBackground": "#264f78",
        "editorLineNumber.foreground": "#484f58",
        "editorLineNumber.activeForeground": "#8b949e",
      },
    });
  };

  if (monacoFailed) {
    return (
      <textarea
        className="w-full h-full font-mono text-sm p-3 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 resize-none border-none outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        spellCheck={false}
      />
    );
  }

  return (
    <MonacoEditor
      height="100%"
      language="python"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      onMount={handleMount}
      options={{
        fontSize: 14,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        readOnly: disabled,
        tabSize: 4,
        insertSpaces: true,
        wordWrap: "on",
        lineNumbers: "on",
        bracketPairColorization: { enabled: true },
        automaticLayout: true,
        padding: { top: 12 },
      }}
      theme={editorTheme}
    />
  );
}
