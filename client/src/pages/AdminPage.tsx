import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import apiClient from "../api/client";
import type { Problem } from "../types";
import { DifficultyBadge } from "../components/common/DifficultyBadge";
import { useAuth } from "../contexts/AuthContext";

export function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/problems");
      return;
    }
    apiClient
      .get<Problem[]>("/admin/problems")
      .then(({ data }) => setProblems(data))
      .catch(() => setError("Failed to load problems"))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      await apiClient.delete(`/admin/problems/${slug}`);
      setProblems((prev) => prev.filter((p) => p.slug !== slug));
    } catch {
      alert("Failed to delete problem.");
    } finally {
      setDeleting(null);
    }
  }

  if (loading) {
    return (
      <div className="w-full px-4 sm:px-8 py-8 animate-pulse space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-slate-200 dark:bg-zinc-800 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Edit Problems
          </h1>
          <p className="text-slate-400 dark:text-zinc-500 text-sm mt-0.5">
            {problems.length} problems in database
          </p>
        </div>
        <Link
          to="/admin/problems/new"
          className="flex items-center gap-2 bg-rose-500 hover:bg-rose-400 dark:bg-rose-600 dark:hover:bg-rose-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow"
        >
          <Plus size={14} strokeWidth={2.5} />
          New problem
        </Link>
      </div>

      {error && <p className="text-red-500 dark:text-red-400 text-sm mb-4">{error}</p>}

      <div className="divide-y divide-slate-200 dark:divide-zinc-700 border border-slate-200 dark:border-zinc-700 rounded-2xl overflow-hidden bg-white dark:bg-zinc-800">
        {problems.map((p) => (
          <div
            key={p.slug}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 sm:px-5 py-3.5"
          >
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-slate-900 dark:text-slate-100 break-words">
                {p.title}
              </span>
              <span className="ml-2 text-xs text-slate-400 dark:text-zinc-500 font-mono break-all">
                {p.slug}
              </span>
            </div>
            {p.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 sm:max-w-xs">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-slate-100 dark:bg-zinc-700 text-slate-500 dark:text-zinc-400 rounded-full px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3 sm:gap-4">
              <DifficultyBadge difficulty={p.difficulty} />
              <span className="text-xs text-slate-400 dark:text-zinc-500 tabular-nums sm:w-20 sm:text-right">
                {p.testCases.length} cases
              </span>
              <Link
                to={`/admin/problems/${p.slug}/edit`}
                className="text-xs text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-semibold transition-colors px-2 ml-auto"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p.slug, p.title)}
                disabled={deleting === p.slug}
                className="text-xs text-slate-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 font-semibold transition-colors disabled:opacity-40 px-2"
              >
                {deleting === p.slug ? "…" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
