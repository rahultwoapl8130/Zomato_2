import { notFound } from "next/navigation";
import { Star, MapPin, Check, X, ThumbsUp, MessageSquare, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getRestaurantById, getReviewsByRestaurantId } from "@/lib/mock-data";

export default async function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const restaurant = getRestaurantById(resolvedParams.id);
  
  if (!restaurant) {
    notFound();
  }

  const reviews = getReviewsByRestaurantId(resolvedParams.id);

  const getSentimentIcon = (sentiment: string) => {
    switch(sentiment) {
      case 'Positive': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'Negative': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case 'Positive': return "bg-green-500/10 text-green-500 border-green-500/20";
      case 'Negative': return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };

  return (
    <div className="container px-4 md:px-6 py-8 mx-auto max-w-5xl">
      {/* Header Section */}
      <div className="rounded-3xl overflow-hidden border border-border/50 bg-card mb-8">
        <div className="h-64 md:h-80 w-full relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={restaurant.imageUrl} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">{restaurant.name}</h1>
              <p className="text-gray-300 text-lg">{restaurant.cuisines.join(", ")}</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-primary px-4 py-2 rounded-xl text-primary-foreground flex flex-col items-center justify-center backdrop-blur-md">
                <div className="flex items-center gap-1 font-bold text-xl">
                  {restaurant.rating} <Star className="w-5 h-5 fill-current" />
                </div>
                <div className="text-xs opacity-80">{restaurant.votes} votes</div>
              </div>
              <div className="bg-background/20 border border-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white flex flex-col items-center justify-center">
                <div className="flex items-center gap-1 font-bold text-xl text-green-400">
                  {restaurant.sentimentScore}%
                </div>
                <div className="text-xs opacity-80">AI Sentiment</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8 bg-card flex flex-col md:flex-row justify-between gap-6 border-t border-border/50">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground">Location</h3>
                <p className="text-muted-foreground">{restaurant.address}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 min-w-[200px]">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Cost for two</span>
              <span className="font-semibold">₹{restaurant.costForTwo}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Table Booking</span>
              {restaurant.isBookTable ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Online Delivery</span>
              {restaurant.isOnlineDelivery ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">AI Analyzed Reviews</h2>
        </div>
        
        {reviews.length > 0 ? (
          <div className="grid gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-5 rounded-2xl border border-border/50 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{review.customerName}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs font-bold mr-2">
                        {review.rating} <Star className="w-3 h-3 ml-0.5 fill-current" />
                      </span>
                      {review.date}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getSentimentColor(review.sentiment)}`}>
                    {getSentimentIcon(review.sentiment)}
                    {review.sentiment}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl border border-border/50 border-dashed">
            <p className="text-muted-foreground">No reviews available for this restaurant yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
