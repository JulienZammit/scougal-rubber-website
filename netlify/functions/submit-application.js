const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  const { firstName, lastName, email, phone, address, location, employmentType, expectedWage, details } = body;

  if (!firstName || !lastName || !email || !phone || !address || !location || !employmentType || !expectedWage || !details) {
    console.error('Missing required fields:', body);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' })
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
        Employment Type: ${employmentType.fullTime ? 'Full Time' : ''} ${employmentType.partTime ? 'Part Time' : ''}
        Expected Wage: ${expectedWage}
        Details: ${details}
      `,
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
