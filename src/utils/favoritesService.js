import { firestore } from './utils/firebaseConfig';

export const addFavorite = async (userId, location) => {
    const userRef = firestore.doc(`users/${userId}`); // Reference to user's document in Firestore
    const snap = await userRef.get(); // Retrieve user's document
    if (snap.exists) {
        const data = snap.data(); // Get current data
        if (!data.favorites) {
            data.favorites = []; // Initialize favorites if not present
        }
        await userRef.update({
            favorites: [...data.favorites, location] // Add new location to favorites
        });
    } else {
        await userRef.set({ favorites: [location] }); // Create document if not exists with new favorite
    }
};

export const getFavorites = async (userId) => {
    const userRef = firestore.doc(`users/${userId}`);
    const snap = await userRef.get(); // Retrieve user's document
    return snap.exists ? snap.data().favorites : []; // Return favorites if exists or empty array
};
