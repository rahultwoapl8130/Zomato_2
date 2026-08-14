import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

let restaurantsCache: any[] = [];
let reviewsCache: any[] = [];

// Sentiment analysis helper function since we don't have python ML running
function analyzeSentiment(reviewText: string, rating: string): string {
  const numRating = parseFloat(rating);
  if (numRating >= 4) return 'Positive';
  if (numRating <= 2.5) return 'Negative';
  return 'Neutral';
}

export function getRealRestaurants() {
  if (restaurantsCache.length > 0) return restaurantsCache;

  const metadataPath = path.join(process.cwd(), 'public', 'data', 'metadata.csv');
  const fileContent = fs.readFileSync(metadataPath, 'utf8');
  
  const parsed = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
  });

  // Calculate random dummy sentiment scores since we don't have actual model output in the CSV yet
  restaurantsCache = parsed.data.map((row: any, index: number) => {
    // Generate an ID
    const id = `r${index + 1}`;
    
    // Parse cuisines safely
    let cuisinesList = [];
    if (row.Cuisines) {
      cuisinesList = row.Cuisines.split(',').map((c: string) => c.trim());
    }

    // Parse cost
    let cost = 500;
    if (row.Cost) {
      cost = parseInt(row.Cost.replace(/,/g, '')) || 500;
    }

    return {
      id,
      name: row.Name,
      location: 'Hyderabad', // Assuming Hyderabad from Zomato dataset context
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // Mock rating between 3.0 and 5.0
      costForTwo: cost,
      cuisines: cuisinesList,
      image: `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60`,
      sentimentScore: Math.floor(Math.random() * 30 + 70), // Random 70-99
      deliveryTime: '30-45 min',
      isPromoted: index % 5 === 0,
    };
  });

  return restaurantsCache;
}

export function getRealReviews(restaurantName: string) {
  if (reviewsCache.length === 0) {
    const reviewsPath = path.join(process.cwd(), 'public', 'data', 'reviews.csv');
    const fileContent = fs.readFileSync(reviewsPath, 'utf8');
    
    const parsed = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    });
    
    reviewsCache = parsed.data;
  }

  const restaurantReviews = reviewsCache.filter((r: any) => r.Restaurant === restaurantName);
  
  return restaurantReviews.map((r: any, index: number) => ({
    id: `${restaurantName}-rev-${index}`,
    customerName: r.Reviewer || 'Anonymous',
    rating: parseFloat(r.Rating) || 0,
    text: r.Review || '',
    date: r.Time || 'Recently',
    sentiment: analyzeSentiment(r.Review || '', r.Rating || '0'),
  }));
}
