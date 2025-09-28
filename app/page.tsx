import Hero from "@/components/hero";
import Footer from "@/components/footer";
import HomeClient from "@/components/home-client";
import { restaurantApi, mealApi } from "@/lib/api-client";
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
    const restaurantResponse = await restaurantApi.getAll({ includeMeals: false });
    const restaurants = restaurantResponse.success 
      ? (restaurantResponse.data || []).slice(0, 3) 
      : [];

    // Get featured meals (mix of different types)
    const mealResponse = await mealApi.getAll({ 
      includeRestaurants: false,
      isAvailable: true 
    });
    const meals = mealResponse.success 
      ? (mealResponse.data || []).slice(0, 6) 
      : [];

    return { restaurants, meals };
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
