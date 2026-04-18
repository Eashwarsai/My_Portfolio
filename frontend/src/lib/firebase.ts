import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// All values are read from .env (VITE_ prefix exposes them to Vite's bundler).
// The config itself is safe to expose — Firebase security is enforced via
// Auth rules and server-side token verification, NOT by hiding these keys.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Export the auth instance — the single source of truth for auth state
export const auth = getAuth(app);
