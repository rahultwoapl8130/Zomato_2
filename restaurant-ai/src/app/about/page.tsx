import React from "react";
import { ChefHat, BrainCircuit, Database, Code, Heart, Bot, BarChart3, FastForward } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl min-h-[calc(100vh-4rem)]">
      <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">About <span className="text-primary">RestaurantAI</span></h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          An advanced food discovery platform that turns raw Zomato data into actionable dining insights using Machine Learning and Generative AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700 delay-150">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-primary" /> The Project
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            RestaurantAI is a high-performance portfolio project designed to demonstrate the power of Machine Learning and AI in the food tech industry. By leveraging a comprehensive <strong>Zomato Dataset of 26,000+ reviews</strong>, the platform analyzes true customer sentiment, tracks historical rating trends, and identifies the best dishes dynamically.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            Developed by <strong>Mr. Rahul Kumar</strong>, this platform bridges the gap between raw data and actionable dining choices. It features a custom-built <strong>RAG (Retrieval-Augmented Generation) Chatbot</strong> powered by Groq's blazing-fast Llama-3 models, ensuring food lovers can simply "chat" to find their perfect meal.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl border border-gray-200 grid grid-cols-2 gap-6 relative overflow-hidden shadow-lg animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="space-y-3 z-10 hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md text-primary">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">Big Data</h3>
            <p className="text-sm text-gray-500">Processing 26,000+ real customer reviews from Zomato via Python Pandas.</p>
          </div>
          
          <div className="space-y-3 z-10 hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md text-blue-500">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">Groq LLM</h3>
            <p className="text-sm text-gray-500">Custom RAG Chatbot powered by Llama-3 on Groq's high-speed LPU infrastructure.</p>
          </div>
          
          <div className="space-y-3 z-10 hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md text-indigo-500">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">Modern Stack</h3>
            <p className="text-sm text-gray-500">FastAPI backend paired with a dynamic Next.js + TailwindCSS React frontend.</p>
          </div>

          <div className="space-y-3 z-10 hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md text-emerald-500">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">Prescriptive Analytics</h3>
            <p className="text-sm text-gray-500">LightGBM + SMOTETomek modeling with SHAP Explainable AI and actionable business recommendations.</p>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-3xl p-8 sm:p-12 border border-primary/10 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why RestaurantAI?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Traditional restaurant platforms force users to scroll through hundreds of conflicting reviews. RestaurantAI solves this by summarizing the exact pros and cons, predicting sentiment trends over the years, and offering a personal AI assistant to instantly answer questions like <em>"Where can I get the best spicy biryani for a family dinner?"</em>
        </p>
        <div className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200 mt-4 text-gray-800 font-medium">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Developed with passion by Mr. Rahul Kumar
        </div>
      </div>
    </div>
  );
}
