import { auth } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { signOut as firebaseSignOut } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      return user;
  } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error;
  }
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};
