"use client"

import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { HeroProps, FormErrors, City, MealTypeDisplay, NavItem } from "@/types";

export default function Hero({ 
  backgroundImage = "/hero/home.png", 
  activePage = 'Home' 
}: HeroProps) {
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
            <Link href="/cart" className="flex gap-2 bg-primary px-4 py-2 rounded-tl-2xl rounded-br-2xl items-center text-white hover:bg-primary/90 transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.7505 13.0012V16.0012C8.7505 16.4152 8.4145 16.7512 8.0005 16.7512C7.5865 16.7512 7.2505 16.4152 7.2505 16.0012V13.0012C7.2505 12.5872 7.5865 12.2512 8.0005 12.2512C8.4145 12.2512 8.7505 12.5872 8.7505 13.0012ZM12.0005 12.2512C11.5865 12.2512 11.2505 12.5872 11.2505 13.0012V16.0012C11.2505 16.4152 11.5865 16.7512 12.0005 16.7512C12.4145 16.7512 12.7505 16.4152 12.7505 16.0012V13.0012C12.7505 12.5872 12.4145 12.2512 12.0005 12.2512ZM18.1975 10.4652L17.4305 16.4752C17.1925 18.3422 15.5935 19.7502 13.7105 19.7502H6.31252C4.43652 19.7502 2.8375 18.3472 2.5945 16.4872L1.80449 10.4652C0.887489 10.0182 0.249496 9.08621 0.249496 8.00021C0.249496 6.48321 1.4825 5.25021 2.9995 5.25021H4.57552L7.35649 0.614227C7.56949 0.259227 8.03051 0.143147 8.38551 0.357147C8.74051 0.570147 8.8565 1.0312 8.6425 1.3862L6.3235 5.25021H13.6745L11.3555 1.3862C11.1425 1.0312 11.2575 0.570147 11.6125 0.357147C11.9665 0.144147 12.4275 0.259227 12.6415 0.614227L15.4225 5.25021H17.0005C18.5175 5.25021 19.7505 6.48321 19.7505 8.00021C19.7505 9.08621 19.1135 10.0182 18.1975 10.4652ZM16.6485 10.7512H3.35551L4.0825 16.2932C4.2285 17.4092 5.18752 18.2512 6.31252 18.2512H13.7105C14.8395 18.2512 15.7995 17.4062 15.9415 16.2862L16.6485 10.7512ZM18.2505 8.00119C18.2505 7.31219 17.6895 6.75119 17.0005 6.75119H3.0005C2.3115 6.75119 1.7505 7.31219 1.7505 8.00119C1.7505 8.69019 2.3115 9.25119 3.0005 9.25119H17.0005C17.6895 9.25119 18.2505 8.69019 18.2505 8.00119Z" fill="white"/>
              </svg>

              <span className="hidden sm:inline">1 Items</span>
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

            {/* Table Number Input */}
            <div className="relative flex-1 min-w-[120px]">
              <input 
                type="number"
                min="1"
                max="100"
                value={tableNo}
                onChange={(e) => setTableNo(e.target.value)}
                placeholder="Table No"
                className={`w-full px-6 py-4 bg-transparent border-none outline-none ${
                  errors.tableNo ? 'text-red-500' : 'text-gray-700'
                }`}
              />
              {errors.tableNo && <div className="absolute -bottom-6 left-0 text-red-500 text-xs">{errors.tableNo}</div>}
            </div>

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