import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Star, Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import apiClient from "../api/client";
import type { ProblemSummary, Difficulty } from "../types";
import { DifficultyBadge } from "../components/common/DifficultyBadge";
import { useAuth } from "../contexts/AuthContext";

const ALL_DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];
const PAGE_SIZE = 20;

interface ProblemsResponse {
  problems: ProblemSummary[];
  total: number;
  page: number;
  totalPages: number;
}

function StarButton({
  starred,
  onClick,
}: {
  starred: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 transition-colors p-0.5 rounded ${
        starred ? "text-rose-400" : "text-slate-400 dark:text-zinc-600 hover:text-rose-400"
      }`}
      aria-label={starred ? "Unstar" : "Star"}
    >
      <Star size={14} fill={starred ? "currentColor" : "none"} />
    </button>
  );
}

function TagPill({ tag, active, onClick }: { tag: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        active
          ? "bg-rose-500 dark:bg-rose-600 text-white ring-1 ring-rose-400 dark:ring-rose-500"
          : "bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-600"
      }`}
    >
      {tag}
    </button>
  );
}

function ListSkeleton() {
  return (
    <div className="divide-y divide-slate-200 dark:divide-zinc-700 border border-slate-200 dark:border-zinc-700 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-zinc-800">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-4">
          <div className="w-5 h-3 bg-slate-200 dark:bg-zinc-700 rounded animate-pulse" />
          <div className="flex-1 h-3 bg-slate-200 dark:bg-zinc-700 rounded animate-pulse" />
          <div className="w-14 h-5 bg-slate-200 dark:bg-zinc-700 rounded-full animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function ProblemListPage() {
  const { user } = useAuth();
  const [problems, setProblems] = useState<ProblemSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [selectedDifficulties, setSelectedDifficulties] = useState<Set<Difficulty>>(new Set());
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [starredSlugs, setStarredSlugs] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  // Mobile-only: collapse the filter panel so it can sit at the top without
  // pushing the list far down, and stay put while applying multiple filters.
  const [filtersOpen, setFiltersOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search input
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  // Fetch all tags once on mount
  useEffect(() => {
    apiClient
      .get<string[]>("/problems/tags")
      .then(({ data }) => setAllTags(data))
      .catch(() => {});
  }, []);

  // Fetch starred slugs when user changes
  useEffect(() => {
    if (!user) {
      setStarredSlugs(new Set());
      return;
    }
    apiClient
      .get<{ starredProblems: string[] }>("/users/me/starred")
      .then(({ data }) => setStarredSlugs(new Set(data.starredProblems)))
      .catch(() => {});
  }, [user]);

  // Fetch problems from server whenever filters/page change
  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(PAGE_SIZE));
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (selectedDifficulties.size > 0)
      params.set("difficulty", Array.from(selectedDifficulties).join(","));
    if (selectedTags.size > 0) params.set("tags", Array.from(selectedTags).join(","));
    if (showStarredOnly && starredSlugs.size > 0)
      params.set("slugs", Array.from(starredSlugs).join(","));
    // If starred only but no starred problems, show empty immediately
    if (showStarredOnly && starredSlugs.size === 0) {
      setProblems([]);
      setTotal(0);
      setTotalPages(1);
      setLoading(false);
      return;
    }

    apiClient
      .get<ProblemsResponse>(`/problems?${params.toString()}`)
      .then(({ data }) => {
        setProblems(data.problems);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      })
      .catch(() => setError("Failed to load problems"))
      .finally(() => setLoading(false));
  }, [debouncedSearch, selectedDifficulties, selectedTags, showStarredOnly, starredSlugs, page]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const n = new Set(prev);
      n.has(tag) ? n.delete(tag) : n.add(tag);
      return n;
    });
    setPage(1);
  }

  function toggleDifficulty(d: Difficulty) {
    setSelectedDifficulties((prev) => {
      const n = new Set(prev);
      n.has(d) ? n.delete(d) : n.add(d);
      return n;
    });
    setPage(1);
  }

  function clearFilters() {
    setSelectedTags(new Set());
    setSelectedDifficulties(new Set());
    setSearch("");
    setDebouncedSearch("");
    setShowStarredOnly(false);
    setPage(1);
  }

  const toggleStar = useCallback(
    async (e: React.MouseEvent, slug: string) => {
      e.preventDefault();
      e.stopPropagation();
      if (!user) return;
      try {
        const { data } = await apiClient.post<{ starredProblems: string[] }>(`/users/star/${slug}`);
        setStarredSlugs(new Set(data.starredProblems));
      } catch {}
    },
    [user],
  );

  const hasActiveFilters =
    selectedTags.size > 0 || selectedDifficulties.size > 0 || search !== "" || showStarredOnly;
  const activeFilterCount =
    selectedTags.size + selectedDifficulties.size + (showStarredOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
        Problems
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: problem list */}
        <div className="flex-1 min-w-0">
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 w-4 h-4"
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="Search problems…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none focus:border-rose-500 transition-colors shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-200"
                aria-label="Clear search"
              >
                <X size={12} strokeWidth={2} />
              </button>
            )}
          </div>

          {loading && <ListSkeleton />}
          {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}

          {!loading && !error && (
            <>
              {problems.length === 0 ? (
                <div className="text-center py-16 text-slate-400 dark:text-zinc-500">
                  <p className="font-semibold text-slate-500 dark:text-zinc-400">
                    No problems match your filters
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-3 text-rose-500 dark:text-rose-400 text-sm hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-200 dark:divide-zinc-700 border border-slate-200 dark:border-zinc-700 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-zinc-800">
                  {problems.map((p, i) => (
                    <Link
                      key={p._id}
                      to={`/problems/${p.slug}`}
                      className="flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-zinc-700/50 transition-colors"
                    >
                      <span className="text-rose-400/60 text-sm font-mono shrink-0 pt-0.5 w-7">
                        {(page - 1) * PAGE_SIZE + i + 1}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                          {p.title}
                        </span>
                        {p.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {p.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  selectedTags.has(tag)
                                    ? "bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300"
                                    : "bg-slate-100 dark:bg-zinc-700 text-slate-500 dark:text-zinc-400"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <DifficultyBadge difficulty={p.difficulty} />
                      {user && (
                        <StarButton
                          starred={starredSlugs.has(p.slug)}
                          onClick={(e) => toggleStar(e, p.slug)}
                        />
                      )}
                    </Link>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-slate-400 dark:text-zinc-500">
                  {total} problem{total !== 1 ? "s" : ""}
                  {hasActiveFilters ? " matched" : ""}
                </p>
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => p - 1)}
                      disabled={page <= 1}
                      className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      ←
                    </button>
                    <span className="text-xs text-slate-500 dark:text-zinc-400 tabular-nums">
                      {page} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={page >= totalPages}
                      className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Filter panel — right column on desktop, collapsible top section on mobile */}
        <div className="w-full lg:w-72 lg:shrink-0 space-y-3 lg:sticky lg:top-4 order-first lg:order-none">
          {/* Mobile-only toggle: keeps filters anchored at the top while applying them */}
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className="lg:hidden flex items-center justify-between w-full rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-zinc-200 shadow-sm"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span className="rounded-full bg-rose-500 text-white text-xs font-bold px-1.5 py-0.5 leading-none">
                  {activeFilterCount}
                </span>
              )}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Filter controls: collapsible on mobile, always shown on desktop */}
          <div className={`space-y-3 ${filtersOpen ? "" : "hidden"} lg:block`}>
            <div className="hidden lg:flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Filters
              </span>
              <button
                onClick={clearFilters}
                className={`text-xs text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-medium transition-opacity ${
                  hasActiveFilters
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                Clear all
              </button>
            </div>
            {/* Mobile-only clear-all (the desktop header above is hidden on mobile) */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="lg:hidden text-xs text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-medium"
              >
                Clear all filters
              </button>
            )}

          {user && (
            <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-4 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-3">
                Bookmarks
              </p>
              <button
                onClick={() => {
                  setShowStarredOnly((s) => !s);
                  setPage(1);
                }}
                className={`flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  showStarredOnly
                    ? "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 ring-1 ring-rose-400 dark:ring-rose-700"
                    : "text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700"
                }`}
              >
                <Star size={14} fill={showStarredOnly ? "currentColor" : "none"} />
                Starred only
              </button>
            </div>
          )}

          <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-3">
              Difficulty
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => toggleDifficulty(d)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                    selectedDifficulties.has(d)
                      ? "bg-rose-100 dark:bg-rose-900/30 ring-1 ring-rose-400 dark:ring-rose-700"
                      : "hover:bg-slate-100 dark:hover:bg-zinc-700"
                  }`}
                >
                  <DifficultyBadge difficulty={d} />
                </button>
              ))}
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-4 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-3">
                Topics
              </p>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <TagPill
                    key={tag}
                    tag={tag}
                    active={selectedTags.has(tag)}
                    onClick={() => toggleTag(tag)}
                  />
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
