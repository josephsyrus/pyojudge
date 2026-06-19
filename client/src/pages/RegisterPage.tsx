import { Navigate } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";
import { useAuth } from "../contexts/AuthContext";

export function RegisterPage() {
  const { user, isLoading } = useAuth();
  if (!isLoading && user) return <Navigate to="/problems" replace />;
  return (
    <div className="flex items-center justify-center min-h-full py-16 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-slate-200 dark:border-zinc-700 p-8">
        <RegisterForm />
      </div>
    </div>
  );
}
