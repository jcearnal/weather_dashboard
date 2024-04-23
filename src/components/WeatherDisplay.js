import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../api/weatherService';

const WeatherDisplay = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchWeatherData(lat, lon);
      setWeatherData(data);
    };

    loadData();
  }, [lat, lon]);

  if (!weatherData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Weather at {weatherData.lat.toFixed(2)}, {weatherData.lon.toFixed(2)}</h1>
      <p>Current Temperature: {weatherData.current.temp.toFixed(1)}°F</p>
      <p>Weather Condition: {weatherData.current.weather[0].description}</p>
      <p>Humidity: {weatherData.current.humidity}%</p>
      <p>Wind Speed: {weatherData.current.wind_speed.toFixed(1)} mph</p>
      <p>Sunrise: {new Date(weatherData.current.sunrise * 1000).toLocaleTimeString()}</p>
      <p>Sunset: {new Date(weatherData.current.sunset * 1000).toLocaleTimeString()}</p>
      <h2>7 Day Forecast:</h2>
      {weatherData.daily.map((day, index) => (
        <div key={index}>
          <p>Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>
          <p>Day Temp: {day.temp.day.toFixed(0)}°F</p>
          <p>Night Temp: {day.temp.night.toFixed(0)}°F</p>
          <p>Condition: {day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay;
