import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

export const fetchWeatherData = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  console.log('Using API Key:', apiKey); // Debugging API key

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
        units: 'imperial', // Use 'imperial' for Fahrenheit.
        exclude: 'minutely,hourly', // Exclude parts not needed.
        appid: apiKey
      }
    });
    console.log('Data fetched:', response.data); // Debugging response
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null; // Ensures UI can handle no data scenario
  }
};
