import { fetchAPI } from './client';
import { Restaurant, Review } from '../mock-data';

export interface DashboardData {
  top5: Restaurant[];
  bottom5: Restaurant[];
  reviews: Review[];
  sentimentData: any[];
  cuisineData: any[];
}

export const RestaurantAPI = {
  getRestaurants: () => fetchAPI<Restaurant[]>('/api/restaurants'),
  
  getRestaurantById: (id: string) => fetchAPI<Restaurant & { reviews: Review[] }>(`/api/restaurants/${id}`),
  
  // Analytics API
  getModelInfo: () => fetchAPI('/api/model-info'),

  getAnalyticsOverview: () => fetchAPI('/api/analytics/overview'),

  getAnalyticsSentiment: () => fetchAPI('/api/analytics/sentiment'),

  getAnalyticsCuisines: () => fetchAPI('/api/analytics/cuisines'),

  getAnalyticsKeywords: () => fetchAPI('/api/analytics/keywords'),

  getDashboardFeed: () => fetchAPI('/api/analytics/dashboard-feed'),
  
  predictRating: (reviewText: string, restaurantName?: string) => 
    fetchAPI<any>('/api/predict', {
      method: 'POST',
      body: JSON.stringify({ text: reviewText, restaurant: restaurantName })
    })
};
