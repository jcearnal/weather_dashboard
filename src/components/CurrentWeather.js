const CurrentWeather = ({ weatherData, locationInfo }) => {
    // Checks if weather data is available before attempting to render the component
    if (!weatherData) return null; 

    // Constructs URL for the weather icon based on the weather code received from API
    const iconUrl = weatherData.current.weather[0].icon
      ? `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
      : '';

    // Calculates the chance of precipitation if available, otherwise sets it to 0
    const precipitationChance = weatherData.current.pop ? (weatherData.current.pop * 100).toFixed(0) : 0;

    return (
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-center mb-4">
          Current Weather in {locationInfo.name}, {locationInfo.state}, {locationInfo.country}
        </h2>
        <div className="flex justify-center items-center text-center mb-4">
          <img src={iconUrl} alt="Weather icon" />
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2">
            <p className="text-md">Temp</p>
            <p className="text-lg font-semibold">{weatherData.current.temp.toFixed(1)}°F</p>
          </div>
          <div className="p-2">
            <p className="text-md">Humidity</p>
            <p className="text-lg font-semibold">{weatherData.current.humidity}%</p>
          </div>
          <div className="p-2">
            <p className="text-md">Precip.</p>
            <p className="text-lg font-semibold">{precipitationChance}%</p>
          </div>
          <div className="p-2">
            <p className="text-md">Wind</p>
            <p className="text-lg font-semibold">{weatherData.current.wind_speed.toFixed(1)} mph</p>
          </div>
        </div>
        <p className="text-center mt-4 font-medium">
          Summary: Expect a day of {weatherData.current.weather[0].description}.
        </p>
      </div>
    );
  };

export default CurrentWeather;
