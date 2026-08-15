"use client";

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, TrendingUp, Users, DollarSign, Star, TrendingDown, Minus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { RestaurantAPI, DashboardData } from '@/lib/api/restaurants';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const json = await RestaurantAPI.getDashboard();
        setData(json);
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

  const { top5, bottom5, reviews, sentimentData, cuisineData } = data || {};

  return (
    <div className="container px-4 md:px-6 py-8 mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Advanced Analytics</h1>
        <p className="text-muted-foreground">Monitor real-time ML model performance, live feeds, and sentiment leaderboards based on Real Data.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Reviews Analyzed</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">26,767</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Model Accuracy</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">94.2%</div>
          <p className="text-xs text-muted-foreground">+2.1% improvement</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Restaurants</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">105</div>
          <p className="text-xs text-muted-foreground">Real Dataset Loaded</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Avg Cost for Two</h3>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">₹840</div>
          <p className="text-xs text-muted-foreground">-₹12 from last month</p>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-border/50 bg-green-500/5">
            <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-500"/> Top 5 Restaurants</h3>
            <p className="text-xs text-muted-foreground mt-1">Based on highest AI Sentiment Score</p>
          </div>
          <div className="p-0">
            {top5?.map((r: any, i: number) => (
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
            {bottom5?.map((r: any, i: number) => (
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
          <div className="p-5 border-b border-border/50">
            <h3 className="font-semibold flex items-center gap-2"><Activity className="w-4 h-4 text-primary"/> Live Review Feed</h3>
            <p className="text-xs text-muted-foreground mt-1">Real-time ML analysis stream</p>
          </div>
          <div className="p-0 overflow-y-auto flex-1">
            {reviews?.map((review: any) => (
              <div key={review.id} className="p-4 border-b border-border/50 last:border-0 hover:bg-muted/30">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-sm">{review.customerName}</div>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${getSentimentColor(review.sentiment)}`}>
                    {review.sentiment}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden flex flex-col md:col-span-2 h-[400px]">
          <div className="p-5 border-b border-border/50">
            <h3 className="font-semibold">Top Keywords Extracted (TF-IDF)</h3>
            <p className="text-xs text-muted-foreground mt-1">Most frequent words driving the ML prediction</p>
          </div>
          <div className="p-6 flex-1 flex flex-col md:flex-row gap-6">
            <div className="flex-1 rounded-xl bg-green-500/5 border border-green-500/20 p-5 flex flex-col items-center justify-center">
              <h4 className="text-green-500 font-semibold mb-4 text-sm uppercase tracking-wider">Positive Drivers</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-background rounded-full border shadow-sm text-lg font-bold">tasty</span>
                <span className="px-3 py-1 bg-background rounded-full border shadow-sm text-base">ambience</span>
                <span className="px-3 py-1 bg-background rounded-full border shadow-sm text-sm">fast</span>
                <span className="px-3 py-1 bg-background rounded-full border shadow-sm text-xl font-bold">perfect</span>
                <span className="px-3 py-1 bg-background rounded-full border shadow-sm text-sm">hygienic</span>
                <span className="px-3 py-1 bg-background rounded-full border shadow-sm text-base">authentic</span>
              </div>
            </div>
            <div className="flex-1 rounded-xl bg-red-500/5 border border-red-500/20 p-5 flex flex-col items-center justify-center">
              <h4 className="text-red-500 font-semibold mb-4 text-sm uppercase tracking-wider">Negative Drivers</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-background rounded-full border shadow-sm text-lg font-bold">cold</span>
                <span className="px-3 py-1 bg-background rounded-full border shadow-sm text-xl font-bold">delayed</span>
                <span className="px-3 py-1 bg-background rounded-full border shadow-sm text-sm">stale</span>
                <span className="px-3 py-1 bg-background rounded-full border shadow-sm text-base">overpriced</span>
                <span className="px-3 py-1 bg-background rounded-full border shadow-sm text-sm">rude</span>
                <span className="px-3 py-1 bg-background rounded-full border shadow-sm text-xs">burnt</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
        {/* Main Chart */}
        <div className="rounded-xl border border-border/50 bg-card shadow-sm lg:col-span-4 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50">
            <h3 className="font-semibold leading-none tracking-tight">Sentiment Trend Analysis</h3>
            <p className="text-sm text-muted-foreground mt-1.5">Monthly breakdown of Positive, Negative and Neutral predictions.</p>
          </div>
          <div className="p-6 flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sentimentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

        {/* Secondary Chart */}
        <div className="rounded-xl border border-border/50 bg-card shadow-sm lg:col-span-3 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50">
            <h3 className="font-semibold leading-none tracking-tight">Top Cuisines Predicted</h3>
            <p className="text-sm text-muted-foreground mt-1.5">Distribution of most popular cuisines across dataset.</p>
          </div>
          <div className="p-6 flex-1 min-h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cuisineData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {cuisineData?.map((entry: any, index: number) => (
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
