import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import type { SubmissionSummary, Submission, Verdict } from "../types";
import { useAuth } from "../contexts/AuthContext";

const verdictColors: Record<Verdict, string> = {
  Accepted: "text-emerald-600 dark:text-emerald-400",
  "Wrong Answer": "text-red-600 dark:text-red-400",
  "Time Limit Exceeded": "text-amber-600 dark:text-amber-400",
  "Runtime Error": "text-orange-600 dark:text-orange-400",
};

const LIMIT = 15;

export function SubmissionHistoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<SubmissionSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setLoading(true);
    setSelected(null);
    apiClient
      .get<{ submissions: SubmissionSummary[]; total: number; page: number; totalPages: number }>(
        `/submissions/problem/${slug}?page=${page}&limit=${LIMIT}`,
      )
      .then(({ data }) => {
        setSubmissions(data.submissions);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      })
      .catch(() => setError("Failed to load submissions"))
      .finally(() => setLoading(false));
  }, [slug, user, navigate, page]);

  async function viewSubmission(id: string) {
    setDetailLoading(true);
    try {
      const { data } = await apiClient.get<Submission>(`/submissions/${id}`);
      setSelected(data);
    } finally {
      setDetailLoading(false);
    }
  }

  function loadIntoEditor() {
    if (!selected || !slug) return;
    localStorage.setItem(`pyojudge_code_${user?.id ?? "guest"}_${slug}`, selected.code);
    navigate(`/problems/${slug}`);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link
          to={`/problems/${slug}`}
          className="text-rose-600 dark:text-rose-400 hover:underline text-sm font-semibold"
        >
          ← Back to problem
        </Link>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
          Submission History
        </h1>
        {total > 0 && (
          <span className="text-slate-400 dark:text-zinc-500 text-sm ml-auto">
            {total} submission{total !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {loading && <p className="text-slate-400 text-sm">Loading…</p>}
      {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}

      {!loading && !error && submissions.length === 0 && (
        <p className="text-slate-400 text-sm">No submissions yet.</p>
      )}

      {!loading && submissions.length > 0 && (
        <>
          <div className="divide-y divide-slate-200 dark:divide-zinc-700 border border-slate-200 dark:border-zinc-700 rounded-2xl overflow-hidden shadow-sm mb-4 bg-white dark:bg-zinc-900">
            {submissions.map((s) => (
              <button
                key={s._id}
                onClick={() => viewSubmission(s._id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-zinc-800 text-left transition-colors ${
                  selected?._id === s._id ? "bg-slate-50 dark:bg-zinc-800" : ""
                }`}
              >
                <span className={`font-semibold text-sm ${verdictColors[s.verdict]}`}>
                  {s.verdict}
                </span>
                <span className="text-slate-400 dark:text-slate-500 text-sm ml-auto">
                  {s.passedTests}/{s.totalTests} passed
                </span>
                <span className="text-slate-400 dark:text-slate-500 text-xs font-mono">
                  {new Date(s.submittedAt).toLocaleString()}
                </span>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page <= 1}
                className="px-3 py-1.5 text-sm font-semibold rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              <span className="text-sm text-slate-500 dark:text-zinc-400">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages}
                className="px-3 py-1.5 text-sm font-semibold rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {detailLoading && <p className="text-slate-400 text-sm">Loading submission…</p>}

      {selected && !detailLoading && (
        <div className="border border-slate-200 dark:border-zinc-700 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800">
            <span className={`font-bold text-sm ${verdictColors[selected.verdict]}`}>
              {selected.verdict} — {selected.passedTests}/{selected.totalTests} tests passed
            </span>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 dark:text-slate-500 text-xs font-mono">
                {new Date(selected.submittedAt).toLocaleString()}
              </span>
              <button
                onClick={loadIntoEditor}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                Load into Editor
              </button>
            </div>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-zinc-950 overflow-x-auto whitespace-pre-wrap">
            {selected.code}
          </pre>
        </div>
      )}
    </div>
  );
}
