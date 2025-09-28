import { prisma } from './prisma';
import { formatMealForAPI } from './decimal-utils';
import type { RestaurantWithMeals, MealWithRestaurants } from '@/types';

// Server-side data fetching functions that directly access the database
// This avoids HTTP requests during server-side rendering

export const serverDataApi = {
  // Get all restaurants with optional filters
  restaurants: {
    getAll: async (params?: {
      includeMeals?: boolean;
      city?: string;
      cuisine?: string;
    }): Promise<RestaurantWithMeals[]> => {
      try {
        const where: any = {};
        if (params?.city) where.city = params.city;
        if (params?.cuisine) where.cuisine = params.cuisine;

        const restaurants = await prisma.restaurant.findMany({
          where,
          include: params?.includeMeals ? {
            meals: {
              include: {
                meal: true
              }
            }
          } : undefined,
          orderBy: {
            rating: 'desc'
          }
        });

        return restaurants as RestaurantWithMeals[];
      } catch (error) {
        console.error('Error fetching restaurants from database:', error);
        return [];
      }
    },

    getById: async (id: number, includeMeals = true): Promise<RestaurantWithMeals | null> => {
      try {
        const restaurant = await prisma.restaurant.findUnique({
          where: { id },
          include: includeMeals ? {
            meals: {
              include: {
                meal: true
              }
            }
          } : undefined
        });

        return restaurant as RestaurantWithMeals | null;
      } catch (error) {
        console.error('Error fetching restaurant from database:', error);
        return null;
      }
    },

    getByName: async (name: string): Promise<RestaurantWithMeals | null> => {
      try {
        // First try exact name match
        let restaurant = await prisma.restaurant.findFirst({
          where: {
            name: name
          },
          include: {
            meals: {
              include: {
                meal: true
              }
            }
          }
        });

        // If not found, try slug-like matching
        if (!restaurant) {
          const restaurants = await prisma.restaurant.findMany({
            include: {
              meals: {
                include: {
                  meal: true
                }
              }
            }
          });

          restaurant = restaurants.find(r => 
            r.name.toLowerCase().replace(/\s+/g, '-') === name.toLowerCase() ||
            r.name.toLowerCase() === name.toLowerCase()
          ) || null;
        }

        return restaurant as RestaurantWithMeals | null;
      } catch (error) {
        console.error('Error fetching restaurant by name from database:', error);
        return null;
      }
    }
  },

  // Get all meals with optional filters
  meals: {
    getAll: async (params?: {
      includeRestaurants?: boolean;
      type?: string;
      category?: string;
      restaurantId?: number;
      isAvailable?: boolean;
    }): Promise<MealWithRestaurants[]> => {
      try {
        const where: any = {};
        if (params?.type) where.type = params.type;
        if (params?.category) where.category = params.category;
        if (params?.isAvailable !== undefined) where.isAvailable = params.isAvailable;

        let meals;
        if (params?.restaurantId) {
          meals = await prisma.meal.findMany({
            where: {
              ...where,
              restaurants: {
                some: {
                  restaurantId: params.restaurantId,
                  isAvailable: true
                }
              }
            },
            include: params?.includeRestaurants ? {
              restaurants: {
                include: {
                  restaurant: true
                }
              }
            } : undefined,
            orderBy: {
              title: 'asc'
            }
          });
        } else {
          meals = await prisma.meal.findMany({
            where,
            include: params?.includeRestaurants ? {
              restaurants: {
                include: {
                  restaurant: true
                }
              }
            } : undefined,
            orderBy: {
              title: 'asc'
            }
          });
        }

        // Format meals with proper decimal handling
        return meals.map(formatMealForAPI) as MealWithRestaurants[];
      } catch (error) {
        console.error('Error fetching meals from database:', error);
        return [];
      }
    },

    getById: async (id: number, includeRestaurants = true): Promise<MealWithRestaurants | null> => {
      try {
        const meal = await prisma.meal.findUnique({
          where: { id },
          include: includeRestaurants ? {
            restaurants: {
              include: {
                restaurant: true
              }
            }
          } : undefined
        });

        return meal ? formatMealForAPI(meal) as MealWithRestaurants : null;
      } catch (error) {
        console.error('Error fetching meal from database:', error);
        return null;
      }
    }
  }
};