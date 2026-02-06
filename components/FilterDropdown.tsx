'use client';

import React, { Fragment } from 'react';
import { useRefinementList } from 'react-instantsearch';
import { Menu, MenuButton, MenuItems, MenuItem, Transition, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';

interface FilterDropdownProps {
  attribute: string;
  label: string;
  viewMode?: 'desktop' | 'mobile'; // 'desktop' = Menu (Dropdown), 'mobile' = Disclosure (Accordion)
}

export default function FilterDropdown({ attribute, label, viewMode = 'desktop' }: FilterDropdownProps) {
  const { items, refine, canRefine } = useRefinementList({ attribute });

  const activeCount = items.filter((i) => i.isRefined).length;
  const isDisabled = !canRefine && items.length === 0;

  // Render Mobile Version (Accordion/Disclosure)
  if (viewMode === 'mobile') {
    return (
      <Disclosure as="div" className="border-b border-slate-100 last:border-0">
        {({ open }) => (
          <>
            <DisclosureButton 
              disabled={isDisabled}
              className={clsx(
                "flex w-full items-center justify-between py-3 text-left text-sm font-medium transition-colors",
                isDisabled ? "text-slate-300 cursor-not-allowed" : "text-slate-900 hover:text-blue-600"
              )}
            >
              <div className="flex items-center gap-2">
                {label}
                {activeCount > 0 && (
                  <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800">
                    {activeCount}
                  </span>
                )}
              </div>
              <ChevronDown
                className={clsx("h-5 w-5 text-slate-400 transition-transform duration-200", open && "rotate-180")}
              />
            </DisclosureButton>
            <DisclosurePanel className="pb-4 pt-1 text-sm text-slate-500">
              <ul className="space-y-3">
                 {items.length === 0 ? (
                    <li className="text-slate-400 italic text-xs px-2">No options available</li>
                 ) : (
                    items.map(item => (
                        <li key={item.value}>
                            <button
                                onClick={() => refine(item.value)}
                                className="flex items-center w-full group"
                            >
                                <div className={clsx(
                                    "flex h-5 w-5 items-center justify-center rounded border transition-colors mr-3",
                                    item.isRefined ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white group-hover:border-blue-400"
                                )}>
                                    {item.isRefined && <Check className="h-3.5 w-3.5 text-white" />}
                                </div>
                                <span className={clsx(
                                    "flex-1 text-left",
                                    item.isRefined ? "text-slate-900 font-medium" : "text-slate-600 group-hover:text-slate-900"
                                )}>
                                    {item.label}
                                </span>
                                <span className="text-xs text-slate-400 tabular-nums ml-2 bg-slate-50 px-1.5 py-0.5 rounded">
                                    {item.count}
                                </span>
                            </button>
                        </li>
                    ))
                 )}
              </ul>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    );
  }

  // Render Desktop Version (Popover Menu)
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        disabled={isDisabled}
        className={clsx(
          "group inline-flex items-center justify-between gap-x-1.5 rounded-lg px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset transition-all duration-200",
          activeCount > 0
            ? "bg-blue-50 text-blue-700 ring-blue-200 hover:bg-blue-100"
            : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
          isDisabled && "opacity-50 cursor-not-allowed bg-slate-50"
        )}
      >
        <span className="flex items-center gap-2">
          {label}
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white shadow-sm">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown 
            className={clsx(
                "h-4 w-4 transition-colors", 
                activeCount > 0 ? "text-blue-500" : "text-slate-400 group-hover:text-slate-500"
            )} 
            aria-hidden="true" 
        />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none">
          <div className="p-1 max-h-[300px] overflow-y-auto custom-scrollbar">
            {items.length === 0 ? (
              <div className="px-4 py-3 text-sm text-slate-500 italic text-center">
                No results found
              </div>
            ) : (
              items.map((item) => (
                <MenuItem key={item.value}>
                  {({ focus }) => (
                    <button
                      onClick={() => refine(item.value)}
                      className={clsx(
                        focus ? 'bg-slate-50' : '',
                        'group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors'
                      )}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={clsx(
                          "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-colors",
                          item.isRefined ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white group-hover:border-blue-400"
                        )}>
                          {item.isRefined && <Check className="h-3.5 w-3.5 text-white" />}
                        </div>
                        <span className={clsx("truncate", item.isRefined ? "font-semibold text-slate-900" : "text-slate-700")}>
                          {item.label}
                        </span>
                      </div>
                      <span className="ml-2 text-xs text-slate-400 tabular-nums">
                        {item.count}
                      </span>
                    </button>
                  )}
                </MenuItem>
              ))
            )}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
