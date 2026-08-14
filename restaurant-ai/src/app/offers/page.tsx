import React from "react";
import { BadgePercent, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default function OffersPage() {
  const dummyOffers = [
    { id: 1, title: "Flat 50% OFF", desc: "Up to ₹100 on your first order.", code: "WELCOME50" },
    { id: 2, title: "Free Delivery", desc: "On all orders above ₹499.", code: "FREEDEL" },
    { id: 3, title: "Buy 1 Get 1 Free", desc: "On selected desserts.", code: "SWEETTOOTH" },
    { id: 4, title: "20% Cashback", desc: "When paid using selected cards.", code: "CARD20" }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <div className="p-4 bg-primary/10 rounded-full inline-block">
          <BadgePercent className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Best Offers For You</h1>
        <p className="text-gray-500 max-w-lg">Explore the latest deals and discounts from top-rated restaurants near you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyOffers.map((offer) => (
          <div key={offer.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h3>
              <p className="text-sm text-gray-500 mb-6">{offer.desc}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-dashed border-gray-300 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-gray-700">{offer.code}</span>
              <button className="text-primary text-sm font-semibold hover:underline">COPY</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/restaurants">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4" /> Order Now
          </button>
        </Link>
      </div>
    </div>
  );
}
