import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cartApi } from '@/lib/api-client';
import CheckoutClient from './checkout-client';

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value;

  if (!sessionId) {
    redirect('/cart');
  }

  try {
    const response = await cartApi.getBySession(sessionId);
    
    if (!response.success || !response.data || response.data.length === 0) {
      redirect('/cart');
    }

    return <CheckoutClient items={response.data} sessionId={sessionId} />;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    redirect('/cart');
  }
}