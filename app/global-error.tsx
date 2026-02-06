"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Critical System Error</h2>
          <p className="text-slate-500 mb-8">
            The mission control has encountered a fatal exception. Our protocols were unable to recover automatically.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium min-h-[44px]"
          >
            Re-initialize System
          </button>
        </div>
      </body>
    </html>
  );
}
