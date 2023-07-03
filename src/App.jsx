import { useState } from 'react'
import SearchBar from './components/SearchBar'
import weatherLogo from './images/weather-icon.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src={weatherLogo} className="logo" alt="Weather Logo"/>
      <h1>Weather Forecast</h1>
      <SearchBar />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Increment
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          Decrement
        </button>
        <p className="counter">
          Count: {count}
        </p>
      </div>
    </>
  )
}

export default App
