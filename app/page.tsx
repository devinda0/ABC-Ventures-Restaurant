'use client'
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import MealCard from "@/components/meal-card";

export default function Home() {
  const handleViewMenu = () => {
    console.log("View Menu clicked");
    // Add your navigation logic here
  };

  const handleReserveTable = () => {
    console.log("Reserve Table clicked");
    // Add your reservation logic here
  };

  return (
    <div className="min-h-screen">
      <Hero activePage="Home" />
      <main className="p-8 pb-20 gap-16 sm:p-20">
        {/* Your main content goes here */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 font-heading">Welcome to ABC Ventures</h1>
          <p className="text-lg text-gray-600">
            Distinguished leader in Qatar's hospitality and food & beverage industry
          </p>
        </div>
        
        {/* Meal Card Section */}
        <div className="flex justify-center">
          <MealCard
            title="Arabic Breakfast"
            description="Enjoy the authentic Middle Eastern flavors"
            price="USD 1,000"
            image="/hero/home.png"
            onViewMenu={handleViewMenu}
            onReserveTable={handleReserveTable}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
