import Hero from "@/components/hero";

export default function About() {
  return (
    <div className="min-h-screen">
      <Hero 
        activePage="About" 
        backgroundImage="/hero-bg.jpg" // You can use different images for different pages
      />
      <main className="p-8 pb-20 gap-16 sm:p-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About ABC Ventures</h1>
          <p className="text-lg text-gray-600">
            Learn more about our story and mission
          </p>
        </div>
      </main>
    </div>
  );
}