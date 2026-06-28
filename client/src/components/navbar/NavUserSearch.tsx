import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, UserSearch, Check, Plus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import apiClient from "../../api/client";
import type { UserSearchResult } from "../../types";

export function NavUserSearch() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [friends, setFriends] = useState<Set<string>>(new Set());
  const [friendPending, setFriendPending] = useState<Set<string>>(new Set());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!user) return;
    apiClient
      .get<{ username: string }[]>("/users/me/friends")
      .then(({ data }) => setFriends(new Set(data.map((f) => f.username))))
      .catch(() => {});
  }, [user]);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
        setResults([]);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(() => {
      setLoading(true);
      apiClient
        .get<UserSearchResult[]>(`/users/search?q=${encodeURIComponent(q)}`)
        .then(({ data }) => setResults(data))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function go(username: string) {
    navigate(`/u/${username}`);
    setQuery("");
    setResults([]);
    setFocused(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setFocused(false);
      setResults([]);
      return;
    }
    if (e.key === "Enter" && query.trim()) go(query.trim());
  }

  async function toggleFriend(e: React.MouseEvent, username: string) {
    e.stopPropagation();
    if (friendPending.has(username)) return;
    setFriendPending((s) => new Set(s).add(username));
    try {
      const { data } = await apiClient.post<{ isFriend: boolean }>(`/users/friends/${username}`);
      setFriends((s) => {
        const next = new Set(s);
        data.isFriend ? next.add(username) : next.delete(username);
        return next;
      });
    } catch {}
    setFriendPending((s) => {
      const next = new Set(s);
      next.delete(username);
      return next;
    });
  }

  const showDropdown = focused && results.length > 0;

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex items-center bg-slate-100 dark:bg-zinc-700/60 border border-slate-300 dark:border-zinc-600 rounded-xl px-3 py-1.5 gap-2 w-28 sm:w-48 focus-within:border-rose-500 transition-colors">
        {loading ? (
          <Loader2 className="animate-spin w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 shrink-0" />
        ) : (
          <UserSearch className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 shrink-0" />
        )}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search users…"
          className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none min-w-0"
        />
      </div>

      {showDropdown && (
        <div className="absolute right-0 top-[calc(100%+6px)] w-60 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden z-50">
          {results.map((u) => (
            <div
              key={u.username}
              className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <button
                onMouseDown={() => go(u.username)}
                className="flex items-center gap-2.5 flex-1 min-w-0 text-left"
              >
                <div className="w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-900/60 border border-rose-300 dark:border-rose-700 flex items-center justify-center text-xs font-extrabold text-rose-600 dark:text-rose-300 select-none shrink-0">
                  {u.username.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-sm text-slate-900 dark:text-slate-100 font-medium truncate">
                  @{u.username}
                </span>
              </button>
              {user && u.username !== user.username && (
                <button
                  onMouseDown={(e) => toggleFriend(e, u.username)}
                  disabled={friendPending.has(u.username)}
                  title={friends.has(u.username) ? "Remove friend" : "Add friend"}
                  className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-md transition-colors disabled:opacity-40 ${
                    friends.has(u.username)
                      ? "text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                      : "text-slate-400 dark:text-zinc-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                  }`}
                >
                  {friends.has(u.username) ? (
                    <Check size={13} />
                  ) : (
                    <Plus size={13} />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
