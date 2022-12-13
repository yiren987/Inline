import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const app = firebase.initializeApp({
  apiKey: "AIzaSyByJ8wal1ItxekUa5SdzJH5Di170id1gLY",
  authDomain: "schedule-e8553.firebaseapp.com",
  projectId: "schedule-e8553",
  storageBucket: "schedule-e8553.appspot.com",
  messagingSenderId: "224495837362",
  appId: "1:224495837362:web:b56641d6825c3caaca69ab",
  measurementId: "G-9JYDDFDHC3"
    
  })
  
  export const auth = app.auth()
  export default app



  /* THeortical scrap
  
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID 
    
    */