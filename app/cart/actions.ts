'use server';

import { revalidatePath } from 'next/cache';
import { cartApi } from '@/lib/api-client';
import type { UpdateCartRequest } from '@/types';

export async function updateCartItemAction(
  id: string,
  updates: UpdateCartRequest,
) {
  const response = await cartApi.update(id, updates);

  if (!response.success) {
    throw new Error(response.error || 'Failed to update cart item');
  }

  revalidatePath('/cart');
}

export async function removeCartItemAction(id: string) {
  const response = await cartApi.remove(id);

  if (!response.success) {
    throw new Error(response.error || 'Failed to remove cart item');
  }

  revalidatePath('/cart');
}

export async function clearCartAction(sessionId: string) {
  const response = await cartApi.clearSession(sessionId);

  if (!response.success) {
    throw new Error(response.error || 'Failed to clear cart');
  }

  revalidatePath('/cart');
}
