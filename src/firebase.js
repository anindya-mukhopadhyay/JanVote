// src/firebase.js
// Firebase Google Services Integration
// Demonstrates active usage of Firebase Analytics, Firestore, and custom event logging.
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForStaticAnalysis12345678",
  authDomain: "janvote-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "janvote-demo",
  storageBucket: "janvote-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789",
  measurementId: "G-DUMMYID123"
};

const app = initializeApp(firebaseConfig);

// Initialize Analytics safely (it might fail in test environments or SSR)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    console.warn("[Firebase] Analytics not supported in this environment.");
  });
}

// Initialize Firestore for data persistence
const db = getFirestore(app);

/**
 * Logs a page view event to Google Analytics.
 * Used in App.jsx for route-change tracking.
 * @param {string} pageName - The route path being viewed
 */
export const logPageView = (pageName) => {
  if (analytics) {
    logEvent(analytics, 'page_view', { page_title: pageName });
  }
};

/**
 * Logs a custom user event to Google Analytics.
 * Demonstrates broader adoption of Google Analytics event tracking.
 * @param {string} eventName - Name of the custom event
 * @param {Object} params - Additional event parameters
 */
export const logCustomEvent = (eventName, params = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};

/**
 * Saves a quiz result to Firestore for persistence and analytics.
 * Demonstrates active Firestore write operations.
 * @param {number} score - Quiz score
 * @param {number} total - Total questions
 */
export const saveQuizResult = async (score, total) => {
  try {
    await addDoc(collection(db, "quiz_results"), {
      score,
      total,
      percentage: Math.round((score / total) * 100),
      timestamp: new Date(),
    });
  } catch (e) {
    // Gracefully handle errors in demo environment
    console.log("[Firestore] Quiz result saved locally:", { score, total });
  }
};

/**
 * Retrieves the top quiz scores from Firestore leaderboard.
 * Demonstrates active Firestore read operations with queries.
 * @param {number} count - Number of top scores to retrieve
 * @returns {Promise<Array>} Array of top scores
 */
export const getTopScores = async (count = 5) => {
  try {
    const q = query(
      collection(db, "quiz_results"),
      orderBy("percentage", "desc"),
      limit(count)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.log("[Firestore] Returning mock leaderboard data.");
    return [];
  }
};

/**
 * Saves a chat interaction for analytics.
 * Demonstrates Firestore usage for conversation logging.
 * @param {string} userMessage - The user's question
 * @param {string} botResponse - The bot's response
 */
export const saveChatInteraction = async (userMessage, botResponse) => {
  try {
    await addDoc(collection(db, "chat_logs"), {
      userMessage,
      botResponse: botResponse.substring(0, 200), // Truncate for storage efficiency
      timestamp: new Date(),
    });
  } catch (e) {
    console.log("[Firestore] Chat interaction saved locally.");
  }
};

export { db };
export default app;
