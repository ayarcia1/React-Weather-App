import React, { useState } from 'react';
import axios from 'axios';
import Sunny from '../images/sunny.png'
import PartlyCloudy from './../images/partly-cloudy.png'
import Cloudy from '../images/cloudy.png'
import Rainy from '../images/rainy.png'
import Thunderstorm from '../images/thunderstorm.png'
import Snowy from '../images/snowy.png'
import Windy from '../images/windy.png'
import './CitySearch.css';

const weatherIcons = {
  Clear: Sunny,
  Clouds: PartlyCloudy,
  Rain: Rainy,
  Thunderstorm: Thunderstorm,
  Snow: Snowy,
  Wind: Windy,
  Smoke: Cloudy,
};

const CitySearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (city.trim() === '') return;

    setLoading(true);
    setError(null);

    const API_KEY = 'a201bc36c51d274cc556ad6f3afda5da';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;

    try {
      const response = await axios.get(url);
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
    } catch (error) {
      setError('An error occurred. Please enter a valid city.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="logo-container">
        <img src={Sunny} className="logo logo-sunny" alt="Sunny"/>
        <img src={PartlyCloudy} className="logo logo-partly-cloudy" alt="Partly Cloudy Logo"/>
        <img src={Rainy} className="logo logo-rainy" alt="Rainy"/>
        <img src={Thunderstorm} className="logo logo-thunderstorm" alt="Thunderstorm"/>
        <img src={Snowy} className="logo logo-snowy" alt="Snowy"/>
      </div>
      <h1>Weather Forecast</h1>
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
      {weatherData && (
        <table>
          <tbody>
            <tr>
              <td>
                <div className="logo-weather-container">
                  <img
                    src={weatherIcons[weatherData.weather[0].main]}
                    className="logo logo-weather"
                    alt="Weather Icon"
                  />
                </div>
              </td>
              <td>
                <div className="weather-data-container">
                  <div className="weather-data">
                    <div className="weather-details">
                      <h2>{weatherData.name}</h2>
                      <table>
                        <tbody>
                          <tr>
                            <td>Temperature: {weatherData.main.temp}°F</td>
                            <td>Wind Speed: {weatherData.wind.speed} mph</td>
                          </tr>
                          <tr>
                            <td>Description: {weatherData.weather[0].main}</td>
                            <td>Wind Direction: {weatherData.wind.deg}°</td>
                          </tr>
                          <tr>
                            <td>Humidity: {weatherData.main.humidity}%</td>
                            <td>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</td>
                          </tr>
                          <tr>
                            <td>Pressure: {weatherData.main.pressure} hPa</td>
                            <td>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default CitySearch;