import { NextRequest, NextResponse } from 'next/server';
import { emailClient, EmailData } from '@/lib/email-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { fullName, email, subject, message } = body;
    
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All fields are required: fullName, email, subject, and message' 
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please provide a valid email address' 
        },
        { status: 400 }
      );
    }

    // Prepare email data
    const emailData: EmailData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    };

    // Send email
    const result = await emailClient.sendContactEmail(emailData);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon!'
      });
    } else {
      console.error('Email sending failed:', result.error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email. Please try again later or contact us directly.' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    // Verify SMTP connection
    const isConnected = await emailClient.verifyConnection();
    
    return NextResponse.json({
      status: 'ok',
      email_service: isConnected ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        email_service: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}