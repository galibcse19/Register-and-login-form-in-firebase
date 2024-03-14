// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCibfCvctWBZ50RJ12Hgu7zDYjdhTf_Iu0",
  authDomain: "registration-form-react-a0cda.firebaseapp.com",
  projectId: "registration-form-react-a0cda",
  storageBucket: "registration-form-react-a0cda.appspot.com",
  messagingSenderId: "175437290001",
  appId: "1:175437290001:web:58d2fc112026161970afb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;