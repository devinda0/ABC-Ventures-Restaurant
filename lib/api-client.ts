import type { 
  ApiResponse, 
  RestaurantWithMeals, 
  MealWithRestaurants,
  CartWithMeal,
  ReservationWithRestaurant,
  CreateRestaurantRequest,
  CreateMealRequest,
  CreateCartRequest,
  CreateReservationRequest,
  UpdateCartRequest,
  UpdateReservationRequest
} from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// Helper function to get the full API URL
function getApiUrl(endpoint: string): string {
  // If we're on the server (no window object), use localhost
  if (typeof window === 'undefined') {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return `${baseUrl}${BASE_URL}${endpoint}`;
  }
  // Client-side can use relative URLs
  return `${BASE_URL}${endpoint}`;
}

// Generic API client with error handling
async function apiClient<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = getApiUrl(endpoint);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Restaurant API functions
export const restaurantApi = {
  // Get all restaurants with optional filters
  getAll: async (params?: {
    includeMeals?: boolean;
    city?: string;
    cuisine?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.includeMeals) searchParams.set('includeMeals', 'true');
    if (params?.city) searchParams.set('city', params.city);
    if (params?.cuisine) searchParams.set('cuisine', params.cuisine);
    
    const query = searchParams.toString();
    return apiClient<RestaurantWithMeals[]>(`/restaurants${query ? `?${query}` : ''}`);
  },

  // Get restaurant by ID
  getById: async (id: number, includeMeals = true) => {
    const params = includeMeals ? '?includeMeals=true' : '';
    return apiClient<RestaurantWithMeals>(`/restaurants/${id}${params}`);
  },

  // Get restaurant by name (for URL-friendly names)
  getByName: async (name: string) => {
    // First get all restaurants and find by name
    const response = await restaurantApi.getAll({ includeMeals: true });
    if (response.success && response.data) {
      const restaurant = response.data.find(r => 
        r.name.toLowerCase().replace(/\s+/g, '-') === name.toLowerCase() ||
        r.name.toLowerCase() === name.toLowerCase()
      );
      
      if (restaurant) {
        return { success: true, data: restaurant } as ApiResponse<RestaurantWithMeals>;
      }
    }
    
    return { success: false, error: 'Restaurant not found' } as ApiResponse<RestaurantWithMeals>;
  },

  // Create restaurant
  create: async (data: CreateRestaurantRequest) => {
    return apiClient<RestaurantWithMeals>('/restaurants', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update restaurant
  update: async (id: number, data: Partial<CreateRestaurantRequest>) => {
    return apiClient<RestaurantWithMeals>(`/restaurants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete restaurant
  delete: async (id: number) => {
    return apiClient<{ id: number }>(`/restaurants/${id}`, {
      method: 'DELETE',
    });
  },
};

// Meal API functions
export const mealApi = {
  // Get all meals with optional filters
  getAll: async (params?: {
    includeRestaurants?: boolean;
    type?: string;
    category?: string;
    restaurantId?: number;
    isAvailable?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.includeRestaurants) searchParams.set('includeRestaurants', 'true');
    if (params?.type) searchParams.set('type', params.type);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.restaurantId) searchParams.set('restaurantId', params.restaurantId.toString());
    if (params?.isAvailable !== undefined) searchParams.set('isAvailable', params.isAvailable.toString());
    
    const query = searchParams.toString();
    return apiClient<MealWithRestaurants[]>(`/meals${query ? `?${query}` : ''}`);
  },

  // Get meal by ID
  getById: async (id: number, includeRestaurants = true) => {
    const params = includeRestaurants ? '?includeRestaurants=true' : '';
    return apiClient<MealWithRestaurants>(`/meals/${id}${params}`);
  },

  // Create meal
  create: async (data: CreateMealRequest) => {
    return apiClient<MealWithRestaurants>('/meals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update meal
  update: async (id: number, data: Partial<CreateMealRequest>) => {
    return apiClient<MealWithRestaurants>(`/meals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete meal
  delete: async (id: number) => {
    return apiClient<{ id: number }>(`/meals/${id}`, {
      method: 'DELETE',
    });
  },
};

// Cart API functions
export const cartApi = {
  // Get cart items by session ID
  getBySession: async (sessionId: string, options: RequestInit = {}) => {
    const query = encodeURIComponent(sessionId);
    return apiClient<CartWithMeal[]>(`/cart?sessionId=${query}`, {
      cache: 'no-store',
      ...options,
    });
  },

  // Add item to cart
  add: async (data: CreateCartRequest) => {
    return apiClient<CartWithMeal>('/cart', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update cart item
  update: async (id: string, data: UpdateCartRequest) => {
    return apiClient<CartWithMeal>(`/cart/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      cache: 'no-store',
    });
  },

  // Remove item from cart
  remove: async (id: string) => {
    return apiClient<{ id: string }>(`/cart/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    });
  },

  // Clear cart by session
  clearSession: async (sessionId: string) => {
    const query = encodeURIComponent(sessionId);
    return apiClient<{ message: string }>(`/cart?sessionId=${query}`, {
      method: 'DELETE',
      cache: 'no-store',
    });
  },
};

// Reservation API functions
export const reservationApi = {
  // Get all reservations (admin)
  getAll: async () => {
    return apiClient<ReservationWithRestaurant[]>('/reservations');
  },

  // Get reservation by ID
  getById: async (id: string) => {
    return apiClient<ReservationWithRestaurant>(`/reservations/${id}`);
  },

  // Create reservation
  create: async (data: CreateReservationRequest) => {
    return apiClient<ReservationWithRestaurant>('/reservations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update reservation
  update: async (id: string, data: UpdateReservationRequest) => {
    return apiClient<ReservationWithRestaurant>(`/reservations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Cancel reservation
  cancel: async (id: string) => {
    return reservationApi.update(id, { status: 'cancelled' });
  },

  // Delete reservation
  delete: async (id: string) => {
    return apiClient<{ id: string }>(`/reservations/${id}`, {
      method: 'DELETE',
    });
  },
};

// Restaurant-Meals relationship API
export const restaurantMealApi = {
  // Assign meal to restaurant
  assign: async (data: { restaurantId: number; mealId: number; isAvailable?: boolean; specialPrice?: number }) => {
    return apiClient<any>('/restaurant-meals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update meal availability for restaurant
  update: async (id: number, data: { isAvailable?: boolean; specialPrice?: number }) => {
    return apiClient<any>(`/restaurant-meals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Remove meal from restaurant
  remove: async (id: number) => {
    return apiClient<{ id: number }>(`/restaurant-meals/${id}`, {
      method: 'DELETE',
    });
  },
};

// Utility functions
export const utils = {
  // Generate session ID for cart
  generateSessionId: () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  // Get or create session ID from localStorage
  getSessionId: () => {
    if (typeof window === 'undefined') return '';
    
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = utils.generateSessionId();
      localStorage.setItem('cart_session_id', sessionId);
    }

    try {
      const maxAge = 60 * 60 * 24 * 30; // 30 days
      document.cookie = `cart_session_id=${sessionId}; path=/; max-age=${maxAge}; sameSite=Lax`;
    } catch (error) {
      console.warn('Unable to set cart session cookie', error);
    }
    return sessionId;
  },

  // Format price for display
  formatPrice: (price: number, currency = 'USD') => {
    return `${currency} ${price.toLocaleString()}`;
  },

  // Convert restaurant name to URL-friendly format
  slugify: (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  },

  // Convert URL slug back to searchable format
  unslugify: (slug: string) => {
    return slug.replace(/-/g, ' ');
  },
};

export default {
  restaurant: restaurantApi,
  meal: mealApi,
  cart: cartApi,
  reservation: reservationApi,
  restaurantMeal: restaurantMealApi,
  utils,
};