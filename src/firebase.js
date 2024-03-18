import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCZHKY0ozKOcyT8VQRUfb6VUSSOWpu88A4",
  authDomain: "question-and-answer-platform.firebaseapp.com",
  projectId: "question-and-answer-platform",
  storageBucket: "question-and-answer-platform.appspot.com",
  messagingSenderId: "474808735601",
  appId: "1:474808735601:web:0849e63a950ce1f08d48d0"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();
// export const storage = getStorage();
