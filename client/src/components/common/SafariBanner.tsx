import { useState, useEffect } from "react";
import { X } from "lucide-react";

function isSafari(): boolean {
  const ua = navigator.userAgent;
  return /^((?!chrome|android).)*safari/i.test(ua);
}

export function SafariBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isSafari()) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm px-4 py-2 flex items-center justify-between">
      <span>
        For the best experience, use <strong>Chrome</strong> or <strong>Firefox</strong>. Safari has
        limited support for SharedArrayBuffer, which may affect the Python runtime.
      </span>
      <button
        onClick={() => setShow(false)}
        className="ml-4 text-amber-600 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-100 transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
