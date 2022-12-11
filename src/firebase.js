import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByJ8wal1ItxekUa5SdzJH5Di170id1gLY",
  authDomain: "schedule-e8553.firebaseapp.com",
  projectId: "schedule-e8553",
  storageBucket: "schedule-e8553.appspot.com",
  messagingSenderId: "224495837362",
  appId: "1:224495837362:web:b56641d6825c3caaca69ab",
  measurementId: "G-9JYDDFDHC3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
