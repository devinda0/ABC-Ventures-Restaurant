'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import MealCard from '@/components/meal-card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import ContactSection from '@/components/contact-section';
import type { RestaurantPageProps, RestaurantData } from '@/types';

// Mock data for different restaurants
const restaurantData: Record<string, RestaurantData> = {
  'abc-ventures-city-a': {
    name: 'ABC Ventures',
    subtitle: 'City A',
    tagline: 'THE BEST CITY VIEW DINING',
    categories: ['All', 'Thai Grill', 'Veggies', 'Burgers', 'Drinks', 'Others'],
    meals: {
      breakfast: [
        {
          id: 1,
          title: 'Arabic Breakfast',
          description: 'Enjoy the authentic Middle Eastern flavors',
          price: 'USD 1,000',
          image: '/hero/home.png'
        },
        {
          id: 2,
          title: 'English Breakfast',
          description: 'Taste the real British breakfast',
          price: 'USD 1,500',
          image: '/hero/home.png',
          badge: '360 Fill • 21 Hug'
        },
        {
          id: 3,
          title: 'Healthy Breakfast',
          description: 'Delight in clean and nutritious breakfast',
          price: 'USD 1,200',
          image: '/hero/home.png'
        }
      ],
      lunch: [
        {
          id: 4,
          title: 'Arabic Lunch',
          description: 'Enjoy the authentic Middle Eastern flavors',
          price: 'USD 1,200',
          image: '/hero/home.png'
        },
        {
          id: 5,
          title: 'English Lunch',
          description: 'Taste the real British lunch',
          price: 'USD 1,500',
          image: '/hero/home.png'
        },
        {
          id: 6,
          title: 'Healthy Lunch',
          description: 'Delight in clean and nutritious lunch',
          price: 'USD 1,400',
          image: '/hero/home.png'
        }
      ],
      dinner: [
        {
          id: 7,
          title: 'Arabic Dinner',
          description: 'Enjoy the authentic Middle Eastern flavors',
          price: 'USD 2,000',
          image: '/hero/home.png'
        },
        {
          id: 8,
          title: 'English Dinner',
          description: 'Taste the real British dinner',
          price: 'USD 2,500',
          image: '/hero/home.png'
        },
        {
          id: 9,
          title: 'Healthy Dinner',
          description: 'Delight in clean and nutritious dinner',
          price: 'USD 2,200',
          image: '/hero/home.png'
        }
      ]
    }
  },
  'abc-ventures-city-b': {
    name: 'ABC Ventures',
    subtitle: 'City B',
    tagline: 'THE BEST CITY VIEW DINING',
    categories: ['All', 'Thai Grill', 'Veggies', 'Burgers', 'Drinks', 'Others'],
    meals: {
      breakfast: [
        {
          id: 1,
          title: 'Arabic Breakfast',
          description: 'Enjoy the authentic Middle Eastern flavors',
          price: 'USD 1,000',
          image: '/hero/home.png'
        },
        {
          id: 2,
          title: 'English Breakfast',
          description: 'Taste the real British breakfast',
          price: 'USD 1,500',
          image: '/hero/home.png',
          badge: '360 Fill • 21 Hug'
        },
        {
          id: 3,
          title: 'Healthy Breakfast',
          description: 'Delight in clean and nutritious breakfast',
          price: 'USD 1,200',
          image: '/hero/home.png'
        }
      ],
      lunch: [
        {
          id: 4,
          title: 'Arabic Lunch',
          description: 'Enjoy the authentic Middle Eastern flavors',
          price: 'USD 1,200',
          image: '/hero/home.png'
        },
        {
          id: 5,
          title: 'English Lunch',
          description: 'Taste the real British lunch',
          price: 'USD 1,500',
          image: '/hero/home.png'
        },
        {
          id: 6,
          title: 'Healthy Lunch',
          description: 'Delight in clean and nutritious lunch',
          price: 'USD 1,400',
          image: '/hero/home.png'
        }
      ],
      dinner: [
        {
          id: 7,
          title: 'Arabic Dinner',
          description: 'Enjoy the authentic Middle Eastern flavors',
          price: 'USD 2,000',
          image: '/hero/home.png'
        },
        {
          id: 8,
          title: 'English Dinner',
          description: 'Taste the real British dinner',
          price: 'USD 2,500',
          image: '/hero/home.png'
        },
        {
          id: 9,
          title: 'Healthy Dinner',
          description: 'Delight in clean and nutritious dinner',
          price: 'USD 2,200',
          image: '/hero/home.png'
        }
      ]
    }
  },
  'abc-ventures-city-c': {
    name: 'ABC Ventures',
    subtitle: 'City C',
    tagline: 'THE BEST CITY VIEW DINING',
    categories: ['All', 'Thai Grill', 'Veggies', 'Burgers', 'Drinks', 'Others'],
    meals: {
      breakfast: [
        {
          id: 1,
          title: 'Arabic Breakfast',
          description: 'Enjoy the authentic Middle Eastern flavors',
          price: 'USD 1,000',
          image: '/hero/home.png'
        },
        {
          id: 2,
          title: 'English Breakfast',
          description: 'Taste the real British breakfast',
          price: 'USD 1,500',
          image: '/hero/home.png',
          badge: '360 Fill • 21 Hug'
        },
        {
          id: 3,
          title: 'Healthy Breakfast',
          description: 'Delight in clean and nutritious breakfast',
          price: 'USD 1,200',
          image: '/hero/home.png'
        }
      ],
      lunch: [
        {
          id: 4,
          title: 'Arabic Lunch',
          description: 'Enjoy the authentic Middle Eastern flavors',
          price: 'USD 1,200',
          image: '/hero/home.png'
        },
        {
          id: 5,
          title: 'English Lunch',
          description: 'Taste the real British lunch',
          price: 'USD 1,500',
          image: '/hero/home.png'
        },
        {
          id: 6,
          title: 'Healthy Lunch',
          description: 'Delight in clean and nutritious lunch',
          price: 'USD 1,400',
          image: '/hero/home.png'
        }
      ],
      dinner: [
        {
          id: 7,
          title: 'Arabic Dinner',
          description: 'Enjoy the authentic Middle Eastern flavors',
          price: 'USD 2,000',
          image: '/hero/home.png'
        },
        {
          id: 8,
          title: 'English Dinner',
          description: 'Taste the real British dinner',
          price: 'USD 2,500',
          image: '/hero/home.png'
        },
        {
          id: 9,
          title: 'Healthy Dinner',
          description: 'Delight in clean and nutritious dinner',
          price: 'USD 2,200',
          image: '/hero/home.png'
        }
      ]
    }
  },
  'abc-ventures-city-d': {
    name: 'ABC Ventures',
    subtitle: 'City D',
    tagline: 'THE BEST CITY VIEW DINING',
    categories: ['All', 'Thai Grill', 'Veggies', 'Burgers', 'Drinks', 'Others'],
    meals: {
      breakfast: [
        {
          id: 1,
          title: 'Arabic Breakfast',
          description: 'Enjoy the authentic Middle Eastern flavors',
          price: 'USD 1,000',
          image: '/hero/home.png'
        },
        {
          id: 2,
          title: 'English Breakfast',
          description: 'Taste the real British breakfast',
          price: 'USD 1,500',
          image: '/hero/home.png',
          badge: '360 Fill • 21 Hug'
        },
        {
          id: 3,
          title: 'Healthy Breakfast',
          description: 'Delight in clean and nutritious breakfast',
          price: 'USD 1,200',
          image: '/hero/home.png'
        }
      ],
      lunch: [
        {
          id: 4,
          title: 'Arabic Lunch',
          description: 'Enjoy the authentic Middle Eastern flavors',
          price: 'USD 1,200',
          image: '/hero/home.png'
        },
        {
          id: 5,
          title: 'English Lunch',
          description: 'Taste the real British lunch',
          price: 'USD 1,500',
          image: '/hero/home.png'
        },
        {
          id: 6,
          title: 'Healthy Lunch',
          description: 'Delight in clean and nutritious lunch',
          price: 'USD 1,400',
          image: '/hero/home.png'
        }
      ],
      dinner: [
        {
          id: 7,
          title: 'Arabic Dinner',
          description: 'Enjoy the authentic Middle Eastern flavors',
          price: 'USD 2,000',
          image: '/hero/home.png'
        },
        {
          id: 8,
          title: 'English Dinner',
          description: 'Taste the real British dinner',
          price: 'USD 2,500',
          image: '/hero/home.png'
        },
        {
          id: 9,
          title: 'Healthy Dinner',
          description: 'Delight in clean and nutritious dinner',
          price: 'USD 2,200',
          image: '/hero/home.png'
        }
      ]
    }
  },
  'default': {
    name: 'Restaurant',
    subtitle: 'Fine Dining',
    tagline: 'EXCEPTIONAL CULINARY EXPERIENCE',
    categories: ['All', 'Appetizers', 'Mains', 'Desserts', 'Drinks'],
    meals: {
      breakfast: [
        {
          id: 1,
          title: 'Continental Breakfast',
          description: 'Start your day with fresh pastries and coffee',
          price: 'USD 25',
          image: '/hero/home.png'
        }
      ],
      lunch: [
        {
          id: 2,
          title: 'Gourmet Lunch',
          description: 'Carefully crafted lunch experience',
          price: 'USD 45',
          image: '/hero/home.png'
        }
      ],
      dinner: [
        {
          id: 3,
          title: 'Chef\'s Special',
          description: 'Our signature dinner creation',
          price: 'USD 85',
          image: '/hero/home.png'
        }
      ]
    }
  }
};

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Get restaurant data or use default
  const restaurantKey = params.name.toLowerCase().replace(/\s+/g, '-');
  const restaurant = restaurantData[restaurantKey as keyof typeof restaurantData] || restaurantData.default;

  const handleViewMenu = (mealId: number) => {
    // Determine meal type based on meal ID ranges
    let mealType = 'breakfast';
    if (mealId >= 4 && mealId <= 6) {
      mealType = 'lunch';
    } else if (mealId >= 7 && mealId <= 9) {
      mealType = 'dinner';
    }
    
    // Navigate to reserve page with restaurant and meal type
    const restaurantKey = params.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/reserve/${restaurantKey}/${mealType}`);
  };

  const handleReserveTable = (mealId: number) => {
    // Handle reserve table action
    console.log('Reserve table for meal:', mealId);
  };

  return (
    <>
    <Hero backgroundImage='/hero/home.png' />
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="text-sm">Back</span>
          </button>

          {/* Restaurant name and tagline */}
          <div className="text-center flex flex-col items-center">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-2">
              <span className="text-primary">{restaurant.name}</span>
              {restaurant.subtitle && (
                <>
                  <span className="text-[#D4AF37] mx-2">-</span>
                  <span className="text-[#D4AF37]">{restaurant.subtitle}</span>
                </>
              )}
            </h1>
            <p className="font-secondary-heading translate-x-[14rem] font-semibold text-base text-[#D4AF37] tracking-widest uppercase">
              {restaurant.tagline}
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-end gap-2 mt-8">
            {restaurant.categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`px-4 py-2 rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none text-sm bg-[#8A8787] font-medium transition-colors ${
                  activeCategory === category
                    ? ' text-primary '
                    : ' text-white'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breakfast Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">
              Breakfast
            </h2>
            <Button 
              variant="outline" 
              onClick={() => {
                const restaurantKey = params.name.toLowerCase().replace(/\s+/g, '-');
                router.push(`/reserve/${restaurantKey}/breakfast`);
              }}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              View All Breakfast
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurant.meals.breakfast.map((meal) => (
              <div key={meal.id} className="relative">
                <MealCard
                  title={meal.title}
                  description={meal.description}
                  price={meal.price}
                  image={meal.image}
                  onViewMenu={() => handleViewMenu(meal.id)}
                  onReserveTable={() => handleReserveTable(meal.id)}
                />
                {meal.badge && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {meal.badge}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Lunch Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">
              Lunch
            </h2>
            <Button 
              variant="outline" 
              onClick={() => {
                const restaurantKey = params.name.toLowerCase().replace(/\s+/g, '-');
                router.push(`/reserve/${restaurantKey}/lunch`);
              }}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              View All Lunch
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurant.meals.lunch.map((meal) => (
              <div key={meal.id} className="relative">
                <MealCard
                  title={meal.title}
                  description={meal.description}
                  price={meal.price}
                  image={meal.image}
                  onViewMenu={() => handleViewMenu(meal.id)}
                  onReserveTable={() => handleReserveTable(meal.id)}
                />
                {meal.badge && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {meal.badge}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Dinner Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">
              Dinner
            </h2>
            <Button 
              variant="outline" 
              onClick={() => {
                const restaurantKey = params.name.toLowerCase().replace(/\s+/g, '-');
                router.push(`/reserve/${restaurantKey}/dinner`);
              }}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              View All Dinner
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurant.meals.dinner.map((meal) => (
              <div key={meal.id} className="relative">
                <MealCard
                  title={meal.title}
                  description={meal.description}
                  price={meal.price}
                  image={meal.image}
                  onViewMenu={() => handleViewMenu(meal.id)}
                  onReserveTable={() => handleReserveTable(meal.id)}
                />
                {meal.badge && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {meal.badge}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
    <ContactSection />
    <Footer />
    </>
  );
}