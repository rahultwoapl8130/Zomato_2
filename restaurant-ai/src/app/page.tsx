import Link from "next/link";
import { Search, MapPin, ChefHat, LineChart, TrendingUp, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 lg:px-8 h-20 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tight">
          <ChefHat className="w-8 h-8" />
          <span>RestaurantAI</span>
        </div>
        <nav className="hidden md:flex gap-6 font-medium text-sm text-slate-600">
          <Link href="/restaurants" className="hover:text-primary transition-colors">Restaurants</Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <Link href="/dashboard/model" className="hover:text-primary transition-colors">Model Metrics</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 lg:px-8 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Discover Restaurants.<br/>
            <span className="text-primary-foreground/90">Understand Reviews.</span><br/>
            Predict Sentiment.
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            RestaurantAI combines restaurant information, customer reviews, and machine learning intelligence to provide unparalleled dining analytics.
          </p>
          
          <div className="bg-white p-3 rounded-full flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-2xl">
            <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-200">
              <MapPin className="w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Hyderabad" className="w-full bg-transparent text-slate-900 outline-none py-2" />
            </div>
            <div className="flex-[2] flex items-center px-4 gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Search for restaurant, cuisine or a dish..." className="w-full bg-transparent text-slate-900 outline-none py-2" />
            </div>
            <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">AI-Powered Review Intelligence</h2>
              <p className="text-slate-600 text-lg mb-8">
                Our LightGBM model processes natural language reviews utilizing TF-IDF and BERT embeddings to predict sentiment with high accuracy, helping businesses understand customer feedback at scale.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="bg-green-100 text-green-700 p-2 rounded-full"><TrendingUp className="w-5 h-5" /></div>
                  Track sentiment trends over time
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="bg-blue-100 text-blue-700 p-2 rounded-full"><LineChart className="w-5 h-5" /></div>
                  Analyze performance via Business Dashboard
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="bg-purple-100 text-purple-700 p-2 rounded-full"><Star className="w-5 h-5" /></div>
                  Discover highly rated local favorites
                </li>
              </ul>
              <Link href="/dashboard" className="text-primary font-semibold hover:underline flex items-center gap-2">
                Explore Analytics Dashboard &rarr;
              </Link>
            </div>
            <div className="flex-1 w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
               <div className="grid grid-cols-2 gap-6">
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                   <div className="text-slate-500 text-sm font-medium mb-1">Total Restaurants</div>
                   <div className="text-3xl font-bold text-slate-900">105</div>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                   <div className="text-slate-500 text-sm font-medium mb-1">Total Reviews</div>
                   <div className="text-3xl font-bold text-slate-900">10,000+</div>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                   <div className="text-slate-500 text-sm font-medium mb-1">Positive Sentiment</div>
                   <div className="text-3xl font-bold text-green-600">84%</div>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                   <div className="text-slate-500 text-sm font-medium mb-1">Average Rating</div>
                   <div className="text-3xl font-bold text-slate-900">4.1</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-slate-500 text-sm border-t bg-white">
        &copy; {new Date().getFullYear()} RestaurantAI. Powered by Machine Learning.
      </footer>
    </div>
  );
}
