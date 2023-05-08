import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyByJ8wal1ItxekUa5SdzJH5Di170id1gLY",
  authDomain: "schedule-e8553.firebaseapp.com",
  projectId: "schedule-e8553",
  storageBucket: "schedule-e8553.appspot.com",
  messagingSenderId: "224495837362",
  appId: "1:224495837362:web:b56641d6825c3caaca69ab",
  measurementId: "G-9JYDDFDHC3",
});

export const auth = app.auth();
export default app;
