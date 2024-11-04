import React from 'react';
import { CityInfo as CityInfoType } from '../types';
import { Users, Calendar, Utensils } from 'lucide-react';

interface CityInfoProps {
  cityInfo: CityInfoType;
}

export default function CityInfo({ cityInfo }: CityInfoProps) {
  return (
    <div className="mt-8 space-y-6">
      <div className="bg-white/10 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-2">{cityInfo.name}</h2>
        <p className="text-white/80">{cityInfo.description}</p>
        
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-white/60" />
            <span className="text-white/80">人口: {cityInfo.population.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">人文景观</h3>
        <div className="grid gap-4">
          {cityInfo.attractions.cultural.map((attraction, index) => (
            <div key={index} className="bg-white/10 rounded-xl overflow-hidden">
              <img
                src={attraction.imageUrl}
                alt={attraction.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-white">{attraction.name}</h4>
                <p className="text-white/80 mt-1">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">自然景观</h3>
        <div className="grid gap-4">
          {cityInfo.attractions.natural.map((attraction, index) => (
            <div key={index} className="bg-white/10 rounded-xl overflow-hidden">
              <img
                src={attraction.imageUrl}
                alt={attraction.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-white">{attraction.name}</h4>
                <p className="text-white/80 mt-1">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-white/60" />
            <h3 className="text-lg font-semibold text-white">最佳旅游时间</h3>
          </div>
          <p className="text-white/80">{cityInfo.bestTimeToVisit}</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Utensils className="w-5 h-5 text-white/60" />
            <h3 className="text-lg font-semibold text-white">特色美食</h3>
          </div>
          <div className="space-y-2">
            {cityInfo.localCuisine.map((cuisine, index) => (
              <div key={index}>
                <h4 className="text-white font-medium">{cuisine.name}</h4>
                <p className="text-white/80 text-sm">{cuisine.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}