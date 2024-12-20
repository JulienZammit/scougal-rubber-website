const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  const { firstName, lastName, email, phone, address, location, preferredShift, details, resumeBase64 } = body;

  // Vérifier que tous les champs requis sont présents
  if (!firstName || !lastName || !email || !phone || !address || !location || !preferredShift || !details || !resumeBase64) {
    console.error('Missing required fields:', body);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' })
    };
  }

  // Optionnel : Vérification rudimentaire du PDF via le base64
  if (!resumeBase64.startsWith('JVBER')) {
    console.error('The uploaded file does not appear to be a valid PDF');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid file format. PDF only.' })
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Convertir la base64 en buffer
    const resumeBuffer = Buffer.from(resumeBase64, 'base64');

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

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Application submitted successfully' })
    };
  } catch (error) {
    console.error('Error submitting application:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to submit application' })
    };
  }
};
