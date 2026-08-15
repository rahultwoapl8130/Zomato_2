"use client";

import { useState } from "react";
import { RestaurantAPI } from "@/lib/api/restaurants";
import { Brain, Send, Star, AlertCircle } from "lucide-react";

export default function PredictPage() {
  const [reviewText, setReviewText] = useState("");
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!reviewText.trim()) {
      setError("Please enter a review to analyze.");
      return;
    }

    setIsPredicting(true);
    setError("");
    setResult(null);

    try {
      const data = await RestaurantAPI.predictRating(reviewText);
      setResult(data);
    } catch (err) {
      setError("Failed to get prediction from our AI model. Please try again.");
      console.error(err);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="container py-12 max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <Brain className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">AI Sentiment Predictor</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Test our machine learning pipeline. Paste a restaurant review below, and our model will predict the sentiment, rating, and highlight the key factors driving the score.
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 mb-8">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="e.g., 'The food was amazing, but the service was a bit slow. The ambience is nice though.'"
          className="w-full min-h-[150px] p-4 rounded-xl border border-input bg-background resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
        />
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Try pasting real Zomato reviews.</p>
          <button
            onClick={handlePredict}
            disabled={isPredicting}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {isPredicting ? "Analyzing..." : "Predict Rating"}
            <Send className="w-4 h-4" />
          </button>
        </div>
        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            Prediction Results
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-card rounded-2xl border border-border/50 p-6 text-center shadow-sm">
              <p className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wider">Predicted Rating</p>
              <div className="text-5xl font-extrabold text-primary">{result.prediction}</div>
              <p className="text-sm text-muted-foreground mt-2">out of 5.0</p>
            </div>
            
            <div className="bg-card rounded-2xl border border-border/50 p-6 text-center shadow-sm">
              <p className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wider">Sentiment Class</p>
              <div className={`text-3xl font-bold mt-2 ${
                result.sentiment === 'Positive' ? 'text-green-500' : 
                result.sentiment === 'Negative' ? 'text-rose-500' : 'text-yellow-500'
              }`}>
                {result.sentiment}
              </div>
            </div>
            
            <div className="bg-card rounded-2xl border border-border/50 p-6 text-center shadow-sm">
              <p className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wider">Confidence Score</p>
              <div className="text-4xl font-bold mt-1 text-primary/80">{result.confidence}%</div>
              <p className="text-xs text-muted-foreground mt-2">Model: {result.model}</p>
            </div>
          </div>
          
          {result.explainability && result.explainability.length > 0 && (
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">SHAP Explainability Factors</h3>
              <div className="space-y-3">
                {result.explainability.map((factor: any, i: number) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">{factor.feature}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      factor.impact === '+' ? 'bg-green-500/10 text-green-600' : 'bg-rose-500/10 text-rose-600'
                    }`}>
                      {factor.impact === '+' ? 'Positive Impact' : 'Negative Impact'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
