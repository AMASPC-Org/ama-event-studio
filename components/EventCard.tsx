// ama-event-studio/components/EventCard.tsx
import Link from 'next/link';
import NextImage from 'next/image';
import { MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { EventRecord } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/constants';
import { twMerge } from 'tailwind-merge';

interface EventCardProps {
    hit: EventRecord;
}

export function EventCard({ hit }: EventCardProps) {
    const typeStyle = hit.event_type && TYPE_COLORS[hit.event_type]
        ? TYPE_COLORS[hit.event_type]
        : 'bg-slate-100 text-slate-800';

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 overflow-hidden flex flex-col h-full border-b-4 border-b-slate-100 hover:border-b-blue-400">
            <div className="aspect-video bg-slate-100 relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                {hit.image_url ? (
                    <NextImage
                        src={hit.image_url}
                        alt={hit.event_name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 italic text-xs">No preview image</div>
                )}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    <span className={twMerge("px-2 py-0.5 backdrop-blur text-[10px] font-bold rounded shadow-sm uppercase tracking-tighter", typeStyle)}>
                        {hit.event_type || 'Event'}
                    </span>
                    {hit.reviewStatus === 'pending' && (
                        <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded shadow-sm uppercase tracking-tighter flex items-center gap-0.5">
                            <AlertTriangle size={10} /> Review
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-slate-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {hit.event_name}
                </h3>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-3">
                    <Calendar size={12} className="shrink-0" />
                    {hit.event_date_label || 'Date TBD'}
                </div>

                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[10px] font-medium text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <MapPin size={10} />
                        {hit.venue_name || 'Venue TBD'}
                    </div>
                    <Link
                        href={`/events/${hit.objectID}`}
                        className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider flex items-center gap-1 hover:underline h-11 px-2 -mr-2"
                    >
                        Manage →
                    </Link>
                </div>
            </div>
        </div>
    );
}
