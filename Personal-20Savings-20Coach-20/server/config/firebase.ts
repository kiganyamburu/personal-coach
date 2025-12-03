import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

let app: App;
let db: Firestore;
let auth: Auth;

/**
 * Initialize Firebase Admin SDK
 * Uses service account credentials from environment variables
 */
export function initializeFirebase() {
  // Skip initialization if already initialized or if we're in build/config phase
  if (getApps().length > 0) {
    return { app, db, auth };
  }

  try {
    // Initialize with service account
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

        // Validate service account has required fields
        if (!serviceAccount.private_key || !serviceAccount.client_email) {
          console.warn(
            "⚠️  Invalid Firebase service account. Server will run without Firebase Admin.",
          );
          return {
            app: undefined as any,
            db: undefined as any,
            auth: undefined as any,
          };
        }

        app = initializeApp({
          credential: cert(serviceAccount),
          projectId: process.env.FIREBASE_PROJECT_ID,
        });
      } catch (parseError) {
        console.warn(
          "⚠️  Could not parse FIREBASE_SERVICE_ACCOUNT. Server will run without Firebase Admin.",
        );
        console.warn(
          "   Set up your Firebase credentials to enable database features.",
        );
        return {
          app: undefined as any,
          db: undefined as any,
          auth: undefined as any,
        };
      }
    } else if (process.env.FIREBASE_PROJECT_ID) {
      // Initialize with default credentials (for local development with emulator)
      console.log("🔧 Initializing Firebase with default credentials...");
      app = initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
    } else {
      console.warn(
        "⚠️  No Firebase configuration found. Server will run without Firebase Admin.",
      );
      console.warn(
        "   Add FIREBASE_PROJECT_ID and FIREBASE_SERVICE_ACCOUNT to your .env file.",
      );
      return {
        app: undefined as any,
        db: undefined as any,
        auth: undefined as any,
      };
    }

    db = getFirestore(app);
    auth = getAuth(app);

    console.log("✅ Firebase Admin initialized successfully");
    return { app, db, auth };
  } catch (error) {
    console.warn(
      "⚠️  Firebase initialization failed:",
      error instanceof Error ? error.message : error,
    );
    console.warn(
      "   Server will run without Firebase. Check your configuration.",
    );
    return {
      app: undefined as any,
      db: undefined as any,
      auth: undefined as any,
    };
  }
}

/**
 * Get Firestore instance
 */
export function getFirestoreDb(): Firestore {
  if (!db) {
    const initialized = initializeFirebase();
    return initialized.db;
  }
  return db;
}

/**
 * Get Firebase Auth instance
 */
export function getFirebaseAuth(): Auth {
  if (!auth) {
    const initialized = initializeFirebase();
    return initialized.auth;
  }
  return auth;
}
