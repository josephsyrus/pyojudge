import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, Pause, Play, Clock, X, Sun, Code, Loader, Check } from "lucide-react";
import apiClient from "../api/client";
import type { Problem, TestResult, Verdict } from "../types";
import { SplitPanel } from "../components/problem/SplitPanel";
import { ProblemDescription } from "../components/problem/ProblemDescription";
import { CodeEditor, EDITOR_THEMES } from "../components/editor/CodeEditor";
import { TestResults } from "../components/results/TestResults";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import { usePyodideWorker } from "../hooks/usePyodideWorker";
import { useKeyboardShortcut } from "../hooks/useKeyboardShortcut";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

function deriveVerdict(results: TestResult[], timedOut: boolean): Verdict {
  if (timedOut) return "Time Limit Exceeded";
  if (results.some((r) => r.errorMessage && !r.errorMessage.includes("Time Limit")))
    return "Runtime Error";
  if (results.every((r) => r.passed)) return "Accepted";
  return "Wrong Answer";
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function StarButton({ starred, onClick }: { starred: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={starred ? "Unstar problem" : "Star problem"}
      className={`transition-colors ${starred ? "text-rose-400" : "text-slate-400 dark:text-zinc-500 hover:text-rose-400"}`}
    >
      <Star size={16} fill={starred ? "currentColor" : "none"} />
    </button>
  );
}

export function ProblemPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme: appTheme } = useTheme();
  const { workerState, run, reload } = usePyodideWorker();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [isSubmission, setIsSubmission] = useState(false);
  const [allPassed, setAllPassed] = useState<number | undefined>(undefined);
  const [allTotal, setAllTotal] = useState<number | undefined>(undefined);
  const [starred, setStarred] = useState(false);

  // Stopwatch
  const [swActive, setSwActive] = useState(false);
  const [swElapsed, setSwElapsed] = useState(0);
  const swIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Custom input
  const [customOpen, setCustomOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [customResult, setCustomResult] = useState<{
    output: string;
    error?: string;
    time: number;
  } | null>(null);
  const [customRunning, setCustomRunning] = useState(false);

  // Editor theme
  const [editorTheme, setEditorThemeState] = useState<string>(() => {
    return localStorage.getItem("pyojudge_editor_theme") ?? "vs-dark";
  });
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  function setEditorTheme(t: string) {
    localStorage.setItem("pyojudge_editor_theme", t);
    setEditorThemeState(t);
    setThemeMenuOpen(false);
  }

  // Sync editor to app theme on toggle: light → vs, dark → vs-dark
  useEffect(() => {
    const defaultForTheme = appTheme === "light" ? "vs" : "vs-dark";
    setEditorTheme(defaultForTheme);
  }, [appTheme]);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node))
        setThemeMenuOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    return () => {
      if (swIntervalRef.current) clearInterval(swIntervalRef.current);
    };
  }, []);

  function toggleStopwatch() {
    if (swActive) {
      clearInterval(swIntervalRef.current!);
      swIntervalRef.current = null;
      setSwActive(false);
    } else {
      swIntervalRef.current = setInterval(() => setSwElapsed((s) => s + 1), 1000);
      setSwActive(true);
    }
  }

  function resetStopwatch() {
    if (swIntervalRef.current) clearInterval(swIntervalRef.current);
    swIntervalRef.current = null;
    setSwActive(false);
    setSwElapsed(0);
  }

  useEffect(() => {
    if (!slug) return;
    apiClient
      .get<Problem>(`/problems/${slug}`)
      .then(({ data }) => {
        setProblem(data);
        const saved = localStorage.getItem(`pyojudge_code_${user?.id ?? "guest"}_${slug}`);
        setCode(saved ?? data.starterCode);
      })
      .catch(() => setLoadError("Problem not found"));
  }, [slug]);

  useEffect(() => {
    if (!user || !slug) return;
    apiClient
      .get<{ starredProblems: string[] }>("/users/me/starred")
      .then(({ data }) => setStarred(data.starredProblems.includes(slug)))
      .catch(() => {});
  }, [user, slug]);

  useEffect(() => {
    if (slug && code) localStorage.setItem(`pyojudge_code_${user?.id ?? "guest"}_${slug}`, code);
  }, [code, slug]);

  const handleRun = useCallback(async () => {
    if (!problem || workerState.status !== "ready" || !code.trim()) return;
    setRunning(true);
    setResults(null);
    setVerdict(null);
    const publicCases = problem.testCases.filter((tc) => !tc.isHidden);
    const { results: res, timedOut } = await run(code, publicCases);
    setResults(res);
    setVerdict(deriveVerdict(res, timedOut));
    setIsSubmission(false);
    setAllPassed(undefined);
    setAllTotal(undefined);
    setRunning(false);
  }, [problem, workerState.status, code, run]);

  const handleSubmit = useCallback(async () => {
    if (!problem || workerState.status !== "ready" || !code.trim() || !user) return;
    setSubmitting(true);
    setResults(null);
    setVerdict(null);
    const { results: res, timedOut } = await run(code, problem.testCases);
    const clientVerdict = deriveVerdict(res, timedOut);
    // Tag each result with isHidden so the server can verify hidden tests
    const taggedResults = res.map((r, i) => ({
      ...r,
      isHidden: problem.testCases[i]?.isHidden ?? false,
    }));
    const maxTime = res.reduce((m, r) => Math.max(m, r.executionTime), 0);
    setIsSubmission(true);
    try {
      const { data: saved } = await apiClient.post<{
        verdict: Verdict;
        passedTests: number;
        totalTests: number;
        testResults: TestResult[];
      }>("/submissions", {
        problemSlug: problem.slug,
        code,
        verdict: clientVerdict,
        testResults: taggedResults,
        totalTests: res.length,
        passedTests: res.filter((r) => r.passed).length,
        maxExecutionTime: maxTime,
      });
      // Use server-authoritative verdict and counts
      setVerdict(saved.verdict);
      setAllPassed(saved.passedTests);
      setAllTotal(saved.totalTests);
      // Show public test results (client-computed), hidden results not displayed in detail
      setResults(res.filter((_, i) => !problem.testCases[i]?.isHidden));
    } catch {
      // Fallback to client-computed values if server unreachable
      setVerdict(clientVerdict);
      setAllPassed(res.filter((r) => r.passed).length);
      setAllTotal(res.length);
      setResults(res.filter((_, i) => !problem.testCases[i]?.isHidden));
    }
    setSubmitting(false);
  }, [problem, workerState.status, code, run, user]);

  const handleRunCustom = useCallback(async () => {
    if (!code.trim() || !customInput.trim() || workerState.status !== "ready") return;
    setCustomRunning(true);
    setCustomResult(null);
    const fakeCase = { input: customInput.trim(), expectedOutput: "", isHidden: false };
    const { results: res } = await run(code, [fakeCase]);
    const r = res[0];
    if (r) {
      setCustomResult({
        output: r.actualOutput,
        error: r.errorMessage,
        time: r.executionTime,
      });
    }
    setCustomRunning(false);
  }, [code, customInput, workerState.status, run]);

  const toggleStar = useCallback(async () => {
    if (!user || !slug) return;
    try {
      const { data } = await apiClient.post<{ starred: boolean }>(`/users/star/${slug}`);
      setStarred(data.starred);
    } catch {}
  }, [user, slug]);

  useKeyboardShortcut("Enter", handleRun, { ctrlOrMeta: true });

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 dark:text-zinc-400 text-sm">
        {loadError}
      </div>
    );
  }
  if (!problem) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 dark:text-zinc-400 text-sm">
        Loading…
      </div>
    );
  }

  const canRun =
    workerState.status === "ready" &&
    code.trim().length > 0 &&
    !running &&
    !submitting &&
    !customRunning;
  const busy = running || submitting;
  const currentThemeLabel = EDITOR_THEMES.find((t) => t.id === editorTheme)?.label ?? "Theme";

  const leftPanel = (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <ProblemDescription problem={problem} />
      </div>
      <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 dark:border-zinc-700 shrink-0">
        <div className="flex items-center gap-2">
          {user && <StarButton starred={starred} onClick={toggleStar} />}
          {user && (
            <span className="text-xs text-slate-400 dark:text-zinc-500">
              {starred ? "Starred" : "Star problem"}
            </span>
          )}
        </div>
        {user && (
          <Link
            to={`/problems/${slug}/submissions`}
            className="text-xs text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-medium transition-colors"
          >
            My Submissions →
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <ErrorBoundary>
      <div className="h-full flex flex-col">
        <SplitPanel
          left={leftPanel}
          right={
            <div className="flex flex-col h-full">
              {workerState.status === "loading" && (
                <RuntimeBanner message="Loading Python runtime… (first visit may take a moment)" />
              )}
              {workerState.status === "reinitializing" && (
                <RuntimeBanner message="Re-loading Python runtime…" />
              )}
              {workerState.status === "error" && (
                <div className="bg-red-950 border-b border-red-800 px-4 py-2 flex items-center justify-between text-sm text-red-300 rounded-lg mx-2 mt-2">
                  <span>Python runtime failed to load. {workerState.errorMessage}</span>
                  <button
                    onClick={reload}
                    className="ml-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Reload
                  </button>
                </div>
              )}

              <div className="flex-1 min-h-0">
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  disabled={busy}
                  editorTheme={editorTheme}
                />
              </div>

              {/* Custom input panel */}
              {customOpen && (
                <div className="border-t border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 p-3 space-y-2">
                  <p className="text-xs text-slate-400 dark:text-zinc-500">
                    Input format matches test cases — e.g.{" "}
                    <span className="font-mono">[2,7,11,15], 9</span>
                  </p>
                  <textarea
                    rows={2}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter custom input…"
                    className="w-full font-mono text-xs bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 outline-none focus:border-rose-500 resize-none placeholder:text-slate-400 dark:placeholder:text-zinc-500"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleRunCustom}
                      disabled={!canRun || !customInput.trim()}
                      className="px-3 py-1 bg-slate-200 dark:bg-zinc-700 hover:bg-slate-300 dark:hover:bg-zinc-600 disabled:opacity-40 text-slate-900 dark:text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      {customRunning ? "Running…" : "Run Custom"}
                    </button>
                    {customResult && (
                      <span className="text-xs text-slate-400 dark:text-zinc-500 font-mono">
                        {customResult.time}ms
                      </span>
                    )}
                  </div>
                  {customResult && (
                    <div
                      className={`rounded-lg px-3 py-2 font-mono text-xs ${customResult.error ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400" : "bg-white dark:bg-zinc-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-zinc-700"}`}
                    >
                      {customResult.error
                        ? customResult.error
                        : customResult.output || (
                            <span className="text-slate-400 dark:text-zinc-500 italic">
                              No output
                            </span>
                          )}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom toolbar */}
              <div className="border-t border-slate-200 dark:border-zinc-700 px-3 py-2 flex items-center gap-2 bg-white dark:bg-zinc-800">
                {/* LEFT: Stopwatch play/pause + time + reset */}
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={toggleStopwatch}
                    title={swActive ? "Pause timer" : "Start timer"}
                    className={`flex items-center justify-center w-7 h-7 rounded-lg transition-colors ${
                      swActive
                        ? "text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40"
                        : "text-slate-400 dark:text-zinc-500 hover:bg-slate-100 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {swActive ? (
                      <Pause size={12} fill="currentColor" strokeWidth={0} />
                    ) : swElapsed > 0 ? (
                      <Play size={12} fill="currentColor" strokeWidth={0} />
                    ) : (
                      <Clock size={13} />
                    )}
                  </button>
                  {(swActive || swElapsed > 0) && (
                    <span
                      className={`font-mono text-xs font-semibold px-1 min-w-[3.5rem] text-center ${swActive ? "text-rose-500 dark:text-rose-400" : "text-slate-500 dark:text-zinc-400"}`}
                    >
                      {formatTime(swElapsed)}
                    </span>
                  )}
                  {!swActive && swElapsed > 0 && (
                    <button
                      onClick={resetStopwatch}
                      title="Reset timer"
                      className="flex items-center justify-center w-5 h-5 rounded text-slate-400 dark:text-zinc-600 hover:text-slate-600 dark:hover:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <X size={10} strokeWidth={2.5} />
                    </button>
                  )}
                </div>

                {/* LEFT: Theme selector */}
                <div ref={themeMenuRef} className="relative">
                  <button
                    onClick={() => setThemeMenuOpen((o) => !o)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors font-medium"
                  >
                    <Sun size={12} />
                    {currentThemeLabel}
                  </button>
                  {themeMenuOpen && (
                    <div className="absolute bottom-[calc(100%+4px)] left-0 w-36 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden z-50">
                      {EDITOR_THEMES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setEditorTheme(t.id)}
                          className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                            editorTheme === t.id
                              ? "bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400"
                              : "text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700"
                          }`}
                        >
                          {t.label}
                          {editorTheme === t.id && <Check size={13} className="ml-1 inline" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* LEFT: Custom input toggle */}
                <button
                  onClick={() => setCustomOpen((o) => !o)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    customOpen
                      ? "bg-rose-50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-400"
                      : "text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-700"
                  }`}
                  title="Toggle custom input"
                >
                  <Code size={13} />
                  Custom
                </button>

                <div className="flex-1" />

                {/* RIGHT: Run */}
                <button
                  onClick={handleRun}
                  disabled={!canRun}
                  title="Ctrl+Enter to run"
                  className="px-4 py-1.5 bg-slate-100 dark:bg-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-600 disabled:opacity-40 text-slate-900 dark:text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {running ? "Running…" : "Run"}
                </button>

                {/* RIGHT: Submit */}
                {user ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!canRun}
                    className="px-4 py-1.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 disabled:opacity-40 text-white rounded-lg text-sm font-semibold shadow-md transition-all"
                  >
                    {submitting ? "Submitting…" : "Submit"}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-1.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-lg text-sm font-semibold shadow-md transition-all"
                  >
                    Log in to Submit
                  </button>
                )}
              </div>

              {results && (
                <div className="border-t border-slate-200 dark:border-zinc-700 overflow-y-auto max-h-72 p-3 bg-slate-50 dark:bg-zinc-900">
                  <TestResults
                    results={results}
                    verdict={verdict}
                    isSubmission={isSubmission}
                    allPassed={allPassed}
                    allTotal={allTotal}
                  />
                </div>
              )}
            </div>
          }
        />
      </div>
    </ErrorBoundary>
  );
}

function RuntimeBanner({ message }: { message: string }) {
  return (
    <div className="bg-white dark:bg-zinc-800 border-b border-slate-200 dark:border-zinc-700 px-4 py-2 text-rose-500 dark:text-rose-300 text-sm flex items-center gap-2">
      <Loader className="animate-spin w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
      {message}
    </div>
  );
}
