/*
export const signIn = async () => {
  try {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const code = err.code;
    const message = err.message;

    console.log(
      `An error ${code} occurred when logging user with message: ${message}`,
    );
    return null;
  }
};

export const signOut = async () => {
};
*/

import { auth, signInWithGoogle, signOutFirebase } from '../utils/firebase.tsx'; // Import the authentication object from your firebase configuration
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import axios from "axios";

const provider=new GoogleAuthProvider();

export const signIn = async () => {
  try {
    const result=await signInWithPopup(auth, provider);
    const credential=GoogleAuthProvider.credentialFromResult(result);
    const token=credential?.accessToken;
    const user=result.user; 

    //create new user account
    await axios
        .post("http://localhost:8000/api/users/${user.uid}",{
          name: user.displayName,
          email: user.email,
        })
        .then((res)=>{
          //idk
        }).catch((err)=>{
          console.log(err);
        })

        return {token, user};

  } catch (err: any) {
    const code = err.code;
    const message = err.message;

    console.error(`An error ${code} occurred when logging user with message: ${message}`);
    return null;
  }
};


export const signOut = async () => {
  try {
    await signOutFirebase;
    console.log('User signed out');
  } catch (error) {
    console.error('An error occurred when signing out user:', error);
  }
};
