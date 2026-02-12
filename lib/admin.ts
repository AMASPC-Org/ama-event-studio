// ama-event-studio/lib/admin.ts
// Server-side Firebase Admin SDK for Next.js Server Actions
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let adminApp: App;
let adminDb: Firestore;

function getAdminApp(): App {
  if (!adminApp) {
    if (getApps().length === 0) {
      // In production, uses Application Default Credentials (ADC).
      // Locally, set GOOGLE_APPLICATION_CREDENTIALS env var to a service account key.
      adminApp = initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'ama-ecosystem-prod',
      });
    } else {
      adminApp = getApps()[0];
    }
  }
  return adminApp;
}

export function getAdminDb(): Firestore {
  if (!adminDb) {
    adminDb = getFirestore(getAdminApp());
  }
  return adminDb;
}
