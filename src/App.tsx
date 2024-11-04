import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import CityInfo from './components/CityInfo';
import { WeatherData, SortOption, CityInfo as CityInfoType } from './types';
import { fetchCityInfo } from './services/cityService';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [cityInfo, setCityInfo] = useState<CityInfoType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<WeatherData[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('time');

  const API_KEY = '1b2b011af9d93a406ee67a2314dd1358';
  
  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherResponse, cityInfoData] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        ),
        fetchCityInfo(city)
      ]);

      if (!weatherResponse.ok) {
        throw new Error('未找到该城市');
      }

      const data = await weatherResponse.json();
      const weatherData: WeatherData = {
        temp: Math.round(data.main.temp),
        city: data.name,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        tempMin: Math.round(data.main.temp_min),
        tempMax: Math.round(data.main.temp_max),
        condition: data.weather[0].main,
        timestamp: Date.now()
      };

      setWeather(weatherData);
      setCityInfo(cityInfoData);
      setHistory(prev => {
        const filtered = prev.filter(item => item.city !== weatherData.city);
        return [weatherData, ...filtered];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取天气数据失败');
    } finally {
      setLoading(false);
    }
  };

  const sortHistory = useCallback((history: WeatherData[]) => {
    return [...history].sort((a, b) => {
      switch (sortBy) {
        case 'time':
          return (b.timestamp || 0) - (a.timestamp || 0);
        case 'temp':
          return b.temp - a.temp;
        case 'city':
          return a.city.localeCompare(b.city);
        default:
          return 0;
      }
    });
  }, [sortBy]);

  const sortedHistory = sortHistory(history);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white text-center mb-8">城市天气与信息查询</h1>
            <SearchBar onSearch={fetchWeather} loading={loading} />
            
            {error && (
              <div className="mt-4 p-4 bg-red-500/20 rounded-lg text-white text-center">
                {error}
              </div>
            )}
            
            {weather && <WeatherDisplay weather={weather} />}
            {cityInfo && <CityInfo cityInfo={cityInfo} />}

            <SearchHistory
              history={sortedHistory}
              onSelect={fetchWeather}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;