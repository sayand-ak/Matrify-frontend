import { RecaptchaVerifier, getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";


//firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "matrify-cd3bc.firebaseapp.com",
  projectId: "matrify-cd3bc",
  storageBucket: "matrify-cd3bc.appspot.com",
  messagingSenderId: "346769273127",
  appId: "1:346769273127:web:a06c14010dd53a8551f902",
  measurementId: "G-VE4BY98JN5"
};

// Initialize Firebase outside the function
initializeApp(firebaseConfig);
const auth = getAuth();

// Existing recaptchaVerifier variable
let recaptchaVerifier: RecaptchaVerifier | null = null;

// Function to initialize RecaptchaVerifier
export function onSignInSubmit(signUpBtn: HTMLButtonElement | null) {
  
  console.log("btn-------",signUpBtn);
  
    if (signUpBtn != null) {
      
      recaptchaVerifier = new RecaptchaVerifier(auth, signUpBtn, {
          'size': 'invisible',
          "callback": (response: unknown) => {
              return { auth, recaptchaVerifier, response };
          }
      });

      console.log(recaptchaVerifier);
      console.log(auth);

        return { auth, recaptchaVerifier };
    }
}