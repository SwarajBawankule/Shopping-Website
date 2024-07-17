// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDCMHZaDAf7ZbOLRZtWdatcUSUcQ8HcCAU",
//   authDomain: "project-on-verify.firebaseapp.com",
//   projectId: "project-on-verify",
//   storageBucket: "project-on-verify.appspot.com",
//   messagingSenderId: "473953602581",
//   appId: "1:473953602581:web:cbb7640b1d2b83fc24521c",
//   measurementId: "G-NXHDFEEWSM"
// };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  document.getElementById('send-otp').addEventListener('click', function () {
    const phoneNumber = document.getElementById('phone-number').value;
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert('OTP has been sent!');
      }).catch(function (error) {
        // Error; SMS not sent
        console.error('Error during signInWithPhoneNumber', error);
      });
  });
  document.getElementById('verify-otp').addEventListener('click', function () {
    const otp = document.getElementById('otp').value;
  
    window.confirmationResult.confirm(otp).then(function (result) {
      // User signed in successfully.
      const user = result.user;
      console.log('User signed in successfully:', user);
      alert('User signed in successfully!');
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      console.error('Error during confirmation', error);
      alert('Failed to sign in: ' + error.message);
    });
  });
      