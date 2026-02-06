import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, Calendar, MapPin, Tag, Users, ShieldCheck } from 'lucide-react';
import { getEventById } from '@/lib/firebase';
import { IS_MOCK_MODE } from '@/lib/algolia';
import { MOCK_EVENTS } from '@/lib/mock-data';
import NextImage from 'next/image';
import { TYPE_COLORS } from '@/lib/constants';
import { EventRecord } from '@/lib/types';

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let event: EventRecord | null | undefined = null;

    if (IS_MOCK_MODE) {
        event = MOCK_EVENTS.find(e => e.objectID === id);
    } else {
        event = await getEventById(id);
    }

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Event Not Found</h2>
                    <Link href="/" className="text-blue-600 hover:underline">Return to Mission Control</Link>
                </div>
            </div>
        );
    }

    const typeStyle = event.event_type && TYPE_COLORS[event.event_type]
        ? TYPE_COLORS[event.event_type]
        : 'bg-slate-100 text-slate-800';

    return (
        <div className="min-h-screen bg-slate-50 p-8 pb-20">
            <div className="max-w-5xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-8 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Mission Control
                </Link>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                    {/* Hero Section */}
                    <div className="relative h-96 bg-slate-900">
                        {event.image_url ? (
                            <NextImage
                                src={event.image_url}
                                alt={event.event_name}
                                fill
                                sizes="(max-width: 1280px) 100vw, 1280px"
                                className="object-cover opacity-80"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-700 italic">
                                No Preview Image
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="flex items-center gap-2 mb-4">
                                <span className={`px-3 py-1 text-xs font-bold rounded shadow-sm uppercase tracking-tighter ${typeStyle}`}>
                                    {event.event_type || 'Event'}
                                </span>
                                {event.is_approved && (
                                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded shadow-sm flex items-center gap-1 uppercase tracking-tighter">
                                        <ShieldCheck size={12} /> Approved
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2">
                                {event.event_name}
                            </h1>
                            <p className="text-slate-300 flex items-center gap-2 text-lg">
                                <MapPin size={20} className="text-blue-400" />
                                {event.venue_name}
                            </p>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="px-8 py-4 bg-slate-50 border-b flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-slate-400" />
                                {event.event_date_label}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-sm min-h-[44px]">
                                <Edit size={16} /> Edit Details
                            </button>
                            <button className="px-4 py-3 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md shadow-red-200 min-h-[44px]">
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    About Event
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                                    {event.description || "The mission continues. This event has been successfully identified and validated for the AMA Ecosystem. No additional description provided by intelligence yet."}
                                </p>
                            </div>

                            {/* Status Section */}
                            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                                <h4 className="font-bold text-blue-900 mb-2 uppercase tracking-widest text-xs">Sync Integrity</h4>
                                <div className="flex items-center gap-4 text-sm text-blue-800">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        Live in Firestore
                                    </div>
                                    <div className="flex items-center gap-1.5 font-bold">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        Synced to Algolia
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Tags */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Users size={14} /> Audience Segments
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {(event.audience_segment?.length || 0) > 0 ? (
                                        event.audience_segment!.map((seg: string) => (
                                            <span key={seg} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200">
                                                {seg}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-slate-400 italic text-xs underline decoration-dotted decoration-slate-300">Unspecified Audience</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Tag size={14} /> Personas
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {(event.persona?.length || 0) > 0 ? (
                                        event.persona!.map((p: string) => (
                                            <span key={p} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-extrabold rounded-full border border-blue-100">
                                                {p}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-slate-400 italic text-xs underline decoration-dotted decoration-slate-300">Generic Profile</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
