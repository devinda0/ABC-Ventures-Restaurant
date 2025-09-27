import Hero from "@/components/hero";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Hero 
        activePage="Contact" 
        backgroundImage="/hero-bg.jpg"
      />
      <main className="p-8 pb-20 gap-16 sm:p-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Get in touch with ABC Ventures team
          </p>
        </div>
      </main>
    </div>
  );
}