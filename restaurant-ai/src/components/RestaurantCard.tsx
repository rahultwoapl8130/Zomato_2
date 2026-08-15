"use client";

import Link from "next/link";
import { Star, MapPin, TrendingUp, Heart, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { Restaurant } from "@/lib/mock-data";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { favourites, toggleFavourite, user } = useAuth();
  const isFav = favourites.includes(restaurant.id);

  return (
    <div className="relative group">
      <Link href={`/restaurants/${restaurant.id}`}>
        <div className="rounded-2xl border border-border/50 bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/50 transition-all overflow-hidden h-full flex flex-col">
        <div className="aspect-[4/3] w-full overflow-hidden relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={restaurant.image || restaurant.imageUrl} 
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm">
            <span>{restaurant.rating}</span>
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
          </div>
          <div className="absolute bottom-3 right-3 bg-primary/90 text-primary-foreground backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm" title="Based on real customer feedback %">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>AI Score: {restaurant.sentimentScore}% Positive</span>
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{restaurant.name}</h3>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            {restaurant.cuisines.join(", ")}
          </p>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-auto pt-4 border-t border-border/50">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{restaurant.location}</span>
            <span className="ml-auto font-medium text-foreground">₹{restaurant.costForTwo} for two</span>
          </div>
        </div>
        </div>
      </Link>
      
      {/* Favourite Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavourite(restaurant.id);
        }}
        className={`absolute top-3 left-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all ${
          isFav ? 'bg-primary text-primary-foreground shadow-md' : 'bg-background/80 text-muted-foreground hover:bg-background shadow-sm hover:text-primary'
        }`}
      >
        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
      </button>

      {/* External Zomato Link Button */}
      {restaurant.link && restaurant.link != 'nan' && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(restaurant.link, '_blank');
          }}
          className="absolute bottom-[110px] left-3 z-10 p-2 bg-background/80 text-muted-foreground hover:bg-background hover:text-primary rounded-full backdrop-blur-sm transition-all shadow-sm"
          title="View on Zomato"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
