import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVjUmvHDz_41PyRCD8-ozrn3MQVHaiNkA",
  authDomain: "chatapp-firebase-c68e5.firebaseapp.com",
  projectId: "chatapp-firebase-c68e5",
  storageBucket: "chatapp-firebase-c68e5.appspot.com",
  messagingSenderId: "557166949876",
  appId: "1:557166949876:web:354bac14a9f1881d3375a1",
  measurementId: "G-MT3XQ6TRYH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
const provider=new GoogleAuthProvider()

// export everything needed
export { auth, storage, provider};
export default db;