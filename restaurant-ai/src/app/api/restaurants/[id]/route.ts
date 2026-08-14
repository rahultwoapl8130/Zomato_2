import { NextResponse } from 'next/server';
import { getRealRestaurants, getRealReviews } from '@/lib/data-loader';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const restaurants = getRealRestaurants();
    const restaurant = restaurants.find((r: any) => r.id === id);

    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }

    // Get reviews specifically for this restaurant's name
    const reviews = getRealReviews(restaurant.name);

    return NextResponse.json({
      ...restaurant,
      reviews
    });
  } catch (error) {
    console.error("Error loading restaurant details:", error);
    return NextResponse.json({ error: 'Failed to load restaurant details' }, { status: 500 });
  }
}
