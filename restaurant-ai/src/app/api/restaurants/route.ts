import { NextResponse } from 'next/server';
import { getRealRestaurants } from '@/lib/data-loader';

export async function GET() {
  try {
    const restaurants = getRealRestaurants();
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error("Error loading restaurants:", error);
    return NextResponse.json({ error: 'Failed to load restaurants data' }, { status: 500 });
  }
}
