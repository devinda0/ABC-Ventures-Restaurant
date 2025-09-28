// Central exports for all types
import { 
  Restaurant as PrismaRestaurant, 
  Meal as PrismaMeal, 
  Cart as PrismaCart, 
  Reservation as PrismaReservation, 
  Restaurant_Meals as PrismaRestaurant_Meals 
} from '@prisma/client';

// Prisma types exports
export type { 
  PrismaRestaurant as DbRestaurant, 
  PrismaMeal as DbMeal, 
  PrismaCart as DbCart, 
  PrismaReservation as DbReservation, 
  PrismaRestaurant_Meals as DbRestaurant_Meals 
};

// Extended types with relations
export type RestaurantWithMeals = PrismaRestaurant & {
  meals: (PrismaRestaurant_Meals & {
    meal: PrismaMeal;
  })[];
};

export type MealWithRestaurants = PrismaMeal & {
  restaurants: (PrismaRestaurant_Meals & {
    restaurant: PrismaRestaurant;
  })[];
};

export type CartWithMeal = PrismaCart & {
  meal: PrismaMeal;
};

export type ReservationWithRestaurant = PrismaReservation & {
  restaurant: PrismaRestaurant;
};

// API request/response types
export interface CreateRestaurantRequest {
  name: string;
  subtitle?: string;
  tagline?: string;
  description?: string;
  cuisine?: string;
  image?: string;
  gallery?: string[];
  city?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface UpdateRestaurantRequest extends Partial<CreateRestaurantRequest> {
  rating?: number;
  reviews?: number;
}

export interface CreateMealRequest {
  title: string;
  description?: string;
  price: number;
  childPrice?: number;
  image?: string;
  badge?: string;
  type: string;
  category?: string;
  isAvailable?: boolean;
}

export interface UpdateMealRequest extends Partial<CreateMealRequest> {}

export interface CreateCartRequest {
  sessionId: string;
  userId?: string;
  mealId: number;
  quantity?: number;
  childQuantity?: number;
  restaurantId?: number;
  date?: string;
}

export interface UpdateCartRequest extends Partial<Omit<CreateCartRequest, 'sessionId' | 'mealId'>> {}

export interface CreateReservationRequest {
  restaurantId: number;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  adultCount?: number;
  childCount?: number;
  specialRequests?: string;
}

export interface UpdateReservationRequest extends Partial<Omit<CreateReservationRequest, 'restaurantId'>> {
  status?: string;
  totalAmount?: number;
}

export interface AssignMealToRestaurantRequest {
  restaurantId: number;
  mealId: number;
  isAvailable?: boolean;
  specialPrice?: number;
}

// Common types used across the application
export type PageName = 'Home' | 'About' | 'Restaurant' | 'Services' | 'Contact';
export type MealType = 'breakfast' | 'lunch' | 'dinner';
export type MealTypeDisplay = 'Breakfast' | 'Lunch' | 'Dinner';
export type City = 'City A' | 'City B' | 'City C' | 'City D';

// Form validation error types
export interface FormErrors {
  [key: string]: string;
}

// Navigation item structure
export interface NavItem {
  name: string;
  href: string;
}

// Generic API response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Component prop types
export interface HeroProps {
  backgroundImage?: string;
  activePage?: PageName;
}

export interface MealCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  onViewMenu?: () => void;
  onReserveTable?: () => void;
}

export interface RestaurantCardProps {
  title: string;
  image: string;
  onClick?: () => void;
}

export interface SelectProps extends React.ComponentProps<"select"> {
  placeholder?: string;
}

// Restaurant and meal related types
export interface RestaurantPageProps {
  params: {
    name: string;
  };
}

export interface Meal {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

export interface RestaurantData {
  name: string;
  subtitle: string;
  tagline: string;
  categories: string[];
  meals: {
    [K in MealType]: Meal[];
  };
}

export interface RestaurantDetails {
  title: string;
  subtitle: string;
  name?: string;
  cuisine?: string;
  description: string;
  time: string;
  price: number;
  childPrice: number;
  image: string;
  gallery: string[];
  currency: string;
  rating: number;
  reviews: number;
}

// Cart related types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  childQuantity: number;
  childPrice: number;
  image: string;
  type: string;
  date: string;
}

export type QuantityType = 'adult' | 'child';

// Review related types
export interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
  date: string;
  profileImage: string;
}

export interface Review {
  name: string;
  rating: number;
  review: string;
  date: string;
  profileImage: string;
}

// Navigation related types
export interface ReservePageParams {
  restaurant: string;
  type: string;
}

export interface RestaurantPageParams {
  name: string;
}