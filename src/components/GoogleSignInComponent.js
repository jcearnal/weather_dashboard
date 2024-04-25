import React from 'react';
import { signInWithGoogle } from '../utils/authService'; // adjust path as necessary

const GoogleSignInComponent = () => {
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            console.log('Google sign-in successful!');
        } catch (error) {
            console.error('Failed to sign in with Google:', error.message);
        }
    };

    return (
        <div>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    );
};

export default GoogleSignInComponent;
