'use client';

import React, { useState, Fragment } from 'react';
import { SearchBox, useClearRefinements } from 'react-instantsearch';
import FilterDropdown from './FilterDropdown';
import { Dialog, Transition } from '@headlessui/react';
import { SlidersHorizontal, Search, X } from 'lucide-react';


export function TopSearch() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { canRefine, refine: clearFilters } = useClearRefinements();

  // Filter configuration
  const filters = [
    { attribute: 'event_date_label', label: 'Date' },
    { attribute: 'venue_name', label: 'Venue' },
    { attribute: 'audience_segment', label: 'Audience' },
    { attribute: 'persona', label: 'Persona' },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        
        {/* Search Bar Area */}
        <div className="relative flex-1 max-w-2xl group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <SearchBox 
                classNames={{
                    root: 'w-full',
                    form: 'relative w-full',
                    input: 'block w-full rounded-xl border-0 py-2.5 pl-10 pr-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-slate-50 focus:bg-white transition-all duration-200 outline-none',
                    submit: 'hidden',
                    reset: 'hidden',
                    loadingIndicator: 'hidden'
                }}
                placeholder="Search events, venues, or personas..."
            />
        </div>

        {/* Desktop Filter Row */}
        <div className="hidden md:flex items-center gap-3">
            {filters.map(f => (
                <FilterDropdown key={f.attribute} attribute={f.attribute} label={f.label} viewMode="desktop" />
            ))}
        </div>

        {/* Desktop Clear All */}
        {canRefine && (
            <div className="hidden md:block ml-2 border-l border-slate-200 pl-4">
                <button
                    onClick={() => clearFilters()}
                    className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-wider"
                >
                    Clear All
                </button>
            </div>
        )}

        {/* Mobile Toggle */}
        <div className="md:hidden flex justify-between items-center w-full">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Filters</span>
            <button 
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-x-1.5 rounded-lg px-3 py-2 text-sm font-semibold bg-white text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-all"
            >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filter
            </button>
        </div>
      </div>
      
      {/* Mobile Filters Drawer (Dialog) */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-2xl">
                <div className="flex items-center justify-between px-4 pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Mobile Clear All */}
                {canRefine && (
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex justify-end">
                        <button
                            onClick={() => clearFilters()}
                            className="text-xs font-semibold text-slate-500 hover:text-blue-600 uppercase tracking-widest"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Mobile Filter List */}
                <div className="mt-4 px-4 flex flex-col gap-1">
                  {filters.map((f) => (
                    <FilterDropdown 
                        key={f.attribute} 
                        attribute={f.attribute} 
                        label={f.label} 
                        viewMode="mobile"
                    />
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
