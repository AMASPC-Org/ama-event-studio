import { algoliasearch } from 'algoliasearch';
import type { SearchClient } from 'algoliasearch';
import { MOCK_EVENTS } from './mock-data';

const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '';

const hasKeys = !!(APP_ID && SEARCH_KEY);

// Mock Client implementation for "Demo Mode"
const mockSearchClient = {
    appId: 'mock',
    transporter: {} as unknown, // Mock transporter
    addAlgoliaAgent: () => { },
    clearCache: () => Promise.resolve(),
    search: async (requests: { params?: { query?: string } }[]) => {
        return {
            results: requests.map((req) => {
                const facets: Record<string, Record<string, number>> = {};

                // Simple mock facet calculation
                const facetAttributes = ['event_date_label', 'venue_name', 'audience_segment', 'persona'];
                facetAttributes.forEach(attr => {
                    facets[attr] = {};
                    MOCK_EVENTS.forEach((event) => {
                        const eventRecord = event as Record<string, string | string[]>;
                        const values = Array.isArray(eventRecord[attr]) ? eventRecord[attr] as string[] : [eventRecord[attr] as string];
                        values.forEach((val: string) => {
                            if (val) facets[attr][val] = (facets[attr][val] || 0) + 1;
                        });
                    });
                });

                return {
                    hits: MOCK_EVENTS,
                    nbHits: MOCK_EVENTS.length,
                    page: 0,
                    nbPages: 1,
                    hitsPerPage: 20,
                    processingTimeMS: 5,
                    exhaustiveNbHits: true,
                    query: req.params?.query || '',
                    params: '',
                    index: 'mock_EVENTS',
                    facets
                };
            })
        };
    },
    searchForFacetValues: async () => {
        return { facetHits: [] };
    },
    initIndex: () => ({} as unknown)
} as unknown as SearchClient;

// Use real client if keys found, otherwise use mock
export const searchClient = hasKeys ? algoliasearch(APP_ID, SEARCH_KEY) : mockSearchClient;
export const INDEX_NAME = hasKeys ? 'prod_EVENTS' : 'mock_EVENTS';
export const IS_MOCK_MODE = !hasKeys;
