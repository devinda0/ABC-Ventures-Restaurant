import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { UpdateRestaurantRequest } from '../../../../types';

interface Params {
  id: string;
}

// GET /api/restaurants/[id] - Get a single restaurant
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { searchParams } = new URL(request.url);
    const includeMeals = searchParams.get('includeMeals') === 'true';
    const includeReservations = searchParams.get('includeReservations') === 'true';

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: parseInt(params.id)
      },
      include: {
        meals: includeMeals ? {
          include: {
            meal: true
          }
        } : undefined,
        reservations: includeReservations ? true : undefined
      }
    });

    if (!restaurant) {
      return NextResponse.json({
        success: false,
        error: 'Restaurant not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch restaurant'
    }, { status: 500 });
  }
}

// PUT /api/restaurants/[id] - Update a restaurant
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const body: UpdateRestaurantRequest = await request.json();

    const restaurant = await prisma.restaurant.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        name: body.name,
        subtitle: body.subtitle,
        tagline: body.tagline,
        description: body.description,
        cuisine: body.cuisine,
        rating: body.rating,
        reviews: body.reviews,
        image: body.image,
        gallery: body.gallery,
        city: body.city,
        address: body.address,
        phone: body.phone,
        email: body.email,
        website: body.website,
      }
    });

    return NextResponse.json({
      success: true,
      data: restaurant
    });
  } catch (error: any) {
    console.error('Error updating restaurant:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Restaurant not found'
      }, { status: 404 });
    }

    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: 'Restaurant with this name already exists'
      }, { status: 409 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to update restaurant'
    }, { status: 500 });
  }
}

// DELETE /api/restaurants/[id] - Delete a restaurant
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await prisma.restaurant.delete({
      where: {
        id: parseInt(params.id)
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Restaurant deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting restaurant:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Restaurant not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to delete restaurant'
    }, { status: 500 });
  }
}