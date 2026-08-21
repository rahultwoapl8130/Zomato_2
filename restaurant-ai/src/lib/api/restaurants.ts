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
  getAnalyticsEvaluation: () => fetchAPI('/api/analytics/evaluation'),
  
  getMarketPositioning: () => fetchAPI('/api/analytics/positioning'),

  searchRecommendations: (query: string) => fetchAPI(`/api/recommendations/search?query=${encodeURIComponent(query)}`),

  getAnalyticsCuisines: () => fetchAPI('/api/analytics/cuisines'),

  getAnalyticsKeywords: () => fetchAPI('/api/analytics/keywords'),

  getDashboardFeed: () => fetchAPI('/api/analytics/dashboard-feed'),
  
  chatWithAI: (query: string, history: any[] = []) => 
    fetchAPI<any>('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ query, history })
    }),

  uploadB2BData: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch('/api/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json());
  },

  compareAnalytics: (id1: string, id2: string) => 
    fetchAPI<any>(`/api/analytics/compare?id1=${id1}&id2=${id2}`),

  predictRating: (reviewText: string, restaurantName?: string) => 
    fetchAPI<any>('/api/predict', {
      method: 'POST',
      body: JSON.stringify({ text: reviewText, restaurant: restaurantName })
    })
};
