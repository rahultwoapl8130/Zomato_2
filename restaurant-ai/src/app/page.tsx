import Link from "next/link";
import { Search, MapPin, LineChart, TrendingUp, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-dot-white/[0.2] relative flex items-center justify-center">
          <div className="absolute inset-0 bg-background/80 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                  Discover Restaurants.<br />
                  Understand Reviews.<br />
                  Predict Sentiment.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  RestaurantAI combines restaurant information, customer reviews, and machine learning intelligence to provide unparalleled dining analytics.
                </p>
              </div>
              
              <div className="w-full max-w-sm space-y-2">
                <div className="flex rounded-full bg-white/5 p-1 border border-white/10 shadow-lg backdrop-blur-md">
                  <div className="flex items-center px-4 border-r border-white/10">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-400">Hyderabad</span>
                  </div>
                  <input 
                    className="flex-1 bg-transparent px-4 text-sm text-white focus:outline-none placeholder:text-gray-500" 
                    placeholder="Search for restaurant, cuisine or a dish..." 
                    type="text" 
                  />
                  <Link href="/restaurants">
                    <button className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                      Search
                    </button>
                  </Link>
                </div>
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
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Sentiment Prediction</h3>
                <p className="text-sm text-muted-foreground">Our ML model predicts the sentiment of reviews (Positive, Negative, Neutral) automatically.</p>
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
