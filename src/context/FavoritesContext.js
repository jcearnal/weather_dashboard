import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDatabase, ref, set, push, onValue, remove } from 'firebase/database';
import { useAuth } from './AuthContext'; 

const FavoritesContext = createContext(); // Create a context for managing favorites

export const useFavorites = () => useContext(FavoritesContext); // Hook to access favorites context

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]); // State to store favorite locations
    const { currentUser } = useAuth(); // Use auth context to get current user

    useEffect(() => {
        if (currentUser) {
            const db = getDatabase();
            const favRef = ref(db, `users/${currentUser.uid}/favorites`);
            onValue(favRef, (snapshot) => {
                const favData = snapshot.val(); // Fetch data from Firebase
                const loadedFavorites = favData ? Object.entries(favData).map(([key, value]) => ({ ...value, key })) : [];
                setFavorites(loadedFavorites); // Update state with loaded favorites
            });
        }
    }, [currentUser]);

    const addFavorite = async (newFavorite) => {
        const db = getDatabase();
        const favRef = ref(db, `users/${currentUser.uid}/favorites`);
        const newFavRef = push(favRef); // Create a new entry in Firebase
        newFavorite.key = newFavRef.key; // Store Firebase-generated key in the favorite object
        await set(newFavRef, newFavorite); // Save new favorite in Firebase
        setFavorites(prev => [...prev, newFavorite]); // Update local state
    };

    const removeFavorite = async (favoriteKey) => {
        const db = getDatabase();
        const favRef = ref(db, `users/${currentUser.uid}/favorites/${favoriteKey}`);
        await remove(favRef); // Remove the favorite from Firebase
    };

    // Provide favorites management functions and state through context
    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
