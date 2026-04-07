import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBOL2dwnWNvxIWucbpUX0gVK6otlaXzeWk",
  authDomain: "chitragupt-bfcf4.firebaseapp.com",
  projectId: "chitragupt-bfcf4",
  storageBucket: "chitragupt-bfcf4.firebasestorage.app",
  messagingSenderId: "1094832975949",
  appId: "1:1094832975949:web:13a93b7578cd8e85186c04"
};

// Initialize Firebase only if the API key is present and we're in the browser
// This prevents build-time crashes when environment variables are missing
const app = (typeof window !== "undefined" && firebaseConfig.apiKey) 
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : null;

export default app;
