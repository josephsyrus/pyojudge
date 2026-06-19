import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Check, X, UserPlus } from "lucide-react";
import apiClient from "../api/client";
import type { PublicUserProfile, Difficulty } from "../types";
import { DifficultyBadge } from "../components/common/DifficultyBadge";
import { useAuth } from "../contexts/AuthContext";

function computeStreak(activityByDate: Record<string, number>): number {
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 366; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    if ((activityByDate[key] ?? 0) > 0) streak++;
    else if (i > 0) break;
  }
  return streak;
}

function relativeTime(dateStr: string): string {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "1d ago";
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1w ago";
  if (weeks < 5) return `${weeks}w ago`;
  return `${Math.floor(weeks / 4)}mo ago`;
}

function cellColor(count: number): string {
  if (count === 0) return "bg-slate-200 dark:bg-zinc-700";
  if (count === 1) return "bg-rose-900";
  if (count === 2) return "bg-rose-700";
  return "bg-rose-500";
}

function ActivityHeatmap({ activityByDate }: { activityByDate: Record<string, number> }) {
  const today = new Date();
  const months: { label: string; weeks: (string | null)[][] }[] = [];
  for (let offset = 11; offset >= 0; offset--) {
    const ref = new Date(today.getFullYear(), today.getMonth() - offset, 1);
    const year = ref.getFullYear();
    const month = ref.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDow = ref.getDay();
    const cells: (string | null)[] = Array<null>(firstDow).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push(new Date(iso) > today ? null : iso);
    }
    while (cells.length % 7 !== 0) cells.push(null);
    const weeks: (string | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    months.push({ label: ref.toLocaleString("default", { month: "short" }), weeks });
  }

  return (
    <div className="grid grid-cols-6 gap-x-2 gap-y-4">
      {months.map((m, mi) => (
        <div key={mi}>
          <div className="text-xs text-slate-500 dark:text-zinc-400 font-semibold leading-none mb-1">
            {m.label}
          </div>
          <div className="flex gap-0.5">
            {m.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.5">
                {week.map((day, di) =>
                  day ? (
                    <div
                      key={di}
                      title={`${day}: ${activityByDate[day] ?? 0} submission(s)`}
                      className={`w-3 h-3 rounded-sm cursor-default transition-opacity hover:opacity-70 ${cellColor(activityByDate[day] ?? 0)}`}
                    />
                  ) : (
                    <div key={di} className="w-3 h-3" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function useAnimatedValue(target: number, duration = 800): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function DiffBar({
  difficulty,
  solved,
  total,
  barColor,
  textColor,
}: {
  difficulty: Difficulty;
  solved: number;
  total: number;
  barColor: string;
  textColor: string;
}) {
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  const width = useAnimatedValue(pct);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <DifficultyBadge difficulty={difficulty} />
        <span className={`text-sm font-bold tabular-nums ${textColor}`}>
          {solved}/{total}
        </span>
      </div>
      <div className="h-2.5 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function ProgressRing({ pct }: { pct: number }) {
  const value = useAnimatedValue(pct);
  return (
    <div
      className="relative w-20 h-20 rounded-full [--arc:theme(colors.rose.400)] [--track:theme(colors.slate.200)] dark:[--arc:theme(colors.rose.500)] dark:[--track:theme(colors.zinc.700)]"
      style={{ backgroundImage: `conic-gradient(var(--arc) ${value * 3.6}deg, var(--track) 0)` }}
    >
      <div className="absolute inset-[6px] rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center">
        <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
          {Math.round(value)}%
        </span>
      </div>
    </div>
  );
}

export function PublicProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { user: authUser } = useAuth();
  const isOwnProfile = !!authUser && authUser.username === username;
  const [profile, setProfile] = useState<PublicUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFriend, setIsFriend] = useState(false);
  const [friendLoading, setFriendLoading] = useState(false);

  useEffect(() => {
    if (!username) return;
    apiClient
      .get<PublicUserProfile>(`/users/${username}`)
      .then(({ data }) => setProfile(data))
      .catch(() => setError("User not found"))
      .finally(() => setLoading(false));
  }, [username]);

  useEffect(() => {
    if (!authUser || !username || isOwnProfile) return;
    apiClient
      .get<{ username: string; joinedAt: string }[]>("/users/me/friends")
      .then(({ data }) => setIsFriend(data.some((f) => f.username === username)))
      .catch(() => {});
  }, [authUser, username, isOwnProfile]);

  async function toggleFriend() {
    if (!authUser || !username) return;
    setFriendLoading(true);
    try {
      const { data } = await apiClient.post<{ isFriend: boolean }>(`/users/friends/${username}`);
      setIsFriend(data.isFriend);
    } catch {}
    setFriendLoading(false);
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-pulse">
        <div className="h-40 rounded-2xl bg-slate-200 dark:bg-zinc-800" />
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-2 h-64 rounded-2xl bg-slate-200 dark:bg-zinc-800" />
          <div className="col-span-3 space-y-6">
            <div className="h-48 rounded-2xl bg-slate-200 dark:bg-zinc-800" />
            <div className="h-48 rounded-2xl bg-slate-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-slate-500 dark:text-zinc-400 text-sm">{error ?? "User not found"}</p>
        <Link to="/problems" className="text-rose-500 dark:text-rose-400 text-sm hover:underline">
          Back to problems →
        </Link>
      </div>
    );
  }

  const totalProblems =
    (profile.totalByDifficulty.Easy ?? 0) +
    (profile.totalByDifficulty.Medium ?? 0) +
    (profile.totalByDifficulty.Hard ?? 0);
  const totalSolvedPct =
    totalProblems > 0 ? Math.round((profile.totalSolved / totalProblems) * 100) : 0;
  const streak = computeStreak(profile.activityByDate);
  const initials = profile.username.slice(0, 2).toUpperCase();
  const joinedYear = new Date(profile.joinedAt).getFullYear();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="rounded-2xl bg-rose-50 dark:bg-rose-800 text-rose-900 dark:text-white p-8 mb-6 shadow-sm border border-rose-200 dark:border-rose-500">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-rose-200/70 dark:bg-white/25 border-2 border-rose-300/60 dark:border-white/40 flex items-center justify-center text-2xl font-extrabold select-none flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold tracking-tight">@{profile.username}</h1>
            {isOwnProfile && authUser?.email ? (
              <p className="text-rose-600 dark:text-rose-300 text-sm mt-0.5">{authUser.email}</p>
            ) : (
              <p className="text-rose-600 dark:text-rose-300 text-sm mt-0.5">
                Member since {joinedYear}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 items-start">
            {authUser && !isOwnProfile && (
              <button
                onClick={toggleFriend}
                disabled={friendLoading}
                className={`group flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-50 ${
                  isFriend
                    ? "bg-pink-200 dark:bg-pink-900/50 text-pink-800 dark:text-pink-200 hover:bg-pink-300 dark:hover:bg-pink-800/60 border border-pink-300 dark:border-pink-700"
                    : "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-900/30"
                }`}
              >
                {isFriend ? (
                  <>
                    <Check size={14} strokeWidth={2.5} className="group-hover:hidden" />
                    <X size={14} strokeWidth={2.5} className="hidden group-hover:block" />
                    <span className="group-hover:hidden">Friends</span>
                    <span className="hidden group-hover:inline">Remove</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={14} strokeWidth={2.5} />
                    Add Friend
                  </>
                )}
              </button>
            )}
            <div className="bg-rose-100 dark:bg-rose-700/40 border border-rose-200 dark:border-rose-500 rounded-xl px-4 py-2.5 text-center min-w-[80px]">
              <div className="text-xl font-extrabold leading-none">
                {profile.totalSolved}/{totalProblems}
              </div>
              <div className="text-rose-600 dark:text-rose-300 text-xs mt-1 font-medium">
                Solved
              </div>
            </div>
            <div className="bg-rose-100 dark:bg-rose-700/40 border border-rose-200 dark:border-rose-500 rounded-xl px-4 py-2.5 text-center min-w-[80px]">
              <div className="text-xl font-extrabold leading-none">{totalSolvedPct}%</div>
              <div className="text-rose-600 dark:text-rose-300 text-xs mt-1 font-medium">
                Complete
              </div>
            </div>
            <div className="bg-rose-100 dark:bg-rose-700/40 border border-rose-200 dark:border-rose-500 rounded-xl px-4 py-2.5 text-center min-w-[80px]">
              <div className="text-xl font-extrabold leading-none">
                {streak > 0 ? `${streak}d` : "—"}
              </div>
              <div className="text-rose-600 dark:text-rose-300 text-xs mt-1 font-medium">
                Streak
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-extrabold text-slate-900 dark:text-slate-100">Activity</h2>
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                Past year
              </span>
            </div>
            <ActivityHeatmap activityByDate={profile.activityByDate} />
          </div>

          <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl shadow-sm p-6">
            <h2 className="font-extrabold text-slate-900 dark:text-slate-100 mb-4">
              Recently Solved
            </h2>
            {profile.recentlySolved.length === 0 ? (
              <p className="text-slate-400 dark:text-zinc-400 text-sm text-center py-8">
                No problems solved yet.
              </p>
            ) : (
              <div className="divide-y divide-slate-200 dark:divide-zinc-700">
                {profile.recentlySolved.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/problems/${p.slug}`}
                    className="flex items-center gap-3 py-3 -mx-2 px-2 rounded-lg hover:bg-slate-100/50 dark:hover:bg-zinc-700/50 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
                      <Check
                        className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="flex-1 font-semibold text-slate-900 dark:text-slate-100 text-sm">
                      {p.title}
                    </span>
                    <DifficultyBadge difficulty={p.difficulty} />
                    <span className="text-xs text-slate-400 dark:text-zinc-500 font-mono shrink-0">
                      {relativeTime(p.solvedAt)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl shadow-sm p-6 self-start">
          <h2 className="font-extrabold text-slate-900 dark:text-slate-100 mb-5">
            Solved by Difficulty
          </h2>
          <div className="space-y-5">
            <DiffBar
              difficulty="Easy"
              solved={profile.bySolvedDifficulty.Easy ?? 0}
              total={profile.totalByDifficulty.Easy ?? 0}
              barColor="bg-teal-400 dark:bg-teal-500"
              textColor="text-teal-600 dark:text-teal-400"
            />
            <DiffBar
              difficulty="Medium"
              solved={profile.bySolvedDifficulty.Medium ?? 0}
              total={profile.totalByDifficulty.Medium ?? 0}
              barColor="bg-amber-400 dark:bg-amber-500"
              textColor="text-amber-600 dark:text-amber-400"
            />
            <DiffBar
              difficulty="Hard"
              solved={profile.bySolvedDifficulty.Hard ?? 0}
              total={profile.totalByDifficulty.Hard ?? 0}
              barColor="bg-rose-400 dark:bg-rose-500"
              textColor="text-rose-600 dark:text-rose-400"
            />
          </div>
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-zinc-700 text-center">
            <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
              {profile.totalSolved}
            </div>
            <div className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              of {totalProblems} total solved
            </div>
            <div className="mt-4 flex justify-center">
              <ProgressRing pct={totalSolvedPct} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
