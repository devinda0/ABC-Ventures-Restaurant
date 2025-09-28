import { NextRequest, NextResponse } from 'next/server';

interface PaymentRequest {
  amount: number;
  currency: string;
  paymentMethod: {
    type: 'card' | 'paypal';
    card?: {
      number: string;
      expiry: string;
      cvv: string;
    };
  };
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  metadata?: {
    orderId: string;
    items: string;
  };
}

// Mock Stripe API endpoint
export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic validation
    if (!body.amount || body.amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!body.customerInfo?.name || !body.customerInfo?.email) {
      return NextResponse.json(
        { error: 'Customer information required' },
        { status: 400 }
      );
    }

    // Mock card validation for card payments
    if (body.paymentMethod.type === 'card') {
      const card = body.paymentMethod.card;
      if (!card?.number || card.number.length < 16) {
        return NextResponse.json(
          { error: 'Invalid card number' },
          { status: 400 }
        );
      }
      if (!card?.expiry || !card?.cvv) {
        return NextResponse.json(
          { error: 'Missing card details' },
          { status: 400 }
        );
      }
    }

    // Simulate 95% success rate
    const isSuccess = Math.random() > 0.05;

    if (!isSuccess) {
      return NextResponse.json(
        { 
          error: 'Your card was declined. Please try again with a different payment method.',
          code: 'card_declined'
        },
        { status: 402 }
      );
    }

    // Generate mock payment intent response
    const paymentIntent = {
      id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: Math.round(body.amount * 100), // Convert to cents
      currency: body.currency.toLowerCase(),
      status: 'succeeded',
      created: Math.floor(Date.now() / 1000),
      customer: {
        name: body.customerInfo.name,
        email: body.customerInfo.email,
        phone: body.customerInfo.phone,
      },
      payment_method: {
        type: body.paymentMethod.type,
        card: body.paymentMethod.type === 'card' ? {
          brand: 'visa', // Mock brand
          last4: body.paymentMethod.card?.number.slice(-4) || '4242',
          exp_month: body.paymentMethod.card?.expiry.split('/')[0] || '12',
          exp_year: `20${body.paymentMethod.card?.expiry.split('/')[1] || '25'}`,
        } : undefined,
      },
      metadata: body.metadata || {},
    };

    return NextResponse.json({
      success: true,
      payment_intent: paymentIntent,
      message: 'Payment processed successfully'
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error during payment processing' },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}