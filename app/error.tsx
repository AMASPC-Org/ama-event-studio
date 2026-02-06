'use client'; // Error components must be Client Components

import * as Sentry from '@sentry/nextjs';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Report the error to Sentry
        Sentry.captureException(error);
    }, [error]);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-red-50 rounded-full">
                        <AlertTriangle size={48} className="text-red-500" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">System Failure</h2>
                <p className="text-slate-500 mb-8">
                    We encountered an unexpected error processing your request.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => reset()}
                        className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium flex items-center gap-2 min-h-[44px]"
                    >
                        <RefreshCw size={16} />
                        Re-initialize
                    </button>
                </div>
            </div>
        </div>
    );
}
