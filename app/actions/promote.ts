'use server';

import { getAdminDb } from '@/lib/admin';
import { FieldValue } from 'firebase-admin/firestore';

export interface PromoteResult {
  success: boolean;
  message: string;
  eventId?: string;
}

/**
 * Server Action: Promotes a draft from staging_drafts to ama_events.
 * This runs entirely server-side with Admin SDK privileges.
 */
export async function promoteEventAction(draftId: string): Promise<PromoteResult> {
  const db = getAdminDb();

  try {
    // 1. Fetch the draft
    const draftRef = db.collection('staging_drafts').doc(draftId);
    const draftSnap = await draftRef.get();

    if (!draftSnap.exists) {
      return { success: false, message: `Draft "${draftId}" not found.` };
    }

    const draftData = draftSnap.data()!;

    // 2. Generate fingerprint for the production document ID
    const title = draftData.Title || '';
    const date = draftData.Event_Date || '';
    const venue = draftData.Venue_Name || '';
    const fingerprint = draftData.Fingerprint ||
      `${title}|${date}|${venue}`.replace(/\s+/g, '_').toLowerCase();

    // 3. Write to ama_events (production)
    const eventRef = db.collection('ama_events').doc(fingerprint);
    await eventRef.set({
      ...draftData,
      id: fingerprint,
      fingerprint: fingerprint,
      status: 'published',
      Review_Status: 'published',
      publishedAt: FieldValue.serverTimestamp(),
      origin_draft_id: draftId,
    }, { merge: true });

    // 4. Clean up the draft
    await draftRef.delete();

    return {
      success: true,
      message: `Event "${title}" promoted successfully.`,
      eventId: fingerprint,
    };
  } catch (error: any) {
    console.error('[promoteEventAction] Error:', error);
    return {
      success: false,
      message: `Promotion failed: ${error.message}`,
    };
  }
}
