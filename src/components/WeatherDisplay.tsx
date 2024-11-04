import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudDrizzle, Cloud as CloudMist, Wind, Droplets } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherDisplayProps {
  weather: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case 'Clear':
      return <Sun className="w-24 h-24 text-yellow-300" />;
    case 'Snow':
      return <CloudSnow className="w-24 h-24 text-blue-200" />;
    case 'Rain':
      return <CloudRain className="w-24 h-24 text-blue-400" />;
    case 'Clouds':
      return <Cloud className="w-24 h-24 text-gray-300" />;
    case 'Mist':
      return <CloudMist className="w-24 h-24 text-gray-400" />;
    case 'Drizzle':
      return <CloudDrizzle className="w-24 h-24 text-blue-300" />;
    default:
      return <Cloud className="w-24 h-24 text-gray-300" />;
  }
};

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  return (
    <div className="mt-8 text-white">
      <div className="flex flex-col items-center">
        {getWeatherIcon(weather.condition)}
        <h2 className="text-6xl font-bold mt-4">{weather.temp}°C</h2>
        <h3 className="text-3xl mt-2">{weather.city}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
          <Droplets className="w-8 h-8 text-blue-300" />
          <div>
            <p className="text-lg font-semibold">{weather.humidity}%</p>
            <p className="text-sm text-white/70">湿度</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
          <Wind className="w-8 h-8 text-green-300" />
          <div>
            <p className="text-lg font-semibold">{weather.windSpeed} km/h</p>
            <p className="text-sm text-white/70">风速</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white/10 rounded-xl p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-white/70">最低温度</p>
            <p className="text-lg font-semibold">{weather.tempMin}°C</p>
          </div>
          <div>
            <p className="text-sm text-white/70">最高温度</p>
            <p className="text-lg font-semibold">{weather.tempMax}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
}