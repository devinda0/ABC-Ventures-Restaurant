'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { CartWithMeal, CheckoutFormData, Order } from '@/types';
import { cartApi } from '@/lib/api-client';

interface CheckoutClientProps {
  items: CartWithMeal[];
  sessionId: string;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

function calculateCartTotal(items: CartWithMeal[]) {
  return items.reduce((total, item) => {
    const adultTotal = Number(item.meal.price) * item.quantity;
    const childPrice = Number(item.meal.childPrice || 0);
    const childTotal = childPrice * item.childQuantity;
    return total + adultTotal + childTotal;
  }, 0);
}

// Mock Stripe payment processing
async function processPayment(
  amount: number,
  formData: CheckoutFormData
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  try {
    const response = await fetch('/api/payment/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'usd',
        paymentMethod: {
          type: formData.paymentMethod,
          card: formData.paymentMethod === 'card' ? {
            number: formData.cardNumber,
            expiry: formData.expiryDate,
            cvv: formData.cvv,
          } : undefined,
        },
        customerInfo: {
          name: formData.customerName,
          email: formData.customerEmail,
          phone: formData.customerPhone,
        },
        metadata: {
          orderId: `order_${Date.now()}`,
          items: 'Restaurant order',
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Payment failed'
      };
    }

    return {
      success: true,
      transactionId: result.payment_intent.id
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
}

// Generate random table number (1-50)
function generateTableNumber(): number {
  return Math.floor(Math.random() * 50) + 1;
}

export default function CheckoutClient({ items, sessionId }: CheckoutClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    specialRequests: '',
  });

  const total = calculateCartTotal(items);
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.substring(0, 19);
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
    }
    
    // Format CVV (numbers only)
    if (name === 'cvv') {
      value = value.replace(/\D/g, '');
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!formData.customerName || !formData.customerEmail) {
      setError('Please fill in all required fields');
      return;
    }

    startTransition(async () => {
      try {
        // Process payment
        const paymentResult = await processPayment(finalTotal, formData);
        
        if (!paymentResult.success) {
          setError(paymentResult.error || 'Payment failed');
          return;
        }

        // Create order
        const order: Order = {
          id: `order_${Date.now()}`,
          items,
          customerInfo: {
            name: formData.customerName,
            email: formData.customerEmail,
            phone: formData.customerPhone,
          },
          paymentDetails: {
            amount: finalTotal,
            currency: 'USD',
            method: formData.paymentMethod,
            cardLast4: formData.cardNumber?.slice(-4),
            transactionId: paymentResult.transactionId!,
          },
          tableNumber: generateTableNumber(),
          totalAmount: finalTotal,
          status: 'confirmed',
          createdAt: new Date(),
          specialRequests: formData.specialRequests,
        };

        // Clear cart
        await cartApi.clearSession(sessionId);

        // Store order in localStorage for success page
        localStorage.setItem('lastOrder', JSON.stringify(order));

        // Redirect to success page
        router.push('/checkout/success');
      } catch (err) {
        console.error('Checkout error:', err);
        setError('An error occurred during checkout. Please try again.');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-medium">Back to Cart</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-2 border-b">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={item.meal.image || '/hero/home.png'}
                      alt={item.meal.title}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.meal.title}</h3>
                    <div className="text-sm text-gray-600">
                      {item.quantity} Adults × {formatCurrency(Number(item.meal.price))}
                      {item.childQuantity > 0 && item.meal.childPrice && (
                        <div>
                          {item.childQuantity} Children × {formatCurrency(Number(item.meal.childPrice))}
                        </div>
                      )}
                    </div>
                    {item.date && (
                      <div className="text-sm text-gray-500">Date: {item.date}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatCurrency(
                        Number(item.meal.price) * item.quantity +
                        Number(item.meal.childPrice || 0) * item.childQuantity
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              {formData.paymentMethod === 'card' && (
                <>
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Any special dietary requirements or requests..."
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay ${formatCurrency(finalTotal)}`
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-4 text-center text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure payment powered by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}