// Example usage of the Restaurant API endpoints
// This file demonstrates how to interact with the CRUD APIs

const BASE_URL = 'http://localhost:3000/api';

// Restaurant API Examples
export const restaurantExamples = {
  // Create a restaurant
  async createRestaurant() {
    const response = await fetch(`${BASE_URL}/restaurants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "Bella Italia",
        subtitle: "Authentic Italian Cuisine",
        tagline: "Taste of Italy in every bite",
        description: "Family-owned restaurant serving traditional Italian dishes",
        cuisine: "Italian",
        image: "/images/bella-italia.jpg",
        gallery: ["/images/bella1.jpg", "/images/bella2.jpg"],
        city: "City A",
        address: "123 Italian Street, City A",
        phone: "+1234567890",
        email: "info@bellaitalia.com",
        website: "https://bellaitalia.com"
      })
    });
    
    return await response.json();
  },

  // Get all restaurants
  async getAllRestaurants() {
    const response = await fetch(`${BASE_URL}/restaurants?includeMeals=true`);
    return await response.json();
  },

  // Get restaurant by ID
  async getRestaurant(id: number) {
    const response = await fetch(`${BASE_URL}/restaurants/${id}?includeMeals=true`);
    return await response.json();
  },

  // Update restaurant
  async updateRestaurant(id: number) {
    const response = await fetch(`${BASE_URL}/restaurants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: 4.5,
        reviews: 150
      })
    });
    
    return await response.json();
  }
};

// Meal API Examples
export const mealExamples = {
  // Create a meal
  async createMeal() {
    const response = await fetch(`${BASE_URL}/meals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: "Margherita Pizza",
        description: "Classic pizza with tomato, mozzarella, and fresh basil",
        price: 18.99,
        childPrice: 12.99,
        image: "/images/margherita.jpg",
        badge: "Popular",
        type: "dinner",
        category: "main course",
        isAvailable: true
      })
    });
    
    return await response.json();
  },

  // Get meals by type
  async getMealsByType(type: string) {
    const response = await fetch(`${BASE_URL}/meals?type=${type}&includeRestaurants=true`);
    return await response.json();
  },

  // Get meals for specific restaurant
  async getMealsForRestaurant(restaurantId: number) {
    const response = await fetch(`${BASE_URL}/meals?restaurantId=${restaurantId}`);
    return await response.json();
  }
};

// Restaurant-Meals API Examples
export const restaurantMealExamples = {
  // Assign meal to restaurant
  async assignMealToRestaurant(restaurantId: number, mealId: number) {
    const response = await fetch(`${BASE_URL}/restaurant-meals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurantId,
        mealId,
        isAvailable: true,
        specialPrice: 16.99 // Optional special pricing
      })
    });
    
    return await response.json();
  },

  // Get restaurant's menu
  async getRestaurantMenu(restaurantId: number) {
    const response = await fetch(`${BASE_URL}/restaurant-meals?restaurantId=${restaurantId}`);
    return await response.json();
  }
};

// Cart API Examples
export const cartExamples = {
  // Add item to cart
  async addToCart(sessionId: string, mealId: number) {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        mealId,
        quantity: 2,
        childQuantity: 1,
        restaurantId: 1,
        date: "2024-01-15"
      })
    });
    
    return await response.json();
  },

  // Get cart items
  async getCart(sessionId: string) {
    const response = await fetch(`${BASE_URL}/cart?sessionId=${sessionId}`);
    return await response.json();
  },

  // Update cart item
  async updateCartItem(cartId: string, quantity: number) {
    const response = await fetch(`${BASE_URL}/cart/${cartId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity,
        childQuantity: 0
      })
    });
    
    return await response.json();
  },

  // Remove item from cart
  async removeFromCart(cartId: string) {
    const response = await fetch(`${BASE_URL}/cart/${cartId}`, {
      method: 'DELETE'
    });
    
    return await response.json();
  }
};

// Reservation API Examples
export const reservationExamples = {
  // Create reservation
  async createReservation() {
    const response = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurantId: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        date: "2024-01-15",
        time: "19:30",
        adultCount: 2,
        childCount: 1,
        specialRequests: "Window seat if available"
      })
    });
    
    return await response.json();
  },

  // Get reservations for restaurant
  async getRestaurantReservations(restaurantId: number, date?: string) {
    let url = `${BASE_URL}/reservations?restaurantId=${restaurantId}`;
    if (date) url += `&date=${date}`;
    
    const response = await fetch(url);
    return await response.json();
  },

  // Update reservation status
  async updateReservationStatus(reservationId: string, status: string) {
    const response = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        totalAmount: 89.99
      })
    });
    
    return await response.json();
  },

  // Get customer reservations
  async getCustomerReservations(email: string) {
    const response = await fetch(`${BASE_URL}/reservations?email=${encodeURIComponent(email)}`);
    return await response.json();
  }
};

// Example workflow: Create a complete restaurant setup
export const completeSetupExample = {
  async setupRestaurantWithMenu() {
    try {
      // 1. Create restaurant
      const restaurant = await restaurantExamples.createRestaurant();
      console.log('Created restaurant:', restaurant);
      
      if (!restaurant.success) return restaurant;
      
      const restaurantId = restaurant.data.id;
      
      // 2. Create meals
      const meals = [];
      const mealData = [
        {
          title: "Margherita Pizza",
          description: "Classic pizza with tomato, mozzarella, and fresh basil",
          price: 18.99,
          childPrice: 12.99,
          type: "dinner",
          category: "main course"
        },
        {
          title: "Caesar Salad",
          description: "Fresh romaine lettuce with caesar dressing",
          price: 14.99,
          childPrice: 9.99,
          type: "lunch",
          category: "salad"
        },
        {
          title: "Tiramisu",
          description: "Traditional Italian dessert",
          price: 8.99,
          type: "dinner",
          category: "dessert"
        }
      ];
      
      for (const mealInfo of mealData) {
        const meal = await fetch(`${BASE_URL}/meals`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mealInfo)
        }).then(r => r.json());
        
        if (meal.success) {
          meals.push(meal.data);
          
          // 3. Assign meal to restaurant
          await restaurantMealExamples.assignMealToRestaurant(restaurantId, meal.data.id);
        }
      }
      
      // 4. Create a sample reservation
      const reservation = await fetch(`${BASE_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId,
          name: "Sample Customer",
          email: "customer@example.com",
          date: "2024-01-20",
          time: "20:00",
          adultCount: 2
        })
      }).then(r => r.json());
      
      return {
        success: true,
        data: {
          restaurant: restaurant.data,
          meals,
          reservation: reservation.data
        }
      };
      
    } catch (error) {
      console.error('Setup failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Setup failed' };
    }
  }
};

// Usage in a React component or API route:
/*
// In a React component
const [restaurants, setRestaurants] = useState([]);

useEffect(() => {
  restaurantExamples.getAllRestaurants()
    .then(result => {
      if (result.success) {
        setRestaurants(result.data);
      }
    });
}, []);

// In an API route or server action
const result = await completeSetupExample.setupRestaurantWithMenu();
if (result.success) {
  console.log('Restaurant setup complete!');
}
*/