import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import type { FriendInfo } from "../types";
import { useAuth } from "../contexts/AuthContext";

function relativeDate(dateStr: string): string {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days === 0) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function FriendsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [friends, setFriends] = useState<FriendInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    apiClient
      .get<FriendInfo[]>("/users/me/friends")
      .then(({ data }) => setFriends(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, navigate]);

  async function removeFriend(username: string) {
    try {
      await apiClient.post(`/users/friends/${username}`);
      setFriends((prev) => prev.filter((f) => f.username !== username));
    } catch {}
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-6">
        Friends
      </h1>

      {loading && (
        <div className="divide-y divide-slate-200 dark:divide-zinc-700 border border-slate-200 dark:border-zinc-700 rounded-2xl bg-white dark:bg-zinc-800 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-zinc-700" />
              <div className="flex-1 h-3 bg-slate-200 dark:bg-zinc-700 rounded" />
              <div className="w-16 h-3 bg-slate-200 dark:bg-zinc-700 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && friends.length === 0 && (
        <div className="text-center py-20 text-slate-400 dark:text-zinc-500">
          <p className="font-semibold text-slate-500 dark:text-zinc-400 mb-1">No friends yet</p>
          <p className="text-sm">Visit someone's profile and add them as a friend.</p>
          <Link
            to="/leaderboard"
            className="mt-4 inline-block text-rose-500 dark:text-rose-400 text-sm hover:underline"
          >
            Browse the leaderboard →
          </Link>
        </div>
      )}

      {!loading && friends.length > 0 && (
        <div className="divide-y divide-slate-200 dark:divide-zinc-700 border border-slate-200 dark:border-zinc-700 rounded-2xl bg-white dark:bg-zinc-800">
          {friends.map((f) => (
            <div key={f.username} className="flex items-center gap-4 px-5 py-3.5">
              <Link
                to={`/u/${f.username}`}
                className="flex items-center gap-3 flex-1 min-w-0 group"
              >
                <div className="w-9 h-9 rounded-full bg-rose-100 dark:bg-rose-900/60 border border-rose-300 dark:border-rose-700 flex items-center justify-center text-sm font-extrabold text-rose-600 dark:text-rose-300 select-none shrink-0">
                  {f.username.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors truncate">
                    @{f.username}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-zinc-500">
                    Joined {relativeDate(f.joinedAt)}
                  </p>
                </div>
              </Link>
              <button
                onClick={() => removeFriend(f.username)}
                className="text-xs text-slate-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 font-medium transition-colors shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-400 dark:text-zinc-500 mt-3 text-right">
        {friends.length} {friends.length === 1 ? "friend" : "friends"}
      </p>
    </div>
  );
}
