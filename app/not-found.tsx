'use client';

import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-slate-100 rounded-full">
                        <FileQuestion size={48} className="text-slate-400" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
                <p className="text-slate-500 mb-8">
                    The transmission you are looking for seems to be lost in deep space.
                </p>
                <Link
                    href="/"
                    className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium inline-block min-h-[44px]"
                >
                    Return to Mission Control
                </Link>
            </div>
        </div>
    );
}
