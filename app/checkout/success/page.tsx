'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Order } from '@/types';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order from localStorage
    const lastOrder = localStorage.getItem('lastOrder');
    
    if (lastOrder) {
      try {
        const parsedOrder = JSON.parse(lastOrder);
        setOrder(parsedOrder);
        // Clear the order from localStorage after retrieving it
        localStorage.removeItem('lastOrder');
      } catch (error) {
        console.error('Error parsing order:', error);
        router.push('/');
      }
    } else {
      // No order found, redirect to home
      router.push('/');
    }
    
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
          <Link href="/" className="text-primary hover:text-primary/80">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your order has been confirmed and is being prepared.</p>
        </div>

        {/* Table Number Card */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-primary p-8 text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Your Table Number</h2>
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-white">{order.tableNumber}</span>
          </div>
          <p className="text-gray-600">Please proceed to table {order.tableNumber} when you arrive at the restaurant.</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <span className="text-gray-600">Order ID:</span>
              <div className="font-mono">{order.id}</div>
            </div>
            <div>
              <span className="text-gray-600">Transaction ID:</span>
              <div className="font-mono">{order.paymentDetails.transactionId}</div>
            </div>
            <div>
              <span className="text-gray-600">Payment Method:</span>
              <div className="capitalize">
                {order.paymentDetails.method}
                {order.paymentDetails.cardLast4 && ` ending in ${order.paymentDetails.cardLast4}`}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Order Date:</span>
              <div>{new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Customer Information</h3>
            <div className="space-y-1 text-sm">
              <div><span className="text-gray-600">Name:</span> {order.customerInfo.name}</div>
              <div><span className="text-gray-600">Email:</span> {order.customerInfo.email}</div>
              {order.customerInfo.phone && (
                <div><span className="text-gray-600">Phone:</span> {order.customerInfo.phone}</div>
              )}
            </div>
          </div>

          {order.specialRequests && (
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-2">Special Requests</h3>
              <p className="text-sm text-gray-600">{order.specialRequests}</p>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-2 border-b last:border-b-0">
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

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Paid</span>
              <span>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 bg-primary text-white text-center py-3 px-6 rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            Print Receipt
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 text-blue-600 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm">
              <h4 className="font-medium text-blue-900 mb-1">What's next?</h4>
              <ul className="text-blue-800 space-y-1">
                <li>• Your order is being prepared by our kitchen team</li>
                <li>• Please arrive at the restaurant and proceed to table {order.tableNumber}</li>
                <li>• Estimated preparation time: 15-25 minutes</li>
                <li>• You'll receive an email confirmation shortly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}