import React, { useRef, useState, useCallback, useEffect } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface SplitPanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
  initialSplit?: number; // 0–100, percentage for left panel
  leftLabel?: string;
  rightLabel?: string;
}

export function SplitPanel({
  left,
  right,
  initialSplit = 45,
  leftLabel = "Problem",
  rightLabel = "Code",
}: SplitPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(initialSplit);
  const dragging = useRef(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [tab, setTab] = useState<"left" | "right">("left");

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

  // Mobile: drop the side-by-side split for a tab switcher. Both panels stay
  // mounted (the inactive one is CSS-hidden) so the code editor keeps its state
  // when toggling between Problem and Code.
  if (!isDesktop) {
    return (
      <div className="flex h-full w-full flex-col overflow-hidden">
        <div className="flex shrink-0 border-b border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <TabButton label={leftLabel} active={tab === "left"} onClick={() => setTab("left")} />
          <TabButton label={rightLabel} active={tab === "right"} onClick={() => setTab("right")} />
        </div>
        <div className="flex-1 min-h-0">
          <div className={tab === "left" ? "h-full" : "hidden"}>{left}</div>
          <div className={tab === "right" ? "h-full" : "hidden"}>{right}</div>
        </div>
      </div>
    );
  }

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

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
        active
          ? "border-rose-500 text-rose-500 dark:text-rose-400"
          : "border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200"
      }`}
    >
      {label}
    </button>
  );
}
