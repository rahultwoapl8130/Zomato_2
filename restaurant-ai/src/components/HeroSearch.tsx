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
      r.name && r.name.toLowerCase().startsWith(term)
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
      <div className="flex rounded-full bg-white border border-gray-200 shadow-xl backdrop-blur-md transition-all focus-within:ring-2 focus-within:ring-primary/50 focus-within:shadow-2xl">
        <div className="flex items-center px-4 border-r border-gray-100 hidden sm:flex">
          <MapPin className="h-5 w-5 text-gray-500" />
          <span className="ml-2 text-sm text-gray-600 font-medium">Hyderabad</span>
        </div>
        <input
          className="flex-1 bg-transparent px-4 text-sm text-gray-900 focus:outline-none placeholder:text-gray-400"
          placeholder="Search restaurants by name..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => { if (searchTerm) setIsDropdownOpen(true); }}
        />
        <Link href="/restaurants">
          <button className="rounded-full bg-primary/90 px-6 py-2 text-sm font-semibold text-white hover:bg-primary transition-all shadow-md flex items-center gap-2 m-1">
            <Search className="w-4 h-4" /> Search
          </button>
        </Link>
      </div>

      {/* Glassmorphism Autocomplete Dropdown */}
      {isDropdownOpen && filteredResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-100 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="py-2">
            {filteredResults.map((restaurant) => (
              <li key={restaurant.Restaurant_ID}>
                <Link
                  href={`/restaurants/${restaurant.Restaurant_ID}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <div className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors group cursor-pointer">
                    <div className="bg-gray-100 p-2 rounded-full mr-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Store className="w-4 h-4 text-gray-500 group-hover:text-primary" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-gray-800 font-medium text-sm">
                        {/* Highlight the matching part */}
                        <span className="text-primary font-bold">{restaurant.name.substring(0, searchTerm.length)}</span>
                        {restaurant.name.substring(searchTerm.length)}
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5 truncate max-w-[250px]">
                        {restaurant.cuisines?.join(", ") || restaurant.cuisines}
                      </span>
                    </div>
                    <div className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">
                      ★ {restaurant.rating}
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
        <div className="absolute top-full left-0 right-0 mt-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-100 shadow-2xl p-6 text-center z-50 animate-in fade-in duration-200">
          <p className="text-gray-500 text-sm">No restaurants found starting with "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}
