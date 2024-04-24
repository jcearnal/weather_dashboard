import React from 'react';

const CurrentWeather = ({ weatherData, locationInfo }) => {
  if (!weatherData) return null; // Ensure weather data is available before rendering

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-center mb-4">
        Current Weather in {locationInfo.name}, {locationInfo.state}, {locationInfo.country}
      </h2>
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
    </div>
  );
};

export default CurrentWeather;
