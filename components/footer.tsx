import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary rounded-tl-[8rem] text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-row justify-between items-start">
          {/* Company Info */}
          <div className="space-y-6 w-[368px]">
            <img 
              src="/logo.png" 
              alt="ABC Ventures Logo" 
              className=" w-[152px] "
            />
            <p className="font-body text-sm text-[#AAAAAA] leading-relaxed max-w-sm">
              Distinguished leader in Qatar's hospitality and food & beverage industry, 
              delivering unparalleled culinary experiences.
            </p>
            
            {/* Social Links */}
            <div>
              <h3 className="text-base font-heading font-medium mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className=" p-2 rounded-full"
                  aria-label="Facebook"
                >
                    <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4711 10.125L11.0044 6.86742H7.66951V4.75348C7.66951 3.86227 8.13537 2.99355 9.62898 2.99355H11.1451V0.220078C11.1451 0.220078 9.76926 0 8.45382 0C5.70741 0 3.91223 1.56023 3.91223 4.38469V6.86742H0.859375V10.125H3.91223V18H7.66951V10.125H10.4711Z" fill="#D4AF37"/>
                    </svg>
                </a>
                <a 
                  href="#" 
                  className="p-2 rounded-full"
                  aria-label="Instagram"
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.00201 4.38503C6.44808 4.38503 4.38806 6.4455 4.38806 9C4.38806 11.5545 6.44808 13.615 9.00201 13.615C11.5559 13.615 13.616 11.5545 13.616 9C13.616 6.4455 11.5559 4.38503 9.00201 4.38503ZM9.00201 12.0003C7.35159 12.0003 6.00234 10.6548 6.00234 9C6.00234 7.3452 7.34757 5.99967 9.00201 5.99967C10.6564 5.99967 12.0017 7.3452 12.0017 9C12.0017 10.6548 10.6524 12.0003 9.00201 12.0003ZM14.8809 4.19625C14.8809 4.79471 14.399 5.27268 13.8047 5.27268C13.2064 5.27268 12.7285 4.7907 12.7285 4.19625C12.7285 3.60181 13.2104 3.11983 13.8047 3.11983C14.399 3.11983 14.8809 3.60181 14.8809 4.19625ZM17.9368 5.28874C17.8685 3.84682 17.5392 2.56956 16.4831 1.51724C15.431 0.464911 14.154 0.135557 12.7124 0.0632601C11.2267 -0.0210867 6.77334 -0.0210867 5.28756 0.0632601C3.84997 0.131541 2.57301 0.460895 1.5169 1.51322C0.460792 2.56555 0.135527 3.8428 0.063246 5.28473C-0.021082 6.77084 -0.021082 11.2251 0.063246 12.7113C0.131511 14.1532 0.460792 15.4304 1.5169 16.4828C2.57301 17.5351 3.84596 17.8644 5.28756 17.9367C6.77334 18.0211 11.2267 18.0211 12.7124 17.9367C14.154 17.8685 15.431 17.5391 16.4831 16.4828C17.5352 15.4304 17.8645 14.1532 17.9368 12.7113C18.0211 11.2251 18.0211 6.77485 17.9368 5.28874ZM16.0173 14.3058C15.7041 15.0931 15.0977 15.6995 14.3066 16.0168C13.122 16.4868 10.3111 16.3783 9.00201 16.3783C7.69292 16.3783 4.87797 16.4828 3.69738 16.0168C2.91032 15.7036 2.30396 15.0971 1.98673 14.3058C1.5169 13.1209 1.62532 10.3094 1.62532 9C1.62532 7.69062 1.52091 4.87504 1.98673 3.69419C2.29994 2.90695 2.9063 2.30046 3.69738 1.98315C4.88199 1.51322 7.69292 1.62167 9.00201 1.62167C10.3111 1.62167 13.126 1.51724 14.3066 1.98315C15.0937 2.29644 15.7001 2.90293 16.0173 3.69419C16.4871 4.87906 16.3787 7.69062 16.3787 9C16.3787 10.3094 16.4871 13.125 16.0173 14.3058Z" fill="#D4AF37"/>
                    </svg>
                </a>
                <a 
                  href="#" 
                  className="p-2 rounded-full"
                  aria-label="YouTube"
                >
                    <svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.1491 3.79727C25.8673 2.71466 25.0372 1.86202 23.9833 1.57267C22.0729 1.04688 14.4125 1.04688 14.4125 1.04688C14.4125 1.04688 6.75216 1.04688 4.84173 1.57267C3.78777 1.86207 2.95768 2.71466 2.67595 3.79727C2.16406 5.75958 2.16406 9.85375 2.16406 9.85375C2.16406 9.85375 2.16406 13.9479 2.67595 15.9102C2.95768 16.9928 3.78777 17.81 4.84173 18.0993C6.75216 18.6251 14.4125 18.6251 14.4125 18.6251C14.4125 18.6251 22.0729 18.6251 23.9833 18.0993C25.0372 17.81 25.8673 16.9928 26.1491 15.9102C26.661 13.9479 26.661 9.85375 26.661 9.85375C26.661 9.85375 26.661 5.75958 26.1491 3.79727ZM11.9071 13.571V6.13655L18.3097 9.85384L11.9071 13.571Z" fill="#D4AF37"/>
                    </svg>
                </a>
              </div>
            </div>
          </div>

          <div className=' flex w-[410px] flex-row justify-between gap-[80px]'>
            {/* Quick Links */}
            <div className="space-y-6">
                <h3 className="text-base font-medium text-white font-heading">Quick Links</h3>
                <nav className="space-y-3">
                <a href="#" className="block text-[#BFBFBF] text-sm font-body font-normal">
                    Services & Lectures
                </a>
                <a href="#" className="block text-[#BFBFBF] text-sm font-body font-normal">
                    Our Restaurants
                </a>
                <a href="#" className="block text-[#BFBFBF] text-sm font-body font-normal">
                    About Us
                </a>
                <a href="#" className="block text-[#BFBFBF] text-sm font-body font-normal">
                    Contacts
                </a>
                <a href="#" className="block text-[#BFBFBF] text-sm font-body font-normal">
                    Projects
                </a>
                <a href="#" className="block text-[#BFBFBF] text-sm font-body font-normal">
                    Careers
                </a>
                </nav>
            </div>

            {/* Restaurant Categories */}
            <div className="space-y-6">
                <h3 className="text-base text-white font-heading font-medium">Restaurant Categories</h3>
                <nav className="space-y-3">
                <a href="#" className="block text-[#BFBFBF] text-sm font-body font-normal">
                    Home-grown Restaurants
                </a>
                <a href="#" className="block text-[#BFBFBF] text-sm font-body font-normal">
                    Franchised Restaurants
                </a>
                <a href="#" className="block text-[#BFBFBF] text-sm font-body font-normal">
                    Virtual Restaurants
                </a>
                <a href="#" className="block text-[#BFBFBF] text-sm font-body font-normal">
                    Surrey Suites
                </a>
                <a href="#" className="block text-[#BFBFBF] text-sm font-body font-normal">
                    Munia Catering
                </a>
                </nav>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6 w-[305px] ml-10">
            <h3 className="text-white text-base font-heading font-medium">STAY CONNECTED</h3>
            <p className="text-[#AAAAAA] text-sm font-body font-normal leading-relaxed">
              Subscribe to our newsletter for updates on new restaurants and exclusive offers.
            </p>
            <div className="space-y-4 flex flex-col items-end justify-start">
              <Input
                type="email"
                placeholder="john@gmail.com"
                className="w-full rounded-tl-2xl rounded-br-2xl bg-background rounded-tr-none rounded-bl-none h-10"
              />
              <Button 
                className=" font-heading px-7 font-medium text-white text-base border rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none h-10"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#D4AF37] mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-[10px] text-[#BFBFBF] font-medium font-body text-center lg:text-left">
              © 2025 ABC Ventures. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm">
              <a href="#" className="text-xs text-[#BFBFBF] font-medium font-body">
                Terms of Use
              </a>
              <a href="#" className="text-xs text-[#BFBFBF] font-medium font-body">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-[#BFBFBF] font-medium font-body">
                Back to Top
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;