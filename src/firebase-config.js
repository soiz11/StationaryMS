import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9_KJ6wEU5eQoraTl6lSzfulmY1lOvKLU",
  authDomain: "itumsms20it-47e60.firebaseapp.com",
  projectId: "itumsms20it-47e60",
  storageBucket: "itumsms20it-47e60.appspot.com",
  messagingSenderId: "762974680694",
  appId: "1:762974680694:web:a34c73d1d1cb6cab1c9157",

  /*
    apiKey: "AIzaSyCEgArumBAm6_txdZUNCNkY6CUWznci4M8",
    authDomain: "itumstationary.firebaseapp.com",
    projectId: "itumstationary",
    storageBucket: "itumstationary.appspot.com",
    messagingSenderId: "834331738630",
    appId: "1:834331738630:web:99ac805fbc800b16617987"

    apiKey: "AIzaSyA0V0-aDcQfKjF4AiRn49HATdtb31e0GdQ",
    authDomain: "finalstationaries.firebaseapp.com",
    projectId: "finalstationaries",
    storageBucket: "finalstationaries.appspot.com",
    messagingSenderId: "372549102242",
    appId: "1:372549102242:web:db13f4ef4dbd8630e785fb"  */
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
