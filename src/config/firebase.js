import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAjYPscfV06jJWYYhkuRcPF8NBudMY_8Ag",
  authDomain: "invoice-project-6c543.firebaseapp.com",
  projectId: "invoice-project-6c543",
  storageBucket: "invoice-project-6c543.appspot.com",
  messagingSenderId: "154546857699",
  appId: "1:154546857699:web:1cc35883c9e2677c84c7d6",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
