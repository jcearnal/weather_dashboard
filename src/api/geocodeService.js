import axios from 'axios';

// Base URLs for the OpenWeatherMap Geocoding API
const GEOCODE_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const REVERSE_GEOCODE_API_URL = 'https://api.openweathermap.org/geo/1.0/reverse';

// Fetches geocoding data for a given location string
export const fetchGeocodeData = async (location) => {
  try {
    const response = await axios.get(GEOCODE_API_URL, {
      params: {
        q: location, // Query parameter for the location search
        limit: 1, // Limits the number of returned results to the most relevant one
        appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY // API key from environment variables
      }
    });
    return response.data; // Returns an array of possible locations, most relevant first
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    throw error; // Throws an error if the API call fails
  }
};

// Fetches reverse geocoding data using latitude and longitude
export const fetchReverseGeocodeData = async (lat, lon) => {
  try {
    const response = await axios.get(REVERSE_GEOCODE_API_URL, {
      params: {
        lat: lat, // Latitude for the reverse geocoding
        lon: lon, // Longitude for the reverse geocoding
        limit: 1, // Ensures only the most relevant location is returned
        appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY // Uses API key from environment variables
      }
    });
    return response.data[0]; // Returns the top result directly
  } catch (error) {
    console.error('Error fetching reverse geocode data:', error);
    throw error; // Throws an error if the request fails
  }
};
