import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

let adminApp: App | null = null;

function initAdminApp(): App {
  if (adminApp) return adminApp;

  if (getApps().length) {
    adminApp = getApps()[0];
    return adminApp;
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_KEY is missing. Firebase Admin cannot initialize."
    );
  }

  let serviceAccount: any;

  try {
    serviceAccount = JSON.parse(serviceAccountKey);

    // 🔥 CRITICAL FIX: restore newlines in private key
    serviceAccount.private_key = serviceAccount.private_key.replace(
      /\\n/g,
      "\n"
    );
  } catch (error) {
    console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY", error);
    throw error;
  }

  adminApp = initializeApp({
    credential: cert(serviceAccount),
  });

  return adminApp;
}

// ✅ Lazy getters (only run at request time)
export const adminAuth = () => getAuth(initAdminApp());
export const adminDb = () => getFirestore(initAdminApp());
export const adminStorage = () => getStorage(initAdminApp());
