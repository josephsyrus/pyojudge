import { useEffect } from "react";

export function useKeyboardShortcut(
  key: string,
  handler: () => void,
  options: { ctrlOrMeta?: boolean } = {},
): void {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const mod = options.ctrlOrMeta ? e.ctrlKey || e.metaKey : true;
      if (mod && e.key === key) {
        e.preventDefault();
        handler();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, handler, options.ctrlOrMeta]);
}
