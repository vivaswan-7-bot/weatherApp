import React, { useRef, useState, useEffect } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import white_search_icon from '../assets/white_search_icon.png'
import clear_night from '../assets/clear_night.png'
import cloud_night from '../assets/cloud_night.png'
import drizzle_night from '../assets/drizzle_night.png'
import rain_night from '../assets/rain_night.png'
import snow_night from '../assets/snow_night.png'

const Weather = () => {
  const inputRef = useRef();
  const historyRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_night,
    "02d": cloud_icon,
    "02n": cloud_night,
    "03d": cloud_icon,
    "03n": cloud_night,
    "04d": drizzle_icon,
    "04n": drizzle_night,
    "09d": rain_icon,
    "09n": rain_night,
    "10d": rain_icon,
    "10n": rain_night,
    "13d": snow_icon,
    "13n": snow_night,
  }

  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
    search("Chennai");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target) && 
        historyRef.current && 
        !historyRef.current.contains(event.target)
      ) {
        setShowHistory(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const search = async(city) => {
    if(!city || city.trim() === "") {
      alert("Please Enter A City Name😊😊");
      return;
    }
    
    try {
      setIsLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if(!response.ok){
        alert(data.message);
        setIsLoading(false);
        return;
      }
      
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
      
      addToHistory(data.name);
      setSearchTerm('');
      setShowHistory(false);
      
    } catch (error) {
      setWeatherData(false);
      console.error("Error in Fetching the data:", error);
      alert("Error fetching weather data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const addToHistory = (city) => {
    setSearchHistory(prevHistory => {
      const filteredHistory = prevHistory.filter(item => item.toLowerCase() !== city.toLowerCase());
      const newHistory = [city, ...filteredHistory].slice(0, 5);
      localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputFocus = () => {
    setShowHistory(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(searchTerm);
    }
  };

  const clearSearchHistory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchHistory([]);
    localStorage.removeItem('weatherSearchHistory');
    setShowHistory(false);
  };

  const handleHistoryItemClick = (city, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (city && city.trim() !== "") {
      search(city);
    }
  };

  return (
    <div className='weather'>
      <div className="search-container">
        <div className="search">
          <input 
            ref={inputRef} 
            type="text" 
            placeholder='Search' 
            value={searchTerm} 
            onChange={handleInputChange} 
            onFocus={handleInputFocus} 
            onKeyDown={handleKeyDown} 
          />
          <img 
            src={search_icon} 
            alt="Search" 
            onClick={() => search(searchTerm)} 
          />
        </div>

        {showHistory && searchHistory.length > 0 && (
          <div className="search-history" ref={historyRef}>
            {searchHistory.map((city, index) => (
              <div 
                key={`history-${index}-${city}`} 
                className="history-item" 
                onClick={(e) => handleHistoryItemClick(city, e)}
              >
                <img src={white_search_icon} alt="" className="history-icon" />
                <span>{city}</span>
              </div>
            ))}
            <div className="history-footer">
              <button 
                className="clear-history" 
                onClick={clearSearchHistory}
              >
                Clear Search History
              </button>
            </div>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="loading">Loading weather data...</div>
      ) : weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className='weather-icon' />
          <p className='temp'>{weatherData.temperature}°C</p>
          <p className='city'>{weatherData.location}</p>
          <div className="weather-data">
            <div className="column">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="column">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="no-data">Enter a city to see weather information</div>
      )}
    </div>
  )
}

export default Weather