import Hero from "@/components/hero";
import Footer from "@/components/footer";

export default function Services() {
  return (
    <div className="min-h-screen">
      <Hero 
        activePage="Services" 
        backgroundImage="/hero/home.png"
      />
      <main className="p-8 pb-20 gap-16 sm:p-20 max-w-6xl mx-auto">
        {/* Introduction Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 font-heading">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive hospitality solutions designed to exceed expectations and create 
            memorable dining experiences across our portfolio of premium restaurants.
          </p>
        </div>

        {/* Main Services Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fine Dining */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 font-heading text-primary text-center">Fine Dining</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Exquisite culinary experiences featuring world-class cuisine, impeccable service, 
                and elegant atmospheres perfect for special occasions.
              </p>
            </div>

            {/* Casual Dining */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 font-heading text-primary text-center">Casual Dining</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Relaxed, family-friendly environments offering delicious comfort food and 
                warm hospitality for everyday dining experiences.
              </p>
            </div>

            {/* Private Events */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 font-heading text-primary text-center">Private Events</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Customized event planning and exclusive venue hire for weddings, corporate events, 
                and special celebrations with dedicated service teams.
              </p>
            </div>

            {/* Catering Services */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1v6m6-6v6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 font-heading text-primary text-center">Catering Services</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Off-site catering solutions bringing our exceptional cuisine and service 
                directly to your location for any occasion.
              </p>
            </div>

            {/* Corporate Dining */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 font-heading text-primary text-center">Corporate Dining</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Professional dining solutions for business meetings, client entertainment, 
                and corporate events with flexible seating and service options.
              </p>
            </div>

            {/* Delivery & Takeaway */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 font-heading text-primary text-center">Delivery & Takeaway</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Convenient online ordering and delivery services bringing our restaurant-quality 
                meals directly to your home or office.
              </p>
            </div>
          </div>
        </section>

        {/* Special Services Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-heading">Premium Services</h2>
            <p className="text-lg text-gray-600">
              Exclusive offerings that set us apart
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Chef's Table Experience */}
            <div className="bg-primary/5 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 font-heading text-primary">Chef's Table Experience</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Intimate dining experience where you can witness our master chefs at work while enjoying 
                a personalized tasting menu crafted exclusively for your table. Limited seating available 
                for this unique culinary journey.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Personalized menu consultation
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Wine pairing recommendations
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Interactive culinary demonstrations
                </li>
              </ul>
            </div>

            {/* Loyalty Program */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 font-heading text-primary">VIP Loyalty Program</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join our exclusive loyalty program and enjoy premium benefits across all ABC Ventures 
                restaurants. Earn points with every visit and unlock special privileges designed for 
                our most valued guests.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority reservations
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Exclusive menu previews
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7-73a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Birthday and anniversary rewards
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Service Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-heading">How We Serve You</h2>
            <p className="text-lg text-gray-600">
              Our commitment to excellence in every step
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2 font-heading">Consultation</h3>
              <p className="text-gray-600 text-sm">
                We discuss your needs and preferences to create the perfect dining experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2 font-heading">Planning</h3>
              <p className="text-gray-600 text-sm">
                Our team carefully plans every detail to ensure seamless execution.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2 font-heading">Execution</h3>
              <p className="text-gray-600 text-sm">
                We deliver exceptional service with attention to every detail.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2 font-heading">Follow-up</h3>
              <p className="text-gray-600 text-sm">
                We ensure your complete satisfaction and gather feedback for improvement.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="/restaurant-bg.jpg" 
                alt="ABC Ventures Services" 
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 font-heading">Why Choose ABC Ventures</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 font-heading">Proven Excellence</h3>
                    <p className="text-gray-600">Over 15 years of experience in Qatar's hospitality industry with a track record of satisfied customers.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 font-heading">Diverse Portfolio</h3>
                    <p className="text-gray-600">Multiple restaurant concepts under one roof, offering variety and flexibility for all occasions.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 font-heading">Quality Commitment</h3>
                    <p className="text-gray-600">Unwavering dedication to using the finest ingredients and maintaining the highest service standards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gray-100 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 font-heading">Ready to Experience Our Services?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re planning a special occasion, corporate event, or simply want to enjoy 
            exceptional dining, we&apos;re here to make it memorable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/restaurant"
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              View Our Restaurants
            </a>
            <a 
              href="/contact"
              className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Book a Service
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}