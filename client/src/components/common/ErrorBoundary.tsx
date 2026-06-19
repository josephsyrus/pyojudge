import React from "react";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-400 gap-4 p-8">
          <p className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
            Something went wrong
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            An unexpected error occurred on this page.
          </p>
          <button
            className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-lg text-sm font-semibold shadow-md transition-all"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
