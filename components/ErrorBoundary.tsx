"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { logger } from "@/lib/logger";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error({ error, errorInfo }, "Uncaught error in Mission Control");
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center">
          <div className="max-w-md space-y-4">
            <h1 className="text-4xl font-bold text-slate-900 leading-tight">
              Mission Control Stalled
            </h1>
            <p className="text-lg text-slate-600">
              An unexpected protocol error occurred. Redirecting to recovery might resolve the issue.
            </p>
            <div className="pt-6">
              <button
                onClick={() => window.location.assign("/")}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition hover:bg-blue-700 active:scale-95 touch-manipulation min-w-[44px] min-h-[44px]"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
