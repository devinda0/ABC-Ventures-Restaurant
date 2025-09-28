"use client"

import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { HeroProps, FormErrors, City, MealTypeDisplay, NavItem } from "@/types";
import CartIcon from "./cart-icon";
import { Button } from "./ui/button";
import { useCart } from "@/lib/cart-context";

export default function Hero({ 
  backgroundImage = "/hero/home.png", 
  activePage = 'Home' 
}: HeroProps) {
  const { getCartItemCount } = useCart();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [tableNo, setTableNo] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Restaurant', href: '/restaurant' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const cities: City[] = [
    "City A",
    "City B", 
    "City C",
    "City D"
  ];

  const mealTypes: MealTypeDisplay[] = ["Breakfast", "Lunch", "Dinner"];

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!selectedCity) {
      newErrors.city = "Please select a city";
    }

    if (!selectedDate) {
      newErrors.date = "Please select a date";
    } else {
      const selectedDateObj = new Date(selectedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDateObj < today) {
        newErrors.date = "Please select a future date";
      }
    }

    if (!selectedMeal) {
      newErrors.meal = "Please select a meal type";
    }

    if (!adults) {
      newErrors.adults = "Please select number of adults";
    } else if (parseInt(adults) < 1 || parseInt(adults) > 20) {
      newErrors.adults = "Adults must be between 1 and 20";
    }

    if (!children) {
      newErrors.children = "Please select number of children";
    } else if (parseInt(children) < 0 || parseInt(children) > 15) {
      newErrors.children = "Children must be between 0 and 15";
    }

    if (!tableNo) {
      newErrors.tableNo = "Please enter table number";
    } else if (parseInt(tableNo) < 1 || parseInt(tableNo) > 100) {
      newErrors.tableNo = "Table number must be between 1 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReservation = () => {
    if (validateForm()) {
      // Handle successful reservation
      console.log("Reservation details:", {
        city: selectedCity,
        date: selectedDate,
        meal: selectedMeal,
        adults: parseInt(adults),
        children: parseInt(children),
        tableNo: parseInt(tableNo)
      });
      alert("Reservation request submitted successfully!");
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="relative w-full pt-3 h-[500px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Restaurant background"
          fill
          className="w-full object-cover object-[0%_10%]"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-8 py-6 lg:px-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="ABC Ventures Logo" 
                width={150} 
                height={50} 
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-white hover:text-yellow-400 transition-colors ${
                  activePage === item.name 
                    ? 'text-yellow-400 border-b border-yellow-400 pb-1' 
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu & Cart */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
            <Button className="px-5 py-2 flex flex-row rounded-none rounded-tl-2xl rounded-br-2xl items-center gap-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-full">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.2505 15.0012V18.0012C11.2505 18.4152 10.9145 18.7512 10.5005 18.7512C10.0865 18.7512 9.75052 18.4152 9.75052 18.0012V15.0012C9.75052 14.5872 10.0865 14.2512 10.5005 14.2512C10.9145 14.2512 11.2505 14.5872 11.2505 15.0012ZM14.5005 14.2512C14.0865 14.2512 13.7505 14.5872 13.7505 15.0012V18.0012C13.7505 18.4152 14.0865 18.7512 14.5005 18.7512C14.9145 18.7512 15.2505 18.4152 15.2505 18.0012V15.0012C15.2505 14.5872 14.9145 14.2512 14.5005 14.2512ZM20.6975 12.4652L19.9305 18.4752C19.6925 20.3422 18.0935 21.7502 16.2105 21.7502H8.81253C6.93653 21.7502 5.33751 20.3472 5.09451 18.4872L4.3045 12.4652C3.3875 12.0182 2.74951 11.0862 2.74951 10.0002C2.74951 8.48321 3.98251 7.25021 5.49951 7.25021H7.07553L9.85651 2.61423C10.0695 2.25923 10.5305 2.14315 10.8855 2.35715C11.2405 2.57015 11.3565 3.0312 11.1425 3.3862L8.82352 7.25021H16.1745L13.8555 3.3862C13.6425 3.0312 13.7575 2.57015 14.1125 2.35715C14.4665 2.14415 14.9275 2.25923 15.1415 2.61423L17.9225 7.25021H19.5005C21.0175 7.25021 22.2505 8.48321 22.2505 10.0002C22.2505 11.0862 21.6135 12.0182 20.6975 12.4652ZM19.1485 12.7512H5.85553L6.58252 18.2932C6.72852 19.4092 7.68753 20.2512 8.81253 20.2512H16.2105C17.3395 20.2512 18.2995 19.4062 18.4415 18.2862L19.1485 12.7512ZM20.7505 10.0012C20.7505 9.31219 20.1895 8.75119 19.5005 8.75119H5.50052C4.81152 8.75119 4.25052 9.31219 4.25052 10.0012C4.25052 10.6902 4.81152 11.2512 5.50052 11.2512H19.5005C20.1895 11.2512 20.7505 10.6902 20.7505 10.0012Z" fill="white"/>
                </svg>
              </div>
              <h1 className="text-white font-secondary-heading font-normal">{`${getCartItemCount()} Items`}</h1>
            </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-sm">
            <div className="flex flex-col space-y-4 px-8 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-white hover:text-yellow-400 transition-colors ${
                    activePage === item.name 
                      ? 'text-yellow-400' 
                      : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reservation Form */}
        <div className="flex justify-center px-4 mt-16 lg:mt-24">
          <div className="bg-white rounded-tl-[16px] rounded-br-[16px] shadow-lg flex flex-col lg:flex-row items-stretch max-w-6xl w-full overflow-hidden">
            {/* City Dropdown */}
            <div className="relative flex-1 min-w-[150px]">
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className={`w-full px-6 py-4 bg-transparent border-none outline-none cursor-pointer ${
                  errors.city ? 'text-red-500' : 'text-gray-700'
                }`}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              {errors.city && <div className="absolute -bottom-6 left-0 text-red-500 text-xs">{errors.city}</div>}
            </div>

            <div className="hidden lg:block w-px h-12 bg-gray-200"></div>
            <div className="lg:hidden h-px w-full bg-gray-200"></div>

            {/* Date Input */}
            <div className="relative flex-1 min-w-[150px]">
              <input 
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getTomorrowDate()}
                className={`w-full px-6 py-4 bg-transparent border-none outline-none ${
                  errors.date ? 'text-red-500' : 'text-gray-700'
                }`}
              />
              {errors.date && <div className="absolute -bottom-6 left-0 text-red-500 text-xs">{errors.date}</div>}
            </div>

            <div className="hidden lg:block w-px h-12 bg-gray-200"></div>
            <div className="lg:hidden h-px w-full bg-gray-200"></div>

            {/* Meal Type Dropdown */}
            <div className="relative flex-1 min-w-[140px]">
              <select 
                value={selectedMeal}
                onChange={(e) => setSelectedMeal(e.target.value)}
                className={`w-full px-6 py-4 bg-transparent border-none outline-none cursor-pointer ${
                  errors.meal ? 'text-red-500' : 'text-gray-700'
                }`}
              >
                <option value="">Meal Type</option>
                {mealTypes.map((meal) => (
                  <option key={meal} value={meal}>
                    {meal}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              {errors.meal && <div className="absolute -bottom-6 left-0 text-red-500 text-xs">{errors.meal}</div>}
            </div>

            <div className="hidden lg:block w-px h-12 bg-gray-200"></div>
            <div className="lg:hidden h-px w-full bg-gray-200"></div>

            {/* Adults Input */}
            <div className="relative flex-1 min-w-[120px]">
              <input 
                type="number"
                min="1"
                max="20"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                placeholder="Adults"
                className={`w-full px-6 py-4 bg-transparent border-none outline-none ${
                  errors.adults ? 'text-red-500' : 'text-gray-700'
                }`}
              />
              {errors.adults && <div className="absolute -bottom-6 left-0 text-red-500 text-xs">{errors.adults}</div>}
            </div>

            <div className="hidden lg:block w-px h-12 bg-gray-200"></div>
            <div className="lg:hidden h-px w-full bg-gray-200"></div>

            {/* Children Input */}
            <div className="relative flex-1 min-w-[120px]">
              <input 
                type="number"
                min="0"
                max="15"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                placeholder="Children"
                className={`w-full px-6 py-4 bg-transparent border-none outline-none ${
                  errors.children ? 'text-red-500' : 'text-gray-700'
                }`}
              />
              {errors.children && <div className="absolute -bottom-6 left-0 text-red-500 text-xs">{errors.children}</div>}
            </div>

            <div className="hidden lg:block w-px h-12 bg-gray-200"></div>
            <div className="lg:hidden h-px w-full bg-gray-200"></div>

            {/* Reserve Button */}
            <button 
              onClick={handleReservation}
              className="bg-red-800 hover:bg-red-900 text-white px-8 py-4 lg:rounded-br-[16px] transition-colors font-medium"
            >
              Reserve Now
            </button>
          </div>
        </div>

        {/* Location Cards */}
        <div className="flex justify-center mt-24 my-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
            {cities.map((city, index) => (
              <div key={city} className="text-center text-white">
                <h3 className="text-xl font-serif mb-2">ABC Ventures - {city}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}