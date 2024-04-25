const CurrentWeather = ({ weatherData, locationInfo }) => {
    if (!weatherData) return null; // Ensure weather data is available before rendering

    // Determine the icon URL based on the weather condition code
    const iconUrl = weatherData.current.weather[0].icon
      ? `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
      : '';

    const precipitationChance = weatherData.current.pop ? (weatherData.current.pop * 100).toFixed(0) : 0;

    return (
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-center mb-4">
          Current Weather in {locationInfo.name}, {locationInfo.state}, {locationInfo.country}
        </h2>
        <div className="flex justify-center items-center text-center mb-4">
          <img src={iconUrl} alt="Weather icon" />
        </div>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="p-2">
            <p className="text-md">Temperature</p>
            <p className="text-lg font-semibold">{weatherData.current.temp.toFixed(1)}°F</p>
          </div>
          <div className="p-2">
            <p className="text-md">Humidity</p>
            <p className="text-lg font-semibold">{weatherData.current.humidity}%</p>
          </div>
          <div className="p-2">
            <p className="text-md">Precipitation</p>
            <p className="text-lg font-semibold">{precipitationChance}%</p>
          </div>
          <div className="p-2">
            <p className="text-md">Wind</p>
            <p className="text-lg font-semibold">{weatherData.current.wind_speed.toFixed(1)} mph</p>
          </div>
        </div>
        <p className="text-center mt-4 font-medium">
          Expect a day of {weatherData.current.weather[0].description}.
        </p>
      </div>
    );
  };

export default CurrentWeather;
