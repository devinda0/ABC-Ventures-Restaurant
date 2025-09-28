import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

interface Params {
  id: string;
}

// GET /api/restaurant-meals/[id] - Get a single restaurant-meal relationship
export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    const restaurantMeal = await prisma.restaurant_Meals.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        restaurant: true,
        meal: true
      }
    });

    if (!restaurantMeal) {
      return NextResponse.json({
        success: false,
        error: 'Restaurant-meal relationship not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: restaurantMeal
    });
  } catch (error) {
    console.error('Error fetching restaurant meal:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch restaurant meal'
    }, { status: 500 });
  }
}

// PUT /api/restaurant-meals/[id] - Update a restaurant-meal relationship
export async function PUT(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const body = await request.json();
    const { id } = await context.params;

    const restaurantMeal = await prisma.restaurant_Meals.update({
      where: {
        id: parseInt(id)
      },
      data: {
        isAvailable: body.isAvailable,
        specialPrice: body.specialPrice,
      },
      include: {
        restaurant: true,
        meal: true
      }
    });

    return NextResponse.json({
      success: true,
      data: restaurantMeal
    });
  } catch (error: any) {
    console.error('Error updating restaurant meal:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Restaurant-meal relationship not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to update restaurant meal'
    }, { status: 500 });
  }
}

// DELETE /api/restaurant-meals/[id] - Remove a meal from a restaurant
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    await prisma.restaurant_Meals.delete({
      where: {
        id: parseInt(id)
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Meal removed from restaurant successfully'
    });
  } catch (error: any) {
    console.error('Error removing meal from restaurant:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Restaurant-meal relationship not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to remove meal from restaurant'
    }, { status: 500 });
  }
}