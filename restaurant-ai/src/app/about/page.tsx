import React from "react";
import { ChefHat, BrainCircuit, Globe, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl min-h-[calc(100vh-4rem)]">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">About RestaurantAI</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          We combine cutting-edge artificial intelligence with vast dining data to revolutionize how you discover food.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Finding the right restaurant shouldn't be a gamble. We built RestaurantAI to help food lovers make data-driven dining choices. By analyzing thousands of restaurants and real customer reviews using Machine Learning, we extract true sentiment and quality signals so you don't have to read through endless comments.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 grid grid-cols-2 gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="space-y-3 z-10">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm text-primary">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">Extensive Data</h3>
            <p className="text-sm text-gray-500">Coverage across top cities worldwide.</p>
          </div>
          
          <div className="space-y-3 z-10">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm text-blue-500">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">AI Powered</h3>
            <p className="text-sm text-gray-500">Advanced sentiment analysis models.</p>
          </div>
          
          <div className="space-y-3 z-10">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm text-green-500">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">User Centric</h3>
            <p className="text-sm text-gray-500">Designed for the best user experience.</p>
          </div>

          <div className="space-y-3 z-10">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm text-amber-500">
              <ChefHat className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">Quality Food</h3>
            <p className="text-sm text-gray-500">Focus on highly rated cuisines.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
