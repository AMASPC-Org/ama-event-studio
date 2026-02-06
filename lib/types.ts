// ama-event-studio/lib/types.ts
import { BaseHit } from 'instantsearch.js';

export interface EventRecord extends BaseHit {
    objectID: string;
    event_name: string;
    event_date_label?: string;
    venue_name?: string;
    event_type?: string;
    image_url?: string;
    description?: string;
    audience_segment?: string[];
    persona?: string[];
    source?: string;
    is_approved?: boolean;
}
