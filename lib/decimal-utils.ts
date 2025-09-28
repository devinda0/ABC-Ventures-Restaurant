import { Decimal } from '@prisma/client/runtime/library';

/**
 * Utility functions for working with Prisma Decimal types and API responses
 */

// Convert Decimal to number for API responses
export function decimalToNumber(decimal: Decimal | null): number | null {
  if (!decimal) return null;
  return decimal.toNumber();
}

// Convert Decimal to formatted string
export function decimalToString(decimal: Decimal | null, currency = 'USD'): string {
  if (!decimal) return 'N/A';
  return `${currency} ${decimal.toNumber().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Convert number to Decimal for database operations
export function numberToDecimal(value: number): Decimal {
  return new Decimal(value);
}

// Convert string price to number (removes currency symbols and commas)
export function parsePrice(priceString: string): number {
  const cleaned = priceString.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
}

// Format API response to handle Decimal types
export function formatMealForAPI(meal: any) {
  return {
    ...meal,
    price: decimalToNumber(meal.price),
    childPrice: decimalToNumber(meal.childPrice),
  };
}

export function formatRestaurantForAPI(restaurant: any) {
  return {
    ...restaurant,
    meals: restaurant.meals?.map((rm: any) => ({
      ...rm,
      meal: formatMealForAPI(rm.meal),
      specialPrice: decimalToNumber(rm.specialPrice),
    })),
  };
}

export function formatReservationForAPI(reservation: any) {
  return {
    ...reservation,
    totalAmount: decimalToNumber(reservation.totalAmount),
  };
}

// Convert legacy meal data to new format
export function convertLegacyMeal(legacyMeal: any) {
  return {
    id: legacyMeal.id,
    title: legacyMeal.title,
    description: legacyMeal.description || null,
    price: parsePrice(legacyMeal.price),
    childPrice: legacyMeal.childPrice ? parsePrice(legacyMeal.childPrice) : null,
    image: legacyMeal.image || null,
    badge: legacyMeal.badge || null,
    type: 'dinner', // default type for legacy meals
    category: 'main course', // default category
    isAvailable: true,
  };
}