import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const body = await request.json();

  const { firstName, lastName, email, phone, address, location, employmentType, expectedWage, details } = body;

  // Validate input data
  if (!firstName || !lastName || !email || !phone || !address || !location || !employmentType || !expectedWage || !details) {
    console.error('Missing required fields:', body);
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true', // use TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    // Prepare email content
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: 'info@scogualrubber.com',
      subject: 'New Job Application',
      text: `
        New job application received:

        Location: ${location.reno ? 'Reno' : ''} ${location.seattle ? 'Seattle' : ''}
        First Name: ${firstName}
        Last Name: ${lastName}
        Address: ${address}
        Email: ${email}
        Phone: ${phone}
        Employment Type: ${employmentType}
        Expected Wage: ${expectedWage}
        Details: ${details}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Application submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ message: 'Failed to submit application' }, { status: 500 });
  }
}
