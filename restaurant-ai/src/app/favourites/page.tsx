import React from "react";
import { Heart, Search } from "lucide-react";
import Link from "next/link";

export default function FavouritesPage() {
  // Currently showing a placeholder since user login/save functionality isn't built yet
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="flex flex-col items-center text-center space-y-6 max-w-md">
        <div className="p-6 bg-rose-50 rounded-full inline-block">
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500/20" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Your Favourites</h1>
        <p className="text-gray-500">
          You haven't saved any restaurants yet. Explore amazing places and hit the heart icon to save them here for quick access later!
        </p>
        <Link href="/restaurants">
          <button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2 mt-4 shadow-lg shadow-primary/30">
            <Search className="w-4 h-4" /> Explore Restaurants
          </button>
        </Link>
      </div>
    </div>
  );
}
