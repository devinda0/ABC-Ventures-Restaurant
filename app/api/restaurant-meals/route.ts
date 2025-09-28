import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { AssignMealToRestaurantRequest } from '../../../types';

// GET /api/restaurant-meals - Get all restaurant-meal relationships
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');
    const mealId = searchParams.get('mealId');
    const isAvailable = searchParams.get('isAvailable');

    const where: any = {};
    if (restaurantId) where.restaurantId = parseInt(restaurantId);
    if (mealId) where.mealId = parseInt(mealId);
    if (isAvailable !== null) where.isAvailable = isAvailable === 'true';

    const restaurantMeals = await prisma.restaurant_Meals.findMany({
      where,
      include: {
        restaurant: true,
        meal: true
      }
    });

    return NextResponse.json({
      success: true,
      data: restaurantMeals
    });
  } catch (error) {
    console.error('Error fetching restaurant meals:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch restaurant meals'
    }, { status: 500 });
  }
}

// POST /api/restaurant-meals - Assign a meal to a restaurant
export async function POST(request: NextRequest) {
  try {
    const body: AssignMealToRestaurantRequest = await request.json();

    // Check if restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: body.restaurantId }
    });
    if (!restaurant) {
      return NextResponse.json({
        success: false,
        error: 'Restaurant not found'
      }, { status: 404 });
    }

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

    const restaurantMeal = await prisma.restaurant_Meals.create({
      data: {
        restaurantId: body.restaurantId,
        mealId: body.mealId,
        isAvailable: body.isAvailable ?? true,
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
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error assigning meal to restaurant:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: 'This meal is already assigned to this restaurant'
      }, { status: 409 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to assign meal to restaurant'
    }, { status: 500 });
  }
}