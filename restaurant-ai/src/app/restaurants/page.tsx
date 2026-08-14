"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, Check, Loader2 } from "lucide-react";
import { RestaurantCard } from "@/components/RestaurantCard";

export default function RestaurantsPage() {
  const [allRestaurants, setAllRestaurants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating-desc");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/restaurants');
        const data = await res.json();
        setAllRestaurants(data);
      } catch (err) {
        console.error("Failed to fetch restaurants", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Get unique cuisines
  const allCuisines = ["All", ...Array.from(new Set(allRestaurants.flatMap(r => r.cuisines)))].sort();

  // Filter and sort logic
  const filteredRestaurants = allRestaurants
    .filter(r => {
      // Search filter
      if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase()) && !r.cuisines.join(" ").toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Cuisine filter
      if (selectedCuisine !== "All" && !r.cuisines.includes(selectedCuisine)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating-desc": return b.rating - a.rating;
        case "ai-desc": return b.sentimentScore - a.sentimentScore;
        case "cost-asc": return a.costForTwo - b.costForTwo;
        case "cost-desc": return b.costForTwo - a.costForTwo;
        default: return 0;
      }
    });

  if (isLoading) {
    return <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-lg font-medium">Loading 100+ Real Restaurants...</span>
    </div>;
  }

  return (
    <div className="container px-4 md:px-6 py-8 mx-auto max-w-7xl flex flex-col md:flex-row gap-6">
      
      {/* Sidebar Filters (Desktop) / Expandable (Mobile) */}
      <div className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
        <div className="sticky top-20 space-y-6 bg-card border border-border/50 p-5 rounded-2xl">
          
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" /> Sort By
            </h3>
            <div className="space-y-2">
              {[
                { id: "rating-desc", label: "Rating (High to Low)" },
                { id: "ai-desc", label: "AI Sentiment (Highest)" },
                { id: "cost-asc", label: "Cost (Low to High)" },
                { id: "cost-desc", label: "Cost (High to Low)" }
              ].map(option => (
                <label key={option.id} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${sortBy === option.id ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                    {sortBy === option.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <input type="radio" className="hidden" checked={sortBy === option.id} onChange={() => setSortBy(option.id)} />
                  <span className={`text-sm group-hover:text-primary ${sortBy === option.id ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-border/50 w-full" />

          <div>
            <h3 className="font-semibold mb-3">Cuisines</h3>
            <div className="flex flex-wrap gap-2 max-h-[400px] overflow-y-auto pr-2 pb-2">
              {allCuisines.map(cuisine => (
                <button 
                  key={cuisine}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    selectedCuisine === cuisine 
                    ? 'bg-primary border-primary text-primary-foreground font-medium shadow-sm' 
                    : 'bg-background border-border/60 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Explore Restaurants</h1>
            <p className="text-muted-foreground">Discover the best food and drinks based on AI analytics.</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Search restaurants or cuisines..."
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredRestaurants.length} restaurants from Zomato Data
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl border border-border/50 border-dashed bg-card/50">
            <h3 className="text-lg font-bold mb-2">No restaurants found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCuisine("All"); setSortBy("rating-desc"); }}
              className="text-primary text-sm font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
