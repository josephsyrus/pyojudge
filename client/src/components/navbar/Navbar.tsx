import { Link } from "react-router-dom";
import { Trophy, Users, Flame } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useStreak } from "../../hooks/useStreak";
import { NavUserSearch } from "./NavUserSearch";
import { UserMenu } from "./UserMenu";

export function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const streak = useStreak();

  return (
    <nav className="h-14 bg-white dark:bg-zinc-800 border-b border-slate-200 dark:border-zinc-700 flex items-center px-5 gap-4 shrink-0">
      <Link
        to="/problems"
        className="text-rose-500 dark:text-rose-400 font-extrabold text-2xl tracking-tight hover:text-rose-600 dark:hover:text-rose-300 transition-colors"
      >
        pyojudge
      </Link>

      <div className="flex-1" />

      <NavUserSearch />

      <Link
        to="/leaderboard"
        title="Leaderboard"
        className="text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-700"
      >
        <Trophy size={17} />
      </Link>

      {!isLoading && user && (
        <>
          <Link
            to="/friends"
            title="Friends"
            className="text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-700"
          >
            <Users size={17} />
          </Link>
          {streak !== null && (
            <span className="flex items-center gap-0.5 text-sm font-bold text-rose-500 dark:text-rose-300 tabular-nums">
              <Flame size={18} className="text-rose-500 dark:text-rose-400 shrink-0" />
              {streak}
            </span>
          )}
        </>
      )}

      {!isLoading && (
        <>
          {user ? (
            <>
              <UserMenu username={user.username} role={user.role} logout={logout} />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 text-sm font-medium transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </>
      )}
    </nav>
  );
}
