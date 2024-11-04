import axios from 'axios';

interface TripAdvisorData {
  cityName: string;
  attractions: Array<{
    name: string;
    rating: number;
    description: string;
    imageUrl: string;
  }>;
  restaurants: Array<{
    name: string;
    cuisine: string;
    rating: number;
  }>;
}

const APIFY_API_URL = 'https://api.apify.com/v2/acts/dbEyMBriog95Fv8CW/runs?token=apify_api_eQqFfuBygYAhQpugNhLkZRt9NVGvfw1Wickv';

export async function fetchTripAdvisorData(cityName: string): Promise<TripAdvisorData> {
  try {
    // Create the run
    const runResponse = await axios.post(APIFY_API_URL, {
      "query": cityName,
      "locationFullName": cityName,
      "maxItemsPerQuery": 5,
      "includeTags": true,
      "includeNearbyResults": false,
      "includeAttractions": true,
      "includeRestaurants": true,
      "includeHotels": false,
      "includeVacationRentals": false,
      "includePriceOffers": false,
      "includeAiReviewsSummary": false,
      "language": "en",
      "currency": "USD"
    });

    const runId = runResponse.data.data.id;

    // Poll for results
    let results = null;
    let attempts = 0;
    const maxAttempts = 30;

    while (!results && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const statusResponse = await axios.get(`https://api.apify.com/v2/acts/dbEyMBriog95Fv8CW/runs/${runId}?token=apify_api_eQqFfuBygYAhQpugNhLkZRt9NVGvfw1Wickv`);
      
      if (statusResponse.data.data.status === 'SUCCEEDED') {
        const datasetResponse = await axios.get(`https://api.apify.com/v2/datasets/${statusResponse.data.data.defaultDatasetId}/items?token=apify_api_eQqFfuBygYAhQpugNhLkZRt9NVGvfw1Wickv`);
        results = datasetResponse.data;
      }
      
      attempts++;
    }

    if (!results) {
      throw new Error('Failed to fetch results after maximum attempts');
    }

    return {
      cityName,
      attractions: results
        .filter((item: any) => item.type === 'ATTRACTION')
        .map((item: any) => ({
          name: item.name || '',
          rating: item.rating || 0,
          description: item.description || '',
          imageUrl: item.photoUrl || ''
        })),
      restaurants: results
        .filter((item: any) => item.type === 'RESTAURANT')
        .map((item: any) => ({
          name: item.name || '',
          cuisine: item.cuisine || [],
          rating: item.rating || 0
        }))
    };
  } catch (error) {
    console.error('Error fetching TripAdvisor data:', error);
    throw new Error('Failed to fetch city information');
  }
}