export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  cuisines: string[];
  cost: string;
  collections: string[];
  timings: string;
  rating: number;
  reviewCount: number;
  image: string;
}

// In the next milestone, this will be replaced by the FastAPI fetch:
// const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const mockRestaurants: Restaurant[] = [
  {
    id: "rest-1",
    slug: "beyond-flavours",
    name: "Beyond Flavours",
    cuisines: ["Chinese", "Continental", "Kebab", "European", "South Indian", "North Indian"],
    cost: "800",
    collections: ["Food Hygiene Rated Restaurants in Hyderabad", "Corporate Favorites", "Great Buffets"],
    timings: "12noon to 3:30pm, 6:30pm to 11:30pm (Mon-Sun)",
    rating: 4.8,
    reviewCount: 1205,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "rest-2",
    slug: "paradise",
    name: "Paradise",
    cuisines: ["Biryani", "North Indian", "Chinese"],
    cost: "800",
    collections: ["Legendary Outlets", "Best Biryani"],
    timings: "11am to 11pm (Mon-Sun)",
    rating: 4.2,
    reviewCount: 4500,
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "rest-3",
    slug: "bawarchi",
    name: "Bawarchi",
    cuisines: ["Biryani", "North Indian", "Chinese", "Mughlai"],
    cost: "750",
    collections: ["Legendary Outlets"],
    timings: "11:30am to 11:30pm (Mon-Sun)",
    rating: 4.5,
    reviewCount: 3200,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800"
  }
];

export async function getRestaurants(): Promise<Restaurant[]> {
  // Simulating network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRestaurants), 500);
  });
}

export async function getRestaurantBySlug(slug: string): Promise<Restaurant | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRestaurants.find(r => r.slug === slug));
    }, 500);
  });
}
