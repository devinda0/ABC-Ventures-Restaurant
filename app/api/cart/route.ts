import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { CreateCartRequest } from '../../../types';

// GET /api/cart - Get cart items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const userId = searchParams.get('userId');

    if (!sessionId && !userId) {
      return NextResponse.json({
        success: false,
        error: 'sessionId or userId is required'
      }, { status: 400 });
    }

    const where: any = {};
    if (sessionId) where.sessionId = sessionId;
    if (userId) where.userId = userId;

    const cartItems = await prisma.cart.findMany({
      where,
      include: {
        meal: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const response = NextResponse.json({
      success: true,
      data: cartItems
    });

    if (sessionId) {
      response.cookies.set('cart_session_id', sessionId, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch cart items'
    }, { status: 500 });
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body: CreateCartRequest = await request.json();

    // Check if meal exists
    const meal = await prisma.meal.findUnique({
      where: { id: body.mealId }
    });
    if (!meal) {
      return NextResponse.json({
        success: false,
        error: 'Meal not found'
      }, { status: 404 });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cart.findFirst({
      where: {
        sessionId: body.sessionId,
        mealId: body.mealId,
        userId: body.userId || null,
        restaurantId: body.restaurantId || null,
        date: body.date || null,
      }
    });

    let cartItem;
    if (existingItem) {
      // Update existing item
      cartItem = await prisma.cart.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + (body.quantity || 1),
          childQuantity: existingItem.childQuantity + (body.childQuantity || 0),
        },
        include: {
          meal: true
        }
      });
    } else {
      // Create new item
      cartItem = await prisma.cart.create({
        data: {
          sessionId: body.sessionId,
          userId: body.userId,
          mealId: body.mealId,
          quantity: body.quantity || 1,
          childQuantity: body.childQuantity || 0,
          restaurantId: body.restaurantId,
          date: body.date,
        },
        include: {
          meal: true
        }
      });
    }

    const response = NextResponse.json({
      success: true,
      data: cartItem
    }, { status: 201 });

    response.cookies.set('cart_session_id', body.sessionId, {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to add item to cart'
    }, { status: 500 });
  }
}

// DELETE /api/cart - Clear cart
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const userId = searchParams.get('userId');

    if (!sessionId && !userId) {
      return NextResponse.json({
        success: false,
        error: 'sessionId or userId is required'
      }, { status: 400 });
    }

    const where: any = {};
    if (sessionId) where.sessionId = sessionId;
    if (userId) where.userId = userId;

    await prisma.cart.deleteMany({
      where
    });

    const response = NextResponse.json({
      success: true,
      message: 'Cart cleared successfully'
    });

    if (sessionId) {
      response.cookies.set('cart_session_id', sessionId, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to clear cart'
    }, { status: 500 });
  }
}