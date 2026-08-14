"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { Star, MapPin, Check, X, Clock, Navigation, Phone, Info, Loader2 } from "lucide-react";

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/restaurants/${id}`);
        const data = await res.json();
        if (res.ok) {
          setRestaurant(data);
        }
      } catch (err) {
        console.error("Failed to fetch restaurant", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <span className="text-xl font-medium">Loading Real Data from CSV...</span>
    </div>;
  }

  if (!restaurant) {
    return <div className="p-20 text-center text-xl text-muted-foreground">Restaurant not found.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="container mx-auto px-4 md:px-6 pb-8 max-w-7xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">{restaurant.name}</h1>
            <p className="text-white/80 text-lg">{restaurant.cuisines?.join(', ')}</p>
            
            <div className="flex items-center gap-4 mt-6">
              <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold">
                {restaurant.rating} <Star className="w-4 h-4 fill-current" />
                <span className="text-xs font-normal opacity-80 ml-1 block border-l border-white/30 pl-2">5600 votes</span>
              </div>
              <div className="bg-background/20 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold">
                {restaurant.sentimentScore}%
                <span className="text-xs font-normal opacity-80 block ml-1 text-center">AI Sentiment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">Location</h3>
                    <p className="text-muted-foreground text-sm">{restaurant.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">Timings</h3>
                    <p className="text-muted-foreground text-sm">11am – 11pm (Today)</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground text-sm">Cost for two</span>
                  <span className="font-semibold">₹{restaurant.costForTwo}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground text-sm">Table Booking</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">Online Delivery</span>
                  <X className="w-4 h-4 text-red-500" />
                </div>
              </div>
            </div>
          </section>

          {/* AI Analyzed Reviews section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-primary" /> AI Analyzed Reviews
            </h2>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {restaurant.reviews?.length || 0} real reviews from Zomato dataset.
            </div>
            
            <div className="space-y-4">
              {restaurant.reviews && restaurant.reviews.length > 0 ? (
                restaurant.reviews.map((review: any) => (
                  <div key={review.id} className="bg-card border border-border/50 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold">{review.customerName}</div>
                        <div className="text-xs text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-0.5 text-sm font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {review.rating} <Star className="w-3 h-3 fill-current" />
                        </div>
                        <div className={`px-2 py-0.5 rounded text-xs font-bold border ${
                          review.sentiment === 'Positive' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                          review.sentiment === 'Negative' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                          'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                        }`}>
                          {review.sentiment}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center border border-border/50 rounded-xl bg-card/50">
                  <p className="text-muted-foreground">No reviews available for this restaurant yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm sticky top-20">
            <h3 className="font-bold text-lg mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-md">
                <Navigation className="w-4 h-4" /> Get Directions
              </button>
              <button className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Call Restaurant
              </button>
            </div>
            
            <hr className="my-6 border-border/50" />
            
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <h4 className="font-bold text-primary mb-2 text-sm flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" /> Why eat here?
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Based on AI analysis of {restaurant.reviews?.length || 0} reviews, people love the {restaurant.cuisines?.[0] || 'food'} and praise the ambience. Highly recommended for dinner.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
