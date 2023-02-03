import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAB5dOXuUro2scyclSAgnsQGukPPKGXnag",
  authDomain: "planklaster-82dfd.firebaseapp.com",
  databaseURL:
    "https://planklaster-82dfd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "planklaster-82dfd",
  storageBucket: "planklaster-82dfd.appspot.com",
  messagingSenderId: "945689321848",
  appId: "1:945689321848:web:43047fa38270e15eb3688d",
  measurementId: "G-J03KS95X5W",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export {database, auth};