// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUwdaUTiTHU3F8GzNzSw8Mk6e3-bc0zpQ",
  authDomain: "otp-test-c34f4.firebaseapp.com",
  projectId: "otp-test-c34f4",
  storageBucket: "otp-test-c34f4.appspot.com", 
  messagingSenderId: "786731650229",
  appId: "1:786731650229:web:3b2ec745081c14917582fc",
  measurementId: "G-7T8GCE251R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);