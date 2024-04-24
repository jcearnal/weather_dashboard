import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../api/weatherService';
import { fetchGeocodeData } from '../api/geocodeService';

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [locationInfo, setLocationInfo] = useState({ name: '', state: '', country: '' });
  const [error, setError] = useState('');

  const fetchDataByLocation = async (query) => {
    setError('');
    try {
      const fullQuery = query.includes(',') ? query : `${query},,US`; // Adds default country if not included
      const geoData = await fetchGeocodeData(fullQuery);
      if (geoData && geoData.length > 0) {
        const { name, state, country, lat, lon } = geoData[0];
        setLocationInfo({ 
          name: name || 'Unknown City', 
          state: state || 'Unknown State', 
          country: country || 'US'  // Default to US if country is not found
        });
        const weather = await fetchWeatherData(lat, lon);
        setWeatherData(weather);
      } else {
        setError('Location not found.');
      }
    } catch (error) {
      setError('Failed to fetch location data.');
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchDataByLocation(locationQuery);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold my-2">Weather Dashboard</h1>
        <div className="my-4">
          <input
            type="text"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="Enter City, State, Country"
            className="border-2 border-gray-300 p-2 rounded"
          />
          <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {weatherData ? (
        <div>
          <h2 className="text-xl font-semibold text-center mb-4">Current Weather for {locationInfo.name}, {locationInfo.state}, {locationInfo.country}</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2">
              <p className="text-md">Temperature</p>
              <p className="text-lg font-semibold">{weatherData.current.temp.toFixed(1)}°F</p>
            </div>
            <div className="p-2">
              <p className="text-md">Humidity</p>
              <p className="text-lg font-semibold">{weatherData.current.humidity}%</p>
            </div>
            <div className="p-2">
              <p className="text-md">Wind</p>
              <p className="text-lg font-semibold">{weatherData.current.wind_speed.toFixed(1)} mph</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-center mb-4">7 Day Forecast</h2>
            <div className="grid grid-cols-4 text-center border-b-2 py-2 font-bold">
              <p>Date</p>
              <p>Day High/Night Low</p>
              <p>Wind</p>
              <p>Humidity</p>
            </div>
            {weatherData.daily.map((day, index) => (
              <div key={index} className="grid grid-cols-4 text-center border-b-2 py-2">
                <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p>{day.temp.day.toFixed(0)}°F / {day.temp.night.toFixed(0)}°F</p>
                <p>{day.wind_speed.toFixed(1)} mph</p>
                <p>{day.humidity}%</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
