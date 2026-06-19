import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/client";
import type { LeaderboardEntry } from "../types";
import { useAuth } from "../contexts/AuthContext";

function Skeleton() {
  return (
    <div className="divide-y divide-slate-200 dark:divide-zinc-700 border border-slate-200 dark:border-zinc-700 rounded-2xl overflow-hidden bg-white dark:bg-zinc-800 animate-pulse">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4">
          <div className="w-6 h-3 bg-slate-200 dark:bg-zinc-700 rounded" />
          <div className="w-28 h-3 bg-slate-200 dark:bg-zinc-700 rounded" />
          <div className="flex-1" />
          <div className="w-10 h-4 bg-slate-200 dark:bg-zinc-700 rounded-full" />
          <div className="w-10 h-4 bg-slate-200 dark:bg-zinc-700 rounded-full" />
          <div className="w-10 h-4 bg-slate-200 dark:bg-zinc-700 rounded-full" />
          <div className="w-8 h-3 bg-slate-200 dark:bg-zinc-700 rounded ml-4" />
        </div>
      ))}
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-amber-400 font-extrabold text-base">🥇</span>;
  if (rank === 2) return <span className="font-extrabold text-base">🥈</span>;
  if (rank === 3) return <span className="text-amber-600 font-extrabold text-base">🥉</span>;
  return (
    <span className="text-slate-400 dark:text-zinc-500 font-mono text-sm w-6 text-right">
      {rank}
    </span>
  );
}

export function LeaderboardPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get<LeaderboardEntry[]>("/leaderboard")
      .then(({ data }) => setEntries(data))
      .catch(() => setError("Failed to load leaderboard"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Leaderboard
        </h1>
        <span className="text-xs text-slate-400 dark:text-zinc-500">
          Top 100 by problems solved
        </span>
      </div>

      {loading && <Skeleton />}
      {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}

      {!loading && !error && entries.length === 0 && (
        <p className="text-slate-400 dark:text-zinc-500 text-center py-16">
          No submissions yet. Be the first!
        </p>
      )}

      {!loading && !error && entries.length > 0 && (
        <>
          {/* Header */}
          <div className="flex items-center gap-4 px-5 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            <span className="w-6">#</span>
            <span className="flex-1">User</span>
            <span className="w-12 text-center text-teal-500">Easy</span>
            <span className="w-14 text-center text-amber-500">Med</span>
            <span className="w-12 text-center text-rose-500">Hard</span>
            <span className="w-14 text-right">Total</span>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-zinc-700 border border-slate-200 dark:border-zinc-700 rounded-2xl overflow-hidden bg-white dark:bg-zinc-800">
            {entries.map((entry, i) => {
              const isMe = user?.username === entry.username;
              return (
                <Link
                  key={entry.username}
                  to={`/u/${entry.username}`}
                  className={`flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-zinc-700/50 transition-colors ${
                    isMe ? "bg-rose-50 dark:bg-rose-950/30" : ""
                  }`}
                >
                  <div className="w-6 flex justify-end">
                    <RankBadge rank={i + 1} />
                  </div>

                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-900/60 border border-rose-300 dark:border-rose-700 flex items-center justify-center text-xs font-extrabold text-rose-600 dark:text-rose-300 select-none shrink-0">
                      {entry.username.slice(0, 2).toUpperCase()}
                    </div>
                    <span
                      className={`font-semibold text-sm truncate ${isMe ? "text-rose-400" : "text-slate-900 dark:text-slate-100"}`}
                    >
                      {entry.username}
                      {isMe && (
                        <span className="ml-1.5 text-xs text-rose-400/70 font-normal">(you)</span>
                      )}
                    </span>
                  </div>

                  <span className="w-12 text-center text-sm font-mono text-teal-500 dark:text-teal-400">
                    {entry.easy}
                  </span>
                  <span className="w-14 text-center text-sm font-mono text-amber-500 dark:text-amber-400">
                    {entry.medium}
                  </span>
                  <span className="w-12 text-center text-sm font-mono text-rose-500 dark:text-rose-400">
                    {entry.hard}
                  </span>
                  <span className="w-14 text-right text-sm font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
                    {entry.totalSolved}
                  </span>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
