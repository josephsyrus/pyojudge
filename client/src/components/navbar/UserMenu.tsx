import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, User, Star, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export function UserMenu({
  username,
  role,
  logout,
}: {
  username: string;
  role: "user" | "admin";
  logout: () => void;
}) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initials = username.slice(0, 2).toUpperCase();

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        title={username}
        className="relative w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/60 border border-rose-300 dark:border-rose-700 flex items-center justify-center text-sm font-bold text-rose-600 dark:text-rose-300 select-none hover:opacity-80 transition-opacity shrink-0"
      >
        {initials}
        {role === "admin" && (
          <span className="absolute -top-1.5 -right-1.5 bg-white dark:bg-zinc-800 rounded-full p-0.5">
            <Crown size={11} className="text-amber-400" fill="currentColor" />
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-44 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden z-50">
          <div className="px-3 py-2 border-b border-slate-200 dark:border-zinc-700">
            <p className="text-xs text-slate-500 dark:text-zinc-400 truncate">@{username}</p>
          </div>
          <button
            onClick={() => {
              navigate(`/u/${username}`);
              setOpen(false);
            }}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors text-sm text-slate-900 dark:text-slate-100"
          >
            <User size={14} />
            View profile
          </button>
          {role === "admin" && (
            <button
              onClick={() => {
                navigate("/admin");
                setOpen(false);
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors text-sm text-rose-500 dark:text-rose-400"
            >
              <Star size={14} />
              Admin panel
            </button>
          )}
          <div className="border-t border-slate-200 dark:border-zinc-700 mt-1">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between w-full px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors text-sm text-slate-700 dark:text-zinc-300"
            >
              <span className="flex items-center gap-2.5">
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                Appearance
              </span>
              <span className="text-xs text-slate-400 dark:text-zinc-500 capitalize">{theme}</span>
            </button>
          </div>
          <div className="border-t border-slate-200 dark:border-zinc-700">
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100"
            >
              <LogOut size={14} />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
