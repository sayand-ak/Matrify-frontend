// Firebase imports
import { RecaptchaVerifier, getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "matrify-cd3bc.firebaseapp.com",
    projectId: "matrify-cd3bc",
    storageBucket: "matrify-cd3bc.appspot.com",
    messagingSenderId: "346769273127",
    appId: "1:346769273127:web:a06c14010dd53a8551f902",
    measurementId: "G-VE4BY98JN5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to initialize RecaptchaVerifier
export function onSignInSubmit(signUpBtn: HTMLButtonElement | null) {
    if (signUpBtn != null) {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'normal',
        });
        return { auth, recaptchaVerifier };
    }
}
