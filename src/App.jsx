import CitySearch from './components/CitySearch'
import weatherLogo from './images/weather-icon.png'
import './App.css'

function App() {

  return (
    <>
      <img src={weatherLogo} className="logo" alt="Weather Logo"/>
      <h1>Weather Forecast</h1>
      <CitySearch />
    </>
  )
}

export default App
