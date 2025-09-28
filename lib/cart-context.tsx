'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { cartApi, utils } from '@/lib/api-client';
import type { CartWithMeal, CreateCartRequest, UpdateCartRequest } from '@/types';

// Cart Context Types
interface CartState {
  items: CartWithMeal[];
  loading: boolean;
  error: string | null;
  sessionId: string;
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ITEMS'; payload: CartWithMeal[] }
  | { type: 'ADD_ITEM'; payload: CartWithMeal }
  | { type: 'UPDATE_ITEM'; payload: CartWithMeal }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_SESSION_ID'; payload: string };

interface CartContextType extends CartState {
  addToCart: (mealId: number, restaurantId?: number, quantity?: number, childQuantity?: number, date?: string) => Promise<void>;
  updateCartItem: (id: string, updates: UpdateCartRequest) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  refreshCart: () => Promise<void>;
}

// Initial state
const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  sessionId: '',
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_ITEMS':
      return { ...state, items: action.payload, loading: false, error: null };
    
    case 'ADD_ITEM':
      // Check if item already exists, if so update quantity
      const existingItemIndex = state.items.findIndex(
        item => item.mealId === action.payload.mealId && 
                 item.restaurantId === action.payload.restaurantId &&
                 item.date === action.payload.date
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = action.payload;
        return { ...state, items: updatedItems, loading: false, error: null };
      } else {
        return { 
          ...state, 
          items: [...state.items, action.payload], 
          loading: false, 
          error: null 
        };
      }
    
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        loading: false,
        error: null
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [], loading: false, error: null };
    
    case 'SET_SESSION_ID':
      return { ...state, sessionId: action.payload };
    
    default:
      return state;
  }
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initialize session ID and load cart
  useEffect(() => {
    const sessionId = utils.getSessionId();
    dispatch({ type: 'SET_SESSION_ID', payload: sessionId });
    loadCart(sessionId);
  }, []);

  // Load cart from API
  const loadCart = async (sessionId: string) => {
    if (!sessionId) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await cartApi.getBySession(sessionId);
      if (response.success && response.data) {
        dispatch({ type: 'SET_ITEMS', payload: response.data });
      } else {
        dispatch({ type: 'SET_ITEMS', payload: [] });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load cart' });
    }
  };

  // Add item to cart
  const addToCart = async (
    mealId: number, 
    restaurantId?: number, 
    quantity = 1, 
    childQuantity = 0, 
    date?: string
  ) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const cartData: CreateCartRequest = {
        sessionId: state.sessionId,
        mealId,
        quantity,
        childQuantity,
        restaurantId,
        date,
      };

      const response = await cartApi.add(cartData);
      if (response.success && response.data) {
        dispatch({ type: 'ADD_ITEM', payload: response.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to add item to cart' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add item to cart' });
    }
  };

  // Update cart item
  const updateCartItem = async (id: string, updates: UpdateCartRequest) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await cartApi.update(id, updates);
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_ITEM', payload: response.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to update cart item' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update cart item' });
    }
  };

  // Remove item from cart
  const removeFromCart = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await cartApi.remove(id);
      if (response.success) {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to remove item from cart' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await cartApi.clearSession(state.sessionId);
      if (response.success) {
        dispatch({ type: 'CLEAR_CART' });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to clear cart' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear cart' });
    }
  };

  // Refresh cart from server
  const refreshCart = async () => {
    await loadCart(state.sessionId);
  };

  // Calculate total price
  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const itemTotal = (Number(item.meal.price) * item.quantity) + 
                       (Number(item.meal.childPrice || 0) * item.childQuantity);
      return total + itemTotal;
    }, 0);
  };

  // Get total item count
  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity + item.childQuantity, 0);
  };

  const contextValue: CartContextType = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    refreshCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartProvider;