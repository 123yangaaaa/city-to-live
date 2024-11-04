export interface WeatherData {
  temp: number;
  city: string;
  humidity: number;
  windSpeed: number;
  tempMin: number;
  tempMax: number;
  condition: string;
  timestamp?: number;
}

export interface CityInfo {
  name: string;
  country: string;
  description: string;
  population: number;
  attractions: {
    cultural: Array<{
      name: string;
      description: string;
      imageUrl: string;
    }>;
    natural: Array<{
      name: string;
      description: string;
      imageUrl: string;
    }>;
  };
  bestTimeToVisit: string;
  localCuisine: Array<{
    name: string;
    description: string;
  }>;
}

export type SortOption = 'time' | 'temp' | 'city';