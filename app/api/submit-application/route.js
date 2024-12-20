import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const body = await request.json();

  const { firstName, lastName, email, phone, address, location, preferredShift, details, resumeBase64 } = body;

  // Validation des champs requis
  if (!firstName || !lastName || !email || !phone || !address || !location || !preferredShift || !details || !resumeBase64) {
    console.error('Missing required fields:', body);
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  // Vérification rudimentaire du PDF (facultatif mais recommandé)
  // Les fichiers PDF commencent généralement par "%PDF" -> Base64 "JVBER"
  if (!resumeBase64.startsWith('JVBER')) {
    console.error('The uploaded file does not appear to be a valid PDF');
    return NextResponse.json({ message: 'Invalid file format. PDF only.' }, { status: 400 });
  }

  try {
    // Création du transport Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true', // utilisation TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    // Conversion du base64 en buffer
    const resumeBuffer = Buffer.from(resumeBase64, 'base64');

    // Options de l'email
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
        Preferred Shift: ${preferredShift}
        Details: ${details}
      `,
      attachments: [
        {
          filename: 'resume.pdf',
          content: resumeBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Application submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ message: 'Failed to submit application' }, { status: 500 });
  }
}
