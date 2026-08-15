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
  
  getDashboard: () => fetchAPI<DashboardData>('/api/dashboard'),
  
  predictRating: (reviewText: string, restaurantName?: string) => 
    fetchAPI<any>('/api/predict', {
      method: 'POST',
      body: JSON.stringify({ text: reviewText, restaurant: restaurantName })
    })
};
