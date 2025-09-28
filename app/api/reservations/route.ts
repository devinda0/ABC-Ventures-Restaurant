import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { CreateReservationRequest } from '../../../types';

// GET /api/reservations - Get all reservations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const email = searchParams.get('email');

    const where: any = {};
    if (restaurantId) where.restaurantId = parseInt(restaurantId);
    if (status) where.status = status;
    if (email) where.email = email;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      where.date = {
        gte: startDate,
        lt: endDate
      };
    }

    const reservations = await prisma.reservation.findMany({
      where,
      include: {
        restaurant: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      data: reservations
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch reservations'
    }, { status: 500 });
  }
}

// POST /api/reservations - Create a new reservation
export async function POST(request: NextRequest) {
  try {
    const body: CreateReservationRequest = await request.json();

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

    // Parse date string to Date object
    const reservationDate = new Date(body.date);
    if (isNaN(reservationDate.getTime())) {
      return NextResponse.json({
        success: false,
        error: 'Invalid date format'
      }, { status: 400 });
    }

    const reservation = await prisma.reservation.create({
      data: {
        restaurantId: body.restaurantId,
        name: body.name,
        email: body.email,
        phone: body.phone,
        date: reservationDate,
        time: body.time,
        adultCount: body.adultCount || 1,
        childCount: body.childCount || 0,
        specialRequests: body.specialRequests,
        status: 'pending',
      },
      include: {
        restaurant: true
      }
    });

    return NextResponse.json({
      success: true,
      data: reservation
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create reservation'
    }, { status: 500 });
  }
}