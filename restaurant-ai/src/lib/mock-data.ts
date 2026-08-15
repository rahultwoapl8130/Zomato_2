export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  votes: number;
  costForTwo: number;
  cuisines: string[];
  location: string;
  address: string;
  isBookTable: boolean;
  isOnlineDelivery: boolean;
  sentimentScore: number;
  reviewCount: number;
  imageUrl: string;
  image?: string;
  link?: string;
}

export interface Review {
  id: string;
  restaurantId: string;
  customerName: string;
  rating: number;
  text: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  date: string;
}

// Generate 20 mock restaurants based on Zomato style data
export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Biryani Blues",
    rating: 4.2,
    votes: 1205,
    costForTwo: 800,
    cuisines: ["Biryani", "North Indian", "Mughlai"],
    location: "Kondapur",
    address: "Plot 12, Whitefields, Kondapur, Hyderabad",
    isBookTable: true,
    isOnlineDelivery: true,
    sentimentScore: 85,
    reviewCount: 342,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "r2",
    name: "Paradise",
    rating: 4.5,
    votes: 8940,
    costForTwo: 1000,
    cuisines: ["Biryani", "Hyderabadi", "Desserts"],
    location: "Secunderabad",
    address: "SD Road, Paradise Circle, Secunderabad",
    isBookTable: false,
    isOnlineDelivery: true,
    sentimentScore: 92,
    reviewCount: 1520,
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "r3",
    name: "Truffles",
    rating: 4.6,
    votes: 4500,
    costForTwo: 900,
    cuisines: ["Cafe", "American", "Italian", "Burgers"],
    location: "Jubilee Hills",
    address: "Road No. 36, Jubilee Hills, Hyderabad",
    isBookTable: true,
    isOnlineDelivery: true,
    sentimentScore: 88,
    reviewCount: 890,
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop"
  },
  {
    id: "r4",
    name: "Bawarchi",
    rating: 4.1,
    votes: 7200,
    costForTwo: 700,
    cuisines: ["Biryani", "North Indian", "Chinese"],
    location: "RTC X Roads",
    address: "Beside Sandhya Theatre, RTC X Roads, Hyderabad",
    isBookTable: false,
    isOnlineDelivery: true,
    sentimentScore: 78,
    reviewCount: 1100,
    imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "r5",
    name: "Flechazo",
    rating: 4.3,
    votes: 3200,
    costForTwo: 1400,
    cuisines: ["Asian", "Mediterranean", "North Indian"],
    location: "Madhapur",
    address: "Sun Towers, Sector 1, Madhapur, Hyderabad",
    isBookTable: true,
    isOnlineDelivery: false,
    sentimentScore: 82,
    reviewCount: 540,
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "r6",
    name: "Absolute Barbecues",
    rating: 4.7,
    votes: 5600,
    costForTwo: 1600,
    cuisines: ["BBQ", "North Indian", "European"],
    location: "Banjara Hills",
    address: "Road No. 12, Banjara Hills, Hyderabad",
    isBookTable: true,
    isOnlineDelivery: false,
    sentimentScore: 94,
    reviewCount: 1250,
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "r7",
    name: "Pista House",
    rating: 4.2,
    votes: 4100,
    costForTwo: 500,
    cuisines: ["Bakery", "Desserts", "Biryani"],
    location: "Tolichowki",
    address: "Main Road, Tolichowki, Hyderabad",
    isBookTable: false,
    isOnlineDelivery: true,
    sentimentScore: 80,
    reviewCount: 620,
    imageUrl: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "r8",
    name: "Olive Bistro",
    rating: 4.4,
    votes: 2100,
    costForTwo: 2000,
    cuisines: ["Italian", "Mediterranean", "European"],
    location: "Jubilee Hills",
    address: "Durgam Cheruvu, Jubilee Hills, Hyderabad",
    isBookTable: true,
    isOnlineDelivery: false,
    sentimentScore: 89,
    reviewCount: 410,
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
  }
];

export const reviews: Review[] = [
  {
    id: "rev1",
    restaurantId: "r1",
    customerName: "Rahul Sharma",
    rating: 5,
    text: "The biryani was absolutely fantastic! Perfectly cooked meat and amazing spices.",
    sentiment: "Positive",
    date: "2026-08-10"
  },
  {
    id: "rev2",
    restaurantId: "r1",
    customerName: "Priya Singh",
    rating: 3,
    text: "Food was good but delivery was delayed by 30 minutes.",
    sentiment: "Neutral",
    date: "2026-08-12"
  },
  {
    id: "rev3",
    restaurantId: "r2",
    customerName: "Amit Kumar",
    rating: 5,
    text: "Classic paradise taste. Can never go wrong with their double masala biryani.",
    sentiment: "Positive",
    date: "2026-08-13"
  },
  {
    id: "rev4",
    restaurantId: "r3",
    customerName: "Neha Gupta",
    rating: 2,
    text: "Burgers were cold and soggy. Disappointed with the packaging.",
    sentiment: "Negative",
    date: "2026-08-11"
  },
  {
    id: "rev5",
    restaurantId: "r3",
    customerName: "Vikram Reddy",
    rating: 5,
    text: "Best burgers in town! The peri peri fries are a must try.",
    sentiment: "Positive",
    date: "2026-08-14"
  }
];

// Helper functions for data access
export const getRestaurants = () => restaurants;
export const getRestaurantById = (id: string) => restaurants.find(r => r.id === id);
export const getReviewsByRestaurantId = (id: string) => reviews.filter(r => r.restaurantId === id);

// Analytics Data
export const getSentimentTrends = () => [
  { month: 'Jan', positive: 65, negative: 15, neutral: 20 },
  { month: 'Feb', positive: 59, negative: 18, neutral: 23 },
  { month: 'Mar', positive: 80, negative: 10, neutral: 10 },
  { month: 'Apr', positive: 81, negative: 9, neutral: 10 },
  { month: 'May', positive: 76, negative: 14, neutral: 10 },
  { month: 'Jun', positive: 85, negative: 5, neutral: 10 },
];

export const getTopCuisines = () => [
  { name: 'Biryani', value: 45 },
  { name: 'North Indian', value: 25 },
  { name: 'Chinese', value: 15 },
  { name: 'Italian', value: 10 },
  { name: 'Desserts', value: 5 },
];
