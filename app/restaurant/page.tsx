'use client';

import Hero from "@/components/hero";
import RestaurantCard from "@/components/restaurant-card";
import { useRouter } from "next/navigation";

const restaurants = [
  {
    id: 'abc-ventures',
    name: 'ABC Ventures - City A',
    image: '/hero-bg.jpg'
  },
  {
    id: 'fine-dining',
    name: 'Fine Dining Experience',
    image: '/restaurant-bg.jpg'
  },
  {
    id: 'casual-eats',
    name: 'Casual Eats',
    image: '/hero-bg.jpg'
  }
];

export default function Restaurant() {
  const router = useRouter();

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };

  return (
    <div className="min-h-screen">
      <Hero 
        activePage="Restaurant" 
        backgroundImage="/restaurant-bg.jpg" // Different background for restaurant page
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
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              title={restaurant.name}
              image={restaurant.image}
              onClick={() => handleRestaurantClick(restaurant.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}