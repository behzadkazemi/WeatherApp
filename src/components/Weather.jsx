import React, { useState, useEffect } from "react";


function Weather() {
  const [city, setCity] = useState("Berlin");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  const API_KEY = "bcda10ba323e88e96cb486015a104d1d";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clear":
        return "/icons/sun.png";
      case "Rain":
        return "/icons/rainy.png";
      case "Snow":
        return "/icons/snowy.png";
      case "Haze":
        return "/icons/sun.png";
      default:
        return "/icons/cloudy.png"; // Default icon
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        {weatherData && (
          <>
            <h1 className="text-gray-500 text-lg text-center mb-4">{formattedDate}</h1>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">{weatherData.name}</h2>
              <img
                className="mx-auto my-4"
                src={getWeatherIconUrl(weatherData.weather[0].main)}
                width="100"
                alt="Weather Icon"
              />
              <h2 className="text-5xl font-bold text-gray-800">{weatherData.main.temp}°C</h2>
              <h2 className="text-lg text-gray-600">{weatherData.weather[0].main}</h2>
              <form className="mt-6" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg mt-2">
                  Get
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
