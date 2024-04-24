import React from 'react';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  // Log the API key to the console
  // console.log('API Key from .env:', process.env.REACT_APP_OPENWEATHERMAP_API_KEY);

  return (
    <div className="App">      
      <WeatherDisplay lat="40.7128" lon="-74.0060" /> {/* Example coordinates for New York */}
    </div>
  );
}

export default App;
