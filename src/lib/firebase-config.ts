import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const getEnv = (key: string, fallback: string) => {
  if (typeof process === 'undefined') return fallback;
  const value = process.env[key];
  if (!value || value === 'undefined' || value === '') return fallback;
  return value.trim().replace(/^["'](.+)["']$/, '$1');
};

const firebaseConfig: FirebaseOptions = {
  apiKey: getEnv('NEXT_PUBLIC_FIREBASE_API_KEY', ""),
  authDomain: getEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', ""),
  projectId: getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', ""),
  storageBucket: getEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', ""),
  messagingSenderId: getEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', ""),
  appId: getEnv('NEXT_PUBLIC_FIREBASE_APP_ID', "")
};

let appInstance: any = null;

const getAppInstance = () => {
  if (typeof window === 'undefined') return null;
  if (appInstance) return appInstance;
  
  try {
    appInstance = getApps().length ? getApp() : initializeApp(firebaseConfig);
    return appInstance;
  } catch (e) {
    console.error("[Firebase] App Initialization Failed:", e);
    return null;
  }
};

// Robust Proxy to delay service initialization and catch errors
const createLazyService = (initFn: any) => {
  let service: any;
  let initError: any = null;

  return new Proxy({}, {
    get: (target, prop) => {
      if (typeof window === 'undefined') return undefined;
      
      const app = getAppInstance();
      if (!app) return undefined;
      
      if (!service && !initError) {
        try {
          service = initFn(app);
        } catch (e) {
          initError = e;
          console.error("[Firebase] Service Initialization Failed:", e);
        }
      }
      
      if (initError) return undefined;
      if (!service) return undefined;

      const value = service[prop];
      return typeof value === 'function' ? value.bind(service) : value;
    }
  });
};

export const app = new Proxy({}, {
  get: (target, prop) => {
    const instance = getAppInstance();
    if (!instance) return undefined;
    const value = (instance as any)[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  }
});
export const auth = createLazyService(getAuth) as any;
export const db = createLazyService(getFirestore) as any;
export const storage = createLazyService(getStorage) as any;
