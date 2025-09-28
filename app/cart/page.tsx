"use client"

import { useEffect } from 'react';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { utils } from '@/lib/api-client';
import type { QuantityType } from '@/types';

export default function CartPage() {
  const {
    items: cartItems,
    loading,
    error,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    refreshCart
  } = useCart();

  // Refresh cart on page load
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const updateQuantity = async (id: string, newQuantity: number, type: QuantityType = 'adult') => {
    if (newQuantity < 0) return;
    if (type === 'adult' && newQuantity < 1) return; // Adults must be at least 1
    
    const updates = type === 'adult' 
      ? { quantity: newQuantity }
      : { childQuantity: newQuantity };
    
    await updateCartItem(id, updates);
  };

  const removeItem = async (id: string) => {
    await removeFromCart(id);
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  const calculateTotal = () => {
    return getCartTotal();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Hero backgroundImage="/hero/home.png" activePage="Home" />
        <main className="flex flex-col w-full my-8 px-10">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your cart...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero backgroundImage="/hero/home.png" activePage="Home" />
      
      {/* Cart Content */}
      <main className='flex flex-col w-full my-8 px-10'>
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <Link 
            href="/"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path 
                d="M15 18L9 12L15 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-medium">Go Back</span>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Cart Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          {cartItems.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="flex flex-col gap-10 w-full items-center py-20">
            <div className="text-center">
              <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="text-gray-400"
                >
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Link
                href="/restaurant"
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Browse Restaurants
              </Link>
            </div>
          </div>
        ) : (
          /* Cart with Items */
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white border rounded-lg p-6 shadow-sm">
                    <div className="flex gap-4">
                      {/* Item Image */}
                      <div className="h-24 w-32 bg-gray-100 overflow-hidden rounded-lg flex-shrink-0">
                        <Image
                          src={item.meal.image || '/hero/home.png'}
                          alt={item.meal.title}
                          width={128}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.meal.title}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                        
                        {item.meal.description && (
                          <p className="text-sm text-gray-600 mb-3">{item.meal.description}</p>
                        )}

                        {/* Restaurant Info */}
                        {item.restaurantId && (
                          <p className="text-sm text-gray-500 mb-2">Restaurant ID: {item.restaurantId}</p>
                        )}

                        {/* Date */}
                        {item.date && (
                          <p className="text-sm text-gray-500 mb-4">Date: {item.date}</p>
                        )}

                        {/* Quantity Controls */}
                        <div className="space-y-3">
                          {/* Adult Quantity */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Adults ({utils.formatPrice(Number(item.meal.price))} each):</span>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1, 'adult')}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 p-0"
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1, 'adult')}
                                className="h-8 w-8 p-0"
                              >
                                +
                              </Button>
                            </div>
                          </div>

                          {/* Child Quantity (if child price available) */}
                          {item.meal.childPrice && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Children ({utils.formatPrice(Number(item.meal.childPrice))} each):</span>
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.childQuantity - 1, 'child')}
                                  disabled={item.childQuantity <= 0}
                                  className="h-8 w-8 p-0"
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center">{item.childQuantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.childQuantity + 1, 'child')}
                                  className="h-8 w-8 p-0"
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Item Total */}
                        <div className="mt-4 pt-3 border-t">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Item Total:</span>
                            <span className="font-semibold text-lg">
                              {utils.formatPrice(
                                (Number(item.meal.price) * item.quantity) + 
                                (Number(item.meal.childPrice || 0) * item.childQuantity)
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Items ({getCartItemCount()}):</span>
                    <span>{utils.formatPrice(calculateTotal())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Service Fee:</span>
                    <span>Free</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-lg font-bold text-primary">
                        {utils.formatPrice(calculateTotal())}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                  Proceed to Checkout
                </Button>
                
                <Link
                  href="/restaurant"
                  className="block w-full text-center mt-3 text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}