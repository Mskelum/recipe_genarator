// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuMggzobhXQMjkf4O-qZBBVjUwvTuwTUc",
    authDomain: "smart-recipe-19.firebaseapp.com",
    projectId: "smart-recipe-19",
    storageBucket: "smart-recipe-19.appspot.com",
    messagingSenderId: "199696139398",
    appId: "1:199696139398:web:688be23e175c80ce10fd07"
  };

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth };
export { db };
