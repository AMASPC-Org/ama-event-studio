// ama-event-studio/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, doc, getDoc, getDocs, collection, query, where, Firestore } from "firebase/firestore";
import { EventRecord } from "./types";
import { mapDraftToRecord } from "./mapping";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const hasFirebaseConfig = !!firebaseConfig.apiKey;

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (hasFirebaseConfig) {
    try {
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        db = getFirestore(app);
    } catch (error) {
        console.error("Firebase initialization failed:", error);
    }
}

export { db };

export async function getEventById(id: string): Promise<EventRecord | null> {
    if (!db) {
        console.warn("Firestore not initialized. Returning null.");
        return null;
    }
    try {
        // Check published events first
        const pubRef = doc(db, "ama_events", id);
        const pubSnap = await getDoc(pubRef);
        if (pubSnap.exists()) {
            return mapDraftToRecord(pubSnap.id, pubSnap.data());
        }

        // Check staging_drafts
        const draftRef = doc(db, "staging_drafts", id);
        const draftSnap = await getDoc(draftRef);
        if (draftSnap.exists()) {
            return mapDraftToRecord(draftSnap.id, draftSnap.data());
        }

        return null;
    } catch (error) {
        console.error("Error fetching event:", error);
        return null;
    }
}

/**
 * Fetches all pending drafts from the staging_drafts collection.
 */
export async function getDrafts(): Promise<EventRecord[]> {
    if (!db) return [];
    try {
        const q = query(collection(db, "staging_drafts"), where("Review_Status", "==", "pending"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => mapDraftToRecord(doc.id, doc.data()));
    } catch (error) {
        console.error("Error fetching drafts:", error);
        return [];
    }
}
