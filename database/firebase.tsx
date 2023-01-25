import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAB5dOXuUro2scyclSAgnsQGukPPKGXnag",
  authDomain: "planklaster-82dfd_firebaseapp.com",
  databaseURL: "planklaster-82dfd.firebaseio.com",
  projectId: "planklaster-82dfd",
  storageBucket: "storageBucketplanklaster-82dfd.appspot.com",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
