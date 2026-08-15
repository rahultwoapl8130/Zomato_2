import Link from "next/link";
import { Search, MapPin, LineChart, TrendingUp, Star, ArrowRight, Brain, Database, BarChart3 } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import { RestaurantAPI } from "@/lib/api/restaurants";
import { RestaurantCard } from "@/components/RestaurantCard";

export const revalidate = 60; // revalidate every minute

export default async function Home() {
  let topRestaurants = [];
  try {
    const data = await RestaurantAPI.getDashboard();
    topRestaurants = data.top5 || [];
  } catch (error) {
    console.error("Failed to fetch top restaurants for home page", error);
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        <section className="w-full py-20 md:py-28 lg:py-36 bg-cover bg-center bg-no-repeat relative flex items-center justify-center" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  Discover Restaurants.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-500 drop-shadow-sm">Understand Reviews.</span><br />
                  Predict Sentiment.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed animate-in fade-in slide-in-from-bottom-5 duration-1000">
                  RestaurantAI combines restaurant information, customer reviews, and machine learning intelligence to provide unparalleled dining analytics.
                </p>
              </div>
              
              <div className="w-full max-w-sm space-y-2 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
                <HeroSearch />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Discovery</h3>
                <p className="text-sm text-muted-foreground">Find the perfect restaurant based on location, cuisine, and average cost.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Review Analytics</h3>
                <p className="text-sm text-muted-foreground">Dive deep into customer reviews and see what people really think.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Restaurant Intelligence</h3>
                <p className="text-sm text-muted-foreground">Comprehensive business intelligence dashboards for every restaurant.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Explainable AI</h3>
                <p className="text-sm text-muted-foreground">Don't just get a score. See exactly which factors drove the AI prediction.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top AI Recommended Restaurants */}
        {topRestaurants.length > 0 && (
          <section className="w-full py-16 bg-background">
            <div className="container px-4 md:px-6">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Top AI Recommended</h2>
                  <p className="text-muted-foreground">Restaurants with the highest positive sentiment scores based on real customer feedback.</p>
                </div>
                <Link href="/restaurants" className="hidden sm:flex items-center text-primary hover:underline font-medium">
                  View all <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {topRestaurants.slice(0, 4).map((restaurant: any) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How It Works Pipeline */}
        <section className="w-full py-20 bg-muted/30 border-y border-border/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">How RestaurantAI Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Our platform processes thousands of real reviews through our NLP pipeline to generate actionable insights.</p>
            </div>
            
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
              <div className="flex flex-col items-center text-center w-full md:w-1/4">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 shadow-inner">
                  <Database className="w-8 h-8 text-blue-500" />
                </div>
                <h4 className="font-bold">1. Dataset</h4>
                <p className="text-xs text-muted-foreground mt-2">10k+ Real Zomato Reviews</p>
              </div>
              
              <ArrowRight className="hidden md:block w-8 h-8 text-muted-foreground/30" />
              
              <div className="flex flex-col items-center text-center w-full md:w-1/4">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20 shadow-inner">
                  <Search className="w-8 h-8 text-purple-500" />
                </div>
                <h4 className="font-bold">2. NLP & TF-IDF</h4>
                <p className="text-xs text-muted-foreground mt-2">Keyword extraction & analysis</p>
              </div>
              
              <ArrowRight className="hidden md:block w-8 h-8 text-muted-foreground/30" />
              
              <div className="flex flex-col items-center text-center w-full md:w-1/4">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-4 border border-rose-500/20 shadow-inner">
                  <Brain className="w-8 h-8 text-rose-500" />
                </div>
                <h4 className="font-bold">3. LightGBM</h4>
                <p className="text-xs text-muted-foreground mt-2">Predictive rating modeling</p>
              </div>
              
              <ArrowRight className="hidden md:block w-8 h-8 text-muted-foreground/30" />
              
              <div className="flex flex-col items-center text-center w-full md:w-1/4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20 shadow-inner">
                  <BarChart3 className="w-8 h-8 text-emerald-500" />
                </div>
                <h4 className="font-bold">4. Insights</h4>
                <p className="text-xs text-muted-foreground mt-2">Explainable AI & Dashboards</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-6 bg-background border-t border-border/40">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <p className="text-xs text-muted-foreground">© 2026 RestaurantAI. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-xs text-muted-foreground hover:text-primary" href="#">Terms of Service</Link>
            <Link className="text-xs text-muted-foreground hover:text-primary" href="#">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
