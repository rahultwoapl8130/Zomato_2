"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { Star, MapPin, Check, X, Clock, Navigation, Phone, Info, Loader2, Heart, Menu as MenuIcon, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { RestaurantAPI } from "@/lib/api/restaurants";

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { user, favourites, toggleFavourite } = useAuth();
  
  const isFav = favourites.includes(id);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await RestaurantAPI.getRestaurantById(id);
        if (data && !(data as any).error) {
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
              <div 
                className="bg-background/20 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold"
                title={`Based on ${restaurant.reviews?.length || 0} real reviews`}
              >
                {restaurant.sentimentScore}%
                <span className="text-xs font-normal opacity-80 block ml-1 text-center">Positive AI Sentiment</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => toggleFavourite(id)}
            className={`absolute top-6 right-6 z-10 p-3 rounded-full backdrop-blur-md transition-all ${
              isFav ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-background/60 text-white hover:bg-background/90 shadow-md hover:text-primary'
            }`}
          >
            <Heart className={`w-6 h-6 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-6 mx-auto max-w-7xl">
        {/* Tabs Navigation */}
        <div className="flex space-x-6 border-b border-border/50 mb-8 overflow-x-auto pb-1">
          {['overview', 'menu', 'reviews', 'map'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {activeTab === 'overview' && (
              <div className="space-y-8">
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
              </div>
            )}

            {activeTab === 'menu' && (
              <section className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MenuIcon className="w-6 h-6 text-primary" /> Menu
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {restaurant.menu?.map((item: any) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-border/50 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer relative overflow-hidden group">
                      <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        
                        {/* Dish Sentiment Tag */}
                        {item.aiTag && (
                          <div className={`absolute bottom-0 left-0 right-0 text-[10px] font-bold text-center py-1 text-white backdrop-blur-md ${
                            item.aiTag.includes('Must Try') ? 'bg-green-600/90' : 
                            item.aiTag.includes('Avoid') ? 'bg-red-600/90' : 'bg-gray-800/80'
                          }`}>
                            {item.aiTag}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm leading-tight pr-2">{item.name}</h4>
                          {item.dishSentimentScore && (
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                              item.dishSentimentScore >= 80 ? 'bg-green-100 text-green-700' :
                              item.dishSentimentScore <= 40 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {item.dishSentimentScore}%
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{item.description}</p>
                        <div className="font-semibold text-primary mt-auto pt-2">₹{item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'map' && (
              <section className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm h-[500px] flex flex-col">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Navigation className="w-6 h-6 text-primary" /> Location
                </h2>
                <div className="flex-1 bg-muted rounded-xl relative overflow-hidden">
                  {/* Fake map representation */}
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/90 p-4 rounded-xl shadow-lg border border-border/50 max-w-xs text-center backdrop-blur-sm">
                      <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="font-bold">{restaurant.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{restaurant.location}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'reviews' && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Info className="w-6 h-6 text-primary" /> AI Analyzed Reviews
                </h2>
                
                {/* AI Sentiment Summary Box */}
                {restaurant.aiSummary && (
                  <div className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl shadow-sm">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary fill-current" /> 
                      AI Sentiment Analysis
                    </h3>
                    
                    {restaurant.sentimentDistribution && (
                      <div className="flex w-full h-3 bg-muted rounded-full overflow-hidden mb-4">
                        <div className="bg-green-500 h-full" style={{ width: `${restaurant.sentimentDistribution.positive}%` }} title={`Positive: ${restaurant.sentimentDistribution.positive}%`}></div>
                        <div className="bg-yellow-500 h-full" style={{ width: `${restaurant.sentimentDistribution.neutral}%` }} title={`Neutral: ${restaurant.sentimentDistribution.neutral}%`}></div>
                        <div className="bg-red-500 h-full" style={{ width: `${restaurant.sentimentDistribution.negative}%` }} title={`Negative: ${restaurant.sentimentDistribution.negative}%`}></div>
                      </div>
                    )}
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {restaurant.aiSummary}
                    </p>
                    
                    {restaurant.sentimentDistribution && (
                      <div className="flex gap-4 mt-4 text-xs font-semibold text-muted-foreground">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> {restaurant.sentimentDistribution.positive}% Positive</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> {restaurant.sentimentDistribution.neutral}% Neutral</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> {restaurant.sentimentDistribution.negative}% Negative</div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {restaurant.reviews?.length || 0} real reviews from Zomato dataset.
                </div>
                
                <div className="space-y-4">
                  {restaurant.reviews && restaurant.reviews.length > 0 ? (
                    restaurant.reviews.map((review: any) => (
                      <div key={review.id} className="bg-card border border-border/50 rounded-xl p-5 shadow-sm hover:border-primary/30 transition-colors">
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
            )}
          </div>
          
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm sticky top-20">
            <h3 className="font-bold text-lg mb-4">Actions</h3>
            <div className="space-y-3">
              {restaurant.link && restaurant.link != 'nan' && (
                <button 
                  onClick={() => window.open(restaurant.link, '_blank')}
                  className="w-full bg-[#E23744] hover:bg-[#cb202d] text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <ExternalLink className="w-4 h-4" /> View on Zomato
                </button>
              )}
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-md">
                <Navigation className="w-4 h-4" /> Get Directions
              </button>
              <button className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Call Restaurant
              </button>
            </div>
            
            {restaurant.aiSummary && (
              <>
                <hr className="my-6 border-border/50" />
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <h4 className="font-bold text-primary mb-2 text-sm flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" /> AI Verdict
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                    {restaurant.aiSummary}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}
