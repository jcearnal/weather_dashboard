import React from 'react';
import { getDatabase, ref, set, push } from 'firebase/database';
import { useAuth } from '../context/AuthContext';
import { fetchWeatherData } from '../api/weatherService';

const FavoritesComponent = ({ favorites, setFavorites, setWeatherData, setLocationInfo, weatherData, locationInfo }) => {
  const { currentUser } = useAuth();

  const addToFavorites = async () => {
    const db = getDatabase();
    const favRef = ref(db, `users/${currentUser.uid}/favorites`);
  
    const isDuplicate = favorites.some(fav =>
      fav.lat === weatherData.lat && fav.lon === weatherData.lon);
  
    if (!isDuplicate && weatherData && locationInfo) {
      const newFavRef = push(favRef);
      const newFavorite = {
        name: locationInfo.name,
        lat: weatherData.lat,
        lon: weatherData.lon,
        state: locationInfo.state,
        country: locationInfo.country,
        key: newFavRef.key
      };
  
      // Push to Firebase and let onValue listener handle the state update
      await set(newFavRef, newFavorite);
    } else {
      alert("This location is already in your favorites or data is missing.");
    }
  };

  const deleteFavorite = async (favorite) => {
    if (!favorite.key) {
      alert("No key found for the favorite, can't delete.");
      return;
    }

    try {
      const db = getDatabase();
      const favRef = ref(db, `users/${currentUser.uid}/favorites/${favorite.key}`);
      await set(favRef, null);

      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.key !== favorite.key));
    } catch (error) {
      console.error("Error deleting favorite:", error);
      alert("Failed to delete favorite.");
    }
  };

  const loadFavoriteWeather = async (favorite) => {
    try {
      const weather = await fetchWeatherData(favorite.lat, favorite.lon);
      setWeatherData(weather);
      setLocationInfo({
        name: favorite.name,
        state: favorite.state || 'Unknown State',
        country: favorite.country
      });
    } catch (error) {
      console.error("Error fetching weather from favorite:", error);
      alert("Failed to fetch weather for favorite location.");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold my-2">Your Favorites:</h2>
      {favorites.map((fav) => (
        <div key={fav.key} className="flex items-center justify-between w-full my-2">
          <button 
            onClick={() => loadFavoriteWeather(fav)}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-l flex-grow">
            {`${fav.name}, ${fav.state}, ${fav.country}`}
          </button>
          <button 
            onClick={() => deleteFavorite(fav)}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-r w-1/3">
            Delete
          </button>
        </div>
      ))}
      {locationInfo && locationInfo.name !== 'Unknown' && (
        <button
          onClick={addToFavorites}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2">
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default FavoritesComponent;
