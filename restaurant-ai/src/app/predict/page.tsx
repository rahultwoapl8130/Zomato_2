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
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 flex items-center justify-center gap-3">
          AI Sentiment Predictor
          <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary border border-primary/20">
            LightGBM + SMOTETomek
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Test our machine learning pipeline. Paste a restaurant review below, and our model will predict the sentiment, rating, and highlight the key factors driving the score.
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 mb-8">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="e.g., 'The food was amazing, but the service was a bit slow. The ambience is nice though.'"
          className="w-full min-h-[150px] p-4 rounded-xl border border-input bg-background resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 text-base mb-4"
        />
        
        {/* Quick Test Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setReviewText("The food was absolutely amazing and delicious, but the service was terrible and very slow.")} className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded-full transition-colors">
            Try Mixed Feedback
          </button>
          <button onClick={() => setReviewText("What a great place! Excellent food, perfect ambience, and awesome staff. Loved it!")} className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded-full transition-colors">
            Try Positive Review
          </button>
          <button onClick={() => setReviewText("Terrible experience. The food was cold and disgusting. Will never visit again.")} className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded-full transition-colors">
            Try Negative Review
          </button>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground hidden sm:block">Try pasting real Zomato reviews.</p>
          <button
            onClick={handlePredict}
            disabled={isPredicting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
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
            <div className="bg-card rounded-2xl border border-border/50 p-6 text-center shadow-sm flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wider">Predicted Rating</p>
              <div className="text-5xl font-extrabold text-primary">{result.prediction}</div>
              <p className="text-sm text-muted-foreground mt-2">out of 5.0</p>
            </div>
            
            <div className="bg-card rounded-2xl border border-border/50 p-6 text-center shadow-sm flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wider">Sentiment Class</p>
              <div className={`text-3xl font-bold mt-2 ${
                result.sentiment === 'Positive' ? 'text-green-500' : 
                result.sentiment === 'Negative' ? 'text-rose-500' : 'text-yellow-500'
              }`}>
                {result.sentiment}
              </div>
            </div>
            
            <div className="bg-card rounded-2xl border border-border/50 p-6 text-center shadow-sm flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground mb-4 font-medium uppercase tracking-wider">Confidence Score</p>
              
              {/* Animated Radial Gauge */}
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-muted" />
                  <circle 
                    cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" 
                    className="text-primary transition-all duration-1000 ease-out" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * result.confidence) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{result.confidence}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Model: {result.model}</p>
            </div>
          </div>
          
          {/* Keyword Highlighting Box */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm mb-6">
            <h3 className="font-bold text-lg mb-4">Review Analysis</h3>
            <div className="p-4 bg-background border border-border/50 rounded-xl text-lg leading-relaxed">
              {(() => {
                // Highlight words found in explainability
                let highlightedText = reviewText;
                if (result.explainability) {
                  result.explainability.forEach((factor: any) => {
                    if (factor.feature && factor.feature !== 'overall_tone') {
                      const regex = new RegExp(`\\b${factor.feature}\\b`, 'gi');
                      const colorClass = factor.impact === '+' ? 'bg-green-500/20 text-green-600 font-bold px-1 rounded' : 'bg-rose-500/20 text-rose-600 font-bold px-1 rounded';
                      highlightedText = highlightedText.replace(regex, `<span class="${colorClass}">$&</span>`);
                    }
                  });
                }
                return <div dangerouslySetInnerHTML={{ __html: highlightedText || "No review text provided." }} />;
              })()}
            </div>
          </div>

          {result.explainability && result.explainability.length > 0 && (
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">SHAP Explainability Factors (Feature Importance)</h3>
              <div className="space-y-4">
                {result.explainability.map((factor: any, i: number) => {
                  const weightPct = factor.weight ? Math.round(factor.weight * 100) : 50;
                  return (
                    <div key={i} className="flex flex-col gap-2 p-3 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium capitalize">{factor.feature.replace('_', ' ')}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          factor.impact === '+' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                        }`}>
                          {factor.impact === '+' ? 'Positive Impact' : 'Negative Impact'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-8">{weightPct}%</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${factor.impact === '+' ? 'bg-green-500' : 'bg-rose-500'}`}
                            style={{ width: `${weightPct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
