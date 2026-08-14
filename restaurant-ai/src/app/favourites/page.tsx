"use client";

import React, { useEffect, useState } from "react";
import { Heart, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { RestaurantCard } from "@/components/RestaurantCard";

export default function FavouritesPage() {
  const { favourites, user } = useAuth();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedRestaurants() {
      if (favourites.length === 0) {
        setIsLoading(false);
        return;
      }
      
      try {
        const res = await fetch('https://zomato-3-hi4f.onrender.com/api/restaurants');
        const data = await res.json();
        // Filter out only the favourite ones
        const saved = data.filter((r: any) => favourites.includes(r.id));
        setRestaurants(saved);
      } catch (err) {
        console.error("Failed to fetch favourite restaurants", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSavedRestaurants();
  }, [favourites]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center text-center space-y-6 max-w-md">
          <div className="p-6 bg-muted rounded-full inline-block">
            <Heart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Login Required</h1>
          <p className="text-muted-foreground">
            Please login from the navbar to view and save your favourite restaurants.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg font-medium">Loading favourites...</span>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center text-center space-y-6 max-w-md">
          <div className="p-6 bg-rose-50 dark:bg-rose-950/20 rounded-full inline-block">
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500/20" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Your Favourites</h1>
          <p className="text-muted-foreground">
            You haven't saved any restaurants yet. Explore amazing places and hit the heart icon to save them here for quick access later!
          </p>
          <Link href="/restaurants">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2 mt-4 shadow-lg shadow-primary/30">
              <Search className="w-4 h-4" /> Explore Restaurants
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
        <h1 className="text-3xl font-bold tracking-tight">Your Favourites</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
