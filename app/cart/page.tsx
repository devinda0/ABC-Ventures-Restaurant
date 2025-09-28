import Hero from '@/components/hero';
import Footer from '@/components/footer';
import CartClient from './cart-client';
import { cartApi } from '@/lib/api-client';
import { CartWithMeal } from '@/types';
import { cookies } from 'next/headers';

async function getCartItems(): Promise<CartWithMeal[]> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('cart_session_id')?.value;

  if (!sessionId) {
    return [];
  }

  const response = await cartApi.getBySession(sessionId, {
    cache: 'no-store',
  });

  if (!response.success || !response.data) {
    return [];
  }

  return response.data;
}

export default async function CartPage() {
  const cartItems = await getCartItems();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero backgroundImage="/hero/home.png" activePage="Home" />
      
      {/* Cart Content */}
      <main className='flex flex-col w-full my-8 px-10'>
        <CartClient items={cartItems} />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}