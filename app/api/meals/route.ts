import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { CreateMealRequest } from '../../../types';
import { formatMealForAPI } from '../../../lib/decimal-utils';

// GET /api/meals - Get all meals
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeRestaurants = searchParams.get('includeRestaurants') === 'true';
    const type = searchParams.get('type'); // breakfast, lunch, dinner
    const category = searchParams.get('category');
    const restaurantId = searchParams.get('restaurantId');
    const isAvailable = searchParams.get('isAvailable');

    const where: any = {};
    if (type) where.type = type;
    if (category) where.category = category;
    if (isAvailable !== null) where.isAvailable = isAvailable === 'true';

    // If filtering by restaurant, we need to use the restaurant_meals relation
    let meals;
    if (restaurantId) {
      meals = await prisma.meal.findMany({
        where: {
          ...where,
          restaurants: {
            some: {
              restaurantId: parseInt(restaurantId),
              isAvailable: true
            }
          }
        },
        include: includeRestaurants ? {
          restaurants: {
            include: {
              restaurant: true
            }
          }
        } : undefined,
        orderBy: {
          title: 'asc'
        }
      });
    } else {
      meals = await prisma.meal.findMany({
        where,
        include: includeRestaurants ? {
          restaurants: {
            include: {
              restaurant: true
            }
          }
        } : undefined,
        orderBy: {
          title: 'asc'
        }
      });
    }

    const formattedMeals = meals.map(formatMealForAPI);

    return NextResponse.json({
      success: true,
      data: formattedMeals
    });
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch meals'
    }, { status: 500 });
  }
}

// POST /api/meals - Create a new meal
export async function POST(request: NextRequest) {
  try {
    const body: CreateMealRequest = await request.json();

    const meal = await prisma.meal.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        childPrice: body.childPrice,
        image: body.image,
        badge: body.badge,
        type: body.type,
        category: body.category,
        isAvailable: body.isAvailable ?? true,
      }
    });

    return NextResponse.json({
      success: true,
      data: formatMealForAPI(meal)
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating meal:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create meal'
    }, { status: 500 });
  }
}