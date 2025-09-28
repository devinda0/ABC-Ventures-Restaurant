"use client"

import { useEffect } from 'react';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import { Button } from '@/compon                      {/* image */}
                      <div className=' h-[102px] w-[150px] bg-[#E8E8E8] overflow-hidden rounded-tl-2xl rounded-br-2xl flex-shrink-0'>
                        <Image
                          src={item.meal.image || '/hero/home.png'}
                          alt={item.meal.title}
                          width={150}
                          height={102}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* item name and details */}
                      <div className=' px-6'>
                        <h2 className='text-xl font-semibold text-primary mb-2'>{item.meal.title}</h2>
                        <p className='text-sm text-gray-600'>{item.quantity} Adults x {utils.formatPrice(Number(item.meal.price))}</p>
                        {item.childQuantity > 0 && item.meal.childPrice && (
                          <p className='text-sm text-gray-600'>{item.childQuantity} Children x {utils.formatPrice(Number(item.meal.childPrice))}</p>
                        )}mport Link from 'next/link';
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero backgroundImage="/hero/home.png" activePage="Home" />
      
      {/* Cart Content */}
      <main className='flex flex-col w-full my-8 px-10'>
        {/* Cart */}
        <div>
          {cartItems.length === 0 ? (
            <div className=' w-full flex flex-col gap-10 px-10'>
              {/* back button */}
                <div className="flex items-center">
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

              {/* cart items */}
              <div className=' flex flex-col gap-10 w-full'>
                  <div className=' flex flex-col gap-5 w-full'>
                    {/* item data */}
                    <div className='flex items-center justify-start w-full px-4 py-4 rounded-lg'>
                      {/* image */}
                      <div className=' h-[102px] w-[150px] bg-[#E8E8E8] overflow-hidden rounded-tl-2xl rounded-br-2xl flex-shrink-0'>
                        
                      </div>

                      {/* item name and details */}
                      <div className=' px-6'>
                        <h2 className='text-xl font-semibold text-primary mb-2'>{"No Items in Cart"}</h2>
                        
                      </div>
                    </div>
                    <div className=' w-full h-[2px] bg-[#D4AF37] my-3 ' />
                  </div>
              </div>

              {/* cart summary */}
              <div className=" w-full flex justify-end ">
                <div className=' flex flex-col gap-6'>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold">Total</span>
                    <span className="text-xl font-semibold ml-2">USD {calculateTotal()}</span>
                  </div>
                  <Button 
                    className="w-full bg-[#AAAAAA] rounded-none rounded-tl-2xl rounded-br-2xl text-white font-semibold py-4 px-2"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className=' w-full flex flex-col gap-10 px-10'>
              {/* back button */}
                <div className="flex items-center">
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

              {/* cart items */}
              <div className=' flex flex-col gap-10 w-full'>
                {cartItems.map(item => (
                  <div key={item.id} className=' flex flex-col gap-5 w-full'>
                    {/* item data */}
                    <div className='flex items-center justify-between w-full px-4 py-4 rounded-lg'>
                      {/* image */}
                      <div className=' h-[102px] w-[150px] overflow-hidden rounded-tl-2xl rounded-br-2xl flex-shrink-0'>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={150}
                          height={102}
                          className=' object-cover h-full w-full'
                        />
                      </div>

                      {/* item name and details */}
                      <div className=' px-6'>
                        <h2 className='text-xl font-semibold text-primary mb-2'>{item.name}</h2>
                        <p className='text-sm text-gray-600'>{item.quantity} Adults x USD {item.price}</p>
                        {item.childQuantity > 0 && (
                          <p className='text-sm text-gray-600'>{item.childQuantity} Children x USD {item.childPrice}</p>
                        )}
                      </div>

                      {/* adult type and quantity */}
                      <div className='flex flex-col items-center gap-4'>
                        <div className='text-center'>
                          <div className='flex items-center gap-2 mt-2 border rounded-tl-2xl rounded-br-2xl border-primary px-4 py-2'>
                            <span className='text-yellow-600 font-medium'>Adults Ticket</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className='w-8 h-8 flex items-center justify-center hover:bg-gray-100'
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 2.25H9C5.278 2.25 2.25 5.278 2.25 9V15C2.25 18.722 5.278 21.75 9 21.75H15C18.722 21.75 21.75 18.722 21.75 15V9C21.75 5.278 18.722 2.25 15 2.25ZM20.25 15C20.25 17.895 17.895 20.25 15 20.25H9C6.105 20.25 3.75 17.895 3.75 15V9C3.75 6.105 6.105 3.75 9 3.75H15C17.895 3.75 20.25 6.105 20.25 9V15ZM16.75 12C16.75 12.414 16.414 12.75 16 12.75H8C7.586 12.75 7.25 12.414 7.25 12C7.25 11.586 7.586 11.25 8 11.25H16C16.414 11.25 16.75 11.586 16.75 12Z" fill="#AAAAAA"/>
                              </svg>
                            </button>
                            <span className='mx-2 font-semibold'>{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className='w-8 h-8 flex items-center justify-center hover:bg-gray-100'
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 0.25H7C3.278 0.25 0.25 3.278 0.25 7V13C0.25 16.722 3.278 19.75 7 19.75H13C16.722 19.75 19.75 16.722 19.75 13V7C19.75 3.278 16.722 0.25 13 0.25ZM18.25 13C18.25 15.895 15.895 18.25 13 18.25H7C4.105 18.25 1.75 15.895 1.75 13V7C1.75 4.105 4.105 1.75 7 1.75H13C15.895 1.75 18.25 4.105 18.25 7V13ZM14.75 10C14.75 10.414 14.414 10.75 14 10.75H10.75V14C10.75 14.414 10.414 14.75 10 14.75C9.586 14.75 9.25 14.414 9.25 14V10.75H6C5.586 10.75 5.25 10.414 5.25 10C5.25 9.586 5.586 9.25 6 9.25H9.25V6C9.25 5.586 9.586 5.25 10 5.25C10.414 5.25 10.75 5.586 10.75 6V9.25H14C14.414 9.25 14.75 9.586 14.75 10Z" fill="black"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* child ticket type and quantity */}
                      <div className='flex flex-col items-center gap-4'>
                        <div className='text-center'>
                          <div className='flex items-center gap-2 mt-2 border rounded-tl-2xl rounded-br-2xl border-primary px-4 py-2'>
                            <span className='text-[#D4AF37] font-medium'>Children Ticket</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.childQuantity - 1, 'child')}
                              className='w-8 h-8 flex items-center justify-center hover:bg-gray-100'
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 2.25H9C5.278 2.25 2.25 5.278 2.25 9V15C2.25 18.722 5.278 21.75 9 21.75H15C18.722 21.75 21.75 18.722 21.75 15V9C21.75 5.278 18.722 2.25 15 2.25ZM20.25 15C20.25 17.895 17.895 20.25 15 20.25H9C6.105 20.25 3.75 17.895 3.75 15V9C3.75 6.105 6.105 3.75 9 3.75H15C17.895 3.75 20.25 6.105 20.25 9V15ZM16.75 12C16.75 12.414 16.414 12.75 16 12.75H8C7.586 12.75 7.25 12.414 7.25 12C7.25 11.586 7.586 11.25 8 11.25H16C16.414 11.25 16.75 11.586 16.75 12Z" fill="#AAAAAA"/>
                              </svg>
                            </button>
                            <span className='mx-2 font-semibold'>{item.childQuantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.childQuantity + 1, 'child')}
                              className='w-8 h-8 flex items-center justify-center hover:bg-gray-100'
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 0.25H7C3.278 0.25 0.25 3.278 0.25 7V13C0.25 16.722 3.278 19.75 7 19.75H13C16.722 19.75 19.75 16.722 19.75 13V7C19.75 3.278 16.722 0.25 13 0.25ZM18.25 13C18.25 15.895 15.895 18.25 13 18.25H7C4.105 18.25 1.75 15.895 1.75 13V7C1.75 4.105 4.105 1.75 7 1.75H13C15.895 1.75 18.25 4.105 18.25 7V13ZM14.75 10C14.75 10.414 14.414 10.75 14 10.75H10.75V14C10.75 14.414 10.414 14.75 10 14.75C9.586 14.75 9.25 14.414 9.25 14V10.75H6C5.586 10.75 5.25 10.414 5.25 10C5.25 9.586 5.586 9.25 6 9.25H9.25V6C9.25 5.586 9.586 5.25 10 5.25C10.414 5.25 10.75 5.586 10.75 6V9.25H14C14.414 9.25 14.75 9.586 14.75 10Z" fill="black"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* date */}
                      <div className='flex flex-col items-center gap-4 '>
                        <div className='text-center flex items-center px-4 py-1 bg-background rounded-tl-2xl rounded-br-2xl'>
                          <p className='text-sm font-medium text-gray-700'>*Date</p>
                          <div className='px-4 py-2'>
                            <input 
                              type="date" 
                              value={item.date} 
                              onChange={(e) => {
                                setCartItems(items =>
                                  items.map(cartItem =>
                                    cartItem.id === item.id 
                                      ? { ...cartItem, date: e.target.value }
                                      : cartItem
                                  )
                                );
                              }}
                              className='text-sm bg-transparent w-full outline-none border-none appearance-none [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:cursor-pointer'
                            />
                          </div>
                        </div>
                      </div>

                      {/* remove button */}
                      <div className='flex flex-col items-center gap-4'>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className='text-red-500 hover:text-red-700'
                          title='Remove'
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3.24902H15.441C14.902 3.24902 14.425 2.90502 14.255 2.39502L13.939 1.44604C13.7 0.730045 13.033 0.25 12.279 0.25H7.71997C6.96597 0.25 6.299 0.730021 6.06 1.44702L5.74402 2.39502C5.57402 2.90602 5.09698 3.25 4.55798 3.25H1C0.586 3.25 0.25 3.586 0.25 4C0.25 4.414 0.586 4.75 1 4.75H2.29797L3.065 16.25C3.196 18.213 4.83901 19.75 6.80701 19.75H13.194C15.161 19.75 16.805 18.212 16.936 16.25L17.703 4.75H19C19.414 4.75 19.75 4.414 19.75 4C19.75 3.586 19.414 3.24902 19 3.24902ZM7.48297 1.92004C7.51697 1.81804 7.61197 1.74902 7.71997 1.74902H12.279C12.387 1.74902 12.482 1.81807 12.516 1.91907L12.832 2.86804C12.876 3.00004 12.931 3.12705 12.993 3.24805H7.005C7.067 3.12605 7.12202 3.00007 7.16602 2.86707L7.48297 1.92004ZM15.438 16.149C15.36 17.327 14.374 18.249 13.193 18.249H6.80603C5.62603 18.249 4.63897 17.327 4.56097 16.149L3.80103 4.74902H4.55798C4.66498 4.74902 4.77 4.736 4.875 4.724C4.917 4.731 4.95502 4.74902 4.99902 4.74902H14.999C15.043 4.74902 15.081 4.731 15.123 4.724C15.228 4.736 15.332 4.74902 15.44 4.74902H16.197L15.438 16.149ZM12.75 8.99902V13.999C12.75 14.413 12.414 14.749 12 14.749C11.586 14.749 11.25 14.413 11.25 13.999V8.99902C11.25 8.58502 11.586 8.24902 12 8.24902C12.414 8.24902 12.75 8.58502 12.75 8.99902ZM8.75 8.99902V13.999C8.75 14.413 8.414 14.749 8 14.749C7.586 14.749 7.25 14.413 7.25 13.999V8.99902C7.25 8.58502 7.586 8.24902 8 8.24902C8.414 8.24902 8.75 8.58502 8.75 8.99902Z" fill="#373030"/>
                          </svg>
                        </button>
                        <span className='text-primary text-sm font-semibold font-body'>Remove</span>
                      </div>
                    </div>
                    <div className=' w-full h-[2px] bg-[#D4AF37] my-3 ' />
                  </div>
                ))}
              </div>

              {/* cart summary */}
              <div className=" w-full flex justify-end ">
                <div className=' flex flex-col gap-6'>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold">Total</span>
                    <span className="text-xl font-semibold">USD {calculateTotal()}</span>
                  </div>
                  <Button 
                    className="w-full bg-primary rounded-none rounded-tl-2xl rounded-br-2xl text-white font-semibold py-4 px-2"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}