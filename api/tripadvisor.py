from flask import Flask, request, jsonify
from apify_client import ApifyClient
import os

app = Flask(__name__)

@app.route('/api/tripadvisor', methods=['POST'])
def get_tripadvisor_data():
    data = request.json
    city_name = data.get('cityName')
    
    if not city_name:
        return jsonify({'error': 'City name is required'}), 400
    
    client = ApifyClient("apify_api_eQqFfuBygYAhQpugNhLkZRt9NVGvfw1Wickv")
    
    run_input = {
        "query": city_name,
        "locationFullName": city_name,
        "maxItemsPerQuery": 5,
        "includeTags": True,
        "includeNearbyResults": False,
        "includeAttractions": True,
        "includeRestaurants": True,
        "includeHotels": False,
        "includeVacationRentals": False,
        "includePriceOffers": False,
        "includeAiReviewsSummary": False,
        "language": "en",
        "currency": "USD"
    }
    
    try:
        run = client.actor("dbEyMBriog95Fv8CW").call(run_input=run_input)
        results = []
        
        for item in client.dataset(run["defaultDatasetId"]).iterate_items():
            results.append(item)
            
        return jsonify({
            'cityName': city_name,
            'attractions': [
                {
                    'name': item.get('name', ''),
                    'rating': item.get('rating', 0),
                    'description': item.get('description', ''),
                    'imageUrl': item.get('photoUrl', '')
                }
                for item in results if item.get('type') == 'ATTRACTION'
            ],
            'restaurants': [
                {
                    'name': item.get('name', ''),
                    'cuisine': item.get('cuisine', []),
                    'rating': item.get('rating', 0)
                }
                for item in results if item.get('type') == 'RESTAURANT'
            ]
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3001)