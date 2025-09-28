import Hero from "@/components/hero";
import ContactSection from "@/components/contact-section";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Hero 
        activePage="Contact" 
        backgroundImage="/hero-bg.jpg"
      />
      <ContactSection />
    </div>
  );
}