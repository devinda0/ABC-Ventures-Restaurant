'use client'
import MealCard from "@/components/meal-card";
import RestaurantCard from "@/components/restaurant-card";
import Link from "next/link";
import { utils } from "@/lib/api-client";
import type { RestaurantWithMeals, MealWithRestaurants } from "@/types";

interface HomeClientProps {
  restaurants: RestaurantWithMeals[];
  meals: MealWithRestaurants[];
}

export default function HomeClient({ restaurants, meals }: HomeClientProps) {
  return (
    <main className="p-8 pb-20 gap-16 sm:p-20">
      {/* Welcome Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 font-heading">Welcome to ABC Ventures</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Distinguished leader in Qatar&apos;s hospitality and food & beverage industry. 
          Discover our exquisite dining experiences and culinary masterpieces.
        </p>
      </div>
      
      {/* Featured Restaurants Section */}
      {restaurants.length > 0 && (
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Restaurants</h2>
            <p className="text-lg text-gray-600">
              Explore our collection of fine dining establishments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {restaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurant/${utils.slugify(restaurant.name)}`}>
                <RestaurantCard
                  title={restaurant.name}
                  image={restaurant.image || '/hero-bg.jpg'}
                />
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/restaurant"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Restaurants
            </Link>
          </div>
        </section>
      )}
      
      {/* Featured Meals Section */}
      {meals.length > 0 && (
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Dishes</h2>
            <p className="text-lg text-gray-600">
              Taste our signature culinary creations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {meals.slice(0, 3).map((meal) => (
              <MealCard
                key={meal.id}
                title={meal.title}
                description={meal.description || ''}
                price={utils.formatPrice(Number(meal.price))}
                image={meal.image || '/hero/home.png'}
                onViewMenu={() => {
                  // Find a restaurant that serves this meal and navigate there
                  console.log("View Menu for meal:", meal.id);
                }}
                onReserveTable={() => {
                  // Navigate to restaurants page for reservation
                  window.location.href = '/restaurant';
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="bg-gray-100 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Dine With Us?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience exceptional cuisine, impeccable service, and unforgettable moments. 
          Book your table today and embark on a culinary journey like no other.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/restaurant"
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Explore Restaurants
          </Link>
          <Link 
            href="/contact"
            className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}