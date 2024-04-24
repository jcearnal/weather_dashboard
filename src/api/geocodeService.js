import axios from 'axios';

const GEOCODE_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';

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
