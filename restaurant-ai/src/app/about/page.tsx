import React from "react";
import { ChefHat, BrainCircuit, Database, Code, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl min-h-[calc(100vh-4rem)]">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">About RestaurantAI</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          An AI-powered restaurant discovery platform built to analyze dining sentiment using real data and Machine Learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">The Project</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            RestaurantAI is a portfolio project designed to demonstrate the power of Machine Learning in the food industry. By leveraging the comprehensive <strong>Kaggle Zomato Dataset</strong>, we've trained custom ML models to extract true sentiment and quality signals from thousands of real customer reviews.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            Developed by <strong>Rahul</strong>, this platform bridges the gap between raw data and actionable dining choices, ensuring food lovers don't have to gamble with their restaurant choices or read through endless comments.
          </p>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 grid grid-cols-2 gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="space-y-3 z-10">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm text-primary">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">Real Dataset</h3>
            <p className="text-sm text-gray-500">Built using 10,000+ real reviews from the Zomato Kaggle dataset.</p>
          </div>
          
          <div className="space-y-3 z-10">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm text-blue-500">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">ML Powered</h3>
            <p className="text-sm text-gray-500">Utilizes LightGBM and TF-IDF for advanced sentiment analysis.</p>
          </div>
          
          <div className="space-y-3 z-10">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm text-indigo-500">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">Modern Stack</h3>
            <p className="text-sm text-gray-500">FastAPI backend paired with a dynamic Next.js React frontend.</p>
          </div>

          <div className="space-y-3 z-10">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm text-rose-500">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">Creator</h3>
            <p className="text-sm text-gray-500">Developed with passion by Rahul.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
