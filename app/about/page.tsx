import Hero from "@/components/hero";
import Footer from "@/components/footer";

export default function About() {
  return (
    <div className="min-h-screen">
      <Hero 
        activePage="About" 
        backgroundImage="/hero/about.png"
      />
      <main className="p-8 pb-20 gap-16 sm:p-20 max-w-6xl mx-auto">
        {/* Introduction Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 font-heading">About ABC Ventures</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Distinguished leader in Qatar&apos;s hospitality and food & beverage industry, 
            delivering unparalleled culinary experiences that celebrate tradition while embracing innovation.
          </p>
        </div>

        {/* Our Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-heading">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded with a vision to transform Qatar&apos;s dining landscape, ABC Ventures has grown from 
                a single restaurant to a diverse portfolio of culinary establishments. Our journey began with 
                a simple belief: exceptional food brings people together.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Over the years, we have carefully curated a collection of restaurants that represent the finest 
                in dining experiences, from traditional Qatari cuisine to international culinary adventures. 
                Each establishment in our portfolio reflects our commitment to quality, authenticity, and innovation.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, ABC Ventures stands as a testament to our dedication to excellence, continuing to set 
                new standards in hospitality while honoring the rich culinary heritage of Qatar.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/restaurant-bg.jpg" 
                alt="ABC Ventures Story" 
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 font-heading text-primary">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver exceptional dining experiences that celebrate culinary excellence, cultural diversity, 
                and genuine hospitality. We strive to create memorable moments for our guests while supporting 
                local communities and preserving Qatar&apos;s rich gastronomic heritage.
              </p>
            </div>
            <div className="bg-primary/5 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 font-heading text-primary">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the premier hospitality group in Qatar, recognized for our innovative approach to dining, 
                commitment to sustainability, and ability to bring world-class culinary experiences to the region 
                while maintaining the highest standards of service and quality.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-heading">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Excellence</h3>
              <p className="text-gray-600">
                We pursue perfection in every dish, every service, and every guest interaction.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Community</h3>
              <p className="text-gray-600">
                We believe in building strong relationships with our guests, staff, and local community.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Innovation</h3>
              <p className="text-gray-600">
                We continuously evolve our offerings to exceed expectations and create new experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-heading">Leadership Team</h2>
            <p className="text-lg text-gray-600">
              Meet the visionaries behind ABC Ventures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="/profile/c52e3952b1a404977e72101f78b9d35383abf214.jpg" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">Ahmed Al-Mansouri</h3>
              <p className="text-primary font-medium mb-2">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm">
                With over 15 years in hospitality, Ahmed leads our vision of culinary excellence.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">SF</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">Sarah Foster</h3>
              <p className="text-primary font-medium mb-2">Head of Operations</p>
              <p className="text-gray-600 text-sm">
                Sarah ensures seamless operations across all our restaurant locations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">MR</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">Marco Rodriguez</h3>
              <p className="text-primary font-medium mb-2">Executive Chef</p>
              <p className="text-gray-600 text-sm">
                Marco brings international culinary expertise to our diverse restaurant portfolio.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gray-100 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 font-heading">Experience Our Story</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us on a culinary journey that celebrates tradition, embraces innovation, and creates 
            unforgettable dining experiences. Discover why ABC Ventures is Qatar&apos;s premier hospitality destination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/restaurant"
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Explore Our Restaurants
            </a>
            <a 
              href="/contact"
              className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}