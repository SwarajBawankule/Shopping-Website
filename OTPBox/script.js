import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCMHZaDAf7ZbOLRZtWdatcUSUcQ8HcCAU",
    authDomain: "project-on-verify.firebaseapp.com",
    projectId: "project-on-verify",
    storageBucket: "project-on-verify.appspot.com",
    messagingSenderId: "473953602581",
    appId: "1:473953602581:web:cbb7640b1d2b83fc24521c",
    measurementId: "G-NXHDFEEWSM"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  

  document.getElementById('send-otp').addEventListener('click', () => {
    const phoneNumber = document.getElementById('phone-number').value;
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    appVerifier.render();
  
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert('OTP has been sent!');
      }).catch((error) => {
        // Error; SMS not sent
        console.error('Error during signInWithPhoneNumber', error);
        alert('Error during signInWithPhoneNumber: ' + error.message);
      });
  });
  

  document.getElementById('verify-otp').addEventListener('click', () => {
    const otp = document.getElementById('otp').value;
  
    window.confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log('User signed in successfully:', user);
      alert('User signed in successfully!');
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.error('Error during confirmation', error);
      alert('Failed to sign in: ' + error.message);
    });
  });
  
