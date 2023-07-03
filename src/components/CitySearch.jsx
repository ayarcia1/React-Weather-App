import React, { useState } from 'react';
import axios from 'axios';
import './CitySearch.css';

const CitySearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (city.trim() === '') return;

    setLoading(true);
    setError(null);

    const API_KEY = 'a201bc36c51d274cc556ad6f3afda5da';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a201bc36c51d274cc556ad6f3afda5da`;

    axios
      .get(url)
      .then((response) => {
        const temperatureCelsius = response.data.main.temp - 273.15;
        const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;
        const modifiedResponse = {
          ...response.data,
          main: {
            ...response.data.main,
            temp: temperatureFahrenheit.toFixed(2),
          },
        };
        setWeatherData(modifiedResponse);
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred. Please enter a valid city.');
        setLoading(false);
      });
  };

  return (
    <>
    <div className="search-bar-container">
      <form className="search-bar-form" onSubmit={handleFormSubmit}>
        <input
          className="search-bar-input"
          type="text"
          placeholder="Enter a city..."
          value={city}
          onChange={handleInputChange}
        />
        <button className="search-bar-button" type="submit">
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
    <div className='weather-data-container'>
      {weatherData && (
        <div className="weather-data">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°F</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default CitySearch;