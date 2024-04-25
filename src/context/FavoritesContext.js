import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDatabase, ref, set, push, onValue, remove } from 'firebase/database';
import { useAuth } from './AuthContext';  // Ensure you import useAuth correctly

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            const db = getDatabase();
            const favRef = ref(db, `users/${currentUser.uid}/favorites`);
            onValue(favRef, (snapshot) => {
                const favData = snapshot.val();
                const loadedFavorites = favData ? Object.entries(favData).map(([key, value]) => ({ ...value, key })) : [];
                setFavorites(loadedFavorites);
            });
        }
    }, [currentUser]);

    const addFavorite = async (newFavorite) => {
        const db = getDatabase();
        const favRef = ref(db, `users/${currentUser.uid}/favorites`);
        const newFavRef = push(favRef); // Firebase automatically assigns a unique key with push
        newFavorite.key = newFavRef.key;
        await set(newFavRef, newFavorite);
        setFavorites(prev => [...prev, newFavorite]); // Optionally, handle this in onValue listener
    };

    const removeFavorite = async (favoriteKey) => {
        const db = getDatabase();
        const favRef = ref(db, `users/${currentUser.uid}/favorites/${favoriteKey}`);
        await remove(favRef); // This deletes the favorite in Firebase
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
