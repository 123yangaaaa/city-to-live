import React from 'react';
import { WeatherData, SortOption } from '../types';
import { Clock, ThermometerSun, MapPin } from 'lucide-react';

interface SearchHistoryProps {
  history: WeatherData[];
  onSelect: (city: string) => void;
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
}

export default function SearchHistory({ history, onSelect, sortBy, onSortChange }: SearchHistoryProps) {
  if (history.length === 0) return null;

  const getSortIcon = (option: SortOption) => {
    switch (option) {
      case 'time':
        return <Clock className="w-4 h-4" />;
      case 'temp':
        return <ThermometerSun className="w-4 h-4" />;
      case 'city':
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">搜索历史</h3>
        <div className="flex gap-2">
          {(['time', 'temp', 'city'] as SortOption[]).map((option) => (
            <button
              key={option}
              onClick={() => onSortChange(option)}
              className={`p-2 rounded-lg flex items-center gap-2 text-sm ${
                sortBy === option
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:bg-white/10'
              }`}
            >
              {getSortIcon(option)}
              {option === 'time' && '时间'}
              {option === 'temp' && '温度'}
              {option === 'city' && '城市'}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid gap-3">
        {history.map((item) => (
          <button
            key={`${item.city}-${item.timestamp}`}
            onClick={() => onSelect(item.city)}
            className="w-full bg-white/10 rounded-xl p-4 text-left hover:bg-white/20 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium">{item.city}</h4>
                <p className="text-white/60 text-sm">
                  {new Date(item.timestamp!).toLocaleString('zh-CN')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{item.temp}°C</p>
                <p className="text-white/60 text-sm">{item.condition}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}