
import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNtrPA3pRG8kNvxQU2nntcLn43WtOiRlQ",
  authDomain: "postres-c30e4.firebaseapp.com",
  databaseURL: "https://postres-c30e4-default-rtdb.firebaseio.com",
  projectId: "postres-c30e4",
  storageBucket: "postres-c30e4.appspot.com",
  messagingSenderId: "796146837266",
  appId: "1:796146837266:web:f9fe02cc1034cd2a6db5cb",
  measurementId: "G-LL0S60E937"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
// const db = getFirestore(app);
// const analytics = getAnalytics(app);
export {
    db,
    storage
}