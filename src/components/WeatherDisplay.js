import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useAuth } from '../context/AuthContext';
import SearchComponent from './SearchComponent';
import CurrentWeather from './CurrentWeather';
import ForecastComponent from './ForecastComponent';
import FavoritesComponent from './FavoritesComponent'; 
import { fetchWeatherData } from '../api/weatherService';
import { fetchGeocodeData, fetchReverseGeocodeData } from '../api/geocodeService';

const WeatherDisplay = () => {
  const { currentUser } = useAuth(); // Access current user from context
  const [weatherData, setWeatherData] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [locationInfo, setLocationInfo] = useState({ name: 'Unknown', state: 'Location', country: '' });
  const [favorites, setFavorites] = useState([]); // State for storing user's favorite locations
  const [error, setError] = useState('');

  // Listen to changes in user's favorites in the Firebase database
  useEffect(() => {
    if (currentUser) {
      const db = getDatabase();
      const favRef = ref(db, `users/${currentUser.uid}/favorites`);
      onValue(favRef, (snapshot) => {
        const favData = snapshot.val();
        const loadedFavorites = favData ? Object.entries(favData).map(([key, value]) => ({ ...value, key })) : [];
        console.log("Favorites updated from Firebase:", loadedFavorites);
        setFavorites(loadedFavorites);
      });
    }
  }, [currentUser]);

  // Handler for fetching weather data based on browser's geolocation
  const handleUseCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const weather = await fetchWeatherData(latitude, longitude);
          const locationDetails = await fetchReverseGeocodeData(latitude, longitude);
          setLocationInfo({
            name: locationDetails.name,
            state: locationDetails.state || 'Unknown State',
            country: locationDetails.country
          });
          setWeatherData(weather);
        } catch (error) {
          console.error("Error fetching weather and location details:", error);
          setError("Failed to fetch weather and location details.");
        }
      }, (err) => {
        console.error(err);
        setError("Failed to fetch location. Please ensure location services are enabled.");
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Fetch weather data based on the manually entered location
  const fetchDataByLocation = async (query) => {
    setError('');
    try {
      const geocodeData = await fetchGeocodeData(query);
      if (geocodeData && geocodeData.length > 0) {
        updateWeatherAndLocation(geocodeData[0].lat, geocodeData[0].lon, geocodeData[0]);
      } else {
        setError('Location not found.');
      }
    } catch (error) {
      console.error('Failed to fetch location data:', error);
      setError('Failed to fetch location data.');
    }
  };

  // Update weather and location information in the state
  const updateWeatherAndLocation = async (lat, lon, geocodeData = null) => {
    try {
      const weather = await fetchWeatherData(lat, lon);
      setWeatherData(weather);
      setLocationInfo({
        name: geocodeData.name,
        state: geocodeData.state || 'Unknown State',
        country: geocodeData.country
      });
    } catch (error) {
      console.error("Error fetching weather and location details:", error);
      setError("Failed to fetch weather and location details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-2">Weather Forecast</h1>
      <SearchComponent
        onSearch={fetchDataByLocation}
        locationQuery={locationQuery}
        setLocationQuery={setLocationQuery}
        onUseCurrentLocation={handleUseCurrentLocation}
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <CurrentWeather weatherData={weatherData} locationInfo={locationInfo} />
      <ForecastComponent weatherData={weatherData} />
      <FavoritesComponent
        favorites={favorites}
        setFavorites={setFavorites}
        setWeatherData={setWeatherData}
        setLocationInfo={setLocationInfo}
        weatherData={weatherData}
        locationInfo={locationInfo}
      />
    </div>
  );
};

export default WeatherDisplay;
