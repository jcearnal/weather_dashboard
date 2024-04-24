import { firestore } from './utils/firebaseConfig';

export const addFavorite = async (userId, location) => {
    const userRef = firestore.doc(`users/${userId}`);
    const snap = await userRef.get();
    if (snap.exists) {
        const data = snap.data();
        if (!data.favorites) {
            data.favorites = [];
        }
        await userRef.update({
            favorites: [...data.favorites, location]
        });
    } else {
        await userRef.set({ favorites: [location] });
    }
};

export const getFavorites = async (userId) => {
    const userRef = firestore.doc(`users/${userId}`);
    const snap = await userRef.get();
    return snap.exists ? snap.data().favorites : [];
};
