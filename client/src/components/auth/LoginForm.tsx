import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email address";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      await login(email, password);
      navigate("/problems");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Login failed";
      setErrors({ form: msg });
    } finally {
      setLoading(false);
    }
  }

  const apiBase = import.meta.env.VITE_API_URL as string;
  const oauthError = new URLSearchParams(window.location.search).get("error");

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Log in</h2>

      <div className="flex gap-2">
        <a
          href={`${apiBase}/auth/github`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-600 bg-slate-50 dark:bg-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-600 text-slate-900 dark:text-slate-100 text-sm font-semibold transition-colors"
        >
          <FaGithub size={17} />
          GitHub
        </a>
        <a
          href={`${apiBase}/auth/google`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-600 bg-slate-50 dark:bg-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-600 text-slate-900 dark:text-slate-100 text-sm font-semibold transition-colors"
        >
          <FcGoogle size={17} />
          Google
        </a>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200 dark:bg-zinc-700" />
        <span className="text-xs text-slate-400 dark:text-zinc-500">or</span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-zinc-700" />
      </div>

      <Field
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        autoComplete="email"
      />
      <Field
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        autoComplete="current-password"
        showToggle
      />

      {(errors.form || oauthError) && (
        <p className="text-red-500 dark:text-red-400 text-sm">
          {oauthError === "github_no_email"
            ? "GitHub account has no public email. Please set a primary email in GitHub settings."
            : oauthError === "google_no_email"
              ? "Google account returned no email. Please try again."
              : oauthError === "google_failed"
                ? "Google sign-in failed. Please try again."
                : oauthError
                  ? "Sign-in failed. Please try again."
                  : errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 disabled:opacity-50 text-white py-2.5 rounded-lg font-semibold shadow-md transition-all"
      >
        {loading ? "Logging in…" : "Log in"}
      </button>

      <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
        No account?{" "}
        <Link
          to="/register"
          className="text-rose-600 dark:text-rose-400 hover:underline font-semibold"
        >
          Register
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  error,
  autoComplete,
  showToggle,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
  showToggle?: boolean;
}) {
  const [show, setShow] = useState(false);
  const inputType = showToggle && type === "password" ? (show ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className={`w-full bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white border rounded-lg px-3 py-2 text-sm outline-none transition-colors focus:border-rose-500 dark:focus:border-rose-400 ${
            showToggle ? "pr-10" : ""
          } ${error ? "border-red-400 dark:border-red-500" : "border-slate-300 dark:border-zinc-600"}`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            tabIndex={-1}
          >
            {show ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 dark:text-red-400 text-xs">{error}</p>}
    </div>
  );
}
