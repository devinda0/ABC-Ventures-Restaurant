import Hero from "@/components/hero";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Hero 
        activePage="Contact" 
        backgroundImage="/hero/about.png"
      />
      <ContactSection />
      <Footer />
    </div>
  );
}