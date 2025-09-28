import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { UpdateMealRequest } from '../../../../types';
import { formatMealForAPI } from '../../../../lib/decimal-utils';

interface Params {
  id: string;
}

// GET /api/meals/[id] - Get a single meal
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { searchParams } = new URL(request.url);
    const includeRestaurants = searchParams.get('includeRestaurants') === 'true';

    const meal = await prisma.meal.findUnique({
      where: {
        id: parseInt(params.id)
      },
      include: {
        restaurants: includeRestaurants ? {
          include: {
            restaurant: true
          }
        } : undefined
      }
    });

    if (!meal) {
      return NextResponse.json({
        success: false,
        error: 'Meal not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: formatMealForAPI(meal)
    });
  } catch (error) {
    console.error('Error fetching meal:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch meal'
    }, { status: 500 });
  }
}

// PUT /api/meals/[id] - Update a meal
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const body: UpdateMealRequest = await request.json();

    const meal = await prisma.meal.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        childPrice: body.childPrice,
        image: body.image,
        badge: body.badge,
        type: body.type,
        category: body.category,
        isAvailable: body.isAvailable,
      }
    });

    return NextResponse.json({
      success: true,
      data: formatMealForAPI(meal)
    });
  } catch (error: any) {
    console.error('Error updating meal:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Meal not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to update meal'
    }, { status: 500 });
  }
}

// DELETE /api/meals/[id] - Delete a meal
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await prisma.meal.delete({
      where: {
        id: parseInt(params.id)
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Meal deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting meal:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Meal not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to delete meal'
    }, { status: 500 });
  }
}