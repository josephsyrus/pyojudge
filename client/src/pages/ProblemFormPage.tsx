import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import apiClient from "../api/client";
import { useAuth } from "../contexts/AuthContext";
import type { Difficulty } from "../types";

interface FormTestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}
interface FormExample {
  input: string;
  output: string;
  explanation: string;
}

interface FormState {
  title: string;
  slug: string;
  difficulty: Difficulty;
  tags: string;
  description: string;
  constraints: string;
  starterCode: string;
  functionName: string;
  examples: FormExample[];
  testCases: FormTestCase[];
}

const EMPTY: FormState = {
  title: "",
  slug: "",
  difficulty: "Easy",
  tags: "",
  description: "",
  constraints: "",
  starterCode: "def solution():\n    pass",
  functionName: "solution",
  examples: [{ input: "", output: "", explanation: "" }],
  testCases: [{ input: "", expectedOutput: "", isHidden: false }],
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1.5">
        {label}
        {hint && (
          <span className="ml-2 font-normal normal-case text-slate-400 dark:text-zinc-600">
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-slate-50 dark:bg-zinc-700 border border-slate-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-rose-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-zinc-500";
const textareaCls = `${inputCls} font-mono resize-y`;

export function ProblemFormPage() {
  const { slug } = useParams<{ slug?: string }>();
  const isEdit = !!slug;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/problems");
      return;
    }
    if (!isEdit) return;
    apiClient
      .get(`/admin/problems`)
      .then(({ data }) => {
        const p = data.find((x: any) => x.slug === slug);
        if (!p) {
          setError("Problem not found");
          setLoading(false);
          return;
        }
        setForm({
          title: p.title,
          slug: p.slug,
          difficulty: p.difficulty,
          tags: p.tags.join(", "),
          description: p.description,
          constraints: p.constraints.join("\n"),
          starterCode: p.starterCode,
          functionName: p.functionName,
          examples: p.examples.map((e: any) => ({
            input: e.input,
            output: e.output,
            explanation: e.explanation ?? "",
          })),
          testCases: p.testCases.map((tc: any) => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            isHidden: tc.isHidden,
          })),
        });
      })
      .catch(() => setError("Failed to load problem"))
      .finally(() => setLoading(false));
  }, [isEdit, slug, user, navigate]);

  function set(key: keyof FormState, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setExample(i: number, key: keyof FormExample, val: string) {
    setForm((f) => {
      const ex = [...f.examples];
      ex[i] = { ...ex[i], [key]: val };
      return { ...f, examples: ex };
    });
  }

  function setTestCase(i: number, key: keyof FormTestCase, val: any) {
    setForm((f) => {
      const tc = [...f.testCases];
      tc[i] = { ...tc[i], [key]: val };
      return { ...f, testCases: tc };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const body = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      difficulty: form.difficulty,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      description: form.description.trim(),
      constraints: form.constraints
        .split("\n")
        .map((c) => c.trim())
        .filter(Boolean),
      starterCode: form.starterCode,
      functionName: form.functionName.trim(),
      examples: form.examples.filter((e) => e.input || e.output),
      testCases: form.testCases.filter((tc) => tc.input && tc.expectedOutput),
    };
    try {
      if (isEdit) {
        await apiClient.put(`/admin/problems/${slug}`, body);
      } else {
        await apiClient.post("/admin/problems", body);
      }
      navigate("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 dark:text-zinc-400 text-sm">
        Loading…
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/admin")}
          className="text-slate-400 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {isEdit ? "Edit problem" : "New problem"}
        </h1>
      </div>

      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm mb-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Basic info</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Title">
              <input
                required
                value={form.title}
                placeholder="Two Sum"
                onChange={(e) => {
                  set("title", e.target.value);
                  if (!isEdit) set("slug", slugify(e.target.value));
                }}
                className={inputCls}
              />
            </Field>
            <Field label="Slug">
              <input
                required
                value={form.slug}
                placeholder="two-sum"
                onChange={(e) => set("slug", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Difficulty">
            <select
              value={form.difficulty}
              onChange={(e) => set("difficulty", e.target.value as Difficulty)}
              className={inputCls}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </Field>

          <Field label="Tags" hint="comma-separated">
            <input
              value={form.tags}
              placeholder="Array, Hash Map, Two Pointers"
              onChange={(e) => set("tags", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        {/* Description & constraints */}
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            Problem statement
          </h2>
          <Field label="Description" hint="Markdown supported">
            <textarea
              required
              rows={8}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={textareaCls}
            />
          </Field>
          <Field label="Constraints" hint="one per line">
            <textarea
              rows={4}
              value={form.constraints}
              placeholder="1 <= nums.length <= 10^4"
              onChange={(e) => set("constraints", e.target.value)}
              className={textareaCls}
            />
          </Field>
        </div>

        {/* Examples */}
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Examples</h2>
            <button
              type="button"
              onClick={() =>
                set("examples", [...form.examples, { input: "", output: "", explanation: "" }])
              }
              className="text-xs text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-semibold"
            >
              + Add
            </button>
          </div>
          {form.examples.map((ex, i) => (
            <div
              key={i}
              className="border border-slate-200 dark:border-zinc-700 rounded-xl p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 dark:text-zinc-500 font-semibold">
                  Example {i + 1}
                </span>
                {form.examples.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        "examples",
                        form.examples.filter((_, j) => j !== i),
                      )
                    }
                    className="text-xs text-slate-400 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Field label="Input">
                  <textarea
                    rows={2}
                    value={ex.input}
                    onChange={(e) => setExample(i, "input", e.target.value)}
                    className={textareaCls}
                  />
                </Field>
                <Field label="Output">
                  <textarea
                    rows={2}
                    value={ex.output}
                    onChange={(e) => setExample(i, "output", e.target.value)}
                    className={textareaCls}
                  />
                </Field>
              </div>
              <Field label="Explanation" hint="optional">
                <input
                  value={ex.explanation}
                  onChange={(e) => setExample(i, "explanation", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
          ))}
        </div>

        {/* Test cases */}
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Test cases</h2>
            <button
              type="button"
              onClick={() =>
                set("testCases", [
                  ...form.testCases,
                  { input: "", expectedOutput: "", isHidden: false },
                ])
              }
              className="text-xs text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-semibold"
            >
              + Add
            </button>
          </div>
          <p className="text-xs text-slate-400 dark:text-zinc-500">
            Expected output format: plain number,{" "}
            <code className="text-slate-600 dark:text-zinc-400">"string"</code> with double quotes,{" "}
            <code className="text-slate-600 dark:text-zinc-400">[0, 1]</code> for lists,{" "}
            <code className="text-slate-600 dark:text-zinc-400">True</code>/
            <code className="text-slate-600 dark:text-zinc-400">False</code> for booleans.
          </p>
          {form.testCases.map((tc, i) => (
            <div
              key={i}
              className="border border-slate-200 dark:border-zinc-700 rounded-xl p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-semibold">
                    Case {i + 1}
                  </span>
                  <label className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tc.isHidden}
                      onChange={(e) => setTestCase(i, "isHidden", e.target.checked)}
                      className="accent-rose-500"
                    />
                    Hidden
                  </label>
                </div>
                {form.testCases.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        "testCases",
                        form.testCases.filter((_, j) => j !== i),
                      )
                    }
                    className="text-xs text-slate-400 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Field label="Input">
                  <textarea
                    rows={2}
                    value={tc.input}
                    onChange={(e) => setTestCase(i, "input", e.target.value)}
                    className={textareaCls}
                  />
                </Field>
                <Field label="Expected output">
                  <textarea
                    rows={2}
                    value={tc.expectedOutput}
                    onChange={(e) => setTestCase(i, "expectedOutput", e.target.value)}
                    className={textareaCls}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>

        {/* Starter code */}
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Starter code</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Field label="Starter code">
                <textarea
                  required
                  rows={6}
                  value={form.starterCode}
                  onChange={(e) => set("starterCode", e.target.value)}
                  className={textareaCls}
                />
              </Field>
            </div>
            <Field label="Function name">
              <input
                required
                value={form.functionName}
                onChange={(e) => set("functionName", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end pb-4">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="px-4 py-2 text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors shadow"
          >
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create problem"}
          </button>
        </div>
      </form>
    </div>
  );
}
