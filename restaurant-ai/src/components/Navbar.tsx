"use client";

import Link from "next/link";
import { ChefHat, Menu, X, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, login, logout } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Restaurants", href: "/restaurants" },
    { name: "Reviews & Predictor", href: "/predict" },
    { name: "AI Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
              <ChefHat className="h-6 w-6" />
              <span>RestaurantAI</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {user ? (
              <div className="flex items-center gap-3 bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <UserIcon className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm font-medium">Hi, {user.name}</span>
                <button 
                  onClick={logout}
                  className="text-xs text-muted-foreground hover:text-destructive ml-2 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  const name = prompt("Enter your name to login:");
                  if (name && name.trim()) login(name.trim());
                }}
                className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-sm hover:bg-primary/90 transition-colors"
              >
                Login
              </button>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-border pt-4 mt-2">
              {user ? (
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-primary" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button onClick={logout} className="text-sm text-destructive font-medium">Logout</button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    const name = prompt("Enter your name to login:");
                    if (name && name.trim()) login(name.trim());
                  }}
                  className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-primary hover:bg-muted"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
