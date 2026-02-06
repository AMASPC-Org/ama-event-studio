// ama-event-studio/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, doc, getDoc, Firestore } from "firebase/firestore";
import { EventRecord } from "./types";

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
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { objectID: docSnap.id, ...docSnap.data() } as EventRecord;
        }
        return null;
    } catch (error) {
        console.error("Error fetching event:", error);
        return null;
    }
}
