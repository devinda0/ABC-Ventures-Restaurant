'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

interface CartIconProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function CartIcon({ variant = 'dark', className = '' }: CartIconProps) {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  const iconColor = variant === 'light' ? 'text-white' : 'text-gray-700';
  const hoverColor = variant === 'light' ? 'hover:bg-white/20' : 'hover:bg-gray-100';

  return (
    <Link 
      href="/cart"
      className={`relative inline-flex items-center justify-center p-2 rounded-full ${hoverColor} transition-colors ${className}`}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      {/* Cart Icon */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={iconColor}
      >
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      
      {/* Item Count Badge */}
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}