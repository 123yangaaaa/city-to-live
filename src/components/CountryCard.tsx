import React from 'react';
import type { Country } from '../data/countries';
import { ProgressBar } from './ProgressBar';

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={country.imageUrl}
          alt={country.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 text-4xl">
          {country.flag}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          {country.name}
        </h3>
        
        <p className="text-gray-600 mb-6">{country.description}</p>
        
        <div className="space-y-4">
          <ProgressBar label="生活成本" value={country.scores.costOfLiving} color="emerald" />
          <ProgressBar label="网络质量" value={country.scores.internet} color="blue" />
          <ProgressBar label="气候宜人" value={country.scores.climate} color="yellow" />
          <ProgressBar label="安全指数" value={country.scores.safety} color="red" />
          <ProgressBar label="人文风景" value={country.scores.culture} color="purple" />
          <ProgressBar label="自然风光" value={country.scores.nature} color="green" />
          <ProgressBar label="总体评分" value={country.scores.overall} color="indigo" isLarge />
        </div>
      </div>
    </div>
  );
}