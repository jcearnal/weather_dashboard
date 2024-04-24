import React, { useState } from 'react';
import SearchComponent from './SearchComponent';
import CurrentWeather from './CurrentWeather';
import ForecastComponent from './ForecastComponent';
import { fetchWeatherData } from '../api/weatherService';
import { fetchGeocodeData, fetchReverseGeocodeData } from '../api/geocodeService';

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [locationInfo, setLocationInfo] = useState({ name: 'Unknown', state: 'Location', country: '' });
  const [error, setError] = useState('');

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

  const handleSearch = (query) => {
    fetchDataByLocation(query);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        updateWeatherAndLocation(position.coords.latitude, position.coords.longitude);
      }, (err) => {
        console.error(err);
        setError("Failed to fetch location. Please ensure location services are enabled.");
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const updateWeatherAndLocation = async (lat, lon, geocodeData = null) => {
    try {
      const weather = await fetchWeatherData(lat, lon);
      setWeatherData(weather);
      if (geocodeData) { // If geocode data is directly provided from the search
        setLocationInfo({
          name: geocodeData.name,
          state: geocodeData.state || 'Unknown State',
          country: geocodeData.country
        });
      } else { // Otherwise, fetch new location details via reverse geocoding
        const locationDetails = await fetchReverseGeocodeData(lat, lon);
        setLocationInfo({
          name: locationDetails.name,
          state: locationDetails.state || 'Unknown State',
          country: locationDetails.country
        });
      }
    } catch (error) {
      console.error("Error fetching weather and location details:", error);
      setError("Failed to fetch weather and location details.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <center><h1 className="text-3xl font-bold my-2">Weather Dashboard</h1></center>
      <SearchComponent
        onSearch={handleSearch}
        locationQuery={locationQuery}
        setLocationQuery={setLocationQuery}
        onUseCurrentLocation={handleUseCurrentLocation}
      />
      {error && <p className="text-red-500">{error}</p>}
      <CurrentWeather weatherData={weatherData} locationInfo={locationInfo} />
      <ForecastComponent weatherData={weatherData} />
    </div>
  );
};

export default WeatherDisplay;
