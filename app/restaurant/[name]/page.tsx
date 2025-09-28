'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import MealCard from '@/components/meal-card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import { restaurantApi, utils } from '@/lib/api-client';
import type { MealType, RestaurantPageProps, RestaurantWithMeals } from '@/types';

const MEAL_SECTIONS: { key: MealType; title: string }[] = [
  { key: 'breakfast', title: 'Breakfast' },
  { key: 'lunch', title: 'Lunch' },
  { key: 'dinner', title: 'Dinner' },
];

const FALLBACK_IMAGE = '/hero/home.png';
const FALLBACK_TAGLINE = 'EXCEPTIONAL CULINARY EXPERIENCE';

type GroupedMeals = Record<MealType, DisplayMeal[]>;

interface DisplayMeal {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  badge?: string | null;
  type: MealType;
}

interface ToNumberLike {
  toNumber: () => number;
}

interface ToStringLike {
  toString: () => string;
}

function hasToNumber(value: unknown): value is ToNumberLike {
  return (
    typeof value === 'object' &&
    value !== null &&
    'toNumber' in value &&
    typeof (value as { toNumber?: unknown }).toNumber === 'function'
  );
}

function hasToString(value: unknown): value is ToStringLike {
  return (
    typeof value === 'object' &&
    value !== null &&
    'toString' in value &&
    typeof (value as { toString?: unknown }).toString === 'function'
  );
}

function parsePrice(value: unknown): number {
  if (value === null || value === undefined) {
    return 0;
  }

  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  if (hasToNumber(value)) {
    const numeric = value.toNumber();
    return Number.isFinite(numeric) ? numeric : 0;
  }

  if (hasToString(value)) {
    const parsed = parseFloat(value.toString());
    return Number.isFinite(parsed) ? parsed : 0;
  }

  const coerced = Number(value);
  return Number.isFinite(coerced) ? coerced : 0;
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [restaurant, setRestaurant] = useState<RestaurantWithMeals | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cancelRef = useRef(false);

  const fetchRestaurant = useCallback(async () => {
    setLoading(true);
    setError(null);

    const response = await restaurantApi.getByName(params.name);

    if (cancelRef.current) {
      return;
    }

    if (response.success && response.data) {
      setRestaurant(response.data);
    } else {
      setRestaurant(null);
      setError(response.error ?? 'Unable to load restaurant details right now.');
    }

    if (!cancelRef.current) {
      setLoading(false);
    }
  }, [params.name]);

  useEffect(() => {
    cancelRef.current = false;
    fetchRestaurant();

    return () => {
      cancelRef.current = true;
    };
  }, [fetchRestaurant]);

  const categories = useMemo(() => {
    if (!restaurant) {
      return ['All'];
    }

    const categoryList = restaurant.meals
      .map((relationship) => relationship.meal.category?.trim())
      .filter((category): category is string => Boolean(category));

    const uniqueCategories = Array.from(new Set(categoryList));
    return ['All', ...uniqueCategories];
  }, [restaurant]);

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory('All');
    }
  }, [categories, activeCategory]);

  const groupedMeals: GroupedMeals = useMemo(() => {
    const base: GroupedMeals = {
      breakfast: [],
      lunch: [],
      dinner: [],
    };

    if (!restaurant) {
      return base;
    }

    restaurant.meals
      .filter((relationship) => relationship.isAvailable !== false)
      .forEach((relationship) => {
        const meal = relationship.meal;
        const rawType = typeof meal.type === 'string' ? meal.type.toLowerCase() : '';
        const normalizedType: MealType = ['breakfast', 'lunch', 'dinner'].includes(rawType)
          ? (rawType as MealType)
          : 'breakfast';

        const category = meal.category?.trim();
        if (activeCategory !== 'All' && category !== activeCategory) {
          return;
        }

        const priceNumber = relationship.specialPrice ?? meal.price;
        const formattedPrice = utils.formatPrice(parsePrice(priceNumber));

        base[normalizedType].push({
          id: meal.id,
          title: meal.title,
          description: meal.description ?? 'No description available at the moment.',
          price: formattedPrice,
          image: meal.image || restaurant.image || FALLBACK_IMAGE,
          badge: meal.badge,
          type: normalizedType,
        });
      });

    return base;
  }, [restaurant, activeCategory]);

  const handleViewMenu = (mealId: number) => {
    console.log('View menu for meal:', mealId);
  };

  const handleReserveTable = (mealType: MealType) => {
    router.push(`/reserve/${params.name}/${mealType}`);
  };

  const handleRetry = () => {
    cancelRef.current = false;
    fetchRestaurant();
  };

  const heroImage = restaurant?.image || FALLBACK_IMAGE;
  const displayName = restaurant?.name || utils.unslugify(params.name).replace(/\b\w/g, (char) => char.toUpperCase());
  const displaySubtitle = restaurant?.subtitle || restaurant?.city || '';
  const displayTagline = restaurant?.tagline || FALLBACK_TAGLINE;

  return (
    <>
      <Hero backgroundImage={heroImage} activePage="Restaurant" />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="text-sm">Back</span>
            </button>

            <div className="text-center flex flex-col items-center">
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-2">
                <span className="text-primary">{displayName}</span>
                {displaySubtitle && (
                  <>
                    <span className="text-[#D4AF37] mx-2">-</span>
                    <span className="text-[#D4AF37]">{displaySubtitle}</span>
                  </>
                )}
              </h1>
              <p className="font-secondary-heading font-semibold text-base text-[#D4AF37] tracking-widest uppercase">
                {displayTagline}
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-2 mt-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveCategory(category)}
                  disabled={loading && category !== 'All'}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {error && (
            <div className="mb-12 rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
              <p className="font-semibold">{error}</p>
              <Button className="mt-4" onClick={handleRetry} variant="default">
                Try again
              </Button>
            </div>
          )}

          {MEAL_SECTIONS.map(({ key, title }) => {
            const meals = groupedMeals[key];
            const shouldRender = loading || meals.length > 0;

            if (!shouldRender) {
              return null;
            }

            return (
              <section key={key} className="mb-16">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
                  {title}
                </h2>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="relative h-[420px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                      >
                        <div className="h-56 w-full animate-pulse rounded-xl bg-gray-200" />
                        <div className="mt-4 space-y-3">
                          <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                          <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
                          <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : meals.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {meals.map((meal) => (
                      <div key={meal.id} className="relative">
                        <MealCard
                          title={meal.title}
                          description={meal.description}
                          price={meal.price}
                          image={meal.image}
                          onViewMenu={() => handleViewMenu(meal.id)}
                          onReserveTable={() => handleReserveTable(meal.type)}
                        />
                        {meal.badge && (
                          <div className="absolute top-4 left-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                            {meal.badge}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
                    No {title.toLowerCase()} options match the selected filters right now.
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}