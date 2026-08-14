"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, MapPin, Store } from "lucide-react";

export default function HeroSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allRestaurants, setAllRestaurants] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch all restaurants on mount for fast local filtering
  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const res = await fetch("https://zomato-3-hi4f.onrender.com/api/restaurants");
        const data = await res.json();
        setAllRestaurants(data);
      } catch (err) {
        console.error("Failed to load restaurants", err);
      }
    }
    fetchRestaurants();
  }, []);

  // Filter restaurants whenever search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = allRestaurants.filter((r) =>
      r.Restaurant_Name && r.Restaurant_Name.toLowerCase().startsWith(term)
    ).slice(0, 8); // limit to top 8 suggestions

    setFilteredResults(results);
    setIsDropdownOpen(true);
  }, [searchTerm, allRestaurants]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-lg space-y-2 relative" ref={dropdownRef}>
      {/* Search Bar with Glassmorphism */}
      <div className="flex rounded-full bg-white/10 p-1.5 border border-white/20 shadow-2xl backdrop-blur-md transition-all focus-within:ring-2 focus-within:ring-primary/50 focus-within:bg-white/15">
        <div className="flex items-center px-4 border-r border-white/20 hidden sm:flex">
          <MapPin className="h-5 w-5 text-gray-300" />
          <span className="ml-2 text-sm text-gray-300 font-medium">Hyderabad</span>
        </div>
        <input
          className="flex-1 bg-transparent px-4 text-sm text-white focus:outline-none placeholder:text-gray-400"
          placeholder="Search restaurants by name..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => { if (searchTerm) setIsDropdownOpen(true); }}
        />
        <Link href="/restaurants">
          <button className="rounded-full bg-primary/90 px-6 py-2 text-sm font-semibold text-white hover:bg-primary transition-all shadow-lg flex items-center gap-2">
            <Search className="w-4 h-4" /> Search
          </button>
        </Link>
      </div>

      {/* Glassmorphism Autocomplete Dropdown */}
      {isDropdownOpen && filteredResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="py-2">
            {filteredResults.map((restaurant) => (
              <li key={restaurant.Restaurant_ID}>
                <Link
                  href={`/restaurants/${restaurant.Restaurant_ID}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <div className="flex items-center px-5 py-3 hover:bg-white/10 transition-colors group cursor-pointer">
                    <div className="bg-white/10 p-2 rounded-full mr-4 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      <Store className="w-4 h-4 text-gray-300 group-hover:text-primary" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-white font-medium text-sm">
                        {/* Highlight the matching part */}
                        <span className="text-primary font-bold">{restaurant.Restaurant_Name.substring(0, searchTerm.length)}</span>
                        {restaurant.Restaurant_Name.substring(searchTerm.length)}
                      </span>
                      <span className="text-xs text-gray-400 mt-0.5 truncate max-w-[250px]">
                        {restaurant.Cuisines}
                      </span>
                    </div>
                    <div className="text-xs font-bold bg-primary/20 text-primary px-2 py-1 rounded-md">
                      ★ {restaurant.Aggregate_rating}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No results state */}
      {isDropdownOpen && searchTerm && filteredResults.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl p-6 text-center z-50 animate-in fade-in duration-200">
          <p className="text-gray-300 text-sm">No restaurants found starting with "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}
