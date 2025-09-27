import Hero from "@/components/hero";

export default function Restaurant() {
  return (
    <div className="min-h-screen">
      <Hero 
        activePage="Restaurant" 
        backgroundImage="/restaurant-bg.jpg" // Different background for restaurant page
      />
      <main className="p-8 pb-20 gap-16 sm:p-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Our Restaurants</h1>
          <p className="text-lg text-gray-600">
            Discover our exquisite dining experiences
          </p>
        </div>
      </main>
    </div>
  );
}