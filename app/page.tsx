import Hero from "@/components/hero";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero activePage="Home" />
      <main className="p-8 pb-20 gap-16 sm:p-20">
        {/* Your main content goes here */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to ABC Ventures</h1>
          <p className="text-lg text-gray-600">
            Distinguished leader in Qatar's hospitality and food & beverage industry
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
