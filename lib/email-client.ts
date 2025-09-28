import nodemailer from 'nodemailer';

export interface EmailData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export class EmailClient {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendContactEmail(data: EmailData): Promise<{ success: boolean; error?: string }> {
    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: "info@cloudedesign.com",
        subject: `Contact Form: ${data.subject}`,
        html: this.generateEmailTemplate(data),
        text: this.generatePlainTextEmail(data),
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  private generateEmailTemplate(data: EmailData): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #8A1739;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
            border-radius: 0 0 8px 8px;
          }
          .field {
            margin-bottom: 20px;
          }
          .field-label {
            font-weight: bold;
            color: #8A1739;
            margin-bottom: 5px;
          }
          .field-value {
            background-color: white;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
          }
          .message-field {
            min-height: 100px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <p>ABC Ventures Restaurant</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Full Name:</div>
            <div class="field-value">${this.escapeHtml(data.fullName)}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email Address:</div>
            <div class="field-value">${this.escapeHtml(data.email)}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Subject:</div>
            <div class="field-value">${this.escapeHtml(data.subject)}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Message:</div>
            <div class="field-value message-field">${this.escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>This email was sent from the ABC Ventures Restaurant contact form.</p>
          <p>Please reply directly to: ${this.escapeHtml(data.email)}</p>
        </div>
      </body>
      </html>
    `;
  }

  private generatePlainTextEmail(data: EmailData): string {
    return `
New Contact Form Submission - ABC Ventures Restaurant

Full Name: ${data.fullName}
Email Address: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This email was sent from the ABC Ventures Restaurant contact form.
Please reply directly to: ${data.email}
    `.trim();
  }

  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('SMTP connection verified successfully');
      return true;
    } catch (error) {
      console.error('SMTP connection failed:', error);
      return false;
    }
  }
}

export const emailClient = new EmailClient();