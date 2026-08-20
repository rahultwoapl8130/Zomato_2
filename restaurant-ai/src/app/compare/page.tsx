"use client";

import { useState, useEffect } from "react";
import { RestaurantAPI } from "@/lib/api/restaurants";
import { Loader2, GitCompare, Star } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Link from 'next/link';

export default function ComparePage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  
  const [idA, setIdA] = useState<string>("r1");
  const [idB, setIdB] = useState<string>("r2");
  
  const [dataA, setDataA] = useState<any>(null);
  const [dataB, setDataB] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    async function loadList() {
      try {
        const list = await RestaurantAPI.getRestaurants();
        setRestaurants(list);
      } catch(e) {
        console.error(e);
      } finally {
        setLoadingList(false);
      }
    }
    loadList();
  }, []);

  useEffect(() => {
    async function loadComparison() {
      if (!idA || !idB) return;
      setLoadingData(true);
      try {
        const [a, b] = await Promise.all([
          RestaurantAPI.getRestaurantById(idA),
          RestaurantAPI.getRestaurantById(idB)
        ]);
        setDataA(a);
        setDataB(b);
      } catch(e) {
        console.error(e);
      } finally {
        setLoadingData(false);
      }
    }
    loadComparison();
  }, [idA, idB]);

  if (loadingList) {
    return <div className="min-h-[80vh] flex justify-center items-center"><Loader2 className="w-10 h-10 animate-spin text-primary"/></div>;
  }

  // Prepare radar data
  let radarData: any[] = [];
  if (dataA && dataB) {
    const aspects = ["Food", "Service", "Ambience", "Price"];
    aspects.forEach(asp => {
      // Calculate positive percentage for A
      let scoreA = 50;
      if (dataA.aspectAnalysis && dataA.aspectAnalysis[asp] && dataA.aspectAnalysis[asp].total > 0) {
        scoreA = Math.round((dataA.aspectAnalysis[asp].pos / dataA.aspectAnalysis[asp].total) * 100);
      }
      
      // Calculate positive percentage for B
      let scoreB = 50;
      if (dataB.aspectAnalysis && dataB.aspectAnalysis[asp] && dataB.aspectAnalysis[asp].total > 0) {
        scoreB = Math.round((dataB.aspectAnalysis[asp].pos / dataB.aspectAnalysis[asp].total) * 100);
      }
      
      radarData.push({
        subject: asp,
        A: scoreA,
        B: scoreB
      });
    });
  }

  return (
    <div className="container py-8 max-w-6xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <GitCompare className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Compare Restaurants</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          AI-powered decision support system. Compare two restaurants side-by-side across various performance metrics.
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-center">
        <select 
          value={idA} 
          onChange={e => setIdA(e.target.value)}
          className="flex-1 max-w-sm border border-input rounded-xl p-3 bg-background"
        >
          {restaurants.map(r => (
            <option key={r.id} value={r.id}>{r.name} - {r.location}</option>
          ))}
        </select>
        
        <div className="font-bold text-muted-foreground px-4">VS</div>
        
        <select 
          value={idB} 
          onChange={e => setIdB(e.target.value)}
          className="flex-1 max-w-sm border border-input rounded-xl p-3 bg-background"
        >
          {restaurants.map(r => (
            <option key={r.id} value={r.id}>{r.name} - {r.location}</option>
          ))}
        </select>
      </div>

      {loadingData ? (
        <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>
      ) : dataA && dataB ? (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm flex flex-col items-center justify-center h-[400px]">
            <h3 className="font-bold text-lg mb-2">Aspect Comparison</h3>
            <p className="text-xs text-muted-foreground mb-4">AI Positive Sentiment (%)</p>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name={dataA.name} dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                <Radar name={dataB.name} dataKey="B" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.5} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Metrics Table */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Head-to-Head Metrics</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-t-lg">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Metric</th>
                    <th className="px-4 py-3 text-green-500 font-bold">{dataA.name}</th>
                    <th className="px-4 py-3 text-rose-500 font-bold rounded-tr-lg">{dataB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-4 font-medium">Average Rating</td>
                    <td className="px-4 py-4 font-bold">{dataA.rating} <Star className="w-3 h-3 inline text-yellow-500 fill-yellow-500"/></td>
                    <td className="px-4 py-4 font-bold">{dataB.rating} <Star className="w-3 h-3 inline text-yellow-500 fill-yellow-500"/></td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-4 font-medium">AI Sentiment Score</td>
                    <td className="px-4 py-4 font-bold text-green-500">{dataA.sentimentScore}%</td>
                    <td className="px-4 py-4 font-bold text-rose-500">{dataB.sentimentScore}%</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-4 font-medium">Cost for Two</td>
                    <td className="px-4 py-4">₹{dataA.costForTwo}</td>
                    <td className="px-4 py-4">₹{dataB.costForTwo}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-4 font-medium">Total Reviews Analyzed</td>
                    <td className="px-4 py-4">{dataA.totalReviews}</td>
                    <td className="px-4 py-4">{dataB.totalReviews}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-4 font-medium">Top Cuisine</td>
                    <td className="px-4 py-4">{dataA.cuisines[0] || '-'}</td>
                    <td className="px-4 py-4">{dataB.cuisines[0] || '-'}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium"></td>
                    <td className="px-4 py-4">
                      <Link href={`/restaurants/${dataA.id}`} className="text-xs text-primary hover:underline font-bold">View Detail →</Link>
                    </td>
                    <td className="px-4 py-4">
                      <Link href={`/restaurants/${dataB.id}`} className="text-xs text-primary hover:underline font-bold">View Detail →</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* AI Recommendation Summary */}
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <h4 className="font-bold text-sm text-primary mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 fill-current"/> AI Verdict
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Based on AI sentiment analysis of {dataA.totalReviews + dataB.totalReviews} reviews, 
                <strong className="text-foreground"> {dataA.sentimentScore >= dataB.sentimentScore ? dataA.name : dataB.name} </strong> 
                is recommended due to a higher overall positive sentiment score 
                ({Math.max(dataA.sentimentScore, dataB.sentimentScore)}% vs {Math.min(dataA.sentimentScore, dataB.sentimentScore)}%).
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
