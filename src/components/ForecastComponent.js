import React from 'react';

const ForecastComponent = ({ weatherData }) => {
  if (!weatherData || !weatherData.daily) return null; // Ensure daily forecast data is available before rendering

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center mb-4">7 Day Forecast</h2>
      <div className="grid grid-cols-4 text-center border-b-2 py-2 font-bold">
        <p>Date</p>
        <p>Daytime High/Night Lows</p>
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
  );
};

export default ForecastComponent;
