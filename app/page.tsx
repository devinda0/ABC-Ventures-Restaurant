import Hero from "@/components/hero";
import Footer from "@/components/footer";
import HomeClient from "@/components/home-client";
import { serverDataApi } from "@/lib/server-data";
import type { RestaurantWithMeals, MealWithRestaurants } from "@/types";

// Force dynamic rendering for this page to avoid build-time API calls
export const dynamic = 'force-dynamic';

// Server-side data fetching for featured content
async function getFeaturedContent(): Promise<{
  restaurants: RestaurantWithMeals[];
  meals: MealWithRestaurants[];
}> {
  try {
    // Get top restaurants (limit to 3 for homepage)
    const restaurants = await serverDataApi.restaurants.getAll({ includeMeals: false });
    const limitedRestaurants = restaurants.slice(0, 3);

    // Get featured meals (mix of different types)
    const meals = await serverDataApi.meals.getAll({ 
      includeRestaurants: false,
      isAvailable: true 
    });
    const limitedMeals = meals.slice(0, 6);

    return { restaurants: limitedRestaurants, meals: limitedMeals };
  } catch (error) {
    console.error('Failed to fetch featured content:', error);
    return { restaurants: [], meals: [] };
  }
}

export default async function Home() {
  const { restaurants, meals } = await getFeaturedContent();

  return (
    <div className="min-h-screen">
      <Hero activePage="Home" />
      <HomeClient restaurants={restaurants} meals={meals} />
      <Footer />
    </div>
  );
}
