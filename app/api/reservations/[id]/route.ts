import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { UpdateReservationRequest } from '../../../../types';

interface Params {
  id: string;
}

// GET /api/reservations/[id] - Get a single reservation
export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    const reservation = await prisma.reservation.findUnique({
      where: {
        id
      },
      include: {
        restaurant: true
      }
    });

    if (!reservation) {
      return NextResponse.json({
        success: false,
        error: 'Reservation not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: reservation
    });
  } catch (error) {
    console.error('Error fetching reservation:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch reservation'
    }, { status: 500 });
  }
}

// PUT /api/reservations/[id] - Update a reservation
export async function PUT(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const body: UpdateReservationRequest = await request.json();
    const { id } = await context.params;

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.time !== undefined) updateData.time = body.time;
    if (body.adultCount !== undefined) updateData.adultCount = body.adultCount;
    if (body.childCount !== undefined) updateData.childCount = body.childCount;
    if (body.specialRequests !== undefined) updateData.specialRequests = body.specialRequests;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.totalAmount !== undefined) updateData.totalAmount = body.totalAmount;
    
    if (body.date !== undefined) {
      const reservationDate = new Date(body.date);
      if (isNaN(reservationDate.getTime())) {
        return NextResponse.json({
          success: false,
          error: 'Invalid date format'
        }, { status: 400 });
      }
      updateData.date = reservationDate;
    }

    const reservation = await prisma.reservation.update({
      where: {
        id
      },
      data: updateData,
      include: {
        restaurant: true
      }
    });

    return NextResponse.json({
      success: true,
      data: reservation
    });
  } catch (error: any) {
    console.error('Error updating reservation:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Reservation not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to update reservation'
    }, { status: 500 });
  }
}

// DELETE /api/reservations/[id] - Delete a reservation
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    await prisma.reservation.delete({
      where: {
        id
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Reservation deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting reservation:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Reservation not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to delete reservation'
    }, { status: 500 });
  }
}