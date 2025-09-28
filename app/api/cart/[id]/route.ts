import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { UpdateCartRequest } from '../../../../types';

interface Params {
  id: string;
}

// GET /api/cart/[id] - Get a single cart item
export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    const cartItem = await prisma.cart.findUnique({
      where: {
        id
      },
      include: {
        meal: true
      }
    });

    if (!cartItem) {
      return NextResponse.json({
        success: false,
        error: 'Cart item not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: cartItem
    });
  } catch (error) {
    console.error('Error fetching cart item:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch cart item'
    }, { status: 500 });
  }
}

// PUT /api/cart/[id] - Update a cart item
export async function PUT(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const body: UpdateCartRequest = await request.json();
    const { id } = await context.params;

    const cartItem = await prisma.cart.update({
      where: {
        id
      },
      data: {
        quantity: body.quantity,
        childQuantity: body.childQuantity,
        restaurantId: body.restaurantId,
        date: body.date,
      },
      include: {
        meal: true
      }
    });

    return NextResponse.json({
      success: true,
      data: cartItem
    });
  } catch (error: any) {
    console.error('Error updating cart item:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Cart item not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to update cart item'
    }, { status: 500 });
  }
}

// DELETE /api/cart/[id] - Remove a cart item
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    await prisma.cart.delete({
      where: {
        id
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Cart item removed successfully'
    });
  } catch (error: any) {
    console.error('Error removing cart item:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Cart item not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to remove cart item'
    }, { status: 500 });
  }
}