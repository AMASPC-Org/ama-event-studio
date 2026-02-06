// ama-event-studio/components/EventCardSkeleton.tsx
import { MapPin, Calendar } from 'lucide-react';

export function EventCardSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full border-b-4 border-b-slate-100 animate-pulse">
            <div className="aspect-video bg-slate-200 relative overflow-hidden" />

            <div className="p-4 flex-1 flex flex-col">
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-5 bg-slate-200 rounded w-1/2 mb-4" />
                
                <div className="text-xs text-slate-300 flex items-center gap-1.5 mb-3">
                    <Calendar size={12} className="shrink-0" />
                    <div className="h-3 bg-slate-100 rounded w-24" />
                </div>

                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[10px] font-medium text-slate-300 uppercase tracking-widest flex items-center gap-1">
                        <MapPin size={10} />
                        <div className="h-2 bg-slate-100 rounded w-16" />
                    </div>
                    <div className="h-11 w-12 bg-slate-100 rounded ml-4" />
                </div>
            </div>
        </div>
    );
}
