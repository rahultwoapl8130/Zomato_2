import Link from "next/link";
import { ChefHat } from "lucide-react";

export function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link className="flex items-center justify-center" href="/">
        <ChefHat className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-bold tracking-tight text-primary">RestaurantAI</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:text-primary transition-colors" href="/restaurants">
          Restaurants
        </Link>
        <Link className="text-sm font-medium hover:text-primary transition-colors" href="/dashboard">
          Dashboard
        </Link>
      </nav>
    </header>
  );
}
