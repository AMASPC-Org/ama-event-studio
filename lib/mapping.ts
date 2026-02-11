import { EventRecord, ScraperDraft } from './types';

/**
 * Normalizes a raw ScraperDraft (PascalCase from ingestion) into a Studio EventRecord.
 * Also ensures consistent fingerprinting.
 */
export function mapDraftToRecord(id: string, data: any): EventRecord {
  // Handle PascalCase fields from Scraper
  const title = data.Title || data.event_name || 'Untitled Event';
  const date = data.Event_Date || '';
  const time = data.Event_Time || '';
  const venue = data.Venue_Name || data.venue_name || 'Venue TBD';

  // Create a user-readable date label
  const event_date_label = date ? `${date} ${time}`.trim() : (data.event_date_label || 'Date TBD');

  // Re-calculate fingerprint to ensure consistency (Title|Date|Venue)
  const fingerprint = data.Fingerprint || `${title}|${date}|${venue}`.replace(/\s+/g, '_').toLowerCase();

  return {
    objectID: id,
    event_name: title,
    event_date_label: event_date_label,
    venue_name: venue,
    event_type: data.Event_Type || data.event_type || 'Other',
    image_url: data.Original_Image_Url || data.image_url || '',
    description: data.Description || data.description || '',
    audience_segment: data.audience_segment || [],
    persona: data.persona || [],
    source: data.Source_Url || data.source || '',
    is_approved: data.Review_Status === 'approved' || !!data.is_approved,
    reviewStatus: data.Review_Status || 'pending',
    fingerprint: fingerprint,
    publishedAt: data.publishedAt || null,
    publishedBy: data.publishedBy || null
  };
}
