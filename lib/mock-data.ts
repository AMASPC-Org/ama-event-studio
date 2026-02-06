// ama-event-studio/lib/mock-data.ts
import { EventRecord } from './types';

export const MOCK_EVENTS: EventRecord[] = [
    {
        objectID: 'mock-1',
        event_name: 'Summer Jazz Festival',
        event_date_label: 'Aug 15 @ 7:00 PM',
        venue_name: 'Olympia Port Plaza',
        event_type: 'Live Music',
        image_url: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800&q=80',
        audience_segment: ['Couples', 'Creatives'],
        persona: ['The Audiophile'],
        source: 'mock',
        is_approved: true
    },
    {
        objectID: 'mock-2',
        event_name: 'Sounders vs Timbers Watch Party',
        event_date_label: 'Sep 02 @ 1:00 PM',
        venue_name: 'Nicole\'s Bar',
        event_type: 'Sports',
        image_url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=80',
        audience_segment: ['Locals'],
        persona: ['The Socialite'],
        source: 'mock',
        is_approved: true
    },
    {
        objectID: 'mock-3',
        event_name: 'Tech Meetup: AI in Olympia',
        event_date_label: 'Oct 10 @ 6:00 PM',
        venue_name: 'OlyTaproom',
        event_type: 'Other',
        image_url: 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?w=800&q=80',
        audience_segment: ['Tech Enthusiasts'],
        persona: ['The Networker'],
        source: 'mock',
        is_approved: true
    },
    {
        objectID: 'mock-4',
        event_name: 'Comedy Night at The Crypt',
        event_date_label: 'Nov 05 @ 8:00 PM',
        venue_name: 'The Crypt',
        event_type: 'Comedy',
        image_url: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80',
        audience_segment: ['Young Professionals'],
        persona: ['The Night Owl'],
        source: 'mock',
        is_approved: true
    },
    {
        objectID: 'mock-5',
        event_name: 'Farm to Table Dinner',
        event_date_label: 'Sep 20 @ 5:30 PM',
        venue_name: 'Gardner\'s Restaurant',
        event_type: 'Dining',
        image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        audience_segment: ['Young Professionals', 'Couples'],
        persona: ['The Foodie'],
        source: 'mock',
        is_approved: true
    }
];
