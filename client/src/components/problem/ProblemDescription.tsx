import type { Problem } from "../../types";
import { DifficultyBadge } from "../common/DifficultyBadge";

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <div className="p-6 text-sm leading-relaxed">
      <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
        {problem.title}
      </h1>
      <DifficultyBadge difficulty={problem.difficulty} />

      <div className="mt-4 text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
        {problem.description}
      </div>

      <div className="mt-5 space-y-3">
        {problem.examples.map((ex, i) => (
          <div
            key={i}
            className="bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 p-4"
          >
            <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">Example {i + 1}</p>
            <div className="font-mono text-xs space-y-1.5">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Input: </span>
                <span className="text-slate-800 dark:text-slate-200">{ex.input}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Output: </span>
                <span className="text-slate-800 dark:text-slate-200">{ex.output}</span>
              </div>
              {ex.explanation && (
                <div className="text-slate-500 dark:text-slate-400 mt-1.5 italic">
                  {ex.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {problem.constraints.length > 0 && (
        <div className="mt-5">
          <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">Constraints</p>
          <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 p-4">
            <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400 font-mono text-xs">
              {problem.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {problem.tags && problem.tags.length > 0 && (
        <div className="mt-5">
          <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">Topics</p>
          <div className="flex flex-wrap gap-1.5">
            {problem.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
