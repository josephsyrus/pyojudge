import React, { useRef, useState, useCallback, useEffect } from "react";

interface SplitPanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
  initialSplit?: number; // 0–100, percentage for left panel
}

export function SplitPanel({ left, right, initialSplit = 45 }: SplitPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(initialSplit);
  const dragging = useRef(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
  }, []);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = (x / rect.width) * 100;
      setSplit(Math.min(80, Math.max(20, pct)));
    }
    function onMouseUp() {
      dragging.current = false;
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex h-full w-full overflow-hidden">
      <div style={{ width: `${split}%` }} className="overflow-y-auto h-full">
        {left}
      </div>

      {/* Divider */}
      <div
        onMouseDown={onMouseDown}
        className="w-1.5 bg-slate-200 dark:bg-zinc-700 hover:bg-rose-400 dark:hover:bg-rose-500 cursor-col-resize shrink-0 transition-colors duration-150"
      />

      <div style={{ width: `${100 - split}%` }} className="flex flex-col h-full overflow-hidden">
        {right}
      </div>
    </div>
  );
}
