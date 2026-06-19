import type { Difficulty } from "../../types";

const badgeClasses: Record<Difficulty, string> = {
  Easy: "bg-teal-50   border border-teal-200   text-teal-700   dark:bg-teal-900/60   dark:border-transparent dark:text-teal-300",
  Medium:
    "bg-amber-50  border border-amber-200  text-amber-700  dark:bg-amber-900/60  dark:border-transparent dark:text-amber-300",
  Hard: "bg-rose-50   border border-rose-300   text-rose-700   dark:bg-rose-900/60   dark:border-transparent dark:text-rose-300",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${badgeClasses[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
