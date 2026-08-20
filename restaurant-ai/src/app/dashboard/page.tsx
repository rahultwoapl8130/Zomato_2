"use client";

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line } from 'recharts';
import { Activity, TrendingUp, Users, DollarSign, Star, TrendingDown, Minus, Loader2, Target, Crosshair, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { RestaurantAPI } from '@/lib/api/restaurants';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          modelInfo,
          overview,
          sentiment,
          cuisines,
          keywords,
          feed,
          evaluation
        ] = await Promise.all([
          RestaurantAPI.getModelInfo(),
          RestaurantAPI.getAnalyticsOverview(),
          RestaurantAPI.getAnalyticsSentiment(),
          RestaurantAPI.getAnalyticsCuisines(),
          RestaurantAPI.getAnalyticsKeywords(),
          RestaurantAPI.getDashboardFeed(),
          RestaurantAPI.getAnalyticsEvaluation()
        ]);

        setData({
          modelInfo,
          overview,
          sentiment,
          cuisines,
          keywords,
          feed,
          evaluation
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  
  const COLORS = ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#ffe4e6'];

  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case 'Positive': return "bg-green-500/10 text-green-500 border-green-500/20";
      case 'Negative': return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };

  if (isLoading) {
    return <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <span className="text-xl font-medium">Analyzing Data for Dashboard...</span>
    </div>;
  }

  if (!data) return <div className="p-8 text-center">Failed to load analytics data.</div>;

  const { modelInfo, overview, sentiment, cuisines, keywords, feed } = data;

  return (
    <div className="container px-4 md:px-6 py-8 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            Advanced Analytics
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Groq LPU Online
            </span>
          </h1>
          <p className="text-muted-foreground">Monitor real-time ML model performance, live feeds, and sentiment leaderboards based on Real Data.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Reviews Analyzed</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{overview?.totalReviewsAnalyzed?.toLocaleString() || 0}</div>
          <p className="text-xs text-muted-foreground">From Kaggle Zomato Dataset</p>
        </div>
        
        {/* Updated Model Diagnostics Card */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-primary">Model Accuracy</h3>
            <Target className="h-4 w-4 text-primary" />
          </div>
          <div className="text-3xl font-extrabold text-primary">{modelInfo?.accuracy}%</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="bg-background rounded-md p-2 text-center border border-border/50 shadow-sm">
              <div className="text-[10px] text-muted-foreground uppercase font-bold">Precision</div>
              <div className="text-sm font-bold">{modelInfo?.precision}</div>
            </div>
            <div className="bg-background rounded-md p-2 text-center border border-border/50 shadow-sm">
              <div className="text-[10px] text-muted-foreground uppercase font-bold">Recall</div>
              <div className="text-sm font-bold">{modelInfo?.recall}</div>
            </div>
            <div className="bg-background rounded-md p-2 text-center border border-border/50 shadow-sm">
              <div className="text-[10px] text-muted-foreground uppercase font-bold">F1-Score</div>
              <div className="text-sm font-bold">{modelInfo?.f1Score}</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Restaurants</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{overview?.activeRestaurants?.toLocaleString() || 0}</div>
          <p className="text-xs text-muted-foreground">Real Dataset Loaded</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Avg Cost for Two</h3>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">₹{overview?.avgCostForTwo || 0}</div>
          <p className="text-xs text-muted-foreground">Across all listed restaurants</p>
        </div>
      </div>

      {/* Model Evaluation Metrics Section */}
      {evaluation && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" /> Model Evaluation Metrics
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Confusion Matrix (Simple visual representation) */}
            <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col">
              <h3 className="font-semibold mb-1">Confusion Matrix</h3>
              <p className="text-xs text-muted-foreground mb-4">True vs False Predictions</p>
              <div className="grid grid-cols-2 gap-2 flex-1">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-muted-foreground uppercase font-bold">True Pos</span>
                  <span className="text-xl font-bold text-green-500">{evaluation.confusionMatrix.truePositive}</span>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-muted-foreground uppercase font-bold">False Pos</span>
                  <span className="text-xl font-bold text-red-500">{evaluation.confusionMatrix.falsePositive}</span>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-muted-foreground uppercase font-bold">False Neg</span>
                  <span className="text-xl font-bold text-red-500">{evaluation.confusionMatrix.falseNegative}</span>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-muted-foreground uppercase font-bold">True Neg</span>
                  <span className="text-xl font-bold text-green-500">{evaluation.confusionMatrix.trueNegative}</span>
                </div>
              </div>
            </div>

            {/* ROC-AUC Curve */}
            <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col h-[250px]">
              <h3 className="font-semibold mb-1">ROC-AUC Curve</h3>
              <p className="text-xs text-muted-foreground mb-4">Receiver Operating Characteristic</p>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evaluation.rocAuc} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="fpr" type="number" domain={[0, 1]} tick={{fontSize: 10}} stroke="#888" />
                    <YAxis dataKey="tpr" type="number" domain={[0, 1]} tick={{fontSize: 10}} stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                    <Line type="monotone" dataKey="tpr" stroke="#10b981" strokeWidth={2} dot={false} name="Model" />
                    <Line type="linear" dataKey="fpr" stroke="#888" strokeDasharray="3 3" dot={false} name="Random" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Class Performance */}
            <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col">
              <h3 className="font-semibold mb-1">Class-wise Performance</h3>
              <p className="text-xs text-muted-foreground mb-4">Precision, Recall, F1-Score</p>
              <div className="space-y-3">
                {evaluation.classPerformance.map((c: any, i: number) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold">{c.class}</span>
                      <span className="text-xs text-muted-foreground">F1: {c.f1}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-muted rounded p-1 text-center">
                        <span className="text-[10px] text-muted-foreground block">Precision</span>
                        <span className="text-xs font-bold">{c.precision}</span>
                      </div>
                      <div className="bg-muted rounded p-1 text-center">
                        <span className="text-[10px] text-muted-foreground block">Recall</span>
                        <span className="text-xs font-bold">{c.recall}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Section */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-border/50 bg-green-500/5">
            <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-500"/> Top 5 Restaurants</h3>
            <p className="text-xs text-muted-foreground mt-1">Based on highest AI Sentiment Score</p>
          </div>
          <div className="p-0">
            {feed?.top5?.map((r: any, i: number) => (
              <Link href={`/restaurants/${r.id}`} key={r.id} className="flex items-center justify-between p-4 border-b border-border/50 hover:bg-muted/50 transition-colors last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 font-bold text-muted-foreground">#{i+1}</div>
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.location}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-green-500 font-bold">{r.sentimentScore}%</div>
                  <div className="text-xs flex items-center text-muted-foreground">{r.rating} <Star className="w-3 h-3 ml-0.5 fill-current"/></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-border/50 bg-red-500/5">
            <h3 className="font-semibold flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-500"/> Bottom 5 Restaurants</h3>
            <p className="text-xs text-muted-foreground mt-1">Based on lowest AI Sentiment Score</p>
          </div>
          <div className="p-0">
            {feed?.bottom5?.map((r: any, i: number) => (
              <Link href={`/restaurants/${r.id}`} key={r.id} className="flex items-center justify-between p-4 border-b border-border/50 hover:bg-muted/50 transition-colors last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 font-bold text-muted-foreground">#{i+1}</div>
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.location}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-red-500 font-bold">{r.sentimentScore}%</div>
                  <div className="text-xs flex items-center text-muted-foreground">{r.rating} <Star className="w-3 h-3 ml-0.5 fill-current"/></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {/* Live Feed */}
        <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden flex flex-col md:col-span-1 h-[400px]">
          <div className="p-5 border-b border-border/50 flex justify-between items-center bg-primary/5">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary animate-pulse"/> Live Review Feed
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Real-time ML analysis stream</p>
            </div>
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <div className="p-0 overflow-y-auto flex-1">
            {feed?.reviews?.map((review: any) => (
              <div key={review.id} className="p-4 border-b border-border/50 last:border-0 hover:bg-muted/30">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-sm">{review.customerName}</div>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${getSentimentColor(review.sentiment)}`}>
                    {review.sentiment}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{review.restaurant}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* TF-IDF Keywords Bar Chart */}
        <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden flex flex-col md:col-span-2 h-[400px]">
          <div className="p-5 border-b border-border/50 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Top Keywords Extracted (TF-IDF)</h3>
              <p className="text-xs text-muted-foreground mt-1">Machine Learning Feature Importance</p>
            </div>
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="p-6 flex-1 flex flex-col md:flex-row gap-6">
            <div className="flex-1 min-h-[250px]">
              <h4 className="text-green-500 font-semibold mb-2 text-sm text-center">Positive Drivers</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={keywords?.positive} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#333" />
                  <XAxis type="number" domain={[0, 1]} tick={false} axisLine={false} />
                  <YAxis dataKey="word" type="category" axisLine={false} tickLine={false} fontSize={12} stroke="#888" width={80} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} />
                  <Bar dataKey="weight" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 min-h-[250px]">
              <h4 className="text-red-500 font-semibold mb-2 text-sm text-center">Negative Drivers</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={keywords?.negative} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#333" />
                  <XAxis type="number" domain={[0, 1]} tick={false} axisLine={false} />
                  <YAxis dataKey="word" type="category" axisLine={false} tickLine={false} fontSize={12} stroke="#888" width={80} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} />
                  <Bar dataKey="weight" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-8 mb-8">
        {/* Main Chart */}
        <div className="rounded-xl border border-border/50 bg-card shadow-sm lg:col-span-3 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50">
            <h3 className="font-semibold leading-none tracking-tight">Sentiment Trend</h3>
            <p className="text-sm text-muted-foreground mt-1.5">Monthly breakdown predictions.</p>
          </div>
          <div className="p-6 flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sentiment?.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}/>
                <Bar dataKey="positive" name="Positive" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#eab308" />
                <Bar dataKey="negative" name="Negative" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cuisines Radar Chart */}
        <div className="rounded-xl border border-border/50 bg-card shadow-sm lg:col-span-3 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50 flex justify-between">
            <div>
              <h3 className="font-semibold leading-none tracking-tight">Cuisine Sentiment Matrix</h3>
              <p className="text-sm text-muted-foreground mt-1.5">Average AI sentiment score by cuisine.</p>
            </div>
            <Crosshair className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="p-6 flex-1 min-h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={cuisines?.radar}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="cuisine" tick={{ fill: '#888', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Sentiment Score" dataKey="sentiment" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.5} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart */}
        <div className="rounded-xl border border-border/50 bg-card shadow-sm lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50">
            <h3 className="font-semibold leading-none tracking-tight">Top Cuisines</h3>
            <p className="text-sm text-muted-foreground mt-1.5">Dataset distribution.</p>
          </div>
          <div className="p-6 flex-1 min-h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cuisines?.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {cuisines?.distribution?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
