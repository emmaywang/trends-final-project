import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// other imports
import withFirebaseAuth from 'react-with-firebase-auth';



// insert own config file
const firebaseConfig = {
  apiKey: "AIzaSyA-HosKySria4zOG_d6HWsFyzKPqgWx0G0",
  authDomain: "trends-final-project-22467.firebaseapp.com",
  projectId: "trends-final-project-22467",
  storageBucket: "trends-final-project-22467.appspot.com",
  messagingSenderId: "899316083791",
  appId: "1:899316083791:web:3d010521969596b8e84e3a"
};

const app=initializeApp(firebaseConfig);

const auth = getAuth(app);

// other Firebase setup stuff

//FROM LECTURE NOT DEMO 
//const auth = getAuth(app);
const db = getFirestore(app);

const providers = {
  googleProvider: new GoogleAuthProvider(),
};

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
});

const signInWithGoogle = () => {
  signInWithPopup(auth, providers.googleProvider);
};

const signOutFirebase = () => {
  signOut(auth);
};

export {
  db,
  auth,
  createComponentWithAuth,
  signInWithGoogle,
  signOutFirebase,
};


//export { auth };
