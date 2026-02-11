'use client';

import { useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { promoteEventAction } from '@/app/actions/promote';
import { useRouter } from 'next/navigation';

export default function ApproveButton({ draftId }: { draftId: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const router = useRouter();

  async function handleApprove() {
    setLoading(true);
    setResult(null);
    const res = await promoteEventAction(draftId);
    setResult(res);
    setLoading(false);
    if (res.success) {
      // Redirect to home after a brief success message
      setTimeout(() => router.push('/'), 1500);
    }
  }

  if (result?.success) {
    return (
      <div className="px-4 py-3 bg-green-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-md">
        <ShieldCheck size={16} /> {result.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleApprove}
        disabled={loading}
        className="px-4 py-3 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md shadow-green-200 min-h-[44px] disabled:opacity-50"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
        {loading ? 'Promoting...' : 'Approve & Publish'}
      </button>
      {result && !result.success && (
        <p className="text-xs text-red-600 font-medium">{result.message}</p>
      )}
    </div>
  );
}
