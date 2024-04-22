import React, { useState } from 'react';
import { fetchWeather } from '../api/weatherAPI';

const SearchComponent = ({ setWeatherData }) => {
  const [city, setCity] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await fetchWeather(city);
    setWeatherData(data);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchComponent;
