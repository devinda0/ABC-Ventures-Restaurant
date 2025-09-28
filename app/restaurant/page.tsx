import Hero from "@/components/hero";
import RestaurantCard from "@/components/restaurant-card";
import Link from "next/link";
import { serverDataApi } from "@/lib/server-data";
import { utils } from "@/lib/api-client";
import type { RestaurantWithMeals } from "@/types";

// Force dynamic rendering for this page to avoid build-time API calls
export const dynamic = 'force-dynamic';

// Server component - fetch data at build/request time
async function getRestaurants(): Promise<RestaurantWithMeals[]> {
  try {
    return await serverDataApi.restaurants.getAll({ includeMeals: false });
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
    return [];
  }
}

export default async function Restaurant() {
  const restaurants = await getRestaurants();

  return (
    <div className="min-h-screen">
      <Hero 
        activePage="Restaurant" 
        backgroundImage="/hero/home.png" // Different background for restaurant page
      />
      <main className="p-8 pb-20 gap-16 sm:p-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Restaurants</h1>
          <p className="text-lg text-gray-600">
            Discover our exquisite dining experiences
          </p>
        </div>
        
        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurant/${utils.slugify(restaurant.name)}`}>
                <RestaurantCard
                  title={restaurant.name}
                  image={restaurant.image || '/hero-bg.jpg'}
                />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-600">No restaurants available at the moment.</p>
              <p className="text-sm text-gray-500 mt-2">Please check back later.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}