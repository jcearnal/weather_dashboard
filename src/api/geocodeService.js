import axios from 'axios';

const GEOCODE_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const REVERSE_GEOCODE_API_URL = 'http://api.openweathermap.org/geo/1.0/reverse';

export const fetchGeocodeData = async (location) => {
  try {
    const response = await axios.get(GEOCODE_API_URL, {
      params: {
        q: location,
        limit: 1,
        appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY
      }
    });
    return response.data; // This should be an array of locations
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    throw error; 
  }
};

export const fetchReverseGeocodeData = async (lat, lon) => {
  try {
    const response = await axios.get(REVERSE_GEOCODE_API_URL, {
      params: {
        lat: lat,
        lon: lon,
        limit: 1, 
        appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY
      }
    });
    return response.data[0]; // Return the most relevant location
  } catch (error) {
    console.error('Error fetching reverse geocode data:', error);
    throw error;
  }
};
