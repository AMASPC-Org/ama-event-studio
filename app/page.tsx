// ama-event-studio/app/page.tsx
'use client';

import { useHits, Pagination, useInstantSearch } from 'react-instantsearch';
import { SearchX } from 'lucide-react';
import { EventCard } from '@/components/EventCard';
import { EventCardSkeleton } from '@/components/EventCardSkeleton';
import { TopSearch } from '@/components/TopSearch';
import { EventRecord } from '@/lib/types';
import { IS_MOCK_MODE } from '@/lib/algolia';

function EventHits() {
  const { hits } = useHits<EventRecord>();
  const { status } = useInstantSearch();

  const isLoading = status === 'loading' || status === 'stalled';

  if (isLoading && hits.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (hits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-200">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center shadow-sm mb-6">
          <SearchX className="text-slate-400" size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">No Events Found</h3>
        <p className="text-slate-500 text-sm max-w-sm text-center leading-relaxed">
          The mission protocol couldn&apos;t identify any records matching these parameters. Try clearing your filters or broadening your search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {hits.map((hit) => (
        <div key={hit.objectID} className="group">
          <EventCard hit={hit} />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-6">
          
          {/* Brand / Logo Area */}
          <div className="shrink-0 flex items-center gap-3 pr-6 border-r border-slate-100">
             <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="text-white font-black text-xl tracking-tighter">AE</span>
             </div>
             <div className="hidden md:block">
                <h1 className="text-sm font-bold text-slate-900 leading-none">AMA Studio</h1>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-0.5">Mission Control</p>
             </div>
          </div>

          {/* Search & Filters */}
          <div className="flex-1 min-w-0">
             <TopSearch />
          </div>

          {/* Status Badge */}
          <div className="hidden xl:flex items-center gap-4 pl-6 border-l border-slate-100">
            <div className={`px-3 py-1.5 text-xs font-bold rounded-full border uppercase tracking-wider shadow-sm transition-colors ${IS_MOCK_MODE
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-100'
              }`}>
              {IS_MOCK_MODE ? '⚠️ Mock Data' : '● Connected'}
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Approved Events</h2>
            <p className="text-slate-500 text-sm font-medium mt-1">Monitoring active signals across the ecosystem.</p>
          </div>
          
          <Pagination
            classNames={{
              root: 'flex gap-1',
              list: 'flex gap-1',
              item: 'h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-blue-400 transition-all shadow-sm',
              selectedItem: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200',
              disabledItem: 'opacity-50 cursor-not-allowed hover:bg-white hover:border-slate-200'
            }}
          />
        </div>

        <EventHits />
      </div>
    </main>
  );
}
