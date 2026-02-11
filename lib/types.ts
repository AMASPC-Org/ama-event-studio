// ama-event-studio/lib/types.ts
import { BaseHit } from 'instantsearch.js';

export interface EventRecord extends BaseHit {
    objectID: string;
    event_name: string;
    event_date_label: string;
    venue_name: string;
    event_type: string;
    image_url: string;
    description: string;
    audience_segment: string[];
    persona: string[];
    source: string;
    is_approved: boolean;
    reviewStatus: 'pending' | 'approved' | 'rejected';
    fingerprint?: string;
    publishedAt?: any;
    publishedBy?: string;
}

export interface ScraperDraft {
    id: string;
    Title: string;
    Description?: string;
    Venue_Name?: string;
    Venue_Address?: string;
    Event_Date?: string;
    Event_Time?: string;
    Original_Image_Url?: string;
    Source_Url?: string;
    Review_Status?: 'pending' | 'approved' | 'rejected';
    Fingerprint?: string;
    Source?: string;
    Tags?: string[];
}
