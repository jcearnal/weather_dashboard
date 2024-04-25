import React from 'react';

const ForecastComponent = ({ weatherData }) => {
  if (!weatherData || !weatherData.daily) return null; // Checks if the weather data is available before attempting to render it

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center mb-4">7 Day Forecast</h2>
      <div className="grid grid-cols-5 gap-1 text-center border-b-2 py-2 font-bold text-sm md:text-base">
        <p>Date</p> {/* Column title for date */}
        <p>Hi/Lo</p> {/* Column title for high/low temperatures */}
        <p>Hum</p> {/* Column title for humidity */}
        <p>Precip</p> {/* Column title for precipitation */}
        <p>Wind</p> {/* Column title for wind speed */}
      </div>
      {weatherData.daily.map((day, index) => (
        <div key={index} className="grid grid-cols-5 gap-1 text-center border-b py-2 text-s md:text-sm">
          <p>{new Date(day.dt * 1000).toLocaleDateString()}</p> {/* Displays formatted date */}
          <p>{day.temp.day.toFixed(0)}°F / {day.temp.night.toFixed(0)}°F</p> {/* Displays high and low temperatures */}
          <p>{day.humidity}%</p> {/* Displays humidity percentage */}
          <p>{(day.pop * 100).toFixed(0)}%</p> {/* Displays precipitation probability */}
          <p>{day.wind_speed.toFixed(0)} mph</p> {/* Displays wind speed */}
        </div>
      ))}
    </div>
  );
};

export default ForecastComponent;
