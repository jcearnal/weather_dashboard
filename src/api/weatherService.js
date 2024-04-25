import axios from 'axios';

// Base URL for the OpenWeatherMap One Call API
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

// Fetches weather data for a specific latitude and longitude
export const fetchWeatherData = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY; // Retrieves API key from environment variables

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                lat: lat, // Latitude for the weather query
                lon: lon, // Longitude for the weather query
                units: 'imperial', // Sets the unit to 'imperial' for Fahrenheit
                exclude: 'minutely,hourly', // Excludes minutely and hourly data to reduce payload size
                appid: apiKey // API key for authentication
            }
        });
        console.log('Data fetched:', response.data); // Logs the fetched data for debugging
        return response.data; // Returns the weather data
    } catch (error) {
        console.error('Error fetching weather data:', error); // Logs error if fetching fails
        return null; // Returns null to handle scenarios where no data could be fetched
    }
};
