import type { TestResult, Verdict } from "../../types";

interface TestResultsProps {
  results: TestResult[];
  verdict?: Verdict | null;
  isSubmission?: boolean;
  allPassed?: number;
  allTotal?: number;
}

const verdictStyles: Record<Verdict, string> = {
  Accepted:
    "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300",
  "Wrong Answer":
    "bg-red-50 border-red-200 text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300",
  "Time Limit Exceeded":
    "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-300",
  "Runtime Error":
    "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-300",
};

export function TestResults({
  results,
  verdict,
  isSubmission = false,
  allPassed,
  allTotal,
}: TestResultsProps) {
  if (results.length === 0) return null;

  const passed = results.filter((r) => r.passed).length;
  const maxTime = results.length > 0 ? Math.max(...results.map((r) => r.executionTime)) : 0;
  const hasHidden = isSubmission && allTotal !== undefined && allTotal > results.length;
  const hiddenTotal = hasHidden ? allTotal! - results.length : 0;
  const hiddenPassed = hasHidden ? allPassed! - passed : 0;

  return (
    <div className="flex flex-col gap-3">
      {verdict && (
        <div
          className={`px-4 py-3 rounded-xl border font-semibold text-sm ${verdictStyles[verdict]}`}
        >
          <div>
            {isSubmission ? "Submission" : "Run"} result:{" "}
            <span className="font-extrabold">{verdict}</span>
            {" — "}
            {isSubmission && allTotal !== undefined
              ? `${allPassed}/${allTotal}`
              : `${passed}/${results.length}`}{" "}
            test cases passed
          </div>
          {hasHidden && (
            <div className="mt-1 text-xs opacity-75 font-normal">
              {passed}/{results.length} visible &middot; {hiddenPassed}/{hiddenTotal} hidden
            </div>
          )}
          <div className="mt-1 text-xs font-mono opacity-70">{maxTime}ms max</div>
        </div>
      )}

      {results.map((result, i) => (
        <div
          key={i}
          className={`rounded-xl border p-3.5 text-sm ${
            result.passed
              ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/40"
              : "border-red-200 bg-red-50/60 dark:border-red-800 dark:bg-red-950/40"
          }`}
        >
          <div className="flex items-center gap-2 mb-2.5 font-medium">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold text-white ${
                result.passed ? "bg-emerald-500" : "bg-red-500"
              }`}
            >
              {result.passed ? "PASS" : "FAIL"}
            </span>
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Case {i + 1}</span>
            <span className="ml-auto text-slate-400 dark:text-slate-500 text-xs font-mono">
              {result.executionTime}ms
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
            <Row label="Input" value={result.input} />
            <Row
              label="Expected"
              value={
                result.isHidden && !result.expectedOutput
                  ? "—  hidden"
                  : (result.expectedOutput ?? "")
              }
            />
            {result.errorMessage ? (
              <Row label="Error" value={result.errorMessage} highlight="error" />
            ) : (
              <Row
                label="Output"
                value={result.actualOutput}
                highlight={result.passed ? "pass" : "fail"}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: "pass" | "fail" | "error";
}) {
  const valueColor =
    highlight === "pass"
      ? "text-emerald-600 dark:text-emerald-400"
      : highlight === "fail"
        ? "text-red-600 dark:text-red-400"
        : highlight === "error"
          ? "text-orange-600 dark:text-orange-400"
          : "text-slate-700 dark:text-slate-300";

  return (
    <div className="flex gap-2">
      <span className="text-slate-400 dark:text-slate-500 w-20 shrink-0">{label}:</span>
      <span className={`break-all ${valueColor}`}>{value || "(empty)"}</span>
    </div>
  );
}
