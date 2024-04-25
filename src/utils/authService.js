import { auth } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { signOut as firebaseSignOut } from 'firebase/auth';

const provider = new GoogleAuthProvider(); // Configure Google Auth provider

export const signInWithGoogle = async () => {
  try {
      const result = await signInWithPopup(auth, provider); // Perform sign in using Google popup
      const user = result.user; // Extract user data from result
      return user; // Return user data
  } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error; // Rethrow error for caller handling
  }
};

export const signOut = async () => {
  await firebaseSignOut(auth); // Perform sign out
};
