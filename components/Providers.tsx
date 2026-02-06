// ama-event-studio/components/Providers.tsx
'use client';

import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { searchClient, INDEX_NAME } from '@/lib/algolia';

export function Providers({ children }: { children: React.ReactNode }) {
    if (!searchClient) return <>{children}</>;
    return (
        <InstantSearchNext indexName={INDEX_NAME} searchClient={searchClient} future={{ preserveSharedStateOnUnmount: true }}>
            {children}
        </InstantSearchNext>
    );
}

