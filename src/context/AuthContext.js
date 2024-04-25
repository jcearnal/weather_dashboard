import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(); // Create a React context for auth state

export const useAuth = () => useContext(AuthContext); // Custom hook to use the auth context

// Provider component to manage global auth state
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // State to hold the current user

    useEffect(() => {
        // Subscribe to user authentication state changes
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user); // Set the current user
        });
        return unsubscribe;  // Cleanup the subscription on component unmount
    }, []);

    // Provide the currentUser in the context to be used by consuming components
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children} {/* Render child components that can consume auth state */}
        </AuthContext.Provider>
    );
};
