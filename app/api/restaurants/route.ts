import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { CreateRestaurantRequest } from '../../../types';

// GET /api/restaurants - Get all restaurants
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeMeals = searchParams.get('includeMeals') === 'true';
    const city = searchParams.get('city');
    const cuisine = searchParams.get('cuisine');

    const where: any = {};
    if (city) where.city = city;
    if (cuisine) where.cuisine = cuisine;

    const restaurants = await prisma.restaurant.findMany({
      where,
      include: includeMeals ? {
        meals: {
          include: {
            meal: true
          }
        }
      } : undefined,
      orderBy: {
        rating: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: restaurants
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch restaurants'
    }, { status: 500 });
  }
}

// POST /api/restaurants - Create a new restaurant
export async function POST(request: NextRequest) {
  try {
    const body: CreateRestaurantRequest = await request.json();

    const restaurant = await prisma.restaurant.create({
      data: {
        name: body.name,
        subtitle: body.subtitle,
        tagline: body.tagline,
        description: body.description,
        cuisine: body.cuisine,
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
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating restaurant:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: 'Restaurant with this name already exists'
      }, { status: 409 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to create restaurant'
    }, { status: 500 });
  }
}