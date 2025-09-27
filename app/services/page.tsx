import Hero from "@/components/hero";

export default function Services() {
  return (
    <div className="min-h-screen">
      <Hero 
        activePage="Services" 
        backgroundImage="/hero-bg.jpg"
      />
      <main className="p-8 pb-20 gap-16 sm:p-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-gray-600">
            Comprehensive hospitality solutions for all your needs
          </p>
        </div>
      </main>
    </div>
  );
}