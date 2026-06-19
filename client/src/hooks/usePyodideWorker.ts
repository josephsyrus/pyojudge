import { useRef, useState, useCallback, useEffect } from "react";
import type { TestCase, TestResult, RuntimeStatus, WorkerOutMessage } from "../types";

const EXECUTION_TIMEOUT_MS = 5000;

export interface PyodideWorkerState {
  status: RuntimeStatus;
  errorMessage: string | null;
}

export interface RunResult {
  results: TestResult[];
  timedOut: boolean;
}

export function usePyodideWorker() {
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingResolveRef = useRef<((result: RunResult) => void) | null>(null);

  const [workerState, setWorkerState] = useState<PyodideWorkerState>({
    status: "loading",
    errorMessage: null,
  });

  const spawnWorker = useCallback(() => {
    setWorkerState({ status: "loading", errorMessage: null });

    const worker = new Worker(new URL("../workers/pyodide.worker.ts", import.meta.url), {
      type: "module",
    });

    worker.onmessage = (event: MessageEvent<WorkerOutMessage>) => {
      const msg = event.data;

      if (msg.type === "STATUS") {
        if (msg.status === "ready") {
          setWorkerState({ status: "ready", errorMessage: null });
        } else {
          setWorkerState({ status: "error", errorMessage: msg.error ?? "Runtime failed to load" });
        }
      }

      if (msg.type === "RESULT") {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        const resolve = pendingResolveRef.current;
        pendingResolveRef.current = null;
        resolve?.({ results: msg.results, timedOut: false });
      }
    };

    worker.onerror = () => {
      setWorkerState({ status: "error", errorMessage: "Worker encountered an unexpected error" });
    };

    workerRef.current = worker;
  }, []);

  useEffect(() => {
    spawnWorker();
    return () => {
      workerRef.current?.terminate();
    };
  }, [spawnWorker]);

  const run = useCallback(
    (code: string, testCases: TestCase[]): Promise<RunResult> => {
      return new Promise((resolve) => {
        const worker = workerRef.current;
        if (!worker || workerState.status !== "ready") {
          resolve({ results: [], timedOut: false });
          return;
        }

        pendingResolveRef.current = resolve;

        timeoutRef.current = setTimeout(() => {
          // TLE: terminate worker and spawn a fresh one
          worker.terminate();
          workerRef.current = null;
          pendingResolveRef.current = null;

          const tleResults: TestResult[] = testCases.map((tc) => ({
            passed: false,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            actualOutput: "",
            executionTime: EXECUTION_TIMEOUT_MS,
            errorMessage: "Time Limit Exceeded",
          }));

          resolve({ results: tleResults, timedOut: true });

          // Reinitialize in background
          setWorkerState({ status: "reinitializing", errorMessage: null });
          spawnWorker();
        }, EXECUTION_TIMEOUT_MS);

        worker.postMessage({ type: "RUN", code, testCases });
      });
    },
    [workerState.status, spawnWorker],
  );

  const reload = useCallback(() => {
    workerRef.current?.terminate();
    spawnWorker();
  }, [spawnWorker]);

  return { workerState, run, reload };
}
