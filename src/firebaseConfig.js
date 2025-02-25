import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDwd-cil0_7gl4kHzIToi2G70mTWjyWS8U",
  authDomain: "nofitication-5d51a.firebaseapp.com",
  databaseURL: "https://nofitication-5d51a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nofitication-5d51a",
  storageBucket: "nofitication-5d51a.appspot.com",
  messagingSenderId: "121238876658",
  appId: "1:121238876658:web:00adc3668dcd9ba2be3b6b",
  measurementId: "G-J4FQKEEJY0"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db, ref, set, push };
