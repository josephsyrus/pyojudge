import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function OAuthCallbackPage() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error) {
      navigate("/login?error=oauth_failed", { replace: true });
      return;
    }
    if (isLoading) return;
    navigate(user ? "/problems" : "/login?error=oauth_failed", { replace: true });
  }, [user, isLoading, navigate]);

  return (
    <div className="flex items-center justify-center h-full text-slate-500 dark:text-zinc-400 text-sm gap-2">
      <Loader className="animate-spin w-4 h-4 shrink-0" strokeWidth={2.5} />
      Signing in…
    </div>
  );
}
