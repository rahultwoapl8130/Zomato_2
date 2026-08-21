"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { Star, MapPin, Check, X, Clock, Navigation, Phone, Info, Loader2, Heart, Menu as MenuIcon, ExternalLink, Brain, Share2, ArrowLeft, ShieldAlert, AlertTriangle, Lightbulb, ChefHat, Plus, ThumbsUp, ThumbsDown, Filter, Search, Users, TrendingUp, FileDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { RestaurantAPI } from "@/lib/api/restaurants";

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [reviewFilter, setReviewFilter] = useState('All');
  const [reviewSearch, setReviewSearch] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: 'Guest', rating: 5, text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, favourites, toggleFavourite } = useAuth();
  
  const isFav = favourites.includes(id);

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

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAddReview = async () => {
    if (!newReview.text) return;
    setIsSubmitting(true);
    try {
      await fetch(`https://zomato-3-hi4f.onrender.com/api/restaurants/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: newReview.name,
          rating: newReview.rating,
          text: newReview.text
        })
      });
      // Refresh real data to show live AI updates
      await fetchData();
      setIsReviewModalOpen(false);
      setNewReview({ name: 'Guest', rating: 5, text: '' });
    } catch(e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {/* Dark overlay for better text contrast while keeping the image visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="container mx-auto px-4 md:px-6 pb-10 max-w-7xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 tracking-tight drop-shadow-md">{restaurant.name}</h1>
            <p className="text-white/90 text-lg md:text-xl font-medium drop-shadow-sm">{restaurant.cuisines?.join(', ')}</p>
            
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <div className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-primary/20">
                <span className="text-lg">{restaurant.rating}</span>
                <Star className="w-5 h-5 fill-current" />
                <span className="text-xs font-normal opacity-90 ml-1 border-l border-white/30 pl-2">
                  {restaurant.totalReviews ? restaurant.totalReviews.toLocaleString() : '5,600'} total ratings • AI analyzed {restaurant.reviews?.length || 100} recent reviews
                </span>
              </div>
              
              <div 
                className="bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg"
                title={`Based on ${restaurant.reviews?.length || 0} real reviews`}
              >
                <span className="text-lg text-green-400">{restaurant.sentimentScore}%</span>
                <span className="text-xs font-medium opacity-90 ml-1">Positive AI Sentiment</span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-6 right-6 z-10 flex gap-3">
            <button 
              onClick={() => {
                window.print();
              }}
              className="px-4 py-2 bg-black/40 text-white border border-white/20 rounded-full backdrop-blur-md hover:bg-black/60 shadow-md transition-all flex items-center gap-2 text-sm font-medium"
              title="Download Executive PDF Report"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
            <button 
              onClick={() => toggleFavourite(id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all flex items-center justify-center ${
                isFav ? 'bg-primary text-white shadow-lg' : 'bg-black/40 text-white border border-white/20 hover:bg-black/60 shadow-md hover:text-primary'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
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

          {/* AI Pros & Cons Section */}
          {(restaurant.pros?.length > 0 || restaurant.cons?.length > 0) && (
            <section className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" /> AI Review Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurant.pros?.length > 0 && (
                  <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
                    <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4" /> Loved by customers
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.pros.map((pro: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-green-500/10 text-green-700 text-sm font-medium rounded-full">
                          {pro}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {restaurant.cons?.length > 0 && (
                  <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/20">
                    <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                      <X className="w-4 h-4" /> Warned by AI
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.cons.map((con: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-red-500/10 text-red-700 text-sm font-medium rounded-full">
                          {con}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* AI Dish Insights Section */}
          {restaurant.dishInsights?.length > 0 && (
            <section className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" /> AI Dish Insights
              </h2>
              <div className="space-y-3">
                {restaurant.dishInsights.map((dish: any, i: number) => (
                  <div key={i} className="flex justify-between items-center p-3 border border-border/50 rounded-lg">
                    <span className="font-medium">{dish.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        dish.score >= 70 ? 'bg-green-100 text-green-700' :
                        dish.score <= 40 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {dish.score}% Positive
                      </span>
                      {dish.mentions && (
                        <span className="text-xs text-muted-foreground font-medium">· {dish.mentions} mentions</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AI Business Recommendations (Prescriptive Analytics) */}
          {restaurant.businessRecommendations?.length > 0 && (
            <section className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" /> Business Prescriptive Actions
              </h2>
              <div className="space-y-4">
                {restaurant.businessRecommendations.map((rec: any, i: number) => (
                  <div key={i} className="flex flex-col gap-2 p-4 border border-border/50 rounded-xl bg-muted/20">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                          rec.priority === 'High' ? 'bg-red-500/10 text-red-600 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20'
                        }`}>
                          {rec.priority} Priority
                        </span>
                        <span className="font-semibold">{rec.aspect}</span>
                      </div>
                      <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded">
                        {rec.negativeMentions}% Negative Mentions
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      <strong className="text-foreground">AI Recommendation:</strong> {rec.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
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
                  {/* Live Google Map embed based on restaurant name and location */}
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    loading="lazy" 
                    allowFullScreen 
                    referrerPolicy="no-referrer-when-downgrade" 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(restaurant.name + ' ' + restaurant.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    title={`Map showing location of ${restaurant.name}`}
                  ></iframe>
                </div>
              </section>
            )}

            {activeTab === 'reviews' && (
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Info className="w-6 h-6 text-primary" /> AI Analyzed Reviews
                  </h2>
                  <button onClick={() => setIsReviewModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-xl font-medium shadow-sm hover:bg-primary/90 transition-colors">
                    + Write a Review
                  </button>
                </div>
                
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
                
                {/* Aspect Analysis & AI Methodology */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {restaurant.aspectAnalysis && (
                    <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary fill-current" /> AI Aspect Analysis
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(restaurant.aspectAnalysis).map(([aspect, data]: [string, any]) => {
                          if (data.total === 0) return null;
                          const posPct = Math.round((data.pos / data.total) * 100);
                          const neuPct = Math.round((data.neu / data.total) * 100);
                          const negPct = Math.round((data.neg / data.total) * 100);
                          return (
                            <div key={aspect} className="space-y-1">
                              <div className="flex justify-between text-sm font-medium">
                                <span>{aspect}</span>
                                <div className="flex gap-3 text-xs text-muted-foreground">
                                  <span className="text-green-600">{posPct}% Pos</span>
                                  <span className="text-yellow-600">{neuPct}% Neu</span>
                                  <span className="text-red-600">{negPct}% Neg</span>
                                </div>
                              </div>
                              <div className="flex w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full" style={{ width: `${posPct}%` }}></div>
                                <div className="bg-yellow-500 h-full" style={{ width: `${neuPct}%` }}></div>
                                <div className="bg-red-500 h-full" style={{ width: `${negPct}%` }}></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* AI Methodology */}
                  <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" /> How AI Analyzed Reviews
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> <b>Sentiment Classification:</b> Processed via LLM & heuristics (1-5★ scale mapping).</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> <b>Keyword/Aspect Extraction:</b> NLP pattern matching on {restaurant.totalReviews || 100} reviews.</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> <b>Dish Mention Detection:</b> Food vocabulary scanning with exact match counting.</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> <b>Model:</b> Zomato Analytics Engine + Pandas.</li>
                    </ul>
                  </div>
                </div>

                {/* Customer Segmentation */}
                {restaurant.segmentation && restaurant.segmentation.length > 0 && (
                  <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm mb-8">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" /> Customer Vibe (Demographics)
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="flex-1 w-full space-y-3">
                        {restaurant.segmentation.map((seg: any) => (
                          <div key={seg.name} className="flex items-center gap-3">
                            <span className="w-24 text-sm font-medium">{seg.name}</span>
                            <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: `${seg.value}%` }}></div>
                            </div>
                            <span className="w-12 text-sm font-bold text-right">{seg.value}%</span>
                          </div>
                        ))}
                      </div>
                      <div className="w-full sm:w-1/3 bg-primary/5 p-4 rounded-xl text-center border border-primary/20">
                        <p className="text-xs text-muted-foreground font-medium mb-1">Top Audience</p>
                        <h4 className="text-xl font-bold text-primary">{restaurant.segmentation[0]?.name}</h4>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sentiment Trend Chart & Forecast */}
                {restaurant.trends && Object.keys(restaurant.trends).length > 0 && (
                  <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm mb-8">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" /> Review Sentiment Trend & Forecast
                    </h3>
                    <div className="flex gap-4 items-end h-40 pt-4 relative">
                      {Object.entries(restaurant.trends)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([year, data]: [string, any]) => {
                        const total = data.pos + data.neu + data.neg;
                        if (total === 0) return null;
                        const posHeight = Math.round((data.pos / total) * 100);
                        const negHeight = Math.round((data.neg / total) * 100);
                        return (
                          <div key={year} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative z-10">
                            <div className="absolute -top-12 bg-popover text-popover-foreground text-xs p-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {posHeight}% Positive<br/>{negHeight}% Negative
                            </div>
                            
                            <div className="w-full max-w-[40px] flex-1 bg-muted rounded-t-sm flex flex-col justify-end overflow-hidden">
                              <div className="w-full bg-green-500 transition-all" style={{ height: `${posHeight}%` }}></div>
                              <div className="w-full bg-red-500 transition-all" style={{ height: `${negHeight}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-muted-foreground">{year}</span>
                          </div>
                        );
                      })}
                      {restaurant.forecast && (
                        <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative z-10 border-l border-dashed border-border pl-4 ml-2">
                          <div className="absolute -top-12 bg-primary text-primary-foreground text-xs p-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                            AI Forecast: {restaurant.forecast.pos}% Positive
                          </div>
                          
                          <div className="w-full max-w-[40px] flex-1 bg-muted/50 border border-dashed border-primary/50 rounded-t-sm flex flex-col justify-end overflow-hidden opacity-80">
                            <div className="w-full bg-green-500 transition-all" style={{ height: `${restaurant.forecast.pos}%` }}></div>
                            <div className="w-full bg-red-500 transition-all" style={{ height: `${restaurant.forecast.neg}%` }}></div>
                          </div>
                          <span className="text-[10px] font-bold text-primary text-center leading-none">2026<br/>Est.</span>
                        </div>
                      )}
                      
                      {/* Dotted line to forecast */}
                      {restaurant.forecast && <div className="absolute top-1/2 left-0 w-full h-px border-t-2 border-dashed border-primary/30 z-0"></div>}
                    </div>
                  </div>
                )}

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex gap-2 p-1 bg-muted rounded-lg overflow-x-auto w-full sm:w-auto">
                    {['All', 'Positive', 'Neutral', 'Negative'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setReviewFilter(filter)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${reviewFilter === filter ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                  
                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="🔍 Search reviews..."
                      value={reviewSearch}
                      onChange={(e) => setReviewSearch(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {restaurant.reviews?.filter((r: any) => (reviewFilter === 'All' || r.sentiment === reviewFilter) && r.text.toLowerCase().includes(reviewSearch.toLowerCase())).length || 0} real reviews from Zomato dataset.
                </div>
                
                <div className="space-y-4">
                  {restaurant.reviews && restaurant.reviews.length > 0 ? (
                    restaurant.reviews
                      .filter((r: any) => reviewFilter === 'All' || r.sentiment === reviewFilter)
                      .filter((r: any) => r.text.toLowerCase().includes(reviewSearch.toLowerCase()))
                      .map((review: any) => (
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

      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-background w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Write a Review</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className={`p-2 rounded-lg transition-colors ${newReview.rating >= star ? 'bg-yellow-100 text-yellow-500' : 'bg-muted text-muted-foreground'}`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1.5">Your Name (Optional)</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  className="w-full border border-input rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Guest"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Your Review</label>
                <textarea
                  value={newReview.text}
                  onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                  className="w-full border border-input rounded-xl p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="How was the food and service?"
                ></textarea>
              </div>

              <button
                disabled={isSubmitting || !newReview.text}
                onClick={handleAddReview}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Review'}
              </button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Your review will be instantly analyzed by AI and will update the restaurant's live metrics.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
