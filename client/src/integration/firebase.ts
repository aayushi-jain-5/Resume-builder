import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,TwitterAuthProvider,GithubAuthProvider,signOut,updateProfile} from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAT27yI5nWRNNR0qmUaH-TG7HBzZ5cfzRk",
  authDomain: "auth-bec45.firebaseapp.com",
  projectId: "auth-bec45",
  storageBucket: "auth-bec45.firebasestorage.app",
  messagingSenderId: "602329924106",
  appId: "1:602329924106:web:1f54d9259da45708a9d5f3",
  measurementId: "G-YTNPPRPRV2"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const twitterProvider= new TwitterAuthProvider();
export const githubProvider = new GithubAuthProvider();
export { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,updateProfile}
