/// <reference lib="webworker" />

import type { WorkerInMessage, WorkerOutMessage, TestCase, TestResult } from "../types/index";
import { normalizeOutput, outputsMatch, stripPyodidePaths } from "../utils/normalize";

interface PyodideInterface {
  runPythonAsync(code: string): Promise<unknown>;
  globals: { get(key: string): unknown };
}

interface PyodideModule {
  loadPyodide(options: { indexURL: string }): Promise<PyodideInterface>;
}

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/";

let pyodide: PyodideInterface | null = null;

async function init(): Promise<void> {
  // dynamic import works in ES module workers. importScripts does not
  const { loadPyodide } = (await import(`${PYODIDE_CDN}pyodide.mjs`)) as PyodideModule;
  pyodide = await loadPyodide({ indexURL: PYODIDE_CDN });

  // disable input() by replacing it with a RuntimeError
  await pyodide.runPythonAsync(`
import builtins
def _blocked_input(prompt=''):
    raise RuntimeError("input() is not supported. Design your solution as a function with parameters.")
builtins.input = _blocked_input
`);
}

async function runTestCases(code: string, testCases: TestCase[]): Promise<TestResult[]> {
  if (!pyodide) throw new Error("Pyodide not initialized");

  const results: TestResult[] = [];

  for (const tc of testCases) {
    const start = performance.now();
    try {
      // execute user code to define solution(), then call it
      const runCode = `
${code}

import json, builtins

_args = (${tc.input},)
_result = solution(*_args)

# Serialize result the same way expected outputs are stored
def _serialize(v):
    if isinstance(v, bool):
        return str(v)
    if isinstance(v, str):
        return f'"{v}"'
    if isinstance(v, list):
        return json.dumps(v)
    return str(v)

_serialize(_result)
`;
      const raw = await pyodide.runPythonAsync(runCode);
      const elapsed = performance.now() - start;
      const actual = normalizeOutput(String(raw));
      // hidden tests have no expectedOutput. server will verify via string comparison
      const passed = tc.expectedOutput != null ? outputsMatch(tc.expectedOutput, actual) : false;

      results.push({
        passed,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: actual,
        executionTime: Math.round(elapsed),
      });
    } catch (err: unknown) {
      const elapsed = performance.now() - start;
      const msg = err instanceof Error ? err.message : String(err);
      results.push({
        passed: false,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: "",
        executionTime: Math.round(elapsed),
        errorMessage: stripPyodidePaths(msg),
      });
    }
  }

  return results;
}

self.onmessage = async (event: MessageEvent<WorkerInMessage>) => {
  const msg = event.data;

  if (msg.type === "RUN") {
    try {
      const results = await runTestCases(msg.code, msg.testCases);
      const response: WorkerOutMessage = { type: "RESULT", results };
      self.postMessage(response);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      const response: WorkerOutMessage = { type: "STATUS", status: "error", error: errMsg };
      self.postMessage(response);
    }
  }
};

// initialize on worker start
init()
  .then(() => {
    const msg: WorkerOutMessage = { type: "STATUS", status: "ready" };
    self.postMessage(msg);
  })
  .catch((err: unknown) => {
    const errMsg = err instanceof Error ? err.message : String(err);
    const msg: WorkerOutMessage = { type: "STATUS", status: "error", error: errMsg };
    self.postMessage(msg);
  });
