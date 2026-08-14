"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
  favourites: string[];
  toggleFavourite: (restaurantId: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const savedUser = localStorage.getItem('user');
    const savedFavs = localStorage.getItem('favourites');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedFavs) setFavourites(JSON.parse(savedFavs));
    setIsMounted(true);
  }, []);

  const login = (name: string) => {
    const newUser = { name };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const toggleFavourite = (restaurantId: string) => {
    if (!user) {
      alert("Please login to save favourites!");
      return;
    }

    setFavourites((prev) => {
      let updated;
      if (prev.includes(restaurantId)) {
        updated = prev.filter(id => id !== restaurantId);
      } else {
        updated = [...prev, restaurantId];
      }
      localStorage.setItem('favourites', JSON.stringify(updated));
      return updated;
    });
  };

  // Prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout, favourites, toggleFavourite }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
