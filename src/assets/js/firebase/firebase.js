// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnrd5bKthjKiSPKcI2IcDwwjfEvRpsn3Q",
  authDomain: "fitself-93859.firebaseapp.com",
  projectId: "fitself-93859",
  storageBucket: "fitself-93859.appspot.com",
  messagingSenderId: "820962927276",
  appId: "1:820962927276:web:64520d0ee49d00c4913509",
  databaseURL: "https://fitself-93859-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Get a list of cities from your database

export default app;
