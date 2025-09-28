// Central exports for all types

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